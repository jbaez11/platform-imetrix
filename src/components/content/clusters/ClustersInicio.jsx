import React from 'react'
import {rutaAPI} from '../../../config/Config';
import Footer from '../../footer/Footer';
import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';


export default function Clusters(){

    const valores = window.location.href;
    let nuevaURL = valores.split("/");

    let role = localStorage.getItem("ROLE");

    /* Bloque para solicitar los clusters del Administrador */
    const [clusters , setClusters] = React.useState([]);

    React.useEffect(() => {
        //console.log('useEffect');
        obtenerDatos();
    }, [])

    /* Obtiene los clusters del Administrador */
    const obtenerDatos = async ()=>{
        const data = await fetch(`${rutaAPI}/getAdminClusters/${nuevaURL[4]}`);
        const clust =  await data.json()
        //console.log("cluster",clust.data);
        clust.data.forEach(cluster => {
            cluster.nombre=cluster.nombre.toLowerCase()
        });
        setClusters(clust.data)
    }
    /* Bloque para solicitar los clusters del Administrador */
    
    /* ---------------------------------------------------------------------------- */

    /* Bloque solicitar los clusters del Usuario */
    const [clustersUser , setUserClusters] = React.useState([]);

    React.useEffect(() => {
        //console.log('useEffect');
        obtenerUserClusters();
    }, [])

    /* Obtiene los clusters del Usuario */
    const obtenerUserClusters = async ()=>{
        const data = await fetch(`${rutaAPI}/getCluster/${nuevaURL[4]}`);
        const clust =  await data.json()
        console.log("User Clusters",clust.data);
        clust.data.forEach(cluster => {
            cluster.nombre=cluster.nombre.toLowerCase()
        });
        setUserClusters(clust.data)
    }
    /* Bloque solicitar los clusters del Usuario */

return(
<div className="sidebar-mini">
    <div className="wrapper">
    <Header/>
    <Sidebar/>
        <div className="content-wrapper" style={{minHeight: "494px"}}>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark">Inicio</h1>
                        </div>
                    </div>
                </div>
            </div>
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card card-warning">
                            <div className="card-header" style={{backgroundColor:"orange"}}></div>
                                <div className="card-body">
                                    <div className="container">
                                        <div className="row">
                                        {(() =>{
                                            if(role === "Administrador"){
                                                return(
                                                    <>
                                                     {clusters.map((cluster)=>(
                                                    <div class="col-sm">
                                                        <div style={{ width: '18rem' }} className="card text-center">
                                                            <div className="card-body"  >
                                                                <h5 className=" text-center " style={{"text-transform": "uppercase"}}>{cluster.nombre}</h5>
                                                                <img class="card-img-top" width="150" height="150" alt="img"  src={rutaAPI+"/getImgCluster/"+cluster.foto} />
                                                                <br />
                                                               
                                                                {(() =>{
                                                                    if(role === "Administrador"){
                                                                        return (
                                                                            <>
                                                                             <a style={{marginTop:"10px"}} href={`/campañasinicio/${cluster._id}/${cluster.nombre}`} className="btn btn-warning">Ingresar</a>
                                                                            </>
                                                                        )
                                                                    }/* else if(role === "Auditor"){
                                                                        return (
                                                                            <>
                                                                            <a href={`/campañasAuditor/${cluster._id}/${cluster.nombre}`} className="btn btn-warning">Ingresar</a>
                                                                           </>
                                                                        )
                                                                    } */
                                                                })()}
                                                            </div>
                                                        </div>  
                                                    </div>
                                                    ))}
                                                    </>
                                                )
                                               
                                            }else if(role === "Auditor"){
                                                return(
                                                    <>
                                                    {clustersUser.map((cluster)=>(
                                                    <div class="col-sm">
                                                        <div style={{ width: '18rem' }} className="card text-center">
                                                            <div className="card-body"  >
                                                                <h5 className=" text-center " style={{"text-transform": "uppercase"}}>{cluster.nombre}</h5>
                                                                <img class="card-img-top" width="150" height="150" alt="img"  src={rutaAPI+"/getImgCluster/"+cluster.foto} />
                                                                <br />
                                                               
                                                                {(() =>{
                                                                    /* if(role === "Administrador"){
                                                                        return (
                                                                            <>
                                                                             <a href={`/campañasinicio/${cluster._id}/${cluster.nombre}`} className="btn btn-warning">Ingresar</a>
                                                                            </>
                                                                        )
                                                                    }else  */if(role === "Auditor"){
                                                                        return (
                                                                            <>
                                                                            <a style={{marginTop:"10px"}} href={`/campañasAuditor/${nuevaURL[4]}/${cluster._id}/${cluster.nombre}`} className="btn btn-warning">Ingresar</a>
                                                                           </>
                                                                        )
                                                                    }
                                                                })()}
                                                            </div>
                                                        </div>  
                                                    </div>
                                                    ))}
                                                    </>
                                                ) 
                                            }
                                        })()}
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>  
                </div>
            </div>
        </div>
        </div>
        <Footer/>
    </div>
</div>
);}

