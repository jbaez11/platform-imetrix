import React, { useState, useEffect } from "react";
import $ from "jquery";
import Swal from "sweetalert2";
import { rutaAPITableros } from "../../../config/Config";

export default function EditAgente() {
  const valores = window.location.href;
  let nuevaURL = valores.split("/");

  //Hook para caputar los datos del formulario
  const [agentes, editarAgente] = useState({
    name: "",
    identification: "",
    gender: "",
  });

  //Onchange
  const cambiaFormPost = (e) => {
    editarAgente({
      ...agentes,
      [e.target.name]: e.target.value,
    });
  };

  //OnSubmit
  const submitPost = async (e) => {
    $(".alert").remove();

    e.preventDefault();

    //Ejecutamos el servicio post
    const resul = await putData(agentes);

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

  /* Capturamos los datos para editar el agente */
  $(document).on("click", ".editarInputs", async function (e) {
    e.preventDefault();

    let data = $(this).attr("data").split(",");
    //console.log(data);
    $("#editarName").val(data[1]);
    $("#editarIdentification").val(data[2]);
    $("#editarGender").val(data[3]);

    editarAgente({
      name: $("#editarName").val(),
      identification: $("#editarIdentification").val(),
      gender: $("#editarGender").val(),
      id: data[0],
    });
  });

  return (
    <div className="modal" id="editAgent">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">EditarAgente</h4>
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
            ></button>
          </div>

          <form onChange={cambiaFormPost} onSubmit={submitPost}>
            <div className="modal-body">
              <div className="form-group">
                <label className="small text-secondary" htmlFor="editarName">
                  *Mínimo 2 Caracteres, máximo 50, Sin números
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-signature"></i>
                  </div>
                  <input
                    id="editarName"
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
                  htmlFor="editarIdentification"
                >
                  | Numero de Documento
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-signature"></i>
                  </div>
                  <input
                    id="editarIdentification"
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
                <label className="small text-secondary" htmlFor="editarGender">
                  Masculino | Femenino
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-user-check"></i>
                  </div>
                  <select name="gender" id="editarGender">
                    <option value="F">Femenino</option>
                    <option value="M">Masculino</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <div>
                <button type="submit" className="btn btn-success">
                  Editar
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

/* PETICION PUT PARA AGENTES */
const putData = (data) => {
  const valores = window.location.href;
  let nuevaURL = valores.split("/");
  const url = `${rutaAPITableros}/${nuevaURL[4]}/editar-agents/${data.id}`;
  const token = localStorage.getItem("ACCESS_TOKEN");
  const params = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log("Data a guardar de Agentes", data);
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
