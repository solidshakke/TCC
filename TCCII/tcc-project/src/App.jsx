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
import PedidoEdit from './pages/Pedidos/PedidoEdit';
import Dasboard from './pages/Pedidos/Dasboard';
import FornecedorEdit from './pages/Fornecedores/FornecedorEdit';
import MateriaisEdit from './pages/Materiais/MateriaisEdit';
import ShowPedidos from './pages/Pedidos/ShowPedidos';
import ViewMaterial from './pages/Materiais/ViewMaterial';
import ViewFornecedor from './pages/Fornecedores/ViewFornecedor';

import TestePedido from './pages/Pedidos/TestePedido';
import TestePedido_2 from './pages/Pedidos/TestePedido_2';

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
              <Route path="/teste" element={<TestePedido/>} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" /> } />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" /> } />
              <Route path="/create/pedido" element={user ? <Pedido /> : <Navigate to="/login" /> } />
              <Route path="/dashboard/pedido" element={user ? <Dasboard /> : <Navigate to="/login" /> } />
              <Route path="/edit/pedido" element={user ? <PedidoEdit /> : <Navigate to="/login" /> } />
              <Route path="/show/pedido" element={user ? <ShowPedidos /> : <Navigate to="/login" /> } />
              <Route path="/create/fornecedor" element={user ? <Fornecedor /> : <Navigate to="/login" /> } />
              <Route path="/edit/fornecedor" element={user ? <FornecedorEdit/> : <Navigate to="/login" /> } />
              <Route path="/show/fornecedor" element={user ? <ViewFornecedor/> : <Navigate to="/login" /> } />
              <Route path="/create/materiais" element={user ? <Materiais /> : <Navigate to="/login" /> } />
              <Route path="/edit/materiais" element={user ? <MateriaisEdit/> : <Navigate to="/login" />} />
              <Route path="/show/materiais" element={user ? <ViewMaterial/> : <Navigate to="/login" />} />
            </Routes>
          </div>
        <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;

