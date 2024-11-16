import styles from './Fornecedor.module.css';
import React, { useState, useEffect } from 'react';
import useFetch2 from '../../hooks/useFetch2';
import { POST_FORNECEDOR, GET_FORNECEDOR } from '../../components/api';

const FornecedorEdit = () => {
  const [cod_sap, setCodSap] = useState("");
  const [nome, setNome] = useState("");
  const [moeda, setMoeda] = useState("");
  const [incoterm, setIncoterm] = useState("");
  const [fornecedores, setFornecedores] = useState([]); // Lista de fornecedores cadastrados
  const [isEdit, setIsEdit] = useState(false); // Estado para verificar se estamos editando um fornecedor
  const [fornecedorId, setFornecedorId] = useState(null); // ID do fornecedor a ser editado

  const { data, success, loading, error, request } = useFetch2();

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

  return (
    <div className={styles.fornecedor}>
      <h1>{isEdit ? "Editar Fornecedor" : "Cadastro de Fornecedor"}</h1>
      <form onSubmit={handleSalvar}>
        <div>
          <label>
            <span>Código do Fornecedor: </span>
            <input type="text" name="cod_sap" placeholder="Digite o código do Fornecedor" required onChange={(e) => setCodSap(e.target.value)} value={cod_sap} />
          </label>
          <label>
            <span>Nome do Fornecedor: </span>
            <input type="text" name="nome" placeholder="Digite o nome do Fornecedor" required onChange={(e) => setNome(e.target.value)} value={nome} />
          </label>
          <label>
            <span>Moeda: </span>
            <input type="text" name="moeda" placeholder="Digite a moeda" required onChange={(e) => setMoeda(e.target.value)} value={moeda} />
          </label>
          <label>
            <span>Incoterm: </span>
            <input type="text" name="incoterm" placeholder="Digite a Incoterm" onChange={(e) => setIncoterm(e.target.value)} value={incoterm} />
          </label>
          <button className="btn" type="submit">{isEdit ? "Atualizar" : "Salvar"}</button>
        </div>
      </form>

      <h2>Fornecedores Cadastrados</h2>
      <ul>
        {fornecedores.length > 0 ? (
          fornecedores.map((fornecedor) => (
            <li key={fornecedor.id}>
              <strong>Código:</strong> {fornecedor.cod_sap} <br />
              <strong>Nome:</strong> {fornecedor.nome} <br />
              <strong>Moeda:</strong> {fornecedor.moeda} <br />
              <strong>Incoterm:</strong> {fornecedor.incoterm} <br />
              <button onClick={() => editarFornecedor(fornecedor)}>Editar</button>
            </li>
          ))
        ) : (
          <p>Nenhum fornecedor cadastrado.</p>
        )}
      </ul>
    </div>
  );
};

export default FornecedorEdit;
