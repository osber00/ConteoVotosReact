import { useState } from "react";
import WrapPagina from "../components/WrapPagina";
import { useParams } from "react-router-dom";
import { URL_SERVER } from "../services/dataserver";
import { useEffect } from "react";
import Feedback from "../components/Feedback";

const FormatoDataPage = () => {
  const [mensaje, setMensaje] = useState("");
  const [formato, setFormato] = useState({});
  const [punto, setPunto] = useState("");
  const [mesa, setMesa] = useState("");
  const [sufragantes, setSufragantes] = useState("");
  const [candidatos, setCandidatos] = useState([]);
  const params = useParams();

  const fetchFormato = async () => {
    const response = await fetch(`${URL_SERVER}/formatos/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      setMensaje("Ocurrió un error");
    });

    const resultados = await response.json();
    const resultado = resultados.data;
    const items = resultado.candidatos;
    if (resultado != null && Object.keys(items).length >= 1) {
      setFormato(resultado);
      setPunto(resultado.lugar.nombre);
      setMesa(resultado.mesa);
      setSufragantes(resultado.sufragantes);
      const arrayCandidatos = items.map((candidato) => {
        let tempCandidato = {
          id: candidato.id,
          nombre: candidato.nombre,
          votos: candidato.pivot.votos,
        };
        return tempCandidato;
      });
      setCandidatos(arrayCandidatos);
      //console.log("Datos cargados");
    } else {
      setMensaje("No hay datos relacionados");
    }
  };

  useEffect(() => {
    fetchFormato();
  }, []);

  const fetchUpdateFormato = async (data) => {
    const response = await fetch(`${URL_SERVER}/sufragantes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((err) => {
      setMensaje("Ocurrió un error al actualizar la información");
    });

    const resultado = await response.json();
    if (resultado.data == true) {
      setMensaje("La información se actualizó");
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    const data = {
      id: params.id,
      sufragantes,
    };
    fetchUpdateFormato(data);
  };

  const handleVotosChange = (id, nuevosVotos) => {
    setCandidatos((prevVotos) =>
      prevVotos.map((voto) =>
        voto.id === id ? { ...voto, votos: nuevosVotos } : voto
      )
    );
  };

  const handleFormVotos = async (e) => {
    e.preventDefault();
    //console.log(e.target.length);
    let suma = 0;

    for (let i = 0; i <= 8; i++) {
      suma += parseInt(e.target[i].value);
    }

    console.log(suma);
    console.log(sufragantes);
    if (sufragantes != suma) {
      setMensaje("La suma de votos no es igual al número de sufragantes");
    } else {
      try {
        const datosParaEnviar = {};
        candidatos.forEach((candidato) => {
          if (candidato.votos != "" && isNaN(candidato.votos) == false) {
            datosParaEnviar[candidato.id] = candidato.votos.toString();
          } else {
            candidato.votos = 0;
            datosParaEnviar[candidato.id] = candidato.votos.toString();
          }
        });

        const response = await fetch(
          `${URL_SERVER}/votos/${params.id}/formato`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ votos: datosParaEnviar }),
          }
        );

        if (response.ok) {
          setMensaje("Datos enviados exitosamente a la API");
        } else {
          setMensaje("Error al enviar datos a la API");
        }
      } catch (error) {
        console.error("Error en la solicitud a la API:", error);
      }
    }
  };

  const inputsCandidatos = candidatos.map((candidato, index) => (
    <div className="row g-3 mb-3" key={candidato.id}>
      <div className="form-floating form-floating-outline">
        <input
          value={candidato.votos}
          onChange={(e) => handleVotosChange(candidato.id, e.target.value)}
          type="number"
          autoCapitalize="true"
          autoComplete="false"
          className="form-control"
          placeholder={candidatos[index].nombre}
        />
        <label>{candidatos[index].nombre}</label>
      </div>
    </div>
  ));

  if (Object.keys(formato).length == 0 || Object.keys(candidatos).length == 0) {
    //console.log(formato);
    return;
  }

  return (
    <WrapPagina>
      {mensaje && <Feedback tipo="primary">{mensaje}</Feedback>}
      <form onSubmit={handleForm}>
        <h3>
          {punto} - Mesa: {mesa}
        </h3>
        <div className="border rounded p-3 mb-3">
          <div className="row g-3 mb-3">
            <div className="form-floating form-floating-outline">
              <input
                value={sufragantes}
                onChange={(e) => {
                  setSufragantes(e.target.value);
                  setMensaje("");
                }}
                type="text"
                autoCapitalize="true"
                autoComplete="false"
                className="form-control"
                placeholder="Sufragantes"
              />
              <label>Sufragantes</label>
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-next">
              <span className="mdi mdi-content-save"></span> Guardar
            </button>
          </div>
          <hr className="mx-n3" />
        </div>
      </form>

      <form onSubmit={handleFormVotos}>
        <h3>Datos</h3>
        <div className="border rounded p-3 mb-3">
          {inputsCandidatos}
          {mensaje && <Feedback tipo="primary">{mensaje}</Feedback>}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-next">
              <span className="mdi mdi-content-save"></span> Guardar
            </button>
          </div>
          <hr className="mx-n3" />
        </div>
      </form>
    </WrapPagina>
  );
};

export default FormatoDataPage;
