import React, {useState} from "react";
import { rutaAPI } from "../../../config/Config";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import Sidebar from "../../sidebar/Sidebar";
import AddCluster from "./AddCluster";
import EditCluster from "./EditCluster";
import LoadingScreen from "../../loading_screen/LoadingScreen";
import "datatables.net";
import "datatables.net-bs5";
import "datatables.net-responsive";
import $ from "jquery";

export default function Clusters() {
  const [loading, setLoading] = useState(false);
  const dataClusters = async () => {

    const getClusters = await getData();
    setLoading(true)

    const dataTable = [];

    getClusters.data.forEach((cluster, index) => {

      /* console.log("Data Clusters",cluster) */
      let userNames = [];
      cluster.users.forEach((user) => {
        userNames.push(user.nombres);
      });

      dataTable[index] = [
        index + 1,
        cluster.nombre,
        cluster.foto,
        cluster.state === 1
          ? (cluster.state = "Habilitado")
          : (cluster.state = "Inhabilitado"),
        userNames,
        cluster.createdAt,
        [
          cluster._id,
          cluster.nombre,
          cluster.foto,
          cluster.state,
          userNames,
          cluster.createdAt,
        ],
      ];
    });

    //Ejecutar el Data Table
    $(function () {
      let tablaCluster = $(".table").DataTable({
        data: dataTable,

        columnDefs: [
          {
            searchable: true,
            orderable: true,
            targets: 0,
          },
        ],
        order: [[0, "desc"]],
        columns: [
          { title: "#" },
          { title: "Nombre" },
          {
            title: "Imagen",
            render: function (data) {
              return `
                        <img src="${rutaAPI}/getImgCluster/${data}" style="width:320px; height:180px"/>
                    `;
            },
          },
          { title: "Estado" },
          { title: "Auditores" },
          { title: "Fecha de Creaci??n" },
          {
            title: "Editar",
            render: function (data) {
              return `
                    
                    <a href="" class="editarInputs" data-toggle="modal" data-target="#editCluster" data="${data}">
                    <svg style="color:black; background:orange; border-radius:100%; width:35px; line-height:35px; text-align:center; padding:7px"

                    aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil-alt" class="svg-inline--fa fa-pencil-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg>
                    </a>
                    `;

              /*    <a href="" class="borrarInput" data="${data}">
                    <svg style="color:white; background:#dc3545; border-radius:100%; width:35px; line-height:35px; text-align:center; padding:7px"

                    aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
                    </a> */
            },
          },
        ],
        bDestroy: true,
      });
      tablaCluster
        .on("order.dt search.dt", function () {
          tablaCluster
            .column(0, { search: "applied", order: "applied" })
            .nodes()
            .each(function (cell, i) {
              cell.innerHTML = i + 1;
            });
        })
        .draw();
    });
  };

  dataClusters();

  return (
    <div className="sidebar-mini">
        <div className="wrapper">
          <Header />
          <Sidebar />
          <div className="content-wrapper" style={{ minHeight: "494px" }}>
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1 className="m-0 text-dark">Gestor de Clientes</h1>
                  </div>
                </div>
              </div>
            </div>
            {loading ? 
            <div className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card card-warning card-outline">
                      <div className="card-header">
                        <h5 className="m-0">
                          <button
                            className="btn btn-warning"
                            data-toggle="modal"
                            data-target="#addCluster"
                          >
                            Crear Nuevo Cliente
                          </button>
                        </h5>
                      </div>
                      <div
                        style={{ backgroundColor: "white" }}
                        className="card-body"
                      >
                        <table
                          className="table table-striped dt-responsive"
                          style={{ width: "100%" }}
                        ></table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
        
          : <LoadingScreen/>}
          </div>
          <Footer />
      <AddCluster />
      <EditCluster />
    </div>
  </div>  
  );
}

//Petici??n Get para los Clusters de los Administradores
const getData = () => {
  const valores = window.location.href;
  let nuevaURL = valores.split("/");

  const url = `${rutaAPI}/getAdminClusters/${nuevaURL[4]}`;

  const params = {
    method: "GET",
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
