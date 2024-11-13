import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useState } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../contexts/AuthContext";


const Navbar = () => {
    const {user} = useAuthValue();
    const {logout} = useAuthentication();

  return ( 
    <nav className={styles.navbar}>
        <NavLink className={styles.brand} to="/">
        <div className="navbar-logo">
             <img src="/LPlogo.png" alt="logo" className="logo-image" width="50px"/>
             <span className="navbar-text">LP Brasil OSB - Importações</span>
        </div>
        </NavLink>
        <ul className={styles.links_list}>
            {user && (
            <>
                <li>
                    <NavLink to="/" className={({ isActive}) => (isActive ? styles.active : "")}>Home</NavLink>
                </li>
            </>
            )}
            {!user && (
                <>
                <li>
                    <NavLink to="/login" className={({ isActive}) => (isActive ? styles.active : "")}>Entrar</NavLink>
                </li>
                <li>
                    <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : "")}> Cadastrar </NavLink>
                </li>
                </>
            )}
            {user && (
                <>
                <li>
                    <NavLink to="/create/pedido" className={({ isActive }) => (isActive ? styles.active : "")}> Pedidos </NavLink>
                </li>
                <li>
                    <NavLink to="/create/fornecedor" className={({ isActive }) => (isActive ? styles.active : "")}> Fornecedor </NavLink>
                </li>
                <li>
                    <NavLink to="/create/materiais" className={({ isActive }) => (isActive ? styles.active : "")}> Material </NavLink>
                </li>
                </>
            )}
            <li>
                 <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : "")}> Sobre </NavLink>
            </li>
            {user && (
                <li>
                    <button onClick={logout}>Sair</button>
                </li>
            )}

        </ul>
    </nav>
  );
};

export default Navbar