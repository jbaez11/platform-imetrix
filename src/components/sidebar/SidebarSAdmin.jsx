import React from "react";
import Logo from "./logo.png";
import User from "./user2-160x160.jpg";

export default function SidebarSAdmin(){

    const userName = localStorage.getItem("NAME");

    return (
        <aside
          className="main-sidebar elevation-4"
          style={{ backgroundColor: "#FF9B00" }}
        >
          <a
            href={"/#"}
            className="brand-link"
            style={{ backgroundColor: "white" }}
          >
            <img
              alt="Logo imetrix"
              className="brand-image"
              style={{ opacity: 0.8 }}
              src={Logo}
            />
    
            <span
              className="brand-text "
              style={{
                color: "black",
                "text-decoration": "none !important",
                visibility: "hidden",
              }}
            >
              .
            </span>
          </a>
    
          <div className="sidebar">
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img className="img-circle elevation-2" alt="user" src={User} />
              </div>
              <div className="info">
                <a style={{ color: "white", "text-decoration": "none" }} href="#/">
                  {userName}
                </a>
              </div>
            </div>
    
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item">
                  <a
                    href={"/adminsInicio"}
                    className="nav-link"
                    style={{ color: "white" }}
                  >
                    <i className="nav-icon fas fa-home"></i>
                    <p>Inicio</p>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      );
}