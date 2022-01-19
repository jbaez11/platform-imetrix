import React, {useState} from 'react'
import {rutaAPI} from '../../../config/Config';
import $ from 'jquery';

export default function AddSuperAdmin() {

    /* Hook para caputar los datos del formulario */
    const [sAdministradores, crearAdmin] = useState({
        nombres:"",
        correo:"",
        password:""
    });

    //Onchange
    const cambiaFormPost = e =>{
        crearAdmin({
            ...sAdministradores,
            [e.target.name] : e.target.value
        })
    }

     //OnSubmit
    const submitPost = async e => {

        $(".alert").remove();

        e.preventDefault();

        //Ejecutamos el servicio post
        const resul = await postData(sAdministradores);

        if(resul.status === 400){
            $(".modal-footer").before(`<div class="alert alert-danger">${resul.mensaje}</div>`)
        } 
        if(resul.status === 200){
             $(".modal-footer").before(`<div class="alert alert-success">${resul.mensaje}</div>`)
            $('button[type="submit"]').remove();
            setTimeout(()=>{window.location.href=`/gestorSAdmins`},2000);
        }
    }

    return (
        <div className="modal" id="addSuperAdmin">
        <div className="modal-dialog">
            <div className="modal-content">
            <div style={{backgroundColor:"orange"}} className="modal-header">
                <h5 style={{marginLeft:"165px"}} className="modal-title">CREAR CLIENTE</h5>
                <button type="button" className="btn-close" data-dismiss="modal"></button>
            </div>
            <form onChange={cambiaFormPost} onSubmit={submitPost}>
                <div className="modal-body">
                    <div className="form-group">
                        <label className="small text-secondary" htmlFor="nombres">
                           | *Mínimo 6 Caracteres, máximo 50, Sin números
                        </label>
                        <div className="input-group mb-3">
                            <div className="input-group-append input-group-text">
                                <i className="fas fa-signature"></i>
                            </div>
                            <input
                                id="nombres"
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
                        <label className="small text-secondary" htmlFor="correo">
                           | Correo
                        </label>
                        <div className="input-group mb-3">
                            <div className="input-group-append input-group-text">
                                <i className="fas fa-signature"></i>
                            </div>
                            <input
                                id="correo"
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
                        <label className="small text-secondary" htmlFor="password">
                            *Minimo 8 Caracteres, letras en mayúscula, minúscula y números
                        </label>
                        <div className="input-group mb-3">
                            <div className="input-group-append input-group-text">
                                <i className="fas fa-key"></i>
                            </div>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Ingrese la contraseña"
                                minLength="4"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                    <div><button type="submit" className="btn btn-primary">Crear</button></div>
                    <div><button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button></div>
                </div>
            </form>
            </div>
        </div>
    </div>
    )
}

/* PETICIÓN POST PARA CREAR UN SUPER ADMIN  */
const postData = data =>{
    const role = "SuperAdministrador"
    const state = "1"
    
    data.role = role
    data.state = state
    
    const url = `${rutaAPI}/addSuperAdmin`;
    const params = {
    
        method: "POST",
        body:JSON.stringify(data),
        headers: {
    
            "Content-Type": "application/json"
    
        }
    
    }
    console.log("Data Nuevo Super Administrador", data)
    return fetch(url, params).then(response=>{
        return response.json();
    }).then(result=>{
        return result;
    }).catch(err=>{
        return err;
    });
    }
