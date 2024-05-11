import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "../../assets/styles/Sidebar.css";
import logo from "../../assets/img/logoProvisional.png";
import {
  FaHome,
  FaUsers,
  FaCaretDown,
} from "react-icons/fa";

const Sidebar = () => {
  const [clientes, setClientes] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [activeRoute, setActiveRoute] = useState("");
  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/clientes")
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clientes:", error);
      });
  }, []);

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location]);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="sidebar-container">
      <div
        className="sidebar-header"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
          marginTop: "20px",
          marginBottom: "50px",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          className="logo"
          style={{ width: "300px", height: "300px" }}
        />
      </div>
      <ul className="sidebar-menu">
        <li className={activeRoute === "/inicio" ? "active" : ""}>
          <Link to="/inicio">
            <FaHome style={{ marginRight: "3px" }} /> Inicio
          </Link>
        </li>
        <li className={activeRoute === "/clientes" ? "active" : ""}>
          <Link to="/clientes">
            <FaUsers style={{ marginRight: "3px" }} /> Gestion de clientes
          </Link>
        </li>
        <li>
          <button className="btnLista" onClick={toggleDropdown}>
            Clientes <FaCaretDown />
          </button>
          {isDropdownVisible && (
            <ul className="listaDesplegada">
              {clientes.map((cliente) => (
                <li
                  className={`clientesLista ${
                    activeRoute === `/clientes/${cliente.clienteID}`
                      ? "active"
                      : ""
                  }`}
                  key={cliente.clienteID}
                >
                  <Link to={`/clientes/${cliente.clienteID}`}>
                    <img
                      src={cliente.img || "https://via.placeholder.com/30"}
                      alt={cliente.nombreCompleto}
                      className="cliente-imagen"
                    />{" "}
                    {cliente.nombreCompleto}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

