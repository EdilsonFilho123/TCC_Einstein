import Materia from "../../components/Lines/Materia";
import { useState, useEffect } from "react"
import Default from "../Default";
import Axios from "axios";

function Materias(){

    const [buscaM, setBuscaM] = useState([])
    const [buscaN, setBuscaN] = useState([])

    const buscaMat = () => {
        Axios.defaults.headers['Content-Type'] = 'application/json';
        Axios.defaults.headers['x-access-token'] = localStorage.getItem('authToken');

        Axios.post("http://localhost:3001/carregaMaterias", {
        }).then(response => {
            if(response.data.err)
                alert("Erro na conexão do servidor! \nTente novamente mais tarde!");
            else
                setBuscaM(response.data.materias);
            
            // document.getElementById("form").style.display = 'none';
        })

        return buscaM;
    }

    const buscaNomeMat = (id) => {
        Axios.defaults.headers['Content-Type'] = 'application/json';
        Axios.defaults.headers['x-access-token'] = localStorage.getItem('authToken');

        Axios.post("http://localhost:3001/carregaNomeMaterias", {
            id: id
        }).then(response => {
            if(response.data.err)
                alert("Erro na conexão do servidor! \nTente novamente mais tarde!");
            else
                setBuscaN(response.data.dadosMat);
            
            // document.getElementById("form").style.display = 'none';
        })

        return buscaN;
    }

    
    return (
        <Default>
            <h2>Materias</h2>

            {
                buscaMat().map(item => {
                    const linha = buscaNomeMat(item.idMateria);
                    return <Materia nomeMateria={linha.nome} />
                })
                
            }

            {/* <Materia nomeMateria="Matematica" handle={() => {alert("Piscou")}}/>
            <Materia nomeMateria="Geografia" handle={() => {alert("Piscou")}}/> */}
        </Default>
    )
}

export default Materias