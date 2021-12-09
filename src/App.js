import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import jwtDecode from 'jwt-decode';
import './App.css';

/* Componente Incio */
import Start from './components/start/Start';
/* Componentes Dinamicos */
import Usuarios from './components/content/users/Usuarios';
import Campaings from './components/content/campaings/Campaings';
import CampaingsInicio from './components/content/campaings/CampaingsInicio';
import Clusters from './components/content/clusters/Clusters';
import ClustersInicio from './components/content/clusters/ClustersInicio';
import Agents from './components/content/agents/Agents';
import Consumo from './components/content/consumo/Consumo';
import Keywords from './components/content/keywords/Keywords';
import PageNotFound from './components/content/pageNotFound/PageNotFound';
import PerfilAdmin from './components/content/administradores/PerfilAdmin';
import PerfilUser from './components/content/users/PerfilUser';

export default function App() {

  const auth = getAccessToken();
 
  const role = validarRol();

  /* Si no hay un usuario logeado retornamos a la pagina de Login */
  if(!auth){
    return( 
      <Start/>
    );
  }
  return (
    <div className="sidebar-mini">
      <div className="wrapper">
          <Router>
            <Switch>
               <Route exact path="/perfilAdmin/:id">{role ? <PerfilAdmin/> :<PerfilUser/>}</Route>
               <Route exact path="/perfilUser/:id"><PerfilUser/></Route>
               <Route exact path="/inicio/:id"><ClustersInicio/></Route>
               <Route exact path="/clusters/:id">{role ? <Clusters/> : <ClustersInicio/>} </Route>
               <Route exact path="/campañas/:id">{role ? <Campaings/> : <CampaingsInicio/>} </Route>
               <Route exact path="/campañasinicio/:id"><CampaingsInicio/></Route>
               <Route exact path="/usuarios/:id">{role ? <Usuarios/> : <ClustersInicio/>} </Route>
               <Route exact path="/agents"> <Agents/></Route>
               <Route exact path="/keywords"> <Keywords/> </Route>
               <Route exact path="/consumo"> <Consumo/> </Route>
               <Route component={PageNotFound} />
            </Switch>
          </Router>
      </div>
    </div>
  );
}

//Funcion para obtener el token de sesión
const getAccessToken = ()=>{

  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  const userID = localStorage.getItem("ID");
  const correo = localStorage.getItem("CORREO");


  if(!accessToken || accessToken === null || !userID || userID === null || !correo || correo === null) {

     return false;

  }

  const metaToken = jwtDecode(accessToken);
  if(!metaToken.data){
    return false;
  }

  if(tokenExpira(accessToken, metaToken) || metaToken.data._id !== userID || metaToken.data.correo !== correo){

    return false;

  }else{

    return true;

  }
}

//Funcion para validar la fecha de expiración del token
const tokenExpira = (accessToken, metaToken) =>{

  const seconds = 60;
  const{ exp } = metaToken;
  const now = (Date.now() + seconds)/1000;

  return exp < now;
}

const validarRol = ()=>{

    const role = localStorage.getItem("ROLE");

    if(role === 'Administrador'){

      return true;

    } else{

      return false;
      
    } 
}

