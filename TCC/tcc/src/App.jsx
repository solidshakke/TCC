import React from 'react'
import './App.css'
import { POST_PEDIDO } from './Components/api'
import useFetch from './Components/useFetch';
import MyForm from './Components/MyForm';


function App() {
  const [count, setCount] = React.useState(0)
  const { data, success, loading, error, request } = useFetch();
  async function handleSalvar(){
    const {url, options} = POST_PEDIDO({
      requisicao: 'POST_PEDIDO',
      pedido: '4700002000',
      cod_fornecedor: 1,
      invoice:'49299',
      data_invoice: '2024-11-02',
      data_prontidao: '2024-11-02',
      etd: '2024-11-11',
      eta: '2024-11-13',
     })
    const {json, response} = await request (url, options);
    //console.log(json);
    //console.log(json.success);
    //const message_aux = json.result;
    if (json.success){
      console.log('Deu boa');
    } else {
      console.log('Deu ruim');
    }
   console.log (json);
  }
  return (
    <>
      <button onClick={handleSalvar}>Salvar</button>
      

      <div className="App">
        <h1>Importação</h1>
        <MyForm />

      </div>
    </>
    
  )
}

export default App
