import React from 'react';
import '../styles/NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faComment, faUsers, faCog } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        Coachify Fitness
        <img className='logoImg' src="../img/logo.svg" alt="Logo" />
      </div>
      
      <ul className="nav-links">
        <li><FontAwesomeIcon icon={faHome} /> <a href="/home">Inicio</a></li>
        <li><FontAwesomeIcon icon={faComment} /> <a href="/chat">Chat</a></li>
        <li>
          <FontAwesomeIcon icon={faUsers} /> <a href="/clientes">Clientes</a>
          <div className="dropdown-content">
            <a href="/1">Cliente 1</a>
            <a href="/2">Cliente 2</a>
            <a href="/3">Cliente 3</a>
            {/* Aquí puedes cargar dinámicamente los clientes registrados */}
          </div>
        </li>
        
        <li className='config'><FontAwesomeIcon icon={faCog} /> <a href="/config">Configuración</a></li>
      </ul>

      
    </div>
  );
}

export default NavBar;
