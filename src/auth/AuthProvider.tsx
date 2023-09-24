import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import axios from "axios";

type AuthContextType = {
    signIn: (username: string, password: string) => void;
    signOut: () => void;
    isSigned: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authStorageKey = 'auth_token';

function AuthProvider({children}: {children: ReactNode}) {
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        if (!!localStorage.getItem(authStorageKey)) {
            setSigned(true);
        }
    }, [])

    const authContextValue = {
        signIn: (username: string, password: string) => {
            axios.post('login', {username: username, password: password})
                .then(response => {
                    if (response.status === 200) {
                        localStorage.setItem(authStorageKey, response.data.token);
                        setSigned(true);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        signOut: () => {
            localStorage.removeItem(authStorageKey);
            setSigned(false);
        },
        isSigned: signed
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}

export default AuthProvider;