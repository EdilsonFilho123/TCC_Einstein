import style from "./Login.module.css"
import { Link, useNavigate  } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import Axios from "axios";

function Login(){
    
    const navigate = useNavigate();

    const handleSubLogin = (values) => {
        Axios.post("http://localhost:3001/login", {
            type: 0,
            email: values.email,
            senha: values.senha,
        }).then(response => {
            console.log(response.data);

            if(response.data.auth){
                localStorage.setItem('authToken', response.data.token);
                navigate("/home");
            }
            else
                if(response.data.err){
                    alert("Erro na conexão do servidor! \nTente novamente mais tarde!");
                    navigate("/login");
                }
                else
                    alert(response.data.msg);
        })
    }

    const validationLogin = yup.object().shape({
        email: yup.string().email().required("Email invalido!!!"),
        password: yup.string().min(8, "A senha deve ter 8 caracteres").required("Senha invalida"),
    })

    return (
        <div className={style.card}>
            <h2>Portal Conexão</h2>

            <Formik initialValues={{}} onSubmit={handleSubLogin} validationSchema={validationLogin}>
                <Form className='login-form'>
                    <div>
                        <Field as="select" name="type" className={`${style.field} ${style.selection}`}>
                            <option value="0">Aluno</option>
                            <option value="1">Professor</option>
                        </Field>
                    </div>
                    <div>
                        <Field name="email" className={style.field} placeholder="Email" />
                        <ErrorMessage component="span" name='email' className='form-error'/>
                    </div>
                    <div>
                        <Field name="password" className={style.field} placeholder="Senha" />
                        <ErrorMessage component="span" name='password' className='form-error'/>
                    </div>
                    <button className={style.button} type="submit">Enviar</button>
                </Form>
            </Formik>

            <div className={style.redirect}>
                <div><Link to="/" className={style.link}>{"Esqueci minha senha >"}</Link></div>
                <div></div>
                <div><Link to="/cadastro" className={style.link}>{"Novo cadastro >"}</Link></div>
            </div>
        </div>
    )
}

export default Login