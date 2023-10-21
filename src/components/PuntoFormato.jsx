import { useState, useEffect } from "react";

const PuntoFormato = ({ punto, formatos }) => {
  const [asignados, setAsignados] = useState([]);

  const filtrar = () => {
    let datos = formatos.filter((asignado) => asignado.lugar.id == punto.id);
    setAsignados(datos);
  };

  useEffect(() => {
    if (Object.keys(punto).length >= 1) {
      filtrar();
    }
  }, [formatos]);

  return (
    <div className='col-md-12 col-ms-12 mb-4'>
      <div className='card'>
        <div className='card-body'>
          <div className='d-flex align-items-center'>
            <span className='badge bg-label-primary p-2 rounded me-2'>
              <i className='tf-icons mdi mdi-cart-plus mdi-20px'></i>
            </span>
            <h5 className='mb-0 ms-1'>{punto.nombre}</h5>
          </div>
          <ul className='list-unstyled my-4 lista-puntos'>
            {asignados.map((formato) => (
              <li className='mb-2' key={formato.id}>
                <div
                  className='text-heading d-flex justify-content-between align-items-center'>
                  <h5 className='text-truncate me-1'>
                    {" "}
                    <i className='mdi mdi-check-circle'></i> Mesa {formato.mesa}
                  </h5>
                  <a href={`/formatos/${formato.id}`}><i className="mdi mdi-check-circle"></i> Registrar votos</a>
                  <a href={`/formatos/${formato.id}`} className="text-warning"><i className="mdi mdi-cog"></i> Modificar mesa</a>
                  <a href={`/formatos/${formato.id}`} className="text-danger"><i className="mdi mdi-delete"></i> Eliminar</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PuntoFormato;
