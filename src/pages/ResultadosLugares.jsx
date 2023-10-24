import {useState, useEffect} from 'react'
import WrapPagina from '../components/WrapPagina'
import { URL_SERVER } from '../services/dataserver'

const ResultadosLugares = () => {
    const [resultado, setResultado] = useState([])

    const fetchResultado = async ()=>{
        const response = await fetch(`${URL_SERVER}/votacionlugares`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }).catch((error) => {
            console.log("Problemas con el servidor de datos");
          });

          const resultado = await response.json()

          console.log(resultado.data);

          setResultado(resultado.data)
    }

    useEffect(() => {
      fetchResultado()
    }, [])
    

  return (
    <WrapPagina>
        <section className="">
        <div className="container">
          <h4 className="display-6 text-center mb-4 pb-md-2">Informe por lugares</h4>
          
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="row">
                {resultado.map((lugar) => (
                  <div className="col-md-12 col-ms-12 mb-4" key={lugar.lugar}>
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <span className="badge bg-label-primary p-2 rounded me-2">
                          <i className="tf-icons mdi mdi-cart-plus mdi-20px"></i>
                        </span>
                        <h5 className="mb-0 ms-1">{lugar.lugar}</h5>
                      </div>
                      <ul className="list-unstyled my-4 lista-puntos">
                        {lugar.candidatos.map((candidato) => (
                          <li className="mb-2" key={candidato.candidato + lugar.lugar}>
                            <div className="text-heading d-flex justify-content-between align-items-center">
                              <h5 className="text-truncate me-1">
                                {" "}
                                <i className="mdi mdi-check-circle"></i> {candidato.candidato}
                              </h5>
                              
                              
                              <div
                                
                                className="text-primary cursor-pointer"
                              >
                                <i className="mdi mdi-vote"></i> {candidato.votos_totales}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </WrapPagina>
  )
}

export default ResultadosLugares