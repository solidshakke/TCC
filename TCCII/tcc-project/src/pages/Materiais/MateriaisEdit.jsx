import styles from './Materiais.module.css';
import React, { useState, useEffect } from 'react';
import { POST_MATERIAL, GET_MATERIAL } from '../../components/api';
import useFetch2 from '../../hooks/useFetch2';

const MateriaisEdit = () => {
  const [cod_sap, setCodSap] = useState("");
  const [nome, setNome] = useState("");
  const [ncm, setNcm] = useState("");
  const [cfop, setCfop] = useState("");
  const [materiais, setMateriais] = useState([]); // Lista de materiais cadastrados
  const [isEdit, setIsEdit] = useState(false); // Estado para verificar se estamos editando um material
  const [materialId, setMaterialId] = useState(null); // ID do material a ser editado

  const { data, success, loading, error, request } = useFetch2();

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
    setCodSap(material.cod_sap);
    setNome(material.nome);
    setNcm(material.ncm);
    setCfop(material.cfop);
    setMaterialId(material.id); // Armazena o ID do material para edição
    setIsEdit(true);
  }

  // Função para salvar ou atualizar o material
  async function handleSalvar(event) {
    event.preventDefault();
    
    const { url, options } = POST_MATERIAL({
      requisicao: isEdit ? 'UPDATE_MATERIAL' : 'POST_MATERIAL',
      id: materialId, // Envia o ID do material para atualização
      cod_sap: cod_sap,
      nome: nome,
      ncm: ncm,
      cfop: cfop,
    });
    const { json } = await request(url, options);

    if (json.success) {
      console.log(isEdit ? 'Material atualizado com sucesso' : 'Material salvo com sucesso');
      setCodSap("");
      setNome("");
      setNcm("");
      setCfop("");
      setMaterialId(null);
      setIsEdit(false);
      fetchMateriais(); // Atualiza a lista de materiais
    } else {
      console.log("Erro ao salvar material");
    }
  }

  // useEffect para buscar os materiais ao carregar o componente
  useEffect(() => {
    fetchMateriais();
  }, []);

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

      <h2>Materiais Cadastrados</h2>
      <ul>
        {materiais.length > 0 ? (
          materiais.map((material) => (
            <li key={material.id}>
              <strong>Código:</strong> {material.cod_sap} <br />
              <strong>Nome:</strong> {material.nome} <br />
              <strong>CFOP:</strong> {material.cfop} <br />
              <strong>NCM:</strong> {material.ncm} <br />
              <button onClick={() => editarMaterial(material)}>Editar</button>
            </li>
          ))
        ) : (
          <p>Nenhum material cadastrado.</p>
        )}
      </ul>
    </div>
  );
};

export default MateriaisEdit;
