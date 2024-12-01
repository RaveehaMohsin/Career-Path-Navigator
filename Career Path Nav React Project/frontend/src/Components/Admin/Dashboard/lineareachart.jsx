import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const AreaLineChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Clean up previous chart instance if it exists
    let chartInstance;
    if (chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }

    // Automatically generate labels based on the length of the data
    const labels = data.map((_, index) => `Label ${index + 1}`);

    const chartData = {
      labels, // Automatically generated labels
      datasets: [
        {
          label: "Metric Value",
          data, // Use the provided data
          backgroundColor: "rgba(135, 206, 250, 0.2)", // Area fill color
          borderColor: "#1EBA62", // Line color
          fill: true, // Enable fill for the area chart
          tension: 0.4, // Smooth curves
        },
      ],
    };

    // Define default chart options
    const chartOptions = {
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
    };

    chartInstance = new Chart(ctx, {
      type: "line", // Line chart used for the area chart
      data: chartData,
      options: chartOptions,
    });

    // Save chart instance to the ref for cleanup
    chartRef.current.chartInstance = chartInstance;

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data]); // Re-render the chart if the data changes

  return <canvas ref={chartRef} />;
};

export default AreaLineChart;
