import { useState, useEffect } from 'react';
import './admin.css';

import { auth, db } from '../../firebaseconnection';
import { signOut } from 'firebase/auth';
import { 
    addDoc, 
    collection,  
    onSnapshot,
    query,
    orderBy,
    where,
    deleteDoc,
    doc,
    updateDoc
} from 'firebase/firestore';

export default function Admin() {

    const [tarefaIput, setTarefaInput] = useState('');
    const [user, setUser] = useState({});
    const [tarefas, setTarefas] = useState([]);
    const [edit, setEdit] = useState({});

    useEffect(() => {
        async function loadTarefas() {
            const userDetail = localStorage.getItem('@user');
            setUser(JSON.parse(userDetail));

            if(userDetail){
                const data = JSON.parse(userDetail);

                const tarefasRef = collection(db, 'tarefas');
                const q = query(tarefasRef, orderBy('created', 'desc'), where('userUid', '==', data.uid));

                const unsub = onSnapshot(q, (snapshot) => {
                    let list = [];

                    snapshot.forEach((doc) => {
                        list.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })
                    });

                    setTarefas(list);
                });
            }

        }

        loadTarefas();
    }, []);

    async function handleRegister(e) {
        e.preventDefault();
        
        if(tarefaIput === '') {
            alert('Preencha a tarefa');
            return;
        }

        if(edit?.id) {
            handleUpdateTarefa();
            return;
        }        

        await addDoc(collection(db, 'tarefas'), {
            tarefa: tarefaIput,
            created: new Date(),
            userUid: user?.uid
        })
        .then(() => {
            console.log('Tarefa cadastrada com sucesso!');
            setTarefaInput('');
        })
        .catch(() => {
            alert('Erro ao cadastrar tarefa');
        })
        
    }

    async function handleLogout() {
        await signOut(auth);
    }

    async function deleteTarefa(id) {
        const docRef = doc(db, 'tarefas', id);
        await deleteDoc(docRef);
    }

    function editTarefa(item) {
        setTarefaInput(item.tarefa);
        setEdit(item);
    }

    async function handleUpdateTarefa() {
        const docRef = doc(db, 'tarefas', edit.id);
        await updateDoc(docRef, {
            tarefa: tarefaIput
        })
        .then(() => {
            setEdit({});
            setTarefaInput('');
        })
        .catch(() => {
            alert('Erro ao atualizar tarefa');
        })
    }


    return (
        <div className="admin-container">
            <h1>Minhas tarefas</h1>

            <form className="form" onSubmit={handleRegister}>
                <textarea 
                    placeholder="Digite sua tarefa"
                    value={tarefaIput}
                    onChange={(e) => setTarefaInput(e.target.value)}
                />
                {Object.keys(edit).length > 0 ? (
                    <button className='btn-register' type="submit">Atualizar Tarefa</button>
                ) : (
                    <button className='btn-register' type="submit">Cadastrar Tarefa</button>
                )}
            </form>

            {tarefas.map((item) => (
                        <article key={item.id} className="list">
                        <p>{item.tarefa}</p>
            
                        <div>
                            <button onClick={() => editTarefa(item)}>Editar</button>
                            <button onClick={() => deleteTarefa(item.id)} className='btn-delete'>Concluir</button>
                        </div>
                    </article>
            ))}

        <button className='btn-logout' onClick={handleLogout}>Sair</button>

        </div>
    );
}