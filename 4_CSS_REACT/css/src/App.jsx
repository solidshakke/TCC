import { useState } from 'react'
import './App.css'
import MyComponent from './components/MyComponent';
import Title from './components/Title';

  function App(){
    const n = 15;
    const [name] = useState("Leandro");
    const redTitle = true;
  return (
    <div className="App">
      {/* CSS global */}
      <h1>React com CSS</h1>
      {/* CSS de componente */}
      <MyComponent />
      <p className="my-comp-paragraph">Este também é do componente</p>
      <p>Este parágrafo é do App.jsx</p>
      {/* Inline CSS */}
      <p style={{color: "blue", padding: "25px", borderTop: "2px solid red"}}>Este elemneto foi estilizado de forma inline</p>
      {/* CSS inline dinâmico */}
      <h2 style={n < 10 ? ({color: "purple"}) : ({color: "pink"})}>
      CSS dinâmico
      </h2>
      <h2 style={name === "Leandro" ? ({color: "green", backgroundColor: "#000"}) : null}>
      Teste nome - Leandro
      </h2>
      {/* Classe dinâmica */}
      <h2 className={redTitle ? "red-title" : "title"}>Este título vai ter classe dinâmica</h2>
      {/* CSS Modules */}
      <Title />
    </div> 
  );
};

export default App;
