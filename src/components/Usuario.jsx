const Usuario = ({ usuario, editarUsuarioModal }) => {

  const editar = (data) => {
    editarUsuarioModal(data)
  };

  return (
    <li className='list-group-item p-4'>
      <div className='d-flex gap-3'>
        <div className='flex-shrink-0'>
          <span className='badge bg-label-primary p-2 rounded me-2'>
            <i className='tf-icons mdi mdi-account-check-outline mdi-48px'></i>
          </span>
        </div>
        <div className='flex-grow-1'>
          <div className='row'>
            <div className='col-md-8'>
              <div className='me-3'>
                <h4 className='text-heading'>{usuario.name}</h4>
              </div>
              <div className='mb-1 d-flex flex-wrap'>
                <h5 className='me-1'>{usuario.identificacion}</h5>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='text-md-end'>
                <div className='my-2 mt-md-4 mb-md-5'>
                  <span className='text-danger'>
                    <span className='mdi mdi-text-box-check-outline'></span> Formatos:{" "}
                    {usuario.formatos_count}
                  </span>
                </div>
                <button
                  type='button'
                  className='btn btn-sm btn-outline-primary mt-3'
                  onClick={()=>{editar(usuario)}}>
                  <span className="mdi mdi-cog"></span> Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Usuario;
