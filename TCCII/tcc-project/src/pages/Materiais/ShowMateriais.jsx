import React, { useState, useEffect } from 'react';
import styles from "./ShowMateriais.module.css";
import useFetch2 from '../../hooks/useFetch2';
import { GET_MATERIAL } from '../../components/api';
import { Navigate, useNavigate} from 'react-router-dom';

const Showmateriais = () => {


    const colunas_banco = ['cod_sap', 'nome', 'ncm', 'cfop'];
    const cabecalhoTabela = ['Código', 'Nome', 'NCM', 'CFOP', 'Opções'];
    const [datas, setDatas] = useState([]);
    const { data, loading, error, request } = useFetch2();

    const [modalVisible, setModalVisible] = useState(false); // Estado para exibir o modal
    const [selectedMateriais, setSelectedMateriais] = useState(null); // Pedido selecionado para o modal

    const navigate = useNavigate();

    useEffect(() => {
        async function carregarMateriais() {
            const { url, options } = GET_MATERIAL({ requisicao: "GET_MATERIAL" });
            const { json } = await request(url, options);
            if (json.success) {
                setDatas(json.result);
                console.log("Deu boa");
            } else {
                console.log("Deu ruim");
            }
        }
        carregarMateriais();
    }, []);

    const openModal = (material) => {
        setSelectedMateriais(material);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedMateriais(null);
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
        navigate (`/edit/materiais?cod=${cod}`)
        
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
                        <h3>Opções do Material</h3>
                        <p>Material: {selectedMateriais?.cod_sap}</p> {/* mudar cod_pedido para PO */}
                        <button onClick={handleView}>Visualizar Material</button>
                        <button onClick={() => handleEdit (selectedMateriais?.cod_sap)}>Editar Material</button>
                        <button onClick={handleDelete}>Excluir Material</button>
                        <button className={styles.closeButton} onClick={closeModal}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Showmateriais;
