import Default from "../Default";
import style from "./Turmas.module.css"
import { useNavigate } from "react-router-dom";
import Turma from "../../components/Lines/Turma";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from "react";
import * as yup from "yup";
import Axios from "axios";

function Turmas(){

    const navigate = useNavigate();
    const [turmas, setTurmas] = useState([]);

    const listaTurma = () => {
        Axios.defaults.headers['Content-Type'] = 'application/json';
        Axios.defaults.headers['x-access-token'] = localStorage.getItem('authToken');

        Axios.post("http://localhost:3001/turmas", {}
        ).then(response => {
            if(response.data.err)
                alert("Erro na conexão do servidor! \nTente novamente mais tarde!");
            else
                setTurmas(response.data.turmas);
            
            // document.getElementById("form").style.display = 'none';
        })

        return turmas || [];
    }

    const inverter = () => {
        if(document.getElementById("form").style.display === 'block'){
            document.getElementById("form").style.display = 'none';
            document.getElementById("vert").style.display = 'block';
        }
        else{
            document.getElementById("form").style.display = 'block';
            document.getElementById("vert").style.display = 'none';
        }
    }

    const validationTurma = yup.object().shape({
        nome: yup.string().required("nome invalido!!!"),
        descricao: yup.string().required("descrição invalida!!!"),
    })

    const handleSubTurmas = (values) => {
        Axios.defaults.headers['Content-Type'] = 'application/json';
        Axios.defaults.headers['x-access-token'] = localStorage.getItem('authToken');

        Axios.post("http://localhost:3001/novaTurma", {
            nome: values.nome,
            descricao: values.descricao,
        }).then(response => {

            if(response.data.err)
                alert("Erro na conexão do servidor! \nTente novamente mais tarde!");
            else
                if (response.data.create === true) {
                    alert("Turma criada com sucesso!!!");
                    navigate("/turmas");
                }
                else 
                    alert("Houve um problema na criação da Turma!!!");
            
            // document.getElementById("form").style.display = 'none';
        })
    }

    return (
        <Default>
            <div className={style.cabecalho}>
                <div className={style.cantoL}></div>

                <h2>Turmas</h2>

                <div className={style.cantoR} onClick={inverter}>
                    <div id="vert" className={style.vert}></div>
                    <div className={style.horiz}></div>
                </div>
            </div>

            <div className={style.form} id="form">
                <Formik initialValues={{}} onSubmit={handleSubTurmas} validationSchema={validationTurma}>
                    <Form>
                        <div>
                            <Field name="nome" className={style.field} placeholder="Nome" />
                            <ErrorMessage component="span" name='nome' className='form-error'/>
                        </div>
                        <div>
                            <Field name="descricao" className={style.field} placeholder="Descricao" />
                            <ErrorMessage component="span" name='descricao' className='form-error'/>
                        </div>
                        <button className={style.button} type="submit">Enviar</button>
                    </Form>
                </Formik>
            </div>
            
            {listaTurma().map(item => {
                return <Turma nomeTurma={item.nome} to={`/postagens?id=${item.id}`} id={''+item.id}/>
            })}

        </Default>
    )
}

export default Turmas