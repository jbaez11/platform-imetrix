import React from 'react'
import Logo from './logo.png'
import User from './user2-160x160.jpg'

export default function SidebarAdminCampaing(){

    const userName = localStorage.getItem("NAME");
    const currentUserId = localStorage.getItem("ID");
    let role = localStorage.getItem("ROLE");


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
                    <li className="nav-item" >
                                <a href="/agents" className="nav-link" style={{ color: 'white' }}>
                                <i className="nav-icon far fa-address-card"></i>
                                <p>
                                    Agentes
                                </p>
                                </a>
                            </li>
                            
                            <li className="nav-item">
                                <a href="/keywords" className="nav-link" style={{ color: 'white' }}>
                                <i className="nav-icon fas fa-bold"></i>
                                <p>
                                Keywords / Frases
                                </p>
                                </a>
                            </li>
                            
                            <li className="nav-item">
                                <a href="/auditoria" className="nav-link" style={{ color: 'white' }}>
                                <i className="nav-icon fas fa-clipboard-list"></i>
                                <p>
                                Auditoria
                                </p>
                                </a>
                            </li>
                            
                            <li className="nav-item">
                                <a href="/puntajes" className="nav-link" style={{ color: 'white' }}>			          
                                <i className="nav-icon fas fa-star-half-alt"></i>
                                <p>
                                Puntajes
                                </p>
                                </a>
                            </li>

                            

                            <li className="nav-item">
                                <a href="/estadisticas" className="nav-link" style={{ color: 'white' }}>			           
                                <i className="nav-icon fas fa-chart-pie"></i>
                                <p>
                                Estadisticas
                                </p>
                                </a>
                            </li>
                            
                           
                    {(() => {
                            if (role === "Administrador") {
                            return (
                                <>
                                     <li className="nav-item">
                                <a href="/consumo" className="nav-link" style={{ color: 'white' }}>
                                <i className="nav-icon far fa-chart-bar"></i>
                                <p>
                                Consumo
                                </p>
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