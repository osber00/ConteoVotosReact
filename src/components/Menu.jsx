import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <ul className='navbar-nav me-auto p-3 p-lg-0'>
      <li className='nav-item'>
        <Link to={"/"} className='nav-link fw-medium'>
          Inicio
        </Link>
      </li>
      {/* <li className="nav-item">
              <Link to={'/equipo'} className='nav-link fw-medium'>Equipo</Link>
            </li> */}
      <li className='nav-item'>
        <Link to={"/puntos"} className='nav-link fw-medium'>
          Puntos
        </Link>
      </li>
      <li className='nav-item'>
        <Link to={"/resultados"} className='nav-link fw-medium active'>
          Resultados
        </Link>
      </li>
      <li className='nav-item'>
        <Link to={"/formatos"} className='nav-link fw-medium active'>
          Formatos
        </Link>
      </li>
      {/* <li className='nav-item mega-dropdown'>
        <Link to={"/procesar"} className='nav-link fw-medium'>
          Procesar
        </Link>
      </li> */}
    </ul>
  );
};

export default Menu;
