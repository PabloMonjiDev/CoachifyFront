import React from "react";
import Calendario from "../components/calendar/Calendario4";
import Sidebar2 from "../components/common/Sidebar";
import "../assets/styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="sidebar">
        <Sidebar2 />
      </div>

      <div className="page">
        <div className="header">
          <h1>¡Bienvenido Entrenador!</h1>
        </div>
        <hr />
        <div className="calendario">
          <Calendario />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
