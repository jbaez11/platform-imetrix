import React from "react";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import SidebarSAdmin from "../../sidebar/SidebarSAdmin";

import { rutaAPITableros } from "../../../config/Config";

export default function Agents() {
  return (
    <div className="sidebar-mini">
      <div className="wrapper">
        <Header />
        <SidebarSAdmin />
        <div className="content-wrapper" style={{ minHeight: "494px" }}>
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-12">
                  {/* <h1 className="m-0 text-dark">Tablero Directivo</h1> */}
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card card-warning card-outline">
                    <div className="card-header"></div>
                    <div className="card-body">
                      <div className="row">
                        <iframe
                          style={{
                            height: "900px",

                            width: "100%",
                          }}
                          src="https://front-tableros.azurewebsites.net/tablerodirectivotablerodirectivoprivate1230"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

//peticion get para administradores
