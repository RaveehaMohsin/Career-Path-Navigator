import React from "react";
import { Line } from "react-chartjs-2";
import "./doublearealine.css"; // Assuming this is your CSS file

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const DoubleAreaLineChart = ({ title, chartData, chartLabels, chartLegends }) => {
  // Generate the datasets dynamically based on the input
  const data = {
    labels: chartLabels, // x-axis labels (months)
    datasets: chartData.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      borderColor: dataset.borderColor,
      backgroundColor: dataset.backgroundColor || "transparent", // Background color for area fill (if any)
      borderWidth: dataset.borderWidth || 2,
      fill: dataset.fill || false, // Determines whether to fill the area under the line
      tension: dataset.tension || 0.4, // Smoothing of the line
      pointRadius: dataset.pointRadius || 0, // Radius of the points
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Disable the default legend since we are displaying a custom legend
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months", // X-axis title
        },
        grid: {
          display: false, // Remove grid from x-axis
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount", // Y-axis title
        },
        beginAtZero: true,
        grid: {
          display: false, // Remove grid from y-axis
        },
      },
    },
    maintainAspectRatio: false,
    aspectRatio: 2, // Adjust this for your desired aspect ratio
  };

  return (
    <div>
      {/* Flexbox layout for the header */}
      <div className="header-container">
        <h2 className="linechart-heading"> {title} </h2>
        {/* Custom Legend */}
        <div className="custom-legend">
          {chartLegends.map((legend, index) => (
            <div key={index} className="legend-item">
              <span
                className="legend-circle"
                style={{ backgroundColor: legend.color }}
              ></span>
              {legend.label}
            </div>
          ))}
        </div>
      </div>
      <div className="graph-chart-container">
        <Line data={data} options={options} height={400} width={800} />
      </div>
    </div>
  );
};

export default DoubleAreaLineChart;
