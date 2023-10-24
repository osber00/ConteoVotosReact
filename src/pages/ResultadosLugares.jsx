import {useState, useEffect} from 'react'
import WrapPagina from '../components/WrapPagina'
import { URL_SERVER } from '../services/dataserver'

const ResultadosLugares = () => {
    const [resultado, setResultado] = useState([])

    const fetchResultado = async ()=>{
        const response = await fetch(`${URL_SERVER}/votacionlugares`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }).catch((error) => {
            console.log("Problemas con el servidor de datos");
          });

          const resultado = await response.json()

          console.log(resultado.data);

          setResultado(resultado.data)
    }

    useEffect(() => {
      fetchResultado()
    }, [])
    

  return (
    <WrapPagina>
        
    </WrapPagina>
  )
}

export default ResultadosLugares