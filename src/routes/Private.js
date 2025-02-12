import { useState, useEffect } from "react";
import { auth } from "../firebaseconnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function Private({children}) {

    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        async function checkLogin() {
            await onAuthStateChanged(auth, (user) => {
                if(user) {
                    const userData = {
                        uid: user.uid,
                        email: user.email,
                    }

                    localStorage.setItem('@user', JSON.stringify(userData));

                    setLoading(false);
                    setSigned(true);
                    
                }else {
                    setSigned(false);
                    setLoading(false);
                }
            });
        }
        checkLogin();
    }, []);

    if(loading) {
        return (
            <div>
            </div>

        )
    }

    if(!signed) {
        return <Navigate to="/" />
    }

    return children;
}