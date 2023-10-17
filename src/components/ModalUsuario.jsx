import { useState, useEffect } from "react";
import Feedback from './Feedback'

const ModalUsuario = ({ usuarioEdit, updateUsuario }) => {
  const [nombre, setNombre] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (Object.keys(usuarioEdit).length >= 1) {
      setNombre(usuarioEdit.name);
      setIdentificacion(usuarioEdit.identificacion);
      $("#modalUsuarioEdit").modal("show");
    } else {
      $("#modalUsuarioEdit").modal("hide");
    }
  }, [usuarioEdit]);

  const handleFormulario = (e) => {
    e.preventDefault();
    const data = {
      id: usuarioEdit.id,
      nombre,
      identificacion,
    };

    if ([nombre, identificacion].includes("") || isNaN(identificacion) == true) {
      setMensaje("😅 Los campos son requeridos, la identificación debe ser un número");
      return;
    }
    updateUsuario(data);
    resetForm();
  };

  const resetForm = () => {
    setNombre("");
    setIdentificacion("");
  };

  return (
    <div className='modal fade' id='modalUsuarioEdit' aria-hidden='true'>
      <div className='modal-dialog modal-lg modal-simple modal-add-new-address'>
        <div className='modal-content p-3 p-md-5'>
          <div className='modal-body p-md-0'>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'></button>
            <div className='text-center mb-4'>
              <h3 className='address-title mb-2 pb-1'>Editar Usuario</h3>
              <p className='address-subtitle'>
                Formatos asociados {usuarioEdit.formatos_count}
              </p>
              {mensaje && <Feedback tipo='danger'>{mensaje}</Feedback>}
            </div>
            <form
              onSubmit={handleFormulario}
              id='modalUsuarioEditForm'
              className='row g-4'>
              <div className='col-12 col-md-6'>
                <div className='form-floating form-floating-outline'>
                  <input
                    value={nombre}
                    onChange={(e) => {
                        setNombre(e.target.value)
                        setMensaje("")
                        }
                    }
                    type='text'
                    className='form-control'
                    placeholder='Nombre completo'
                  />
                  <label>Nombre completo</label>
                </div>
              </div>
              <div className='col-12 col-md-6'>
                <div className='form-floating form-floating-outline'>
                  <input
                    value={identificacion}
                    onChange={(e) => {
                        setIdentificacion(e.target.value)
                        setMensaje("")
                        }
                    }
                    type='text'
                    className='form-control'
                    placeholder='Número de identificación'
                  />
                  <label>Identificación</label>
                </div>
              </div>
              <div className='col-12 text-center'>
                <button
                  type='reset'
                  className='btn btn-outline-secondary me-sm-3 me-1'
                  data-bs-dismiss='modal'
                  aria-label='Close'>
                  <span className="mdi mdi-close-circle-outline"></span> Cancelar
                </button>
                <button type='submit' className='btn btn-primary'>
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

export default ModalUsuario;
