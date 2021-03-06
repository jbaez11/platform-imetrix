import React, { useState } from "react";
import $ from "jquery";
import Swal from "sweetalert2";
import { rutaAPITableros } from "../../../../config/Config";

export default function EditCluster() {
  const valores = window.location.href;
  let nuevaURL = valores.split("/");

  /* Hook para caputar los datos del formulario */
  const [clusters, editarCluster] = useState({
    name: "",
    modulo: "",
    porcentaje: "",
  });

  /* Onchange */
  const cambiaFormPost = (e) => {
    editarCluster({
      ...clusters,
      [e.target.name]: e.target.value,
    });
  };

  /* OnSubmit */
  const submitPost = async (e) => {
    $(".alert").remove();

    e.preventDefault();

    //Ejecutamos el servicio post
    const resul = await putData(clusters);
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
      }, 3000);
    }
  };

  const [modulos, setModulos] = React.useState([]);

  React.useEffect(() => {
    //console.log('useEffect');
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(`${rutaAPITableros}/${nuevaURL[4]}/getModulos`);
    const modulo = await data.json();
    /* console.log("Modulos", modulo.data); */
    setModulos(modulo.data);
  };

  //Capturamos los datos para editar el usuario
  $(document).on("click", ".editarInputs", async function (e) {
    e.preventDefault();

    let data = $(this).attr("data").split(",");
    /* console.log("Datos que se van a editar",data); */
    $("#editarNombre").val(data[1]);
    $("#editarModulo").val(data[2]);
    $("#editarPorcentaje").val(data[3]);

    editarCluster({
      name: $("#editarNombre").val(),
      porcentaje: $("#editarPorcentaje").val(),
      modulo: $("#editarModulo").val(),
      id: data[0],
    });
  });

  //Capturamos los datos para borrar el usuario
  $(document).on("click", ".borrarInput", function (e) {
    e.preventDefault();

    let data = $(this).attr("data").split(",")[0];
    /* console.log(data); */

    //Validamos si queremos eliminar el usuario
    Swal.fire({
      title: "??Est?? seguro de eliminar este registro?",
      text: "Esta acci??n no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "??Si, eliminar registro!",
    }).then((result) => {
      if (result.isConfirmed) {
        //Ejecutamos el servicio delete
        const borrarCluster = async () => {
          const result = await deleteData(data);

          if (result.status === 400) {
            Swal.fire({
              type: "error",
              title: result.mensaje,
              showConfirmButton: true,
              confirmButtonText: "Cerrar",
            }).then(function (result) {
              if (result.isConfirmed) {
                window.location.href = `/clusterKeywords/` + nuevaURL[4];
              }
            });
          }

          let keyWordsNames = [];
          if(result.data === undefined || result.status === 200){
            Swal.fire({
              icon: "success",
              title: result.mensaje,
              showConfirmButton: true,
              confirmButtonText: "Cerrar",
            }).then(function (result) {
              if (result.isConfirmed) {
                window.location.href = `/clusterKeywords/` + nuevaURL[4];
              }
            });
          }else{
            result.data.forEach((keyword) =>{
              keyWordsNames.push(keyword.name)
            })
            if (result.status === 501) {
              Swal.fire({
                icon: 'warning',
                title: result.mensaje,
                text: "KeyWords: " + keyWordsNames,
                showConfirmButton: true,
                confirmButtonText: "Cerrar",
              })
            }
          }
          /* if (result.status === 200) {
            Swal.fire({
              type: "success",
              title: result.mensaje,
              showConfirmButton: true,
              confirmButtonText: "Cerrar",
            }).then(function (result) {
              if (result.isConfirmed) {
                window.location.href = `/clusterKeywords/` + nuevaURL[4];
              }
            });
          } */
        };
        borrarCluster();
      }
    });
  });

  return (

    <div className="modal" id="editCluster">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Editar Cluster</h4>
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
            ></button>
          </div>
          <form onChange={cambiaFormPost} onSubmit={submitPost}>
            <div className="modal-body">
              <div className="form-group">
                <label className="small text-secondary" htmlFor="editarNombre">
                  *M??nimo 2 Caracteres, m??ximo 50, Sin n??meros ni caracteres especiales
                </label>
                <label className="small text-secondary" htmlFor="name">
                  *LOS CLUSTERS NO PUEDEN SER REPETIDOS*
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-signature"></i>
                  </div>
                  <input
                    id="editarNombre"
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
                <label className="small text-secondary" htmlFor="editarModulo">
                  | Seleccione el modulo para el cluster
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-address-card"></i>
                  </div>
                  <select required name="modulo" id="editarModulo">
                    <option value="" selected disabled>
                      Seleccionar Modulo
                    </option>
                    {modulos.map((modulo, index) => (
                      <>
                        <option key={index} value={modulo._id}>{modulo.name}</option>
                      </>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label
                  className="small text-secondary"
                  htmlFor="editarPorcentaje"
                >
                *Sin letras o caracteres especiales,  No puede superar un porcentaje mayor al 100% 
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-signature"></i>
                  </div>
                  <input
                    id="editarPorcentaje"
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

/* PETICION PUT PARA CLUSTERS */
const putData = (data) => {
  //console.log("DATA", data)
  const valores = window.location.href;
  let nuevaURL = valores.split("/");
  const url = `${rutaAPITableros}/${nuevaURL[4]}/editCluster/${data.id}`;
  //const token = localStorage.getItem("ACCESS_TOKEN");
  const params = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  /* console.log("Data nueva para actualizar el Cluster", data); */
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

//METODO DELETE
const deleteData = (data) => {
  const valores = window.location.href;
  let nuevaURL = valores.split("/");
  const url = `${rutaAPITableros}/${nuevaURL[4]}/deleteCluster/${data}`;
  //const token = localStorage.getItem("ACCESS_TOKEN");
  const params = {
    method: "DELETE",
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
