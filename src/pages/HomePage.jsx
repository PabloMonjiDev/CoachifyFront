import React from "react";
import Calendar from '../components/Calendar.jsx';
import NavBar from '../components/Navbar.jsx';
import '../styles/HomePage.css';

const HomePage = () => {
    return (
        <>
            <NavBar />
            <div className="home-page">
                <h1 className="welcome-title">¡Hola!</h1>
                <div className="calendar">
                    <Calendar />
                </div>
            </div>
        </>
    );
}

export default HomePage;