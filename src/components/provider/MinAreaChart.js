// src/components/MiniAreaChart.jsx
import React from "react";
import Chart from "react-apexcharts";

const MiniAreaChart = ({ color = "#5a4ff2", data }) => {
    const options = {
        chart: {
            type: "area",
            height: 80,
            sparkline: { enabled: true }, // removes axes & padding
        },

        stroke: {
            curve: "smooth",
            width: 2,
            colors: ["#5a4ff2"],
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.15,
                opacityTo: 0,
                stops: [0, 90, 100],
            },
        },
        tooltip: { enabled: false },
    };

    const series = [{ data }];

    return <Chart options={options} series={series} type="area" height={80} />;
};

export default MiniAreaChart;
