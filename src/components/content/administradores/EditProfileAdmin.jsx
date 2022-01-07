import React,{useState,useEffect} from 'react'
import $ from 'jquery';
import {rutaAPI} from '../../../config/Config';

export default function EditProfileAdmin(){

    const currentUserId = localStorage.getItem("ID");

    //Hook para caputar los datos del formulario
    const [administrador, editarAdminProfile] = useState({
        nombres:"",
        correo:"",
        telefono:"",
        cedula:"",
        password:"",
        nombreEmpresa:"",
        pais:"",
        id:""
    });

    //Onchange
    const cambiaFormPost = e =>{

        editarAdminProfile({
            ...administrador,
            [e.target.name] : e.target.value
        })
    }

    //OnSubmit
    const submitPost = async e => {

        $(".alert").remove();

        e.preventDefault();

        /* console.log(administrador); */

        //Ejecutamos el servicio put
        const result = await putData(administrador);

        if(result.status === 400){
            $(".modal-footer").before(`<div class="alert alert-danger">${result.mensaje}</div>`)
        } 
        if(result.status === 200){
            $(".modal-footer").before(`<div class="alert alert-success">${result.mensaje}</div>`)
            $('button[type="submit"]').remove();
            setTimeout(()=>{window.location.href=`/perfilAdmin/${currentUserId}`},2000);
        }
    
    }

    //Capturamos los datos para editar el usuario
    $(document).on("click", ".editarInputs", function(e){
        e.preventDefault();

        let data = $(this).attr("data").split(",");
        /* console.log(data); */
        $("#editarNombres").val(data[1]);
        $("#editarCorreo").val(data[2]);
        $("#editarTelefono").val(data[3]);
        $("#editarCedula").val(data[4]);
        $("#editarNombreEmpresa").val(data[5]);
        $("#editarPais").val(data[6]);

        editarAdminProfile({
            'nombres':  $("#editarNombres").val(),
            'correo':  $("#editarCorreo").val(),
            'telefono':  $("#editarTelefono").val(),
            'cedula':  $("#editarCedula").val(),
            'password':  $("#editarPassword").val(),
            'nombreEmpresa':  $("#editarNombreEmpresa").val(),
            'pais': $("#editarPais").val(),
            'id': data[0]
        })
    })

    return(

         <div className="modal" id="editarProfileAdmin">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">EDITAR PERFIL</h4>
                    <button type="button" className="btn-close" data-dismiss="modal"></button>
                </div>
                <form onChange={cambiaFormPost} onSubmit={submitPost}>
                <div className="modal-body">
                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="editarNombres">
                                   | Nombres y Apellidos
                                </label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-signature"></i>
                                    </div>
                                    <input
                                        id="editarNombres"
                                        type="text"
                                        className="form-control"
                                        name="nombres"
                                        placeholder="Ingrese nombres y apellidos"
                                        minLength="2"
                                        maxLength="50"
                                        pattern="^[a-zA-ZÀ-ÿ?\s]+"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="editarCorreo">
                                   | Correo
                                </label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-signature"></i>
                                    </div>
                                    <input
                                        id="editarCorreo"
                                        type="email"
                                        className="form-control"
                                        name="correo"
                                        placeholder="Ingrese el correo"
                                        minLength="2"
                                        maxLength="50"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="editarTelefono">
                                   | Telefono Celular
                                </label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-signature"></i>
                                    </div>
                                    <input
                                        id="editarTelefono"
                                        type="text"
                                        className="form-control"
                                        name="telefono"
                                        placeholder="Ingrese el Numero Celular"
                                        minLength="8"
                                        maxLength="15"
                                        pattern="[0-9]{8,15}"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="editarCedula">
                                   | Numero de Documento o NIT
                                </label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-signature"></i>
                                    </div>
                                    <input
                                        id="editarCedula"
                                        type="text"
                                        className="form-control"
                                        name="cedula"
                                        placeholder="Ingrese numero de cedula o NIT"
                                        minLength="7"
                                        maxLength="15"
                                        pattern="[0-9]{7,15}"
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="editarPassword">
                                   | Contraseña:  *Minimo 8 Caracteres, letras en mayúscula, minúscula y números
                                </label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-key"></i>
                                    </div>
                                    <input
                                        id="editarPassword"
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Ingrese la contraseña"
                                        minLength="4"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="editarNombreEmpresa">
                                   | NOMBRE DE LA EMPRESA
                                </label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-signature"></i>
                                    </div>
                                    <input
                                        id="editarNombreEmpresa"
                                        type="text"
                                        className="form-control"
                                        name="nombreEmpresa"
                                        placeholder="Ingrese el nombre de la Empresa"
                                        minLength="3"
                                        maxLength="20"
                                        pattern="^[a-zA-Z]+( [a-zA-Z]+)*$"
                                        readOnly="readOnly"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="editarPais">
                                | *Solo con el siguiente formato -- | CO-US-MX
                                </label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-signature"></i>
                                    </div>
                                    <input
                                        id="editarPais"
                                        type="text"
                                        className="form-control text-uppercase"
                                        name="pais"
                                        placeholder="Ingrese el pais"
                                        minLength="2"
                                        maxLength="2"
                                        pattern="[A-Z]+[A-Z]"
                                        readOnly="readOnly"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    <div className="modal-footer d-flex justify-content-between">
                        <div><button type="submit" className="btn btn-success">Editar</button></div>
                        <div><button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button></div>
                    </div>
                </form>
                </div>
            </div>
        </div>

    );
}

//METODO PUT PARA EDITAR EL PERFIL DE ADMINISTRADOR
const putData = data =>{
    const url = `${rutaAPI}/editAdmin/${data.id}`
    const token =  localStorage.getItem("ACCESS_TOKEN");
    const params = {

        method: "PUT",
		body:JSON.stringify(data),
		headers: {
            "Authorization": token,
			"Content-Type": "application/json"
		}

    }
    return fetch(url, params).then(response=>{
        return response.json();
    }).then(result=>{
        return result;
    }).catch(err=>{
        return err;
    });
}

