export const API_URL = "https://szulhacorps.com.br/leandro_lp/";
export function POST_PEDIDO(body){
    return{
      url: API_URL + '/pedidos.php',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      }
    }
  }
  export function GET_PEDIDOS(body){
    return{
      url: API_URL + '/pedidos.php',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      }
    }
  }
  export function GET_PEDIDOS_BY_ID(body){
    return{
      url: API_URL + '/pedidos.php',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      }
    }
  }
  export function PUT_PEDIDO(body){
    return{
      url: API_URL + '/pedidos.php',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      }
    }
  }
  export function POST_MATERIAL(body){
    return{
      url: API_URL + '/material.php',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      }
    }
  }
  export function GET_MATERIAL(body){
    return{
      url: API_URL + '/material.php',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      }
    }
  }
  export function GET_MATERIAL_BY_ID_PEDIDO(body){
    return{
      url: API_URL + '/material.php',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      }
    }
  }
  export function POST_FORNECEDOR(body){
    return{
      url: API_URL + '/fornecedor.php',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      }
    }
  }
  export function GET_FORNECEDOR(body){
    return{
      url: API_URL + '/fornecedor.php',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      }
    }
  }
  export function GET_VENCIMENTO_INVOICE(body){
    return{
      url: API_URL + '/pedidos.php',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      }
    }
  }
  export function GET_PEDIDO_CHEGADA(body){
    return{
      url: API_URL + '/pedidos.php',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      }
    }
  }