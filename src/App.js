import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import jwtDecode from 'jwt-decode';
import './App.css';

/* Componente Incio */
import Start from './components/start/Start';
import Index from './components/content/index/Index';
/* Componentes Dinamicos */
import AdministradoresInicio from './components/content/clientes/AdministradoresInicio';
import Usuarios from './components/content/users/Usuarios';
import Campaings from './components/content/campaings/Campaings';
import CampaingsInicio from './components/content/campaings/CampaingsInicio';
import CamaingsAuditor from './components/content/campaings/CampaingsAuditor';
import Clusters from './components/content/clusters/Clusters';
import ClustersInicio from './components/content/clusters/ClustersInicio';
import ClustersKeywords from './components/content/keywords/clusters/Clusters';
import Modulos from './components/content/keywords/modulos/Modulos';
import Agents from './components/content/agents/Agents';
import Auditoria from './components/content/auditoria/Auditoria';
import Consumo from './components/content/consumo/Consumo';
import Keywords from './components/content/keywords/Keywords';
import Puntajes from './components/content/puntajes/Puntajes';
import Estadisticas from './components/content/estadisticas/Estadisticas'
import Conversacion from './components/content/conversacion/Conversacion';
import PageNotFound from './components/content/pageNotFound/PageNotFound';
import PerfilAdmin from './components/content/clientes/PerfilAdmin';
import GestorAdministradores from './components/content/clientes/GestorAdministradores';
import SuperAdministradores from './components/content/superAdministradores/SuperAdministradores';
import PerfilUser from './components/content/users/PerfilUser';
import TableroDirectivo from './components/content/directivo/Directivo'


export default function App() {
  
  const auth = getAccessToken();
 
  const role = validarRol();

  /* Si no hay un usuario logeado retornamos a la pagina de Login */
  if(!auth){
    return( 
      <Start/>
    );
  }
 

  /* console.log("path", location) */
  return (
    <div className="sidebar-mini">
      <div className="wrapper">
          <Router>
            <Switch>
               <Route exact path="/"><Index/></Route>
               <Route exact path="/adminsInicio"><AdministradoresInicio/></Route>
               <Route exact path="/tablerodirectivo"> <TableroDirectivo/> </Route>
               <Route exact path="/gestorClientes"><GestorAdministradores/></Route>
               <Route exact path="/gestorSAdmins"><SuperAdministradores/></Route>
               <Route exact path="/perfilAdmin/:id">{role ? <PerfilAdmin/> :<PerfilUser/>}</Route>
               <Route exact path="/perfilUser/:id"><PerfilUser/></Route>
               <Route exact path="/inicio/:id"><ClustersInicio/></Route>
               <Route exact path="/clusters/:id">{role ? <Clusters/> : <ClustersInicio/>} </Route>
               <Route exact path="/campa??as/:id/:clustername">{role ? <Campaings/> : <CamaingsAuditor/>} </Route>
               <Route exact path="/campa??asinicio/:id/:clustername"><CampaingsInicio/></Route>
               <Route exact path="/campa??asAuditor/:id/:clusterid/:clustername"><CamaingsAuditor/></Route>
               <Route exact path="/usuarios/:id">{role ? <Usuarios/> : <ClustersInicio/>} </Route>
               <Route exact path="/agents/:bd"> <Agents/></Route>
               <Route exact path="/keywords/:db"> <Keywords/> </Route>
               <Route exact path="/auditoria/:db"> <Auditoria/> </Route>
               <Route exact path="/clusterKeywords/:bd"> <ClustersKeywords/> </Route>   
               <Route exact path="/moduloKeywords/:bd"> <Modulos/> </Route>
               <Route exact path="/puntajes/:bd"> <Puntajes/> </Route>
               <Route exact path="/estadisticas/:bd"> <Estadisticas/> </Route>
               <Route exact path="/conversacion/:bd"> <Conversacion/> </Route>
               <Route exact path="/consumo/:bd"> <Consumo/> </Route>
               
               <Route component={PageNotFound} />
            </Switch>
          </Router>
      </div>
    </div>
  );
}

//Funcion para obtener el token de sesi??n
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

  }
    return true;
}

//Funcion para validar la fecha de expiraci??n del token
const tokenExpira = (accessToken, metaToken) =>{

  const seconds = 60;
  const{ exp } = metaToken;
  const now = (Date.now() + seconds)/1000;

  return exp < now;
}

const validarRol = ()=>{

    const role = localStorage.getItem("ROLE");

    if(role === 'Administrador' || role === 'SuperAdministrador'){

      return true;

    } else{

      return false;
      
    } 
}