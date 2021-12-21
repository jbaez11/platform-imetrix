import React, {useState} from 'react'
import Footer from '../../footer/Footer';
import Header from '../../header/Header';
import SidebarAdminCampaing from '../../sidebar/SidebarAdminCampaing';
import {rutaAPITableros} from '../../../config/Config';


export default function Puntajes(){

    React.useEffect(() => {
        obtenerDatos();
    }, [])

    const [cabeceraMostrar, setCabeceraMostrar] = useState([]); 
    const [valoresMostrar, setValoresMostrar] = useState([]); 

    function obtenerCabecera(data){

        /* console.log("Data Inicial", data[0])
        console.log("Atributos", Object.keys(data[0]))
        console.log("Valores", Object.values(data[0])) */

        let cabeceras = Object.keys(data[0])
        let valores = Object.values(data[0])
        let trueCabeceras = [];
        let trueValores = []
        for(let i = 0 ;i < cabeceras.length; i++ ){

            if(!(cabeceras[i] === "_id" || cabeceras[i] === "__v" || cabeceras[i] === "createdAt")){
                trueCabeceras.push(cabeceras[i])
                trueValores.push(valores[i])
            }

        }

        setCabeceraMostrar(trueCabeceras)
        setValoresMostrar(trueValores)
        //console.log("CabecerasFinales",trueCabeceras)

    }

    const obtenerDatos = async ()=>{
        const data = await fetch(`${rutaAPITableros}/igsSufiCO/getPruebas`);
        const prueba =  await data.json()
        /* console.log("Pruebas",prueba.data); */
        obtenerCabecera(prueba.data);
    }

    return(
        <div className="sidebar-mini">
        <div className="wrapper">
            <Header/>
            <SidebarAdminCampaing/>
            <div className="content-wrapper" style={{minHeight: "494px"}}>
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Puntajes</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                <div className="container-fluid">
                        <div className="row">
                        <div className="col-lg-12">
                        <table className="table table-dark table-hover"> 
                            <thead>
                                <tr>
                                    {cabeceraMostrar.map((cabecera, index)=>(
                                        <>
                                        <td>{cabecera} </td>
                                        </>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {valoresMostrar.map((valor, index)=>(
                                        <>
                                        <td>{valor} </td>
                                        </>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
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




