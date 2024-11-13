// import { useState, useEffect } from 'react'
// import { useFetch } from '../hooks/useFetch';


// const url = "http://localhost:3000/products";

// const CMateriais = () => {
//   const [products, setProducts] = useState ([]);
//   const {data: items, httpConfig, loading, error} = useFetch(url);
//   const [codMaterial, setCodMaterial] = useState("");
//   const [material, setMaterial] = useState("");
//   const [ncm, setNcm] = useState("");
//   const [cfop, setCfop] = useState("");


//   const handleSubmit = async (e) => {
//     e.preventDefault ()
//       const product = {
//         codMaterial,
//         material,
//         ncm,
//       };
//       httpConfig(product, "POST");

//       setCodMaterial("");
//       setMaterial("");
//       setNCM("");
//   };
//     const handleRemove = (id) => {
//     httpConfig(id, "DELETE");
//   }
//   return (
//       <div className="add-products">
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>   
//                     <span>Código do Material: </span>
//                     <input type="text" name="codMaterial" placeholder="Digite o código do Material" onChange={(e) => setCodMaterial(e.target.value)} value={codMaterial}/>
//                 </label>
//                 <label>   
//                     <span>Nome do Material: </span>
//                     <input type="text" name="material" placeholder="Digite o nome do material" onChange={(e) => setMaterial(e.target.value)} value={material}/>
//                 </label>
//                 <label>   
//                     <span>CFOP: </span>
//                     <input type="text" name="cfop" placeholder="Digite o CFOP do material" onChange={(e) => setCfop(e.target.value)} value={cfop}/>
//                 </label>
//                 <label>   
//                     <span>NCM: </span>
//                     <input type="text" name="ncm" placeholder="Digite a NCM do material" onChange={(e) => setNcm(e.target.value)} value={ncm}/>
//                 </label>
 
//             </div>
//           {/* 7 - state de loading no post */}
//           {loading && <input type="submit" disabled value="Aguarde" />}
//           {!loading && <input type="submit" value="Criar" />}
//         </form>
//         <div className = "ShowProducts" style={{lineHeight: "1.8"}}>
//             {loading && <p>Carregando dados...</p>}
//             {error && <p>{error}</p>} 
//             {!error && (
//              <ul>
//                 {items && items.map((products) => (
//                  <li key={products.id}>
//                 {products.codMaterial}  
//                    - {products.material} -  
//                   CFOP: {products.cfop} - 
//                   NCM: {products.ncm} <br/>
//           <button onClick={() => handleRemove(products.id)}>Excluir</button>
//          </li>
//        ))}
//      </ul>
//      )}

//         </div>
//       </div>
//   );
// };

// export default CMateriais;