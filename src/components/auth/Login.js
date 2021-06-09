import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import AuthContext from '../../context/autenticacion/AuthContext'

export default function Login(props) {

    // Extraer los valores del context
    // YO NECESITO UTILIZAR VALROES GLOBALES en este componente

    const authContext = useContext(AuthContext)
    const { autenticado, iniciarSesion } = authContext

    const [datosFormulario, setDatosFormulario] = useState({
        email: "",
        password: ""
    })


    const {email, password} = datosFormulario

    useEffect(() => {

        if(autenticado){    
            props.history.push('/trabajos')
        }
        return
    }, [ autenticado ])


    const monitoreoCambiosFormulario = (event) => {
        console.log(event.target.value)

        setDatosFormulario({
            ...datosFormulario,
            [event.target.name]: event.target.value
        })

    }

    const enviarDatos = (event) => {
        // CONECTARME CON EL ESTADO GLOBAL. 
        // ENVIAR LOS DATOS DEL FORMULARIO HACIA UNA FUNCIÓN QUE SE CONECTE CON EL BACKEND Y MONGODB PARA CONFIRMAR QUE ES EL USUARIO
        event.preventDefault()

        iniciarSesion({
            email,
            password
        })



    }



    return (
        <div>
            <h1>Iniciar sesión</h1>

            <form onSubmit={(e) => {enviarDatos(e)}}>
                <div className="campo-form">
                    <label>Email</label>
                    <input 
                        type="email"       
                        id="email"
                        name="email"
                        placeholder="Inserta tu email"
                        onChange={(e) => {monitoreoCambiosFormulario(e)}}
                        value={email}
                    />
                </div>
                <div className="campo-form">
                    <label>Password</label>
                    <input 
                        type="password"       
                        id="password"
                        name="password"
                        placeholder="Inserta tu password"
                        onChange={(e) => {monitoreoCambiosFormulario(e)}}
                        value={password}
                    />
                </div>

                <div className="campo-form">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Iniciar sesión"
                    />


                </div>



                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    ¿No tienes un usuario?. Crea una nueva cuenta aquí.                
                
                </Link>

            </form>
        </div>
    )
}