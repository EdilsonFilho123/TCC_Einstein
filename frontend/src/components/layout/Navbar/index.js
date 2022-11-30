import { Link } from "react-router-dom";
import RequireAuth from "../../../auth";
import style from "./Navbar.module.css"

function Navbar(){
    const isProf = <Link to="/turmas" className={style.link}>Turmas</Link>;
    const isAluno = <Link to="/materias" className={style.link}>Materias</Link>;

    return (
        <nav className={style.list}>
            <div className={style.logo}>
                Conexão <br/> 
                Aluno
            </div>
            <ul className={style.list}>
                {/* <li className={style.item}><Link to="/home" className={style.link}>Home</Link></li> */}
                <li className={style.item}><Link to="/calendario" className={style.link}>Calendario</Link></li>
                <li className={style.item}><Link to="/tarefas" className={style.link}>Tarefas</Link></li>
                <li className={style.item}><Link to="/provas" className={style.link}>Provas</Link></li>
                <li className={style.item}><Link to="/notas" className={style.link}>Notas</Link></li>
                <li className={style.item}><RequireAuth verifyProf={true} profFalse={isAluno} children={isProf} /></li>
                <li className={style.item}><Link to="/config" className={style.link}>Configurações</Link></li>
            </ul>
            <div className={style.conta}>
            </div>
        </nav>
    )
}

export default Navbar