import React from "react";
import Chart from "react-apexcharts";

const CircleChart = ({ series, labels, colors = ["#5A4FF2", "#E0E0E0"] }) => {
  const options = {
    chart: {
      type: "donut",
    },
    colors,
    labels,
    dataLabels: { enabled: false },
    legend: { show: false },
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          labels: {
            show: true,
            name: { show: false },
            value: {
              show: true,
              fontSize: "18px",
              fontWeight: 600,
              color: "#000",
              formatter: (val) => `${val}%`,
            },
            total: {
              show: false,
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}%`,
      },
    },
  };

  return (
    <div style={{ position: "relative" }}>
      <Chart options={options} series={series} type="donut" height={200} />
    </div>
  );
};

export default CircleChart;
