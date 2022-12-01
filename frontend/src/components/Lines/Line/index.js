import style from "./Line.module.css"
import { Link } from "react-router-dom";

function Line(props) {
    return (
        <Link to={props.to} className={style.line}>
            <div className={style.items}>
                {props.children}
            </div>

            <div>{props.right || null}</div>
        </Link>
    )
}

export default Line