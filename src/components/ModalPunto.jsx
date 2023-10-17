import { useState, useEffect } from "react";
import Feedback from "./Feedback";

const ModalPunto = ({ puntoEdit, updatePunto }) => {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (Object.keys(puntoEdit).length >= 1) {
      setNombre(puntoEdit.nombre);
      $("#modalPuntoEdit").modal("show");
    } else {
      $("#modalPuntoEdit").modal("hide");
    }
  }, [puntoEdit]);

  const handleFormulario = (e) => {
    e.preventDefault();

    if ([nombre].includes("")) {
      setMensaje("😅 Debe ingresar el nombre de un punto");
      return;
    }

    const data = {
      id: puntoEdit.id,
      nombre,
    };
    updatePunto(data);
    setMensaje("");
    setNombre("");
  };

  return (
    <div className='modal fade' id='modalPuntoEdit' aria-hidden='true'>
      <div className='modal-dialog modal-lg modal-simple modal-add-new-address'>
        <div className='modal-content p-3 p-md-5'>
          <div className='modal-body p-md-0'>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'></button>
            <div className='text-center mb-4'>
              <h3 className='address-title mb-2 pb-1'>Editar Punto</h3>
              <p className='address-subtitle'>
                Formatos asociados {puntoEdit.formatos_count}
              </p>
              {mensaje && <Feedback tipo='danger'>{mensaje}</Feedback>}
            </div>
            <form
              onSubmit={handleFormulario}
              id='modalPuntoEditForm'
              className='row g-4'>
              <div className='col-12 col-md-12'>
                <div className='form-floating form-floating-outline'>
                  <input
                    value={nombre}
                    onChange={(e) => {
                      setNombre(e.target.value);
                      setMensaje("");
                    }}
                    type='text'
                    className='form-control'
                    placeholder='Nombre completo'
                  />
                  <label>Nombre completo</label>
                </div>
              </div>
              <div className='col-12 text-center'>
                <button
                  type='reset'
                  className='btn btn-outline-secondary me-sm-3 me-1'
                  data-bs-dismiss='modal'
                  aria-label='Close'>
                  <span className='mdi mdi-close-circle-outline'></span>{" "}
                  Cancelar
                </button>
                <button type='submit' className='btn btn-primary'>
                  <span className='mdi mdi-content-save'></span> Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPunto;
