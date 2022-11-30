const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const cors = require("cors");
const http = require("http");

const app = express();
const saltRounds = 10;

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
    const type = req.body.senha;

    bd.query("SELECT * FROM Usuario WHERE email = ? AND nivel = ?", [email, type], (err, result) => {
        if(err)
            res.send({err: "Erro select!"});

        if(result.length){
            bcrypt.compare(senha, result[0].senha, (errBcrypt, resultBcrypt) => {
                if(errBcrypt)
                    res.send({err: "Erro compare!"});

                if(resultBcrypt){
                    const token = jwt.sign({userId: result[0].id, userNivel: result[0].nivel, userName: result[0].nome }, SECRET, { expiresIn: 300 });
                    return res.json({auth: true, token: token});
                }
                else
                    res.send({msg: "Senha incorreta!!!"});  
            })
        }
        else
            res.send({msg: "Email invalido!!!" + result});  
    })
})

const server = http.createServer(app);
server.listen(3001);
console.log("Rodando no 3001 patrão!");