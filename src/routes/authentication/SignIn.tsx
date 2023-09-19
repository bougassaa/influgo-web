import React from 'react';
import axios from "axios";

function SignIn() {
    const handleSignIn = async () => {
        const data = {username: 'amine@live.fr', password: 'azerty'};
        axios.post('http://127.0.0.1:8000/api/login', data)
            .then(response => {
                if (response.status === 200) {
                    // response.data.token
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    );
}

export default SignIn;