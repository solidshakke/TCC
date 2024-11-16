import styles from './Pedido.module.css';
import React from 'react'
import { POST_PEDIDO } from '../../components/api';
import { useState, useEffect } from 'react';
import useFetch2 from '../../hooks/useFetch2';
import { GET_FORNECEDOR } from '../../components/api';



const Pedido = () => {
    const [pedido, setPedido] = useState("");
    const [fornecedor, setFornecedor] = useState(0);
    const [invoice, setInvoice] = useState("");
    const [data_invoice, setDataInvoice] = useState("");
    const [data_prontidao, setDataProntidao] = useState("");
    const [etd, setEtd] = useState("");
    const [eta, setEta] = useState("");

    const { data, success, loading, error, request } = useFetch2 ();
    const [datas, setDatas] = useState([]);

    
    useEffect(() => {
        async function listPedidos (){
            const {url, options} = GET_FORNECEDOR ({
                requisicao:"GET_FORNECEDOR"
            });
            const {json, response} = await request (url, options);
            if (json.success){
                setDatas(json.result);
                console.log(datas);
            } else {console.log("Deu ruim")}                                        
        }
        listPedidos();
    }, [])

    async function handleSalvar(){
      const {url, options} = POST_PEDIDO({
        requisicao: 'POST_PEDIDO',
        pedido: pedido,
        cod_fornecedor: Number(fornecedor),
        invoice: invoice,
        data_invoice: data_invoice,
        data_prontidao: data_prontidao,
        etd: etd,
        eta: eta,
       })
    //    const handleSubmit = async (e) => {
    //     e.preventDefault ()
    //       const product = {
    //         pedido,
    //         fornecedor,
    //         invoice,
    //         data_invoice,
    //         data_prontidao,
    //         etd,
    //         eta,
    //       };
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
    <div className={styles.pedidos}>
      <h1>Criar Pedido</h1>
      {/*<form>*/}
        <div className={styles.form}>
            <label>   
                <span>Pedido: </span>
                <input type="text" name="pedido" placeholder="Digite o nº do Pedido" required onChange={(e) => setPedido(e.target.value)} value={pedido}/>
            </label>
            <label>   
                <span>Fornecedor: </span>
                <select value={fornecedor} onChange={(e) => setFornecedor(e.target.value)} >
                <option value="">Selecione um Fornecedor</option>
                {datas.map((fornecedor) => (
                    <option key={fornecedor.cod_fornecedor} value={fornecedor.cod_fornecedor}>{fornecedor.nome}</option>
                ))}
            </select>
                {/* <input type="text" name="fornecedor" placeholder="Digite o nome do Fornecedor" required onChange={(e) => setFornecedor(e.target.value)} value={fornecedor}/> */}
            </label>
            <label>   
                <span>Invoice: </span>
                <input type="text" name="invoice" placeholder="Digite o nº da Invoice" onChange={(e) => setInvoice(e.target.value)} value={invoice}/>
            </label>
            <label>   
                <span>Data da Invoice: </span>
                <input type="date" name="data_invoice" placeholder="Digite a data da Invoice" onChange={(e) => setDataInvoice(e.target.value)} value={data_invoice}/>
            </label>
            <label>   
                <span>Data de Prontidão: </span>
                <input type="date" name="data_prontidao" placeholder="Digite a data de Prontidão do Pedido" onChange={(e) => setDataProntidao(e.target.value)} value={data_prontidao}/>
            </label>
            <label>   
                <span>ETD: </span>
                <input type="date" name="etd" onChange={(e) => setEtd(e.target.value)} value={etd}/>
            </label>
            <label>   
                <span>ETA: </span>
                <input type="date" name="eta" onChange={(e) => setEta(e.target.value)} value={eta}/>
            </label>
            <button className="btn" onClick={handleSalvar}>Salvar</button>
        </div>
      {/*</form>*/}
      {/* <div><h1>Código selecionado: {fornecedor}</h1></div> TESTE FORNECEDOR SELECIONADO */}
</div>

  )
}

export default Pedido;