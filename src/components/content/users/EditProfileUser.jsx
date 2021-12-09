import React,{useState,useEffect} from 'react'
import $ from 'jquery';
import {rutaAPI} from '../../../config/Config';

export default function EditProfileUser(){

    const currentUserId = localStorage.getItem("ID");

    //Hook para caputar los datos del formulario
    const [usuario, editarUserProfile] = useState({
        nombres:"",
        correo:"",
        password:"",
        id:""
    });

    //Onchange
    const cambiaFormPost = e =>{

        editarUserProfile({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    
    //OnSubmit
    const submitPost = async e => {

        $(".alert").remove();

        e.preventDefault();

        console.log(usuario);

        //Ejecutamos el servicio put
        const result = await putData(usuario);

        if(result.status === 400){
            $(".modal-footer").before(`<div class="alert alert-danger">${result.mensaje}</div>`)
        } 
        if(result.status === 200){
            $(".modal-footer").before(`<div class="alert alert-success">${result.mensaje}</div>`)
            $('button[type="submit"]').remove();
            setTimeout(()=>{window.location.href=`/perfilUser/${currentUserId}`},2000);
        }
    
    }

    //Capturamos los datos para editar el usuario
    $(document).on("click", ".editarInputs", function(e){
        e.preventDefault();

        let data = $(this).attr("data").split(",");
        console.log(data);
        $("#editarNombres").val(data[1]);
        $("#editarCorreo").val(data[2]);

        editarUserProfile({
            'nombres':  $("#editarNombres").val(),
            'correo':  $("#editarCorreo").val(),
            'password':  $("#editarPassword").val(),
            'id': data[0]
        })
    })

    return(
         <div className="modal" id="editarProfileUser">
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
                                   | *Mínimo 6 Caracteres, máximo 50, Sin números
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
                                        pattern="(?=.*[A-Za-z]).{2,50}"
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
                                        type="text"
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
    const url = `${rutaAPI}/editUser/${data.id}`
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

