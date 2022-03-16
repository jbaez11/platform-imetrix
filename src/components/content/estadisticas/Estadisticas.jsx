import React, { useState } from "react";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import SidebarAdminCampaing from "../../sidebar/SidebarAdminCampaing";
import LoadingScreen from "../../loading_screen/LoadingScreen";
//import { getDay, setMinutes } from "date-fns";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { DateRangePickerCalendar, START_DATE } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import { rutaAPITableros } from "../../../config/Config";

export default function Estadisticas() {
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
  const [activeTabla4, setActiveTabla4] = useState(false);
  const [activeTabla5, setActiveTabla5] = useState(false);
  const [activeButton1, setActiveButton1] = useState(true);
  const [activeButton2, setActiveButton2] = useState(true);
  const [loading, setLoading] = useState(false);
  
  //    utilizadas en la primera tabla
  const [modulosAndClusters, setModulosAndClusters] = useState([]);
  const [tableModulosAndClusters, setTableModulosAndClusters] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  //  end  utilizadas en la primera tabla
  //    utilizadas en la segunda tabla encontradas
  const [encontradas, setEncontradas] = useState([]);

  //  end  utilizadas en la segunda tabla
  //    utilizadas en la TERCERA tabla no encontradas
  const [noencontradas, setNoencontradas] = useState([]);
  const [tableNoencontradas, setTableNoencontradas] = useState([]);
  //  end  utilizadas en la TERCERA tabla
  //    utilizadas en la cuarta tabla no encontradas
  const [grabaciones, setGrabaciones] = useState([]);
  const [selectedModulos, setSelectedModulos] = useState("");
  const [selectedClusters, setSelectedClusters] = useState([]);
  const [tableGrabaciones, setTableGrabaciones] = useState([]);
  //  end  utilizadas en la cuarta tabla
  const [keywords, setKeywords] = useState([]);

  //ordenar tablas
  const [orderTabla1, setOrderTabla1] = useState("ASC");
  const [orderTabla2, setOrderTabla2] = useState("ASC");
  const [orderTabla3, setOrderTabla3] = useState("ASC");
  const [orderTabla4, setOrderTabla4] = useState("ASC");
  const [orderTabla5, setOrderTabla5] = useState("ASC");

  const sorting = (col) => {
    if (orderTabla1 === "ASC") {
      const sorted = [...modulosAndClusters].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      //console.log("sorted", sorted);
      setModulosAndClusters(sorted);
      setTableModulosAndClusters(sorted);
      setOrderTabla1("DSC");
    }
    if (orderTabla1 === "DSC") {
      const sorted = [...modulosAndClusters].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setModulosAndClusters(sorted);
      setTableModulosAndClusters(sorted);
      setOrderTabla1("ASC");
    }
  };

  const sortingNum = (col) => {
    //console.log("col", col);
    if (orderTabla1 === "ASC") {
      const sorted = [...modulosAndClusters].sort((a, b) =>
        a[col] > b[col] ? 1 : -1
      );

      //console.log("sorted", sorted);
      setTableModulosAndClusters(sorted);
      setModulosAndClusters(sorted);
      setOrderTabla1("DSC");
    }
    if (orderTabla1 === "DSC") {
      const sorted = [...modulosAndClusters].sort((a, b) =>
        a[col] < b[col] ? 1 : -1
      );
      setTableModulosAndClusters(sorted);
      setModulosAndClusters(sorted);
      setOrderTabla1("ASC");
    }
  };
  const sorting5 = (col) => {
    if (orderTabla5 === "ASC") {
      const sorted = [...encontradas].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      console.log("sorted", sorted);
      setEncontradas(sorted);

      setOrderTabla5("DSC");
    }
    if (orderTabla5 === "DSC") {
      const sorted = [...encontradas].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setEncontradas(sorted);

      setOrderTabla5("ASC");
    }
  };

  const sortingNum5 = (col) => {
    //console.log("col", col);
    if (orderTabla5 === "ASC") {
      const sorted = [...encontradas].sort((a, b) =>
        a[col] > b[col] ? 1 : -1
      );

      //console.log("sorted", sorted);

      setEncontradas(sorted);
      setOrderTabla5("DSC");
    }
    if (orderTabla5 === "DSC") {
      const sorted = [...encontradas].sort((a, b) =>
        a[col] < b[col] ? 1 : -1
      );

      setEncontradas(sorted);
      setOrderTabla5("ASC");
    }
  };
  const sorting2 = (col) => {
    if (orderTabla2 === "ASC") {
      const sorted = [...noencontradas].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      //console.log("sorted", sorted);
      setNoencontradas(sorted);
      setTableNoencontradas(sorted);
      setOrderTabla2("DSC");
    }
    if (orderTabla2 === "DSC") {
      const sorted = [...noencontradas].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setNoencontradas(sorted);
      setTableNoencontradas(sorted);
      setOrderTabla2("ASC");
    }
  };

  const sorting3 = (col) => {
    if (orderTabla3 === "ASC") {
      const sorted = [...grabaciones].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      //console.log("sorted", sorted);
      setGrabaciones(sorted);
      setTableGrabaciones(sorted);
      setOrderTabla3("DSC");
    }
    if (orderTabla3 === "DSC") {
      const sorted = [...grabaciones].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setGrabaciones(sorted);
      setTableGrabaciones(sorted);
      setOrderTabla3("ASC");
    }
  };
  //organizar tabla 4
  const sorting4 = (col) => {
    // console.log("col", col);
    if (orderTabla4 === "ASC") {
      const sorted = [...keywords].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      // console.log("sorted", sorted);
      setKeywords(sorted);

      setOrderTabla4("DSC");
    }
    if (orderTabla4 === "DSC") {
      const sorted = [...keywords].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      // console.log("sorted", sorted);
      setKeywords(sorted);

      setOrderTabla4("ASC");
    }
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    var resultadoBusqueda = tableModulosAndClusters.filter((elemento) => {
      if (
        elemento.cluster
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.cluster
          .toString()
          .toUpperCase()
          .includes(terminoBusqueda.toUpperCase())
      ) {
        return elemento;
      }
    });

    setModulosAndClusters(resultadoBusqueda);
  };

  const filtrar2 = (terminoBusqueda) => {
    var resultadoBusqueda = tableNoencontradas.filter((elemento) => {
      if (
        elemento.agent
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.agent
          .toString()
          .toUpperCase()
          .includes(terminoBusqueda.toUpperCase())
      ) {
        return elemento;
      }
    });

    setNoencontradas(resultadoBusqueda);
  };

  const filtrar3 = (terminoBusqueda) => {
    var resultadoBusqueda = tableGrabaciones.filter((elemento) => {
      if (
        elemento.records
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.records
          .toString()
          .toUpperCase()
          .includes(terminoBusqueda.toUpperCase())
      ) {
        return elemento;
      }
    });

    setGrabaciones(resultadoBusqueda);
  };

  function tabla1(data) {
    let superModuloandClusterArray = [];
    let superModuloandClusterDicc = {};

    for (let i = 0; i < data.length; i++) {
      for (let modulo in data[i].contents) {
        for (let cluster in data[i].contents[modulo]) {
          let key = JSON.stringify([modulo, cluster]);
          if (!(key in superModuloandClusterDicc)) {
            superModuloandClusterDicc[key] = {
              positive: data[i].contents[modulo][cluster].positive.percentage,
              negative: data[i].contents[modulo][cluster].negative.percentage,
            };
          } else {
            superModuloandClusterDicc[key]["positive"] +=
              data[i].contents[modulo][cluster].positive.percentage;
            superModuloandClusterDicc[key]["negative"] +=
              data[i].contents[modulo][cluster].negative.percentage;
          }
        }
      }
    }

    let id = 0;
    for (let key in superModuloandClusterDicc) {
      let moduleCluster = JSON.parse(key);

      let moduloPackage = {
        id: id++,
        modulo: moduleCluster[0],
        cluster: moduleCluster[1],
        positive:
          (superModuloandClusterDicc[key]["positive"] / data.length) * 100,

        negative:
          (superModuloandClusterDicc[key]["negative"] / data.length) * 100,
      };

      superModuloandClusterArray.push(moduloPackage);
    }

    setModulosAndClusters(superModuloandClusterArray);
    setTableModulosAndClusters(superModuloandClusterArray);
  }

  const tabla2 = async (ini, fin, selectedModulo, selectedCluster) => {
    let fechaInicialOriginal = new Date(ini).toISOString();
    let fechaInicial = fechaInicialOriginal.split("T");
    let fechaFinalOriginal = new Date(fin).toISOString();
    let fechaFinal = fechaFinalOriginal.split("T");
    const getEncontradas = await getData(
      fechaInicial[0] + "T00:00:00.000Z",
      fechaFinal[0] + "T00:00:00.000Z"
    );
    let data = getEncontradas.data;
    //console.log("data", data);

    let superKeywordsArray = [];
    let superKeywordsDicc = {};
    for (let i = 0; i < data.length; i++) {
      for (let keyword in data[i].contents[selectedModulo][selectedCluster]
        .positive.keywordPercentage) {
        if (!(keyword in superKeywordsDicc)) {
          superKeywordsDicc[keyword] =
            data[i].contents[selectedModulo][
              selectedCluster
            ].positive.keywordPercentage[keyword];
        } else {
          superKeywordsDicc[keyword] +=
            data[i].contents[selectedModulo][
              selectedCluster
            ].positive.keywordPercentage[keyword];
        }
      }
    }

    for (let key in superKeywordsDicc) {
      let keywordPackage = {
        keyword: key,
        porcentaje: (superKeywordsDicc[key] / data.length) * 100,
      };

      superKeywordsArray.push(keywordPackage);
    }

    setEncontradas(superKeywordsArray);
  };

  const tabla3 = async (ini, fin, selectedModulo, selectedCluster) => {
    setSelectedModulos(selectedModulo);
    setSelectedClusters(selectedCluster);
    let fechaInicialOriginal = new Date(ini).toISOString();
    let fechaInicial = fechaInicialOriginal.split("T");
    let fechaFinalOriginal = new Date(fin).toISOString();
    let fechaFinal = fechaFinalOriginal.split("T");
    const getEncontradas = await getData(
      fechaInicial[0] + "T00:00:00.000Z",
      fechaFinal[0] + "T00:00:00.000Z"
    );
    let data = getEncontradas.data;
    //console.log("data", data);

    let superAgents = {};
    for (let i = 0; i < data.length; i++) {
      for (let agent in data[i].contents[selectedModulo][selectedCluster]
        .negative.agentRecord) {
        // console.log("agent", agent);
        if (!(agent in superAgents)) {
          superAgents[agent] =
            data[i].contents[selectedModulo][
              selectedCluster
            ].negative.agentRecord.length;
        } else {
          superAgents[agent] +=
            data[i].contents[selectedModulo][
              selectedCluster
            ].negative.agentRecord.length;
        }
      }
    }

    let superAgentsArray = [];

    for (let agent in superAgents) {
      let agentPackage = {
        agent: agent,
      };
      superAgentsArray.push(agentPackage);
    }

    setNoencontradas(superAgentsArray);
    setTableNoencontradas(superAgentsArray);
  };

  const tabla4 = async (ini, fin, selectedAgent) => {
    console.log(ini, fin, selectedAgent);
    let fechaInicialOriginal = new Date(ini).toISOString();
    let fechaInicial = fechaInicialOriginal.split("T");
    let fechaFinalOriginal = new Date(fin).toISOString();
    let fechaFinal = fechaFinalOriginal.split("T");
    const getGrabaciones = await getData(
      fechaInicial[0] + "T00:00:00.000Z",
      fechaFinal[0] + "T00:00:00.000Z"
    );
    let data = getGrabaciones.data;
    //console.log("data", data);

    let superGrabaciones = {};

    for (let i = 0; i < data.length; i++) {
      let records =
        data[i].contents[selectedModulos][selectedClusters].negative
          .agentRecord[selectedAgent];

      console.log("records", records.length);
      for (let j = 0; j < records.length; j++) {
        console.log("records 2", records[j]);
        superGrabaciones[j] = records[j];
      }
    }
    //console.log("superGrabaciones", superGrabaciones);

    let superGrabacionesArray = [];

    for (let records in superGrabaciones) {
      let grabacionPackage = {
        records: superGrabaciones[records],
      };
      superGrabacionesArray.push(grabacionPackage);
    }

    setGrabaciones(superGrabacionesArray);
    setTableGrabaciones(superGrabacionesArray);
  };

  const tabla5 = async (keyfile) => {
    const getKeywords = await getKeywordsData(keyfile);
    let data = getKeywords.data;
    // console.log("data", data);
    function secondsToTime(seconds) {
      return new Date(seconds * 1000).toISOString().substr(11, 11);
    }
    //console.log("keyfile", keyfile);
    let keywords = data[0].contents;
    let keywordsArray = [];
    let id = 0;
    for (let key in keywords) {
      for (let i = 0; i < keywords[key].results.length; i++) {
        // console.log("mostrar", keywords[key].results[i]);
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
        // console.log("package", keywordPackage);
        keywordsArray.push(keywordPackage);
      }
      if (keywords[key].results.length === 0) {
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

  const dataEstadisticas = async (ini, fin) => {
    if (!ini || !fin) {
      return;
    }

    let fechaInicialOriginal = new Date(ini).toISOString();
    let fechaInicial = fechaInicialOriginal.split("T");
    let fechaFinalOriginal = new Date(fin).toISOString();
    let fechaFinal = fechaFinalOriginal.split("T");
    const getEstadisticas = await getData(
      fechaInicial[0] + "T00:00:00.000Z",
      fechaFinal[0] + "T00:00:00.000Z"
    );
    setLoading(true);
    let estadisticas = getEstadisticas.data;
    //console.log("estadisticas", estadisticas);

    setActiveTabla1(true);
    tabla1(estadisticas);
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
                  <h3 className="ml-3 " style={{ color: "#FF9B00" }}>
                    ESTADISTICAS POR{" "}
                    <span style={{ color: "#CACACA" }}>CLUSTERS</span>{" "}
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
                                  dataEstadisticas(startDate, endDate);
                                  setActiveTabla1(false);
                                  filtrar("");
                                  filtrar2("");
                                  filtrar3("");
                                  setBusqueda("");
                                  setModulosAndClusters([]);
                                  setActiveButton1(true);
                                  setActiveButton2(true);
                                  setLoading(false);
                                  setGrabaciones([]);
                                  setKeywords([]);
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
                          //setModulosAndClusters([]);
                          setEncontradas([]);
                          setNoencontradas([]);
                          setActiveTabla2(false);
                          setActiveTabla3(false);
                          setActiveTabla4(false);
                          setActiveTabla5(false);
                          setActiveButton1(true);
                          setActiveButton2(true);
                          setGrabaciones([]);
                          setKeywords([]);
                        }}
                      >
                        <i class="fas fa-arrow-left"></i> Volver
                      </button>
                      <br />
                      <br />

                      {/* <div className="table-responsive"> */}
                      {loading ? 
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
                                                  onClick={() => sorting("modulo")}
                                                >
                                                  MODULOS
                                                  <i
                                                    className="fas fa-arrows-alt-v ml-1"
                                                    style={{ color: "black" }}
                                                  ></i>
                                                </th>
                                                <th
                                                  className="text-center"
                                                  scope="col"
                                                  onClick={() => sorting("cluster")}
                                                >
                                                  CLUSTER
                                                  <i
                                                    className="fas fa-arrows-alt-v ml-1"
                                                    style={{ color: "black" }}
                                                  ></i>
                                                </th>
                                                <th
                                                  className="text-center"
                                                  scope="col"
                                                  onClick={() => sortingNum("positive")}
                                                >
                                                  ENCONTRADAS
                                                  <i
                                                    className="fas fa-arrows-alt-v ml-1"
                                                    style={{ color: "black" }}
                                                  ></i>
                                                </th>
                                                <th
                                                  className="text-center"
                                                  scope="col"
                                                  onClick={() => sortingNum("negative")}
                                                >
                                                  NO ENCONTRADAS
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
                                              {modulosAndClusters.map((agent) => (
                                                <tr key={agent.id}>
                                                  <td>{agent.modulo}</td>
                                                  <td className="text-center">{agent.cluster}</td>
                                                  <td className="text-center">
                                                    {agent.positive.toFixed(1)} %
                                                  </td>
                                                  <td className="text-center">
                                                    {agent.negative.toFixed(1)} %
                                                  </td>
                    
                                                  <td className="text-center">
                                                    <button
                                                      style={{ background: "#D3D3D3" }}
                                                      className="btn btn-sm rounded-pill"
                                                      hidden={activeButton1 ? false : true}
                                                      onClick={() => {
                                                        filtrar(agent.cluster);
                                                        tabla2(
                                                          startDate,
                                                          endDate,
                                                          agent.modulo,
                                                          agent.cluster
                                                        );
                                                        setActiveTabla2(true);
                                                        setActiveTabla3(false);
                                                        setActiveTabla4(false);
                                                        setActiveTabla5(false);
                                                        setActiveButton2(false);
                                                      }}
                                                    >
                                                      Encontradas
                                                    </button>
                                                    <button
                                                      className="btn btn-warning btn-sm rounded-pill"
                                                      hidden={activeButton2 ? false : true}
                                                      onClick={() => {
                                                        filtrar(agent.cluster);
                                                        tabla3(
                                                          startDate,
                                                          endDate,
                                                          agent.modulo,
                                                          agent.cluster
                                                        );
                                                        setActiveTabla2(false);
                                                        setActiveTabla3(true);
                                                        setActiveTabla4(false);
                                                        setActiveTabla5(false);
                                                        setActiveButton1(false);
                                                      }}
                                                    >
                                                      No Encontradas
                                                    </button>
                                                  </td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                      : <LoadingScreen/> }
                      {/* </div> */}

                      {/* <!--Table2 -->                */}
                      <br />
                      <br />
                      <button
                        className="btn btn-warning btn-sm rounded-pill"
                        hidden={activeTabla2 ? false : true}
                        onClick={() => {
                          filtrar("");
                          setEncontradas([]);
                          setNoencontradas([]);
                          setGrabaciones([]);
                          setKeywords([]);
                          setActiveTabla3(false);
                          setActiveTabla4(false);
                          setActiveTabla5(false);
                          setActiveTabla2(false);
                          setActiveButton1(true);
                          setActiveButton2(false);
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
                            <th onClick={() => sorting5("keyword")}>
                              KEYWORDS
                              <i
                                className="fas fa-arrows-alt-v ml-1"
                                style={{ color: "black" }}
                              ></i>
                            </th>
                            <th onClick={() => sortingNum5("porcentaje")}>
                              PORCENTAJE
                              <i
                                className="fas fa-arrows-alt-v ml-1"
                                style={{ color: "black" }}
                              ></i>
                            </th>
                          </tr>
                        </thead>
                        <tbody style={{ fontSize: "small" }}>
                          {encontradas.map((encontrada) => (
                            <tr key={encontrada.keyword}>
                              <td>{encontrada.keyword}</td>
                              <td>{encontrada.porcentaje.toFixed(2)} %</td>
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
                          filtrar("");
                          setGrabaciones([]);
                          setKeywords([]);

                          setActiveTabla3(false);
                          setActiveTabla4(false);
                          setActiveTabla5(false);
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
                            <th onClick={() => sorting2("agent")}>
                              AGENTE{" "}
                              <i
                                className="fas fa-arrows-alt-v ml-1"
                                style={{ color: "black" }}
                              ></i>
                            </th>
                            <th>ACCIONES</th>
                          </tr>
                        </thead>
                        <tbody style={{ fontSize: "small" }}>
                          {noencontradas.map((noencontrada) => (
                            <tr key={noencontrada.agent}>
                              <td>{noencontrada.agent}</td>
                              <td>
                                <button
                                  className="btn btn-warning btn-sm rounded-pill"
                                  onClick={() => {
                                    filtrar2(noencontrada.agent);
                                    tabla4(
                                      startDate,
                                      endDate,
                                      noencontrada.agent
                                    );
                                    setActiveTabla4(true);
                                    setActiveTabla5(false);
                                  }}
                                >
                                  <i class="fas fa-arrow-right"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {/* </div> */}
                      {/* end table 3 */}

                      {/* <!--Table4 -->                */}
                      <br />
                      <br />
                      <button
                        className="btn btn-warning btn-sm rounded-pill"
                        hidden={activeTabla4 ? false : true}
                        onClick={() => {
                          filtrar2("");
                          filtrar3("");
                          setGrabaciones([]);
                          setKeywords([]);
                          setActiveTabla4(false);
                          setActiveTabla5(false);
                        }}
                      >
                        <i class="fas fa-arrow-left"></i> Volver
                      </button>
                      <br />
                      <br />
                      {/* <div className="table-responsive"> */}
                      <table
                        className="table  table-borderless table-hover"
                        hidden={activeTabla4 ? false : true}
                      >
                        <thead
                          style={{
                            backgroundColor: "#CACACA",
                            color: "white",
                            fontSize: "small",
                          }}
                        >
                          <tr>
                            <th onClick={() => sorting3("records")}>
                              GRABACIONES{" "}
                              <i
                                className="fas fa-arrows-alt-v ml-1"
                                style={{ color: "black" }}
                              ></i>
                            </th>
                            <th>ACCIONES</th>
                          </tr>
                        </thead>
                        <tbody style={{ fontSize: "small" }}>
                          {grabaciones.map((grabacion) => (
                            <tr key={grabacion.records}>
                              <td>{grabacion.records}</td>
                              <td>
                                <button
                                  className="btn btn-warning btn-sm rounded-pill"
                                  onClick={() => {
                                    filtrar3(grabacion.records);
                                    tabla5(grabacion.records);
                                    setActiveTabla5(true);
                                  }}
                                >
                                  <i class="fas fa-arrow-right"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {/* </div> */}
                      {/* end table 4 */}

                      {/* <!--Table5 -->                */}
                      <br />
                      <br />
                      <button
                        className="btn btn-warning btn-sm rounded-pill"
                        hidden={activeTabla5 ? false : true}
                        onClick={() => {
                          filtrar3("");
                          setKeywords([]);
                          setActiveTabla5(false);
                        }}
                      >
                        <i class="fas fa-arrow-left"></i> Volver
                      </button>
                      <br />
                      <br />
                      {/* <div className="table-responsive"> */}
                      <table
                        className="table  table-borderless table-hover"
                        hidden={activeTabla5 ? false : true}
                      >
                        <thead
                          style={{
                            backgroundColor: "#CACACA",
                            color: "white",
                            fontSize: "small",
                          }}
                        >
                          <tr>
                            <th onClick={() => sorting4("name")}>
                              KEYWORD{" "}
                              <i
                                className="fas fa-arrows-alt-v ml-1"
                                style={{ color: "black" }}
                              ></i>
                            </th>
                            <th onClick={() => sorting4("category")}>
                              CATEGORIA{" "}
                              <i
                                className="fas fa-arrows-alt-v ml-1"
                                style={{ color: "black" }}
                              ></i>
                            </th>
                            <th onClick={() => sorting4("module")}>
                              MODULO{" "}
                              <i
                                className="fas fa-arrows-alt-v ml-1"
                                style={{ color: "black" }}
                              ></i>
                            </th>
                            <th onClick={() => sorting4("from")}>
                              DESDE{" "}
                              <i
                                className="fas fa-arrows-alt-v ml-1"
                                style={{ color: "black" }}
                              ></i>
                            </th>
                            <th onClick={() => sorting4("to")}>
                              HASTA{" "}
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
                      {/* end table 5 */}
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

  const url = `${rutaAPITableros}/${nuevaURL[4]}/statisticsofclusters?eventDate=${fechaIni}&eventDate=${fechaFinal}`;
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
