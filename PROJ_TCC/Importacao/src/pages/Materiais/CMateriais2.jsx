import React from 'react'
import { POST_MATERIAL } from '../../components/api';
import useFetch2 from '../../hooks/useFetch2';
import { useState } from 'react';

const CMateriais2 = () => {
    const [cod_sap, setCodSap] = useState("");
    const [nome, setNome] = useState("");
    const [ncm, setNcm] = useState("");
    const [cfop, setCfop] = useState("");
    const { data, success, loading, error, request } = useFetch2();
    async function handleSalvar(){
      const {url, options} = POST_MATERIAL({
        requisicao: 'POST_MATERIAL',
        cod_sap: cod_sap,
        nome: nome,
        nm: ncm,
        cfop: cfop,
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
    <div>
    <label>   
        <span>Código do Material: </span>
        <input type="text" name="cod_sap" placeholder="Digite o código do Material" onChange={(e) => setCodSap(e.target.value)} value={cod_sap}/>
    </label>
    <label>   
        <span>Nome do Material: </span>
        <input type="text" name="nome" placeholder="Digite o nome do material" onChange={(e) => setNome(e.target.value)} value={nome}/>
    </label>
    <label>   
        <span>CFOP: </span>
        <input type="text" name="cfop" placeholder="Digite o CFOP do material" onChange={(e) => setCfop(e.target.value)} value={cfop}/>
    </label>
    <label>   
        <span>NCM: </span>
        <input type="text" name="ncm" placeholder="Digite a NCM do material" onChange={(e) => setNcm(e.target.value)} value={ncm}/>
    </label>
    <button onClick={handleSalvar}>Salvar</button>
</div>
  )
}

export default CMateriais2