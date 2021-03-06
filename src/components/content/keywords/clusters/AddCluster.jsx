import React, { useState, useEffect } from "react";
import $ from "jquery";
import { rutaAPITableros } from "../../../../config/Config";

export default function AddCluster() {
  const valores = window.location.href;
  let nuevaURL = valores.split("/");

  /* Hook para caputar los datos del formulario */
  const [clusters, crearCluster] = useState({
    name: "",
    modulo: "",
    porcentaje: "",
  });

  /* Onchange */
  const cambiaFormPost = (e) => {
    crearCluster({
      ...clusters,
      [e.target.name]: e.target.value,
    });
  };

  /* OnSubmit */
  const submitPost = async (e) => {
    $(".alert").remove();

    e.preventDefault();

    //Ejecutamos el servicio post
    const resul = await postData(clusters);
    // const resultData = await getData();
    // console.log("Datos de Clusters", resultData.data);

    if (resul.status === 400 || resul.status === 401) {
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
        window.location.href = `/clusterKeywords/` + nuevaURL[4];
      }, 2000);
    }
  };

  const [modulos, setModulos] = React.useState([]);

  React.useEffect(() => {
    //console.log('useEffect');
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const valores = window.location.href;
    let nuevaURL = valores.split("/");
    const data = await fetch(`${rutaAPITableros}/${nuevaURL[4]}/getModulos`);
    const modulo = await data.json();
    /* console.log("Modulos", modulo.data); */
    setModulos(modulo.data);
  };

  return (

    <div className="modal" id="addCluster">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Crear Cluster</h4>
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
                  *M??nimo 2 Caracteres, m??ximo 50, Sin n??meros ni caracteres
                  especiales
                </label>
                <label className="small text-secondary" htmlFor="name">
                  *LOS CLUSTERS NO PUEDEN SER REPETIDOS*
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-signature"></i>
                  </div>
                  <input
                    id="name"
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Ingrese el nombre del cluster"
                    minLength="2"
                    maxLength="50"
                    pattern="^[a-z??-???\s]+"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="small text-secondary" htmlFor="modulo">
                  | Seleccione el modulo para el cluster
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-address-card"></i>
                  </div>
                  <select required name="modulo" id="modulo">
                    <option value="" selected disabled>
                      Seleccionar Modulo
                    </option>
                    {modulos.map((modulo, index) => (
                      <>
                        <option key={index} value={modulo._id}>
                          {modulo.name}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="small text-secondary" htmlFor="porcentaje">
                  *Sin letras o caracteres especiales, No puede superar un
                  porcentaje mayor al 100%
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-signature"></i>
                  </div>
                  <input
                    id="porcentaje"
                    type="text"
                    className="form-control"
                    name="porcentaje"
                    placeholder="Ingrese el porcentaje del cluster"
                    pattern="[0-9]*\.?[0-9]*"
                    required
                  />
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

//PETICION POST PARA CLIUSTERS
const postData = (data) => {
  const valores = window.location.href;
  let nuevaURL = valores.split("/");
  const url = `${rutaAPITableros}/${nuevaURL[4]}/addCluster`;
  //const token = localStorage.getItem("ACCESS_TOKEN");
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  /* console.log("Data a guardar de Cluster", data); */
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
