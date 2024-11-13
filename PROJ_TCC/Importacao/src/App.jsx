import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

//components
import Navbar from './components/Navbar';
import SearchForm from './components/SearchForm';

//pages
import Home from './pages/Home';
import CPedidos from './pages/CPedidos';
import Search from './pages/Search';
import Product from './pages/Product';
import CMateriais2 from './pages/CMateriais2';
import CFornecedor from './pages/CFornecedor';


function App() {
  return (
    
    <div className="App">
      <div className="logo">
        <img src="/LPlogo.png" alt="logo" width="320px"/>
      </div>
      <h1 className="index">LP BRASIL OSB</h1>
      <h2 className="h2impo">IMPORTAÇÕES</h2>
      <BrowserRouter>
        <Navbar />
        <SearchForm />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cpedidos" element={<CPedidos />} />
          <Route path="/cmateriais2" element={<CMateriais2 />} />
          <Route path="/cfornecedor" element={<CFornecedor />} />
          <Route path="/search" element={<Search />} />
          <Route path="/products/:id" element={<Product />} />
          {/*<Route path="/products/:id/info" element={<Info />} />
          <Route path="/company" element={<Navigate to="/about"/>} />
          <Route patch="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;