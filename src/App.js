import Login  from './components/auth/Login'
import NuevaCuenta from './components/auth/NuevaCuenta'
import Trabajos from './components/trabajos/ListadoTrabajos'
import NuevoTrabajo from './components/trabajos/NuevoTrabajo'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import AuthState from "./context/autenticacion/AuthState"
import TrabajoState from './context/trabajos/TrabajoState'

import RutaPrivada from './components/rutas/RutaPrivada'

import './App.css';

function App() {
  return (
    <>
    
    <TrabajoState>
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
                  path="/trabajos"
                  component={Trabajos}
                  exact              
                />
                 <Route 
                  path="/nuevo/trabajo"
                  component={NuevoTrabajo}
                  exact              
                />
              </Switch>
            </Router>  
      </AuthState>
    </TrabajoState>
  
    </>
  );
}

export default App;