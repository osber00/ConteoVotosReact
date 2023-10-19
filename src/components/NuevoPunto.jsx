import { useState, useEffect } from "react";
import Feedback from "./Feedback";

const NuevoPunto = ({ storePunto }) => {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [saveBtn, setSaveBtn] = useState(true);

  const handleForm = (e) => {
    e.preventDefault();
    if ([nombre].includes("")) {
      setMensaje("😅 Debe ingresar el nombre de un punto de votación");
      return;
    }
    const data = {
      nombre,
    };
    storePunto(data);
    setNombre("");
  };

  return (
    <div className="col-xl-4">
      <div className="border rounded p-3 mb-3">
        <h3>
          <span className="mdi mdi-database-plus-outline mdi-24px"></span> Nuevo
          punto
        </h3>
        <form onSubmit={handleForm}>
          <div className="border rounded p-3 mb-3">
            <div className="row g-3 mb-3">
              <div className="form-floating form-floating-outline">
                <input
                  value={nombre}
                  onChange={(e) => {
                    setNombre(e.target.value);
                    setMensaje("");
                  }}
                  type="text"
                  autoCapitalize="true"
                  autoComplete="false"
                  className="form-control"
                  placeholder="Nombre completo"
                />
                <label>Nombre completo</label>
              </div>
            </div>

            {mensaje && <Feedback tipo="danger">{mensaje}</Feedback>}
            <div className="d-grid">
              {saveBtn && (
                <button type="submit" className="btn btn-primary btn-next">
                  <span className="mdi mdi-content-save"></span> Guardar
                </button>
              )}
            </div>
            <hr className="mx-n3" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevoPunto;
