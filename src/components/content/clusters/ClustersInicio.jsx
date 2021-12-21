import React from 'react'
import {rutaAPI} from '../../../config/Config';
import Footer from '../../footer/Footer';
import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';


export default function Clusters(){

    const valores = window.location.href;
    let nuevaURL = valores.split("/");

    let role = localStorage.getItem("ROLE");
    
    const [clusters , setClusters] = React.useState([]);

    React.useEffect(() => {
        //console.log('useEffect');
        obtenerDatos();
    }, [])

    const obtenerDatos = async ()=>{
        const data = await fetch(`${rutaAPI}/getCluster/${nuevaURL[4]}`);
        const clust =  await data.json()
        console.log("cluster",clust.data);
        clust.data.forEach(cluster => {
            cluster.nombre=cluster.nombre.toLowerCase()
        });
        setClusters(clust.data)
    }

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
                                                                     <a href={`/campañasinicio/${cluster._id}/${cluster.nombre}`} className="btn btn-warning">Ingresar</a>
                                                                    </>
                                                                )
                                                            }else if(role === "Auditor"){
                                                                return (
                                                                    <>
                                                                    <a href={`/campañasAuditor/${cluster._id}/${cluster.nombre}`} className="btn btn-warning">Ingresar</a>
                                                                   </>
                                                                )
                                                            }
                                                        })()}
                                                    </div>
                                                </div>  
                                            </div>
                                            ))}
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

