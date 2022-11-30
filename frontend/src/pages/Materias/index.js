import Materia from "../../components/Lines/Materia";
import Default from "../Default";

function Materias(){
    return (
        <Default>
            <h2>Materias</h2>

            <Materia nomeMateria="Matematica" handle={() => {alert("Piscou")}}/>
            <Materia nomeMateria="Geografia" handle={() => {alert("Piscou")}}/>
        </Default>
    )
}

export default Materias