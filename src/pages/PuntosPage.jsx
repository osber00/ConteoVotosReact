import { useState, useEffect } from "react";
import WrapPagina from "../components/WrapPagina";
import { URL_SERVER } from "../services/dataserver";
import ModalPunto from "../components/ModalPunto";
import Punto from "../components/Punto";
import Feedback from "../components/Feedback";

const PuntosPage = () => {
  const [puntos, setPuntos] = useState([]);
  const [puntoEdit, setPuntoEdit] = useState({})
  const [mensaje, setMensaje] = useState('')

  const fetchPuntos = async () => {
    const response = await fetch(`${URL_SERVER}/lugares`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log("Error en la petición");
    });

    const resultados = await response.json();
    //console.log(resultados.data);
    await setPuntos(resultados.data);
  };

  useEffect(() => {
    fetchPuntos();
  }, []);

  const editarPuntoModal = (data)=>{
    setMensaje('')
    if (data != null) {
      setPuntoEdit(data)
    }else{
      setPuntoEdit({})
    }
  }

  const fetchUpdatePunto = async(data)=>{
    const response = await fetch(`${URL_SERVER}/lugares/${data.id}`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .catch((error)=>{
      setMensaje("Problemas con el servidor de datos");
    })

    const resultado = await response.json()
    //console.log(resultado);
    if (resultado.estado == 'updated') {
      setPuntoEdit({})
      fetchPuntos()
    }else{
      setMensaje('Algo salió mal')
    }
  }

  const updatePunto = (data)=>{
    fetchUpdatePunto(data)
  }

  return (
    <WrapPagina>
      <div className='row contenedor rounded shadown'>
        <div className='col-xl-8 mb-3 mb-xl-0'>
          <h3>
            <span className='mdi mdi-map-marker-outline mdi-24px'></span>{" "}
            Registros {puntos.length}
          </h3>
          {mensaje && <Feedback tipo='danger'>{mensaje}</Feedback>}
          <div className='row mb-3'>
            <div className='col-md mb-md-0 mb-2'>
              {puntos.map((punto) => (
                <Punto punto={punto} editarPuntoModal={editarPuntoModal} key={punto.id} />
              ))}
            </div>
          </div>
        </div>

        <div className='col-xl-4'>
          <div className='border rounded p-3 mb-3'>
            <h6 className='mb-4'>Estimated Delivery Date</h6>
            <ul className='list-unstyled'>
              <li className='d-flex gap-3 mb-2'>
                <div className='flex-shrink-0'>
                  <img
                    src='../../assets/img/products/1.png'
                    alt='google home'
                    className='w-px-50'
                  />
                </div>
                <div className='flex-grow-1'>
                  <p className='mb-0'>
                    <a className='text-body' href=''>
                      Google - Google Home - White
                    </a>
                  </p>
                  <p className='fw-medium'>18th Nov 2021</p>
                </div>
              </li>
              <li className='d-flex gap-3'>
                <div className='flex-shrink-0'>
                  <img
                    src='../../assets/img/products/2.png'
                    alt='google home'
                    className='w-px-50'
                  />
                </div>
                <div className='flex-grow-1'>
                  <p className='mb-0'>
                    <a className='text-body' href=''>
                      Apple iPhone 11 (64GB, Black)
                    </a>
                  </p>
                  <p className='fw-medium'>20th Nov 2021</p>
                </div>
              </li>
            </ul>

            <hr className='mx-n3 mt-2' />

            <h6>Price Details</h6>
            <dl className='row mb-0'>
              <dt className='col-6 fw-normal text-heading'>Order Total</dt>
              <dd className='col-6 text-end'>$1198.00</dd>

              <dt className='col-6 fw-normal text-heading'>Delivery Charges</dt>
              <dd className='col-6 text-end'>
                <s className='text-muted'>$5.00</s>{" "}
                <span className='badge bg-label-success rounded-pill'>
                  Free
                </span>
              </dd>
            </dl>
            <hr className='mx-n3' />
            <dl className='row h6 mb-0'>
              <dt className='col-6 mb-0'>Total</dt>
              <dd className='col-6 text-end mb-0'>$1198.00</dd>
            </dl>
          </div>
          <div className='d-grid'>
            <button className='btn btn-primary btn-next'>Place Order</button>
          </div>
        </div>
      </div>

      <ModalPunto puntoEdit={puntoEdit} updatePunto={updatePunto}/>
    </WrapPagina>
  );
};

export default PuntosPage;
