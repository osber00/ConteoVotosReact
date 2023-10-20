import { useState, useEffect } from "react";
import WrapPagina from "../components/WrapPagina";
import { URL_SERVER } from "../services/dataserver";
import PuntoFormato from "../components/PuntoFormato";
import ModalFormato from "../components/ModalFormato";

const FormatosPage = () => {
  const [puntos, setPuntos] = useState([])
  const [formatos, setFormatos] = useState([]);
  const [asignados, setAsignados] = useState([])
  const [mensaje, setMensaje] = useState("");
  const [modalFormato, setModalFormato] = useState(false)

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
    setPuntos(resultados.data);
  };

  const fetchFormatos = async () => {
    const response = await fetch(`${URL_SERVER}/formatos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      setMensaje("Ocurrió un error en la consulta de datos");
    });

    const resultados = await response.json();
    setFormatos(resultados.data);
  };

  const fetchNuevoFormato = async (data)=>{
    const response = await fetch(`${URL_SERVER}/formatos`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .catch(()=>{
      setMensaje('Ocurrió un error al registrar el formato')
    })

    const resultado = await response.json()

    if (resultado.estado == 'created') {
      fetchFormatos()      
    }
  }

  useEffect(() => {
    fetchPuntos()
    fetchFormatos();
  }, []);

  const mostrarModal = ()=>{
    setModalFormato(true)
  }


  if (Object.keys(puntos).length == 0 && Object.keys(formatos).length == 0) {
    return
  }

  return (
    <WrapPagina>
      <section className="">
        <div className="container">
          <h4 className="display-6 text-center mb-4 pb-md-2">Formatos</h4>
          <div className="text-center mb-3">
          <button onClick={()=>mostrarModal()} type='button' className='btn btn-primary text-center' >
            <span className='mdi mdi-content-save'></span> Nuevo registro
          </button>
          </div>
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="row">
                {puntos.map((punto)=>(
                  <PuntoFormato punto={punto} formatos={formatos} key={punto.id}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ModalFormato 
        modalFormato={modalFormato}
        fetchNuevoFormato={fetchNuevoFormato}
        />
    </WrapPagina>
  );
};

export default FormatosPage;
