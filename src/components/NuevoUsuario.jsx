import { useState } from "react";
import Feedback from "./Feedback";
const NuevoUsuario = ({ storeUsuario }) => {
  const [nombre, setNombre] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [saveBtn, setsaveBtn] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    if (
      [nombre, identificacion].includes("") ||
      isNaN(identificacion) == true
    ) {
      setMensaje(
        "😅 Los campos son requeridos, la identificación debe ser un número"
      );
      return;
    }
    const data = {
      nombre,
      identificacion,
    };
    storeUsuario(data);
    setNombre("");
    setIdentificacion("");
  };

  const showBtnSave = ()=>{
    if ([nombre].includes('') || [identificacion].includes('')) {
      setsaveBtn(false)
    }else{
      setsaveBtn(true)
    }
  }

  return (
    <div className='col-xl-4'>
      <h3>
        <span className='mdi mdi-database-plus-outline mdi-24px'></span> Nuevo
        registro
      </h3>
      <form onSubmit={handleForm}>
        <div className='border rounded p-3 mb-3'>
          <div className='row g-3 mb-3'>
            <div className='form-floating form-floating-outline'>
              <input
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                  showBtnSave();
                  setMensaje("");
                }}
                type='text'
                autoCapitalize='true'
                autoComplete='false'
                className='form-control'
                placeholder='Nombre completo'
              />
              <label>Nombre completo</label>
            </div>
          </div>

          <div className='row g-3 mb-3'>
            <div className='form-floating form-floating-outline'>
              <input
                value={identificacion}
                onChange={(e) => {
                  setIdentificacion(e.target.value);
                  showBtnSave();
                  setMensaje("");
                }}
                type='text'
                autoCapitalize='true'
                autoComplete='false'
                className='form-control'
                placeholder='Nombre completo'
              />
              <label>Número de documento</label>
            </div>
          </div>
          {mensaje && <Feedback tipo='danger'>{mensaje}</Feedback>}
          <div className='d-grid'>
            {saveBtn &&
              <button type='submit' className='btn btn-primary btn-next'>
                <span className='mdi mdi-content-save'></span> Guardar
              </button>
            }
          </div>
          <hr className='mx-n3' />
        </div>
      </form>
    </div>
  );
};

export default NuevoUsuario;
