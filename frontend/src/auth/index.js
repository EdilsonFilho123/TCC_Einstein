import { Navigate } from "react-router-dom";
// import { useState } from "react";
import Axios from "axios";

function RequireAuth(props) {

    const token = localStorage.getItem("authToken");
    // const [valido, setValido] = useState();

    if(!token)
        return <Navigate to={"/login" }/>;

    Axios.defaults.headers['Content-Type'] = 'application/json';
    Axios.defaults.headers['x-access-token'] = token;

    Axios.post("http://localhost:3001/verifyToken", {}
    ).then(response => {
        if(!response.data.auth)
            return <Navigate to={"/login" } />;
    })
    
    return props.children;
};

export default RequireAuth;