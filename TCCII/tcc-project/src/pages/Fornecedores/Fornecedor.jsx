import styles from './Fornecedor.module.css';
import React from 'react';
import { useState } from 'react';
import useFetch2 from '../../hooks/useFetch2';
import { POST_FORNECEDOR } from '../../components/api';

const Fornecedor = () => {
    const [cod_sap, setCodSap] = useState("");
    const [nome, setNome] = useState("");
    const [moeda, setMoeda] = useState("");
    const [incoterm, setIncoterm] = useState("");
    const { data, success, loading, error, request } = useFetch2();
    async function handleSalvar(){
      const {url, options} = POST_FORNECEDOR({
        requisicao: 'POST_FORNECEDOR',
        cod_sap: cod_sap,
        nome: nome,
        moeda: moeda,
        incoterm: incoterm,
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
    <div className={styles.fornecedor}>
      <h1>Cadastro de Fornecedor</h1>
      <form>
      <div>
        <label>   
            <span>Código do Fornecedor: </span>
            <input type="text" name="cod_sap" placeholder="Digite o código do Fornecedor" required onChange={(e) => setCodSap(e.target.value)} value={cod_sap}/>
        </label>
        <label>   
            <span>Nome do Fornecedor: </span>
            <input type="text" name="nome" placeholder="Digite o nome do Fornecedor" required onChange={(e) => setNome(e.target.value)} value={nome}/>
        </label>
        <label>   
            <span>Moeda: </span>
            <input type="text" name="moeda" placeholder="Digite a moeda" required onChange={(e) => setMoeda(e.target.value)} value={moeda}/>
        </label>
        <label>   
            <span>Incoterm: </span>
            <input type="text" name="incoterm" placeholder="Digite a Incoterm" onChange={(e) => setIncoterm(e.target.value)} value={incoterm}/>
        </label>
        <button className="btn" onClick={handleSalvar}>Salvar</button>
      </div>
      </form>
    </div>
  );
};

export default Fornecedor;