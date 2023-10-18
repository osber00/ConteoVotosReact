import { useState, useEffect } from "react";
import WrapPagina from "../components/WrapPagina";
import { URL_SERVER } from "../services/dataserver";
import ModalPunto from "../components/ModalPunto";
import Punto from "../components/Punto";
import Feedback from "../components/Feedback";
import NuevoPunto from "../components/NuevoPunto";

const PuntosPage = () => {
  const [puntos, setPuntos] = useState([]);
  const [puntoEdit, setPuntoEdit] = useState({})
  const [mensaje, setMensaje] = useState('')

  const fetchPuntos = async () => {
    const response = await fetch(`${URL_SERVER}/lugares`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log("Error en la petición");
    });

    const resultados = await response.json();
    //console.log(resultados.data);
    setPuntos(resultados.data);
  };

  useEffect(() => {
    fetchPuntos();
  }, []);

  const editarPuntoModal = (data)=>{
    setMensaje('')
    if (data != null) {
      setPuntoEdit(data)
    }else{
      setPuntoEdit({})
    }
  }

  const fetchUpdatePunto = async(data)=>{
    const response = await fetch(`${URL_SERVER}/lugares/${data.id}`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .catch((error)=>{
      setMensaje("Problemas con el servidor de datos");
    })

    const resultado = await response.json()
    //console.log(resultado);
    if (resultado.estado == 'updated') {
      setPuntoEdit({})
      fetchPuntos()
    }else{
      setMensaje('Algo salió mal')
    }
  }

  const updatePunto = (data)=>{
    fetchUpdatePunto(data)
  }

  const fetchStorePunto = async (data)=>{
    const response = await fetch(`${URL_SERVER}/lugares`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .catch((error)=>{
      setMensaje("Problemas con el servidor de datos");
    })

    const resultado = await response.json()
    if (resultado.estado == 'created') {
      fetchPuntos()
    }else{
      setMensaje('Algo salió mal')
    }
  }

  const storePunto = (data)=>{
    fetchStorePunto(data)
  }

  return (
    <WrapPagina>
      <div className='row contenedor rounded shadown'>
        <div className='col-xl-8 mb-3 mb-xl-0'>
          <h3>
            <span className='mdi mdi-map-marker-outline mdi-24px'></span>{" "}
            Puntos {puntos.length}
          </h3>
          {mensaje && <Feedback tipo='danger'>{mensaje}</Feedback>}
          <div className='row mb-3'>
            <div className='col-md mb-md-0 mb-2'>
              {puntos.map((punto) => (
                <Punto punto={punto} editarPuntoModal={editarPuntoModal} key={punto.id} />
              ))}
            </div>
          </div>
        </div>

        <NuevoPunto storePunto={storePunto}/>
      </div>

      <ModalPunto puntoEdit={puntoEdit} updatePunto={updatePunto}/>
    </WrapPagina>
  );
};

export default PuntosPage;
