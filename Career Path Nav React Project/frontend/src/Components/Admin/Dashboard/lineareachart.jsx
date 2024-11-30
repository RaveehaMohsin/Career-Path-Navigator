import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const AreaLineChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    new Chart(ctx, {
      type: "line", // Line chart is used for area chart
      data: {
        labels: ["", "", "", "", "", ""], // No visible X-axis labels
        datasets: [
          {
            label: "Metric Value",
            data: [40, 70, 50, 60, 75, 50], // Y-axis data
            backgroundColor: "rgba(135, 206, 250, 0.2)", // Area fill color
            borderColor: "#1EBA62", // Line color
            fill: true, // Enable fill for the area chart
            tension: 0.4, // Smooth curves
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false, // Hide the legend
          },
        },
        scales: {
          x: {
            display: false, // Hide the X-axis
          },
          y: {
            display: false, // Hide the Y-axis
          },
        },
      },
    });
  }, []);

  return <canvas ref={chartRef} />;
};

export default AreaLineChart;
