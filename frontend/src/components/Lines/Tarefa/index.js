import style from "./Tarefa.module.css"
import { Link } from "react-router-dom";
import Line from "../Line";

function Tarefa({nomeAt, prazoAt, nomeMateria, idMateria, handle}) {
    return (
        <Line right={prazoAt || new Date().getUTCDate()} handle={handle}>
            <li className={style.iconli}></li>
            <div>{`${nomeAt} `} <Link to={`/materia?id=${idMateria}`} className={style.link}>{` (${nomeMateria})`}</Link></div>
        </Line>
    )
}

export default Tarefa