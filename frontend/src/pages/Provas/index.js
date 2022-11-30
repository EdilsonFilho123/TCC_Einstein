import Prova from "../../components/Lines/Prova";
import Default from "../Default";

function Provas(){
    return (
        <Default>
            <h2>Provas</h2>

            <Prova nomeAt={"Prova P1"} prazoAt={"2 / 12"} idMateria={1} nomeMateria={"Portugues"} handle={() => {alert("Foi")}}/>
        </Default>
    )
}

export default Provas