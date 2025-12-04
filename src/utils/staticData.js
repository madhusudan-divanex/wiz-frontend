import images from '../assets/images';
const profiles = [
    {
        img: images?.dashSliderFirst,
        name: 'Amélie Laurent',
        title: 'Founder & CEO',
        company: 'Microsoft',
    },
    {
        img: images?.dashSliderTwo,
        name: 'Nikolas Gibbons',
        title: 'Engineering Manager',
        company: 'Microsoft',
    },
    {
        img: images?.dashSliderThree,
        name: 'Sienna Hewitt',
        title: 'Product Manager',
        company: 'Microsoft',
    },
    {
        img: images?.dashSliderFours,
        name: 'Marco Kelly',
        title: 'Product Manager',
        company: 'Microsoft',
    },
];

const categories = ["USA", "UAE", "UK", "China", "Other"];
const data = [35, 45, 35, 15, 10];
const seriesName = "Country";

const barChartOptions = {
    chart: {
        type: "bar",
        height: 150,
        toolbar: { show: false },
    },
    plotOptions: {
        bar: {
            borderRadius: 6,
            columnWidth: "40%",
            distributed: true,
        },
    },
    colors: data.map((_, i) => (i === 0 ? "#4F40FF1A" : "#4F40FF")),
    dataLabels: {
        enabled: true,
        formatter: (val) => `${val}%`,
        style: {
            fontSize: "12px",
            colors: ["#fff"],
        },
    },
    xaxis: {
        categories,
        labels: { style: { fontSize: "14px" } },
    },
    yaxis: {
        labels: {
            formatter: (val) => `${val}%`,
        },
    },
    legend: { show: false },
    grid: { borderColor: "#f1f1f1" },
};

const barChartSeries = [
    {
        name: seriesName,
        data: data,
    },
];

 const visitCategories = ["BUSINESS", "FAMILY", "FREELANCE", "GOLDEN", "NON-RESIDENT"];
    const visitData = [35, 45, 35, 15, 10];
    const visitSeriesName = "Unique Visits";

    const visitsChartOptions = {
        chart: {
            type: "bar",
            height: 150,
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                borderRadius: 6,
                columnWidth: "40%",
                distributed: true,
            },
        },
        colors: visitData.map((_, i) => (i === 0 ? "#4F40FF1A" : "#4F40FF")),
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val}%`,
            style: {
                fontSize: "12px",
                colors: ["#fff"],
            },
        },
        xaxis: {
            categories:visitCategories,
            labels: { style: { fontSize: "14px" } },
        },
        yaxis: {
            labels: {
                formatter: (val) => `${val}%`,
            },
        },
        legend: { show: false },
        grid: { borderColor: "#f1f1f1" },
    };

    const vistisChartSeries = [
        {
            name: visitSeriesName,
            data: visitData,
        },
    ];

const servicesList = [
    "Vetted Trusted Service Providers",
    "Dispute Resolution",
    "Independently Verified References",
    "Bespoke Concierge Services",
    "Scam Tracker",
    "Scam Case Studies",
    "Scam Alerts and Tips"
  ];

function timeAgo(date) {
  const now = new Date();
  const diffInMs = now - new Date(date);
  const diffInSec = Math.floor(diffInMs / 1000);
  const diffInMin = Math.floor(diffInSec / 60);
  const diffInHour = Math.floor(diffInMin / 60);
  const diffInDay = Math.floor(diffInHour / 24);
  const diffInMonth = Math.floor(diffInDay / 30); // Approximation
  const diffInYear = Math.floor(diffInMonth / 12);

  if (diffInSec < 60) {
    return `${diffInSec} seconds ago`;
  } else if (diffInMin < 60) {
    return `${diffInMin} minutes ago`;
  } else if (diffInHour < 24) {
    return `${diffInHour} hours ago`;
  } else if (diffInDay < 30) {
    return `${diffInDay} days ago`;
  } else if (diffInMonth < 12) {
    return `${diffInMonth} months ago`;
  } else {
    return `${diffInYear} years ago`;
  }
}

export { profiles, barChartOptions, barChartSeries ,visitsChartOptions,vistisChartSeries,servicesList,timeAgo};