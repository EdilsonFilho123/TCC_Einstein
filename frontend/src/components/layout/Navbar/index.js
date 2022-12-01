import { Link } from "react-router-dom";
import style from "./Navbar.module.css";
import { useState } from "react";
import Axios from "axios";

function Navbar(){
    const [userProf, setUserProf] = useState(false);
    
    // const navigate = useNavigate();
    const isProf = <Link to="/turmas" className={style.link}>Turmas</Link>;
    const isAluno = <Link to="/materias" className={style.link}>Materias</Link>;

    const verifyUserType = (bodyAl, bodyProf) => {
        const token = localStorage.getItem('authToken');

        Axios.defaults.headers['Content-Type'] = 'application/json';
        Axios.defaults.headers['x-access-token'] = token;

        Axios.post("http://localhost:3001/verifyType", {}
        ).then(response => setUserProf(response.data.isProf));

        if(userProf)
            return bodyProf;
        else
            return bodyAl;
    }

    return (
        <nav className={style.list}>
            <Link to="/home" className={style.notList}>
                Conexão <br/> 
                {verifyUserType(<>Aluno</>, <>Professor</>)}
            </Link>
            <ul className={style.list}>
                {/* <li className={style.item}><Link to="/home" className={style.link}>Home</Link></li> */}
                <li className={style.item}><Link to="/calendario" className={style.link}>Calendario</Link></li>
                <li className={style.item}><Link to="/tarefas" className={style.link}>Tarefas</Link></li>
                <li className={style.item}><Link to="/provas" className={style.link}>Provas</Link></li>
                <li className={style.item}><Link to="/notas" className={style.link}>Notas</Link></li>
                <li className={style.item}>{verifyUserType(isAluno, isProf)}</li>
                <li className={style.item}><Link to="/config" className={style.link}>Configurações</Link></li>
            </ul>
            <Link to="/config" className={style.conta}>
            </Link>
        </nav>
    )
}

export default Navbar