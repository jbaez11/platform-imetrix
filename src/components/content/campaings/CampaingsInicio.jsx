import React from "react";
import { rutaAPI } from "../../../config/Config";

import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import SidebarCampaing from "../../sidebar/SidebarCampaing";

export default function CamaingsInicio() {
  const valores = window.location.href;
  let nuevaURL = valores.split("/");

  const [campaings, setCampaings] = React.useState([]);

  React.useEffect(() => {
    //console.log('useEffect');
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(`${rutaAPI}/getCampaing/${nuevaURL[4]}`);
    const camp = await data.json();
    /* console.log("camp.data", camp.data); */
    camp.data.forEach((campaing) => {
      let descompenerUrl = campaing.nombre.split(" ");
      //console.log("descompenerUrl", descompenerUrl);
      let lowerURL = "";
      let enviarUrl = "";
      descompenerUrl.forEach((element) => {
        // console.log("elem", element);
        lowerURL = element[0].toUpperCase() + element.slice(1).toLowerCase();
        enviarUrl = enviarUrl.concat(lowerURL);
        //console.log("enviarUrl", enviarUrl);
        campaing.Urltableros = enviarUrl;
        /* console.log("campaing.Urltableros=enviarUrl", campaing.Urltableros); */
      });
    });
    setCampaings(camp.data);
  };

  return (

    <div className="sidebar-mini">
      <div className="wrapper">
        <Header />
        <SidebarCampaing />
        <div className="content-wrapper" style={{ minHeight: "494px" }}>
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0 text-dark">Campañas</h1>
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
                          {campaings.map((campaing) => (
                            <div className="col-sm">
                              <div
                                style={{ width: "18rem" }}
                                className="card text-center"
                              >
                                <div className="card-body">
                                  <h5 className="text-center">
                                    {campaing.nombre}
                                  </h5>

                                  <img
                                    className="card-img-top"
                                    height="100"
                                    alt="img"
                                    src={
                                      rutaAPI +
                                      "/getImgCampaing/" +
                                      campaing.foto
                                    }
                                  />
                                  <br />
                                  <a
                                    href={`/agents/${nuevaURL[5]}${campaing.Urltableros}${campaing.pais}`}
                                    className="btn btn-warning"
                                  >
                                    Ingresar
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
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

