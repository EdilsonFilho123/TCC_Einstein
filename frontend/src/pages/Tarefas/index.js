import Tarefa from "../../components/Lines/Tarefa";
// import style from "./Tarefas.module.css"
import Default from "../Default";

function Tarefas(){
    return (
        <Default>
            <h2>Tarefas</h2>

            <Tarefa nomeAt={"Atividade Aula 01"} prazoAt={"2 / 12"} idMateria={1} nomeMateria={"Matematica"} handle={() => {alert("Foi")}}/>
            <Tarefa nomeAt={"Atividade Aula 01"} prazoAt={"2 / 12"} idMateria={1} nomeMateria={"Matematica"} handle={() => {alert("Foi")}}/>
            <Tarefa nomeAt={"Atividade Aula 01"} prazoAt={"2 / 12"} idMateria={1} nomeMateria={"Matematica"} />
            <Tarefa nomeAt={"Atividade Aula 01"} prazoAt={"2 / 12"} idMateria={1} nomeMateria={"Matematica"} />
            <Tarefa nomeAt={"Atividade Aula 01"} prazoAt={"2 / 12"} idMateria={1} nomeMateria={"Matematica"} />
            <Tarefa nomeAt={"Atividade Aula 01"} prazoAt={"2 / 12"} idMateria={1} nomeMateria={"Matematica"} />
            <Tarefa nomeAt={"Atividade Aula 01"} prazoAt={"2 / 12"} idMateria={1} nomeMateria={"Matematica"} />
            <Tarefa nomeAt={"Atividade Aula 01"} prazoAt={"2 / 12"} idMateria={1} nomeMateria={"Matematica"} />
        </Default>
    )
}

export default Tarefas