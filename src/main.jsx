import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import InicioPage from './pages/InicioPage'
import UsuariosPage from './pages/UsuariosPage'
import PuntosPage from './pages/PuntosPage'
import ItemsPage from './pages/ResultadosPage'
import FormatosPage from './pages/FormatosPage'
import ProcesarPage from './pages/ProcesarPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <InicioPage/>
  },
  {
    path: '/equipo',
    element: <UsuariosPage/>
  },
  {
    path: '/puntos',
    element: <PuntosPage/>
  },
  {
    path: '/resultados',
    element: <ItemsPage/>
  },
  {
    path: '/formatos',
    element: <FormatosPage/>
  },
  {
    path: '/procesar',
    element: <ProcesarPage/>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
