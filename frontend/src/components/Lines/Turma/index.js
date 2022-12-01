import { useNavigate } from "react-router-dom";
import style from "./Turma.module.css"
import Line from "../Line";
import Axios from "axios";

function Turma({nomeTurma, id, to}) {

    const navigate = useNavigate();

    const handleLixo = () => {
        Axios.defaults.headers['Content-Type'] = 'application/json';
        Axios.defaults.headers['x-access-token'] = localStorage.getItem('authToken');

        Axios.post("http://localhost:3001/deleteTurma", {
            idTurma: id
        }).then(response => {
            if(response.data.err)
                alert("Erro na conexão do servidor! \nTente novamente mais tarde!");
            else
                if (response.data.deleted)
                    navigate("/turmas");
                else 
                    alert("Houve um problema na criação da Turma!!!");
            
            // document.getElementById("form").style.display = 'none';
        })
    }

    const r = (
        <div className={style.dicon}>
            <button className={style.btn} onClick={() => {navigate(to)}}><li className={style.iconliright}></li></button>
            <button className={style.btn} onClick={() => {handleLixo()}}><li className={style.iconliright2} onClick={handleLixo}></li></button>
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