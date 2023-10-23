import React from "react";

const Item = ({ item }) => {
  return (
    <div className="col-md-3 px-0">
      <div className="card border rounded shadow-none">
        <div className="card-body">
          <div className="my-3 pt-2 text-center">
            <span className="mdi mdi-account text-primary mdi-48px" />
          </div>
          <h5 className="card-title text-center text-capitalize mb-1">
            {item.nombre}
          </h5>

          <div className="text-center">
            <div className="d-flex justify-content-center">
              <h3 className="price-toggle display-5 text-primary mb-0">
                {item.votos_totales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </h3>
            </div>
            <p className="text-secondary">{item.porcentaje.toFixed(1)}%</p>
          </div>

          <a href={`/resultados-lugares/${item.id}`} className="btn btn-primary d-grid w-100">Consultar</a>
          
        </div>
      </div>
    </div>
  );
};

export default Item;
