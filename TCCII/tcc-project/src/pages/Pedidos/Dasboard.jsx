import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import useFetch2 from '../../hooks/useFetch2';
import { GET_PEDIDOS } from '../../components/api';
import { Navigate, useNavigate} from 'react-router-dom';

const Dashboard = () => {


    const colunas_banco = ['PO', 'fornecedor'];
    const cabecalhoTabela = ['Pedido', 'Fornecedor', 'Opções'];
    const [datas, setDatas] = useState([]);
    const { data, loading, error, request } = useFetch2();

    const [modalVisible, setModalVisible] = useState(false); // Estado para exibir o modal
    const [selectedPedido, setSelectedPedido] = useState(null); // Pedido selecionado para o modal

    const navigate = useNavigate();

    useEffect(() => {
        async function carregarPedidos() {
            const { url, options } = GET_PEDIDOS({ requisicao: "GET_PEDIDOS" });
            const { json } = await request(url, options);
            if (json.success) {
                setDatas(json.result);
                console.log("Deu boa");
            } else {
                console.log("Deu ruim");
            }
        }
        carregarPedidos();
    }, []);

    const openModal = (pedido) => {
        setSelectedPedido(pedido);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedPedido(null);
    };

    const handleView = () => {
        // Função de Visualizar Pedido
        alert(`Visualizar detalhes do pedido: ${selectedPedido.cod_pedido}`); {/* mudar cod_pedido para PO */}
        // Aqui você poderia redirecionar para uma página de detalhes do pedido, por exemplo:
        // window.location.href = `/pedido/${selectedPedido.PO}`;
        closeModal();
    };

    const handleEdit = (cod) => {
        // Função de Editar Pedido
        alert(`Editar pedido: ${cod}`); {/* mudar cod_pedido para PO selectedPedido.cod_pedido*/}
        // Aqui você poderia redirecionar para uma página de edição do pedido:
        // window.location.href = `/editar-pedido/${selectedPedido.PO}`;
        navigate (`/edit/pedido?cod=${cod}`)
        
        closeModal();  
    };
    

    const handleDelete = () => {
        // Função de Excluir Pedido
        const confirmDelete = window.confirm(`Tem certeza de que deseja excluir o pedido: ${selectedPedido.PO}?`); 
        if (confirmDelete) {
            // Lógica para excluir o pedido
            // Exemplo: Remover o pedido do estado local
            setDatas(prevDatas => prevDatas.filter(pedido => pedido.PO !== selectedPedido.PO));
            alert(`Pedido ${selectedPedido.PO} excluído com sucesso!`);
            closeModal();
        }
    };

    return (
        <div>
            {datas && (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                {cabecalhoTabela.map((coluna) => (
                                    <th key={coluna}>{coluna}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {datas.map((row, index) => (
                                <tr key={index}>
                                    {colunas_banco.map((coluna) => (
                                        <td key={`${index}-${coluna}`}>{row[coluna]}</td>
                                    ))}
                                    <td>
                                        <button
                                            className={styles.optionButton}
                                            onClick={() => openModal(row)}
                                        >
                                            Opções
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {modalVisible && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h3>Opções do Pedido</h3>
                        <p>Pedido: {selectedPedido?.cod_pedido}</p> {/* mudar cod_pedido para PO */}
                        <button onClick={handleView}>Visualizar Pedido</button>
                        <button onClick={() => handleEdit (selectedPedido?.cod_pedido)}>Editar Pedido</button>
                        <button onClick={handleDelete}>Excluir Pedido</button>
                        <button className={styles.closeButton} onClick={closeModal}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;


