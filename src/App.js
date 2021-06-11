import Login  from './components/auth/Login'
import NuevaCuenta from './components/auth/NuevaCuenta'
import Trabajos from './components/trabajos/ListadoTrabajos'

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
    <div>
      <>
      <h1>Chalan-net</h1>
      </>
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
              </Switch>
            </Router>  
      </AuthState>
    </TrabajoState>
  
    </>
    </div>
  );
}

export default App;