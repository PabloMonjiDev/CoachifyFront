import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import "../assets/styles/Grafico.css";

const GraficoComponente = ({ clienteID }) => {
  const [pesosData, setPesosData] = useState([]); // Estado para almacenar los datos de peso
  const [chartInstance, setChartInstance] = useState(null); // Estado para almacenar la instancia del gráfico

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/pesos/cliente/${clienteID}`
        );
        const data = await response.json();
        setPesosData(data); // Actualizar los datos de peso con la respuesta del servidor
        console.log("Pesos data fetched:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Llama a la función fetchData al cargar el componente y cuando cambie el clienteID
  }, [clienteID, setPesosData]);

  useEffect(() => {
    if (pesosData.length > 0) {
      const dates = pesosData.map((item) => new Date(item.fecha)); // Obtiene las fechas de los datos de peso
      const weights = pesosData.map((item) => item.peso); // Obtiene los pesos de los datos de peso

      const ctx = document.getElementById("weightChart"); // Obtiene el elemento canvas del gráfico

      if (ctx) {
        if (chartInstance) {
          chartInstance.destroy(); // Destruye la instancia del gráfico anterior si existe
        }

        const newChartInstance = new Chart(ctx, {
          type: "line",
          data: {
            labels: dates, // Establece las fechas como etiquetas del eje x
            datasets: [
              {
                label: "Peso",
                data: weights, // Establece los pesos como datos del gráfico
                borderColor: "#ffd700",
                tension: 0.1,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                labels: {
                  color: "white",
                },
              },
            },
            scales: {
              x: {
                type: "time",
                time: {
                  unit: "day",
                  displayFormats: {
                    day: "MMM d",
                  },
                },
                ticks: {
                  color: "white",
                },
                grid: {
                  color: "#666",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Peso (kg)",
                  color: "white",
                },
                ticks: {
                  color: "white",
                },
                grid: {
                  color: "#666",
                },
              },
            },
            elements: {
              point: {
                radius: 4,
                backgroundColor: "#ffd700",
              },
            },
          },
        });

        setChartInstance(newChartInstance); // Guarda la nueva instancia del gráfico
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pesosData]);

  return pesosData.length > 0 ? (
    <canvas id="weightChart" width="400" height="200"></canvas>
  ) : null;
};

export default GraficoComponente;