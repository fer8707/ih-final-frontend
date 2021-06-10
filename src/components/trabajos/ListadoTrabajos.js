import React, { useContext, useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import moment from "moment";
import { loader } from "@googlemaps/js-api-loader";

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
      ubicacion: ubicacion,
    };

    await clienteAxios.post("http://localhost:4000/api/trabajos", data);
  };

  console.log("----1----", mostrarFormulario);

  return (
    <div>
      {mostrarFormulario ? (
        <div className="contenedor-formulario">
          <h1> Crea un nuevo trabajo </h1> <span> Título del trabajo: </span>
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
            className="btn btn-lg btn-primary"
            type="button"
            onClick={() => {
              postNuevoFormulario();
            }}
          >
            enviar
          </button>
        </div>
      ) : (
        <div className="listado-padre">
          <div className="listado-cards">
            <div className="grupo-boton">
              <button
                className="floating-button"
                type="button"
                onClick={async () => {
                  console.log("-----");
                  setMostrarFormulario(!mostrarFormulario);
                  await obtenerTrabajos();
                }}
              >
                {mostrarFormulario ? "Ver listado" : "Crear trabajo"}
              </button>
              <button
                className="floating-button"
                type="button"
                onClick={(e) => {
                  clickLogout(e);
                }}
              >
                Cerrar sesión
              </button>
            </div>
            {trabajos.length === 0
              ? "No hay trabajos listados"
              : trabajos.map((e) => {
                  return (
                    <div className="card-trabajo" key={e._id}>
                      <div className="card-header">
                        <span className="tag-duracion">{e.duracion}</span>
                        <div className="fecha-info-contenedor">
                          <span className="fecha-label-card">Fecha:</span>
                          <p className="parrafo-card">
                            {moment(e.creado).format("MMM Do YY")}
                          </p>
                        </div>
                      </div>
                      <p className="parrafo-card">
                        <span className="titilo-label-card">Nombre:</span>
                        {e.titulo}
                      </p>

                      <p className="parrafo-card">
                        <span className="titilo-label-card">Descripcion:</span>
                        {e.descripcion}
                      </p>
                      <p className="parrafo-card">
                        <span className="titilo-label-card">Requisitos:</span>
                        {e.requisitos}
                      </p>
                      <button className="button-ubicacion">
                        <a href={e.ubicacion}> Ver Ubicación </a>
                      </button>
                    </div>
                  );
                })}
          </div>
          <div className="mapa-contenedor">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12655.147669967391!2d-99.14132440749697!3d19.43840360682754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2smx!4v1623280825806!5m2!1ses!2smx"
              // width="100vw"
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
