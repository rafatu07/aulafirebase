import { useState } from "react";
import './home.css';

import { Link } from "react-router-dom";
import { auth } from "../../firebaseconnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
 
export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        
        if(email !== '' && password !== '') {
            await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/admin', {replace: true});
            })
            .catch(() => {
                console.log('Erro ao logar');
            });
        }else {
            alert('Preencha todos os campos');
        }

    }


    return (
        <div className="home-container">
            <h1>Lista de tarefas</h1>
            <span>Gerencie sua agenda</span>

            <form className="form" onSubmit={handleLogin}>
                <input 
                type="text" 
                placeholder="Digite seu email..."
                value={email}
                onChange={e => setEmail(e.target.value)} 
                />

                <input 
                type="password" 
                placeholder="******"
                value={password}
                onChange={e => setPassword(e.target.value)} 
                />

                <button type="submit">Acessar</button>
            </form>

            <Link className="register-link" to="/register">Ainda não possui uma conta? Cadastre-se</Link>
        </div>
    );
}