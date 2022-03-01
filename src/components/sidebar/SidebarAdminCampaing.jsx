import React from "react";
import Logo from "./logo.png";
import User from "./user2-160x160.jpg";
import { rutaAPI } from "../../config/Config";

export default function SidebarAdminCampaing() {
  const userName = localStorage.getItem("NAME");
  const currentUserId = localStorage.getItem("ID");
  let conversacion = localStorage.getItem("CONVERSATION");
  let role = localStorage.getItem("ROLE");
  const valores = window.location.href;
  let nuevaURL = valores.split("/");

  /* Solo ejecutamos esta funcion si el Rol del Usuario es Auditor */
  if (role === "Auditor") {
    const obtenerDataAdministrador = async () => {
      let data = await getDataAdministrador();

      let verTablero = data.data[0].conversacion.toString();
      conversacion = localStorage.setItem("CONVERSATION", verTablero);
    };

    obtenerDataAdministrador();
  }
  return (
    <aside
      className="main-sidebar elevation-4"
      style={{ backgroundColor: "#FF9B00" }}
    >
      <a
        href={"/#"}
        className="brand-link"
        style={{ backgroundColor: "white" }}
      >
        <img
          alt="Logo imetrix"
          className="brand-image"
          style={{ opacity: 0.8 }}
          src={Logo}
        />
        {/* <i className="nav-icon fas fa-home" style={{ color: "darkgray" }}></i> */}
        <span
          className="brand-text"
          style={{
            color: "black",
            "text-decoration": "none !important",
            visibility: "hidden",
          }}
        >
          .
        </span>
      </a>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img className="img-circle elevation-2" alt="user" src={User} />
          </div>
          <div className="info">
            <a
              style={{ color: "white", "text-decoration": "none" }}
              href="#/"
              className="editarInputs"
              data-toggle="modal"
              data-target="#editarAdmin"
              data=""
            >
              {userName}
            </a>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {" "}
            <li className="nav-item">
              <a
                href={"/inicio/" + currentUserId}
                className="nav-link"
                style={{ color: "white" }}
              >
                <i className="nav-icon fas fa-home"></i>
                <p>Inicio</p>
              </a>
            </li>
            <li className="nav-item">
              <a
                href={"/agents/" + nuevaURL[4]}
                className="nav-link"
                style={{ color: "white" }}
              >
                <i className="nav-icon far fa-address-card"></i>
                <p>Agentes</p>
              </a>
            </li>
            <li className="nav-item">
              <a
                href={"/keywords/" + nuevaURL[4]}
                className="nav-link"
                style={{ color: "white" }}
              >
                <i className="nav-icon fas fa-bold"></i>
                <p>Keywords / Frases</p>
              </a>
            </li>
            <li className="nav-item">
              <a
                href={"/clusterKeywords/" + nuevaURL[4]}
                className="nav-link"
                style={{ color: "white" }}
              >
                <i className="nav-icon fas fa-bold"></i>
                <p>Clusters</p>
              </a>
            </li>
            <li className="nav-item">
              <a
                href={"/moduloKeywords/" + nuevaURL[4]}
                className="nav-link"
                style={{ color: "white" }}
              >
                <i className="nav-icon fas fa-bold"></i>
                <p>Modulos</p>
              </a>
            </li>
            <li className="nav-item">
              <a
                href={"/auditoria/" + nuevaURL[4]}
                className="nav-link"
                style={{ color: "white" }}
              >
                <i className="nav-icon fas fa-clipboard-list"></i>
                <p>Auditoria</p>
              </a>
            </li>
            <li className="nav-item">
              <a
                href={"/puntajes/" + nuevaURL[4]}
                className="nav-link"
                style={{ color: "white" }}
              >
                <i className="nav-icon fas fa-star-half-alt"></i>
                <p>Puntajes</p>
              </a>
            </li>
            <li className="nav-item">
              <a
                href={"/estadisticas/" + nuevaURL[4]}
                className="nav-link"
                style={{ color: "white" }}
              >
                <i className="nav-icon fas fa-chart-pie"></i>
                <p>Estadisticas</p>
              </a>
            </li>
            <li className="nav-item">
              <a
                href={"/consumo/" + nuevaURL[4]}
                className="nav-link"
                style={{ color: "white" }}
              >
                <i className="nav-icon far fa-chart-bar"></i>
                <p>Consumo</p>
              </a>
            </li>
            {/* {(() => {
              if (role === "Administrador" || role === "SuperAdministrador") {
                return (
                  <>
                    <li className="nav-item">
                      <a
                        href={"/consumo/" + nuevaURL[4]}
                        className="nav-link"
                        style={{ color: "white" }}
                      >
                        <i className="nav-icon far fa-chart-bar"></i>
                        <p>Consumo</p>
                      </a>
                    </li>
                  </>
                );
              }
            })()} */}
            {(() => {
              if (conversacion === "true" || role === "SuperAdministrador") {
                return (
                  <>
                    <li className="nav-item">
                      <a
                        href={"/conversacion/" + nuevaURL[4]}
                        className="nav-link"
                        style={{ color: "white" }}
                      >
                        <i className="fas fa-file-alt"></i>

                        <p> Conversación</p>
                      </a>
                    </li>
                  </>
                );
              }
            })()}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
