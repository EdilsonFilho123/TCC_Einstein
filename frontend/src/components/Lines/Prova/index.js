import style from "./Prova.module.css"
import { Link } from "react-router-dom";
import Line from "../Line";

function Prova({nomeAt, prazoAt, nomeMateria, idMateria, handle}) {
    return (
        <Line right={prazoAt || new Date().getUTCDate()} handle={handle}>
            <li className={style.iconli}></li>
            <div>{`${nomeAt} `} <Link to={`/materia?id=${idMateria}`} className={style.link}>{` (${nomeMateria})`}</Link></div>
        </Line>
    )
}

export default Prova