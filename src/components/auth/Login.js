import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../context/autenticacion/AuthContext";

export default function Login(props) {
  // Extraer los valores del context
  // YO NECESITO UTILIZAR VALROES GLOBALES en este componente

  const authContext = useContext(AuthContext);
  const { autenticado, iniciarSesion } = authContext;

  const [datosFormulario, setDatosFormulario] = useState({
    email: "",
    password: "",
  });

  const { email, password } = datosFormulario;

  useEffect(() => {
    if (autenticado) {
      props.history.push("/trabajos");
    }
    return;
  }, [autenticado]);

  const monitoreoCambiosFormulario = (event) => {
    console.log(event.target.value);

    setDatosFormulario({
      ...datosFormulario,
      [event.target.name]: event.target.value,
    });
  };

  const enviarDatos = (event) => {
    // CONECTARME CON EL ESTADO GLOBAL.
    // ENVIAR LOS DATOS DEL FORMULARIO HACIA UNA FUNCIÓN QUE SE CONECTE CON EL BACKEND Y MONGODB PARA CONFIRMAR QUE ES EL USUARIO
    event.preventDefault();

    iniciarSesion({
      email,
      password,
    });
  };

  return (
    <div className="layout">
        <div className="img-container-login">
            
            <img className="img-login" src="login.svg" alt="chalannet"/>
        </div>
      <div className="login-form" >
        <form 
          className="login-container-form"
          onSubmit={(e) => {
            enviarDatos(e);
          }}
        >
          <div className="campo-login">
            <label className="label-login" >Correo</label>
            <input
            className="input-login"
              type="email"
              id="email"
              name="email"
              placeholder="Inserta tu email"
              onChange={(e) => {
                monitoreoCambiosFormulario(e);
              }}
              value={email}
            />
          </div>
          <div className="campo-login">
            <label className="label-login" >Contraseña</label>
            <input
            className="input-login"
              type="password"
              id="password"
              name="password"
              placeholder="Inserta tu password"
              onChange={(e) => {
                monitoreoCambiosFormulario(e);
              }}
              value={password}
            />
          </div>

          <div className="campo-login">
            <button
              type="submit"
              className="button-login-form"
            >
                Iniciar sesión
            </button>
          </div>

          <Link to={"/nueva-cuenta"} className="sign-up-label">
            ¿No tienes un usuario?. Crea una nueva cuenta aquí.
          </Link>
        </form>
      </div>
    </div>
  );
}
