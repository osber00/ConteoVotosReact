const Punto = ({punto, editarPuntoModal}) => {
  return (
    <div className='custom-option-basic border'>
      <div className=' custom-option-content'>
        <span className='custom-option-header mb-2'>
          <h3>{punto.nombre}</h3>
          <span className='badge bg-label-danger rounded-pill'>{punto.formatos_count}</span>
        </span>
        <span className='custom-option-body'>
          <span className='my-2 d-block'></span>
          <span className='d-flex'>
            <a className='btn btn-sm btn-outline-primary text-primary mt-3' onClick={()=>editarPuntoModal(punto)}>
              <span className="mdi mdi-cog"/> {" "} Editar
            </a>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Punto;
