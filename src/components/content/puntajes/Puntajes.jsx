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
  //activadores de tablas
  const [activeTabla1, setActiveTabla1] = useState(false);
  const [activeTabla2, setActiveTabla2] = useState(false);
  const [activeTabla3, setActiveTabla3] = useState(false);

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
  const [tableKeywords, setTableKeywords] = useState([]);

  //  end  utilizadas en la TERCERA tabla
  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
    setActiveTabla2(false);
    setActiveTabla3(false);
    setKeywords([]);
    setGrabaciones([]);
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
    console.log("cabeceras object", cabeceras);
    let cabecerasArray = [];

    cabeceras.forEach((cabecera) => {
      cabecerasArray.push(cabecera.name);
    });
    setCabecerasMostrar(cabecerasArray);
    //console.log("cabecerasArray", );
    tabla2(ini, fin, cabecerasArray, name);
  };

  const tabla2 = async (ini, fin, cabeceras, name) => {
    console.log("cabeceras", cabeceras);
    let fechaInicialOriginal = new Date(ini).toISOString();
    let fechaInicial = fechaInicialOriginal.split("T");
    let fechaFinalOriginal = new Date(fin).toISOString();
    let fechaFinal = fechaFinalOriginal.split("T");
    const getPuntajes = await getData(
      fechaInicial[0] + "T00:00:00.000Z",
      fechaFinal[0] + "T00:00:00.000Z"
    );
    let data = getPuntajes.data;
    //console.log("data", data);

    let recordScoreByKeywords = [];
    //console.log("cabeceras[0]", cabeceras[0]);
    for (let i = 0; i < data.length; i++) {
      //console.log("data.length", data.length);
      for (let agent in data[i].recordingsSummary) {
        if (agent === name) {
          for (
            let keyfile = 0;
            keyfile < data[i].recordingsSummary[agent].length;
            keyfile++
          ) {
            //console.log("agent", agent);
            for (let k = 0; k < cabeceras.length; k++) {
              let modulo = cabeceras[k];
              data[i].recordingsSummary[agent][keyfile].results[modulo] *= 100;

              //data[i].recordingsSummary[agent].results.cabeceras[k]=data[i].recordingsSummary[agent].results.cabeceras[k]*100
            }
            data[i].recordingsSummary[agent][keyfile].results.totalScore *= 100;
            /* data[i].recordingsSummary[agent][keyfile].results.totalScore *
              100; */
          }

          recordScoreByKeywords = recordScoreByKeywords.concat(
            data[i].recordingsSummary[agent]
          );
        }
      }
    }

    /*  setGrabaciones(["keyfile", "10", "22", "23", "45", "50", "7", "8", "9"]);
    setTableGrabaciones([
      "keyfile",
      "10",
      "22",
      "23",
      "45",
      "50",
      "7",
      "8",
      "9",
    ]); */
    //console.log("grabdhjfkf", grabaciones);
    setGrabaciones(recordScoreByKeywords);
    setTableGrabaciones(recordScoreByKeywords);
    console.log("grabaciones", recordScoreByKeywords);
  };

  const tabla3 = async (keyfile) => {
    const getKeywords = await getKeywordsData(keyfile);
    let data = getKeywords.data;
    //console.log("data", data);
    function secondsToTime(seconds) {
      return new Date(seconds * 1000).toISOString().substr(11, 11);
    }

    //console.log("keyfile", keyfile);
    let keywords = data[0].contents;
    let keywordsArray = [];
    let id = 0;
    for (let key in keywords) {
      for (let i = 0; i < keywords[key].results.length; i++) {
        //console.log("mostrar", keywords[key].results[i]);
        id++;
        let keywordPackage = {
          id: id + key,
          name: key,
          module: keywords[key].clasification.module,
          category: keywords[key].clasification.category,
        };
        keywords[key].results[i]["from"] = secondsToTime(
          keywords[key].results[i]["from"]
        );
        keywords[key].results[i]["to"] = secondsToTime(
          keywords[key].results[i]["to"]
        );
        keywordPackage["speaker"] = keywords[key].results[i]["speaker"];
        keywordPackage["from"] = keywords[key].results[i]["from"];
        keywordPackage["to"] = keywords[key].results[i]["to"];
        keywordPackage["confidence"] = keywords[key].results[i]["confidence"];
        //console.log("package", keywordPackage);
        keywordsArray.push(keywordPackage);
      }
      if (keywords[key].results.length == 0) {
        let keywordPackage = {
          id: id + key,
          name: key,
          module: keywords[key].clasification.module,
          category: keywords[key].clasification.category,
        };
        keywordPackage["speaker"] = "-";
        keywordPackage["from"] = "-";
        keywordPackage["to"] = "-";
        keywordPackage["confidence"] = "-";
        //console.log("keywordsPackage", keywordPackage);
        keywordsArray.push(keywordPackage);
      }
      //id++;
    }
    //console.log("keywordsArray", keywordsArray);
    let keywordsFound = [];
    let keywordsNotFound = [];
    for (let i = 0; i < keywordsArray.length; i++) {
      if (keywordsArray[i].speaker !== "-") {
        keywordsFound.push(keywordsArray[i]);
      } else {
        keywordsNotFound.push(keywordsArray[i]);
      }
    }
    keywordsArray = keywordsFound.concat(keywordsNotFound);
    //console.log("keywordArray", keywordsArray);
    setKeywords(keywordsArray);
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

  const [cabecerasMostrar, setCabecerasMostrar] = useState([]);

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
                  <div className="card card-warning card-outline">
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
                                  setActiveTabla1(true);
                                  setActiveTabla2(false);
                                  setActiveTabla3(false);
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
                        hidden={activeTabla1 ? false : true}
                        onClick={() => {
                          filtrar("");
                          filtrar2("");
                          setBusqueda("");

                          setActiveTabla2(false);
                          setActiveTabla3(false);
                          setGrabaciones([]);
                          //setAgentes([]);
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
                      <table
                        className="table  table-borderless table-hover"
                        hidden={activeTabla1 ? false : true}
                      >
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
                                {agent.results.totalScore.toFixed(1)} %
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

                                    setActiveTabla2(true);

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
                        hidden={activeTabla2 ? false : true}
                        onClick={() => {
                          filtrar("");
                          filtrar2("");
                          setBusqueda("");
                          setActiveTabla2(false);
                          setActiveTabla3(false);
                          //setAgentes([])
                          setGrabaciones([]);
                          setKeywords([]);
                        }}
                      >
                        <i class="fas fa-arrow-left"></i> Volver
                      </button>
                      <br />
                      <br />

                      {/* <div className="table-responsive"> */}

                      <table
                        className="table  table-borderless table-hover"
                        hidden={activeTabla2 ? false : true}
                      >
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
                          {grabaciones.map((grabacion, index) => (
                            <tr /* key={grabacion} */>
                              <td>{grabacion.keyfile}</td>
                              {cabecerasMostrar.map((c) => (
                                <td className="text-center">
                                  {grabacion.results[c].toFixed(1)} %
                                </td>
                              ))}
                              <td>
                                {grabacion.results.totalScore.toFixed(1)} %
                              </td>
                              <td className="text-center">
                                <button
                                  className="btn btn-success btn-sm rounded-pill"
                                  onClick={() => {
                                    filtrar2(grabacion.keyfile);
                                    tabla3(grabacion.keyfile);
                                    setActiveTabla3(true);
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

                      {/* <!--Table3 -->                */}
                      <br />
                      <br />
                      <button
                        className="btn btn-warning btn-sm rounded-pill"
                        hidden={activeTabla3 ? false : true}
                        onClick={() => {
                          filtrar2("");
                          setKeywords([]);

                          setActiveTabla3(false);
                        }}
                      >
                        <i class="fas fa-arrow-left"></i> Volver
                      </button>
                      <br />
                      <br />
                      {/* <div className="table-responsive"> */}
                      <table
                        className="table  table-borderless table-hover"
                        hidden={activeTabla3 ? false : true}
                      >
                        <thead
                          style={{
                            backgroundColor: "#CACACA",
                            color: "white",
                            fontSize: "small",
                          }}
                        >
                          <tr>
                            <th>KEYWORD</th>
                            <th>CATEGORIA</th>
                            <th>MODULO</th>
                            <th>DESDE</th>
                            <th>HASTA</th>
                          </tr>
                        </thead>
                        <tbody style={{ fontSize: "small" }}>
                          {keywords.map((keyword) => (
                            <tr key={keyword.name}>
                              <td>{keyword.name}</td>
                              <td>{keyword.category}</td>
                              <td>{keyword.module}</td>
                              <td>{keyword.from}</td>
                              <td>{keyword.to}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {/* </div> */}
                      {/* end table 3 */}
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
const getKeywordsData = (keyfile) => {
  const valores = window.location.href;
  let nuevaURL = valores.split("/");
  //console.log("nuevaURL", nuevaURL);
  const url = `${rutaAPITableros}/${nuevaURL[4]}/keywords?keyfile=${keyfile}`;
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
