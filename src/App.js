import Login  from './components/auth/Login'
import NuevaCuenta from './components/auth/NuevaCuenta'
import Proyectos from './components/proyectos/ListadoProyectos'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import AuthState from "./context/autenticacion/AuthState"
import ProyectoState from './context/proyectos/ProyectoState'

import RutaPrivada from './components/rutas/RutaPrivada'

import './App.css';

function App() {
  return (
    <>

    <ProyectoState>
      <AuthState>
            <Router>
              <Switch>
                <Route 
                  path="/"
                  component={Login}
                  exact
                />
                <Route 
                  path="/nueva-cuenta"
                  component={NuevaCuenta}
                  exact
                />
                <RutaPrivada 
                  path="/proyectos"
                  component={Proyectos}
                  exact              
                />
              </Switch>
            </Router>  
      </AuthState>
    </ProyectoState>
    </>
  );
}

export default App;