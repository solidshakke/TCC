import './App.css'
import { BrowserRouter, Router, Route, Navigate, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

//hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';


//context
import { AuthProvider } from './contexts/AuthContext';

//pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Fornecedor from './pages/Fornecedores/Fornecedor';
import Register from './pages/Register/Register';
import Materiais from './pages/Materiais/Materiais';
import Pedido from './pages/Pedidos/Pedido';


//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';



function App() {
  const [user, setUser] = useState(undefined);
  const {auth} = useAuthentication();
  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  },[auth]);

  if(loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{user}}>
        <BrowserRouter>
        <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={user ? <Home /> : <Navigate to="/login" /> } />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" /> } />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" /> } />
              <Route path="/create/pedido" element={user ? <Pedido /> : <Navigate to="/login" /> } />
              <Route path="/create/fornecedor" element={user ? <Fornecedor /> : <Navigate to="/login" /> } />
              <Route path="/create/materiais" element={user ? <Materiais /> : <Navigate to="/login" /> } />
            </Routes>
          </div>
        <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;

