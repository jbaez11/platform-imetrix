import React, { useState } from "react";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import SidebarAdminCampaing from "../../sidebar/SidebarAdminCampaing";
import { rutaAPITableros } from "../../../config/Config";

//import { getDay, setMinutes } from "date-fns";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { DateRangePickerCalendar, START_DATE } from "react-nice-dates";
import "react-nice-dates/build/style.css";

export default function Puntajes() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focus, setFocus] = useState(START_DATE);
  const handleFocusChange = (newFocus) => {
    setFocus(newFocus || START_DATE);
  };

  const [showCalendar, setShowCalendar] = useState(true);

  const [sumTotalGrabaciones, setSumTotalGrabaciones] = useState(0);
  const [porcentajeGeneral, setPorcentajeGeneral] = useState(0);
  //    utilizadas en la primera tabla
  const [agentes, setAgentes] = useState([]);
  const [tableAgentes, setTableAgentes] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  //  end  utilizadas en la primera tabla
  //    utilizadas en la segunda tabla
  const [grabaciones, setGrabaciones] = useState([]);
  const [tableGrabaciones, setTableGrabaciones] = useState([]);

  //  end  utilizadas en la segunda tabla
  //    utilizadas en la TERCERA tabla
  const [keywords, setKeywords] = useState([]);

  //  end  utilizadas en la TERCERA tabla
  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    var resultadoBusqueda = tableAgentes.filter((elemento) => {
      if (
        elemento.name
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.name
          .toString()
          .toUpperCase()
          .includes(terminoBusqueda.toUpperCase())
      ) {
        return elemento;
      }
    });

    setAgentes(resultadoBusqueda);
  };

  const filtrar2 = (terminoBusqueda) => {
    var resultadoBusqueda = tableGrabaciones.filter((elemento) => {
      if (
        elemento.keyfile
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.keyfile
          .toString()
          .toUpperCase()
          .includes(terminoBusqueda.toUpperCase())
      ) {
        return elemento;
      }
    });

    setGrabaciones(resultadoBusqueda);
  };

  function sumaTotalGrabaciones(data) {
    let suma = 0;
    for (let i = 0; i < data.length; i++) {
      for (let key in data[i].recordingsSummary) {
        suma += data[i].recordingsSummary[key].length;
      }
    }

    setSumTotalGrabaciones(suma);
  }

  const tabla1 = async (data) => {
    let sizeOfData = data.length;
    let superRecordingsSummary = {};
    for (let i = 0; i < sizeOfData; i++) {
      for (let key in data[i].recordingsSummary) {
        let agent = key;
        let recordinsPackage = data[i].recordingsSummary[agent];
        let realTotalScore = 0;
        let recordings = 0;
        for (let j = 0; j < recordinsPackage.length; j++) {
          realTotalScore += recordinsPackage[j].results.totalScore;
          recordings += 1;
        }

        if (!(agent in superRecordingsSummary)) {
          superRecordingsSummary[agent] = {
            results: {},
          };

          superRecordingsSummary[agent]["results"]["totalScore"] =
            realTotalScore;
          superRecordingsSummary[agent]["results"]["recordings"] = recordings;
        } else {
          superRecordingsSummary[agent]["results"]["totalScore"] +=
            realTotalScore;
          superRecordingsSummary[agent]["results"]["recordings"] += recordings;
        }
      }
    }
    let sumaPorcentajeGeneral = 0;
    let totalAgents = 0;
    for (let agent in superRecordingsSummary) {
      superRecordingsSummary[agent]["results"]["totalScore"] =
        (100 * superRecordingsSummary[agent]["results"]["totalScore"]) /
        superRecordingsSummary[agent]["results"]["recordings"];

      sumaPorcentajeGeneral +=
        superRecordingsSummary[agent]["results"]["totalScore"];
      totalAgents++;
    }

    setPorcentajeGeneral(sumaPorcentajeGeneral / totalAgents);
    let superRecordingsSummaryArray = [];

    for (let agent in superRecordingsSummary) {
      let agentPackage = {
        name: agent,
        results: superRecordingsSummary[agent].results,
      };

      superRecordingsSummaryArray.push(agentPackage);
    }

    setAgentes(superRecordingsSummaryArray);
    setTableAgentes(superRecordingsSummaryArray);
  };

  const obtenerCabeceras = async (ini, fin, name) => {
    const cabecerasData = await getDataModulos();
    //console.log("cabeceras", cabecerasData.data);
    let cabeceras = cabecerasData.data;
    let cabecerasArray = [];

    cabeceras.forEach((cabecera) => {
      cabecerasArray.push(cabecera.name);
    });
    setCabecerasMostrar(cabecerasArray);
    //console.log("cabecerasArray", );
    tabla2(ini, fin, cabecerasArray, name);
  };

  const tabla2 = async (ini, fin, cabeceras, name) => {
    let fechaInicialOriginal = new Date(ini).toISOString();
    let fechaInicial = fechaInicialOriginal.split("T");
    let fechaFinalOriginal = new Date(fin).toISOString();
    let fechaFinal = fechaFinalOriginal.split("T");
    const getPuntajes = await getData(
      fechaInicial[0] + "T00:00:00.000Z",
      fechaFinal[0] + "T00:00:00.000Z"
    );
    let data = getPuntajes.data;

    let recordScoreByKeywords = [];

    for (let i = 0; i < data.length; i++) {
      for (let key in data[i].recordingsSummary) {
        if (key === name) {
          for (let j = 0; j < data[i].recordingsSummary[key].length; j++) {
            data[i].recordingsSummary[key][j].results.cierre =
              data[i].recordingsSummary[key][j].results.cierre * 100;
            data[i].recordingsSummary[key][j].results.despedida =
              data[i].recordingsSummary[key][j].results.despedida * 100;
            data[i].recordingsSummary[key][j].results.producto =
              data[i].recordingsSummary[key][j].results.producto * 100;
            data[i].recordingsSummary[key][j].results.saludo =
              data[i].recordingsSummary[key][j].results.saludo * 100;
            data[i].recordingsSummary[key][j].results.totalScore =
              data[i].recordingsSummary[key][j].results.totalScore * 100;
            data[i].recordingsSummary[key][j].results.venta =
              data[i].recordingsSummary[key][j].results.venta * 100;
          }

          recordScoreByKeywords = recordScoreByKeywords.concat(
            data[i].recordingsSummary[key]
          );
        }
      }
    }
    setGrabaciones(recordScoreByKeywords);
  };

  const dataAuditoria = async (ini, fin) => {
    if (!ini || !fin) {
      return;
    }

    let fechaInicialOriginal = new Date(ini).toISOString();
    let fechaInicial = fechaInicialOriginal.split("T");
    let fechaFinalOriginal = new Date(fin).toISOString();
    let fechaFinal = fechaFinalOriginal.split("T");
    const getPuntajes = await getData(
      fechaInicial[0] + "T00:00:00.000Z",
      fechaFinal[0] + "T00:00:00.000Z"
    );
    let puntajes = getPuntajes.data;
    //console.log("puntajes", puntajes);
    sumaTotalGrabaciones(puntajes);
    tabla1(puntajes);
  };

  React.useEffect(() => {
    obtenerDatos();
  }, []);

  const [cabeceraMostrar, setCabeceraMostrar] = useState([]);
  const [cabecerasMostrar, setCabecerasMostrar] = useState([]);
  const [valoresMostrar, setValoresMostrar] = useState([]);

  function obtenerCabecera(data) {
    /* console.log("Data Inicial", data[0])
        console.log("Atributos", Object.keys(data[0]))
        console.log("Valores", Object.values(data[0])) */

    let cabeceras = Object.keys(data[0]);
    let valores = Object.values(data[0]);
    let trueCabeceras = [];
    let trueValores = [];
    for (let i = 0; i < cabeceras.length; i++) {
      if (
        !(
          cabeceras[i] === "_id" ||
          cabeceras[i] === "__v" ||
          cabeceras[i] === "createdAt"
        )
      ) {
        trueCabeceras.push(cabeceras[i]);
        trueValores.push(valores[i]);
      }
    }

    setCabeceraMostrar(trueCabeceras);
    setValoresMostrar(trueValores);
    //console.log("CabecerasFinales",trueCabeceras)
  }

  const obtenerDatos = async () => {
    const data = await fetch(`${rutaAPITableros}/igsSufiCO/getPruebas`);
    const prueba = await data.json();
    /* console.log("Pruebas",prueba.data); */
    obtenerCabecera(prueba.data);
  };

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
                  <h3 className="ml-3 " style={{ color: "#FF9B00" }}>
                    PUNTAJES{" "}
                    <span style={{ color: "#CACACA" }}>POR KEYWORD</span>{" "}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card card-primary card-outline">
                    <div className="card-header">
                      <h5 className="m-0">
                        <div className="container">
                          <div className="row">
                            <div className="col-sm">
                              <button
                                className="btn btn-warning btn-sm"
                                type="button"
                                onClick={() => {
                                  setShowCalendar(!showCalendar);
                                  dataAuditoria(startDate, endDate);
                                  filtrar("");
                                  filtrar2("");
                                  setBusqueda("");
                                  setAgentes([]);
                                  setSumTotalGrabaciones(0);
                                  setPorcentajeGeneral(0);
                                }}
                              >
                                <i class="far fa-calendar-alt"></i>
                                {showCalendar ? " seleccionar fecha" : " Ir "}
                              </button>

                              {showCalendar ? (
                                <div style={{ fontSize: "x-small" }}>
                                  <br />
                                  <p style={{ display: "inline" }}>
                                    {" "}
                                    {startDate
                                      ? format(startDate, "dd MMM yyyy", {
                                          locale: enGB,
                                        })
                                      : "Seleccione Fecha Inicial"}
                                    -
                                  </p>
                                  <p style={{ display: "inline" }}>
                                    {" "}
                                    {endDate
                                      ? format(endDate, "dd MMM yyyy", {
                                          locale: enGB,
                                        })
                                      : "Seleccione Fecha Final"}
                                  </p>
                                </div>
                              ) : (
                                <div
                                  style={{
                                    height: "450px",
                                    width: "300px",
                                    fontSize: "x-small",
                                  }}
                                >
                                  <br />
                                  <p style={{ display: "inline" }}>
                                    {" "}
                                    {startDate
                                      ? format(startDate, "dd MMM yyyy", {
                                          locale: enGB,
                                        })
                                      : "Seleccione Fecha Inicial"}
                                    -
                                  </p>
                                  <p style={{ display: "inline" }}>
                                    {" "}
                                    {endDate
                                      ? format(endDate, "dd MMM yyyy", {
                                          locale: enGB,
                                        })
                                      : "Seleccione Fecha Final"}
                                  </p>
                                  <DateRangePickerCalendar
                                    startDate={startDate}
                                    endDate={endDate}
                                    focus={focus}
                                    onStartDateChange={setStartDate}
                                    onEndDateChange={setEndDate}
                                    onFocusChange={handleFocusChange}
                                    locale={enGB}
                                  />
                                </div>
                              )}
                            </div>
                            <div className="col-sm text-center">
                              <h5 className="" style={{ color: "#FF9B00" }}>
                                TOTAL{" "}
                                <span style={{ color: "#CACACA" }}>
                                  GRABACIONES
                                </span>
                              </h5>

                              <span
                                className="text-center"
                                style={{ color: "#FF9B00", fontSize: "250%" }}
                              >
                                {sumTotalGrabaciones}
                              </span>
                            </div>
                            <div className="col-sm text-center">
                              <h5 className="" style={{ color: "#FF9B00" }}>
                                PORCENTAJE{" "}
                                <span style={{ color: "#CACACA" }}>
                                  {" "}
                                  GENERAL{" "}
                                </span>
                              </h5>
                              <span
                                className="text-center"
                                style={{ color: "#FF9B00", fontSize: "250%" }}
                              >
                                {porcentajeGeneral.toFixed(1)} %
                              </span>
                            </div>
                          </div>
                        </div>
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="containerInput">
                        <input
                          className="form-control inputBuscar"
                          type="text"
                          value={busqueda}
                          placeholder="Busqueda por Nombre"
                          onChange={handleChange}
                        />
                        <button className="btn btn-success">
                          <i class="fas fa-search-minus"></i>
                        </button>
                      </div>
                      <button
                        className="btn btn-warning btn-sm rounded-pill"
                        onClick={() => {
                          filtrar("");
                          filtrar2("");
                          setBusqueda("");
                          //setAgentes([])
                          //setGrabaciones([])
                          //setKeywords([])
                        }}
                      >
                        <i class="fas fa-arrow-left"></i> Volver
                      </button>
                      <br />
                      <br />

                      {/* <div className="table-responsive"> */}
                      <table className="table  table-borderless table-hover">
                        <thead
                          style={{
                            backgroundColor: "#CACACA",
                            color: "white",
                            fontSize: "small",
                          }}
                        >
                          <tr>
                            <th className="text-center" scope="col">
                              NOMBRE
                            </th>
                            <th className="text-center" scope="col">
                              GRABACIONES
                            </th>
                            <th className="text-center" scope="col">
                              PUNTAJE PROMEDIO
                            </th>
                            <th className="text-center" scope="col">
                              ACCION
                            </th>
                          </tr>
                        </thead>
                        <tbody style={{ fontSize: "small" }}>
                          {agentes.map((agent) => (
                            <tr key={agent.name}>
                              <td>{agent.name}</td>
                              <td className="text-center">
                                {agent.results.recordings}
                              </td>
                              <td className="text-center">
                                {agent.results.totalScore.toFixed(1)}
                              </td>

                              <td className="text-center">
                                <button
                                  className="btn btn-success btn-sm rounded-pill"
                                  onClick={() => {
                                    filtrar(agent.name);
                                    obtenerCabeceras(
                                      startDate,
                                      endDate,
                                      agent.name
                                    );
                                    //tabla2(startDate, endDate, agent.name);
                                  }}
                                >
                                  Ver mas...
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {/* </div> */}

                      {/**TAbla 2 */}
                      <button
                        className="btn btn-warning btn-sm rounded-pill"
                        onClick={() => {
                          filtrar("");
                          filtrar2("");
                          setBusqueda("");
                          //setAgentes([])
                          //setGrabaciones([])
                          //setKeywords([])
                        }}
                      >
                        <i class="fas fa-arrow-left"></i> Volver
                      </button>
                      <br />
                      <br />

                      {/* <div className="table-responsive"> */}
                      <table className="table  table-borderless table-hover">
                        <thead
                          style={{
                            backgroundColor: "#CACACA",
                            color: "white",
                            fontSize: "small",
                          }}
                        >
                          <tr>
                            <th className="text-center" scope="col">
                              NOMBRE GRABACION
                            </th>
                            {cabecerasMostrar.map((cabecera) => (
                              <th className="text-uppercase">{cabecera}</th>
                            ))}

                            <th className="text-center" scope="col">
                              PUNTAJE
                            </th>
                            <th className="text-center" scope="col">
                              ACCION
                            </th>
                          </tr>
                        </thead>
                        <tbody style={{ fontSize: "small" }}>
                          {grabaciones.map((grabacion) => (
                            <tr key={grabacion.keyfile}>
                              <td>{grabacion.keyfile}</td>
                              <td className="text-center">
                                {grabacion.results.saludo.toFixed(1)}
                              </td>
                              <td className="text-center">
                                {grabacion.results.producto.toFixed(1)}
                              </td>
                              <td className="text-center">
                                {grabacion.results.venta.toFixed(1)}
                              </td>
                              <td className="text-center">
                                {grabacion.results.cierre.toFixed(1)}
                              </td>
                              <td className="text-center">
                                {grabacion.results.despedida.toFixed(1)}
                              </td>
                              <td className="text-center">
                                {grabacion.results.totalScore.toFixed(1)}
                              </td>

                              <td className="text-center">
                                <button
                                  className="btn btn-success btn-sm rounded-pill"
                                  onClick={() => {
                                    filtrar2(grabacion.keyfile);
                                    //tabla2(startDate,endDate,agent.name)
                                  }}
                                >
                                  Ver mas...
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {/**Tabla 2 end */}

                      <table className="table table-dark table-hover">
                        <thead>
                          <tr>
                            {cabeceraMostrar.map((cabecera, index) => (
                              <>
                                <td>{cabecera} </td>
                              </>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {valoresMostrar.map((valor, index) => (
                              <>
                                <td>{valor} </td>
                              </>
                            ))}
                          </tr>
                        </tbody>
                      </table>
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

const getData = (fechaIni, fechaFinal) => {
  const valores = window.location.href;
  let nuevaURL = valores.split("/");
  //console.log("nuevaURL", nuevaURL);
  const url = `${rutaAPITableros}/${nuevaURL[4]}/auditscoringkeywords?eventDate=${fechaIni}&eventDate=${fechaFinal}`;
  const token = localStorage.getItem("ACCESS_TOKEN");
  const params = {
    method: "GET",
    headers: {
      Authorization: token,
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

const getDataModulos = () => {
  const valores = window.location.href;
  let nuevaURL = valores.split("/");

  const url = `${rutaAPITableros}/${nuevaURL[4]}/getModulos`;
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
