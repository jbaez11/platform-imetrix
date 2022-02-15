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
  const objectToCsv = (data) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));

    //console.log('headers',csvRows)

    for (const row of data) {
      const values = headers.map((header) => {
        const scaped = ("" + row[header]).replace(/"/g, '\\"');
        return `"${scaped}"`;
      });
      csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
  };
  const download = (data) => {
    const dataF = "\ufeff" + data;
    const hora =
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds();
    const blob = new Blob([dataF], {
      type: ' type: "text/csv;charset=UTF-8"',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "puntaje_por_keywords_" + hora + ".csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const getReport = async (ini, fin) => {
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
    const data = [];

    for (let i = 0; i < puntajes.length; i++) {
      let dataR = puntajes[i].recordingsSummary;
      for (const [key, value] of Object.entries(dataR)) {
        value.forEach((element) => {
          let dataSeparada = {
            Agente: key,
            Grabación: element.keyfile,
            "Porcentaje de la llamada":
              (element.results.totalScore * 100).toFixed(1) + "%",
          };

          data.push(dataSeparada);
        });
      }
    }

    const csvData = objectToCsv(data);
    download(csvData);
  };
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
  const [dataConsultada, setDataConsultada] = useState([]);

  //  end  utilizadas en la primera tabla
  //    utilizadas en la segunda tabla
  const [grabaciones, setGrabaciones] = useState([]);
  const [tableGrabaciones, setTableGrabaciones] = useState([]);

  //  end  utilizadas en la segunda tabla
  //    utilizadas en la TERCERA tabla
  const [keywords, setKeywords] = useState([]);
  const [tableKeywords, setTableKeywords] = useState([]);
  //ordenar tablas
  const [orderTabla1, setOrderTabla1] = useState("ASC");
  const [orderTabla2, setOrderTabla2] = useState("ASC");
  const [orderTabla3, setOrderTabla3] = useState("ASC");

  const sorting = (col) => {
    if (orderTabla1 === "ASC") {
      const sorted = [...agentes].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      //console.log("sorted", sorted);
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
    // console.log("col", col);
    if (orderTabla2 === "ASC") {
      const sorted = [...grabaciones].sort((a, b) =>
        a.results[col] > b.results[col] ? 1 : -1
      );

      // console.log("sorted", sorted);
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
  const sortingNum3 = (col) => {
    // console.log("col", col);
    if (orderTabla3 === "ASC") {
      const sorted = [...keywords].sort((a, b) =>
        a.results[col] > b.results[col] ? 1 : -1
      );

      // console.log("sorted", sorted);
      setKeywords(sorted);
      setOrderTabla3("DSC");
    }
    if (orderTabla3 === "DSC") {
      const sorted = [...keywords].sort((a, b) =>
        a.results[col] < b.results[col] ? 1 : -1
      );
      setKeywords(sorted);
      setOrderTabla3("ASC");
    }
  };

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
    console.log("dataaa", data);
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
    //console.log("cabeceras object", cabeceras);
    let cabecerasArray = [];

    cabeceras.forEach((cabecera) => {
      cabecerasArray.push(cabecera.name);
    });
    let cabecerasArray2 = [];
    cabecerasArray.forEach((element) => {
      //console.log("element", element.toString());
      if (element.toString() !== "recomendación") {
        if (element.toString() !== "recomendacion") {
          if (element.toString() !== "nopermitida") {
            if (element.toString() !== "no permitida") {
              // console.log("elemen2t", element);
              cabecerasArray2.push(element);
            }
          }
        }
      }
    });
    setCabecerasMostrar(cabecerasArray2);
    console.log("cabecerasArray2", cabecerasArray2);
    tabla2(cabecerasArray2, name);
  };

  const tabla2 = async (cabeceras, name) => {
    console.log("agentes", dataConsultada);
    setGrabaciones([]);
    setTableGrabaciones([]);

    let data = dataConsultada;

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

    setGrabaciones(recordScoreByKeywords);
    setTableGrabaciones(recordScoreByKeywords);
    //console.log("grabaciones", recordScoreByKeywords);
  };

  const tabla3 = async (keyfile) => {
    console.log("keyfiel", keyfile);
    const getKeywords = await getKeywordsData(keyfile);

    let data = getKeywords.data;
    let contents = data[0].contents;
    let scoringArray = [];
    let id = 0;
    for (let moduleKey in contents) {
      for (let clusterKey in contents[moduleKey]) {
        let kp = contents[moduleKey][clusterKey].results;
        let kpStrings = kp.join(", ");
        let clusterPackage = {
          id: id,
          module: moduleKey,
          cluster: clusterKey,
          score: contents[moduleKey][clusterKey].score * 100,
          results: kpStrings,
        };

        scoringArray.push(clusterPackage);
        id++;
      }

      console.log(scoringArray);
    }
    setKeywords(scoringArray);
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
    setDataConsultada(puntajes);
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
                              <button
                                className="btn  ml-4"
                                onClick={() => getReport(startDate, endDate)}
                                style={{ background: "#D3D3D3" }}
                              >
                                Descargar
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
                            <th
                              className="text-center"
                              scope="col"
                              onClick={() => sorting("name")}
                            >
                              NOMBRE
                              <i
                                className="fas fa-arrows-alt-v ml-1"
                                style={{ color: "black" }}
                              ></i>
                            </th>
                            <th
                              className="text-center"
                              scope="col"
                              onClick={() => sortingNum("nrecordings")}
                            >
                              GRABACIONES
                              <i
                                className="fas fa-arrows-alt-v ml-1"
                                style={{ color: "black" }}
                              ></i>
                            </th>
                            <th
                              className="text-center"
                              scope="col"
                              onClick={() => sortingNum("totalScore")}
                            >
                              PUNTAJE PROMEDIO
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
                                {agent.results.totalScore.toFixed(1)} %
                              </td>

                              <td className="text-center">
                                <button
                                  className="btn  btn-sm rounded-pill"
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
                            <th
                              className="text-center"
                              scope="col"
                              onClick={() => sorting2("keyfile")}
                            >
                              NOMBRE GRABACION
                              <i
                                className="fas fa-arrows-alt-v ml-1"
                                style={{ color: "black" }}
                              ></i>
                            </th>
                            {cabecerasMostrar.map((cabecera, index) => (
                              <th
                                key={index}
                                className="text-uppercase"
                                onClick={() => sortingNum2(cabecera)}
                              >
                                {cabecera}
                                <i
                                  className="fas fa-arrows-alt-v ml-1"
                                  style={{ color: "black" }}
                                ></i>
                              </th>
                            ))}

                            <th
                              className="text-center"
                              scope="col"
                              onClick={() => sortingNum2("totalScore")}
                            >
                              PUNTAJE
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
                          {grabaciones.map((grabacion, index) => (
                            <tr key={index}>
                              <td>{grabacion.keyfile}</td>
                              {cabecerasMostrar.map((c, index) => (
                                <td key={index} className="text-center">
                                  {grabacion.results[c].toFixed(1)} %
                                </td>
                              ))}
                              <td>
                                {grabacion.results.totalScore.toFixed(1)} %
                              </td>
                              <td className="text-center">
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
                            <th onClick={() => sorting3("module")}>
                              MODULO
                              <i
                                className="fas fa-arrows-alt-v ml-1"
                                style={{ color: "black" }}
                              ></i>
                            </th>
                            <th onClick={() => sorting3("cluster")}>
                              CLUSTER
                              <i
                                className="fas fa-arrows-alt-v ml-1"
                                style={{ color: "black" }}
                              ></i>
                            </th>
                            <th onClick={() => sortingNum3("score")}>
                              PUNTAJE
                              <i
                                className="fas fa-arrows-alt-v ml-1"
                                style={{ color: "black" }}
                              ></i>
                            </th>
                            <th onClick={() => sorting3("results")}>
                              KEYWORDS
                              <i
                                className="fas fa-arrows-alt-v ml-1"
                                style={{ color: "black" }}
                              ></i>
                            </th>
                          </tr>
                        </thead>
                        <tbody style={{ fontSize: "small" }}>
                          {keywords.map((keyword) => (
                            <tr key={keyword.id}>
                              <td>{keyword.module}</td>
                              <td>{keyword.cluster}</td>
                              <td>{keyword.score.toFixed(1)} %</td>
                              <td>{keyword.results}</td>
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
  const url = `${rutaAPITableros}/${nuevaURL[4]}/scoringkeywords?keyfile=${keyfile}`;
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
