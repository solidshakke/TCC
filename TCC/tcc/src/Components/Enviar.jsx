import React from 'react'
import { POST_PEDIDO } from './Components/api'
import useFetch from './Components/useFetch';

function Enviar() {
  const [count, setCount] = React.useState(0)
  const { data, success, loading, error, request } = useFetch();
  async function handleSalvar(){
    const {url, options} = POST_PEDIDO({
      requisicao: "POST_PEDIDO",
      pedido: "pedido",
      cod_fornecedor: 1,
      invoice:"invoice",
      data_invoice: "data_invoice",
      data_prontidao: "data_prontidao",
      etd: "etd",
      eta: "eta",
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
    </>
    
  );
};
export default Enviar;