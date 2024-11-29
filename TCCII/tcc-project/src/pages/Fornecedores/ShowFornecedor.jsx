import React, { useState, useEffect } from 'react';
import styles from "./ShowFornecedor.module.css";
import useFetch2 from '../../hooks/useFetch2';
import { GET_FORNECEDOR, PUT_FORNECEDOR_INATIVO } from '../../components/api';
import { Navigate, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'

const ShowFornecedor = () => {

    
    const colunas_banco = ['cod_sap', 'nome'];
    const cabecalhoTabela = ['Código', 'Nome', 'Opções'];
    const [datas, setDatas] = useState([]);
    const { data, loading, error, request } = useFetch2();

    const [modalVisible, setModalVisible] = useState(false); // Estado para exibir o modal
    const [selectedFornecedor, setSelectedFornecedor] = useState(null); // Pedido selecionado para o modal

    const navigate = useNavigate();

    useEffect(() => {
        async function carregarFornecedor() {
            const { url, options } = GET_FORNECEDOR({ requisicao: "GET_FORNECEDOR" });
            const { json } = await request(url, options);
            if (json.success) {
                setDatas(json.result);
                console.log("Deu boa");
            } else {
                console.log("Deu ruim");
            }
        }
        carregarFornecedor();
    }, []);

    const openModal = (fornecedor) => {
        setSelectedFornecedor(fornecedor);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedFornecedor(null);
    };

    const handleView = (cod) => {
        // Função de Visualizar Pedido
        alert(`Visualizar detalhes do pedido: ${cod}`); {/* mudar cod_pedido para PO */}
        // Aqui você poderia redirecionar para uma página de detalhes do pedido, por exemplo:
        // window.location.href = `/pedido/${selectedPedido.PO}`;
        navigate (`/show/fornecedor?cod=${cod}`)
        closeModal();
    };

    const handleEdit = (cod) => {
        // Função de Editar Pedido
        alert(`Editar fornecedor: ${cod}`); {/* mudar cod_pedido para PO selectedPedido.cod_pedido*/}
        // Aqui você poderia redirecionar para uma página de edição do pedido:
        // window.location.href = `/editar-pedido/${selectedPedido.PO}`;
        navigate (`/edit/fornecedor?cod=${cod}`)
        
        closeModal();  
    };
    
    function msgDelete(cod, nome){
        Swal.fire({
            title: "Deseja inativar o fornecedor " + nome + "?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Inativar",
            denyButtonText: "Manter"
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                handleDelete(cod);

            } else if (result.isDenied) {
                Swal.fire("Opção de inativação cancelada", "", "info");
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
        const {url, options} = PUT_FORNECEDOR_INATIVO ({
        requisicao: 'PUT_FORNECEDOR_INATIVO',
        cod_fornecedor: cod
        });
        const {json} = await request (url, options);
        if (json.success) {
            mensagemOK("Inativado com sucesso!");

        } else {console.log(json.error)};

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
                        <h3>Opções do Fornecedor</h3>
                        <p>Fornecedor: {selectedFornecedor?.cod_sap}</p> {/* mudar cod_pedido para PO */}
                        <button onClick={() => handleView (selectedFornecedor?.cod_fornecedor)}>Visualizar Fornecedor</button>
                        <button onClick={() => handleEdit (selectedFornecedor?.cod_fornecedor)}>Editar Fornecedor</button>
                        <button onClick={() => msgDelete (selectedFornecedor?.cod_fornecedor, selectedFornecedor?.nome)}>Excluir Fornecedor</button>
                        <button className={styles.closeButton} onClick={closeModal}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowFornecedor;
