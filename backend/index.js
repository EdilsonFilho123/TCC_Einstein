const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const cors = require("cors");
const http = require("http");

const app = express();
const saltRounds = 10;
const SECRET = 'root';

const bd = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "Portal_Professores"
});

// bd.getConnection(function (err, connection){
//     if(err) throw err
// })

app.use(express.json());
app.use(cors());

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, (err, decode) => {
        if(err) return res.status(401).end();
        
        req.body.isProf = decode.userNivel ? true : false;
        req.body.userId = decode.userId ? decode.userId : 0;
        next();
    })
}

app.post("/verifyType", verifyJWT, (req, res) => {
    res.json({isProf: req.body.isProf});
})

app.post("/verifyToken", verifyJWT, (req, res) => {
    res.json({auth: true});
})

app.post("/cadastro", (req, res) => {
    const nome = req.body.nome;
    const dtNasc = req.body.dtNasc;
    const cpf = req.body.cpf;
    const email = req.body.email;
    const senha = req.body.senha;

    bd.query("SELECT email FROM Usuario WHERE email = ? OR cpf = ?", [email, cpf], (err, result) => {
        if(err)
            res.send({err: "Erro no bancor Primario!"});
        if(!result.length)
            bcrypt.hash(senha, saltRounds, (err, hash) => {
                bd.query("INSERT INTO Usuario (nome, dt_nascimento, cpf, email, senha) VALUES (?, ?, ?, ?, ?)", [nome, dtNasc, cpf, email, hash], (err, result) => {
                    if(err)
                        res.send({err: "Erro no bancor!\n" + err});
                    
                    res.send({msg: "Usuario cadastrado com sucesso"});  
                })
            })
        else
            res.send({msg: "Usuario já cadastrado"})
    });
})

app.post('/login', (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;
    const type = req.body.type;
    // return res.send({msg: `${email} -> ${senha} -> ${type}`});

    bd.query("SELECT * FROM Usuario WHERE email = ? AND nivel = ?", [email, type], (err, result) => {
        if(err)
            return res.send({err: "Erro select!"});

        if(result.length){
            bcrypt.compare(senha, result[0].senha, (errBcrypt, resultBcrypt) => {
                if(errBcrypt)
                    return res.send({err: "Erro compare!"});

                if(resultBcrypt){
                    const token = jwt.sign({userId: result[0].id, userNivel: result[0].nivel, userName: result[0].nome }, SECRET, { expiresIn: 300 });
                    return res.json({auth: true, token: token});
                }
                else
                    return res.send({msg: "Senha incorreta!!!"});  
            })
        }
        else
            return res.send({msg: `Email invalido!!! ${email} -> ${type}`});  
    })
})

app.post('/novaTurma', verifyJWT, (req, res) => {
    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const idProf = req.body.userId;

    if(nome == "" || descricao == "")
        return res.send({err: "Not Args"});  

    if(!req.body.isProf)
        return res.send({err: "Not Prof"});  

    bd.query("INSERT INTO materia (nome, descricao, idProf) VALUES (?, ?, ?)", [nome, descricao, idProf], (err, result) => {
        if(err)
            return res.send({err: "Erro insert! " + err});
        else
            return res.send({create: true});  
    })
})

app.post('/turmas', verifyJWT, (req, res) => {
    const idProf = req.body.userId;

    bd.query("SELECT id, nome, descricao FROM materia WHERE idProf = ?", [idProf], (err, result) => {
        if(err)
            return res.send({err: "Erro insert! " + err});
        else
            return res.json({turmas: result});
    })
})

app.post('/deleteTurma', verifyJWT, (req, res) => {
    const id = req.body.idTurma;

    bd.query("DELETE FROM `portal_professores`.`materia` WHERE (`id` = ?)", [id], (err, result) => {
        if(err)
            return res.send({err: "Erro insert! " + err});
        else
            return res.send({deleted: true});
    })
})

app.post('/novoAluno', verifyJWT, (req, res) => {
    const email = req.body.email;
    const id = req.body.id;

    if(email == "" || id == "")
        return res.send({err: "Not Args"});  

    if(!req.body.isProf)
        return res.send({err: "Not Prof"});  

    bd.query("SELECT id FROM Usuario WHERE email = ?", [email], (err, result1) => {
        if(err)
            res.send({err: "Erro select! " + err});
        else{
            try {
                if(result1[0].id)
                    bd.query("INSERT INTO MateriasDoAluno (idUsuario, idMateria) VALUES (?, ?)", [result1[0].id, id], (err2, result2) => {
                        if(err2)
                            return res.send({err: "Erro insert! " + err2});
                        else
                            return res.send({add: true});  
                    })
                else
                    return res.send({err: "Erro select! " + err});
            } catch (error) {
                return res.send({add: false});
            }
        }
    })
})

app.post('/novoPost', verifyJWT, (req, res) => {
    const nome = req.body.nome;
    const conteudo = req.body.conteudo;
    const type = req.body.type
    const id = req.body.id

    if(nome == "" || conteudo == "" || type == "" || id == "")
        return res.send({err: "Not Args"});  

    if(!req.body.isProf)
        return res.send({err: "Not Prof"});  

    bd.query("INSERT INTO Postagem (idMateria, nome, conteudo, tipo) VALUES (?, ?, ?, ?)", [id, nome, conteudo, type], (err, result) => {
        if(err)
            return res.send({err: "Erro insert! " + err});
        else
            return res.send({add: true});  
    })
})

app.post('/carregaPosts', verifyJWT, (req, res) => {
    const id = req.body.idMaterias

    if(id == "")
        return res.send({err: "Not Args"});  

    if(!req.body.isProf)
        return res.send({err: "Not Prof"});  

        // try {
            bd.query("SELECT * FROM Postagem WHERE idMateria = ? ORDER BY id DESC", [id], (err, result) => {
                if(err)
                    return res.send({err: "Erro insert! " + err});
                else{
                    return res.json({posts: result});  

                }
            })
        // } catch (error) {
        //     return res.send({err: "New Error" + error});  
        // }
})

app.post('/nomeTurma', verifyJWT, (req, res) => {
    const id = req.body.id;

    bd.query("SELECT nome FROM materia WHERE id = ?", [id], (err, result) => {
        if(err)
            return res.send({err: "Erro! " + err});
        else
            try {
            if(result[0].nome)
                return res.json({nome: result[0].nome});
            else
                return res.json({nome: "sem nome"});
            } catch (error) {
                return res.json({nome: "sem nome"});
            }
    })
})

const server = http.createServer(app);
server.listen(3001);
console.log("Rodando no 3001 patrão!");