import React,{useState} from 'react'
//import Swal from 'sweetalert2';
import $ from 'jquery';
import {rutaAPI} from '../../../config/Config';

export default function EditSuperAdmin() {

    /* Hook para caputar los datos del formulario */
    const [sAdministradores, editarSuperAdmin] = useState({
        nombres:"",
        correo:"",
        role:"",
        password:"",
        state:""
    });

    /* Onchange */
    const cambiaFormPost = e =>{
        editarSuperAdmin({
            ...sAdministradores,
            [e.target.name] : e.target.value
        })
    }

    /* OnSubmit */
    const submitPost = async e => {

        $(".alert").remove();

        e.preventDefault();

        //Ejecutamos el servicio post
        const resul = await putData(sAdministradores);

        if(resul.status === 400){
            $(".modal-footer").before(`<div class="alert alert-danger">${resul.mensaje}</div>`)
        } 
        if(resul.status === 200){
             $(".modal-footer").before(`<div class="alert alert-success">${resul.mensaje}</div>`)
            $('button[type="submit"]').remove();
            setTimeout(()=>{window.location.href=`/gestorSAdmins`},2000);
        }
    }

    /* Capturamos los datos para editar el usuario */
    $(document).on("click", ".editarInputs", function(e){
        e.preventDefault();
    
        let data = $(this).attr("data").split(",");
        console.log("Data e ditar de Super Administrador",data);
        $("#editarNombres").val(data[1]);
        $("#editarCorreo").val(data[2]);
        /* $("#editarRole").val(data[3]); */
        $("#editarPassword").val(data[3]);
        $("#editarState").val(data[4]);
    
        editarSuperAdmin({
            'nombres':  $("#editarNombres").val(),
            'correo':  $("#editarCorreo").val(),
            /* 'role':  $("#editarRole").val(), */
            'password':  $("#editarPassword").val(),
            'state':  data[4],
            'id': data[0]
        })
    })

    return (
        <div className="modal" id="editarSuperAdmin">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h4 className="modal-title">EDITAR CLIENTE</h4>
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
                        {/* <div className="form-group">
                            <label className="small text-secondary" htmlFor="editarRole">
                               | Rol
                            </label>
                            <div className="input-group mb-3">
                                <div className="input-group-append input-group-text">
                                    <i className="fas fa-signature"></i>
                                </div>
                                <input
                                    id="editarRole"
                                    type="email"
                                    className="form-control"
                                    name="role"
                                    placeholder="Ingrese el role"
                                    minLength="2"
                                    maxLength="50"
                                    required
                                />
                            </div>
                        </div> */}
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
                            <label className="small text-secondary" htmlFor="editarState">
                             Habilitado | Inhabilitado
                            </label>
                            <div className="input-group mb-3">
                                <div className="input-group-append input-group-text">
                                    <i className="fas fa-key"></i>
                                </div>
                               
                                <select required name="state" id="editarState">
                                        <option selected={sAdministradores.state === "Habilitado"} value="1">Habilitado</option>
                                        <option selected={sAdministradores.state === "Inhabilitado"} value="0">Inhabilitado</option>
                                        
                                </select>
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
    )
}

//METODO PUT
const putData = data =>{

    const url = `${rutaAPI}/editSuperAdmin/${data.id}`
    const token =  localStorage.getItem("ACCESS_TOKEN");

    if(data.state === "Habilitado") data.state = 1
    else if(data.state === "Inhabilitado") data.state = 0
    
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

