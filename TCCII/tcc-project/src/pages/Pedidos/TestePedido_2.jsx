import styles from './Pedido.module.css';
import React, { useState, useEffect } from 'react';
import { POST_PEDIDO, GET_PEDIDOS, GET_FORNECEDOR } from '../../components/api'; // Adicione GET_PEDIDO para buscar pedidos
import useFetch2 from '../../hooks/useFetch2';


const TestePedido_2 = () => {
    const [pedido, setPedido] = useState("");
    const [fornecedor, setFornecedor] = useState(0);
    const [invoice, setInvoice] = useState("");
    const [data_invoice, setDataInvoice] = useState("");
    const [data_prontidao, setDataProntidao] = useState("");
    const [etd, setEtd] = useState("");
    const [eta, setEta] = useState("");
    const [isEdit, setIsEdit] = useState(false); // Estado para verificar se é uma edição de pedido
    const [pedidoId, setPedidoId] = useState(null); // ID do pedido a ser editado

    const { data, success, loading, error, request } = useFetch2();
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        async function listFornecedores() {
            const { url, options } = GET_FORNECEDOR({
                requisicao: "GET_FORNECEDOR"
            });
            const { json } = await request(url, options);
            if (json.success) {
                setDatas(json.result);
            } else {
                console.log("Erro ao buscar fornecedores");
            }
        }

        listFornecedores();
    }, []);

    // Função para carregar um pedido existente
    async function carregarPedido(id) {
        const { url, options } = GET_PEDIDOS({
            requisicao: "GET_PEDIDOS",
            id: id
        });
        const { json } = await request(url, options);
        if (json.success) {
            const pedidoData = json.result;
            setPedido(pedidoData.pedido);
            setFornecedor(pedidoData.cod_fornecedor);
            setInvoice(pedidoData.invoice);
            setDataInvoice(pedidoData.data_invoice);
            setDataProntidao(pedidoData.data_prontidao);
            setEtd(pedidoData.etd);
            setEta(pedidoData.eta);
            setIsEdit(true);
            setPedidoId(id); // Armazena o ID do pedido
        } else {
            console.log("Erro ao carregar pedido");
        }
    }

    async function handleSalvar() {
        const { url, options } = POST_PEDIDO({
            requisicao: isEdit ? 'UPDATE_PEDIDO' : 'POST_PEDIDO', // Muda a requisição para atualização se estiver editando
            id: pedidoId, // Envia o ID do pedido para atualização
            pedido: pedido,
            cod_fornecedor: Number(fornecedor),
            invoice: invoice,
            data_invoice: data_invoice,
            data_prontidao: data_prontidao,
            etd: etd,
            eta: eta,
        });

        const { json } = await request(url, options);
        if (json.success) {
            console.log(isEdit ? 'Pedido atualizado com sucesso' : 'Pedido salvo com sucesso');
        } else {
            console.log("Erro ao salvar pedido");
        }
    }

    return (
        <div className={styles.pedidos}>
            <h1>{isEdit ? "Editar Pedido" : "Criar Pedido"}</h1>
            <div className={styles.form}>
                <label>   
                    <span>Pedido: </span>
                    <input type="text" name="pedido" placeholder="Digite o nº do Pedido" required onChange={(e) => setPedido(e.target.value)} value={pedido} />
                </label>
                <label>   
                    <span>Fornecedor: </span>
                    <select value={fornecedor} onChange={(e) => setFornecedor(e.target.value)}>
                        <option value="">Selecione um Fornecedor</option>
                        {datas.map((fornecedor) => (
                            <option key={fornecedor.cod_fornecedor} value={fornecedor.cod_fornecedor}>{fornecedor.nome}</option>
                        ))}
                    </select>
                </label>
                <label>   
                    <span>Invoice: </span>
                    <input type="text" name="invoice" placeholder="Digite o nº da Invoice" onChange={(e) => setInvoice(e.target.value)} value={invoice} />
                </label>
                <label>   
                    <span>Data da Invoice: </span>
                    <input type="date" name="data_invoice" placeholder="Digite a data da Invoice" onChange={(e) => setDataInvoice(e.target.value)} value={data_invoice} />
                </label>
                <label>   
                    <span>Data de Prontidão: </span>
                    <input type="date" name="data_prontidao" placeholder="Digite a data de Prontidão do Pedido" onChange={(e) => setDataProntidao(e.target.value)} value={data_prontidao} />
                </label>
                <label>   
                    <span>ETD: </span>
                    <input type="date" name="etd" onChange={(e) => setEtd(e.target.value)} value={etd} />
                </label>
                <label>   
                    <span>ETA: </span>
                    <input type="date" name="eta" onChange={(e) => setEta(e.target.value)} value={eta} />
                </label>
                <button className="btn" onClick={handleSalvar}>{isEdit ? "Atualizar" : "Salvar"}</button>
            </div>
        </div>
    );
};

export default TestePedido_2;
