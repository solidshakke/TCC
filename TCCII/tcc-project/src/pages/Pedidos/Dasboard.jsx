import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import useFetch2 from '../../hooks/useFetch2';
import { GET_PEDIDOS, PUT_PEDIDO_INATIVO } from '../../components/api';
import { Navigate, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'

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

    const handleView = (cod) => {
        // Função de Visualizar Pedido
        alert(`Visualizar detalhes do pedido: ${cod}`); {/* mudar cod_pedido para PO */}
        // Aqui você poderia redirecionar para uma página de detalhes do pedido, por exemplo:
        // window.location.href = `/pedido/${selectedPedido.PO}`;
        navigate (`/show/pedido?cod=${cod}`)

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

    function msgDelete(cod, PO){
        Swal.fire({
            title: "Deseja excluir o pedido " + PO + "?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Inativar",
            denyButtonText: "Manter"
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                handleDelete(cod);

            } else if (result.isDenied) {
                Swal.fire("Opção de exclusão cancelada", "", "info");
            }
        });
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

     async function handleDelete (cod) {
        // Função de Excluir Pedido
        const {url, options} = PUT_PEDIDO_INATIVO ({
        requisicao: 'PUT_PEDIDO_INATIVO',
        cod_pedido: cod
        });
        const {json} = await request (url, options);
        if (json.success) {
            mensagemOK("Excluido com sucesso!");
            
        } else {console.log(json.error)};

    };

    return (
        <div classname={styles.titulo}> 
            <h1>Lista de Pedidos: </h1>
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
                        <button onClick={() => handleView (selectedPedido?.cod_pedido)}>Visualizar Pedido</button>
                        <button onClick={() => handleEdit (selectedPedido?.cod_pedido)}>Editar Pedido</button>
                        <button onClick={() => msgDelete (selectedPedido?.cod_pedido, selectedPedido?.PO)}>Excluir Pedido</button>
                        <button className={styles.closeButton} onClick={closeModal}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;


