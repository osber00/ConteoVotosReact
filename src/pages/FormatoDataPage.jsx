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
  const [votosCandidatos, setVotosCandidatos] = useState([]);
  const params = useParams();

  const fetchFormato =  () => {
    fetch(`${URL_SERVER}/formatos/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response)=> response.json())
    .then((data)=>{
      const resultado = data.data
        if (resultado != null) {
          setFormato(resultado)
          setPunto(resultado.lugar.nombre)
          setMesa(resultado.mesa)
          setSufragantes(resultado.sufragantes)
          setCandidatos(resultado.candidatos)
          setVotosCandidatos(
            resultado.candidatos.map(()=>({
              id: candidato.id,
              votos: candidato.pivot.votos
            }))
          )
          console.log('Datos cargados');
          console.log(votosCandidatos);
        }
    })
    .catch((err) => {
      setMensaje("Ocurrió un error");
    });

    //const resultado = await response.json();
    //console.log(resultado);

    /* if (resultado.data !== null) {
      const temp = resultado.data;
      //console.log(temp);
      setFormato(temp);
      setPunto(temp.lugar.nombre);
      setMesa(temp.mesa);
      setSufragantes(temp.sufragantes);
      setCandidatos(temp.candidatos);
      setVotosCandidatos(
        candidatos.map((candidato) => ({
          id: candidato.id,
          votos: candidato.pivot.votos,
        }))
      );
    } */
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
    setVotosCandidatos((prevVotos) =>
      prevVotos.map((voto) =>
        voto.id === id ? { ...voto, votos: nuevosVotos } : voto
      )
    );
  };

  const handleFormVotos = async (e) => {
    e.preventDefault();
    console.log(e);

    try {
      const datosParaEnviar = {};
      votosCandidatos.forEach((candidato) => {
        datosParaEnviar[candidato.id] = candidato.votos.toString();
      });

      const response = await fetch(`${URL_SERVER}/votos/${params.id}/formato`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ votos: datosParaEnviar }),
      });

      if (response.ok) {
        setMensaje("Datos enviados exitosamente a la API");
        // Puedes manejar cualquier respuesta exitosa aquí
      } else {
        setMensaje("Error al enviar datos a la API");
        // Puedes manejar errores de la API aquí
      }
    } catch (error) {
      console.error("Error en la solicitud a la API:", error);
    }
  };

  const inputsCandidatos = votosCandidatos.map((candidato, index) => (
    <div className="row g-3 mb-3" key={candidato.id}>
      <div className="form-floating form-floating-outline">
        <input
          value={candidato.votos}
          onChange={(e) =>
            handleVotosChange(candidato.id, parseInt(e.target.value, 10))
          }
          type="text"
          autoCapitalize="true"
          autoComplete="false"
          className="form-control"
          placeholder={candidatos[index].nombre}
        />
        <label>{candidatos[index].nombre}</label>
      </div>
    </div>
  ));

  if (Object.keys(formato).length == 0 || Object.keys(votosCandidatos).length == 0) {
    return;
  }

  return (
    <WrapPagina>
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

          {mensaje && <Feedback tipo="primary">{mensaje}</Feedback>}
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
