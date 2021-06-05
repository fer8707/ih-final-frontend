import React, { useReducer } from 'react'
import ProyectoContext from './ProyectoContext'
import ProyectoReducer from './ProyectoReducer'
import clienteAxios from '../../config/axios'
const ProyectoState = props => {
    // A. ESTADO INICIAL
    const initialState = {
        proyectos: []
    }
    // B. CONFIGURACIÓN DEL REDUCER
    const [state, dispatch] = useReducer(ProyectoReducer, initialState)
    // C. FUNCIONES PROPIAS
    const obtenerProyectos = async () => {
        try {
            const resultado = await clienteAxios.get('/api/proyectos')
            console.log("El resultado es:", resultado)
            dispatch({
                type: "OBTENER_PROYECTOS",
                payload: resultado.data.listaProyectos
            })
        } catch(e){
            console.log(e)
            return
        }
    }
    // D. RETORNO
    return (
        <ProyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                obtenerProyectos
            }}
        >
            {props.children}
        </ProyectoContext.Provider>
    )
}
export default ProyectoState