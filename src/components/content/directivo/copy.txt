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
                  <h1 className="m-0 text-dark">Tablero Directivo</h1>
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
                        <div className="col-lg-3">
                          <div className="card col-lg-12">
                            <h4 class=" text-center font-weight-bold">IGS</h4>
                            <img
                              class="card-img-top img-responsive"
                              src="https://w7.pngwing.com/pngs/270/122/png-transparent-corporation-business-brand-public-relations-subscribe-icon-public-relations-logo-business.png"
                              alt="cliente"
                              width="150"
                              height="150"
                            ></img>
                            <h5 className="text-center font-weight-bold">
                              Minutos
                            </h5>
                            <div>
                              <div className="row">
                                <div className="col">
                                  <h6 className="text-center font-weight-bold">
                                    Enero
                                  </h6>
                                  <h6 className="text-center font-weight-bold">
                                    247639
                                  </h6>
                                </div>
                                <div className="col">
                                  <h6
                                    className="text-center font-weight-bold"
                                    style={{ color: "#FF9B00" }}
                                  >
                                    Febrero
                                  </h6>
                                  <h6 className="text-center font-weight-bold">
                                    91648
                                  </h6>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <h6 className="text-center font-weight-bold">
                                    Ingresos Enero
                                  </h6>
                                  <h6 className="text-center font-weight-bold">
                                    4.952,74 $
                                  </h6>
                                </div>
                                <div className="col">
                                  <h6
                                    className="text-center font-weight-bold"
                                    style={{ color: "#FF9B00" }}
                                  >
                                    Ingresos Febrero
                                  </h6>
                                  <h6 className="text-center font-weight-bold">
                                    1.832,94 $
                                  </h6>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <p></p>
                                </div>
                                <div className="col">
                                  <h6 className="text-center font-weight-bold">
                                    Ejecución
                                  </h6>
                                  <h5 className="text-center font-weight-bold">
                                    37.0%
                                  </h5>
                                </div>
                              </div>
                            </div>
                            <a href="#" class="btn btn-warning">
                              Ingresar
                            </a>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="card col-lg-12">
                            <h4 class=" text-center font-weight-bold">BPOGS</h4>
                            <img
                              class="card-img-top "
                              src="https://w7.pngwing.com/pngs/270/122/png-transparent-corporation-business-brand-public-relations-subscribe-icon-public-relations-logo-business.png"
                              alt="cliente"
                              width="150"
                              height="150"
                            ></img>
                            <h5 className="text-center font-weight-bold">
                              Minutos
                            </h5>
                            <div>
                              <div className="row">
                                <div className="col">
                                  <h6 className="text-center font-weight-bold">
                                    Enero
                                  </h6>
                                  <h6 className="text-center font-weight-bold">
                                    247639
                                  </h6>
                                </div>
                                <div className="col">
                                  <h6
                                    className="text-center font-weight-bold"
                                    style={{ color: "#FF9B00" }}
                                  >
                                    Febrero
                                  </h6>
                                  <h6 className="text-center font-weight-bold">
                                    91648
                                  </h6>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <h6 className="text-center font-weight-bold">
                                    Ingresos Enero
                                  </h6>
                                  <h6 className="text-center font-weight-bold">
                                    4.952,74 $
                                  </h6>
                                </div>
                                <div className="col">
                                  <h6
                                    className="text-center font-weight-bold"
                                    style={{ color: "#FF9B00" }}
                                  >
                                    Ingresos Febrero
                                  </h6>
                                  <h6 className="text-center font-weight-bold">
                                    1.832,94 $
                                  </h6>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <p></p>
                                </div>
                                <div className="col">
                                  <h6 className="text-center font-weight-bold">
                                    Ejecución
                                  </h6>
                                  <h5 className="text-center font-weight-bold">
                                    37.0%
                                  </h5>
                                </div>
                              </div>
                            </div>
                            <a href="#" class="btn btn-warning">
                              Ingresar
                            </a>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="card col-lg-12">
                            <h4 class="text-center font-weight-bold">DEMO</h4>
                            <img
                              class="card-img-top img-responsive"
                              src="https://w7.pngwing.com/pngs/270/122/png-transparent-corporation-business-brand-public-relations-subscribe-icon-public-relations-logo-business.png"
                              alt="cliente"
                              width="150"
                              height="150"
                            ></img>
                            <h5 className="text-center font-weight-bold">
                              Minutos
                            </h5>
                            <div>
                              <div className="row">
                                <div className="col">
                                  <h6 className="text-center font-weight-bold">
                                    Enero
                                  </h6>
                                  <h6 className="text-center font-weight-bold">
                                    247639
                                  </h6>
                                </div>
                                <div className="col">
                                  <h6
                                    className="text-center font-weight-bold"
                                    style={{ color: "#FF9B00" }}
                                  >
                                    Febrero
                                  </h6>
                                  <h6 className="text-center font-weight-bold">
                                    91648
                                  </h6>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <h6 className="text-center font-weight-bold">
                                    Ingresos Enero
                                  </h6>
                                  <h6 className="text-center font-weight-bold">
                                    4.952,74 $
                                  </h6>
                                </div>
                                <div className="col">
                                  <h6
                                    className="text-center font-weight-bold"
                                    style={{ color: "#FF9B00" }}
                                  >
                                    Ingresos Febrero
                                  </h6>
                                  <h6 className="text-center font-weight-bold">
                                    1.832,94 $
                                  </h6>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <p></p>
                                </div>
                                <div className="col">
                                  <h6 className="text-center font-weight-bold">
                                    Ejecución
                                  </h6>
                                  <h5 className="text-center font-weight-bold">
                                    37.0%
                                  </h5>
                                </div>
                              </div>
                            </div>
                            <a href="#" class="btn btn-warning">
                              Ingresar
                            </a>
                          </div>
                        </div>
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
