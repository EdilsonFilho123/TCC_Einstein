import Default from "../Default";
import style from "./Turmas.module.css"
import { Link, } from "react-router-dom";
import Turma from "../../components/Lines/Turma";

function Turmas(){

    return (
        <Default>
            <div className={style.cabecalho}>
                <div className={style.cantoL}></div>

                <h2>Turmas</h2>

                <Link className={style.cantoR}>
                    <div className={style.vert}></div>
                    <div className={style.horiz}></div>
                </Link>
            </div>
            
            <Turma nomeTurma={"Matematica Avancada - 1"} to="/postagens?id=1"/>
        </Default>
    )
}

export default Turmas