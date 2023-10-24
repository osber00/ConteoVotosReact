import { useState, useEffect } from "react";
import WrapPagina from "../components/WrapPagina";
import { URL_SERVER } from "../services/dataserver";

const InicioPage = () => {
  const [mensaje, setMensaje] = useState("");
  const [ganador, setGanador] = useState({});

  const fetchGanador = async () => {
    const response = await fetch(`${URL_SERVER}/ganador`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      setMensaje("Ocurrió un error");
    });

    const resultado = await response.json();
    //console.log(resultado.data);
    setGanador(resultado.data);
  };

  useEffect(() => {
    fetchGanador();
  }, []);

  return (
    <WrapPagina>
      <div id="checkout-confirmation" className="content">
        <div className="row mb-3">
          <div className="col-12 text-center ganador">
            <div>Puesto #1</div>
            <div className="text-primary display-4 mb-4">{ganador.nombre}</div>
            <div className="text-danger display-6">
              <i className="mdi mdi-vote mdi-24px"></i>
              {ganador.total_votos}
            </div>
          </div>
        </div>
      </div>
    </WrapPagina>
  );
};

export default InicioPage;
