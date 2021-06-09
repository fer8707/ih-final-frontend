import React, { useContext, useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import axios from "axios";

import TrabajoContext from "./../../context/trabajos/TrabajoContext";
import AuthContext from "./../../context/autenticacion/AuthContext";

export default function ListadoTrabajos() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

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
      duracion: "7 horas",
      requisitos: "traer computadora",
      ubicacion: "https://www.google.com.mx/maps/@19.3732754,-99.1599543,15z",
    };

    await clienteAxios.post("http://localhost:4000/api/trabajos", data);
  };

  console.log("----1----", mostrarFormulario);

  return (
    <div>
      {mostrarFormulario ? (
        <div className="contenedor-formulario">
          <h1>soy el formulario</h1>
          <span> Nombre del trabajo: </span>
          <input
            className="input-formulario-trabajo"
            onChange={(event) => {
              setTitulo(event.target.value);
            }}
          />
          <span> Descripcion: </span>
          <input
            className="input-formulario-trabajo"
            onChange={(event) => {
              setDescripcion(event.target.value);
            }}
          />
          <button
            className="input-formulario-trabajo"
            onClick={() => {
              postNuevoFormulario();
            }}
          >
            {" "}
            enviar{" "}
          </button>
        </div>
      ) : (
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
      )}

      <button
        onClick={(e) => {
          clickLogout(e);
        }}
      >
        Cerrar sesión
      </button>
      <button
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
