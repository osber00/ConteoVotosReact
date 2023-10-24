import { useState, useEffect } from "react";
import WrapPagina from "../components/WrapPagina";
import { URL_SERVER } from "../services/dataserver";
import Item from "../components/Item";
import { Link } from "react-router-dom";

const ItemsPage = () => {
  const [Items, setItems] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const fetchItems = async () => {
    const response = await fetch(`${URL_SERVER}/resultados`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      setMensaje("Hubo problema con la consulta de datos");
    });

    const resultados = await response.json();
    //console.log(resultados.data);
    setItems(resultados.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (Object.keys(Items).length == 0) {
    return;
  }

  return (
    <WrapPagina>
      <section className="">
        <div className="container">
          <h2 className="text-center mb-2">Resultados</h2>
          <div className="text-center text-danger display-6 mb-4">
            {/* <a href="/resultadoslugares">Resultados por lugares</a> */}
            <Link to={'/resultadoslugares'}>Resultados por lugares</Link>
          </div>
          <div className="pricing-plans row mx-0 gap-4">
            {Items.map((item) => (
              <Item item={item} key={item.id} />
            ))}
          </div>
        </div>
      </section>
    </WrapPagina>
  );
};

export default ItemsPage;
