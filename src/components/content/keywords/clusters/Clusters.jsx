import React from "react";
import Footer from "../../../footer/Footer";
import Header from "../../../header/Header";
import SidebarAdminCampaing from "../../../sidebar/SidebarAdminCampaing";
import AddCluster from "../clusters/AddCluster";
import EditCluster from "../clusters/EditCluster";
import $ from "jquery";
import "datatables.net";
import "datatables.net-bs5";
import "datatables.net-responsive";
import { rutaAPITableros } from "../../../../config/Config";

export default function Clusters() {
  const dataClusters = async () => {
    // crear el dataset para datatables
    const getClusters = await getData();

    const dataSet = [];

    getClusters.data.forEach((clusters, index) => {
      dataSet[index] = [
        index + 1,
        clusters.name,
        clusters.modulo,
        clusters.porcentaje,
        [clusters._id, clusters.name, clusters.modulo, clusters.porcentaje],
      ];
    });

    //ejecutar datatable
    $(document).ready(function () {
      $(".table").DataTable({
        data: dataSet,

        columns: [
          { title: "#" },
          { title: "Nombre" },
          { title: "Modulo" },
          { title: "Porcentaje" },
          {
            title: "Acciones",
            render: function (data) {
              return `
							
							<a href="" class="editarInputs" data-toggle="modal" data-target="#editCluster" data="${data}">

								<svg style="color:black; background:orange; border-radius:100%; width:35px; line-height:35px; text-align:center; padding:8px"
								aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil-alt" class="svg-inline--fa fa-pencil-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg>


							</a>

							<a href="" class="borrarInput" data="${data}">

								<svg style="color:white; background:#dc3545; border-radius:100%; width:35px; line-height:35px; text-align:center; padding:12px"
								aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
							</a>`;
            },
          },
        ],
        language: {
          sProcessing: "Procesando...",
          sLengthMenu: "Mostrar _MENU_ registros",
          sZeroRecords: "No se encontraron resultados",
          sEmptyTable: "Ningún dato disponible en esta tabla",
          sInfo:
            "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
          sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0",
          sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
          sInfoPostFix: "",
          sSearch: "Buscar:",
          sUrl: "",
          sInfoThousands: ",",
          sLoadingRecords: "Cargando...",
          oPaginate: {
            sFirst: "Primero",
            sLast: "Último",
            sNext: "Siguiente",
            sPrevious: "Anterior",
          },
          oAria: {
            sSortAscending:
              ": Activar para ordenar la columna de manera ascendente",
            sSortDescending:
              ": Activar para ordenar la columna de manera descendente",
          },
        },
        bDestroy: true,
      });
    });
  };
  dataClusters();

  return (
    <div className="sidebar-mini">
      <div className="wrapper">
        <Header />
        <SidebarAdminCampaing />
        <div className="content-wrapper" style={{ minHeight: "494px" }}>
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0 text-dark">Clusters</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card card-primary">
                    <div
                      className="card-header"
                      style={{ backgroundColor: "orange" }}
                    >
                      <h5 className="m-0">
                        <button
                          className="btn btn-light"
                          data-toggle="modal"
                          data-target="#addCluster"
                        >
                          Crear Cluster
                        </button>
                      </h5>
                    </div>
                    <div className="card-body">
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
        </div>
        <Footer />
        {/* Modal para crear un Cluster */}
        <AddCluster />
        {/* Modal para editar un Cluster */}
        <EditCluster />
      </div>
    </div>
  );
}

const getData = () => {
  const valores = window.location.href;
  let nuevaURL = valores.split("/");
  //console.log("nuevaURL",nuevaURL);
  const url = `${rutaAPITableros}/${nuevaURL[4]}/getClusters`;
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
