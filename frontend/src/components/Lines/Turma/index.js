import style from "./Turma.module.css"
import Line from "../Line";

function Turma({nomeTurma, to}) {
    const r = (
        <div className={style.dicon}>
            <li className={style.iconliright} onClick={() => {alert("Uepa")}}></li>
            <li className={style.iconliright2}></li>
        </div>
    )

    return (
        <Line to={to} right={r}>
            <li className={style.iconli}></li>
            <div>{nomeTurma}</div>
        </Line>
    )
}

export default Turma