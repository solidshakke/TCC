import { useState } from 'react'
import './MyForm.css'

const MyForm = ({user}) => {
    // 6 - Controlled input
    // 3 - gerenciamento de dados
    const [name, setName] = useState(user ? user.name : "");
    const [email, setEmail] = useState(user ? user.email : "");
    const [bio, setBio] = useState("");
    const [role, setRole] = useState("");

    const handleName = (e) => {
        setName(e.target.value);
    };

 //   console.log(name);
 //   console.log(email);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Enviando o formulário");
        console.log(name, email, bio, role);

        // validação
        // envio

        // 7 - Limpar form
        setName("");
        setEmail("");
        setBio("");
        setRole("");
    };

  return (
    <div>

        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Nome:</label> {/* htmlFor e em name deve conter o mesmo "nome"*/}
                <input type="text" name="name" placeholder="Digite o seu nome" onChange={handleName} value={name}/>
                
            </div>
            {/* 2 - Label envolvendo input */}
            <label>
                <span>E-mail</span>
                {/* 4 - Simplificação de manipulação de state*/}
                <input type="email" name="email" placeholder="Digite o seu e-mail" onChange={(e) => setEmail(e.target.value)} value={email}/>
                
            </label>
            {/* 8 - textarea */}
            <label>
                <span>Bio: </span>
                <textarea name="bio" placeholder="Descrição do usuário" onChange={(e) => setBio(e.target.value) } value={bio}></textarea>
            </label>
            {/* 9 - select */}
            <label>
                <span>Função no Sistema</span>
                <select name="role" onChange={(e) => setRole(e.target.value)}>
                    <option value="user">Usuário</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Administrador</option>
                </select>
            </label>
            <input type="submit" value="Enviar"></input>
        </form>
    </div>
  );
};

export default MyForm;