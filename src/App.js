import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ClientesPage from './pages/ClientesPage';
import InfoBasicaForm from './pages/FormPages/InfoBasicaForm';
import ComposicionCorporalForm from './pages/FormPages/ComposicionCorporalForm';
import HistorialMedicoForm from './pages/FormPages/HistorialMedicoForm';
import ObjetivosForm from './pages/FormPages/ObjetivosForm';
import RutinasComponente from './components/routines/RutinasComponente';
import EjerciciosComponent from './components/routines/EjerciciosComponent';
import VistaClientePage from './pages/VistaClientePage';

function App() {
  const [formData, setFormData] = useState({}); // Estado para almacenar los datos del formulario

  useEffect(() => {
    document.title = "Coachify Fitness";
  });

  // Función para actualizar los datos del formulario
  const updateFormData = (data) => {
    setFormData({ ...formData, ...data });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/inicio" element={<HomePage />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path='/rutinas' element={<RutinasComponente />} />
        <Route path='/ejercicios/:rutinaID' element={<EjerciciosComponent />} />

        <Route path="/clientes/:clienteID" element={<VistaClientePage />} />

        <Route
          path="/basic-info-form"
          element={<InfoBasicaForm updateFormData={updateFormData} />}
        />
        <Route
          path='/composicion-corporal-form'
          element={<ComposicionCorporalForm updateFormData={updateFormData} />}
        />
        <Route
          path='/historial-medico-form'
          element={<HistorialMedicoForm updateFormData={updateFormData} />}
        />
        <Route
          path='/objetivos-form'
          element={<ObjetivosForm updateFormData={updateFormData} />}
        />
        
      </Routes>
    </Router>
  );
}

export default App;
