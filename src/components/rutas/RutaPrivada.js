/**
 * RUTA PRIVADA 
 * MIDDLEWARE PARA VERIFICAR SI EL USUARIO ESTÁ AUTENTICADO O NO, 
 * DENTRO DE LAS RUTAS.
 */

 import React, {useContext, useEffect} from 'react'

 import { Route, Redirect } from 'react-router-dom'
 
 import AuthContext from '../../context/autenticacion/AuthContext'
 
 const RutaPrivada = ({component: Component, ...props }) => {
 
     const authContext = useContext(AuthContext)
     const { autenticado, verificarUsuario } = authContext
 
 
     useEffect(() => {
         verificarUsuario()
     }, [])
 
     return (
         <Route
             {...props}
             render={(props) => {    
                 return !autenticado ?
                     (
                         <Redirect to="/" /> // SI EL USUARIO NO TIENE AUTENTICACIÓN, RETORNA AL INICIAR SESIÓN
                     ) :
                     (
                         <Component {...props} />
                     )
             }}
         >
 
 
         </Route>
 
 
     )
 
 
 }
 
 
 
 export default RutaPrivada