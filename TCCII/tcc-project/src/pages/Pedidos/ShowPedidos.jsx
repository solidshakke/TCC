import React from 'react'
import styles from './PedidoEdit.module.css';
import { useState, useEffect } from 'react';
import useFetch2 from '../../hooks/useFetch2';
import { POST_PEDIDO, GET_FORNECEDOR, GET_MATERIAL, PUT_PEDIDO, GET_PEDIDOS_BY_ID, GET_MATERIAL_BY_ID_PEDIDO } from '../../components/api';
import { useNavigate, useSearchParams } from 'react-router-dom';



const ShowPedidos = () => {
    const [searchParams] = useSearchParams();
    const cod_pedido = searchParams.get('cod')

    const [pedido, setPedido] = useState("");
    const [fornecedor, setFornecedor] = useState(0);
    const [invoice, setInvoice] = useState("");
    const [data_invoice, setDataInvoice] = useState("");
    const [vencimento_invoice, setVencimentoInvoice] = useState("");
    const [data_prontidao, setDataProntidao] = useState("");
    const [etd, setEtd] = useState("");
    const [eta, setEta] = useState("");
    const [modal, setModal] = useState("");
    const [crt_bl_awb, setCrtBlAwb] = useState("");
    const [data_doc_embarque, setDataDocEmbarque] = useState("");
    const [valor, setValor] = useState(0);
    const [condicao_pagamento, setCondicaoPagamento] = useState("");
    const [percentual_pag_antecipado, setPercentualPagAntecipado] = useState("");
    const [data_pagamento, setDataPagamento] = useState("");
    const [di, setDi] = useState("");
    const [data_registro_di, setDataRegistroDi] = useState("");
    const [data_liberacao, setDataLiberacao] = useState("");
    const [canal, setCanal] = useState("");
    const [data_entrega_planta, setDataEntregaPlanta] = useState("");
    const [dias_entrega, setDiasEntrega] = useState(0);
    const [data_migo, setDataMigo] = useState(0);
    const [dias_migo, setDiasMigo] = useState(0);
    const [nota_fiscal, setNotaFiscal] = useState("");
    const [data_nota_fiscal, setDataNotaFiscal] = useState("");

    const [materialSelecionado, setMaterialSelecionado] = useState(""); // Estado para o material selecionado no dropdown
    const [materiaisPedido, setMateriaisPedido] = useState([]); // Array para armazenar os materiais selecionados
    const [materiais, setMateriais] = useState([]); // Lista completa de materiais do banco de dados
    
    const { data, success, loading, error, request } = useFetch2 ();
    const [datas, setDatas] = useState([]);

    const navigate = useNavigate();

    
    useEffect(() => {
        async function listPedidos (){
            const {url, options} = GET_FORNECEDOR ({
                requisicao:"GET_FORNECEDOR"
            });
            const {json, response} = await request (url, options);
            if (json.success){
                setDatas(json.result);
                console.log(datas);
            } else {console.log("Deu ruim")}                                        
        }
        listPedidos();
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

    useEffect(() => {
        async function get_pedidos_by_id() {
            const { url, options } = GET_PEDIDOS_BY_ID({
                requisicao: "GET_PEDIDOS_BY_ID",
                cod_pedido: cod_pedido
            });
            const { json } = await request(url, options);
            if (json.success) {
                preencher_campos(json.result);
            } else {
                console.log("Erro ao buscar pedido");
            } 
        }
        get_pedidos_by_id();
    }, [])

    useEffect(() => {
        async function get_material_by_id_pedido() {
            const { url, options } = GET_MATERIAL_BY_ID_PEDIDO({
                requisicao: "GET_MATERIAL_BY_ID_PEDIDO",
                cod_pedido: cod_pedido
            });
            const { json } = await request(url, options);
            if (json.success) {
                setMateriaisPedido(json.result);
            } else {
                console.log("Erro ao buscar material");
            } 
        }
        get_material_by_id_pedido();
    }, [])
    
    useEffect(() => {
        if (data_liberacao && data_entrega_planta) {
            // Converte as datas para objetos Date
            const dataLiberacaoDate = new Date(data_liberacao);
            const dataEntregaPlantaDate = new Date(data_entrega_planta);
            
            // Calcula a diferença em milissegundos
            const diffTime = dataEntregaPlantaDate - dataLiberacaoDate;
            
            // Converte a diferença para dias
            const diffDays = diffTime / (1000 * 60 * 60 * 24); 
            setDiasEntrega(diffDays);
        }
    }, [data_liberacao, data_entrega_planta]);

    useEffect(() => {
        if (data_entrega_planta && data_migo) {
            // Calcula a diferença em dias entre data_entrega_planta e data_migo
            const dataEntregaPlantaDate = new Date(data_entrega_planta);
            const dataMigoDate = new Date(data_migo);
            const diffTime = dataMigoDate - dataEntregaPlantaDate;
            const diffDays = diffTime / (1000 * 60 * 60 * 24); // converte para dias
            setDiasMigo(diffDays);
        }
    }, [data_entrega_planta, data_migo]);

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

    async function handleSalvar(){

      const {url, options} = PUT_PEDIDO({
        requisicao: 'PUT_PEDIDO',
        PO: pedido,
        cod_pedido: cod_pedido,
        cod_fornecedor: Number(fornecedor),
        invoice: invoice,
        data_invoice: data_invoice,
        vencimento_invoice: vencimento_invoice,
        data_prontidao: data_prontidao,
        etd: etd,
        eta: eta,
        modal: modal, 
        crt_bl_awb: crt_bl_awb, 
        data_doc_embarque: data_doc_embarque, 
        valor: valor, 
        condicao_pagamento: condicao_pagamento, 
        percentual_pag_antecipado: percentual_pag_antecipado, 
        data_pagamento: data_pagamento, 
        di: di, 
        data_registro_di: data_registro_di, 
        data_liberacao: data_liberacao, 
        canal: canal, 
        data_entrega_planta: data_entrega_planta, 
        dias_entrega: dias_entrega, 
        data_migo: data_migo, 
        dias_migo: dias_migo, 
        data_nota_fiscal: data_nota_fiscal, 
        nota_fiscal: nota_fiscal,
        materiais: JSON.stringify(materiaisPedido),

       })

        console.log(options);
      const {json, response} = await request (url, options);

      if (json.success){
        console.log('Deu boa');
      } else {
        console.log('Deu ruim');
      }
     console.log(json);
    }

    function handleVoltar () {
        navigate ('/dashboard/pedido');
    }

    function preencher_campos(json){
        setPedido(json[0].PO); 
        setInvoice(json[0].invoice);
        setCondicaoPagamento(json[0].condicao_pagamento);
        setCrtBlAwb(json[0].crt_bl_awb);
        setDataEntregaPlanta(json[0].data_entrega_planta);
        setDataLiberacao(json[0].data_liberacao);
        setDataMigo(json[0].data_migo);
        setDataNotaFiscal(json[0].data_nota_fiscal);
        setDataPagamento(json[0].data_pagamento);
        setDataProntidao(json[0].data_prontidao);
        setDataRegistroDi(json[0].data_registro_di);
        setCanal(json[0].canal);
        setDi(json[0].di);
        setDiasEntrega(json[0].dias_entrega);
        setDiasMigo(json[0].dias_migo);
        setEta(json[0].eta);
        setEtd(json[0].etd);
        setModal(json[0].modal);
        setNotaFiscal(json[0].nota_fiscal);
        setPercentualPagAntecipado(json[0].percentual_pag_antecipado);
        setValor(json[0].valor);
        setVencimentoInvoice(json[0].vencimento_invoice);
        setFornecedor(json[0].cod_fornecedor);
        setDataInvoice(json[0].data_invoice);
        setDataDocEmbarque(json[0].data_doc_embarque);

    }
  
  return (
    <div className={styles.pedidos}>
      <h1>Editar Pedido: {pedido}</h1>
      {/*<form>*/}
        <div className={styles.form}>
            <label>   
                <span>Pedido: </span>
                <input type="text" name="pedido" placeholder="Digite o nº do Pedido" required onChange={(e) => setPedido(e.target.value)} value={pedido} readOnly/>
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
            <label>   
                <span>Invoice: </span>
                <input type="text" name="invoice" placeholder="Digite o nº da Invoice" onChange={(e) => setInvoice(e.target.value)} value={invoice} readOnly/>
            </label>
            <label>   
                <span>Data da Invoice: </span>
                <input type="date" name="data_invoice" placeholder="Digite a data da Invoice" onChange={(e) => setDataInvoice(e.target.value)} value={data_invoice} readOnly/>
            </label>
            <label>   
                <span>Vencimento da Invoice: </span> {/* Condição de Pegar a data da invocie + a condição de pagamento */}
                <input type="date" name="vencimento_invoice" placeholder="Digite a data do Vencimento da Invoice" onChange={(e) => setVencimentoInvoice(e.target.value)} value={vencimento_invoice} readOnly/>
            </label>
            <label>   
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
                <span>Data de Prontidão: </span>
                <input type="date" name="data_prontidao" placeholder="Digite a data de Prontidão do Pedido" onChange={(e) => setDataProntidao(e.target.value)} value={data_prontidao} readOnly/>
            </label>
            <label>   
                <span>ETD: </span>
                <input type="date" name="etd" onChange={(e) => setEtd(e.target.value)} value={etd} readOnly/>
            </label>
            <label>   
                <span>ETA: </span>
                <input type="date" name="eta" onChange={(e) => setEta(e.target.value)} value={eta} readOnly/>
            </label>
            <label>   
                <span>Selecione o Modal: </span>
                <input type="radio" name="modal" placeholder="Aéreo" onChange={(e) => setModal(e.target.value)} value={"Aéreo"}/> Aéreo
                <input type="radio" name="modal" placeholder="Marítimo" onChange={(e) => setModal(e.target.value)} value={"Marítimo"}/> Marítimo
                <input type="radio" name="modal" placeholder="Rodoviário" onChange={(e) => setModal(e.target.value)} value={"Rodoviário"}/> Rodoviário
                {/* <input type="text" name="modal" placeholder="Digite o modal" onChange={(e) => setModal(e.target.value)} value={modal}/> */}
            </label>
            <label>   
                <span>Nº do AWB / BL / CRT : </span>
                <input type="text" name="crt_bl_awb" placeholder="Digite o nº do documento de embarque" onChange={(e) => setCrtBlAwb(e.target.value)} value={crt_bl_awb} readOnly/>
            </label>
            <label>   
                <span>Data do conhecimento de embarque: </span>
                <input type="date" name="data_doc_embarque" onChange={(e) => setDataDocEmbarque(e.target.value)} value={data_doc_embarque} readOnly/>
            </label>
            <label>   
                <span>Valor: </span>
                <input type="number" name="valor" onChange={(e) => setValor(e.target.value)} value={valor} readOnly/>
            </label>
            <label>   
                <span>Condição de Pagamento: </span>
                <input type="text" name="condicao_pagamento" placeholder="Digite a condiçaõ de Pagamento" onChange={(e) => setCondicaoPagamento(e.target.value)} value={condicao_pagamento} readOnly/>
            </label>
            <label>   
                <span>Pagamento Antecipado: </span>
                <input type="text" name="percentual_pag_antecipado" placeholder="Percentual do Pagamento Antecipado" onChange={(e) => setPercentualPagAntecipado(e.target.value)} value={percentual_pag_antecipado} readOnly/>
            </label>
            <label>   
                <span>Data do Pagamento: </span>
                <input type="date" name="data_pagamento" onChange={(e) => setDataPagamento(e.target.value)} value={data_pagamento} readOnly/>
            </label>
            <label>   
                <span>DI: </span>
                <input type="text" name="di" placeholder="Digite o nº da DI" onChange={(e) => setDi(e.target.value)} value={di} readOnly/>
            </label>
            <label>   
                <span>Data do registro da DI: </span>
                <input type="date" name="data_registro_di" onChange={(e) => setDataRegistroDi(e.target.value)} value={data_registro_di} readOnly/>
            </label>
            <label>   
                <span>Data da Liberação: </span>
                <input type="date" name="data_liberacao" onChange={(e) => setDataLiberacao(e.target.value)} value={data_liberacao} readOnly/>
            </label>
            <label>   
                <span>Canal: </span>
                <input type="text" name="canal" placeholder="Digite o canal do processo" onChange={(e) => setCanal(e.target.value)} value={canal} readOnly/>
            </label>
            <label>   
                <span>Data da Entrega do Pedido na Planta: </span>
                <input type="date" name="data_entrega_planta" onChange={(e) => setDataEntregaPlanta(e.target.value)} value={data_entrega_planta} readOnly/>
            </label>
            <label>
                <span>Dias Entrega: </span>
                <input type="number" name="dias_entrega" value={dias_entrega} readOnly />
            </label>
            <label>   
                <span>Data da MIGO: </span>
                <input type="date" name="data_migo" onChange={(e) => setDataMigo(e.target.value)} value={data_migo} readOnly/>
            </label>
            <label>   
                <span>Dias MIGO: </span> {/* Condição data_migo - data_entrega_planta */}
                <input type="number" name="dias_migo" value={dias_migo} readOnly />
            </label>
            <label>   
                <span>Nota Fiscal: </span>
                <input type="number" name="nota_fiscal" placeholder="Digite o nº da DANFe" onChange={(e) => setNotaFiscal(e.target.value)} value={nota_fiscal} readOnly/>
            </label>
            <label>   
                <span>Data da NF: </span>
                <input type="date" name="data_nota_fiscal" onChange={(e) => setDataNotaFiscal(e.target.value)} value={data_nota_fiscal} readOnly/>
            </label>
            <button className="btn" onClick={handleVoltar}>Voltar</button>
        </div>

</div>

  )
}

export default ShowPedidos;