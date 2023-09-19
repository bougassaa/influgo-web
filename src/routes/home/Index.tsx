import React from 'react';
import {Link} from "react-router-dom";

function Index() {
    return (
        <div>
            <h1>Login 🤓</h1>
            <div>
                <Link to="/signin">Sign In</Link>
            </div>
        </div>
    );
}

export default Index;