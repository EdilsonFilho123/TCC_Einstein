/* eslint-disable array-callback-return */
import Axios from "axios";
import { useState } from "react";
import Post from "../../components/Posts/Post";
import Default from "../Default";

function Postagens(props){

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id") // livros

    const [posts, setPost] = useState();
    const [nome, setNome] = useState();

    const carregaPosts = () => {
        Axios.post("http://localhost:3001/carregaPosts", {
            idMateriasDoAluno: id,
        }).then(response => {
            if(response.data.err)
                alert("Erro no servidor! Por favor, tente mais tarde!");
            else{
                setPost(response.data.posts);
                setNome(response.data.nome);
            }
        })
    }
    
    return (
        <Default>
            {/* {carregaPosts} */}
            <h2>Postagens de {nome}</h2>
            {posts.map(item => {
                <Post txt={item} />
            })}
        </Default>
    )
}

export default Postagens