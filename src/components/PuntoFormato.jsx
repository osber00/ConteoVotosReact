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
    <div className="col-md-12 col-ms-12 mb-4">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <span className="badge bg-label-primary p-2 rounded me-2">
              <i className="tf-icons mdi mdi-cart-plus mdi-20px"></i>
            </span>
            <h5 className="mb-0 ms-1">{punto.nombre}</h5>
          </div>
          <ul className="list-unstyled my-4">
            {asignados.map((formato) => (
              <li className="mb-2" key={formato.id}>
                <a
                  href=""
                  className="text-heading d-flex justify-content-between align-items-center"
                >
                  <span className="text-truncate me-1">
                    {" "}
                    Mesa {formato.mesa}
                  </span>
                  <i className="tf-icons mdi mdi-chevron-right mdi-24px scaleX-n1-rtl text-muted"></i>
                </a>
              </li>
            ))}
          </ul>
          <p className="mb-0 fw-medium mt-4">
            <a href="" className="d-flex align-items-center"></a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PuntoFormato;
