import React from 'react'
import Logo from './logo.png'
import User from './user2-160x160.jpg'

export default function SidebarCampaing(){

    const userName = localStorage.getItem("NAME");
    const currentUserId = localStorage.getItem("ID");
    let role = localStorage.getItem("ROLE");
    const valores = window.location.href;
    let nuevaURL = valores.split("/");


    return(
        <aside  className="main-sidebar elevation-4" style={{ backgroundColor: '#FF9B00' }}>
            <a href={"/inicio/"+currentUserId} className="brand-link" style={{ backgroundColor: 'white' }}>
                <img alt="Logo imetrix" 
                className="brand-image"
                style={{ opacity : 0.8 }}
                src={Logo}/>
                <span className="brand-text" style={{color:"black", 'text-decoration': 'none !important'}}>.</span>
            </a>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img
                        className="img-circle elevation-2"
                        alt="user"
                        src={User}
                        />
                    </div>
                    <div className="info">
                        <a style={{ color: 'white', 'text-decoration': 'none' }} href="#/" 

                        className="editarInputs" 
                        data-toggle="modal" 
                        data-target="#editarAdmin" 
                        data="">{userName}</a>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul 
                    className="nav nav-pills nav-sidebar flex-column"
                    data-widget="treeview"
                    role="menu"
                    data-accordion="false">
                    <li className="nav-item">
                        <a href={"/campañasinicio/"+nuevaURL[4]} className="nav-link" style={{ color: 'white' }}>
                            <i className="nav-icon fas fa-home"></i>
                            <p>Inicio</p>
                        </a>
                    </li>
                    {(() => {
                            if (role === "Administrador") {
                            return (
                                <>
                                    <li className="nav-item">
                                        <a href={"/campañas/"+nuevaURL[4]} className="nav-link" style={{ color: 'white' }}>
                                            <i className="nav-icon fas fa-address-card"></i>
                                            <p>Gestor Campañas</p>
                                        </a>
                                    </li>  
                                </>
                            )
                        } 
                        })()}              
                    </ul>
                </nav>

            </div>
        </aside>


    );
}