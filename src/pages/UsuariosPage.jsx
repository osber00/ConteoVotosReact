import ModalUsuario from "../components/ModalUsuario";
import NuevoUsuario from "../components/NuevoUsuario";
import Usuario from "../components/Usuario";
import WrapPagina from "../components/WrapPagina";
import { URL_SERVER } from "../services/dataserver";
import { useState, useEffect } from "react";
import Feedback from "../components/Feedback";

const UsuariosPage = () => {
  const [usuarios, setusuarios] = useState([]);
  const [usuarioEdit, setUsuarioEdit] = useState({});
  const [mensaje, setMensaje] = useState("");

  //Consultar usuarios
  const fetchUsuarios = async () => {
    const response = await fetch(`${URL_SERVER}/usuarios`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      setMensaje("Problemas con el servidor de datos");
    });

    const resultados = await response.json();
    //console.log(resultados.data)
    setusuarios(resultados.data);
  };

  //Cargar usuarios al iniciar aplicación
  useEffect(() => {
    fetchUsuarios();
  }, []);

  //Mostrar Modal para edición
  const editarUsuarioModal = (data) => {
    if (data != null) {
      setUsuarioEdit(data);
    } else {
      setUsuarioEdit({});
    }
  };

  //Enviar petición para actualizar usuario
  const fetchUpdateUsuario = async (usuario) => {
    const response = await fetch(`${URL_SERVER}/usuarios/${usuario.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "applicaction/json",
      },
      body: JSON.stringify(usuario),
    }).catch((error) => {
      setMensaje("Problemas con el servidor de datos");
    });

    const resultado = await response.json();
    if (resultado.estado == "updated") {
      setUsuarioEdit({});
      fetchUsuarios();
    }else{
      setMensaje('Algo salió mal')
    }
  };

  //Actualizar datos de un usuario
  const updateUsuario = (usuario) => {
    fetchUpdateUsuario(usuario);
  };

  const fetchStoreUsuario = async (usuario) => {
    const response = await fetch(`${URL_SERVER}/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    }).catch((error) => {
      setMensaje("Problemas con el servidor de datos");
    });

    const resultado = await response.json();
    //console.log(resultado.estado);
    if (resultado.estado == "created") {
      fetchUsuarios();
    } else {
      setMensaje("Algo salió mal");
    }
  };

  const storeUsuario = (usuario) => {
    //console.log(usuario);
    fetchStoreUsuario(usuario);
  };

  return (
    <WrapPagina>
      <div className='row contenedor rounded'>
        <div className='col-xl-8 mb-3 mb-xl-0'>
          <h3>
            <span className='mdi mdi-database-check-outline mdi-24px'></span>{" "}
            Registros {usuarios.length}
          </h3>
          {mensaje && <Feedback tipo='danger'>{mensaje}</Feedback>}
          <ul className='list-group mb-3'>
            {usuarios.map((usuario) => (
              <Usuario
                usuario={usuario}
                key={usuario.id}
                editarUsuarioModal={editarUsuarioModal}
              />
            ))}
          </ul>
        </div>

        <NuevoUsuario storeUsuario={storeUsuario} />
      </div>

      <ModalUsuario usuarioEdit={usuarioEdit} updateUsuario={updateUsuario} />
    </WrapPagina>
  );
};

export default UsuariosPage;
