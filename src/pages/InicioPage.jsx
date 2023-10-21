import {useState, useEffect} from 'react'
import WrapPagina from '../components/WrapPagina'
import { URL_SERVER } from '../services/dataserver'

const InicioPage = () => {


  const [mensaje, setMensaje] = useState('')
  const [ganador, setGanador] = useState({})

  const fetchGanador = async ()=>{
    const response = await fetch(`${URL_SERVER}/ganador`,{
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .catch((err)=>{
      setMensaje('Ocurrió un error')
    })

    const resultado = await response.json()

    setGanador(resultado.data)
    

  }


  useEffect(() => {
    fetchGanador()
  }, [])
  

  return (
    <WrapPagina>
      <h2>{ganador.nombre}</h2>
    </WrapPagina>
  )
}

export default InicioPage