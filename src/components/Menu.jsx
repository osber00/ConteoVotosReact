import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <ul className="navbar-nav me-auto p-3 p-lg-0">
            <li className="nav-item">
              <Link to={'/'} className='nav-link fw-medium'>Inicio</Link>
            </li>
            <li className="nav-item">
              <Link to={'/equipo'} className='nav-link fw-medium'>Equipo</Link>
            </li>
            <li className="nav-item">
              <Link to={'/puntos'} className='nav-link fw-medium'>Puntos</Link>
            </li>
            <li className="nav-item">
              <Link to={'/items'} className='nav-link fw-medium'>Items</Link>
            </li>
            <li className="nav-item">
              <Link to={'/formatos'} className='nav-link fw-medium'>Formatos</Link>
            </li>
            <li className="nav-item mega-dropdown active">
              <a
                href=";"
                className="nav-link fw-medium"
                aria-expanded="false"
                data-trigger="hover">
                <span data-i18n="Pages">Procesar</span>
              </a>
            </li>
          </ul>
  )
}

export default Menu