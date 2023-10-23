import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { URL_SERVER } from "../services/dataserver";
import WrapPagina from "../components/WrapPagina";

const Resultadosxlugar = () => {
  const params = useParams();
  const [resultados, setResultados] = useState([]);
  const [candidato, setCandidato] = useState({});

  const fetchResultados = async () => {
    const response = await fetch(`${URL_SERVER}/votacionxlugar/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      setMensaje("Problemas con el servidor de datos");
    });

    const resultado = await response.json();
    setResultados(resultado.data);
  };

  const fetchCandidato = async () => {
    const response = await fetch(`${URL_SERVER}/candidatos/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      setMensaje("Problemas con el servidor de datos");
    });

    const resultado = await response.json();
    if (resultado.estado == "success") {
      setCandidato(resultado.data);
    }
    //console.log(resultado);
  };

  useEffect(() => {
    fetchResultados();
    fetchCandidato();
  }, []);

  return (
    <WrapPagina>
      <section className="">
        <div className="container">
          <div className="display-6 text-center mb-4 text-primary">
            {candidato.nombre}
          </div>
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="row">
                <div className="col-md-12 col-ms-12 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <span className="badge bg-label-primary p-2 rounded me-2">
                          <i className="tf-icons mdi mdi-map mdi-20px"></i>
                        </span>
                        <h5 className="mb-0 ms-1 text-primary">Resultados por lugares</h5>
                      </div>
                      <ul className="list-unstyled my-4 lista-puntos">
                        {resultados.map((resultado) => (
                          <li className="mb-2" key={resultado.lugar}>
                            <div className="text-heading d-flex justify-content-between align-items-center">
                              <h5 className="text-truncate me-1">
                                <i className="mdi mdi-map"></i>{" "}
                                {resultado.lugar}
                              </h5>
                              <div>
                                <i className="mdi mdi-chevron-right"></i>{" "}
                                {resultado.votos_totales}
                              </div>
                              <div className="text-primary">
                                <i className="mdi mdi-check-circle"></i>{" "}
                                {resultado.porcentaje.toFixed(1)}%
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </WrapPagina>
  );
};

export default Resultadosxlugar;
