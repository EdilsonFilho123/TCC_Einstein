import style from "./Cadastro.module.css"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";

import DatePicker from "react-datepicker";
import { addYears } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css"

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";

function Cadastro(){
    
    const [dataNasc, setDataNasc] = useState(addYears(new Date(), -5));
    const navigate = useNavigate();

    const validationCadastro = yup.object().shape({
        nome: yup.string().required("Nome invalido!!!"),
        // data: yup.date().required("Data invalida!!!"),
        cpf: yup.string().required("CPF invalido!!!"),
        email: yup.string().email().required("Email invalido!!!"),
        senha: yup.string().min(8, "A senha deve ter 8 caracteres").required("Senha invalida"),
        senhaConf: yup.string().oneOf([yup.ref("senha"), null], "As senha NÃO são indênticas!"),
    })

    const handleSubCadastro = (values) => {
        Axios.post("http://localhost:3001/cadastro", {
            nome: values.nome,
            dtNasc: dataNasc,
            cpf: values.cpf,
            email: values.email,
            senha: values.senha,
        }).then(response => {
            console.log(response.data.msg);

            if(response.data.err)
                alert("Erro no servidor! Por favor, tente mais tarde!");
            else
                if(response.data.msg === "Usuario cadastrado com sucesso"){
                    alert(response.data.msg + "\nClique em 'OK' para ser redirecionado para a pagina de login!!!")
                    navigate("/login");
                }
                else
                    alert("Email ou CPF já estão cadastrados!");
        })
    }

    return (
        <div className={style.card}>
            <h2>Portal Conexão</h2>

            <Formik initialValues={{}} onSubmit={handleSubCadastro} validationSchema={validationCadastro}>
                <Form>
                    <div>
                        <Field name="nome" className={style.field} placeholder="Nome Completo" />
                        <br/>
                        <ErrorMessage component="span" name='nome' className='form-error'/>
                    </div>
                    <div>
                        <DatePicker
                            name='data'
                            placeholder="Data de Nascimento" 
                            className={style.datePicker}
                            selected={dataNasc}
                            onChange={date => setDataNasc(date)}
                            showYearDropdown
                            dateFormat="dd/MM/yyyy"
                            maxDate={addYears(new Date(), -5)}
                            yearDropdownItemNumber={30}
                            scrollableYearDropdown
                        />
                        <br/>
                        <ErrorMessage component="span" name='data' className='form-error'/>
                    </div>
                    <div>
                        <Field name="cpf" className={style.field} placeholder="CPF" />
                        <br/>
                        <ErrorMessage component="span" name='cpf' className='form-error'/>
                    </div>
                    <div>
                        <Field name="email" className={style.field} placeholder="Email" />
                        <br/>
                        <ErrorMessage component="span" name='email' className='form-error'/>
                    </div>
                    <div>
                        <Field type="password" name="senha" className={style.field} placeholder="Senha" />
                        <br/>
                        <ErrorMessage component="span" name='senha' className='form-error'/>
                    </div>
                    <div>
                        <Field type="password" name="senhaConf" className={style.field} placeholder="Confirme sua Senha" />
                        <br/>
                        <ErrorMessage component="span" name='senhaConf' className='form-error'/>
                    </div>
                    <button className={style.button} type="submit">Enviar</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Cadastro