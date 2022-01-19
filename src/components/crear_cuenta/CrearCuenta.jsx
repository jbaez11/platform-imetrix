import React, {useState} from 'react'
import {rutaAPI} from '../../config/Config';
import $ from 'jquery';

export default function CrearCuenta(){

        //Hook para caputar los datos del formulario
        const [administradores, crearAdmin] = useState({
            nombres:"",
            correo:"",
            telefono:"",
            cedula:"",
            password:"",
            nombreEmpresa:"",
            pais:""
        });

        //Onchange
        const cambiaFormPost = e =>{
            crearAdmin({
                ...administradores,
                [e.target.name] : e.target.value
            })
        }

         //OnSubmit
        const submitPost = async e => {

            $(".alert").remove();

            e.preventDefault();

            //Ejecutamos el servicio post
            const resul = await postData(administradores);
            // const resultData = await getData();
            // console.log("Datos de Clusters", resultData.data);

            if(resul.status === 400){
                $(".modal-footer").before(`<div class="alert alert-danger">${resul.mensaje}</div>`)
            } 
            if(resul.status === 200){
                 $(".modal-footer").before(`<div class="alert alert-success">${resul.mensaje}</div>`)
                $('button[type="submit"]').remove();
                setTimeout(()=>{window.location.href=`/`},3000);
                }
            }


    return(
        <div>
            <div className="modal" id="crearCuenta">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div style={{backgroundColor:"orange"}} className="modal-header">
                        <h5 style={{marginLeft:"165px"}} className="modal-title">CREAR CUENTA</h5>
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
                                <label className="small text-secondary" htmlFor="telefono">
                                   | Telefono Celular
                                </label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-signature"></i>
                                    </div>
                                    <input
                                        id="telefono"
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
                                <label className="small text-secondary" htmlFor="cedula">
                                   | Numero de Documento o NIT
                                </label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-signature"></i>
                                    </div>
                                    <input
                                        id="cedula"
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
                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="nombreEmpresa">
                                   | *Primer letra en Mayuscula
                                </label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-signature"></i>
                                    </div>
                                    <input
                                        id="nombreEmpresa"
                                        type="text"
                                        className="form-control"
                                        name="nombreEmpresa"
                                        placeholder="Ingrese el nombre de la Empresa"
                                        minLength="3"
                                        maxLength="20"
                                        pattern="^[A-Z]+[a-z?\s]+$"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="pais">
                                   | *Solo con el siguiente formato -- | CO-US-MX
                                </label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-signature"></i>
                                    </div>
                                    <input
                                        id="pais"
                                        type="text"
                                        className="form-control text-uppercase"
                                        name="pais"
                                        placeholder="Ingrese el pais"
                                        minLength="2"
                                        maxLength="2"
                                        pattern="[A-Z]+[A-Z]"
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
        </div>
    )
}

//PETICION POST PARA USUARIOS
const postData = data =>{
    
    const role = "Administrador"
    const state = "1"
    /* const valorMinuto =  0.05 */
    const conversacion = false
    data.role = role
    data.state = state
    data.conversacion = conversacion
    /* data.valorMinuto = valorMinuto */
    
    const url = `${rutaAPI}/addAdmin`;
    const params = {

        method: "POST",
		body:JSON.stringify(data),
		headers: {

			"Content-Type": "application/json"

		}

    }
    console.log("Data", data)
    return fetch(url, params).then(response=>{
        return response.json();
    }).then(result=>{
        return result;
    }).catch(err=>{
        return err;
    });
}