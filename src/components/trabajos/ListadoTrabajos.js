import React, { useContext, useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import axios from "axios";
import { loader } from '@googlemaps/js-api-loader'

import TrabajoContext from "./../../context/trabajos/TrabajoContext";
import AuthContext from "./../../context/autenticacion/AuthContext";

export default function ListadoTrabajos() {
    
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [duracion, setDuracion] = useState("");
  const [requisitos, setRequsitos] = useState("");
  const [ubicacion, setUbicacion] = useState("");
// --------------------------GoogleMaps--------------
//     const loader = new Loader({
//     apiKey: "AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik",
//     version: "weekly",
//     libraries: ["places"]
//     });

//     const mapOptions = {
//     center: {
//         lat: 0,
//         lng: 0
//     },
//     zoom: 4
//     };
// // Callback
// loader.loadCallback(e => {
//     if (e) {
//       console.log(e);
//     } else {
//       new google.maps.Map(document.getElementById("map"), mapOptions);
//     }
//   });



  // EXTRAER LOS VALORES DEL CONTEXT (ESTADO GLOBAL)
  const trabajoContext = useContext(TrabajoContext);
  const { trabajos, obtenerTrabajos, crearTrabajo } = trabajoContext;

  const authContext = useContext(AuthContext);
  const { verificarUsuario, cerrarSesion } = authContext;

  useEffect(() => {
    console.log("mostrarFormulario", mostrarFormulario);

    const generarEventos = async () => {
      await obtenerTrabajos();
      return;
    };

    generarEventos();
  }, []);

  const clickLogout = (e) => {
    e.preventDefault();
    cerrarSesion();
  };
  const clickCrear = (e) => {
    e.preventDefault();
    crearTrabajo();
  };
  

  const postNuevoFormulario = async () => {
    const data = {
      titulo: titulo,
      descripcion: descripcion,
      duracion: duracion,
      requisitos: requisitos,
      ubicacion: ubicacion
    };

    await clienteAxios.post("http://localhost:4000/api/trabajos", data);
  };

  console.log("----1----", mostrarFormulario);

  return (
    <div>
      {mostrarFormulario ? (
        <div className="contenedor-formulario">
          <h1>Crea un nuevo trabajo</h1>
          <span> Título del trabajo: </span>
          <input
            className="input-formulario-trabajo"
            onChange={(event) => {
              setTitulo(event.target.value);
            }}
          />
          <span> Descripción: </span>
          <input
            className="input-formulario-trabajo"
            onChange={(event) => {
              setDescripcion(event.target.value);
            }}
          />
          <span> Duración del trabajo: </span>
          <input
            className="input-formulario-trabajo"
            onChange={(event) => {
              setDuracion(event.target.value);
            }}
          />
          <span> Requisitos: </span>
          <input
            className="input-formulario-trabajo"
            onChange={(event) => {
              setRequsitos(event.target.value);
            }}
          />
          <span> Ubicación del trabajo: </span>
          <input
            className="input-formulario-trabajo"
            onChange={(event) => {
              setUbicacion(event.target.value);
            }}
          />
          <button
            className="btn btn-lg btn-primary" type="button"
            onClick={() => {
              postNuevoFormulario();
            }}
          >
            {" "}
            enviar{" "}
          </button>
        </div>
      ) : (
        <div className= "listado">
            <div className= "fragmentos">
            <>
            {" "}
            <h1>Listado de trabajos</h1>
            {trabajos.length === 0
                ? "No hay trabajos listados"
                : trabajos.map((e) => {
                    return (
                    <p key={e._id}>
                        {e.creado}
                        <br />
                        {e.titulo}
                        <br />
                        {e.descripcion}
                        <br />
                        {e.duracion}
                        <br />
                        {e.requisitos}
                        <br />
                        <a href={e.ubicacion}>ubicacion</a>
                    </p>
                    );
                })}{" "}
            </>
            </div>
            <div className="fragmentos">
            <>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12655.147669967391!2d-99.14132440749697!3d19.43840360682754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2smx!4v1623280825806!5m2!1ses!2smx"loading="lazy"></iframe>
            </>
            </div>
        </div>
      )}

      <button className="btn btn-lg btn-primary" type="button"
        onClick={(e) => {
          clickLogout(e);
        }}
      >
        Cerrar sesión
      </button>
      <button className="btn btn-lg btn-primary" type="button"
        onClick={async () => {
          console.log("-----");
          setMostrarFormulario(!mostrarFormulario);
          await obtenerTrabajos();
        }}
      >
        {mostrarFormulario ? "Ver listado" : "Crear trabajo"}
      </button>
    </div>
  );
}
