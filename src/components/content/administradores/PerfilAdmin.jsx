import React from 'react'
import 'datatables.net';
import 'datatables.net-bs5';
import 'datatables.net-responsive';
import Footer from '../../footer/Footer';
import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';
import EditProfileAdmin from './EditProfileAdmin';
import $ from 'jquery';
import {rutaAPI} from '../../../config/Config';

export default function PerfilAdmin(){

    const dataAdministrador = async() =>{

        const getAdministrador = await getData();

        const dataTable = [];

        getAdministrador.data.forEach((admin, index) =>{
            /* console.log("DataAdministrador",admin) */
            dataTable[index] = [(index + 1),
                                admin.nombres,
                                admin.correo,
                                admin.telefono,
                                admin.cedula,
                                admin.nombreEmpresa,
                                admin.pais,
                                admin.createdAt,
                                [admin._id, 
                                    admin.nombres,
                                    admin.correo,
                                    admin.telefono,
                                    admin.cedula,
                                    admin.nombreEmpresa,
                                    admin.pais,
                                    admin.createdAt]]
        })
        //Ejecutar el Data Table
        $(function(){
            $('.table').DataTable({
                data: dataTable,
                columns:[
                    {title: "#"},
                    {title: "Nombres"},
                    {title: "Correo"},
                    {title: "Telefono"},
                    {title: "Cedula"},
                    {title: "Empresa"},
                    {title: "Pais"},
                    {title: "Fecha de Creación"},
                    {title: "Editar Perfil",
                    render: function(data){
                        return `
                        
                        <a href="" class="editarInputs" data-toggle="modal" data-target="#editarProfileAdmin" data="${data}">

                        <svg style="color:black; background:orange; border-radius:100%; width:35px; line-height:35px; text-align:center; padding:7px"

                        aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil-alt" class="svg-inline--fa fa-pencil-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg>

                        `
                        }
                    }
                ],
                "bDestroy": true
            });
           //console.log("Data",dataTable);
        })
    }

    dataAdministrador();
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
                                    <h1 className="m-0 text-dark">PERFIL</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card card-primary">
                                        <div style={{backgroundColor:"orange"}} className="card-header">
                                        </div>
                                        <div className="card-body">
                                            <table className="table table-striped dt-responsive" style={{"width":"100%"}}>
                                            </table>
                                        </div>
                                    </div>
                                </div>    
                            </div>
                        </div>
                    </div>
            </div>
           <Footer/>
        </div>
        <EditProfileAdmin/>
        </div>
        
    );
}

//Petición Get para Usuarios asociados al Administrador
const getData = () =>{

    const valores = window.location.href;
    let nuevaURL = valores.split("/");

    const url = `${rutaAPI}/getAdmin/${nuevaURL[4]}`;
    const token = localStorage.getItem("ACCESS_TOKEN");

    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    } 
    return fetch(url, params).then(response =>{
        return response.json();
    }).then(result => {
        return result;
    }).catch(err=>{
        return err;
    })

}