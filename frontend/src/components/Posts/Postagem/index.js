import style from "./Postagem.module.css"

function Postagem({nome, conteudo, type}) {
    return (
        <div className={style.post}>
            <div className={style.cabecalho}>
                <h3>{nome}</h3>
                <div>Tipo: {type}</div>
            </div>
            <div className={style.corpo}>{conteudo}</div>
        </div>
    )
}

export default Postagem