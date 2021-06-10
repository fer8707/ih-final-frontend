import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../context/autenticacion/AuthContext";

export default function NuevaCuenta(props) {
  // 1. FUNCIONES
  // A. ACCESO AL CONTEXTO
  const ctxAuth = useContext(AuthContext);
  const { autenticado, registrarUsuario } = ctxAuth;

  // B. GESTIÓN DE ESTADO LOCAL (FORMULARIOS)
  const [datosUsuarioFormulario, setDatosUsuarioFormulario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  const { nombre, email, password, confirmar } = datosUsuarioFormulario;

  // C. USEEFFECT - MONITOREO DE CAMBIOS
  useEffect(() => {
    if (autenticado) {
      props.history.push("/trabajos");
    }

    return;
  }, [autenticado]);

  const monitoreoCambios = (event) => {
    setDatosUsuarioFormulario({
      ...datosUsuarioFormulario,
      [event.target.name]: event.target.value,
    });
  };

  const enviarDatos = (event) => {
    event.preventDefault();

    // VALIDACIÓN DE PASSWORDS
    if (password !== confirmar) {
      return console.log("Los passwords no son iguales");
    }

    registrarUsuario({
      nombre,
      email,
      password,
    });
  };

  // 2. RETORNO
  return (
    <div className="layout">
      <div className="img-container-login">
        <img className="img-login" src="login.svg" />
      </div>

      <div className="login-form">
        <form
          className="login-container-form"
          onSubmit={(e) => {
            enviarDatos(e);
          }}
        >
          <div className="campo-login">
            <label className="label-login">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Escribe tu nombre"
              onChange={(e) => monitoreoCambios(e)}
              value={nombre}
            />
          </div>
          <div className="campo-login">
            <label className="label-login">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Escribe tu email"
              onChange={(e) => monitoreoCambios(e)}
              value={email}
            />
          </div>
          <div className="campo-login">
            <label className="label-login">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Escribe tu password"
              onChange={(e) => monitoreoCambios(e)}
              value={password}
            />
          </div>
          <div className="campo-login">
            <label className="label-login">Confirmar password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Escribe nuevamente tu password"
              onChange={(e) => monitoreoCambios(e)}
              value={confirmar}
            />
          </div>

          <div className="campo-login">
            <button type="submit" className="button-login-form">
              Registrarte
            </button>
          </div>
          <Link to="/" className="sign-up-label">
            ¿Ya tienes un usuario? Inicia sesión
          </Link>
        </form>
      </div>
    </div>
  );
}
