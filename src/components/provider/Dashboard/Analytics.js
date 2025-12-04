import React, { use, useState } from 'react'
import Chart from "react-apexcharts";
import images from '../../../assets/images';
import { barChartOptions, barChartSeries, visitsChartOptions, vistisChartSeries } from '../../../utils/staticData';
import MiniAreaChart from '../MinAreaChart';
import CircleChart from '../CircleChart';
function Analytics() {
    const [profileName, setProfileName] = useState('signature');
    const getRandomData = (count, min, max) => {
        return Array.from({ length: count }, () =>
            Math.floor(Math.random() * (max - min + 1) + min)
        );
    };

    const [areaChartData] = useState({
        series: [
            {
                name: "Data",
                data: getRandomData(12, 100, 350),
            },
        ],
        options: {
            chart: {
                type: "area",
                height: 300,
                toolbar: { show: false },
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
            dataLabels: { enabled: false },
            xaxis: {
                categories: [
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
                ],
            },
            yaxis: {
                labels: {
                    show: false, // hide Y-axis numbers
                },
            },
            tooltip: {
                custom: function ({ series, seriesIndex, dataPointIndex }) {
                    return (
                        `<div class="apexcharts-tooltip-series-group">` +
                        series[seriesIndex][dataPointIndex] +
                        `</div>`
                    );
                },
            },
        },
    });




    return (
        <>
            {profileName === 'business' ?
                <div className="main-section posting-histry-sec flex-grow-1">
                    <div className="row dash-profile-overflow posting-histry-main-box pt-4 p-0 ">
                        <div className="d-lg-none d-md-block ">
                            <a href="javascript:void(0)" className='mb-mobile-btn'>
                                <i className="fa-solid fa-angle-left" />
                                Back
                            </a>
                        </div>
                        <div className="posting-hist-btn-bx d-flex justify-content-between align-items-center mb-2">
                            <h2 className='fz-32 fw-600 mb-3'>Analytics</h2>
                        </div>
                    </div>
                    <div className="row dash-profile-overflow ">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="dash-profile-sec">
                                <div>
                                    <div className="">
                                        <div className="membership-cards billing-crds dash-history-tab-btn d-flex align-items-center justify-content-between p-0 bg-transparent">
                                            <h3 className="mb-0 p-0">Total profile visits</h3>
                                            <ul className="nav mb-0 my-2" id="myTab" role="tablist">
                                                <li className="tab-item" role="presentation">
                                                    <button
                                                        className="tab-link active"
                                                        data-bs-toggle="tab"
                                                        data-bs-target="#business-tabs-01"
                                                        type="button"
                                                        role="tab"
                                                    >
                                                        12 months
                                                    </button>
                                                </li>
                                                <li className="tab-item" role="presentation">
                                                    <button
                                                        className="tab-link"
                                                        data-bs-toggle="tab"
                                                        data-bs-target="#business-tabs-02"
                                                        type="button"
                                                        role="tab"
                                                    >
                                                        3 months
                                                    </button>
                                                </li>
                                                <li className="tab-item" role="presentation">
                                                    <button
                                                        className="tab-link"
                                                        data-bs-toggle="tab"
                                                        data-bs-target="#business-tabs-03"
                                                        type="button"
                                                        role="tab"
                                                    >
                                                        30 days
                                                    </button>
                                                </li>
                                                <li className="tab-item" role="presentation">
                                                    <button
                                                        className="tab-link"
                                                        data-bs-toggle="tab"
                                                        data-bs-target="#business-tabs-04"
                                                        type="button"
                                                        role="tab"
                                                    >
                                                        7 days
                                                    </button>
                                                </li>
                                                <li className="tab-item" role="presentation">
                                                    <button
                                                        className="tab-link"
                                                        data-bs-toggle="tab"
                                                        data-bs-target="#business-tabs-05"
                                                        type="button"
                                                        role="tab"
                                                    >
                                                        24 hours
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                        <ul>
                                            <li className="divider" />
                                        </ul>
                                    </div>
                                    <div className="">
                                        <div className="tab-content" id="myTabContent">
                                            <div
                                                className="tab-pane fade show active"
                                                id="business-tabs-01"
                                                role="tabpanel"
                                            >
                                                <div className="row mt-3 justify-content-between px-3 analytics-title-bx">
                                                    <div className="d-flex justify-content-between">
                                                        <p>
                                                            This section shows the total number of profile visits
                                                            within the application.
                                                        </p>
                                                        <h5>3,213</h5>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <div id="chart">
                                                            <Chart
                                                                options={areaChartData.options}
                                                                series={areaChartData.series}
                                                                type="area"
                                                                height={300}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="tab-pane fade"
                                                id="business-tabs-02"
                                                role="tabpanel"
                                            >
                                                <div className="row mt-3 justify-content-between px-3">
                                                    <div className="col-lg-8 col-md-6 col-sm-12">
                                                        <div className="row">
                                                            <div className="col-lg-3 col-md-3 col-sm-12">
                                                                <div className="custom-frm-bx option-size">
                                                                    <select name="" id="" className="form-select">
                                                                        <option value="">Date range</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-3 col-sm-12">
                                                                <div className="custom-frm-bx option-size">
                                                                    <select name="" id="" className="form-select">
                                                                        <option value="">Transaction</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-3 col-sm-12">
                                                                <div className="custom-frm-bx option-size">
                                                                    <select name="" id="" className="form-select">
                                                                        <option value="">Service</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-3 col-sm-12">
                                                                <div className="custom-frm-bx option-size">
                                                                    <select name="" id="" className="form-select">
                                                                        <option value="">Currency</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-md-6 col-sm-12">
                                                        <div className="custom-frm-bx">
                                                            <input
                                                                type="text"
                                                                id="searchInput"
                                                                className="form-control dash-board-other-connection-search"
                                                                placeholder="Search New Connections"
                                                            />
                                                            <a href="javascript:void(0)">
                                                                <i className="fa-solid fa-magnifying-glass billing-icon" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="table-responsive billing-tble-sec">
                                                            <table className="table custom-table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>
                                                                            <div className="custom-frm-bx mb-0">
                                                                                <div className="form-check form-check-first mb-0">
                                                                                    <input
                                                                                        className="form-check-input form-chk-input custom-checkbox"
                                                                                        type="checkbox"
                                                                                        defaultValue=""
                                                                                        id="checkDefaultone-f"
                                                                                        defaultChecked=""
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </th>
                                                                        <th>
                                                                            Date <i className="fa-solid fa-arrow-down" />
                                                                        </th>
                                                                        <th>Transaction</th>
                                                                        <th>Service</th>
                                                                        <th>Order</th>
                                                                        <th>Currency</th>
                                                                        <th>
                                                                            Total <i className="fa-solid fa-arrow-down" />
                                                                        </th>
                                                                        <th>PDF</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            {" "}
                                                                            <div className="custom-frm-bx mb-0">
                                                                                <div className="form-check form-check-first mb-0">
                                                                                    <input
                                                                                        className="form-check-input form-chk-input custom-checkbox"
                                                                                        type="checkbox"
                                                                                        defaultValue=""
                                                                                        id="checkDefaultone-f"
                                                                                        defaultChecked=""
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>5/27/2024</td>
                                                                        <td className="">
                                                                            <h5 className="mb-0">Payment</h5>
                                                                            <h6 className="mb-0">F1322371480</h6>
                                                                        </td>
                                                                        <td className="">Book Design</td>
                                                                        <td>FO3C5FC0BD43</td>
                                                                        <td>USD</td>
                                                                        <td className="">74.5</td>
                                                                        <td>
                                                                            <a href="javascript:void(0)">
                                                                                <i className="fa-solid fa-download" />
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            {" "}
                                                                            <div className="custom-frm-bx mb-0">
                                                                                <div className="form-check form-check-first mb-0">
                                                                                    <input
                                                                                        className="form-check-input form-chk-input custom-checkbox"
                                                                                        type="checkbox"
                                                                                        defaultValue=""
                                                                                        id="checkDefaultone-f"
                                                                                        defaultChecked=""
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>5/27/2024</td>
                                                                        <td className="">
                                                                            <h5 className="mb-0">Payment</h5>
                                                                            <h6 className="mb-0">F1322371480</h6>
                                                                        </td>
                                                                        <td className="">Book Design</td>
                                                                        <td>FO3C5FC0BD43</td>
                                                                        <td>USD</td>
                                                                        <td className="">74.5</td>
                                                                        <td>
                                                                            <a href="javascript:void(0)">
                                                                                <i className="fa-solid fa-download" />
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            {" "}
                                                                            <div className="custom-frm-bx mb-0">
                                                                                <div className="form-check form-check-first mb-0">
                                                                                    <input
                                                                                        className="form-check-input form-chk-input custom-checkbox"
                                                                                        type="checkbox"
                                                                                        defaultValue=""
                                                                                        id="checkDefaultone-f"
                                                                                        defaultChecked=""
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>5/27/2024</td>
                                                                        <td className="">
                                                                            <h5 className="mb-0">Payment</h5>
                                                                            <h6 className="mb-0">F1322371480</h6>
                                                                        </td>
                                                                        <td className="">Book Design</td>
                                                                        <td>FO3C5FC0BD43</td>
                                                                        <td>USD</td>
                                                                        <td className="">74.5</td>
                                                                        <td>
                                                                            <a href="javascript:void(0)">
                                                                                <i className="fa-solid fa-download" />
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            {" "}
                                                                            <div className="custom-frm-bx mb-0">
                                                                                <div className="form-check form-check-first mb-0">
                                                                                    <input
                                                                                        className="form-check-input form-chk-input custom-checkbox"
                                                                                        type="checkbox"
                                                                                        defaultValue=""
                                                                                        id="checkDefaultone-f"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>5/27/2024</td>
                                                                        <td className="">
                                                                            <h5 className="mb-0">Payment</h5>
                                                                            <h6 className="mb-0">F1322371480</h6>
                                                                        </td>
                                                                        <td className="">Book Design</td>
                                                                        <td>FO3C5FC0BD43</td>
                                                                        <td>USD</td>
                                                                        <td className="">74.5</td>
                                                                        <td>
                                                                            <a href="javascript:void(0)">
                                                                                <i className="fa-solid fa-download" />
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            {" "}
                                                                            <div className="custom-frm-bx mb-0">
                                                                                <div className="form-check form-check-first mb-0">
                                                                                    <input
                                                                                        className="form-check-input form-chk-input custom-checkbox"
                                                                                        type="checkbox"
                                                                                        defaultValue=""
                                                                                        id="checkDefaultone-f"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>5/27/2024</td>
                                                                        <td className="">5/27/2024</td>
                                                                        <td className="">Book Design</td>
                                                                        <td>FO3C5FC0BD43</td>
                                                                        <td>USD</td>
                                                                        <td className="">74.5</td>
                                                                        <td>
                                                                            <a href="javascript:void(0)">
                                                                                <i className="fa-solid fa-download" />
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            {" "}
                                                                            <div className="custom-frm-bx mb-0">
                                                                                <div className="form-check form-check-first mb-0">
                                                                                    <input
                                                                                        className="form-check-input form-chk-input custom-checkbox"
                                                                                        type="checkbox"
                                                                                        defaultValue=""
                                                                                        id="checkDefaultone-f"
                                                                                        defaultChecked=""
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>5/27/2024</td>
                                                                        <td className="">
                                                                            <h5 className="mb-0">Payment</h5>
                                                                            <h6 className="mb-0">F1322371480</h6>
                                                                        </td>
                                                                        <td className="">Book Design</td>
                                                                        <td>FO3C5FC0BD43</td>
                                                                        <td>USD</td>
                                                                        <td className="">74.5</td>
                                                                        <td>
                                                                            <a href="javascript:void(0)">
                                                                                <i className="fa-solid fa-download" />
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            {" "}
                                                                            <div className="custom-frm-bx mb-0">
                                                                                <div className="form-check form-check-first mb-0">
                                                                                    <input
                                                                                        className="form-check-input form-chk-input custom-checkbox"
                                                                                        type="checkbox"
                                                                                        defaultValue=""
                                                                                        id="checkDefaultone-f"
                                                                                        defaultChecked=""
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>5/27/2024</td>
                                                                        <td className="">
                                                                            <h5 className="mb-0">Payment</h5>
                                                                            <h6 className="mb-0">F1322371480</h6>
                                                                        </td>
                                                                        <td className="">Book Design</td>
                                                                        <td>FO3C5FC0BD43</td>
                                                                        <td>USD</td>
                                                                        <td className="">74.5</td>
                                                                        <td>
                                                                            <a href="javascript:void(0)">
                                                                                <i className="fa-solid fa-download" />
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row pb-2">
                                                    <div className="col-lg-12">
                                                        <div className="">
                                                            <div className="d-flex justify-content-between adver-pagi-sec adver-pagi-desk-sec align-items-center px-3">
                                                                <div className="adver-prev">
                                                                    <a href="javascript:void(0)">
                                                                        <i className="fa-solid fa-arrow-left" />
                                                                        Previous
                                                                    </a>
                                                                </div>
                                                                <div>
                                                                    <ul className="adver-numbr-list">
                                                                        <li>
                                                                            <a href="javascript:void(0)" className="active">
                                                                                1
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="javascript:void(0)">2</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="javascript:void(0)">3</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="javascript:void(0)">---</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="javascript:void(0)">4</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="javascript:void(0)">5</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="javascript:void(0)">6</a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="adver-next">
                                                                    <a href="javascript:void(0)">
                                                                        Next
                                                                        <i className="fa-solid fa-arrow-right" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-between adver-pagi-sec adver-pagi-mob-sec d-none px-3">
                                                                <div className="adver-prev">
                                                                    <a href="javascript:void(0)">
                                                                        <i className="fa-solid fa-arrow-left" />
                                                                    </a>
                                                                </div>
                                                                <div>
                                                                    <ul className="adver-numbr-list">
                                                                        <li>
                                                                            <a href="javascript:void(0)" className="active">
                                                                                1
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="javascript:void(0)">2</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="javascript:void(0)">3</a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="adver-next">
                                                                    <a href="javascript:void(0)">
                                                                        <i className="fa-solid fa-arrow-right" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row dash-profile-overflow mt-4">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="dash-profile-sec analytics-main-sec">
                                <div className="posting-hostry-main-sec">
                                    <div className="posting-hostry-title-header-box ">
                                        <h3 className="mb-0">Total Account Searches</h3>
                                        <p className="mb-0">Views 24 hours</p>
                                    </div>
                                    <ul>
                                        <li className="divider" />
                                    </ul>
                                </div>
                                <div className="posting-history-crd-box analytics-chrt-crd">
                                    <p>
                                        This section displays the total number of account searches performed
                                        within the application.
                                    </p>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-12 d-flex align-items-end">
                                            <div className="analytics-bx-sec">
                                                <h4>
                                                    3{" "}
                                                    <sup>
                                                        <img src={images?.analytics} alt="" /> 50 %
                                                    </sup>
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="analytics-bx-chart-picture">
                                                <img src={images?.analyticsChart} alt="" />
                                            </div>
                                        </div>
                                        {/* <div class="col-lg-12 col-md-12 col-sm-12">
                          <div class="">
                              <div class="analytics-bx-sec">
                                  <h4>3 <sup><img src={images?.analytics} alt=""> 50 %</sup></h4>
                              </div>
                              <div class="analytics-bx-chart-picture">
                                  <img src="assets/images/analytics-chart.png" alt="">
                              </div>
                          </div>
                      </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="analytics-main-sec dash-profile-sec">
                                <div className="posting-hostry-main-sec">
                                    <div className="posting-hostry-title-header-box ">
                                        <h3 className="mb-0">Number of bookmarks</h3>
                                    </div>
                                    <ul>
                                        <li className="divider" />
                                    </ul>
                                </div>
                                <div className="posting-history-crd-box analytics-chrt-crd analyt-chrt-pra">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <p>
                                                This section tracks the total number of bookmarks users have
                                                created within the application.
                                            </p>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="analytics-bx-sec">
                                                <h4 className="text-end">10</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row dash-profile-overflow mt-4">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="analytics-main-sec dash-profile-sec">
                                <div className="posting-hostry-main-sec">
                                    <div className="posting-hostry-title-header-box ">
                                        <h3 className="mb-0">My Favourites</h3>
                                    </div>
                                    <ul>
                                        <li className="divider" />
                                    </ul>
                                </div>
                                <div className="posting-history-crd-box analytics-chrt-crd analyt-chrt-pra">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <p>
                                                This section displays a personalized list of items that the user
                                                has marked as favorites within the application.
                                            </p>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="analytics-bx-sec">
                                                <h4 className="text-end">3</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row dash-profile-overflow mt-4">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="main-profile-sec dash-profile-sec posting-histry-main-box">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="pos-his-firt-div analyt-chrt-btm">
                                            <a href="javascript:void(0)">
                                                <i className="fa-regular fa-comments" />
                                            </a>
                                            <p className="mb-0">
                                                For further feedback on your services and resources, please
                                                contact{" "}
                                                <span>
                                                    <a href="javascript:void(0)" className=" analyt-icns">
                                                        hello@wizbizla.com
                                                    </a>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                :
                <div className="main-section posting-histry-sec flex-grow-1">
                    <div className="row dash-profile-overflow posting-histry-main-box pt-3 p-0 ">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="">
                                <div className="membership-cards billing-crds dash-history-tab-btn d-flex align-items-center justify-content-between p-0  bg-transparent">
                                    <ul className="nav mb-0 my-2" id="myTab" role="tablist">
                                        <li className="tab-item" role="presentation">
                                            <button
                                                className="tab-link active"
                                                data-bs-toggle="tab"
                                                data-bs-target="#analytic-tabs-01"
                                                type="button"
                                                role="tab"
                                            >
                                                Profile 1
                                            </button>
                                        </li>
                                        <li className="tab-item" role="presentation">
                                            <button
                                                className="tab-link"
                                                data-bs-toggle="tab"
                                                data-bs-target="#analytic-tabs-02"
                                                type="button"
                                                role="tab"
                                            >
                                                Profile 2
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="">
                                <div className="tab-content" id="myTabContent">
                                    <div
                                        className="tab-pane fade show active"
                                        id="analytic-tabs-01"
                                        role="tabpanel"
                                    >
                                        <div className="row dash-profile-overflow posting-histry-main-box pt-4 p-0 mx-lg-2 mx-sm-0">
                                            <div className="d-lg-none d-md-block">
                                                <a href="javascript:void(0)" className='mb-mobile-btn'>
                                                    <i className="fa-solid fa-angle-left" />
                                                    Back
                                                </a>
                                            </div>
                                            <div className="posting-hist-btn-bx d-flex justify-content-between align-items-center mb-2">
                                                <h2 className='fz-32 fw-600 mb-3'>Analytics</h2>
                                            </div>
                                        </div>
                                        <div className="row  mx-lg-2 mx-sm-0">
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <div className="dash-profile-sec">
                                                    <div>
                                                        <div className="">
                                                            <div className="membership-cards billing-crds dash-history-tab-btn d-flex align-items-center justify-content-between p-0">
                                                                <h3 className="mb-0 p-0">Total profile visits</h3>
                                                                <ul className="nav mb-0 my-2" id="myTab" role="tablist">
                                                                    <li className="tab-item" role="presentation">
                                                                        <button
                                                                            className="tab-link active"
                                                                            data-bs-toggle="tab"
                                                                            data-bs-target="#business-tabs-01"
                                                                            type="button"
                                                                            role="tab"
                                                                        >
                                                                            12 months
                                                                        </button>
                                                                    </li>
                                                                    <li className="tab-item" role="presentation">
                                                                        <button
                                                                            className="tab-link"
                                                                            data-bs-toggle="tab"
                                                                            data-bs-target="#business-tabs-02"
                                                                            type="button"
                                                                            role="tab"
                                                                        >
                                                                            3 months
                                                                        </button>
                                                                    </li>
                                                                    <li className="tab-item" role="presentation">
                                                                        <button
                                                                            className="tab-link"
                                                                            data-bs-toggle="tab"
                                                                            data-bs-target="#business-tabs-03"
                                                                            type="button"
                                                                            role="tab"
                                                                        >
                                                                            30 days
                                                                        </button>
                                                                    </li>
                                                                    <li className="tab-item" role="presentation">
                                                                        <button
                                                                            className="tab-link"
                                                                            data-bs-toggle="tab"
                                                                            data-bs-target="#business-tabs-04"
                                                                            type="button"
                                                                            role="tab"
                                                                        >
                                                                            7 days
                                                                        </button>
                                                                    </li>
                                                                    <li className="tab-item" role="presentation">
                                                                        <button
                                                                            className="tab-link"
                                                                            data-bs-toggle="tab"
                                                                            data-bs-target="#business-tabs-05"
                                                                            type="button"
                                                                            role="tab"
                                                                        >
                                                                            24 hours
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <ul>
                                                                <li className="divider" />
                                                            </ul>
                                                        </div>
                                                        <div className="">
                                                            <div className="tab-content" id="myTabContent">
                                                                <div
                                                                    className="tab-pane fade show active"
                                                                    id="business-tabs-01"
                                                                    role="tabpanel"
                                                                >
                                                                    <div className="row mt-3 justify-content-between px-3 analytics-title-bx">
                                                                        <div className="d-flex justify-content-between">
                                                                            <p>
                                                                                This section shows the total number of profile
                                                                                visits within the application.
                                                                            </p>
                                                                            <h5>3,213</h5>
                                                                        </div>
                                                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                                                            <div id="chart" >
                                                                                <Chart
                                                                                    options={areaChartData.options}
                                                                                    series={areaChartData.series}
                                                                                    type="area"
                                                                                    height={300}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="tab-pane fade"
                                                                    id="business-tabs-02"
                                                                    role="tabpanel"
                                                                >
                                                                    <div className="row mt-3 justify-content-between px-3">
                                                                        <div className="col-lg-8 col-md-6 col-sm-12">
                                                                            <div className="row">
                                                                                <div className="col-lg-3 col-md-3 col-sm-12">
                                                                                    <div className="custom-frm-bx option-size">
                                                                                        <select
                                                                                            name=""
                                                                                            id=""
                                                                                            className="form-select"
                                                                                        >
                                                                                            <option value="">Date range</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-lg-3 col-md-3 col-sm-12">
                                                                                    <div className="custom-frm-bx option-size">
                                                                                        <select
                                                                                            name=""
                                                                                            id=""
                                                                                            className="form-select"
                                                                                        >
                                                                                            <option value="">Transaction</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-lg-3 col-md-3 col-sm-12">
                                                                                    <div className="custom-frm-bx option-size">
                                                                                        <select
                                                                                            name=""
                                                                                            id=""
                                                                                            className="form-select"
                                                                                        >
                                                                                            <option value="">Service</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-lg-3 col-md-3 col-sm-12">
                                                                                    <div className="custom-frm-bx option-size">
                                                                                        <select
                                                                                            name=""
                                                                                            id=""
                                                                                            className="form-select"
                                                                                        >
                                                                                            <option value="">Currency</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-3 col-md-6 col-sm-12">
                                                                            <div className="custom-frm-bx">
                                                                                <input
                                                                                    type="text"
                                                                                    id="searchInput"
                                                                                    className="form-control dash-board-other-connection-search"
                                                                                    placeholder="Search New Connections"
                                                                                />
                                                                                <a href="javascript:void(0)">
                                                                                    <i className="fa-solid fa-magnifying-glass billing-icon" />
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-lg-12">
                                                                            <div className="table-responsive billing-tble-sec">
                                                                                <table className="table custom-table">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th>
                                                                                                <div className="custom-frm-bx mb-0">
                                                                                                    <div className="form-check form-check-first mb-0">
                                                                                                        <input
                                                                                                            className="form-check-input form-chk-input custom-checkbox"
                                                                                                            type="checkbox"
                                                                                                            defaultValue=""
                                                                                                            id="checkDefaultone-f"
                                                                                                            defaultChecked=""
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </th>
                                                                                            <th>
                                                                                                Date{" "}
                                                                                                <i className="fa-solid fa-arrow-down" />
                                                                                            </th>
                                                                                            <th>Transaction</th>
                                                                                            <th>Service</th>
                                                                                            <th>Order</th>
                                                                                            <th>Currency</th>
                                                                                            <th>
                                                                                                Total{" "}
                                                                                                <i className="fa-solid fa-arrow-down" />
                                                                                            </th>
                                                                                            <th>PDF</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <div className="custom-frm-bx mb-0">
                                                                                                    <div className="form-check form-check-first mb-0">
                                                                                                        <input
                                                                                                            className="form-check-input form-chk-input custom-checkbox"
                                                                                                            type="checkbox"
                                                                                                            defaultValue=""
                                                                                                            id="checkDefaultone-f"
                                                                                                            defaultChecked=""
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td>5/27/2024</td>
                                                                                            <td className="">
                                                                                                <h5 className="mb-0">Payment</h5>
                                                                                                <h6 className="mb-0">F1322371480</h6>
                                                                                            </td>
                                                                                            <td className="">Book Design</td>
                                                                                            <td>FO3C5FC0BD43</td>
                                                                                            <td>USD</td>
                                                                                            <td className="">74.5</td>
                                                                                            <td>
                                                                                                <a href="javascript:void(0)">
                                                                                                    <i className="fa-solid fa-download" />
                                                                                                </a>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <div className="custom-frm-bx mb-0">
                                                                                                    <div className="form-check form-check-first mb-0">
                                                                                                        <input
                                                                                                            className="form-check-input form-chk-input custom-checkbox"
                                                                                                            type="checkbox"
                                                                                                            defaultValue=""
                                                                                                            id="checkDefaultone-f"
                                                                                                            defaultChecked=""
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td>5/27/2024</td>
                                                                                            <td className="">
                                                                                                <h5 className="mb-0">Payment</h5>
                                                                                                <h6 className="mb-0">F1322371480</h6>
                                                                                            </td>
                                                                                            <td className="">Book Design</td>
                                                                                            <td>FO3C5FC0BD43</td>
                                                                                            <td>USD</td>
                                                                                            <td className="">74.5</td>
                                                                                            <td>
                                                                                                <a href="javascript:void(0)">
                                                                                                    <i className="fa-solid fa-download" />
                                                                                                </a>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <div className="custom-frm-bx mb-0">
                                                                                                    <div className="form-check form-check-first mb-0">
                                                                                                        <input
                                                                                                            className="form-check-input form-chk-input custom-checkbox"
                                                                                                            type="checkbox"
                                                                                                            defaultValue=""
                                                                                                            id="checkDefaultone-f"
                                                                                                            defaultChecked=""
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td>5/27/2024</td>
                                                                                            <td className="">
                                                                                                <h5 className="mb-0">Payment</h5>
                                                                                                <h6 className="mb-0">F1322371480</h6>
                                                                                            </td>
                                                                                            <td className="">Book Design</td>
                                                                                            <td>FO3C5FC0BD43</td>
                                                                                            <td>USD</td>
                                                                                            <td className="">74.5</td>
                                                                                            <td>
                                                                                                <a href="javascript:void(0)">
                                                                                                    <i className="fa-solid fa-download" />
                                                                                                </a>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <div className="custom-frm-bx mb-0">
                                                                                                    <div className="form-check form-check-first mb-0">
                                                                                                        <input
                                                                                                            className="form-check-input form-chk-input custom-checkbox"
                                                                                                            type="checkbox"
                                                                                                            defaultValue=""
                                                                                                            id="checkDefaultone-f"
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td>5/27/2024</td>
                                                                                            <td className="">
                                                                                                <h5 className="mb-0">Payment</h5>
                                                                                                <h6 className="mb-0">F1322371480</h6>
                                                                                            </td>
                                                                                            <td className="">Book Design</td>
                                                                                            <td>FO3C5FC0BD43</td>
                                                                                            <td>USD</td>
                                                                                            <td className="">74.5</td>
                                                                                            <td>
                                                                                                <a href="javascript:void(0)">
                                                                                                    <i className="fa-solid fa-download" />
                                                                                                </a>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <div className="custom-frm-bx mb-0">
                                                                                                    <div className="form-check form-check-first mb-0">
                                                                                                        <input
                                                                                                            className="form-check-input form-chk-input custom-checkbox"
                                                                                                            type="checkbox"
                                                                                                            defaultValue=""
                                                                                                            id="checkDefaultone-f"
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td>5/27/2024</td>
                                                                                            <td className="">5/27/2024</td>
                                                                                            <td className="">Book Design</td>
                                                                                            <td>FO3C5FC0BD43</td>
                                                                                            <td>USD</td>
                                                                                            <td className="">74.5</td>
                                                                                            <td>
                                                                                                <a href="javascript:void(0)">
                                                                                                    <i className="fa-solid fa-download" />
                                                                                                </a>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <div className="custom-frm-bx mb-0">
                                                                                                    <div className="form-check form-check-first mb-0">
                                                                                                        <input
                                                                                                            className="form-check-input form-chk-input custom-checkbox"
                                                                                                            type="checkbox"
                                                                                                            defaultValue=""
                                                                                                            id="checkDefaultone-f"
                                                                                                            defaultChecked=""
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td>5/27/2024</td>
                                                                                            <td className="">
                                                                                                <h5 className="mb-0">Payment</h5>
                                                                                                <h6 className="mb-0">F1322371480</h6>
                                                                                            </td>
                                                                                            <td className="">Book Design</td>
                                                                                            <td>FO3C5FC0BD43</td>
                                                                                            <td>USD</td>
                                                                                            <td className="">74.5</td>
                                                                                            <td>
                                                                                                <a href="javascript:void(0)">
                                                                                                    <i className="fa-solid fa-download" />
                                                                                                </a>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <div className="custom-frm-bx mb-0">
                                                                                                    <div className="form-check form-check-first mb-0">
                                                                                                        <input
                                                                                                            className="form-check-input form-chk-input custom-checkbox"
                                                                                                            type="checkbox"
                                                                                                            defaultValue=""
                                                                                                            id="checkDefaultone-f"
                                                                                                            defaultChecked=""
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td>5/27/2024</td>
                                                                                            <td className="">
                                                                                                <h5 className="mb-0">Payment</h5>
                                                                                                <h6 className="mb-0">F1322371480</h6>
                                                                                            </td>
                                                                                            <td className="">Book Design</td>
                                                                                            <td>FO3C5FC0BD43</td>
                                                                                            <td>USD</td>
                                                                                            <td className="">74.5</td>
                                                                                            <td>
                                                                                                <a href="javascript:void(0)">
                                                                                                    <i className="fa-solid fa-download" />
                                                                                                </a>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row pb-2">
                                                                        <div className="col-lg-12">
                                                                            <div className="">
                                                                                <div className="d-flex justify-content-between adver-pagi-sec adver-pagi-desk-sec align-items-center px-3">
                                                                                    <div className="adver-prev">
                                                                                        <a href="javascript:void(0)">
                                                                                            <i className="fa-solid fa-arrow-left" />
                                                                                            Previous
                                                                                        </a>
                                                                                    </div>
                                                                                    <div>
                                                                                        <ul className="adver-numbr-list">
                                                                                            <li>
                                                                                                <a
                                                                                                    href="javascript:void(0)"
                                                                                                    className="active"
                                                                                                >
                                                                                                    1
                                                                                                </a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a href="javascript:void(0)">2</a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a href="javascript:void(0)">3</a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a href="javascript:void(0)">---</a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a href="javascript:void(0)">4</a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a href="javascript:void(0)">5</a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a href="javascript:void(0)">6</a>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                    <div className="adver-next">
                                                                                        <a href="javascript:void(0)">
                                                                                            Next
                                                                                            <i className="fa-solid fa-arrow-right" />
                                                                                        </a>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="d-flex justify-content-between adver-pagi-sec adver-pagi-mob-sec d-none px-3">
                                                                                    <div className="adver-prev">
                                                                                        <a href="javascript:void(0)">
                                                                                            <i className="fa-solid fa-arrow-left" />
                                                                                        </a>
                                                                                    </div>
                                                                                    <div>
                                                                                        <ul className="adver-numbr-list">
                                                                                            <li>
                                                                                                <a
                                                                                                    href="javascript:void(0)"
                                                                                                    className="active"
                                                                                                >
                                                                                                    1
                                                                                                </a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a href="javascript:void(0)">2</a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a href="javascript:void(0)">3</a>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                    <div className="adver-next">
                                                                                        <a href="javascript:void(0)">
                                                                                            <i className="fa-solid fa-arrow-right" />
                                                                                        </a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row  mt-4 mx-lg-2 mx-sm-0">
                                            <div className="col-lg-6">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                                        <div className="dash-profile-sec ">

                                                            <div className="posting-hostry-main-sec">
                                                                <div className="posting-hostry-title-header-box ">
                                                                    <h3 className="mb-0">Visits</h3>
                                                                </div>
                                                                <div className="posting-history-crd-box analytics-chrt-crd">
                                                                    <div className="stat-card-unique">
                                                                        <div className="stat-value-unique">
                                                                            3,213 <span className="stat-badge-up">+5%</span>
                                                                        </div>
                                                                        <div id="chart1-unique" />
                                                                    </div>
                                                                </div>
                                                                <ul>
                                                                    <li className="divider" >
                                                                        <MiniAreaChart color={'#4F40FF'} data={getRandomData(8, 20, 100)} />
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                                        <div className="dash-profile-sec ">
                                                            <div className="posting-hostry-main-sec">
                                                                <div className="posting-hostry-title-header-box ">
                                                                    <h3 className="mb-0">Unique Visits</h3>
                                                                </div>
                                                                <div className="posting-history-crd-box analytics-chrt-crd">
                                                                    <div className="stat-card-unique">
                                                                        <div className="stat-value-unique">
                                                                            7,842 <span className="stat-badge-up">+8%</span>
                                                                        </div>
                                                                        <div id="chart2-unique" />
                                                                    </div>
                                                                </div>
                                                                <ul>
                                                                    <li className="divider" >
                                                                        <MiniAreaChart color={'#4F40FF'} data={getRandomData(8, 20, 100)} />
                                                                    </li>
                                                                </ul>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mt-4">
                                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                                        <div className="dash-profile-sec ">
                                                            <div className="posting-hostry-main-sec">
                                                                <div className="posting-hostry-title-header-box ">
                                                                    <h3 className="mb-0">Bounce Rate</h3>
                                                                </div>
                                                                <div className="posting-history-crd-box analytics-chrt-crd">
                                                                    <div className="stat-card-unique">
                                                                        <div className="stat-value-unique">
                                                                            5,126 <span className="stat-badge-up">+2%</span>
                                                                        </div>
                                                                        <div id="chart3-unique" />
                                                                    </div>
                                                                </div>
                                                                <ul>
                                                                    <li className="divider">
                                                                        <MiniAreaChart color={'#4F40FF'} data={getRandomData(8, 20, 100)} />
                                                                    </li>
                                                                </ul>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                                        <div className="dash-profile-sec ">
                                                            <div className="posting-hostry-main-sec">
                                                                <div className="posting-hostry-title-header-box ">
                                                                    <h3 className="mb-0">Avg Visit Duration</h3>
                                                                </div>
                                                                <div className="posting-history-crd-box analytics-chrt-crd">
                                                                    <div className="stat-card-unique">
                                                                        <div className="stat-value-unique">
                                                                            9,450 <span className="stat-badge-up">+12%</span>
                                                                        </div>
                                                                        <div id="chart4-unique" />
                                                                    </div>
                                                                </div>
                                                                <ul>
                                                                    <li className="divider" >
                                                                        <MiniAreaChart color={'#4F40FF'} data={getRandomData(8, 20, 100)} />
                                                                    </li>
                                                                </ul>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="dash-profile-sec ">
                                                    <div className="posting-hostry-title-header-box ">
                                                        <h3 className="mb-0">New vs Returning Visitors</h3>
                                                    </div>
                                                    <div className="posting-hostry-main-sec d-flex justify-content-around align-items-center nw-analytics">
                                                        <ul>
                                                            {/* <li className="divider" > */}
                                                            <CircleChart series={[36.40, 63.60]} labels={["New Visitors", "Returning Visitors"]}  height={300}/>
                                                            {/* </li> */}
                                                        </ul>
                                                        <div className="posting-history-crd-box analytics-chrt-crd">
                                                            <div className="visitors-chart-box">
                                                                <div className="chart-content">
                                                                    {/* <canvas id="visitorsDonutChart1" /> */}
                                                                    <div className="chart-legend">
                                                                        <div className="legend-item">
                                                                            <span className="legend-icon new-icon analytics-icon">
                                                                                <i class="fas fa-mars mars-icon"></i>
                                                                            </span>
                                                                            <div>
                                                                                <p>New Visitors</p>
                                                                                <h5>36.4%</h5>
                                                                            </div>
                                                                        </div>
                                                                        <div className="legend-item">
                                                                             <span className="legend-icon new-icon analytics-icon">
                                                                                <i class="fas fa-mars mars-icon"></i>
                                                                            </span>
                                                                            <div>
                                                                                <p>Returning Visitors</p>
                                                                                <h5>63.6%</h5>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row  mt-4 mx-lg-2 mx-sm-0">
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <div className="dash-profile-sec">
                                                    <div>
                                                        <div className="">
                                                            <div className="membership-cards billing-crds dash-history-tab-btn d-flex align-items-center justify-content-between p-0">
                                                                <h3 className="mb-0 p-0">Age Demographics</h3>
                                                                <ul className="nav mb-0 my-2" id="myTab" role="tablist">
                                                                    <li className="tab-item" role="presentation">
                                                                        <button
                                                                            className="tab-link active"
                                                                            data-bs-toggle="tab"
                                                                            data-bs-target="#business-tabs-g-1"
                                                                            type="button"
                                                                            role="tab"
                                                                        >
                                                                            12 months
                                                                        </button>
                                                                    </li>
                                                                    <li className="tab-item" role="presentation">
                                                                        <button
                                                                            className="tab-link"
                                                                            data-bs-toggle="tab"
                                                                            data-bs-target="#business-tabs-g-2"
                                                                            type="button"
                                                                            role="tab"
                                                                        >
                                                                            3 months
                                                                        </button>
                                                                    </li>
                                                                    <li className="tab-item" role="presentation">
                                                                        <button
                                                                            className="tab-link"
                                                                            data-bs-toggle="tab"
                                                                            data-bs-target="#business-tabs-g-3"
                                                                            type="button"
                                                                            role="tab"
                                                                        >
                                                                            30 days
                                                                        </button>
                                                                    </li>
                                                                    <li className="tab-item" role="presentation">
                                                                        <button
                                                                            className="tab-link"
                                                                            data-bs-toggle="tab"
                                                                            data-bs-target="#business-tabs-g-4"
                                                                            type="button"
                                                                            role="tab"
                                                                        >
                                                                            7 days
                                                                        </button>
                                                                    </li>
                                                                    <li className="tab-item" role="presentation">
                                                                        <button
                                                                            className="tab-link"
                                                                            data-bs-toggle="tab"
                                                                            data-bs-target="#business-tabs-g-5"
                                                                            type="button"
                                                                            role="tab"
                                                                        >
                                                                            24 hours
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <ul>
                                                                <li className="divider" >


                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="">
                                                            <div className="tab-content" id="myTabContent">
                                                                <div
                                                                    className="tab-pane fade show active"
                                                                    id="business-tabs-g-1"
                                                                    role="tabpanel"
                                                                >
                                                                    <div className="row mt-3 justify-content-between px-3 analytics-title-bx">
                                                                        <div className="d-flex justify-content-between">
                                                                            <p>
                                                                                This section shows the total number of profile
                                                                                visits within the application.
                                                                            </p>
                                                                            <h5>3,213</h5>
                                                                        </div>
                                                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                                                            <div id="ageChart" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="tab-pane fade"
                                                                    id="business-tabs-g-2"
                                                                    role="tabpanel"
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row  mt-4 mx-lg-2 mx-sm-0">
                                            <div className="col-lg-6">
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <div className="dash-profile-sec ">
                                                            <div className="posting-hostry-main-sec">
                                                                <div className="posting-hostry-title-header-box ">
                                                                    <h3 className="mb-0">Visits</h3>
                                                                </div>
                                                                <ul>
                                                                    <li className="divider" >
                                                                        <Chart options={barChartOptions}
                                                                            series={barChartSeries} type="bar" height={150} />
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="posting-history-crd-box analytics-chrt-crd">
                                                                <div id="countryChart" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
                                                        <div className="dash-profile-sec ">
                                                            <div className="posting-hostry-main-sec">
                                                                <div className="posting-hostry-title-header-box ">
                                                                    <h3 className="mb-0">Unique Visits</h3>
                                                                </div>
                                                                <ul>
                                                                    <li className="divider" >
                                                                        <Chart options={visitsChartOptions}
                                                                            series={vistisChartSeries} type="bar" height={150} />
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="posting-history-crd-box analytics-chrt-crd">
                                                                <div id="visaChart" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="dash-profile-sec ">
                                                    <div className="posting-hostry-title-header-box ">
                                                        <h3 className="mb-0">Gender</h3>
                                                    </div>
                                                    <div className="posting-hostry-main-sec d-flex justify-content-around align-items-center nw-analytics">
                                                        <ul>
                                                            <CircleChart series={[36.40, 63.60]} labels={["Male", "Female"]} />
                                                        </ul>
                                                        <div className="posting-history-crd-box analytics-chrt-crd">
                                                            <div className="visitors-chart-box">
                                                                <div className="chart-content ">
                                                                    <div className="chart-legend">
                                                                        <div className="legend-item">
                                                                             <span className="legend-icon new-icon analytics-icon">
                                                                                <i class="fas fa-mars mars-icon"></i>
                                                                            </span>
                                                                            <div>
                                                                                <p>Male</p>
                                                                                <h5>36.4%</h5>
                                                                            </div>
                                                                        </div>
                                                                        <div className="legend-item">
                                                                            <span className="legend-icon new-icon analytics-icon">
                                                                                <i class="fas fa-mars mars-icon"></i>
                                                                            </span>
                                                                            <div>
                                                                                <p>Female</p>
                                                                                <h5>63.6%</h5>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row  mt-4 mx-lg-2 mx-sm-0">
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="dash-profile-sec analytics-main-sec">
                                                    <div className="posting-hostry-main-sec">
                                                        <div className="posting-hostry-title-header-box ">
                                                            <h3 className="mb-0">Total Account Searches</h3>
                                                            <p className="mb-0">Views 24 hours</p>
                                                        </div>
                                                        <ul>
                                                            <li className="divider" />
                                                        </ul>
                                                    </div>
                                                    <div className="posting-history-crd-box analytics-chrt-crd">
                                                        <p>
                                                            This section displays the total number of account searches
                                                            performed within the application.
                                                        </p>
                                                        <div className="row">
                                                            <div className="col-lg-6 col-md-6 col-sm-12 d-flex align-items-end">
                                                                <div className="analytics-bx-sec">
                                                                    <h4>
                                                                        3{" "}
                                                                        <sup>
                                                                            <img src={images?.analytics} alt="" />{" "}
                                                                            50 %
                                                                        </sup>
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                                <div className="analytics-bx-chart-picture">
                                                                    <img src="assets/images/analytics-chart.png" alt="" />
                                                                </div>
                                                            </div>
                                                            {/* <div class="col-lg-12 col-md-12 col-sm-12">
                          <div class="">
                              <div class="analytics-bx-sec">
                                  <h4>3 <sup><img src={images?.analytics} alt=""> 50 %</sup></h4>
                              </div>
                              <div class="analytics-bx-chart-picture">
                                  <img src="assets/images/analytics-chart.png" alt="">
                              </div>
                          </div>
                      </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="analytics-main-sec dash-profile-sec">
                                                    <div className="posting-hostry-main-sec">
                                                        <div className="posting-hostry-title-header-box ">
                                                            <h3 className="mb-0">Number of bookmarks</h3>
                                                        </div>
                                                        <ul>
                                                            <li className="divider" />
                                                        </ul>
                                                    </div>
                                                    <div className="posting-history-crd-box analytics-chrt-crd analyt-chrt-pra">
                                                        <div className="row">
                                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                                <p>
                                                                    This section tracks the total number of bookmarks
                                                                    users have created within the application.
                                                                </p>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                                <div className="analytics-bx-sec">
                                                                    <h4 className="text-end">10</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row  mt-4 mx-lg-2 mx-sm-0">
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="analytics-main-sec dash-profile-sec">
                                                    <div className="posting-hostry-main-sec">
                                                        <div className="posting-hostry-title-header-box ">
                                                            <h3 className="mb-0">My Favourites</h3>
                                                        </div>
                                                        <ul>
                                                            <li className="divider" />
                                                        </ul>
                                                    </div>
                                                    <div className="posting-history-crd-box analytics-chrt-crd analyt-chrt-pra">
                                                        <div className="row">
                                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                                <p>
                                                                    This section displays a personalized list of items
                                                                    that the user has marked as favorites within the
                                                                    application.
                                                                </p>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                                <div className="analytics-bx-sec">
                                                                    <h4 className="text-end">3</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="analytics-main-sec dash-profile-sec">
                                                    <div className="posting-hostry-main-sec">
                                                        <div className="posting-hostry-title-header-box ">
                                                            <h3 className="mb-0">My Ratings</h3>
                                                        </div>
                                                        <ul>
                                                            <li className="divider" />
                                                        </ul>
                                                    </div>
                                                    <div className="posting-history-crd-box analytics-chrt-crd analyt-chrt-pra">
                                                        <div className="row">
                                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                                <p>
                                                                    This section displays the total number of ratings
                                                                    given by you of the portal.
                                                                </p>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                                <div className="analytics-bx-sec">
                                                                    <h4 className="text-end">5</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row  mt-4 mx-lg-2 mx-sm-0">
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <div className="main-profile-sec dash-profile-sec posting-histry-main-box">
                                                    <div className="row">
                                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                                            <div className="pos-his-firt-div analyt-chrt-btm">
                                                                <a href="javascript:void(0)">
                                                                    <i className="fa-regular fa-comments" />
                                                                </a>
                                                                <p className="mb-0">
                                                                    For further feedback on your services and resources,
                                                                    please contact{" "}
                                                                    <span>
                                                                        <a
                                                                            href="javascript:void(0)"
                                                                            className=" analyt-icns"
                                                                        >
                                                                            hello@wizbizla.com
                                                                        </a>
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="analytic-tabs-02"
                                        role="tabpanel"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </>
    )
}

export default Analytics
