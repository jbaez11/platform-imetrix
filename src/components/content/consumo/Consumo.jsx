import React from 'react'

import Footer from '../../footer/Footer';
import Header from '../../header/Header';
import SidebarAdminCampaing from '../../sidebar/SidebarAdminCampaing';
import {Bar} from 'react-chartjs-2';


export default function Consumo(){

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
                                <h1 className="m-0 text-dark">Consumo Minutos</h1>
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
                                        </div>
                                        <div className="card-body">
                                            {/* inicio */}
                                            <div class="container">
									<div class="row">
										<div className="col-sm">
											<div className="card">
												<h5 style={{color:"#FF9B00",textAlign: "center"}}>
													TOTAL MINUTOS <br />
												</h5>
												<h1 style={{textAlign: "center"}}>
													<span style={{color:"#4C4C4C"}}>100</span>
												</h1>
											</div>
										</div>
										<div className="col-sm">
										<h5 style={{color:"#FF9B00",textAlign: "center"}}>
												TOTAL GRABACIONES <br />
											</h5>
											<h1 style={{textAlign: "center"}}>
												<span style={{color:"#4C4C4C"}}>100</span>
											</h1>
										</div>
										<div className="col-sm">
										<h5 style={{color:"#FF9B00",textAlign: "center"}}>
												GRABACIONES LEIDAS <br />
											</h5>
											<h1 style={{textAlign: "center"}}>
												<span style={{color:"#4C4C4C"}}>100</span>
											</h1>
										</div>
									</div>
									

									<h4 style={{color:"#FF9B00"}}>Minutos</h4>
									<br/>

									<Bar
									data={{
										
										labels:['1','2','3','4'],
										datasets:[{
											label:'Minutos leidos',
											data:[100,200,500,200],
											backgroundColor:'#FFCD7F'
										},
										{
											label:'Minutos no leidos',
											data:[23,45,5,20],
											backgroundColor:'#ff4f9a'
										}]
									}}
									>

									</Bar>

									<h4 style={{color:"#FF9B00"}}>Grabaciones</h4>
									<br/>

									<Bar
									data={{
										labels:['1','2','3','4'],
										datasets:[{
											label:'Grabaciones leidos',
											data:[100,200,300,200],
											backgroundColor:'#FFCD7F'
										},
										{
											label:'Grabaciones no leidos',
											data:[23,45,5,20],
											backgroundColor:'#ff4f9a'
										}]
									}}
									>

									</Bar>

								</div>
                                            {/* fin */}
                                            
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


