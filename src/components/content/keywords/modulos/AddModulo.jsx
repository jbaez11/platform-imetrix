import React, { useState } from "react";
import $ from "jquery";
import { rutaAPITableros } from "../../../../config/Config";

export default function AddModulo() {
  const valores = window.location.href;
  let nuevaURL = valores.split("/");

  /* Hook para caputar los datos del formulario */
  const [modulos, crearModulo] = useState({
    name: "",
    categoria: "",
  });

  /* Onchange */
  const cambiaFormPost = (e) => {
    crearModulo({
      ...modulos,
      [e.target.name]: e.target.value,
    });
  };

  /* OnSubmit */
  const submitPost = async (e) => {
    $(".alert").remove();

    e.preventDefault();

    //Ejecutamos el servicio post
    const resul = await postData(modulos);
    // const resultData = await getData();
    // console.log("Datos de Clusters", resultData.data);

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
        window.location.href = `/moduloKeywords/` + nuevaURL[4];
      }, 3000);
    }
  };

  const [categorias, setCategorias] = React.useState([]);

  React.useEffect(() => {
    //console.log('useEffect');
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const valores = window.location.href;
    let nuevaURL = valores.split("/");
    const data = await fetch(`${rutaAPITableros}/${nuevaURL[4]}/getCategorias`);
    const categoria = await data.json();
    console.log("Categorias", categoria.data);
    setCategorias(categoria.data);
  };

  return (
    <div className="modal" id="addModulo">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Crear Modulo</h4>
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
                  *Mínimo 2 Caracteres, máximo 20, Sin números
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
                    placeholder="Ingrese el nombre del modulo"
                    minLength="2"
                    maxLength="20"
                    pattern="(?=.*[A-Za-z]).{2,20}"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="small text-secondary" htmlFor="categoria">
                  | Seleccione la categoria para el modulo
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-append input-group-text">
                    <i className="fas fa-address-card"></i>
                  </div>
                  <select name="categoria" id="categoria">
                    <option value="" selected disabled>
                      Seleccionar Categoria
                    </option>
                    {categorias.map((categoria, index) => (
                      <>
                        <option value={categoria._id}>{categoria.name}</option>
                      </>
                    ))}
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
  const url = `${rutaAPITableros}/${nuevaURL[4]}/addModulo`;
  //const token = localStorage.getItem("ACCESS_TOKEN");
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log("Data a guardar del Modulo", data);
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
