import React, {useState} from 'react';
import {rutaAPI} from '../../config/Config';
import $ from "jquery";

export default function Login(){

    //Hook para iniciar Sesión
    const [ usuarios, iniciarSesion ] = useState({
        correo: "",
        password: ""
    });

    //Capturamos los datos del Formulario
    const cambiaForm = (e) =>{
        iniciarSesion({

            ...usuarios,
            [e.target.name] : e.target.value,

        })
    }

    //Ejecutamos el Submit en el envio
    const login = async(e) =>{

        $(".alert").remove();
        e.preventDefault();
        const result = await loginAPI(usuarios);
        
        if(result.status !== 200){

            $("button[type='submit']").before(`<div class="alert alert-danger">${result.mensaje} </div>`)

        }else{

            localStorage.setItem("ACCESS_TOKEN", result.token);
            localStorage.setItem("ID", result.data._id);
            localStorage.setItem("CORREO", result.data.correo);
            localStorage.setItem("NAME", result.data.nombres);
            localStorage.setItem("ROLE", result.data.role);

            window.location.href =`/inicio/${result.data._id}`;

        }
    }

    //Retornamos la Vista del Login
    return(
        <div className="login-page" style={{backgroundColor:"silver"}}>
        <div className="login-box">
            <div className="login-logo">
                <b>iMetrix</b> Login AUDITORES
            </div>			

            <div className="card">
                <div className="card-body login-card-body">
                    <p className="login-box-msg">
                        Llena los campos para iniciar sesión
                    </p>
                    <form onChange={cambiaForm} onSubmit={login}>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="correo"
                
                            />

                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">

                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="password"
                            
                            />

                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-block">Ingresar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}

//Petición POST para el login
const loginAPI = data =>{

    const url = `${rutaAPI}/loginUser`
    const params = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            "Content-Type" : "application/json"
        }
    }

    return fetch(url, params).then(response =>{
        return response.json();
    }).then(result =>{
        return result;
    }).catch(err =>{
        return err;
    })
}
