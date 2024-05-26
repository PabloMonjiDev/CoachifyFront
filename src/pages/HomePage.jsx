import React from "react";
import Calendario from "../components/calendar/Calendario4";
import Sidebar2 from "../components/common/Sidebar";
import "../assets/styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <Sidebar2 />
      <div className="page">
        <header className="header">
          <h1>¡Bienvenido Entrenador!</h1>
        </header>
        <hr />
        <div className="calendario">
          <Calendario />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
