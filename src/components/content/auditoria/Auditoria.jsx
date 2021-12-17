import React, { useEffect,useState } from "react";
import Footer from '../../footer/Footer';
import Header from '../../header/Header';
import SidebarAdminCampaing from '../../sidebar/SidebarAdminCampaing';
import { getDay, setMinutes } from "date-fns";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { DateRangePickerCalendar, START_DATE } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import './Auditoria.css';
import { rutaAPITableros } from '../../../config/Config';



export default function Auditoria(){
    const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focus, setFocus] = useState(START_DATE);
  const handleFocusChange = (newFocus) => {
    setFocus(newFocus || START_DATE);
  };

  const [showCalendar, setShowCalendar] = useState(true);
  const [sumTotalGrabaciones, setSumTotalGrabaciones] = useState(0);
  const [grabacionesNoPermitidas, setGrabacionesNoPermitidas] = useState(0);
  const [agentes, setAgentes] = useState([]);
  const [tableAgentes, setTableAgentes] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const handleChange=e=>{
      setBusqueda(e.target.value)
      filtrar(e.target.value)
  }

  const filtrar=(terminoBusqueda)=>{
      var resultadoBusqueda = tableAgentes.filter((elemento)=>{
          if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())|| elemento.name.toString().toUpperCase().includes(terminoBusqueda.toUpperCase())){
              return elemento;
          }
      })

      setAgentes(resultadoBusqueda);
  }

  function totalGrabaciones(grabaciones){
    console.log(grabaciones);
    let suma=0;
    for(let i = 0; i < grabaciones.length; i++){
        for (let key in grabaciones[i].recordingsSummary) {
            suma += grabaciones[i].recordingsSummary[key].length;
        }
    }
    console.log("suma",suma);
    setSumTotalGrabaciones(suma);
    
  }

  function afectadasNoPermitidas(nopermitidas){
    let suma = 0;
    for (let i = 0; i < nopermitidas.length; i++) {
        suma += nopermitidas[i].affectedRecordings;
    }

      setGrabacionesNoPermitidas(suma);

  }

  function tabla1(data){
    let superAgentsSummary = {};

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].agentsSummary.length; j++) {
        let agentPackage = data[i].agentsSummary[j];
        let agentName = agentPackage.name;

        if (
          !Object.prototype.hasOwnProperty.call(superAgentsSummary, agentName)
        ) {
          superAgentsSummary[agentName] = {
            results: agentPackage.results
          };
        } else {
          superAgentsSummary[agentName].results.recordings +=
            agentPackage.results.recordings;
          superAgentsSummary[agentName].results.positivesOfRequired +=
            agentPackage.results.positivesOfRequired;
          superAgentsSummary[agentName].results.negativesOfRequired +=
            agentPackage.results.negativesOfRequired;
          superAgentsSummary[agentName].results.positivesOfNotAllowed +=
            agentPackage.results.positivesOfNotAllowed;
          superAgentsSummary[agentName].results.negativesOfNotAllowed +=
            agentPackage.results.negativesOfNotAllowed;
          superAgentsSummary[agentName].results.positivesOfRecommendation +=
            agentPackage.results.positivesOfRecommendation;
          superAgentsSummary[agentName].results.negativesOfRecommendation +=
            agentPackage.results.negativesOfRecommendation;
        }
      }

      let superAgentsSummaryArray = [];

      for (let key in superAgentsSummary) {
        let agentPackage = {
          name: key,
          results: superAgentsSummary[key].results
        };
        superAgentsSummaryArray.push(agentPackage);
      }

      setAgentes(superAgentsSummaryArray);
      setTableAgentes(superAgentsSummaryArray);
    }
      


  }

  const dataAuditoria = async(ini,fin)=>{
    if(!ini || !fin){
        return;
    }
    
    let fechaInicialOriginal = new Date(ini).toISOString();
    let fechaInicial = fechaInicialOriginal.split('T');
    let fechaFinalOriginal = new Date(fin).toISOString();
    let fechaFinal = fechaFinalOriginal.split('T')
    const getAuditoria = await getData(fechaInicial[0]+"T00:00:00.000Z",fechaFinal[0]+"T00:00:00.000Z");
    let auditoria = getAuditoria.data;
    console.log("auditoria",auditoria);

    totalGrabaciones(auditoria);
    afectadasNoPermitidas(auditoria);
    tabla1(auditoria);

    
  
}
    
    return(
        
    <div className="sidebar-mini">
        <div className="wrapper">
            <Header/>
            <SidebarAdminCampaing/>
            <div className="content-wrapper" style={{minHeight: "494px"}}>
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h3 className="ml-3 " style={{"color":"#FF9B00"}}>AUDITORIA <span style={{"color":"#CACACA"}}>KEYWORDS</span> </h3>
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
                                                    className="btn btn-warning"
                                                    type="button"
                                                    onClick={() => {
                                                    setShowCalendar(!showCalendar);
                                                    dataAuditoria(startDate,endDate)
                                                    }}
                                                    
                                                >
                                                    {showCalendar ? "seleccionar nueva fecha" : "ir"}
                                                </button>

                                                {showCalendar ? (
                                                    <div>
                                                    <p>
                                                        Fecha Inicial:{" "}
                                                        {startDate
                                                        ? format(startDate, "dd MMM yyyy", { locale: enGB })
                                                        : "Seleccione Fecha Inicial"}
                                                        .
                                                    </p>
                                                    <p>
                                                        Fecha Final:{" "}
                                                        {endDate
                                                        ? format(endDate, "dd MMM yyyy", { locale: enGB })
                                                        : "Seleccione Fecha Final"}
                                                        .
                                                    </p>
                                                    </div>
                                                ) : (
                                                    <div style={{ height: "450px", width: "300px" }}>
                                                    <p>
                                                        Fecha Inicial:{" "}
                                                        {startDate
                                                        ? format(startDate, "dd MMM yyyy", { locale: enGB })
                                                        : "Seleccione Fecha Inicial"}
                                                        .
                                                    </p>
                                                    <p>
                                                        Fecha Final::{" "}
                                                        {endDate
                                                        ? format(endDate, "dd MMM yyyy", { locale: enGB })
                                                        : "Seleccione Fecha Final"}
                                                        .
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
                                                <div className="col-sm">
                                                <h5 className="" style={{"color":"#FF9B00"}}>
                                                    TOTAL <span style={{"color":"#CACACA"}}>GRABACIONES</span>
                                                </h5>
                                                <span className="" style={{"color":"#FF9B00"}}>{sumTotalGrabaciones}</span>
                                                </div>
                                                <div className="col-sm">
                                                <h5 className="" style={{"color":"#FF9B00"}}>
                                                AFECTADAS <span style={{"color":"#CACACA"}}> POR </span> NO PERMITIDAS
                                                </h5>
                                                <span className="" style={{"color":"#FF9B00"}}>{grabacionesNoPermitidas}</span>
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
                                                    
                                                    className="btn btn-success">
                                                    <i class="fas fa-search-minus"></i>
                                                </button>
                                            </div>
                                             <div className="table-responsive">
                                                 <div className="table table-sm table-bordered">
                                                     <thead>
                                                        <tr>
                                                            <th>NOMBRE</th>
                                                            <th>GRABACIONES</th> 
                                                            <th>INFALTABLE</th> 
                                                            <th>INFALTABLE NO HALLADA</th> 
                                                            <th>NO PERMITIDA</th> 
                                                            <th>RECOMENDACION</th>
                                                        </tr>  
                                                     </thead>
                                                     <tbody>
                                                         {agentes.map((agent)=>(
                                                             <tr key={agent.name}>
                                                                 <td>{agent.name}</td>
                                                                 <td>{agent.results.recordings}</td>
                                                                 <td>{agent.results.positivesOfRequired}</td>
                                                                 <td>{agent.results.negativesOfRequired}</td>
                                                                 <td>{agent.results.positivesOfNotAllowed}</td>
                                                                 <td>{agent.results.positivesOfRecommendation}</td>
                                                             </tr>
                                                         ))}
                                                     </tbody>
                                                 </div>
                                             </div>               
                                                        
                                        </div>
                                    </div>
                                </div>  
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    </div>
    );
}

//peticion get para administradores

const getData = (fechaIni,fechaFinal)=>{
	const valores = window.location.href;
    let nuevaURL = valores.split("/");
	console.log("nuevaURL",nuevaURL);
	const url = `${rutaAPITableros}/${nuevaURL[4]}/auditkeywords?eventDate=${fechaIni}&eventDate=${fechaFinal}`;
	const token = localStorage.getItem("ACCESS_TOKEN");
	const params = {
		method : "GET",
		headers : {
			"Authorization": token,
			"Content-Type" : "application/json"
		}

	}
	return fetch(url,params).then(response =>{
		 return response.json();
	}).then(result => {
		return result
	}).catch(err => {
		return err;
	})
}

