import React, { useState, useEffect } from 'react';
import styles from './PedidoEdit.module.css';
import { POST_PEDIDO, GET_FORNECEDOR, GET_MATERIAL } from '../../components/api';
import useFetch2 from '../../hooks/useFetch2';

const TestePedido = () => {
    const [pedido, setPedido] = useState("");
    const [fornecedor, setFornecedor] = useState(0);
    const [materialSelecionado, setMaterialSelecionado] = useState(""); // Estado para o material selecionado no dropdown
    const [materiaisPedido, setMateriaisPedido] = useState([]); // Array para armazenar os materiais selecionados
    const [datas, setDatas] = useState([]);
    const [materiais, setMateriais] = useState([]); // Lista completa de materiais do banco de dados

    const { data, success, loading, error, request } = useFetch2();

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

        async function listMateriais() {
            const { url, options } = GET_MATERIAL({
                requisicao: "GET_MATERIAL"
            });
            const { json } = await request(url, options);
            if (json.success) {
                setMateriais(json.result);
            } else {
                console.log("Erro ao buscar materiais");
            }
        }

        listFornecedores();
        listMateriais();
    }, []);

    const adicionarMaterial = () => {
        if (materialSelecionado) {
            const material = materiais.find(m => m.cod_sap === materialSelecionado);
            if (material && !materiaisPedido.some(m => m.cod_sap === material.cod_sap)) {
                setMateriaisPedido([...materiaisPedido, material]);
                setMaterialSelecionado("");
            }
        }
    };

    const removerMaterial = (cod_sap) => {
        setMateriaisPedido(materiaisPedido.filter(material => material.cod_sap !== cod_sap));
    };

    async function handleSalvar() {
        const { url, options } = POST_PEDIDO({
            requisicao: 'POST_PEDIDO',
            pedido: pedido,
            cod_fornecedor: Number(fornecedor),
            materiais: materiaisPedido.map(material => material.cod_sap) // Enviando a lista de códigos SAP dos materiais selecionados
        });

        const { json } = await request(url, options);
        if (json.success) {
            console.log('Pedido salvo com sucesso');
        } else {
            console.log('Erro ao salvar pedido');
        }
    }

    return (
        <div className={styles.pedidos}>
            <h1>Editar Pedido {pedido}</h1>
            <div className={styles.form}>
                <label>   
                    <span>Pedido: </span>
                    <input type="text" name="pedido" placeholder="Digite o nº do Pedido" required onChange={(e) => setPedido(e.target.value)} value={pedido} />
                </label>
                <label>   
                    <span>Fornecedor: </span>
                    <select value={fornecedor} onChange={(e) => setFornecedor(e.target.value)} >
                        <option value="">Selecione um Fornecedor</option>
                        {datas.map((fornecedor) => (
                            <option key={fornecedor.cod_fornecedor} value={fornecedor.cod_fornecedor}>{fornecedor.nome}</option>
                        ))}
                    </select>
                </label>
                
                {/* Seleção e Adição de Materiais */}
                <label>   
                    <span>Material: </span>
                    <select value={materialSelecionado} onChange={(e) => setMaterialSelecionado(e.target.value)}>
                        <option value="">Selecione um Material</option>
                        {materiais.map((material) => (
                            <option key={material.cod_sap} value={material.cod_sap}>{material.nome}</option>
                        ))}
                    </select>
                    <button type="button" onClick={adicionarMaterial}>Adicionar Material</button>
                </label>

                {/* Lista de Materiais Selecionados */}
                <div className={styles.materialList}>
                    <h3>Materiais Selecionados:</h3>
                    <ul>
                        {materiaisPedido.map((material) => (
                            <li key={material.cod_sap}>
                                {material.nome} 
                                <button type="button" onClick={() => removerMaterial(material.cod_sap)}>Remover</button>
                            </li>
                        ))}
                    </ul>
                </div>

                <button className="btn" onClick={handleSalvar}>Salvar</button>
            </div>
        </div>
    );
};

export default TestePedido;

