import React, { useState } from "react";
import $ from "jquery";
import { rutaAPI } from "../../../config/Config";
// import Checkbox from 'react';

export default function AddUser() {
  const currentUserId = localStorage.getItem("ID");
  const valores = window.location.href;
  let nuevaURL = valores.split("/");

  const [clusters, setClusters] = React.useState([]);

  React.useEffect(() => {
    //console.log('useEffect');
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(`${rutaAPI}/getAdminClusters/${nuevaURL[4]}`);
    const clust = await data.json();
    for (let i in clust.data) {
      let c = clust.data[i];
      let respuesta = await fetch(`${rutaAPI}/getCampaing/${c._id}`);
      clust.data[i].campaings = (await respuesta.json()).data;
    }
    //console.log("cluster",clust.data);
    setClusters(clust.data);
  };

  const clusterChange = (cluster) => {
    let nClusters = usuarios.clusters;
    let index = nClusters.findIndex((c) => c._id === cluster._id);
    if (index !== -1) {
      nClusters.splice(index, 1);
    } else {
      nClusters.push(cluster);
    }
    crearUsuario({
      ...usuarios,
      clusters: nClusters,
    });
    console.log("Clusters", usuarios);
  };

  const campaingChange = (campaing) => {
    let nCampaings = usuarios.campaings;
    let index = nCampaings.findIndex((c) => c._id === campaing._id);
    if (index !== -1) {
      nCampaings.splice(index, 1);
    } else {
      nCampaings.push(campaing);
    }
    crearUsuario({
      ...usuarios,
      campaings: nCampaings,
    });
    console.log("Campañas", usuarios);
  };

  let checkedSelectedCluster = (cluster) => {
    return usuarios.clusters.some((c) => c._id === cluster._id);
  };

  //Hook para caputar los datos del formulario
  const [usuarios, crearUsuario] = useState({
    nombres: "",
    correo: "",
    password: "",
    state: "",
    clusters: [],
    campaings: [],
    role: "",
  });

  //Onchange
  const cambiaFormPost = (e) => {
    crearUsuario({
      ...usuarios,
      [e.target.name]: e.target.value,
    });
  };

  //OnSubmit
  const submitPost = async (e) => {
    let currentAdmin = localStorage.getItem("ADMIN");
    let role = localStorage.getItem("ROLE");
    $(".alert").remove();

    e.preventDefault();

    //Ejecutamos el servicio post
    const resul = await postData(usuarios);
    // const resultData = await getData();
    // console.log("Datos de Clusters", resultData.data);

    if (resul.status === 400) {
      $(".modal-footer").before(
        `<div class="alert alert-danger">${resul.mensaje}</div>`
      );
    }
    if (resul.status === 200) {
      if(role === "Administrador"){
        $(".modal-footer").before(
          `<div class="alert alert-success">${resul.mensaje}</div>`
        );
        $('button[type="submit"]').remove();
        setTimeout(() => {
          window.location.href = `/usuarios/${currentUserId}`;
        }, 2000);
      }else if(role === "SuperAdministrador"){
        $(".modal-footer").before(
          `<div class="alert alert-success">${resul.mensaje}</div>`
        );
        $('button[type="submit"]').remove();
        setTimeout(() => {
          window.location.href = `/usuarios/${currentAdmin}`;
        }, 2000);
      }
      
    }
  };

  return (
    <div className="modal" id="addUser">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Crear Usuario</h4>
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
            ></button>
          </div>

          <form onChange={cambiaFormPost} onSubmit={submitPost}>
            <div className="modal-body">
              <div className="form-group">
                <label className="small text-secondary" htmlFor="nombre">
                  *Mínimo 2 Caracteres, máximo 50, Sin números ni Caracteres
                  Especiales
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-signature"></i>
                  </div>
                  <input
                    id="nombre"
                    type="text"
                    className="form-control"
                    name="nombres"
                    placeholder="Ingrese los Nombres y Apellidos"
                    minLength="2"
                    maxLength="50"
                    pattern="^[a-zA-ZÀ-ÿ?\s]+"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="small text-secondary" htmlFor="correo">
                  *Minimo 2 Caracteres, Maximo 50
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-user"></i>
                  </div>
                  <input
                    id="correo"
                    type="email"
                    className="form-control"
                    name="correo"
                    placeholder="Ingrese el Correo"
                    minLength="2"
                    maxLength="50"
                    pattern="(?=.*[A-Za-z]).{2,50}"
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
                <label className="small text-secondary" htmlFor="state">
                  Habilitado | Inhabilitado
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-user-check"></i>
                  </div>
                  <select required name="state" id="state">
                    <option value="" selected disabled hidden>
                      Seleccionar estado
                    </option>
                    <option value="1">Habilitado</option>
                    <option value="0">Inhabilitado</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="small text-secondary" htmlFor="clusters">
                  | Seleccione el cluster(s) al que el auditor tendra acceso
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-address-card"></i>
                  </div>
                  {clusters.map((cluster, index) => (
                    <div style={{ marginLeft: "5px" }} key={`cluster-${index}`}>
                      <input
                        onChange={() => clusterChange(cluster)}
                        className="form-check-input"
                        type="checkbox"
                        value={cluster._id}
                        checked={usuarios.clusters.some(
                          (c) => c._id === cluster._id
                        )}
                        style={{
                          marginLeft: "0.03cm",
                          height: "20px",
                          width: "20px",
                        }}
                      />
                      <label
                        style={{ marginLeft: "25px", marginTop: "1px" }}
                        className="form-check-label"
                      >
                        {cluster.nombre}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {clusters.map((cluster, index) => (
                <>
                  {checkedSelectedCluster(cluster) && (
                    <div key={index}>
                      <h5>{cluster.nombre}</h5>
                      <div className="form-group">
                        <label
                          className="small text-secondary"
                          htmlFor="campaings"
                        >
                          | Seleccione las campaña(s) al que el auditor tendra
                          acceso
                        </label>
                        <div className="input-group mb-3">
                          <div className="input-group-append input-group-text">
                            <i className="fas fa-address-card"></i>
                          </div>
                          {cluster.hasOwnProperty("campaings") &&
                            cluster.campaings.map((campaing, index) => (
                              <div
                                style={{ marginLeft: "5px" }}
                                key={`campaing-${index}`}
                              >
                                <input
                                  onChange={() => campaingChange(campaing)}
                                  className="form-check-input"
                                  type="checkbox"
                                  value={campaing._id}
                                  checked={usuarios.campaings.some(
                                    (c) => c._id === campaing._id
                                  )}
                                  style={{
                                    marginLeft: "0.03cm",
                                    height: "20px",
                                    width: "20px",
                                  }}
                                />
                                <label
                                  style={{
                                    marginLeft: "25px",
                                    marginTop: "1px",
                                  }}
                                  className="form-check-label"
                                >
                                  {campaing.nombre}
                                </label>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}
              <div className="form-group">
                <label className="small text-secondary" htmlFor="role">
                  *Administrador o Auditor
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-user-tag"></i>
                  </div>
                  <select required name="role" id="role">
                    <option value="" selected disabled>
                      Seleccionar rol
                    </option>
                    <option value="Auditor">
                      Auditor
                    </option>
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
  let currentUser = localStorage.getItem("ID");
  let currentAdmin = localStorage.getItem("ADMIN");
  let role = localStorage.getItem("ROLE");
  if(role === "Administrador"){
      data.createdBy = currentUser;
  }else if(role === "SuperAdministrador"){
    data.createdBy = currentAdmin;
  }
  const url = `${rutaAPI}/addUser`;
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

//Petición Get para Clusters asociados al Administrador
// const getData = () =>{

//     const valores = window.location.href;
//     let nuevaURL = valores.split("/");

//     const url = `${rutaAPI}/getCluster/${nuevaURL[4]}`;

//     const params = {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     }

//     return fetch(url, params).then(response =>{
//         return response.json();
//     }).then(result => {
//         return result;
//     }).catch(err=>{
//         return err;
//     })

// }
