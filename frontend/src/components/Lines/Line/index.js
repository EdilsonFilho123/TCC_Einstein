import style from "./Line.module.css"
import { Link } from "react-router-dom";

function Line(props) {
    return (
        <div className={style.line}>
            <Link to={props.to} className={style.items}>
                {props.children}
            </Link>

            <div>{props.right || null}</div>
        </div>
    )
}

export default Line