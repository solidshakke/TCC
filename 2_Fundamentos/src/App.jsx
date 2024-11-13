// componentes
import FirstComponent from "./components/FirstComponent"
import TemplateExpressions from "./components/TemplateExpressions";
import MyComponent from "./components/MyComponent";
import Events from "./components/Events";

// style / CSS
import "./App.css";
import Challenge from "./components/Challenge";
  function App(){
    return(
      <div className="App">
        <h1>Funfamentos React</h1>
        <FirstComponent />
        <TemplateExpressions />
        <MyComponent />
        <Events />
        <Challenge />
      </div>
    )
   };
  
  export default App;
  