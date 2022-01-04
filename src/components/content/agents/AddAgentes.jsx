import React, { useState } from "react";
import $ from "jquery";
import { rutaAPITableros } from "../../../config/Config";
// import Checkbox from 'react';

export default function AddAgentes() {
  const valores = window.location.href;
  let nuevaURL = valores.split("/");

  /* Hook para caputar los datos del formulario */
  const [agentes, crearAgente] = useState({
    name: "",
    identification: "",
    gender: "",
  });

  /* Onchange */
  const cambiaFormPost = (e) => {
    crearAgente({
      ...agentes,
      [e.target.name]: e.target.value,
    });
  };

  /* OnSubmit */
  const submitPost = async (e) => {
    $(".alert").remove();

    e.preventDefault();

    /* Ejecutamos el servicio post */
    const resul = await postData(agentes);

    if (resul.status === 400) {
      $(".modal-footer").before(
        `<div class="alert alert-danger">${resul.mensaje}</div>`
      );
    }
    if (resul.status === 200) {
      $(".modal-footer").before(
        `<div class="alert alert-success">${resul.mensaje}</div>`
      );
      $('button[type="submit"]').remove();
      setTimeout(() => {
        window.location.href = `/agents/` + nuevaURL[4];
      }, 2000);
    }
  };

  return (
    <div className="modal" id="addAgent">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Crear Agente</h4>
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
            ></button>
          </div>

          <form onChange={cambiaFormPost} onSubmit={submitPost}>
            <div className="modal-body">
              <div className="form-group">
                <label className="small text-secondary" htmlFor="name">
                  *Mínimo 2 Caracteres, máximo 50, Sin números
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-signature"></i>
                  </div>
                  <input
                    id="name"
                    type="text"
                    className="form-control text-uppercase"
                    name="name"
                    placeholder="Ingrese el Nombre"
                    minLength="2"
                    maxLength="50"
                    pattern="(?=.*[A-Za-z]).{2,50}"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label
                  className="small text-secondary"
                  htmlFor="identification"
                >
                  | Numero de Documento
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-signature"></i>
                  </div>
                  <input
                    id="identification"
                    type="text"
                    className="form-control"
                    name="identification"
                    placeholder="Ingrese numero de documento"
                    maxLength="10"
                    pattern="[0-9]{10}"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="small text-secondary" htmlFor="gender">
                  Masculino | Femenino
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-user-check"></i>
                  </div>
                  <select name="gender" id="gender">
                    <option defaultValue="" selected disabled>
                      Seleccionar genero
                    </option>
                    <option value="F">Femenino</option>
                    <option value="M">Masculino</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <div>
                <button type="submit" className="btn btn-success">
                  Crear
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

//PETICION POST PARA USUARIOS
const postData = (data) => {
  const valores = window.location.href;
  let nuevaURL = valores.split("/");
  const url = `${rutaAPITableros}/${nuevaURL[4]}/crear-agents`;
  const token = localStorage.getItem("ACCESS_TOKEN");
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
  console.log("Data", data);
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
