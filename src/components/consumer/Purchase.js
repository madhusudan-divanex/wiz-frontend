import React, { useEffect, useState } from 'react'
import images from '../../assets/images'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData } from '../../redux/features/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getApiData, getSecureApiData, securePostData } from '../../services/api'
import { Modal } from 'bootstrap'
import { categoryData } from '../../utils/GlobalFunction'
import base_url from '../../baseUrl'

function ConsumerPurchase() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userId = localStorage.getItem('userId')
    const [isMatch, setIsMatch] = useState(false)
    const [allDispute, setAllDispute] = useState([])
    const [bespokeRequest, setBespokeRequest] = useState([])
    const [addOnData, setAddOnData] = useState([])
    const [selectedAddOn, setSelectedAddOn] = useState(0)
    const [openDispute, setOpenDispute] = useState({ userId, message: "", type: "", against: "", againstId: "", subject: "", image: null, preview: null })
    const [customizeRequest, setCustomizeRequest] = useState([])
    const [businessCategory, setBusinessCategory] = useState([])
    const [disputeAddOn, setDisputeAddOn] = useState(null)
    const [matchProfile, setMatchProfile] = useState([])
    const [isKey, setIsKey] = useState(null)
    const { profileData, membershipData, businessData } = useSelector(state => state.user)
    const [bespokeForm, setBespokeForm] = useState({
        userId, firstName: "", lastName: "", email: "", contactNumber: "", businessName: "", businessCategory: "",
        serviceActivity: "", priceRange: null, serviceDate: undefined, specificRequirement: '', preferenceToAvoid: "", serviceLocation: ""
    })

    useEffect(() => {
        dispatch(fetchUserData())
    }, [dispatch])
    const cancelMembership = async () => {
        try {
            const response = await securePostData('api/users/cancel-membership', { userId, membershipId: membershipData._id })
            if (response.success) {
                dispatch(fetchUserData())
                toast.success("Your membership is cancel")
            } else {
                toast.error(response.message)
            }
        } catch (error) {

        }
    }
    const [total, setTotal] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const { memembershipData } = useSelector(state => state.user)
    const [purchase, setPurchase] = useState([])

    async function getPurchase() {
        try {
            const result = await getSecureApiData(`api/users/purchase-history/${userId}?page=${currentPage}&type=service`)
            if (result.success) {
                setPurchase(result.data)
                setTotal(result.totalPages)

            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        getPurchase()
    }, [currentPage])
    const [totalBespoke, setTotalBespoke] = useState(0)
    const [currentBespoke, setCurrentBespoke] = useState(1)
    const [customizeTotal, setCustomizeTotal] = useState(0)
    const [currentCustomize, setCurrentCustomize] = useState(1)
    async function getBespoke() {
        try {
            const result = await getSecureApiData(`api/users/request-bespoke/${userId}?page=${currentPage}&type=concierge-service`)
            if (result.success) {
                setBespokeRequest(result.bespokeData)
                setTotal(result.totalPages)

            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function getCustomize() {
        try {
            const result = await getSecureApiData(`api/users/request-bespoke/${userId}?page=${currentCustomize}&type=customize-service`)
            if (result.success) {
                setCustomizeRequest(result.bespokeData)
                setCustomizeTotal(result.totalPages)

            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        getBespoke()
    }, [currentBespoke])
    useEffect(() => {
        getCustomize()
    }, [currentCustomize])

    async function catData() {
        const data = await categoryData()
        setBusinessCategory(data)

    }
    async function fetchAddOnData() {
        try {
            const result = await getSecureApiData('get-addon')
            if (result.status) {
                const data = result.addOnData?.filter(item => item?.name?.toLowerCase().includes('dispute'))
                console.log(data)
                setDisputeAddOn(data[0])

                setAddOnData(result.addOnData)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const getTargetModal = (item) => {
        const name = item?.name?.toLowerCase() || "";

        if (name.includes("dispute")) return "#disputeModal";
        if (name.includes("customize")) return "#customizeModal";
        if (name.includes("bespoke")) return "#bespokeModal";

        return null; // or undefined, Bootstrap will ignore it
    };
    async function disputeSubmit(e) {
        e.preventDefault();

        const data = new FormData();
        for (let i in openDispute) {
            if (i === "image" || i === "preview") continue;
            if (i === "against" || i === "againstId") continue;

            data.append(i, openDispute[i]);
        }

        if (openDispute.image) {
            data.append("image", openDispute.image);
        }

        data.append("addOnId", selectedAddOn._id);
        data.append("against", openDispute.againstId);

        data.append("addOnPrice", selectedAddOn?.price);
        data.append("addOnType", selectedAddOn?.type);
        if (profileData?.freeService > 0) {
            data.append('serviceUsed', true)
        }

        try {
            const result = await securePostData("api/users/open-dispute", data);

            if (result.success) {
                const payload = {
                    price: selectedAddOn?.price,
                    disputeId: result.dispute._id,
                    name: selectedAddOn?.name,
                };

                localStorage.setItem("serviceData", JSON.stringify(payload));

                // ✅ CLOSE MODAL BEFORE NAVIGATE
                const modalEl = document.getElementById("disputeModal");
                const modal = Modal.getInstance(modalEl);
                modal.hide();

                document.body.classList.remove("modal-open");
                document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());

                setOpenDispute({
                    userId,
                    message: "",
                    type: "",
                    against: "",
                    againstId: "",
                    subject: "",
                    image: null,
                    preview: null,
                });

                getDispute();

                // ⭐ NOW NAVIGATE — after modal is closed
                navigate("/service-payment");
            } else {
                toast.message(result.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDisputeChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            const file = files[0];
            setOpenDispute((prev) => ({
                ...prev,
                [name]: file,
                preview: file ? URL.createObjectURL(file) : null,
            }));
        } else {
            setOpenDispute((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
        // if(name=='against'){
        //   setIsMatch(true)
        // }
    };
    const handleBespokeChange = (e) => {
        const { name, value, } = e.target;
        setBespokeForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    async function bespokeSubmit(e, type) {
        e.preventDefault()
        const data = { ...bespokeForm, type, addOnId: selectedAddOn._id }
        if (profileData?.freeService > 0) {
            data.serviceUsed = true
        }
        try {
            const result = await securePostData('api/users/request-bespoke', data)
            if (result.success) {
                const payload = {
                    price: selectedAddOn?.price,
                    requestId: result.request._id,
                    name: selectedAddOn?.name,
                };

                localStorage.setItem("serviceData", JSON.stringify(payload));
                const modalEl = document.getElementById(type == 'concierge-service' ? 'bespokeModal' : 'customizeModal');
                const modal = Modal.getInstance(modalEl);
                modal.hide();
                document.body.classList.remove('modal-open');
                document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
                setBespokeForm({
                    userId, firstName: "", lastName: "", email: "", contactNumber: "", businessName: "", businessCategory: "", serviceLocation: "",
                    serviceActivity: "", priceRange: null, serviceDate: undefined, specificRequirement: '', preferenceToAvoid: ""
                })
                navigate("/service-payment");

            } else {
                toast.message(result.message)
            }
        } catch (error) {

        }
    }
    async function fetchUserProfile() {
        if (openDispute.against?.length < 2) {
            return
        }
        try {
            const result = await getApiData(`api/users/search-profile/${openDispute.against}?role=provider`)
            if (result.success) {
                if (result?.profileUsers?.length > 0) {
                    setIsMatch(true)
                }
                console.log(result.profileUsers)
                const data = result?.profileUsers?.filter(item => item?._id !== userId)
                setMatchProfile(data)
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        setTimeout(() => {
            fetchUserProfile()
        }, 800);
    }, [openDispute.against])
    async function getDispute() {
        try {
            const result = await getSecureApiData(`api/users/my-dispute/${userId}?page=${currentPage}`)
            if (result.success) {
                setAllDispute(result.disputeData)
                setTotal(result.totalPages)

            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        getDispute()
    }, [currentPage])
    const handleSelectProfile = (item) => {
        setIsMatch(false)
        setMatchProfile([])
        setOpenDispute(prev => ({
            ...prev,
            against: `${item.firstName} ${item.lastName}`,  
            againstId: item._id                              
        }));
    };
    useEffect(() => {
        catData()
        fetchAddOnData()
    }, [])
    return (
        <>
            <div className="main-section posting-histry-sec flex-grow-1">
                <div className="row dash-profile-overflow  pt-4 mx-lg-2 mx-sm-0">
                    <h2>My Purchases</h2>
                    {addOnData?.length > 0 ?
                        addOnData?.map((item, key) =>
                            <div className='col-lg-4'>

                                <div className="main-profile-sec dash-profile-sec " key={key}>
                                    <div className="posting-hostry-main-sec ">
                                        <div className="posting-hostry-title-header-box rating-usr-toggle-bx flex-column justify-content-start align-items-start" >
                                            <div>
                                                <h3 className="mb-0">{item?.name} </h3>
                                            </div>
                                            <div className="resq-price">
                                                <h5>
                                                    {item?.price} AED <span>/ {item?.type}</span>
                                                </h5>
                                                {isKey == key && <p>{item?.description}</p>}
                                            </div>
                                            <div className="d-flex gap-3 justify-content-between align-items-center srvices-btn-div w-100">
                                                <button
                                                    onClick={() => setSelectedAddOn(item)}
                                                    data-bs-toggle="modal"
                                                    data-bs-target={getTargetModal(item)}
                                                    className="thm-btn srvice-dist-btn"
                                                >
                                                    Buy now
                                                </button>
                                                <button
                                                    onClick={() => setIsKey(isKey !== key ? key : null)}
                                                    className=" srvice-dist-out-btn"
                                                >
                                                    {isKey == key ? 'Hide' : 'View'} Details
                                                </button>
                                            </div>
                                        </div>
                                        <div />
                                    </div>

                                </div>
                            </div>
                        ) : <p className='pb-3 ms-3'>No data found</p>}

                </div>
                <div className="row dash-profile-overflow posting-histry-main-box mt-4 p-0 mx-lg-2 mx-sm-0">
                    <div className="col-lg-12 col-md-12 col-sm-12 px-0">
                        <div className="">
                            <div className="membership-cards billing-crds dash-history-tab-btn d-flex align-items-center justify-content-between p-0">
                                <ul className="nav mb-0 my-2" id="myTab" role="tablist">
                                    <li className="tab-item" role="presentation">
                                        <button
                                            className="tab-link active"
                                            data-bs-toggle="tab"
                                            data-bs-target="#business-tabs-01"
                                            type="button"
                                            role="tab"
                                        >
                                            My Requests
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
                                            My Purchases
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="tab-content" id="myTabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="business-tabs-01"
                                    role="tabpanel"
                                >
                                    <div className="row dash-profile-overflow mt-4 mx-0">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div className="main-profile-sec dash-profile-sec">
                                                <div className="posting-hostry-main-sec">
                                                    <div className="posting-hostry-title-header-box">
                                                        <h3 className="mb-0">Bespoke Concierge Services</h3>
                                                        <a href="" data-bs-toggle="modal"
                                                            data-bs-target="#bespokeModal" className="thm-btn">
                                                            Request Bespoke Concierge Service
                                                        </a>
                                                    </div>
                                                    <ul>
                                                        <li className="divider" />
                                                    </ul>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="table-responsive">
                                                            <table className="table custom-table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Business Category</th>
                                                                        <th>Service Activity Required</th>
                                                                        <th>Location for Service</th>
                                                                        <th>Price</th>
                                                                        <th>Date of Request</th>
                                                                        <th>Status </th>
                                                                        <th>Actioned Date</th>
                                                                        <th>Service Provider Assigned</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {bespokeRequest?.length > 0 ?
                                                                        bespokeRequest?.map((item, key) =>
                                                                            <tr key={key}>
                                                                                <td>{item?.businessCategory}</td>
                                                                                <td>{item?.serviceActivity}</td>
                                                                                <td className="text-truncate-custom">{item?.serviceLocation}</td>
                                                                                <td className="text-truncate-custom">AED 1000</td>
                                                                                <td className="text-truncate-custom">
                                                                                    {new Date(item?.createdAt)?.toLocaleDateString('en-GB', {
                                                                                        day: '2-digit',
                                                                                        month: '2-digit',
                                                                                        year: 'numeric'
                                                                                    })}
                                                                                </td>
                                                                                <td>
                                                                                    <span className=" position-relative">
                                                                                        {(item?.status == 'pending' || item?.status == 'payment-pending') ? <a
                                                                                            href="#"
                                                                                            className="badge badge-pending "
                                                                                        >
                                                                                            Pending
                                                                                        </a> :
                                                                                            <a
                                                                                                href="#"
                                                                                                className="badge badge-pending badge-resolved"
                                                                                            >
                                                                                                Completed
                                                                                            </a>}
                                                                                    </span>
                                                                                </td>
                                                                                <td>{(item?.status == 'completed' || item?.status == 'resolved') ? new Date(item?.updatedAt)?.toLocaleDateString('en-GB', {
                                                                                    day: '2-digit',
                                                                                    month: '2-digit',
                                                                                    year: 'numeric'
                                                                                }) : '-'}</td>
                                                                                <td>James Catering</td>
                                                                            </tr>) : <span className='ps-3'> No data</span>}

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                {totalBespoke > 1 && (
                                                    <div className="row pb-2">
                                                        <div className="col-lg-12">
                                                            <div className="d-flex justify-content-between adver-pagi-sec adver-pagi-desk-sec align-items-center px-3">

                                                                {/* Prev Button */}
                                                                <div className="adver-prev">
                                                                    <button
                                                                        onClick={() => currentBespoke > 1 && setCurrentBespoke(currentBespoke - 1)}
                                                                        disabled={currentBespoke === 1}
                                                                    >
                                                                        <i className="fa-solid fa-arrow-left" /> Previous
                                                                    </button>
                                                                </div>

                                                                {/* Page Numbers */}
                                                                <div>
                                                                    <ul className="adver-numbr-list">
                                                                        {Array.from({ length: totalBespoke }, (_, i) => i + 1).map((pageNum) => (
                                                                            <li key={pageNum}>
                                                                                <button
                                                                                    className={pageNum === currentBespoke ? "active" : ""}
                                                                                    onClick={() => setCurrentBespoke(pageNum)}
                                                                                >
                                                                                    {pageNum}
                                                                                </button>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>

                                                                {/* Next Button */}
                                                                <div className="adver-next">
                                                                    <button
                                                                        onClick={() =>
                                                                            currentBespoke < totalBespoke && setCurrentBespoke(currentBespoke + 1)
                                                                        }
                                                                        disabled={currentBespoke === totalBespoke}
                                                                    >
                                                                        Next <i className="fa-solid fa-arrow-right" />
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            {/* Optional: mobile version (simplified) */}
                                                            <div className="d-flex justify-content-between adver-pagi-sec adver-pagi-mob-sec d-none px-3">
                                                                <div className="adver-prev">
                                                                    <button
                                                                        onClick={() => currentBespoke > 1 && setCurrentBespoke(currentBespoke - 1)}
                                                                        disabled={currentBespoke === 1}
                                                                    >
                                                                        <i className="fa-solid fa-arrow-left" />
                                                                    </button>
                                                                </div>
                                                                <div>
                                                                    <ul className="adver-numbr-list">
                                                                        {Array.from({ length: totalBespoke }, (_, i) => i + 1)
                                                                            .slice(0, 3)
                                                                            .map((pageNum) => (
                                                                                <li key={pageNum}>
                                                                                    <button
                                                                                        className={pageNum === currentBespoke ? "active" : ""}
                                                                                        onClick={() => setCurrentBespoke(pageNum)}
                                                                                    >
                                                                                        {pageNum}
                                                                                    </button>
                                                                                </li>
                                                                            ))}
                                                                    </ul>
                                                                </div>
                                                                <div className="adver-next">
                                                                    <button
                                                                        onClick={() =>
                                                                            currentBespoke < totalBespoke && setCurrentBespoke(currentBespoke + 1)
                                                                        }
                                                                        disabled={currentBespoke === totalBespoke}
                                                                    >
                                                                        <i className="fa-solid fa-arrow-right" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row dash-profile-overflow mt-4 mx-0">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div className="main-profile-sec dash-profile-sec">
                                                <div className="posting-hostry-main-sec">
                                                    <div className="posting-hostry-title-header-box">
                                                        <h3 className="mb-0">
                                                            Customized Due Diligence Services
                                                        </h3>
                                                        <a href="" data-bs-toggle="modal"
                                                            data-bs-target="#customizeModal" className="thm-btn">
                                                            Request Customized Due Diligence
                                                        </a>
                                                    </div>
                                                    <ul>
                                                        <li className="divider" />
                                                    </ul>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="table-responsive">
                                                            <table className="table custom-table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Request Customized Due Diligence</th>
                                                                        <th>Business Name</th>
                                                                        <th>Location</th>
                                                                        <th>Service Activity </th>
                                                                        <th>Date of Request</th>
                                                                        <th>Status </th>
                                                                        <th>Actioned Date</th>
                                                                        <th>Accredited</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {customizeRequest?.length > 0 ?
                                                                        customizeRequest?.map((item, key) =>
                                                                            <tr key={key}>
                                                                                <td>{item?.firstName} {item?.lastName}</td>
                                                                                <td>{item?.businessName}</td>
                                                                                <td className="text-truncate-custom">{item?.serviceLocation}</td>
                                                                                <td className="text-truncate-custom">{item?.serviceActivity}</td>
                                                                                <td className="text-truncate-custom">
                                                                                    {new Date(item?.createdAt)?.toLocaleDateString('en-GB', {
                                                                                        day: '2-digit',
                                                                                        month: '2-digit',
                                                                                        year: 'numeric'
                                                                                    })}
                                                                                </td>
                                                                                <td>
                                                                                    <span className=" position-relative">
                                                                                        {(item?.status == 'pending' || item?.status == 'payment-pending') ? <a
                                                                                            href="#"
                                                                                            className="badge badge-pending "
                                                                                        >
                                                                                            Pending
                                                                                        </a> :
                                                                                            <a
                                                                                                href="#"
                                                                                                className="badge badge-resolved"
                                                                                            >
                                                                                                Completed
                                                                                            </a>}
                                                                                    </span>
                                                                                </td>
                                                                                <td>{(item?.status == 'completed' || item?.status == 'resolved') ? new Date(item?.updatedAt).toLocaleDateString('en-GB', {
                                                                                    day: '2-digit',
                                                                                    month: '2-digit',
                                                                                    year: 'numeric'
                                                                                }) : '-'}</td>
                                                                                <td>Yes</td>
                                                                            </tr>) : <span className='ps-3'> No data</span>}

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                {customizeTotal > 1 && (
                                                    <div className="row pb-2">
                                                        <div className="col-lg-12">
                                                            <div className="d-flex justify-content-between adver-pagi-sec adver-pagi-desk-sec align-items-center px-3">

                                                                {/* Prev Button */}
                                                                <div className="adver-prev">
                                                                    <button
                                                                        onClick={() => currentCustomize > 1 && setCurrentCustomize(currentCustomize - 1)}
                                                                        disabled={currentCustomize === 1}
                                                                    >
                                                                        <i className="fa-solid fa-arrow-left" /> Previous
                                                                    </button>
                                                                </div>

                                                                {/* Page Numbers */}
                                                                <div>
                                                                    <ul className="adver-numbr-list">
                                                                        {Array.from({ length: customizeTotal }, (_, i) => i + 1).map((pageNum) => (
                                                                            <li key={pageNum}>
                                                                                <button
                                                                                    className={pageNum === currentCustomize ? "active" : ""}
                                                                                    onClick={() => setCurrentCustomize(pageNum)}
                                                                                >
                                                                                    {pageNum}
                                                                                </button>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>

                                                                {/* Next Button */}
                                                                <div className="adver-next">
                                                                    <button
                                                                        onClick={() =>
                                                                            currentCustomize < customizeTotal && setCurrentCustomize(currentCustomize + 1)
                                                                        }
                                                                        disabled={currentCustomize === customizeTotal}
                                                                    >
                                                                        Next <i className="fa-solid fa-arrow-right" />
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            {/* Optional: mobile version (simplified) */}
                                                            <div className="d-flex justify-content-between adver-pagi-sec adver-pagi-mob-sec d-none px-3">
                                                                <div className="adver-prev">
                                                                    <button
                                                                        onClick={() => currentCustomize > 1 && setCurrentCustomize(currentCustomize - 1)}
                                                                        disabled={currentCustomize === 1}
                                                                    >
                                                                        <i className="fa-solid fa-arrow-left" />
                                                                    </button>
                                                                </div>
                                                                <div>
                                                                    <ul className="adver-numbr-list">
                                                                        {Array.from({ length: customizeTotal }, (_, i) => i + 1)
                                                                            .slice(0, 3)
                                                                            .map((pageNum) => (
                                                                                <li key={pageNum}>
                                                                                    <button
                                                                                        className={pageNum === currentCustomize ? "active" : ""}
                                                                                        onClick={() => setCurrentCustomize(pageNum)}
                                                                                    >
                                                                                        {pageNum}
                                                                                    </button>
                                                                                </li>
                                                                            ))}
                                                                    </ul>
                                                                </div>
                                                                <div className="adver-next">
                                                                    <button
                                                                        onClick={() =>
                                                                            currentCustomize < total && setCurrentCustomize(currentCustomize + 1)
                                                                        }
                                                                        disabled={currentCustomize === total}
                                                                    >
                                                                        <i className="fa-solid fa-arrow-right" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade " id="business-tabs-02" role="tabpanel">
                                    <div className="row dash-profile-overflow mt-4 mx-0">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div className="main-profile-sec dash-profile-sec">
                                                <div className="posting-hostry-main-sec">
                                                    <div className="posting-hostry-title-header-box">
                                                        <h3 className="mb-0">My Purchases</h3>
                                                    </div>
                                                    <ul>
                                                        <li className="divider" />
                                                    </ul>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="table-responsive">
                                                            <table className="table custom-table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Initiated Date</th>
                                                                        {/* <th>Expire Date</th> */}
                                                                        <th>Completion Date</th>
                                                                        <th>Service Purchased </th>
                                                                        <th>Purchase Status</th>
                                                                        <th>Action </th>
                                                                        <th>Amount Paid</th>
                                                                        <th>Payment Method</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {purchase?.length > 0 ?
                                                                        purchase?.map((item, key) =>
                                                                            <tr key={key}>
                                                                                <td>{new Date(item?.createdAt)?.toLocaleDateString('en-GB', {
                                                                                    day: '2-digit',
                                                                                    month: '2-digit',
                                                                                    year: 'numeric'
                                                                                })}</td>
                                                                                {/* <td>{new Date(item?.createdAt)?.toLocaleDateString('en-GB', {
                                                                                    day: '2-digit',
                                                                                    month: '2-digit',
                                                                                    year: 'numeric'
                                                                                })}</td> */}
                                                                                <td className="text-truncate-custom">
                                                                                    {(item?.status === 'completed' || item?.status === 'resolved') ? new Date(item?.updatedAt)?.toLocaleDateString('en-GB', {
                                                                                        day: '2-digit',
                                                                                        month: '2-digit',
                                                                                        year: 'numeric'
                                                                                    }) : '-'}

                                                                                </td>
                                                                                <td className="text-truncate-custom">
                                                                                    {item?.addOnId?.name}
                                                                                </td>
                                                                                <td>
                                                                                    <span className="position-relative">
                                                                                        <a
                                                                                            href="#"
                                                                                            className={`badge text-capitalize ${item?.status === "payment-pending" ? "badge-declined" : "badge-resolved"
                                                                                                }`}
                                                                                        >
                                                                                            {
                                                                                                item?.status === "pending"
                                                                                                    ? "Paid"
                                                                                                    : item?.status === "payment-pending"
                                                                                                        ? "Expired"
                                                                                                        : "Paid"
                                                                                            }
                                                                                        </a>

                                                                                    </span>
                                                                                </td>
                                                                                <td>Choose</td>
                                                                                <td className="text-truncate-custom">{item?.status !== 'payment-pending' ? `AED ${item?.addOnId?.price}` : '-'}</td>
                                                                                <td>{item?.status == 'payment-pending' ? '-' : 'Card'}</td>
                                                                            </tr>) : <p className='pb-3 ms-3'>No data found</p>}

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                {total > 1 && (
                                                    <div className="row pb-2">
                                                        <div className="col-lg-12">
                                                            <div className="d-flex justify-content-between adver-pagi-sec adver-pagi-desk-sec align-items-center px-3">

                                                                {/* Prev Button */}
                                                                <div className="adver-prev">
                                                                    <button
                                                                        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                                                                        disabled={currentPage === 1}
                                                                    >
                                                                        <i className="fa-solid fa-arrow-left" /> Previous
                                                                    </button>
                                                                </div>

                                                                {/* Page Numbers */}
                                                                <div>
                                                                    <ul className="adver-numbr-list">
                                                                        {Array.from({ length: total }, (_, i) => i + 1).map((pageNum) => (
                                                                            <li key={pageNum}>
                                                                                <button
                                                                                    className={pageNum === currentPage ? "active" : ""}
                                                                                    onClick={() => setCurrentPage(pageNum)}
                                                                                >
                                                                                    {pageNum}
                                                                                </button>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>

                                                                {/* Next Button */}
                                                                <div className="adver-next">
                                                                    <button
                                                                        onClick={() =>
                                                                            currentPage < total && setCurrentPage(currentPage + 1)
                                                                        }
                                                                        disabled={currentPage === total}
                                                                    >
                                                                        Next <i className="fa-solid fa-arrow-right" />
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            {/* Optional: mobile version (simplified) */}
                                                            <div className="d-flex justify-content-between adver-pagi-sec adver-pagi-mob-sec d-none px-3">
                                                                <div className="adver-prev">
                                                                    <button
                                                                        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                                                                        disabled={currentPage === 1}
                                                                    >
                                                                        <i className="fa-solid fa-arrow-left" />
                                                                    </button>
                                                                </div>
                                                                <div>
                                                                    <ul className="adver-numbr-list">
                                                                        {Array.from({ length: total }, (_, i) => i + 1)
                                                                            .slice(0, 3)
                                                                            .map((pageNum) => (
                                                                                <li key={pageNum}>
                                                                                    <button
                                                                                        className={pageNum === currentPage ? "active" : ""}
                                                                                        onClick={() => setCurrentPage(pageNum)}
                                                                                    >
                                                                                        {pageNum}
                                                                                    </button>
                                                                                </li>
                                                                            ))}
                                                                    </ul>
                                                                </div>
                                                                <div className="adver-next">
                                                                    <button
                                                                        onClick={() =>
                                                                            currentPage < total && setCurrentPage(currentPage + 1)
                                                                        }
                                                                        disabled={currentPage === total}
                                                                    >
                                                                        <i className="fa-solid fa-arrow-right" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="modal fade"
                    id="disputeModal"
                    tabIndex={-1}
                    aria-labelledby="disputeModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-md modal-dialog-centered">
                        <div className="modal-content" style={styles.modalContent}>
                            <div className="modal-header border-0">
                                <h5 className="modal-title fw-bold" id="disputeModalLabel">
                                    Open a Service Dispute
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"

                                />

                            </div>
                            <div className="modal-body">
                                {/* Addon Box */}
                                <div className="addon-box dash-profile-sec" style={styles.addonBox}>
                                    <div>
                                        {/* <small className="text-muted">Add On</small> */}
                                        <div className="addon-title text-black" style={styles.addonTitle}>{disputeAddOn?.name}</div>
                                    </div>
                                    <div className="addon-price" style={styles.addonPrice}>
                                        {disputeAddOn?.price} AED <small className="text-muted text-capitalize"> <sup className='fw-400'>/ {disputeAddOn?.type}</sup> </small>
                                    </div>
                                </div>
                                <p className="fw-400 fz-16" style={{ fontSize: 14 }}>
                                    Explain your problem and what you want to do to solve it. Wizbizla will help in the resolution of disputes between customer and service provider with the assistance of an independent lawyer, if applicable.
                                    If you’re case is registered, the dissatisfied party pays a fee of AED 500.
                                    <a href="#" style={{ color: "#4F40FF" }}> For more information on what is and isn't covered by our dispute resolution process, please click here.
                                        Please click here</a>.
                                </p>
                                {/* Form */}
                                <form onSubmit={disputeSubmit}>
                                    <div className="custom-frm-bx mb-3">
                                        <label htmlFor="disputeAgainst" className="">
                                            Dispute Against <span className='start-icon'>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="disputeAgainst"
                                            required
                                            name='against'
                                            value={openDispute.against}
                                            onChange={handleDisputeChange}
                                        />
                                        {isMatch && <div className="search-bar-box" id="search-bar">
                                            <ul className="search-bar-box-list">
                                                {matchProfile?.map((item, key) =>
                                                    <li key={key} className='pb-2'>
                                                        <button className='d-flex gap-2 align-items-center justify-content-between' onClick={() => handleSelectProfile(item)}>
                                                            <div className="ct-icon">
                                                                <img style={{ width: '40px', height: '40px', borderRadius: '50%' }} src={item?.profileData?.profileImage ? `${base_url}/${item?.profileData?.profileImage}` : "/assets/images/car-01.svg"} alt="" />
                                                            </div>
                                                            <div>
                                                                <p className='mb-0'>{item?.firstName} {item?.lastName}</p>
                                                            </div>
                                                        </button>
                                                    </li>)}
                                            </ul>
                                        </div>}
                                    </div>
                                    <div className="custom-frm-bx mb-3">
                                        <label htmlFor="disputeType" className="">
                                            Dispute Type <span className='start-icon'>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="subject"
                                            required
                                            name='type'
                                            value={openDispute.type}
                                            onChange={handleDisputeChange}
                                        />
                                        {/* <select className="form-select" id="disputeType" required name='type'
                        value={openDispute.type}
                        onChange={handleDisputeChange}>
                        <option selected="" disabled="">
                          Select Type
                        </option>
                        <option value="Service">Service</option>
                        <option value="Payment">Payment</option>
                        <option value="Other">Other</option>
                      </select> */}
                                    </div>
                                    <div className="custom-frm-bx mb-3">
                                        <label htmlFor="subject" className="form-label">
                                            Subject <span className='start-icon'>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="subject"
                                            required
                                            name='subject'
                                            value={openDispute.subject}
                                            onChange={handleDisputeChange}
                                        />
                                    </div>
                                    <div className="mb-3 custom-frm-bx">
                                        <label htmlFor="message" className="">
                                            Message
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="message"
                                            rows={4}
                                            name='message'
                                            value={openDispute.message}
                                            onChange={handleDisputeChange}
                                        />
                                    </div>
                                    <div className="mb-3 custom-frm-bx">
                                        <label className="">Upload File</label>
                                        <div className="upload-box" style={styles.uploadBox}>
                                            <input
                                                type="file"
                                                className="form-control d-none"
                                                id="uploadFiles"
                                                name='image'
                                                onChange={handleDisputeChange}
                                            />
                                            <div htmlFor="uploadFiles" className="upload-icon mx-auto mb-2">
                                                <img
                                                    src='/assets/images/upload.svg'
                                                    alt="Upload"
                                                />
                                            </div>
                                            <label
                                                htmlFor="uploadFiles"
                                                className="text-black"
                                                style={{ cursor: "pointer" }}
                                            >
                                                <span className='my-add-upload'>Click to upload</span> or drag and drop <br />
                                                <small className="text-muted">
                                                    PDF, JPG, PNG, DOC (max. 10 MB)
                                                </small>
                                                {openDispute?.preview && <div className=" mt-3">
                                                    <img
                                                        src={openDispute?.preview}
                                                        alt="Preview"
                                                        className="img-thumbnail"
                                                        style={{ maxWidth: 100 }}
                                                    />
                                                </div>}
                                            </label>
                                        </div>
                                    </div>
                                    <div className=" mt-4">
                                        <button type="submit" style={styles.btnPrimary} className="thm-btn">
                                            File a Complaint
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="modal fade"
                    id="customizeModal"
                    tabIndex={-1}
                    aria-labelledby="customizeModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-md modal-dialog-centered">
                        <div className="modal-content" style={styles.modalContent}>
                            <div className="modal-header border-0">
                                <h5 className="modal-title fw-bold" id="disputeModalLabel">
                                    Request a Customized Due Diligence Service
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">

                                <p className="text-muted" style={{ fontSize: 14 }}>
                                    Wizbizla will use this information to contact you via phone or email to discuss your inquiry and share their research on the service provider.
                                </p>
                                {/* Form */}
                                <form onSubmit={(e) => bespokeSubmit(e, 'customize-service')}>
                                    <div className="mb-3 custom-frm-bx">
                                        <label htmlFor="disputeAgainst" className="">
                                            First name  <span className="start-icon">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="disputeAgainst"
                                            required
                                            name='firstName'
                                            value={bespokeForm.firstName}
                                            onChange={handleBespokeChange}
                                        />
                                    </div>
                                    <div className="mb-3 custom-frm-bx">
                                        <label htmlFor="disputeAgainst" className="">
                                            Last name  <span className="start-icon">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="disputeAgainst"
                                            required
                                            name='lastName'
                                            value={bespokeForm.lastName}
                                            onChange={handleBespokeChange}
                                        />
                                    </div>
                                    <div className="mb-3 custom-frm-bx">
                                        <label htmlFor="disputeAgainst" className="">
                                            Email  <span className="start-icon">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="disputeAgainst"
                                            required
                                            name='email'
                                            value={bespokeForm.email}
                                            onChange={handleBespokeChange}
                                        />
                                    </div>
                                    <div className="mb-3 custom-frm-bx">
                                        <label htmlFor="disputeAgainst" className="">
                                            Contact number  <span className="start-icon">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="disputeAgainst"
                                            required
                                            name='contactNumber'
                                            value={bespokeForm.contactNumber}
                                            onChange={handleBespokeChange}
                                        />
                                    </div>
                                    <div className="mb-3 custom-frm-bx">
                                        <label htmlFor="disputeAgainst" className="">
                                            Business Name, if applicable  <span className="start-icon">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="disputeAgainst"
                                            required
                                            name='businessName'
                                            value={bespokeForm.businessName}
                                            onChange={handleBespokeChange}
                                        />
                                    </div>
                                    <div className="mb-3 custom-frm-bx">
                                        <label htmlFor="disputeAgainst" className="">
                                            Business Category  <span className="start-icon">*</span>
                                        </label>
                                        <select className="form-select" id="disputeType" required name='businessCategory'
                                            value={bespokeForm.businessCategory}
                                            onChange={handleBespokeChange}>
                                            <option selected="" disabled="">
                                                Select Type
                                            </option>
                                            {businessCategory?.length > 0 &&
                                                businessCategory?.map((item, key) => <option value={item?._id} key={key}>{item?.name}</option>)}
                                            <option value="Payment">Payment</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="mb-3 custom-frm-bx">
                                        <label htmlFor="disputeAgainst" className="">
                                            Location for service to take place  <span className="start-icon">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="disputeAgainst"
                                            required
                                            name='serviceLocation'
                                            value={bespokeForm.serviceLocation}
                                            onChange={handleBespokeChange}
                                        />
                                    </div>
                                    <div className="mb-3 custom-frm-bx">
                                        <label htmlFor="disputeAgainst" className="">
                                            Service Activity  <span className="start-icon">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="disputeAgainst"
                                            required
                                            name='serviceActivity'
                                            value={bespokeForm.serviceActivity}
                                            onChange={handleBespokeChange}
                                        />
                                    </div>
                                    <div className="mb-3 custom-frm-bx">
                                        <label htmlFor="disputeAgainst" className="">
                                            Service Providers’ Name, if applicable  <span className="start-icon">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="disputeAgainst"
                                            required
                                            name='preferenceToAvoid'
                                            value={bespokeForm.preferenceToAvoid}
                                            onChange={handleBespokeChange}
                                        />
                                    </div>
                                    <div class="custom-frm-bx">
                                        <p>This site is protected by <a href="javascript:void(0);" className='nw-achar-btn'>reCAPTCHA</a> and the <a href="javascript:void(0);" className='nw-achar-btn'>Google Privacy Policy</a> and <a href="javascript:void(0);" className='nw-achar-btn'>Terms of Service</a> apply.</p>
                                    </div>
                                    <div className="mt-4">
                                        <button type="submit" style={styles.btnPrimary} className="thm-btn btn-lg">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="modal fade"
                    id="bespokeModal"
                    tabIndex={-1}
                    aria-labelledby="bespokeModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-md modal-dialog-centered">
                        <div className="modal-content" style={styles.modalContent}>
                            <div className="modal-header border-0">
                                <h5 className="modal-title fw-bold" id="disputeModalLabel">
                                    Request a Bespoke Concierge Service
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">

                                <p className="text-muted" style={{ fontSize: 14 }}>
                                    Wizbizla will use this information to contact you via phone or email to discuss your inquiry and share their research on the service provider.

                                </p>
                                {/* Form */}
                                <form onSubmit={(e) => bespokeSubmit(e, 'concierge-service')}>
                                    <div className="custom-frm-bx mb-3">
                                        <label htmlFor="disputeAgainst" className="">
                                            First name  <span className="start-icon">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="disputeAgainst"
                                            required
                                            name='firstName'
                                            value={bespokeForm.firstName}
                                            onChange={handleBespokeChange}
                                        />
                                    </div>
                                    <div className="mb-3 custom-frm-bx">
                                        <label htmlFor="disputeAgainst" className="">
                                            Last name  <span className="start-icon">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="disputeAgainst"
                                            required
                                            name='lastName'
                                            value={bespokeForm.lastName}
                                            onChange={handleBespokeChange}
                                        />
                                    </div>
                                    <div className="mb-3 custom-frm-bx">
                                        <label htmlFor="disputeAgainst" className="">
                                            Email  <span className="start-icon">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="disputeAgainst"
                                            required
                                            name='email'
                                            value={bespokeForm.email}
                                            onChange={handleBespokeChange}
                                        />
                                    </div>
                                    <div className="mb-3 custom-frm-bx">
                                        <label htmlFor="disputeAgainst" className="">
                                            Contact number  <span className="start-icon">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="disputeAgainst"
                                            required
                                            name='contactNumber'
                                            value={bespokeForm.contactNumber}
                                            onChange={handleBespokeChange}
                                        />
                                    </div>
                                    <div className="mb-3 custom-frm-bx">
                                        <label htmlFor="disputeAgainst" className="">
                                            Business Name, if applicable  <span className="start-icon">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="disputeAgainst"
                                            required
                                            name='businessName'
                                            value={bespokeForm.businessName}
                                            onChange={handleBespokeChange}
                                        />
                                    </div>
                                    <div className="mb-3 custom-frm-bx">
                                        <label htmlFor="disputeAgainst" className="">
                                            Location for service to take place  <span className="start-icon">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="disputeAgainst"
                                            required
                                            name='serviceLocation'
                                            value={bespokeForm.serviceLocation}
                                            onChange={handleBespokeChange}
                                        />
                                    </div>
                                    <div className="mb-3 custom-frm-bx">
                                        <label htmlFor="disputeAgainst" className="">
                                            Business Category  <span className="start-icon">*</span>
                                        </label>
                                        <select className="form-select" id="disputeType" required name='businessCategory'
                                            value={bespokeForm.businessCategory}
                                            onChange={handleBespokeChange}>
                                            <option selected="" disabled="">
                                                Select Type
                                            </option>
                                            {businessCategory?.length > 0 &&
                                                businessCategory?.map((item, key) => <option value={item?._id} key={key}>{item?.name}</option>)}

                                        </select>
                                    </div>
                                    <div className="mb-3 custom-frm-bx">
                                        <label htmlFor="disputeAgainst" className="">
                                            Service Activity  <span className="start-icon">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="disputeAgainst"
                                            required
                                            name='serviceActivity'
                                            value={bespokeForm.serviceActivity}
                                            onChange={handleBespokeChange}
                                        />
                                    </div>
                                    <div className="mb-3 custom-frm-bx">
                                        <label htmlFor="disputeAgainst" className="">
                                            Price Range  <span className="start-icon">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="disputeAgainst"
                                            required
                                            name='priceRange'
                                            value={bespokeForm.priceRange}
                                            onChange={handleBespokeChange}
                                        />
                                    </div>
                                    <div className="mb-3 custom-frm-bx">
                                        <label htmlFor="disputeAgainst" className="">
                                            Date of when to administer the service  <span className="start-icon">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="disputeAgainst"
                                            required
                                            name='serviceDate'
                                            value={bespokeForm.serviceDate}
                                            onChange={handleBespokeChange}
                                        />
                                    </div>
                                    <div className="mb-3 custom-frm-bx">
                                        <label htmlFor="disputeAgainst" className="">
                                            Any specific requirements  <span className="start-icon">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="disputeAgainst"
                                            required
                                            name='specificRequirement'
                                            value={bespokeForm.specificRequirement}
                                            onChange={handleBespokeChange}
                                        />
                                    </div>
                                    <div className="mb-3 custom-frm-bx">
                                        <label htmlFor="disputeAgainst" className="">
                                            Any preference to Service Providers or any Service Providers to avoid  <span className="start-icon">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="disputeAgainst"
                                            required
                                            name='preferenceToAvoid'
                                            value={bespokeForm.preferenceToAvoid}
                                            onChange={handleBespokeChange}
                                        />
                                    </div>
                                    <div class="custom-frm-bx">
                                        <p className='fw-500 fz-16'>This site is protected by <a href="javascript:void(0);" className='nw-achar-btn'>reCAPTCHA</a> and the <a href="javascript:void(0);" className='nw-achar-btn'>Google Privacy Policy</a> and <a href="javascript:void(0);" className='nw-achar-btn'>Terms of Service</a> apply.</p>
                                    </div>
                                    <div className=" mt-4">
                                        <button type="submit" style={styles.btnPrimary} className="thm-btn btn-lg">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ConsumerPurchase
const styles = {
    modalContent: {
        borderRadius: "12px",
        padding: "20px",
    },
    addonBox: {
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    addonTitle: {
        fontWeight: 600,
        fontSize: "15px",
    },
    addonPrice: {
        fontWeight: "bold",
        color: "#4a4aff",
        fontSize: "20px",
    },
    btnPrimary: {
        backgroundColor: "#4a4aff",
        border: "none",
        borderRadius: "8px",
    },
    uploadBox: {
        border: "1px dashed #ccc",
        borderRadius: "8px",
        textAlign: "center",
        padding: "20px",
        cursor: "pointer",
    },
};