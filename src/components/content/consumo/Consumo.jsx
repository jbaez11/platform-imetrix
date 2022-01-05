import React, { useState } from "react";
//import { getDay, setMinutes } from "date-fns";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { DateRangePickerCalendar, START_DATE } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import SidebarAdminCampaing from "../../sidebar/SidebarAdminCampaing";
import { Bar } from "react-chartjs-2";
import { rutaAPITableros } from "../../../config/Config";

export default function Consumo() {
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
  /* prueba si */
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
    a.setAttribute("download", "consumo_minutos_" + hora + ".csv");
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
    const getConsumo = await getData(
      fechaInicial[0] + "T00:00:00.000Z",
      fechaFinal[0] + "T00:00:00.000Z"
    );
    let consumos = getConsumo.data;
    // console.log('this.agents', this.agents);

    const data = consumos.map((row) => ({
      "Año y mes": row.yearMonthString,
      Dia: row.dayString,
      "Total audios": row.totalFiles,
      "Total minutos": row.totalMinutes,
      "Audios procesados": row.processedFiles,
      "Minutos procesados": row.processedMinutes,
      "Audios no procesados": row.unprocessedFiles,
      "Minutos no procesados": row.unprocessedMinutes,
      "Nombre de audios no procesados": row.nameunprocessedMinutes,
      Notas: row.notes,
    }));
    console.log("data getReport", data);
    //const csvData =
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

  const [totalMinutos, setTotalminutos] = useState(0);
  const [totalGrabaciones, setTotalGrabaciones] = useState(0);
  const [totalGrabacionesLeidas, setTotalGrabacionesLeidas] = useState(0);
  const [labelsMinutosLeidos, setLabelsMinutosLeidos] = useState(0);
  const [dataMinutosLeidos, setDataMinutosLeidos] = useState(0);
  const [dataMinutosNoLeidos, setDataMinutosNoLeidos] = useState(0);
  const [dataGrabacionesLeidos, setDataGrabacionesLeidos] = useState(0);
  const [dataGrabacionesNoLeidos, setDataGrabacionesNoLeidos] = useState(0);

  function sumaTotalMinutos(minutos) {
    let suma = 0;
    minutos.forEach((minuto) => {
      suma += minuto.totalMinutes;
    });

    setTotalminutos(suma);
  }

  function sumaTotalGrabaciones(grabaciones) {
    let suma = 0;
    grabaciones.forEach((grabacion) => {
      suma += grabacion.totalFiles;
    });

    setTotalGrabaciones(suma);
  }

  function sumaGrabacionesLeidas(grabaciones) {
    let suma = 0;
    grabaciones.forEach((grabacion) => {
      suma += grabacion.processedFiles;
    });

    setTotalGrabacionesLeidas(suma);
  }

  function graficaMinutos(minutos) {
    console.log("minutos", minutos);

    /*
	  	labels = dias
		data = minutos leidos
	  */
    let labels = [];
    let dataLeida = [];
    let dataNoLeida = [];
    let dataGrabaciones = [];
    let dataGrabacionesNo = [];
    minutos.forEach((minuto) => {
      labels.push(minuto.dayString);
      dataLeida.push(minuto.totalMinutes);
      dataNoLeida.push(minuto.unprocessedMinutes);
      dataGrabaciones.push(minuto.processedFiles);
      dataGrabacionesNo.push(minuto.unprocessedFiles);
    });

    setLabelsMinutosLeidos(labels);
    setDataMinutosLeidos(dataLeida);
    setDataMinutosNoLeidos(dataNoLeida);
    setDataGrabacionesLeidos(dataGrabaciones);
    setDataGrabacionesNoLeidos(dataGrabacionesNo);
  }

  const dataConsumo = async (ini, fin) => {
    if (!ini || !fin) {
      return;
    }

    let fechaInicialOriginal = new Date(ini).toISOString();
    let fechaInicial = fechaInicialOriginal.split("T");
    let fechaFinalOriginal = new Date(fin).toISOString();
    let fechaFinal = fechaFinalOriginal.split("T");
    const getConsumo = await getData(
      fechaInicial[0] + "T00:00:00.000Z",
      fechaFinal[0] + "T00:00:00.000Z"
    );
    let consumos = getConsumo.data;

    sumaTotalMinutos(consumos);
    sumaTotalGrabaciones(consumos);
    sumaGrabacionesLeidas(consumos);
    graficaMinutos(consumos);
  };

  //dataConsumo();

  return (
    <div className="sidebar-mini">
      <div className="wrapper">
        <Header />
        <SidebarAdminCampaing />
        <div className="content-wrapper" style={{ minHeight: "494px" }}>
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col">
                  <h2
                    className="text-center font-weight-bold"
                    style={{ color: "#FF9B00" }}
                  >
                    CONSUMO
                  </h2>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-3">
                  <button
                    className="btn btn-warning"
                    type="button"
                    onClick={() => {
                      setShowCalendar(!showCalendar);
                      dataConsumo(startDate, endDate);
                    }}
                  >
                    {showCalendar ? "seleccionar nueva fecha" : "ir"}
                  </button>

                  {showCalendar ? (
                    <div>
                      <p style={{ display: "inline" }}>
                        {" "}
                        {startDate
                          ? format(startDate, "dd MMM yyyy", { locale: enGB })
                          : "Seleccione Fecha Inicial"}
                        -
                      </p>
                      <p style={{ display: "inline" }}>
                        {" "}
                        {endDate
                          ? format(endDate, "dd MMM yyyy", { locale: enGB })
                          : "Seleccione Fecha Final"}
                      </p>
                    </div>
                  ) : (
                    <div style={{ height: "450px", width: "300px" }}>
                      <p style={{ display: "inline" }}>
                        {" "}
                        {startDate
                          ? format(startDate, "dd MMM yyyy", { locale: enGB })
                          : "Seleccione Fecha Inicial"}
                        -
                      </p>
                      <p style={{ display: "inline" }}>
                        {" "}
                        {endDate
                          ? format(endDate, "dd MMM yyyy", { locale: enGB })
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
                <div className="col-2">
                  <button
                    className="btn btn-success"
                    onClick={() => getReport(startDate, endDate)}
                  >
                    Descargar
                  </button>
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
                      {/* inicio */}
                      <div class="container">
                        <div class="row">
                          <div className="col-sm">
                            <div className="card">
                              <h5
                                style={{
                                  color: "#FF9B00",
                                  textAlign: "center",
                                }}
                              >
                                TOTAL MINUTOS <br />
                              </h5>
                              <h1 style={{ textAlign: "center" }}>
                                <span style={{ color: "#4C4C4C" }}>
                                  {totalMinutos.toFixed(0)}
                                </span>
                              </h1>
                            </div>
                          </div>
                          <div className="col-sm">
                            <h5
                              style={{ color: "#FF9B00", textAlign: "center" }}
                            >
                              TOTAL GRABACIONES <br />
                            </h5>
                            <h1 style={{ textAlign: "center" }}>
                              <span style={{ color: "#4C4C4C" }}>
                                {totalGrabaciones}
                              </span>
                            </h1>
                          </div>
                          <div className="col-sm">
                            <h5
                              style={{ color: "#FF9B00", textAlign: "center" }}
                            >
                              GRABACIONES LEIDAS <br />
                            </h5>
                            <h1 style={{ textAlign: "center" }}>
                              <span style={{ color: "#4C4C4C" }}>
                                {totalGrabacionesLeidas}
                              </span>
                            </h1>
                          </div>
                        </div>

                        <h4 style={{ color: "#FF9B00" }}>Minutos</h4>
                        <br />

                        <Bar
                          data={{
                            labels: labelsMinutosLeidos, //["1", "2", "3", "4"],
                            datasets: [
                              {
                                label: "Minutos leidos",
                                data: dataMinutosLeidos, //[100, 200, 500, 200],
                                backgroundColor: "#FFCD7F",
                              },
                              {
                                label: "Minutos no leidos",
                                data: dataMinutosNoLeidos,
                                backgroundColor: "#ff4f9a",
                              },
                            ],
                          }}
                        ></Bar>

                        <h4 style={{ color: "#FF9B00" }}>Grabaciones</h4>
                        <br />

                        <Bar
                          data={{
                            labels: labelsMinutosLeidos,
                            datasets: [
                              {
                                label: "Grabaciones leidos",
                                data: dataGrabacionesLeidos, //[100, 200, 300, 200],
                                backgroundColor: "#FFCD7F",
                              },
                              {
                                label: "Grabaciones no leidos",
                                data: dataGrabacionesNoLeidos, //[23, 45, 5, 20],
                                backgroundColor: "#ff4f9a",
                              },
                            ],
                          }}
                        ></Bar>
                      </div>
                      {/* fin */}
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
  //console.log("nuevaURL",nuevaURL);
  const url = `${rutaAPITableros}/${nuevaURL[4]}/consumo?eventDate=${fechaIni}&eventDate=${fechaFinal}`;
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
