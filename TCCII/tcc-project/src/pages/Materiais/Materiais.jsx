import styles from './Materiais.module.css';
import React from 'react'
import { POST_MATERIAL } from '../../components/api';
import { useState } from 'react';
import useFetch2 from '../../hooks/useFetch2';
import Showmateriais from './ShowMateriais';
import Swal from 'sweetalert2'

const Materiais = () => {
    const [cod_sap, setCodSap] = useState("");
    const [nome, setNome] = useState("");
    const [ncm, setNcm] = useState("");
    const [cfop, setCfop] = useState("");
    const { data, success, loading, error, request } = useFetch2 ();
    async function handleSalvar(){
      const {url, options} = POST_MATERIAL({
        requisicao: 'POST_MATERIAL',
        cod_sap: cod_sap,
        nome: nome,
        ncm: ncm,
        cfop: cfop,
       })
      const {json, response} = await request(url, options);
      //console.log(json);
      //console.log(json.success);
      //const message_aux = json.result;
      if (json.success){
        mensagemOK("Material salvo com sucesso!");
      } else {
        console.log('Deu ruim');
      }
     console.log (json);
    }

    function mensagemOK(msg) {
      Swal.fire({
        text: msg,
        icon: "success"
        }).then((result) => {
        if (result.isConfirmed) {
            window.location.reload();
        }
    });
    }

  return (
    <div className={styles.material}>
      <h1>Cadastro de Material</h1>
  {/*<form>*/}
    <div className={styles.form}>
      <label>   
          <span>Código do Material: </span>
          <input type="text" name="cod_sap" placeholder="Digite o código do Material" onChange={(e) => setCodSap(e.target.value)} value={cod_sap}/>
      </label>
      <label>   
          <span>Nome do Material: </span>
          <input type="text" name="nome" placeholder="Digite o nome do material" required onChange={(e) => setNome(e.target.value)} value={nome}/>
      </label>
      <label>   
          <span>CFOP: </span>
          <input type="text" name="cfop" placeholder="Digite o CFOP do material" required onChange={(e) => setCfop(e.target.value)} value={cfop}/>
      </label>
      <label>   
          <span>NCM: </span>
          <input type="text" name="ncm" placeholder="Digite a NCM do material" onChange={(e) => setNcm(e.target.value)} value={ncm}/>
      </label>
      <button className="btn" onClick={handleSalvar}>Salvar</button>
  </div>
  {/*</form>*/}
  <Showmateriais />
</div>
  )
}

export default Materiais;