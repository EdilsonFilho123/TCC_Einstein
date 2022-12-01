import Axios from "axios";
import { useState } from "react";

function VerifyProf({bodyAl, bodyProf}) {

    const token = localStorage.getItem('authToken');
    const [userProf, setUserProf] = useState();

    Axios.defaults.headers['Content-Type'] = 'application/json';
    Axios.defaults.headers['x-access-token'] = token;

    Axios.post("http://localhost:3001/verifyType", {}
    ).then(response => setUserProf(response.data.isProf));

    if(userProf)
        return bodyProf;
    else
        return bodyAl;
}

export default VerifyProf