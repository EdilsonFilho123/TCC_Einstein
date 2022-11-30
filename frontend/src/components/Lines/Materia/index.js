import style from "./Materia.module.css"
import Line from "../Line";

function Prova({nomeMateria, handle}) {
    return (
        <Line right={<div className={style.dicon}><li className={style.iconliright}></li></div>} handle={handle}>
            <li className={style.iconli}></li>
            <div>{nomeMateria}</div>
        </Line>
    )
}

export default Prova