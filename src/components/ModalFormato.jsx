import { useState, useEffect } from "react";
import Feedback from "./Feedback";
import { URL_SERVER } from "../services/dataserver";

const ModalFormato = ({ modalFormato, fetchNuevoFormato }) => {
  const [puntos, setPuntos] = useState([]);
  const [punto, setPunto] = useState("");
  const [mesa, setMesa] = useState("");
  const [mensaje, setMensaje] = useState("");

  const fetchLugares = async () => {
    const response = await fetch(`${URL_SERVER}/lugares`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch(() => {
      setMensaje("Ocurrió un error");
    });

    const resultado = await response.json();

    setPuntos(resultado.data);
  };

  const handleFormulario = (e) => {
    e.preventDefault();
    const data = {
        "lugar" : punto,
        "mesa": mesa
    }
    fetchNuevoFormato(data)
  };

  useEffect(() => {
    if (modalFormato) {
      $("#modalFormato").modal("show");
    } else {
      $("#modalFormato").modal("hide");
    }
  }, [modalFormato]);

  useEffect(() => {
    fetchLugares();
  }, []);

  return (
    <div className="modal fade" id="modalFormato" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-simple modal-add-new-address">
        <div className="modal-content p-3 p-md-5">
          <div className="modal-body p-md-0">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="text-center mb-4">
              <h3 className="address-title mb-2 pb-1">
                Registrar punto de votación
              </h3>
              <p className="address-subtitle">
                Seleccione el lugar e indique el número de la mesa
              </p>
              {mensaje && <Feedback tipo="danger">{mensaje}</Feedback>}
            </div>
            <form
              onSubmit={handleFormulario}
              id="modalFormatoForm"
              className="row g-4"
            >
              <div className="col-12 col-md-6">
                <div className="form-floating form-floating-outline">
                  <select
                    id="billings-country"
                    className="form-select"
                    data-allow-clear="true"
                    onChange={(e)=> setPunto(e.target.value)}
                  >
                    <option value="">Seleccion lugar</option>
                    {puntos.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                  <label>Lugar</label>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-floating form-floating-outline">
                  <input
                    value={mesa}
                    onChange={(e) => {
                      setMesa(e.target.value);
                      setMensaje("");
                    }}
                    type="text"
                    className="form-control"
                    placeholder="Número de Mesa"
                  />
                  <label>Mesa</label>
                </div>
              </div>
              <div className="col-12 text-center">
                <button
                  type="reset"
                  className="btn btn-outline-secondary me-sm-3 me-1"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span className="mdi mdi-close-circle-outline"></span>{" "}
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  <span className="mdi mdi-content-save"></span> Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFormato;
