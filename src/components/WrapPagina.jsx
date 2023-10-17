import React from 'react'
import Menu from './Menu'

const WrapPagina = (props) => {
  return (
    <>
    <nav className="layout-navbar container shadow-none py-0">
      <div className="navbar barra-menu navbar-expand-lg landing-navbar border-top-0 px-3 px-md-4">
        {/* Menu logo wrapper: Start */}
        <div className="navbar-brand app-brand demo d-flex py-0 py-lg-2 me-4">
          {/* Mobile menu toggle: Star */}
          <button
            className="navbar-toggler border-0 px-0 me-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <i className="tf-icons mdi mdi-menu mdi-24px align-middle"></i>
          </button>
          <a href="landing-page.html" className="app-brand-link">
            <span className="app-brand-logo demo">
            </span>
            <span className="app-brand-text demo menu-text fw-bold ms-2 ps-1">Ebercon</span>
          </a>
        </div>
        <div className="collapse navbar-collapse landing-nav-menu" id="navbarSupportedContent">
          <button
            className="navbar-toggler border-0 text-heading position-absolute end-0 top-0 scaleX-n1-rtl"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <i className="tf-icons mdi mdi-close"></i>
          </button>

          <Menu/>

        </div>
        <div className="landing-menu-overlay d-lg-none"></div>
        <ul className="navbar-nav flex-row align-items-center ms-auto">
          {/* Style Switcher */}
          <li className="nav-item dropdown-style-switcher dropdown me-2 me-xl-0">
            <a className="nav-link dropdown-toggle hide-arrow" href=";" data-bs-toggle="dropdown">
              <i className="mdi mdi-24px"></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-styles">
              <li>
                <a className="dropdown-item" href=";" data-theme="light">
                  <span className="align-middle"><i className="mdi mdi-weather-sunny me-2"></i>Light</span>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href=";" data-theme="dark">
                  <span className="align-middle"><i className="mdi mdi-weather-night me-2"></i>Dark</span>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href=";" data-theme="system">
                  <span className="align-middle"><i className="mdi mdi-monitor me-2"></i>System</span>
                </a>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="../vertical-menu-template/auth-login-cover.html"
              className="btn btn-primary px-2 px-sm-4 px-lg-2 px-xl-4"
              target="_blank"><span className="tf-icons mdi mdi-account me-md-1"></span><span className="d-none d-md-block">Login/Register</span></a>
          </li>
        </ul>
      </div>
    </nav>

    <section className="section-py bg-body first-section-pt">
      <div className="container">
        <div id="" className="content">
          {props.children}
        </div>
      </div>
    </section>
    </>
  )
}

export default WrapPagina