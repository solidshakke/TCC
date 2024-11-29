import styles from './Fornecedor.module.css';
import React, { useState, useEffect } from 'react';
import useFetch2 from '../../hooks/useFetch2';
import { POST_FORNECEDOR, GET_FORNECEDOR, GET_FORNECEDOR_BY_ID } from '../../components/api';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ViewFornecedor = () => {

  const [searchParams] = useSearchParams();
  const cod_fornecedor = searchParams.get('cod')

  const [cod_sap, setCodSap] = useState("");
  const [nome, setNome] = useState("");
  const [moeda, setMoeda] = useState("");
  const [incoterm, setIncoterm] = useState("");
  const [fornecedores, setFornecedores] = useState([]); // Lista de fornecedores cadastrados
  const [isEdit, setIsEdit] = useState(false); // Estado para verificar se estamos editando um fornecedor
  const [fornecedorId, setFornecedorId] = useState(null); // ID do fornecedor a ser editado

  const { data, success, loading, error, request } = useFetch2();

  const navigate = useNavigate();

  // Função para buscar os fornecedores cadastrados
  async function fetchFornecedores() {
    const { url, options } = GET_FORNECEDOR(); // Função que deve retornar as opções para buscar os fornecedores
    const { json } = await request(url, options);
    if (json.success) {
      setFornecedores(json.result); // Define os fornecedores no estado
    }
  }

  // Função para carregar um fornecedor para edição
  function editarFornecedor(fornecedor) {
    setCodSap(fornecedor.cod_sap);
    setNome(fornecedor.nome);
    setMoeda(fornecedor.moeda);
    setIncoterm(fornecedor.incoterm);
    setFornecedorId(fornecedor.id); // Armazena o ID do fornecedor para edição
    setIsEdit(true);
  }

  // Função para salvar ou atualizar o fornecedor
  async function handleSalvar(event) {
    event.preventDefault();
    
    const { url, options } = POST_FORNECEDOR({
      requisicao: isEdit ? 'UPDATE_FORNECEDOR' : 'POST_FORNECEDOR',
      id: fornecedorId, // Envia o ID do fornecedor para atualização
      cod_sap: cod_sap,
      nome: nome,
      moeda: moeda,
      incoterm: incoterm,
    });
    const { json } = await request(url, options);

    if (json.success) {
      console.log(isEdit ? 'Fornecedor atualizado com sucesso' : 'Fornecedor salvo com sucesso');
      setCodSap("");
      setNome("");
      setMoeda("");
      setIncoterm("");
      setFornecedorId(null);
      setIsEdit(false);
      fetchFornecedores(); // Atualiza a lista de fornecedores
    } else {
      console.log("Erro ao salvar fornecedor");
    }
  }

  // useEffect para buscar os fornecedores ao carregar o componente
  useEffect(() => {
    fetchFornecedores();
  }, []);
  function editarFornecedor(fornecedor) {
    setCodSap(fornecedor[0].cod_sap);
    setIncoterm(fornecedor[0].incoterm);
    setMoeda(fornecedor[0].moeda);
    setNome(fornecedor[0].nome);
  
    setIsEdit(true);
  }
  useEffect(() => {
    async function get_fornecedor_by_id() {
        const { url, options } = GET_FORNECEDOR_BY_ID({
            requisicao: "GET_FORNECEDOR_BY_ID",
            cod_fornecedor: cod_fornecedor
        });
        const { json } = await request(url, options);
        if (json.success) {
          editarFornecedor(json.result);
        } else {
            console.log("Erro ao buscar fornecedor");
        } 
    }
    get_fornecedor_by_id();

}, [])
  function handleVoltar () {
    navigate ('/create/fornecedor');
}

  return (
    <div className={styles.fornecedor}>
      <h1>{isEdit ? "Editar Fornecedor" : "Cadastro de Fornecedor"}</h1>
      <form onSubmit={handleSalvar}>
        <div>
          <label>
            <span>Código do Fornecedor: </span>
            <input type="text" name="cod_sap" placeholder="Digite o código do Fornecedor" required onChange={(e) => setCodSap(e.target.value)} value={cod_sap} readOnly/>
          </label>
          <label>
            <span>Nome do Fornecedor: </span>
            <input type="text" name="nome" placeholder="Digite o nome do Fornecedor" required onChange={(e) => setNome(e.target.value)} value={nome} readOnly/>
          </label>
          <label>
            <span>Moeda: </span>
            <input type="text" name="moeda" placeholder="Digite a moeda" required onChange={(e) => setMoeda(e.target.value)} value={moeda} readOnly/>
          </label>
          <label>
            <span>Incoterm: </span>
            <input type="text" name="incoterm" placeholder="Digite a Incoterm" onChange={(e) => setIncoterm(e.target.value)} value={incoterm} readOnly/>
          </label>
          <button className="btn" onClick={handleVoltar}>Voltar</button>
        </div>
      </form>


    </div>
  );
};

export default ViewFornecedor;