import React, { useState, useEffect } from 'react';

function DataAtual() {
  const [dataAtual, setDataAtual] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDataAtual(new Date());
    }, 1000);

    // Limpa o timer quando o componente é desmontado
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <p>Data e Hora Atual: {dataAtual.toLocaleString()}</p>
      {/* Ou apenas a data */}
      {/* <p>Data Atual: {dataAtual.toLocaleDateString()}</p> */}
      {/* Apenas a hora */}
      {/* <p>Hora Atual: {dataAtual.toLocaleTimeString()}</p> */}
    </div>
  );
}

export default DataAtual;