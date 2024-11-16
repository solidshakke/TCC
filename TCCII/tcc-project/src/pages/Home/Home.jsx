import React, { useState, useEffect } from 'react';
import { GET_VENCIMENTO_INVOICE, GET_PEDIDO_CHEGADA } from '../../components/api';
import useFetch2 from '../../hooks/useFetch2';
import styles from './Home.module.css';

const Home = () => {
    const [pedidos, setPedidos] = useState([]);
    const [vencimentoProximo, setVencimentoProximo] = useState([]);
    const [pedidoChegando, setPedidoChegando] = useState([]);
    const { data, success, loading, error, request } = useFetch2();

    const [saudacao, setSaudacao] = useState('');

    useEffect(() => {
        async function fetchPedidos() {
            const { url, options } = GET_VENCIMENTO_INVOICE({ requisicao: "GET_VENCIMENTO_INVOICE" });
            const { json } = await request(url, options);
            if (json.success) {
                setVencimentoProximo(json.result);
                console.log(json.result);
            } else {
                console.error("Erro ao buscar pedidos");
            }
        }
        fetchPedidos();
    }, [request]);

    useEffect(() => {
        async function fetchPedidosChegada() {
            const { url, options } = GET_PEDIDO_CHEGADA({ requisicao: "GET_PEDIDO_CHEGADA" });
            const { json } = await request(url, options);
            if (json.success) {
                setPedidoChegando(json.result);
                console.log(json.result);
            } else {
                console.error("Erro ao buscar pedidos");
            }
        }
        fetchPedidosChegada();
    }, [request]);

    useEffect(() => {
      const nomeUsuario = localStorage.getItem("nomeUsuario") || "Usuário";
      const agora = new Date();
      const hora = agora.getHours();
      
      if (hora >= 6 && hora < 12) {
        setSaudacao(`Bom dia, ${nomeUsuario}`);
      } else if (hora >= 12 && hora < 18) {
        setSaudacao(`Boa tarde, ${nomeUsuario}`);
      } else {
        setSaudacao(`Boa noite, ${nomeUsuario}`);
      }
    }, []);

    return (
        <div className={styles.home}>
            <h1>{saudacao}</h1>

            <div className={styles.alertContainer}>
                <div className={styles.alertBox}>
                    <h2 className={styles.alertTitle}>Vencimento Próximo</h2>
                    {vencimentoProximo.length > 0 ? (
                        <ul> 
                            {vencimentoProximo.map((pedido) => (
                            
                                <li key={pedido.cod_pedido} className={styles.margem}> 
                                    <p><strong>Número do Pedido:</strong> {pedido.PO}</p>
                                    <p><strong>Fornecedor:</strong> {pedido.fornecedor}</p>
                                    <p><strong>Data do Vencimento:</strong> {new Date(pedido.vencimento_invoice).toLocaleDateString()}</p>
                                    <p><strong>Valor:</strong> {pedido.moeda} {pedido.valor}</p>
                                </li>
                           
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.alertText}>Nenhum pedido com vencimento próximo.</p>
                    )}
                </div>

                <div className={styles.alertBox}>
                    <h2 className={styles.alertTitle}>Pedido Chegando</h2>
                    {pedidoChegando.length > 0 ? (
                        <ul>
                            {pedidoChegando.map((pedido) => (
                                <li key={pedido.cod_pedido} className={styles.margem}>
                                    <p><strong>Número do Pedido:</strong> {pedido.PO}</p>
                                    <p><strong>Fornecedor:</strong> {pedido.fornecedor}</p>
                                    <p><strong>Modal:</strong> {pedido.modal}</p>
                                    <p><strong>ETA:</strong> {new Date(pedido.eta).toLocaleDateString()}</p>
                                    <p><strong>ETD:</strong> {new Date(pedido.etd).toLocaleDateString()}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.alertText}>Nenhum pedido está chegando nos próximos dias.</p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Home;


