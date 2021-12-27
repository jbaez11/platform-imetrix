import React from 'react'
import {rutaAPI} from '../../../config/Config';

import Footer from '../../footer/Footer';
import Header from '../../header/Header';
import SidebarCampaing from '../../sidebar/SidebarCampaing';



export default function CamaingsAuditor(){


    let userID = localStorage.getItem("ID");

    const valores = window.location.href;
    let nuevaURL = valores.split("/");
    console.log("Valores", valores)
    
    const [campaings , setCampaings] = React.useState([]);

    React.useEffect(() => {
        //console.log('useEffect');
        obtenerDatos();
    }, [])

    const obtenerDatos = async ()=>{
        const data = await fetch(`${rutaAPI}/getCampaingUser/${userID}/${nuevaURL[5]}`);
        const camp =  await data.json()
        camp.data.forEach(campaing => {
            console.log(campaing.nombre);
            campaing.nombre = campaing.nombre[0].toUpperCase()+(campaing.nombre.slice(1)).toLowerCase();
            console.log(campaing.nombre);
        });
        console.log("Campañas de Usuario",camp.data);
        setCampaings(camp.data)
    }
    

    return(
    <div className="sidebar-mini">
        <div className="wrapper">
            <Header/>
            <SidebarCampaing/>
            <div className="content-wrapper" style={{minHeight: "494px"}}>
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Campañas</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card card-warning">
                                    <div className="card-header" style={{backgroundColor:"orange"}}>
                                    </div>
                                    <div className="card-body">
                                        <div className="container">
                                            <div className="row">
                                                {campaings.map((campaing)=>(
                                                    <div class="col-sm">
                                                        <div style={{ width: '18rem' }} className="card text-center">
                                                            <div className="card-body"  >
                                                                <h5  className=" text-center">{campaing.nombre}</h5>
                                                                <img className="card-img-top" height="150" alt="img"  src={rutaAPI+"/getImgCampaing/"+campaing.foto} />
                                                                <br />
                                                                <a style={{marginTop:"8px"}} href={`/agents/${nuevaURL[6]}${campaing.nombre}${campaing.pais}`} className="btn btn-warning">Ingresar</a>
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
    );
}

