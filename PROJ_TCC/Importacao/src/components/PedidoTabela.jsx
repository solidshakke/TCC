import useFetch2 from "../hooks/useFetch2";
import React, { useState } from "react";
import { GET_PEDIDOS } from "./api";
import styles from "./PedidoTabela.module.css";

const PedidoTabela = () => {
    const colunas_banco = ['PO', 'cod_fornecedor', 'invoice', 'data_prontidao'];
    const cabecalhoTabela = ['Pedido', 'Fornecedor', 'Invoice', 'Data de Prontidão', 'Opções'];
    const [datas, setDatas] = useState([]);
    const { data, loading, error, request } = useFetch2();
    
    React.useEffect(() => {
        async function carregarPedidos (){
            const {url, options} = GET_PEDIDOS ({
                requisicao:"GET_PEDIDOS"
            });
            const {json, response} = await request (url, options);
            if (json.success){
                setDatas(json.result);
                console.log("Deu boa")
            } else {console.log("Deu ruim")}                                        
        }
        carregarPedidos();
    }, [])
  
    return (
    <div>
            {

                datas && (
                    <div>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    {cabecalhoTabela.map(coluna => (
                                        <th key={coluna}>{coluna}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {datas.map((row, index) => (
                                    <tr key={index}>
                                        {colunas_banco.map(coluna => (
                                            <td key={`${index}-${coluna}`}>{row[coluna]}</td>
                                        ))}
                                        <td><button>Opções</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )


            }
    </div>
  );
};

export default PedidoTabela;