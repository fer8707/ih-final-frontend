import React, { useReducer } from 'react'
import TrabajoContext from './TrabajoContext'
import TrabajoReducer from './TrabajoReducer'
import clienteAxios from '../../config/axios'
const TrabajoState = props => {
    // A. ESTADO INICIAL
    const initialState = {
        trabajos: [],
        crear:false
    }
    // B. CONFIGURACIÓN DEL REDUCER
    const [state, dispatch] = useReducer(TrabajoReducer, initialState)
    // C. FUNCIONES PROPIAS
        //listar trabajos del creador
            const obtenerTrabajos = async () => {
                try {
                    const resultado = await clienteAxios.get('/api/trabajos')
                    console.log("El resultado es:", resultado)
                    dispatch({
                        type: "OBTENER_TRABAJOS",
                        payload: resultado.data.listaTrabajos
                    })
                } catch(e){
                    console.log(e)
                    return
                }
            }
        // Agregar trabajos
            const crearTrabajo = async () => {
                
                try {
                    const resultado = await clienteAxios.get('/api/trabajos')
                    console.log("El resultado es:", resultado)
                    dispatch({
                        type: "CREAR_TRABAJO",
                        payload: resultado.data.listaTrabajos
                    })
                } catch(e){
                    console.log(e)
                    return
                }
            }
    // D. RETORNO
    return (
        <TrabajoContext.Provider
            value={{
                trabajos: state.trabajos,
                obtenerTrabajos,
                crearTrabajo
            }}
        >
            {props.children}
        </TrabajoContext.Provider>
    )
}
export default TrabajoState