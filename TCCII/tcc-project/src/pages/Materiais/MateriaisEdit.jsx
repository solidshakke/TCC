import styles from './Materiais.module.css';
import React, { useState, useEffect } from 'react';
import { POST_MATERIAL, GET_MATERIAL, GET_MATERIAL_BY_ID, PUT_MATERIAL } from '../../components/api';
import useFetch2 from '../../hooks/useFetch2';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2'

const MateriaisEdit = () => {
  const [searchParams] = useSearchParams();
  const cod_material = searchParams.get('cod')

  const [cod_sap, setCodSap] = useState("");
  const [nome, setNome] = useState("");
  const [ncm, setNcm] = useState("");
  const [cfop, setCfop] = useState("");
  const [materiais, setMateriais] = useState([]); // Lista de materiais cadastrados
  const [isEdit, setIsEdit] = useState(false); // Estado para verificar se estamos editando um material
  const [materialId, setMaterialId] = useState(null); // ID do material a ser editado

  const { data, success, loading, error, request } = useFetch2();

  const navigate = useNavigate();

  // Função para buscar os materiais cadastrados
  async function fetchMateriais() {
    const { url, options } = GET_MATERIAL(); // Função que deve retornar as opções para buscar os materiais
    const { json } = await request(url, options);
    if (json.success) {
      setMateriais(json.result); // Define os materiais no estado
    }
  }

  // Função para carregar um material para edição
  function editarMaterial(material) {
    setCodSap(material[0].cod_sap);
    setNome(material[0].nome);
    setNcm(material[0].ncm);
    setCfop(material[0].cfop);

    setIsEdit(true);
  }

  // Função para salvar ou atualizar o material
  async function handleSalvar(event) {
    event.preventDefault();
    
    const { url, options } = PUT_MATERIAL({
      requisicao: 'PUT_MATERIAL',
      cod_material: cod_material,
      cod_sap: cod_sap,
      nome: nome,
      ncm: ncm,
      cfop: cfop,
    });
    const { json } = await request(url, options);

    if (json.success) {
      mensagemOK("Material salvo com sucesso!");
      navigate (`/create/materiais`)

    } else {
      console.log("Erro ao salvar material");
    }
  }

  // useEffect para buscar os materiais ao carregar o componente
  useEffect(() => {
    fetchMateriais();
  }, []);
  
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

  useEffect(() => {
    async function get_material_by_id() {
        const { url, options } = GET_MATERIAL_BY_ID({
            requisicao: "GET_MATERIAL_BY_ID",
            cod_material: cod_material
        });
        const { json } = await request(url, options);
        if (json.success) {
          editarMaterial(json.result);
        } else {
            console.log("Erro ao buscar material");
        } 
    }
    get_material_by_id();

}, [])


  return (
    <div className={styles.material}>
      <h1>{isEdit ? "Editar Material" : "Cadastro de Material"}</h1>
      <form onSubmit={handleSalvar}>
        <div>
          <label>
            <span>Código do Material: </span>
            <input type="text" name="cod_sap" placeholder="Digite o código do Material" onChange={(e) => setCodSap(e.target.value)} value={cod_sap} />
          </label>
          <label>
            <span>Nome do Material: </span>
            <input type="text" name="nome" placeholder="Digite o nome do material" required onChange={(e) => setNome(e.target.value)} value={nome} />
          </label>
          <label>
            <span>CFOP: </span>
            <input type="text" name="cfop" placeholder="Digite o CFOP do material" required onChange={(e) => setCfop(e.target.value)} value={cfop} />
          </label>
          <label>
            <span>NCM: </span>
            <input type="text" name="ncm" placeholder="Digite a NCM do material" onChange={(e) => setNcm(e.target.value)} value={ncm} />
          </label>
          <button className="btn" type="submit">{isEdit ? "Atualizar" : "Salvar"}</button>
        </div>
      </form>

    </div>
  );
};

export default MateriaisEdit;
