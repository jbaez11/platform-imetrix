import React,{useState} from 'react'
//import Swal from 'sweetalert2';
import $ from 'jquery';
import {rutaAPI} from '../../../config/Config';

export default function EditUser(){

    const currentUserId = localStorage.getItem("ID");

    //Hook para caputar los datos del formulario
    const [usuarios, editarUsuario] = useState({
        nombres:"",
        user:"",
        password:"",
        state:"",
        role:"",
        id:""
    });

    //Onchange
    const cambiaFormPost = e =>{

        editarUsuario({
            ...usuarios,
            [e.target.name] : e.target.value
        })
    }

    //OnSubmit
    const submitPost = async e => {
        let currentAdmin = localStorage.getItem("ADMIN");
        let role = localStorage.getItem("ROLE");

        $(".alert").remove();

        e.preventDefault();

        console.log(usuarios);

        //Ejecutamos el servicio put
        const result = await putData(usuarios);

        if(result.status === 400){
            $(".modal-footer").before(`<div class="alert alert-danger">${result.mensaje}</div>`)
        } 
        if(result.status === 200){
            if(role === "Administrador"){
            $(".modal-footer").before(
            `<div class="alert alert-success">${result.mensaje}</div>`
            );
            $('button[type="submit"]').remove();
            setTimeout(() => {
            window.location.href = `/usuarios/${currentUserId}`;
            }, 2000);
        }else if(role === "SuperAdministrador"){
            $(".modal-footer").before(
            `<div class="alert alert-success">${result.mensaje}</div>`
            );
            $('button[type="submit"]').remove();
            setTimeout(() => {
            window.location.href = `/usuarios/${currentAdmin}`;
            }, 2000);
      }
        }
    
    }

    //Capturamos los datos para editar el usuario
    $(document).on("click", ".editarInputs", async function(e){
        
        e.preventDefault();

        let data = $(this).attr("data").split(",");
        /* console.log("Data para Editar", data); */
        $("#editarNombre").val(data[1]);
        $("#editarUsuario").val(data[2]);
        $("#editarState").val(data[3]);
        $("#editarRole").val(data[6]);

        editarUsuario({
            'nombres':  $("#editarNombre").val(),
            'user':  $("#editarUsuario").val(),
            'password':  $("#editarPassword").val(),
            'state':  data[3],
            'role':  data[4],
            'id': data[0]
        })
    })

    //Capturamos los datos para borrar el usuario
    /*  $(document).on("click", ".borrarInput", function(e){
            e.preventDefault();
    
            let data = $(this).attr("data").split(",")[0];
            console.log(data);


            //Validamos si queremos eliminar el usuario
            Swal.fire({
                title: '¿Está seguro de eliminar este registro?',
                text: "Esta acción no se puede revertir",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Si, eliminar registro!'
            }).then((result) => {
                if (result.isConfirmed) {

                    //Ejecutamos el servicio delete
                    const borrarUsuario = async () =>{
                        const result = await deleteData(data);

                        if(result.status === 400){

                            Swal.fire({
                                type: "error",
                                title: result.mensaje,
                                showConfirmButton: true,
                                confirmButtonText: "Cerrar"
                                }).then(function(result){
                                    if(result.isConfirmed) {window.location.href=`/usuarios/${currentUserId}`}
                            })
                        } 
                        if(result.status === 200){

                            Swal.fire({
                                type: "success",
                                title: result.mensaje,
                                showConfirmButton: true,
                                confirmButtonText: "Cerrar"
                                }).then(function(result){
                                    if(result.isConfirmed) {window.location.href=`/usuarios/${currentUserId}`}
                            })
                        }
                    }
                    borrarUsuario();
                }
              })

        }) */
    
    return(

        <div className="modal" id="editarAdmin">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Editar Auditor</h4>
                    <button type="button" className="btn-close" data-dismiss="modal"></button>
                </div>
                <form onChange={cambiaFormPost} onSubmit={submitPost}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="small text-secondary" htmlFor="editarNombre">
                            *Mínimo 2 Caracteres, máximo 50, Sin números ni Caracteres Especiales
                            </label>
                            <div className="input-group mb-3">
                                <div className="input-group-append input-group-text">
                                    <i className="fas fa-user"></i>
                                </div>
                                <input
                                    id="editarNombre"
                                    type="text"
                                    className="form-control"
                                    name="nombres"
                                    placeholder="Ingrese los Nombres y Apellidos"
                                    minLength="2"
                                    maxLength="50"
                                    pattern="^[a-zA-ZÀ-ÿ?\s]+"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="small text-secondary" htmlFor="editarUsuario">
                                *Minimo 2 Caracteres, Maximo 20
                            </label>
                            <div className="input-group mb-3">
                                <div className="input-group-append input-group-text">
                                    <i className="fas fa-user"></i>
                                </div>
                                <input
                                    id="editarUsuario"
                                    type="email"
                                    className="form-control"
                                    name="correo"
                                    placeholder="Ingrese el Correo"
                                    minLength="2"
                                    maxLength="40"
                                    pattern="(?=.*[A-Za-z]).{2,40}"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="small text-secondary" htmlFor="editarPassword">
                                *Minimo 8 Caracteres, letras en mayúscula, minúscula y números
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
                                        <option selected={usuarios.state === "Habilitado"} value="1">Habilitado</option>
                                        <option selected={usuarios.state === "Inhabilitado"} value="0">Inhabilitado</option>
                                        
                                </select>
                            </div>
                        </div>        
                        <div className="form-group">
                            <label className="small text-secondary" htmlFor="editarRole">
                                | Auditor
                            </label>
                            <div className="input-group mb-3">
                                <div className="input-group-append input-group-text">
                                    <i className="fas fa-user"></i>
                                </div>
                                <select required name="role" id="editarRole">
                                        {/* <option value="" selected disabled hidden>Seleccionar rol</option>
                                        <option hidden value="Administrador">Administrador</option> */}
                                        <option selected={usuarios.role === "Auditor"} value="Auditor">Auditor</option>
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
        
    );
}

//METODO PUT
const putData = data =>{

    const url = `${rutaAPI}/editUser/${data.id}`
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

//Petición Get para Usuarios asociados al Administrador
/* const getUsers = (userID) =>{

    const url = `${rutaAPI}/getCluster/${userID}`;
    const token = localStorage.getItem("ACCESS_TOKEN");

    const params = {
        method: "GET",
        headers: {
            "Authorization": token,
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

} */

//METODO DELETE
/* const deleteData = data =>{
    const url = `${rutaAPI}/deleteUser/${data}`
    const token =  localStorage.getItem("ACCESS_TOKEN");
    const params = {

        method: "DELETE",
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
} */