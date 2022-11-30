import Default from "../Default";
import style from "./Conta.module.css"

function Conta(){
    return (
        <Default>
            <h2>Conta e Configurações</h2>
            <button className={style.logout} onClick={() => {localStorage.setItem('authToken', ''); document.location.reload(true)}}>LOGOUT</button>
        </Default>
    )
}

export default Conta