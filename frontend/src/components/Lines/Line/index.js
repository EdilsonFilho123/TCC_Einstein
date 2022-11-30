import style from "./Line.module.css"

function Line(props) {
    return (
        <div className={style.line} onClick={props.handle}>
            <div className={style.items}>
                {props.children}
            </div>

            <div>{props.right || null}</div>
        </div>
    )
}

export default Line