import styles from './Fornecedor.module.css';
import React, { useState, useEffect } from 'react';
import useFetch2 from '../../hooks/useFetch2';
import { POST_FORNECEDOR, GET_FORNECEDOR, GET_FORNECEDOR_BY_ID, PUT_FORNECEDOR } from '../../components/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2'

const FornecedorEdit = () => {

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

async function handleSalvar(event) {
  event.preventDefault();
  
  const { url, options } = PUT_FORNECEDOR({
    requisicao: 'PUT_FORNECEDOR',
    cod_fornecedor: cod_fornecedor,
    cod_sap: cod_sap,
    nome: nome,
    moeda: moeda,
    incoterm: incoterm,
  });
  const { json } = await request(url, options);

  if (json.success) {
    mensagemOK ("Fornecedor salvo com sucesso!");
    navigate (`/create/fornecedor`)

  } else {
    console.log("Erro ao salvar fornecedor");
  }
}
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

  return (
    <div className={styles.fornecedor}>
      <h1>Editar Fornecedor</h1>
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
          <button className="btn" type="submit">Atualizar</button>
        </div>
      </form>
    
    </div>
  );
};

export default FornecedorEdit;
