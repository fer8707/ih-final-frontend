import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import AuthContext from '../../context/autenticacion/AuthContext'

export default function NuevaCuenta(props) {

    // 1. FUNCIONES
    // A. ACCESO AL CONTEXTO
    const ctxAuth = useContext(AuthContext)
    const { mensaje, autenticado, usuario, registrarUsuario } = ctxAuth


    // B. GESTIÓN DE ESTADO LOCAL (FORMULARIOS)
    const [datosUsuarioFormulario, setDatosUsuarioFormulario] = useState({
        nombre: "",
        email: "",
        password: "",
        confirmar: ""
    })

    const { nombre, email, password, confirmar } = datosUsuarioFormulario



    // C. USEEFFECT - MONITOREO DE CAMBIOS
    useEffect(() => {
        if(autenticado){
           props.history.push('/trabajos') 
        }

        return

    }, [ autenticado ])

    const monitoreoCambios = (event) => {

        setDatosUsuarioFormulario({
            ...datosUsuarioFormulario,
            [event.target.name]: event.target.value
        })
    }

    const enviarDatos = (event) => {
        event.preventDefault()
        
        // VALIDACIÓN DE PASSWORDS
        if(password !== confirmar){
            return console.log("Los passwords no son iguales")
        }

        registrarUsuario({
            nombre,
            email, 
            password
        })
    }


    // 2. RETORNO
    return (
        <div>
            <h1>Crear cuenta</h1>
            <form onSubmit={(e) => {enviarDatos(e)}}>
                <div className="campo-form">
                    <label>Nombre</label>
                    <input 
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Escribe tu nombre"
                        onChange={(e) => monitoreoCambios(e)}
                        value={nombre}
                    />
                </div>
                <div className="campo-form">
                    <label>Email</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Escribe tu email"
                        onChange={(e) => monitoreoCambios(e)}
                        value={email}
                    />
                </div>
                <div className="campo-form">
                    <label>Password</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Escribe tu password"
                        onChange={(e) => monitoreoCambios(e)}
                        value={password}
                    />
                </div>
                <div className="campo-form">
                    <label>Confirmar password</label>
                    <input 
                        type="password"
                        id="confirmar"
                        name="confirmar"
                        placeholder="Escribe nuevamente tu password"
                        onChange={(e) => monitoreoCambios(e)}
                        value={confirmar}
                    />
                </div>

                <div className="campo-form">
                    <input
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Registrarme"
                    />
                </div>

            </form>

                <Link to="/" className="enlace-cuenta">
                    ¿Ya tienes un usuario? Inicia sesión
                </Link>

                { usuario ? <p>Hola {`${usuario.nombre}`}</p> : null }

                { ctxAuth.autenticado ? "Estás autenticado" : "No estás autenticado" }
        </div>
    )
}