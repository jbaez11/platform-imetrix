import React, { useState } from "react";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import SidebarAdminCampaing from "../../sidebar/SidebarAdminCampaing";
//import { getDay, setMinutes } from "date-fns";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { DateRangePickerCalendar, START_DATE } from "react-nice-dates";
import "react-nice-dates/build/style.css";

import { rutaAPITableros } from "../../../config/Config";

export default function Conversacion() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focus, setFocus] = useState(START_DATE);
  const handleFocusChange = (newFocus) => {
    setFocus(newFocus || START_DATE);
  };

  const [showCalendar, setShowCalendar] = useState(true);
  const [sumTotalGrabaciones, setSumTotalGrabaciones] = useState(0);
  const [grabacionesNoPermitidas, setGrabacionesNoPermitidas] = useState(0);
  //activadores de tablas
  const [activeTabla1, setActiveTabla1] = useState(false);
  const [activeTabla2, setActiveTabla2] = useState(false);
  const [activeTabla3, setActiveTabla3] = useState(false);
  //ordenar tablas
  const [orderTabla1, setOrderTabla1] = useState("ASC");
  const [orderTabla2, setOrderTabla2] = useState("ASC");
  const [orderTabla3, setOrderTabla3] = useState("ASC");
  const sorting = (col) => {
    if (orderTabla1 === "ASC") {
      const sorted = [...agentes].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setTableAgentes(sorted);
      setAgentes(sorted);
      setOrderTabla1("DSC");
    }
    if (orderTabla1 === "DSC") {
      const sorted = [...agentes].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setTableAgentes(sorted);
      setAgentes(sorted);
      setOrderTabla1("ASC");
    }
  };

  const sortingNum = (col) => {
    //console.log("col", col);
    if (orderTabla1 === "ASC") {
      const sorted = [...agentes].sort((a, b) =>
        a.results[col] > b.results[col] ? 1 : -1
      );

      //console.log("sorted", sorted);
      setTableAgentes(sorted);
      setAgentes(sorted);
      setOrderTabla1("DSC");
    }
    if (orderTabla1 === "DSC") {
      const sorted = [...agentes].sort((a, b) =>
        a.results[col] < b.results[col] ? 1 : -1
      );
      setTableAgentes(sorted);
      setAgentes(sorted);
      setOrderTabla1("ASC");
    }
  };

  //organizar tabla 2
  const sorting2 = (col) => {
    if (orderTabla2 === "ASC") {
      const sorted = [...grabaciones].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      //console.log("sorted", sorted);
      setTableGrabaciones(sorted);
      setGrabaciones(sorted);
      setOrderTabla2("DSC");
    }
    if (orderTabla2 === "DSC") {
      const sorted = [...grabaciones].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      //console.log("sorted", sorted);
      setTableGrabaciones(sorted);
      setGrabaciones(sorted);
      setOrderTabla2("ASC");
    }
  };

  const sortingNum2 = (col) => {
    //console.log("col", col);
    if (orderTabla2 === "ASC") {
      const sorted = [...grabaciones].sort((a, b) =>
        a.results[col] > b.results[col] ? 1 : -1
      );

      //console.log("sorted", sorted);
      setTableGrabaciones(sorted);
      setGrabaciones(sorted);
      setOrderTabla2("DSC");
    }
    if (orderTabla2 === "DSC") {
      const sorted = [...grabaciones].sort((a, b) =>
        a.results[col] < b.results[col] ? 1 : -1
      );
      setTableGrabaciones(sorted);
      setGrabaciones(sorted);
      setOrderTabla2("ASC");
    }
  };
  //organizar tabla 3
  const sorting3 = (col) => {
    // console.log("col", col);
    if (orderTabla3 === "ASC") {
      const sorted = [...keywords].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      // console.log("sorted", sorted);
      setKeywords(sorted);

      setOrderTabla3("DSC");
    }
    if (orderTabla3 === "DSC") {
      const sorted = [...keywords].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      // console.log("sorted", sorted);
      setKeywords(sorted);

      setOrderTabla3("ASC");
    }
  };

  //    utilizadas en la primera tabla
  const [agentes, setAgentes] = useState([]);
  const [tableAgentes, setTableAgentes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [dataConsultada, setDataConsultada] = useState([]);

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

  function totalGrabaciones(grabaciones) {
    // console.log(grabaciones);
    let suma = 0;
    for (let i = 0; i < grabaciones.length; i++) {
      for (let key in grabaciones[i].recordingsSummary) {
        suma += grabaciones[i].recordingsSummary[key].length;
      }
    }
    /*  console.log("suma", suma); */
    setSumTotalGrabaciones(suma);
  }

  function tabla1(data) {
    setAgentes(data);
    setTableAgentes(data);
  }

  const tabla2 = async (name) => {
    // setGrabaciones([]);
    // setTableGrabaciones([]);
    let data = dataConsultada;

    console.log("auditoria", data);
    console.log("name", name);

    // let name = agenteSeleccionado;
    // console.log("agenteSeleccionado",agenteSeleccionado);
    for (let key in data) {
      if (key == name) {
        console.log("object", data[key]);
        setGrabaciones(data[key]);
        setTableGrabaciones(data[key]);
        //this.recordsConversations = data[key];
      }
    }

    /* console.log("recordsByCategory", recordsByCategory); */
  };

  const tabla3 = async (keyfile) => {
    const getKeywords = await getKeywordsData(keyfile);
    let data = getKeywords.data;
    console.log(keyfile);
    let conversations = data[0].conversation;
    console.log("mostrar conversations ", conversations);

    function secondsToTime(seconds) {
      return new Date(seconds * 1000).toISOString().substr(11, 11);
    }

    for (let i = 0; i < conversations.length; i++) {
      conversations[i].from = secondsToTime(conversations[i].from);
      conversations[i].to = secondsToTime(conversations[i].to);
    }

    /* console.log("keywordsArray", keywordsArray); */
    setKeywords(conversations);
  };

  const dataAuditoria = async (ini) => {
    if (!ini) {
      return;
    }

    let fechaInicialOriginal = new Date(ini).toISOString();
    let fechaInicial = fechaInicialOriginal.split("T");
    // let fechaFinalOriginal = new Date(fin).toISOString();
    // let fechaFinal = fechaFinalOriginal.split("T");
    const getConversacion = await getData(fechaInicial[0] + "T00:00:00.000Z");
    let conversacion = getConversacion.data;
    /* console.log("auditoria", auditoria); */

    totalGrabaciones(conversacion);

    setActiveTabla1(true);
    setDataConsultada(conversacion[0].recordingsSummary);
    tabla1(conversacion[0].agentsSummary);
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
                <h2 style={{ color: "#FF9B00"}}>
                  {localStorage.getItem("CAMPAING_ACTUAL")}
                </h2>
                <div className="col-sm-12">
                  <h3 className="ml-3 " style={{ color: "black" }}>
                    CONVERSACIONES 
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
                                  setActiveTabla1(false);
                                  filtrar("");
                                  filtrar2("");
                                  setBusqueda("");
                                  setAgentes([]);
                                  setGrabaciones([]);
                                  setKeywords([]);
                                  setSumTotalGrabaciones(0);
                                  setGrabacionesNoPermitidas(0);
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
                                className=""
                                style={{ color: "#FF9B00", fontSize: "250%" }}
                              >
                                {sumTotalGrabaciones}
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
                        <button
                          className="btn "
                          style={{ background: "#D3D3D3" }}
                        >
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
                          //setAgentes([])
                          setGrabaciones([]);
                          setKeywords([]);
                          setActiveTabla2(false);
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
                            <th
                              onClick={() => sorting("name")}
                              className="text-center"
                              scope="col"
                            >
                              NOMBRE
                              <i
                                className="fas fa-arrows-alt-v ml-1"
                                style={{ color: "black" }}
                              ></i>
                            </th>
                            <th
                              onClick={() => sortingNum("recordings")}
                              className="text-center"
                              scope="col"
                            >
                              GRABACIONES
                              <i
                                className="fas fa-arrows-alt-v ml-1"
                                style={{ color: "black" }}
                              ></i>
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
                                <button
                                  className="btn  btn-sm rounded-pill"
                                  onClick={() => {
                                    filtrar(agent.name);
                                    tabla2(agent.name);
                                    setActiveTabla2(true);
                                  }}
                                  style={{ background: "#D3D3D3" }}
                                >
                                  <i class="fas fa-arrow-right"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {/* </div> */}

                      {/* <!--Table2 -->                */}
                      <br />
                      <br />
                      <button
                        className="btn btn-warning btn-sm rounded-pill"
                        hidden={activeTabla2 ? false : true}
                        onClick={() => {
                          filtrar("");
                          setGrabaciones([]);
                          setKeywords([]);
                          setActiveTabla3(false);
                          setActiveTabla2(false);
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
                            <th onClick={() => sorting2("keyfile")}>
                              NOMBRE GRABACI??N
                              <i
                                className="fas fa-arrows-alt-v ml-1"
                                style={{ color: "black" }}
                              ></i>
                            </th>

                            <th>ACCION</th>
                          </tr>
                        </thead>
                        <tbody style={{ fontSize: "small" }}>
                          {grabaciones.map((grabacion) => (
                            <tr key={grabacion.keyfile}>
                              <td>{grabacion.keyfile}</td>

                              <td>
                                <button
                                  className="btn  btn-sm rounded-pill"
                                  onClick={() => {
                                    filtrar2(grabacion.keyfile);
                                    tabla3(grabacion.keyfile);
                                    setActiveTabla3(true);
                                  }}
                                  style={{ background: "#D3D3D3" }}
                                >
                                  <i class="fas fa-arrow-right"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {/* </div> */}
                      {/* end table 2 */}

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
                            <th onClick={() => sorting3("name")}>
                              INTERLOCUTOR
                              <i
                                className="fas fa-arrows-alt-v ml-1"
                                style={{ color: "black" }}
                              ></i>
                            </th>
                            <th onClick={() => sorting3("category")}>
                              TRANSCRIPCI??N
                              <i
                                className="fas fa-arrows-alt-v ml-1"
                                style={{ color: "black" }}
                              ></i>
                            </th>
                            <th onClick={() => sorting3("module")}>
                              DESDE
                              <i
                                className="fas fa-arrows-alt-v ml-1"
                                style={{ color: "black" }}
                              ></i>
                            </th>
                            <th onClick={() => sorting3("from")}>
                              HASTA
                              <i
                                className="fas fa-arrows-alt-v ml-1"
                                style={{ color: "black" }}
                              ></i>
                            </th>
                          </tr>
                        </thead>
                        <tbody style={{ fontSize: "small" }}>
                          {keywords.map((keyword, index) => (
                            <tr key={index}>
                              <td>{keyword.speaker}</td>
                              <td>{keyword.transcript}</td>
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

//peticion get para administradores

const getData = (fechaIni, fechaFinal) => {
  const valores = window.location.href;
  let nuevaURL = valores.split("/");
  // console.log("nuevaURL", nuevaURL);
  const url = `${rutaAPITableros}/${nuevaURL[4]}/auditconversations?eventDate=${fechaIni}`;
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

const getKeywordsData = (keyfile) => {
  const valores = window.location.href;
  let nuevaURL = valores.split("/");
  /* console.log("nuevaURL", nuevaURL); */
  const url = `${rutaAPITableros}/${nuevaURL[4]}/conversations?keyfile=${keyfile}`;
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
