/* eslint-disable array-callback-return */
import style from "./Postagens.module.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import Post from "../../components/Posts/Postagem";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import Default from "../Default";
import VerifyProf from "../../VerifyProf";

function Postagens(){

    const navigate = useNavigate();

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id") // livros

    const [posts, setPost] = useState([]);
    const [nome, setNome] = useState("Materia");

    const inverter = (form, vert) => {
        if(document.getElementById(form).style.display === 'block'){
            document.getElementById(form).style.display = 'none';
            document.getElementById(vert).style.display = 'block';
        }
        else{
            document.getElementById(form).style.display = 'block';
            document.getElementById(vert).style.display = 'none';
        }
    }

    const validationAluno = yup.object().shape({
        email: yup.string().email().required("Email invalido!!!")
    })

    const validationPost = yup.object().shape({
        nome: yup.string().required("Nome invalido!!!"),
        conteudo: yup.string().required("Conteudo invalido!!!")
    })

    const handleSubAluno = (values) => {
        Axios.defaults.headers['Content-Type'] = 'application/json';
        Axios.defaults.headers['x-access-token'] = localStorage.getItem('authToken');

        Axios.post("http://localhost:3001/novoAluno", {
            email: values.email,
            id: id
        }).then(response => {
            if(response.data.err)
                alert("Erro na conexão do servidor! \nTente novamente mais tarde!");
            else
                if (response.data.add === true) 
                    alert("Aluno Adicionado com sucesso!!!");
                else 
                    alert("Aluno Não Existente!!!");
            
            // document.getElementById("form").style.display = 'none';
        })
    }

    const handleSubPost = (values) => {
        Axios.defaults.headers['Content-Type'] = 'application/json';
        Axios.defaults.headers['x-access-token'] = localStorage.getItem('authToken');

        Axios.post("http://localhost:3001/novoPost", {
            nome: values.nome,
            conteudo: values.conteudo,
            type: values.type,
            id: id
        }).then(response => {
            if(response.data.err)
                alert("Erro na conexão do servidor! \nTente novamente mais tarde!");
            else
                if (response.data.add === true) {
                    alert("Post criado com sucesso!!!");
                    navigate(`/postagens/?id=${id}`);
                }
                else 
                    alert("Erro na criação do Post!!!");
            
            // document.getElementById("form").style.display = 'none';
        })
    }

    const carregaPosts = () => {
        Axios.post("http://localhost:3001/carregaPosts", {
            idMaterias: id,
        }).then(response => {
            if(response.data.err)
                alert("Erro no servidor! Por favor, tente mais tarde!");
            else{
                setPost(response.data.posts);
            }
        })

        return posts;
    }

    const nomeMateria = () => {
        Axios.post("http://localhost:3001/nomeTurma", {
            id: id,
        }).then(response => {
            if(response.data.err)
                alert("Erro no servidor! Por favor, tente mais tarde!");
            else{
                setNome(response.data.nome);
            }
        })

        return posts;
    }
    
    nomeMateria();

    return (
        <Default>
            <div className={style.cabecalho}>
                <VerifyProf bodyAl={<div></div>} bodyProf={
                    <button className={`${style.btn}`} onClick={() => {inverter("newAluno", "vert")}}>
                        <div className={style.cantoL} onClick={null}>
                            <div id="vert" className={style.vert}></div>
                            <div className={style.horiz}></div>
                        </div>
                        <div className={style.txtBtn}>
                            Adicionar Aluno
                        </div>
                    </button>
                }/>

                <h2>Postagens de {nome}</h2>

                <VerifyProf bodyAl={<div></div>} bodyProf={
                    <button className={`${style.btn} ${style.btnR}`} onClick={() => {inverter("newPost", "vert2")}}>
                        <div className={style.cantoL} onClick={null}>
                            <div id="vert2" className={style.vert}></div>
                            <div className={style.horiz}></div>
                        </div>
                        <div className={style.txtBtn}>
                            Adicionar Post
                        </div>
                    </button>
                }/>
            </div>

            <div id="newAluno" className={style.newAluno}>
                <Formik initialValues={{}} onSubmit={handleSubAluno} validationSchema={validationAluno}>
                    <Form>
                        <div>
                            <Field name="email" className={style.field} placeholder="Email" />
                            <ErrorMessage component="span" name='email' className='form-error'/>
                        </div>
                        <button className={style.button} type="submit">Adicionar</button>
                    </Form>
                </Formik>
            </div>

            <div id="newPost" className={style.newPost}>
                <Formik initialValues={{}} onSubmit={handleSubPost} validationSchema={validationPost}>
                    <Form>
                        <div>
                            <Field name="nome" className={style.field} placeholder="Nome" />
                            <ErrorMessage component="span" name='nome' className='form-error'/>
                        </div>
                        <div>
                            <Field name="conteudo" className={style.field} placeholder="Conteudo" />
                            <ErrorMessage component="span" name='conteudo' className='form-error'/>
                        </div>
                        <div>
                            <Field as="select" name="type" className={`${style.field} ${style.selection}`}>
                                <option value="prova">Prova</option>
                                <option value="tarefa">Tarefa</option>
                                <option value="material">Material</option>
                            </Field>
                        </div>
                        <button className={style.button} type="submit">Enviar</button>
                    </Form>
                </Formik>
            </div>

            <div>
                {carregaPosts().map(item => {
                    return <Post nome={item.nome} conteudo={item.conteudo} type={item.tipo}/>
                })}
            </div>
        </Default>
    )
}

export default Postagens