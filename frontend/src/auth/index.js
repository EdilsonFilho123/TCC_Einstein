// import { Navigate } from "react-router-dom";
// import { useState } from "react";
// import Axios from "axios";

function RequireAuth(props) {

    // const token = localStorage.getItem("token");
    // const [valido, setValido] = useState(false);
    // const [prof, setProf] = useState(false);

    // if(!token)
    //     return <Navigate to={"/login" }/>;

    if(props.verifyProf){
        // Axios.post("http://localhost:3001/verifyProf", {
        //     token: token,
        // }).then(response => setProf(response.data.isProf));

        if(false)
            return props.children
        else
            return props.profFalse || null;
    }

    // Axios.post("http://localhost:3001/verifyToken", {
    //     token: token,
    // }).then(response => setValido(response.data.isValide))
    
    // if(!valido)
    //     return <Navigate to={"/login" } />;
    
    return props.children;
};

export default RequireAuth;