import { useState, useEffect } from "react";
import WrapPagina from "../components/WrapPagina";
import { URL_SERVER } from "../services/dataserver";
import PuntoFormato from "../components/PuntoFormato";

const FormatosPage = () => {
  const [puntos, setPuntos] = useState([])
  const [formatos, setFormatos] = useState([]);
  const [asignados, setAsignados] = useState([])
  const [mensaje, setMensaje] = useState("");

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

  useEffect(() => {
    fetchPuntos()
    fetchFormatos();
  }, []);


  if (Object.keys(puntos).length == 0 && Object.keys(formatos).length == 0) {
    return
  }

  return (
    <WrapPagina>
      <section className="">
        <div className="container">
          <h4 className="display-6 text-center mb-4 pb-md-2">Formatos</h4>
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
    </WrapPagina>
  );
};

export default FormatosPage;
