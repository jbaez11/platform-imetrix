import React from 'react'

export default function Header(){

    //Funcion para cerrar la sesión
    const cerrarSesion = () =>{
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("ID");
        localStorage.removeItem("CORREO");
        localStorage.removeItem("NAME");
        localStorage.removeItem("ROLE");
        localStorage.removeItem("CONVERSATION");
        localStorage.removeItem("CREATEDBY");
        localStorage.removeItem("ADMIN");
    }

    return(

        <nav className="main-header navbar navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a href="#/" className="nav-link" data-widget="pushmenu">
                        <i className="fas fa-bars"></i>
                    </a>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a href="/" className="nav-link" onClick={()=>{cerrarSesion()}}>
                        <i className="fas fa-sign-out-alt"></i>
                    </a>
                </li>
            </ul>
        </nav>
    );
}