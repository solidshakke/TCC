import React, { useState, useEffect } from 'react';
import styles from "./ShowMateriais.module.css";
import useFetch2 from '../../hooks/useFetch2';
import { GET_MATERIAL, PUT_MATERIAL_INATIVO } from '../../components/api';
import { Navigate, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'

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

    const handleView = (cod) => {
        // Função de Visualizar Pedido
        alert(`Visualizar detalhes do pedido: ${cod}`); {/* mudar cod_pedido para PO */}
        // Aqui você poderia redirecionar para uma página de detalhes do pedido, por exemplo:
        // window.location.href = `/pedido/${selectedPedido.PO}`;
        navigate (`/show/materiais?cod=${cod}`)
        closeModal();
    };

    const handleEdit = (cod) => {
        // Função de Editar Pedido
        alert(`Editar material: ${cod}`); {/* mudar cod_pedido para PO selectedPedido.cod_pedido*/}
        // Aqui você poderia redirecionar para uma página de edição do pedido:
        // window.location.href = `/editar-pedido/${selectedPedido.PO}`;
        navigate (`/edit/materiais?cod=${cod}`)
        
        closeModal();  
    };
    
    function msgDelete(cod, nome){
        Swal.fire({
            title: "Deseja inativar o material " + nome + "?",
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
        const {url, options} = PUT_MATERIAL_INATIVO ({
        requisicao: 'PUT_MATERIAL_INATIVO',
        cod_material: cod
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
                        <h3>Opções do Material</h3>
                        <p>Material: {selectedMateriais?.cod_sap}</p> {/* mudar cod_pedido para PO */}
                        <button onClick={() => handleView (selectedMateriais?.cod_material)}>Visualizar Material</button>
                        <button onClick={() => handleEdit (selectedMateriais?.cod_material)}>Editar Material</button>
                        <button onClick={() => msgDelete (selectedMateriais?.cod_material, selectedMateriais?.nome)}>Excluir Material</button>
                        <button className={styles.closeButton} onClick={closeModal}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Showmateriais;
