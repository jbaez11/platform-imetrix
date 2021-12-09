import React from 'react'
import Footer from '../../../footer/Footer';
import Header from '../../../header/Header';
import SidebarCampaingAudit from '../../../sidebar/auditor/SidebarCampaingAudit';


export default function AgentsAuditor(){

    return(
    <div className="sidebar-mini">
        <div className="wrapper">
            <Header/>
            <SidebarCampaingAudit/>
            <div className="content-wrapper" style={{minHeight: "494px"}}>
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Agentes</h1>
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


