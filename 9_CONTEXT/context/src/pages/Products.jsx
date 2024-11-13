import React from 'react'
import { useContext } from 'react';
import { CounterContext } from '../context/CounterContext';
import { useTitleColorContext } from '../hooks/useTitleColorContex';

const Products = () => {
    const {counter} = useContext(CounterContext)
        // 5 - CONTEXTO MAIS COMPLEXO
        const {color} = useTitleColorContext ();
  return (
    <div>
        <h1 style={{color: color}}>Products</h1>
        <p>Valor do contador é: {counter}</p>
    </div>
  );
};

export default Products;