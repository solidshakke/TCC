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