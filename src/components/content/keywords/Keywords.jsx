import React from 'react'

import Footer from '../../footer/Footer';
import Header from '../../header/Header';
import SidebarAdminCampaing from '../../sidebar/SidebarAdminCampaing';


export default function Keywords(){

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
                                <h1 className="m-0 text-dark">KeyWords</h1>
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


