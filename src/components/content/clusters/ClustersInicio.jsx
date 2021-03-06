import React, {useState} from "react";
import { rutaAPI } from "../../../config/Config";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import LoadingScreen from "../../loading_screen/LoadingScreen";
import Sidebar from "../../sidebar/Sidebar";

export default function Clusters() {
  const valores = window.location.href;
  let nuevaURL = valores.split("/");

  let role = localStorage.getItem("ROLE");

  /* Bloque para solicitar los clusters del Administrador */
  const [clusters, setClusters] = React.useState([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    //console.log('useEffect');
    obtenerDatos();
  }, []);

  /* Bloque para solicitar los clusters del Administrador */
  const obtenerDatos = async () => {
    const data = await fetch(`${rutaAPI}/getAdminClusters/${nuevaURL[4]}`);
    const clust = await data.json();
    setLoading(true)
    /* console.log("cluster", clust.data); */

    clust.data.forEach((cluster) => {
      /* console.log("cluster", cluster); */

      let descompenerUrl = cluster.nombre.split(" ");
      let lowerUrl = descompenerUrl[0].toLowerCase();

      if (descompenerUrl[1]) {
        /* console.log("descompenerUrl", descompenerUrl); */

        let secondUrl = descompenerUrl[1];
        let upperAndLowerUrl =
          secondUrl[0].toUpperCase() + secondUrl.slice(1).toLowerCase();
        let unirUrl = lowerUrl + upperAndLowerUrl;
        /* console.log("unirUrl", unirUrl) */;
        cluster.UrlCampaing = unirUrl;
      } else {
        cluster.UrlCampaing = lowerUrl;
      }
      //console.log("cluster url", cluster);
    });
    setClusters(clust.data);
  };

  /* ---------------------------------------------------------------------------- */

  /* Bloque solicitar los clusters del Usuario */
  const [clustersUser, setUserClusters] = React.useState([]);

  React.useEffect(() => {
    //console.log('useEffect');
    obtenerUserClusters();
  }, []);

  /* Obtiene los clusters del Usuario */
  const obtenerUserClusters = async () => {
    const data = await fetch(`${rutaAPI}/getCluster/${nuevaURL[4]}`);
    const clust = await data.json();
    setLoading(true)
    /* console.log("User Clusters", clust.data); */

    clust.data.forEach((cluster) => {
      /* console.log("cluster", cluster); */

      let descompenerUrl = cluster.nombre.split(" ");
      let lowerUrl = descompenerUrl[0].toLowerCase();

      if (descompenerUrl[1]) {
        /* console.log("descompenerUrl", descompenerUrl); */

        let secondUrl = descompenerUrl[1];
        let upperAndLowerUrl =
          secondUrl[0].toUpperCase() + secondUrl.slice(1).toLowerCase();
        let unirUrl = lowerUrl + upperAndLowerUrl;
        /* console.log("unirUrl", unirUrl); */
        cluster.UrlCampaing = unirUrl;
      } else {
        cluster.UrlCampaing = lowerUrl;
      }
    });
    setUserClusters(clust.data);
  };
  /* Bloque solicitar los clusters del Usuario */

  /* ---------------------------------------------------------------------------- */

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
                  <h1 className="m-0 text-dark">Clientes</h1>
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
                            <div className="card-header"></div>
                            <div className="card-body">
                              <div className="container">
                                <div className="row">
                                  {(() => {
                                    if (role === "Administrador" || role === "SuperAdministrador") {
                                      return (
                                        <>
                                          {clusters.map((cluster) => (
                                            <div className="col-sm">
                                              <div
                                                style={{ width: "18rem" }}
                                                className="card text-center"
                                              >
                                                <div className="card-body">
                                                  <h5
                                                    className=" text-center "
                                                    style={{
                                                      "text-transform": "uppercase",
                                                    }}
                                                  >
                                                    {cluster.nombre}
                                                  </h5>
                                                  <img
                                                    className="card-img-top"
                                                    width="150"
                                                    height="150"
                                                    alt="img"
                                                    src={
                                                      rutaAPI +
                                                      "/getImgCluster/" +
                                                      cluster.foto
                                                    }
                                                  />
                                                  <br />
        
                                                  {(() => {
                                                    if (role === "Administrador" || role === "SuperAdministrador") {
                                                      return (
                                                        <>
                                                          <a
                                                            style={{ marginTop: "5px" }}
                                                            href={`/campa??asinicio/${cluster._id}/${cluster.UrlCampaing}`}
                                                            className="btn btn-warning"
                                                          >
                                                            Ingresar
                                                          </a>
                                                        </>
                                                      );
                                                    }
                                                  })()}
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </>
                                      );
                                    } else if (role === "Auditor") {
                                      return (
                                        <>
                                          {clustersUser.map((cluster) => (
                                            <div class="col-sm">
                                              <div
                                                style={{ width: "18rem" }}
                                                className="card text-center"
                                              >
                                                <div className="card-body">
                                                  <h5
                                                    className=" text-center "
                                                    style={{
                                                      "text-transform": "uppercase",
                                                    }}
                                                  >
                                                    {cluster.nombre}
                                                  </h5>
                                                  <img
                                                    class="card-img-top"
                                                    width="150"
                                                    height="150"
                                                    alt="img"
                                                    src={
                                                      rutaAPI +
                                                      "/getImgCluster/" +
                                                      cluster.foto
                                                    }
                                                  />
                                                  <br />
        
                                                  {(() => {
                                                    if (role === "Auditor") {
                                                      return (
                                                        <>
                                                          <a
                                                            style={{ marginTop: "5px" }}
                                                            href={`/campa??asAuditor/${nuevaURL[4]}/${cluster._id}/${cluster.UrlCampaing}`}
                                                            className="btn btn-warning"
                                                          >
                                                            Ingresar
                                                          </a>
                                                        </>
                                                      );
                                                    }
                                                  })()}
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </>
                                      );
                                    }
                                  })()}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  : <LoadingScreen/>}

        </div>
        <Footer />
      </div>
    </div>
    
  );
}
