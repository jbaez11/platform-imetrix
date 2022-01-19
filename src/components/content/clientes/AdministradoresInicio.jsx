import React from "react";
import { rutaAPI } from "../../../config/Config";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import SidebarSAdmin from "../../sidebar/SidebarSAdmin";

export default function AdministradoresInicio() {

    

    const [admins, setAdmins] = React.useState([]);

    React.useEffect(() => {
        obtenerAdmins();
    })

    const obtenerAdmins = async () =>{
        const data = await fetch(`${rutaAPI}/getAllAdmins`)
        const admins = await data.json();
        setAdmins(admins.data);
        /* console.log("Administradores", admins.data) */
    }

    const cambiarCurrentID = (id) =>{
        localStorage.setItem("ADMIN", id);
    }

    return(
        <div className="sidebar-mini">
        <div className="wrapper">
          <Header />
          <SidebarSAdmin/>
          <div className="content-wrapper" style={{ minHeight: "494px" }}>
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1 className="m-0 text-dark">Clientes Registrados</h1>
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
                        <div className="container">
                          <div className="row">
                            {admins.map((admin) =>{
                                return(
                                <div className="col-sm">
                                    <div
                                        style={{ width: "18rem" }}
                                        className="card text-center">
                                          <div className="card-body">
                                          <h5
                                            className=" text-center "
                                            style={{
                                              "text-transform": "uppercase",
                                            }}
                                          >
                                            {admin.nombres}
                                          </h5>
                                          <img
                                            className="card-img-top"
                                            width="150"
                                            height="150"
                                            alt="img"
                                          />
                                          <br />

                                          <a
                                            style={{ marginTop: "5px" }}
                                            href={`/inicio/${admin._id}`}
                                            className="btn btn-warning"
                                            onClick={()=> cambiarCurrentID(admin._id)}
                                            >
                                            Ingresar
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                )
                            })}
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
    )
}