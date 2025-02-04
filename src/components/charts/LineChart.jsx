import React, { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { orange } from "../../utils/constant-variable";

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend
);

const LineChart = ({ height = 400, chartData = [], revenueData =[] }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;

      // Create gradient fill
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(242, 103, 34, 0.15)"); // F26722 with opacity 0.6
      gradient.addColorStop(1, "rgba(242, 103, 34, 0)"); // F26722 fully transparent

      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
    }
  }, []);

  // Assuming dynamic data with month, order, and year
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Map dynamic data to chart-friendly format
  const data = {
    labels: months,
    datasets: [
      {
        label: "Data Growth",
        data: months.map((month) => {
          const monthData = chartData.find((item) => item.month === month);
          return monthData ? monthData.order : 0; // If no data, return 0
        }),
        borderColor: orange,
        pointBackgroundColor: orange,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "" }}>
      <Line ref={chartRef} data={data} options={options} height={height} />
    </div>
  );
};

export default LineChart;
