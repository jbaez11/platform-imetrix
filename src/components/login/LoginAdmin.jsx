import React, { useState } from "react";
import { rutaAPI } from "../../config/Config";
import Person from "./loginPerson.png";
import Collab from "./collab.png";
import $ from "jquery";
//import './login.css'
import "./main.css";
import "./normalize.css";
import CrearCuenta from "../crear_cuenta/CrearCuenta";

export default function LoginAdmin() {
  //Hook para iniciar Sesión
  const [administradores, iniciarSesion] = useState({
    correo: "",
    password: "",
  });

  //Capturamos los datos del Formulario
  const cambiaForm = (e) => {
    iniciarSesion({
      ...administradores,
      [e.target.name]: e.target.value,
    });
  };

  //Ejecutamos el Submit en el envio
  const login = async (e) => {
    $(".alert").remove();
    e.preventDefault();
    const result = await loginAdmin(administradores);
    console.log(result)
    if (result.status !== 200) {
      $("button[type='submit']").before(
        `<div class="alert alert-danger">${result.mensaje} </div>`
      );
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {

      localStorage.setItem("CONVERSATION", result.data.conversacion);
      localStorage.setItem("ACCESS_TOKEN", result.token);
      localStorage.setItem("ID", result.data._id);
      localStorage.setItem("CORREO", result.data.correo);
      localStorage.setItem("NAME", result.data.nombres);
      localStorage.setItem("ROLE", result.data.role);
      localStorage.setItem("CREATEDBY", result.data.createdBy);

      const role = localStorage.getItem("ROLE")
      console.log(role);
      if(role === "SuperAdministrador"){
        window.location.href = `/adminsInicio`;
      }else{
        window.location.href = `/inicio/${result.data._id}`;
      }      
    }
  };

  //Retornamos la Vista del Login
  return (
    <div>
      <main className="login-design">
        <div className="waves">
          <img src={Person} alt="" />
        </div>
        <div className="login">
          <div className="login-data">
            <img src={Collab} alt="" />
            <h1>Inicio de Sesión</h1>
            <form
              action="#"
              className="login-form"
              onChange={cambiaForm}
              onSubmit={login}
            >
              <div className="input-group">
                <label className="input-fill">
                  <input
                    style={{ paddingRight: "30px" }}
                    type="email"
                    name="correo"
                    id="email"
                    placeholder="Correo Electrónico"
                    required
                  />
                  {/* <span className="input-label">Correo Electrónico</span> */}
                  <i className="fas fa-envelope"></i>
                </label>
              </div>
              <div className="input-group">
                <label className="input-fill">
                  <input
                    style={{ paddingRight: "30px" }}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Contraseña"
                    required
                  />
                  {/* <span className="input-label">Contraseña</span> */}
                  <i className="fas fa-lock"></i>
                </label>
              </div>
              <button
                type="submit"
                value="Iniciar Sesión"
                className="btn-login"
              >
                Iniciar Sesión
              </button>
              {/* <input
                type="submit"
                value="Iniciar Sesión"
                className="btn-login"
              /> */}
              <button
                className="btn-login"
                data-toggle="modal"
                data-target="#crearCuenta"
              >
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </main>
      {/* Modal para crear nueva Cuenta */}
      <CrearCuenta />
    </div>
  );
}

//Petición POST para el login del Administrador
const loginAdmin = (data) => {
  const url = `${rutaAPI}/loginAdmin`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};
