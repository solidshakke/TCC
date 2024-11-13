import { useState } from 'react'
import './MyForm.css'

const MyForm = ({user}) => {
    const [pedido, setPedido] = useState(user ? user.pedido : "");
    const [fornecedor, setFornecedor] = useState(user ? user.fornecedor : "");
    const [invoice, setInvoice] = useState("");
    const [data_invoice, setDataInvoice] = useState("");
    const [data_prontidao, setDataProntidao] = useState("");
    const [etd, setEtd] = useState("");
    const [eta, setEta] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Enviando o formulário");
        console.log(pedido, fornecedor, invoice, data_invoice, data_prontidao, etd, eta);

        setPedido("");
        setFornecedor("");
        setInvoice("");
        setDataInvoice("");
        setDataProntidao("");
        setEtd("");
        setEta("");
    };

    
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>   
                    <span>Pedido: </span>
                    <input type="text" name="pedido" placeholder="Digite o nº do Pedido" onChange={(e) => setPedido(e.target.value)} value={pedido}/>
                </label>
                <label>   
                    <span>Fornecedor: </span>
                    <input type="text" name="fornecedor" placeholder="Digite o nome do Fornecedor" onChange={(e) => setFornecedor(e.target.value)} value={fornecedor}/>
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
            </div>
 
            <input type="submit" value="Enviar"></input>
        </form>
    </div>
  );
};

export default MyForm;