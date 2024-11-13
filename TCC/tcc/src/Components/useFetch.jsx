import React from "react";

const useFetch = () => {
    const [data, setData] = React.useState([]);
    const [success, setSuccess] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const request = React.useCallback(async(url, options) =>{
        let response;
        let json;
        let aux;
        let aux2;
        try {
            setError(null);
            setLoading(true);

            response = await fetch(url, options);
            // console.log(response);
            json = await response.json();
            // console.log(json);
            if(response.success === false) throw new Error(json.message);
            aux = await json.result;
            aux2 = await json.success;
            setData(aux);
            setSuccess(aux2);
        } catch (err) {
            json = null;
            setError(err.message);
        } finally {
            setLoading (false);
        }
        return {response, json};
    }, [])
  return {data, success, loading, error, request}
}

export default useFetch