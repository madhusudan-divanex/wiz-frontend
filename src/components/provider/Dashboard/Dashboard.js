import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fetchUserBusiness, fetchUserData } from '../../../redux/features/userSlice'
import images from '../../../assets/images'
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { profiles, timeAgo } from '../../../utils/staticData'
import { deleteApiData, getApiData, getSecureApiData, postApiData, securePostData } from '../../../services/api'
import { toast } from 'react-toastify'
import base_url from '../../../baseUrl'
import { Modal } from 'bootstrap'
import Loader from '../../../layout/Loader'


function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userId = localStorage.getItem('userId')
    const [userProfile, setUserProfile] = useState()
    const [totalPosting, setTotalPosting] = useState(0)
    const [totalPromotion, setTotalPromotion] = useState(0)
    const [totalRecommend, setTotalRecommend] = useState(0)
    const [isDrop, setIsDrop] = useState(false)
    const [openDispute, setOpenDispute] = useState(0)
    const [trackerBookmark, setTrackerBookmark] = useState([])
    const [profileViews, setProfileViews] = useState([])
    const [userData, setUserData] = useState({})
    const [bookmarkData, setBookMarkData] = useState([])
    const [myChat, setMyChat] = useState([])
    const [myConnection, setMyConnection] = useState([])
    const [downMembership, setDownMembership] = useState()
    const [nextPay, setNextPay] = useState({})
    const [trustedReferences, setTrustedReferences] = useState([])
    const [recommendedData, setRecommendedData] = useState([])
    const [connectionRequest, setConnectionRequest] = useState([])
    const [isActive, setIsActive] = useState(false)
    const [upgradeMembership, setUpgradeMembership] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [feedbackMsg, setFeedbackMsg] = useState('')
    const [loading,setLoading]=useState(true)
    const [formData, setFormData] = useState({ firstName: "", email: "", message: "", contact: "", type: "", userId })
    const { profileData, membershipData, businessData } = useSelector(state => state.user)
    useEffect(() => {
        if (!userId) {
            navigate('/login')
        }
    }, [userId, navigate])
    useEffect(() => {
        if (userId) {
            dispatch(fetchUserData())
            dispatch(fetchUserBusiness())
        }
    }, [userId])
    useEffect(() => {
        if (membershipData && Object.keys(membershipData).length > 0) {

            if (membershipData.status !== 'active') {
                setIsActive(false);
            } else {
                setIsActive(true)
            }
        }
    }, [membershipData]);

    async function getMembershipData() {
        try {
            const result = await getSecureApiData('get-membership?type=provider')
            if (result.status) {
                const membership = result.membershipData.find(item => item.topChoice === true)
                const downmembership = result.membershipData.find(item => item.topChoice === false)

                setUpgradeMembership(membership)
                setDownMembership(downmembership)
            }
        } catch (error) {
            console.error('Error fetching membership data:', error)
        }
    }
    useEffect(() => {
        getMembershipData()
        getDashboardData()
        getConnectionRequest()
    }, [])
    async function getDashboardData() {
        try {
            const result = await getSecureApiData(`api/users/dashboard/${userId}`)
            if (result.success) {
                setTotalPosting(result.totalPosting)
                setTotalPromotion(result.totalPromotion)
                setOpenDispute(result.openDispute)
            }
        } catch (error) {
            console.error('Error fetching membership data:', error)
        }
    }
    async function getConnectionRequest() {
        try {
            const result = await getSecureApiData(`api/users/connection-request/${userId}`)
            if (result.success) {
                setConnectionRequest(result.userProfile)
            }
        } catch (error) {
            console.error('Error fetching membership data:', error)
        }
    }
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
    const downGradeMembership = async (id) => {
        try {
            const response = await securePostData('api/users/downgrade-membership', { downGradeId: id, userId, membershipId: membershipData._id })
            if (response.success) {
                dispatch(fetchUserData())
                getUserData()

                toast.success("Your membership was downgrade")
            } else {
                toast.error(response.message)
            }
        } catch (error) {

        }
    }
    const buyMembership = () => {
        sessionStorage.setItem('providerMembership', true)
        navigate('/provider/upgrade-membership')
    }
    async function getUserProfile() {
        try {
            const result = await getSecureApiData(`api/provider/profile-get/${userId}`)
            if (result.status) {
                setUserProfile(result.data)
                setTotalRecommend(result.totalRecommend)
                setLoading(false)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function getNextPay() {
        try {
            const result = await getSecureApiData(`api/users/next-pay/${userId}`)
            if (result.success) {
                setNextPay(result.data)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function getMyChat() {
        try {
            const result = await getSecureApiData(`api/users/my-chat/${userId}`)
            if (result.status) {
                setMyChat(result.users)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        getUserProfile()
        getTrackerBookmark()
        getBookmarkData()
        getUserData()
        getNextPay()
        getUserProfileViews()
        getRecommendedData()
        getUserFeature()
        getMyChat()
        getTrustedRef()
    }, [userId])
    async function getUserData() {
        try {
            const result = await getSecureApiData(`api/users/${userId}`)
            if (result.success) {
                setUserData(result.user)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        if (
            Object.keys(userData).length &&
            !['live', 'cdraft', 'tdraft'].includes(userData.status)
        ) {
            navigate('/');
        }
    }, [JSON.stringify(userData)]);


    async function getUserProfileViews() {
        try {
            const result = await getSecureApiData(`api/users/view-profile/${userId}`)
            if (result.success) {
                setProfileViews(result.profileViews)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function getBookmarkData() {
        try {
            const result = await getSecureApiData(`api/users/bookmark/${userId}?type=provider&page=1`)
            if (result.success) {
                setBookMarkData(result.bookmarkData)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function getTrackerBookmark() {
        try {
            const result = await getSecureApiData(`api/users/bookmark/${userId}?type=scam&page=1`)
            if (result.success) {
                setTrackerBookmark(result.bookmarkData)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function bookMarkUser(id) {
        if (id == null || id == undefined) {
            return
        }
        if (userId == id) {
            return
        }
        const data = { userId, bookmarkUser: id }
        try {
            const result = await securePostData('api/users/bookmark-profile', data)
            if (result.success) {
                getBookmarkData()
            }
        } catch (error) {

        }
    }
    async function recommendUserProfile(id) {
        if (id == null || id == undefined) {
            return
        }
        const data = { userId, recommendedUser: id }
        try {
            const result = await securePostData('api/users/recommend-user', data)
            if (result.success) {
                getBookmarkData()
                getRecommendedData()
            }

        } catch (error) {

        }
    }
    async function getRecommendedData() {
        try {
            const result = await getSecureApiData(`api/users/recommended/${userId}`)
            if (result.success) {
                setRecommendedData(result.recommendedData)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function getUserFeature() {
        try {
            const result = await getSecureApiData(`api/provider/get-feature/${userId}`)
            if (result.status) {
                // setTotalPage(result.pagination.totalPage)
                const filteredConnections = result.data.connection.filter(item => item.status === 'accepted');
                setMyConnection(filteredConnections)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    const userActionProfile = async ({ status }) => {
        if (userData?.status == 'tdraft') {
            toast.error("Your trade license has expired. Please submit the updated trade license.")
        }
        const data = { userId, status, isAdmin: false }
        try {
            const result = await securePostData(`profile-action`, data)
            if (result.success) {
                getUserData()
                const modalEl = document.getElementById('confirmModal');
                const modal = Modal.getInstance(modalEl);
                modal.hide();
                document.body.classList.remove('modal-open');
                document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
                toast.success('Profile status will updated!')
            }
        } catch (error) {
            // toast.error(error.response?.data?.message || "Server error");
        }
    }
    async function payNow() {
        const { amount, planType, nextPaymentDate } = nextPay;
        const membershipId = nextPay.plan._id;
        const membershipType = 'provider';

        const startDate = new Date(nextPaymentDate);
        const endDate = new Date(startDate);

        endDate.setDate(startDate.getDate() + (planType === 'yearly' ? 360 : 30));
        if (new Date(startDate) > new Date()) {
            sessionStorage.setItem('renewMembership', true);
        } else {
            sessionStorage.setItem('buyMembership', true);
        }
        sessionStorage.setItem(
            'membershipData',
            JSON.stringify({
                price: amount,
                startDate,
                endDate,
                membershipId,
                membershipType
            })
        );
        navigate('/payment-gateway')
    }
    async function getTrustedRef() {
        try {
            const result = await getSecureApiData(`api/provider/trusted-reference/${userId}`)

            if (result.status) {
                setTrustedReferences(result.data)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function handleTrustedRef(referenceUser) {
        const data = { referenceUser, userId }
        try {
            const result = await securePostData(`api/provider/trusted-reference`, data)
            if (result.status) {
                getTrustedRef()
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    const profileRef = useRef(null);

    useEffect(() => {
        const splide = profileRef.current?.splide;

        // Add event listeners to buttons
        const prevBtn = document.getElementById('prev');
        const nextBtn = document.getElementById('next');

        if (prevBtn && nextBtn && splide) {
            prevBtn.addEventListener('click', () => splide.go('<'));
            nextBtn.addEventListener('click', () => splide.go('>'));
        }

        // Cleanup to prevent duplicate listeners
        return () => {
            if (prevBtn) prevBtn.removeEventListener('click', () => splide.go('<'));
            if (nextBtn) nextBtn.removeEventListener('click', () => splide.go('>'));
        };
    }, []);
    const handleModalChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    async function handleSubmit(e, submitType) {
        e.preventDefault()
        formData.type = submitType
        console.log(formData)
        if (formData.email == '' || formData.firstName == '' || formData.message == "") {
            toast.error("Please fill all fields")
            return
        }
        try {
            const result = await postApiData('api/users/contact', formData)
            if (result.success) {
                toast.success("A member of the Wizbizla team will contact you shortly.")
                const modalEl = document.getElementById(submitType == 'get-in-touch' ? 'touchModal' : 'concernModal');
                const modal = Modal.getInstance(modalEl);
                modal.hide();
                document.body.classList.remove('modal-open');
                document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
                setFormData({ firstName: "", lastName: "", email: "", message: "", contact: "", topic: "" })

            } else {
                toast.message(result.message)
            }
        } catch (error) {

        }
    }
    async function feedbackSubmit(e) {
        e.preventDefault()
        const data = { userId, message: feedbackMsg }
        try {
            const result = await postApiData('feedback', data)
            if (result.success) {
                toast.success("Thank you for your feedback.")
                const modalEl = document.getElementById('feedbackModal');
                const modal = Modal.getInstance(modalEl);
                modal.hide();
                document.body.classList.remove('modal-open');
                document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
                setFeedbackMsg('')

            } else {
                toast.message(result.message)
            }
        } catch (error) {

        }
    }
    async function connectionAction(status, connectedUser) {
        const data = { userId, status, connectedUser }
        try {
            const result = await securePostData(`api/users/connection-action`, data)
            if (result.success) {
                getConnectionRequest()
                toast.success('Connection request updated!')
            }
        } catch (error) {
            // toast.error(error.response?.data?.message || "Server error");
        }
    }
    async function removeProfile() {
        try {
            const result = await deleteApiData(`api/provider/profile-image/${userId}`)
            if (result.status) {
                setIsDrop(false)
                getUserProfile()
            }
        } catch (error) {
            // toast.error(error.response?.data?.message || "Server error");
        }
    }
    return (
        <>
        {loading?<Loader/>:<>
            <div className="main-section flex-grow-1 dash-board-second-main-section ">
                <div className="dash-board-bg-sec">
                    <div className="">
                        <h2>
                            <span className='text-capitalize'>
                                {profileData?.firstName}
                            </span> , Welcome to Your Service Provider Dashboard 👋</h2>
                    </div>
                </div>
                <div className="position-relative ">
                    <div className="col-lg-11 ">
                        <div className="posting-histry-sec p-3 mx-lg-2 mx-sm-0  posting-history-crd-box " >
                            <div className="posting-crd-subbox">
                                <div className='row'>
                                    <div className='col-lg-6 mb-3'>
                                        <div className="posting-crd-img border-0 ">
                                            <img src={userProfile? (userProfile?.profileImage && `${base_url}/${userProfile?.profileImage}`) :
                                             images?.postingHistoryFirst} alt="" />
                                            {/* <div className='posting-edit-btn'>
                                      <a href="#" className="">
                                        <i className="fa-solid fa-ellipsis-vertical" />
                                    </a>
                                    
                                  </div> */}

                                            <div className="posting-edit-btn">
                                                <div className="dropdown">
                                                    <button
                                                        className=""
                                                        id="postMenuBtn"
                                                        onClick={() => setIsDrop(!isDrop)}
                                                    >
                                                        <i className="fa-solid fa-ellipsis-vertical" />
                                                    </button>
                                                    {isDrop && userProfile?.profileImage && <ul className="" >
                                                        <li className="dashboard-mobile-res-btn changeImg"><Link to='/provider/edit-profile' className="thm-btn nw-rm-tbn fz-14">Change Image</Link></li>
                                                    </ul>}
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className=''>
                                            <div className="posting-crd-content-dta-box mb-2">
                                                <h5 className="mb-0 fz-24 text-capitalize">{profileData?.firstName} {"  "} {profileData?.lastName}</h5>
                                                <ul className=''>
                                                    <li>
                                                        <span>Created on:</span> {userData?.createdAt
                                                            ? new Date(userData.createdAt).toLocaleDateString('en-GB', {
                                                                day: '2-digit',
                                                                month: 'short',
                                                                year: 'numeric',
                                                            }).replace(/ /g, '-') // converts "01 Jan 2024" → "01-Jan-2024"
                                                            : '-'}

                                                    </li>
                                                    <li>
                                                        <span>Approved on:</span> {userData?.approvedOn
                                                            ? new Date(userData.approvedOn).toLocaleDateString('en-GB', {
                                                                day: '2-digit',
                                                                month: 'short',
                                                                year: 'numeric',
                                                            }).replace(/ /g, '-') // converts "01 Jan 2024" → "01-Jan-2024"
                                                            : '-'}

                                                    </li>
                                                    <li>
                                                        <span>Published on:</span> {userData?.publishedOn
                                                            ? new Date(userData.publishedOn).toLocaleDateString('en-GB', {
                                                                day: '2-digit',
                                                                month: 'short',
                                                                year: 'numeric',
                                                            }).replace(/ /g, '-') // converts "01 Jan 2024" → "01-Jan-2024"
                                                            : '-'}

                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="posting-btn-list">
                                                <ul className="dash-your-profle-sec d-flex flex-column gap-3 px-0">
                                                    <li className="dashboard-mobile-res-btn">
                                                        <button data-bs-toggle="modal"
                                                            data-bs-target="#confirmModal" className={`thm-btn nw-mb-thm-btn outline ${userData?.status == 'live' ? 'live-btn' : 'disable-btn'}`}>
                                                            <span className="text-muted ">{userData?.status == 'cdraft' ? 'Make Live' : 'Make Draft'}</span>
                                                        </button>
                                                    </li>
                                                    <li className="dashboard-mobile-res-btn">
                                                        <Link to={membershipData?.membershipId?.topChoice ? '/vip' : '/profile'} className="thm-btn nw-mb-thm-btn ">
                                                            Edit {membershipData?.membershipId?.name}
                                                        </Link>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>




                            </div>
                        </div>
                    </div>
                </div>
                {/* {!membershipData?.membershipId?.topChoice && <div className="row dash-profile-overflow mt-4">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="dash-profile-sec dash-profile-second-box">
                            <div>
                                <div className="main-profile-sec">
                                    <h3>Upgrade to {upgradeMembership?.name}</h3>
                                    <ul>
                                        <li className="divider" />
                                    </ul>
                                </div>
                                <ul className="dash-your-profle-sec">
                                    <li className="dash-profile-list justify-content-start dash-member-aed">
                                        {upgradeMembership?.price?.monthly} AED <sup>/ Per Month</sup>
                                    </li>
                                    <li className="dash-profile-list">
                                        Become a {upgradeMembership?.name} Service Provider and join the Loyalty Rewards
                                        Program.
                                    </li>
                                    <li className="d-flex justify-content-start align-items-center py-4">
                                        <Link to="/provider/upgrade-membership" className="btn btn-primary">
                                            Upgrade Now
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>} */}
                <div className="row dash-profile-overflow dash-account-balance mt-4 mx-lg-2 mx-sm-0">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="dash-profile-sec">
                            <div className='nw-data-crd'>
                                <div className="main-profile-sec">
                                    <h3>My profile</h3>
                                    <ul className='mb-0'>
                                        <li className="divider" />
                                    </ul>
                                </div>
                                <ul className="dash-your-profle-sec">

                                    <li className="dash-profile-list">
                                        <span>Membership</span>
                                        <span className='nw-dash-item'>
                                            {membershipData?.membershipId?.name}
                                        </span>
                                    </li>
                                    <li className="dividers" />
                                    <li className="dash-profile-list">
                                        <span>Phone</span>
                                        <span className='nw-dash-item'>
                                            {profileData?.contactNumber}
                                        </span>
                                    </li>
                                    <li className="dividers" />
                                    <li className="dash-profile-list">
                                        <span>E-mail</span>
                                        <span className='nw-dash-item'>
                                            {profileData?.email}
                                        </span>
                                    </li>
                                    <li className="dividers" />
                                    <br />
                                    <li className="d-flex justify-content-between align-items-center dashboard-mobile-res-btn gap-3 py-4">
                                        <Link to="/provider/edit-profile" className="thm-btn nw-mb-thm-btn ">
                                            Edit my profile
                                        </Link>
                                        <Link to="/provider/setting" state={{ textDecoration: "underline" }} className="thm-btn nw-mb-thm-btn outline text-decoration-underline">
                                            Change password
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="dash-profile-sec">
                            <div className='nw-data-crd'>
                                <div className="main-profile-sec">
                                    <div className="d-flex justify-content-center gap-3">
                                        <h3>Subscription payment</h3>
                                        {/* <h4>-52 AED</h4> */}
                                    </div>
                                    <ul className='mb-0'>
                                        <li className="divider" />
                                    </ul>
                                </div>
                                <ul className="dash-your-profle-sec">
                                    <li className="dash-profile-list">
                                        You have an outstanding payment of {nextPay?.amount} AED at the moment. <br /> Thank you
                                        for being up to date
                                    </li>
                                    <li className="dividers" />
                                    <li className="dash-profile-list">
                                        <span>Next Payment:</span>
                                        <span className='nw-dash-item'>
                                            AED {nextPay?.amount}
                                        </span>
                                    </li>
                                    <li className="dividers" />
                                    <li className="dash-profile-list">
                                        <span>Due Date:</span>
                                        <span className='nw-dash-item'>
                                            {nextPay?.nextPaymentDate &&
                                                new Date(nextPay?.nextPaymentDate).toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                        </span>
                                    </li>
                                    <li className="dividers" />
                                    <li className=" py-4">
                                        <button onClick={() => payNow()} className="thm-btn nw-mb-thm-btn text-decoration-underline">
                                            Pay now
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {profileViews?.length > 0 && <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
                    <div className="col-lg-12">
                        <div className="dash-profile-sec dash-slide-sec p-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5>Recently Viewed Profiles</h5>
                                <div className="d-flex align-items-center gap-2">
                                    <div id="custom-arrows" className="d-flex gap-2">
                                        <button className="nw-prev-btn" style={{ color: "#4F40FF" }} id="prev">
                                            <i class="fa-solid fa-chevron-left"></i>

                                        </button>
                                        <button className="nw-prev-btn" id="next">
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div id="profile-slider" class="splide">
                                <Splide
                                    ref={profileRef}
                                    options={{
                                        type: 'loop',
                                        perPage: 3,
                                        perMove: 1,
                                        arrows: false,
                                        pagination: false,
                                        gap: '1rem',
                                        breakpoints: {
                                            768: { perPage: 1 },
                                            1024: { perPage: 2 },
                                            1440: { perPage: 3 },
                                        },
                                    }}
                                    aria-label="Profile Slider"
                                >
                                    {profileViews.map((item, index) => (
                                        <SplideSlide key={index}>
                                            <Link to={`/wizbizla/provider?name=${item?.viewUserId?.firstName}&wiz=${item?.viewUserId?._id}`} className="card text-center border-0">
                                                <div className="dash-slider-bx">
                                                    <img
                                                        src={item?.viewUserId?.profileImage ? `${base_url}/${item?.viewUserId?.profileImage}` : '/assets/images/dash-slider-fours.png'}
                                                        alt={item?.viewUserId?.firstName}
                                                        className="mx-auto"
                                                        style={{ width: '265px', height: '265px' }}
                                                    />
                                                </div>
                                                <div className="dash-slide-content mt-3 text-capitalize">
                                                    <h6 className="mb-0 fw-bold">{item?.viewUserId?.firstName} {item?.viewUserId?.lastName}</h6>
                                                    <h4 className="text-primary">{item?.viewUserId?.title}</h4>
                                                    <small className="text-muted">{item?.viewUserId?.company}</small>
                                                </div>
                                            </Link>
                                        </SplideSlide>
                                    ))}
                                </Splide>
                            </div>
                        </div>
                    </div>
                </div>}
                <div className="row dash-profile-overflow mt-4 dash-board-second-business-profile-mem mx-lg-2 mx-sm-0">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <>
                            {isActive && membershipData?.membershipId?.topChoice ? (
                                <div className="dash-profile-sec dash-profile-sec-web-logo premium-membership premium-upgrade">
                                    <div className="main-profile-sec">
                                        <h3>Downgrade to {downMembership?.name}</h3>
                                        <ul><li className="divider" /></ul>
                                    </div>

                                    <ul className="dash-your-profle-sec">
                                        <li className="dash-profile-list">
                                            {downMembership?.price?.monthly} AED <sub>/ Per Month</sub>
                                        </li>
                                        <li className="d-flex justify-content-start align-items-center py-4">
                                            <button
                                                onClick={() => downGradeMembership(downMembership?._id)}
                                                className="btn btn-primary upgrade-btn"
                                            >
                                                Downgrade Now
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <div className="dash-profile-sec dash-profile-sec-web-logo premium-membership premium-upgrade gold-premium-upgrade">
                                    <div className="main-profile-sec">
                                        <h3>Upgrade to {upgradeMembership?.name}</h3>
                                        <ul><li className="divider" /></ul>
                                    </div>

                                    <ul className="dash-your-profle-sec">
                                        <li className="dash-profile-list">
                                            {upgradeMembership?.price?.monthly} AED <sub>/ Per Month</sub>
                                        </li>
                                        <li className="d-flex justify-content-start align-items-center py-4">
                                            <button
                                                type="button"
                                                onClick={buyMembership}
                                                className="btn btn-primary upgrade-btn"
                                            >
                                                Upgrade Now
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="dash-profile-sec">
                            <div>
                                <div className="main-profile-sec">
                                    <h3>Trade License</h3>
                                    <ul>
                                        <li className="divider" />
                                    </ul>
                                </div>
                                <ul className="dash-your-profle-sec dash-board-active-btn-sec dash-board-overflow-chat-sec nw-trade-wizbila">
                                    {businessData && businessData?.licenses?.map((item, key) => (
                                        <li className="d-flex justify-content-between align-items-center py-3 mb-nw-res" key={key}>
                                            <h6 className='fw-500 fz-16' style={{ color: "#626884" }}>Trade License 1</h6>
                                            <div className='d-flex gap-2 align-items-center'>
                                                <Link
                                                    to={new Date(item?.licenseExpiryDate) < new Date() ? membershipData?.membershipId?.topChoice ? '/vip?step=3' : '/profile?step=3' : ''}
                                                    className={`btn btn-primary text-decoration-none ${new Date(item?.licenseExpiryDate) > new Date()
                                                        ? 'dash-active-btn' : 'dash-expire-btn'
                                                        }`}
                                                >
                                                    <i className="fas fa-check" /> {
                                                        new Date(item?.licenseExpiryDate) > new Date() ? 'Active' : 'Expired'} as of  {"  "}
                                                    {new Date(item?.licenseExpiryDate).toLocaleDateString('en-GB', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                </Link>
                                                {new Date(item?.licenseExpiryDate) < new Date() && <Link to={membershipData?.membershipId?.topChoice ? '/vip?step=3' : '/profile?step=3'} className="upload-icon mx-auto" >
                                                    <img src='/assets/images/business-file-upload.png' alt='Upload' />
                                                </Link>}
                                            </div>
                                        </li>
                                    ))}



                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row dash-profile-overflow dash-board-second-history mt-4 mx-lg-2 mx-sm-0">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="dash-profile-sec dash-profile-history">
                            <div>
                                <div className="main-profile-sec">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h3>My Posting History</h3>
                                        <a href="javascript:void(0)">
                                            <i className="fa-solid fa-ellipsis-vertical" />
                                        </a>
                                    </div>
                                    <ul className='mb-0'>
                                        <li className="divider" />
                                    </ul>
                                </div>
                                <ul className="dash-your-profle-sec">
                                    <li className="dash-profile-list dash-board-text">
                                        Scam Reports
                                        <span>{totalPosting}</span>
                                    </li>
                                    <li className="dash-profile-list dash-board-text">
                                        <Link to='/provider/posting-history' style={{ color: '#4F40FF' }}>View all</Link>
                                    </li>
                                    <li></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="dash-profile-sec dash-profile-history">
                            <div>
                                <div className="main-profile-sec">
                                    <h3>My Advertisements</h3>
                                    <ul className='mb-0'>
                                        <li className="divider" />
                                    </ul>
                                </div>
                                <ul className="dash-your-profle-sec">
                                    {totalPromotion == 0 ? <li className="dash-profile-list dash-board-text">
                                        You have not yet posted information about promotions with us
                                    </li> :
                                        <>
                                            <li className="dash-profile-list dash-board-text">
                                                Active Promotions
                                                <span>{totalPromotion}</span>
                                            </li>
                                            <li className="dash-profile-list dash-board-text">
                                                <Link to="/provider/advertisement" style={{ color: '#4F40FF' }}>View all</Link>
                                            </li>
                                        </>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="dash-profile-sec dash-my-conversations dash-board-my-conversations">
                            <div>
                                <div className="main-profile-sec">
                                    <h3>My Conversations</h3>
                                    <ul>
                                        <li className="divider" />
                                    </ul>
                                </div>
                                {/* <ul class="dash-your-profle-sec">
                          <li class="dash-profile-list dash-board-text">
                              You have not started any conversations yet
                          </li>

                      </ul> */}
                                <div className="dash-board-overflow-conversations-bx">

                                    {myChat?.length > 0 ?
                                        myChat.map((item, key) =>
                                            <div className="dash-board-usr-my-conver" key={key}>
                                                <Link to={`/provider/chat?wiz=${item?.user?._id}`} className=" dash-online-sec">
                                                    <div className="dash-online-usr-image">
                                                        <img src={item?.profile?.profileImage ? `${base_url}/${item?.profile?.profileImage}` : images?.nationDashBoard} alt="" />
                                                    </div>
                                                    <div className="dash-user-details">
                                                        <h5 className="">{item?.user?.firstName} {item?.user?.lastName}</h5>
                                                        <h6>{item?.profile?.title || ''}</h6>
                                                    </div>
                                                    <span className="ms-auto">{timeAgo(item?.createdAt)}</span>
                                                </Link>
                                                <p>
                                                    {item?.lastMessage}
                                                </p>
                                            </div>) : <p className='pb-3 ms-4'>You have not started any conversations yet</p>}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="dash-profile-sec dash-my-conversations">
                            <div>
                                <div className="main-profile-sec">
                                    <h3>Service Disputes</h3>
                                    <ul>
                                        <li className="divider" />
                                    </ul>
                                </div>
                                <ul className="dash-your-profle-sec">
                                    <li className="dash-profile-list dash-board-text">
                                        Disputes Open
                                        <span>{openDispute}</span>
                                    </li>
                                    <li className="dash-profile-list dash-board-text">
                                        Disputes Against
                                        <span>0</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">

                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="dash-profile-sec dash-my-posting-history nw-posting-bx ">
                            <div>
                                <div className="main-profile-sec d-flex justify-content-between">
                                    <h3>My WizBizLa Connections</h3>
                                    <a href="#" className="posting-edit-btn">
                                        <i className="fa-solid fa-ellipsis-vertical" />
                                    </a>
                                </div>
                                <ul className='mb-0'>
                                    <li className="divider" />
                                </ul>
                                <div className="mt-2 membership-cards dash-connections-sec dash-board-overflow-chat-sec nw-chat-wizbila">
                                    {myConnection?.length > 0 ?
                                        myConnection?.map((item, key) =>
                                            <div className=" dash-online-sec" key={key}>
                                                <div className="dash-online-usr-image">
                                                    <img src={item?.profileData?.profileImage ? `${base_url}/${item?.profileData?.profileImage}` : images?.dashSliderFours} alt="" />
                                                </div>
                                                <div className="dash-user-details">
                                                    <h5 className="">{item?.userId?.firstName} {item?.userId?.lastName}</h5>
                                                    <h6>{item?.profileData?.title}</h6>
                                                </div>
                                            </div>
                                        ) : <p className='pb-3 ms-3'>No data</p>}




                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="dash-profile-sec nw-posting-bx dash-board-history-second-point  dash-my-posting-history">
                            <div>
                                <div className="main-profile-sec">
                                    <h3>Connection Request</h3>
                                    <ul className='mb-0'>
                                        <li className="divider" />
                                    </ul>
                                </div>
                            </div>
                            <div className="dashboard-pont-history-sec px-3 nw-chat-wizbila mt-2">

                                <div id="userContainer">
                                    {connectionRequest?.length > 0 ?
                                        connectionRequest?.map((item, key) => <div className="dash-online-sec">
                                            <div className="dash-online-usr-image dash-online-usr-image-rm">
                                                <img src={item?.profileData?.profileImage ?
                                                    `${base_url}/${item?.profileData?.profileImage}` : images?.nationDashBoard} alt="" />
                                            </div>
                                            <div className="dash-user-details">
                                                <h5 className="">{item?.userId?.firstName} {item?.userId?.lastName}</h5>
                                                <h6>{item?.profileData?.title || item?.profileData?.company}</h6>
                                            </div>
                                            <div className="ms-auto d-flex gap-2 align-items-center conn-clos-btn">
                                                <button className='req-btn' onClick={() => connectionAction('accepted', item?.userId?._id)}>Accept</button>
                                                <button className='req-btn req-opacty-btn' onClick={() => connectionAction('rejected', item?.userId?._id)}>Reject</button>
                                            </div>
                                        </div>) :
                                        <p className='pb-3 ms-3'>No data</p>}


                                    {/* <div className="dash-online-sec">
                                        <div className="dash-online-usr-image dash-online-usr-image-rm">
                                            <img src={images?.nationDashBoard} alt="" />
                                        </div>
                                        <div className="dash-user-details">
                                            <h5 className="">Nathan Patton</h5>
                                            <h6>UX UI Designer</h6>
                                        </div>
                                        <div className="ms-auto d-flex gap-2 align-items-center conn-clos-btn">
                                            <button className='req-btn'>Accept</button>
                                            <button className='req-btn req-opacty-btn'>Reject</button>
                                        </div>
                                    </div> */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="dash-profile-sec dash-my-posting-history">
                            <div>
                                <div className="main-profile-sec">
                                    <div className="membership-cards dash-history-tab-btn d-flex align-items-center justify-content-between">
                                        <h3>My Bookmarks</h3>
                                        <ul className="nav" id="myTab" role="tablist">

                                            <li className="tab-item" role="presentation">
                                                <button
                                                    className="tab-link active"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#business-tabs-02"
                                                    type="button"
                                                    role="tab"
                                                >
                                                    Service Providers
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
                                                    Scam Tracker
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                    <ul>
                                        <li className="divider" />
                                    </ul>
                                </div>
                                <div className="membership-cards dash-connections-sec dash-board-overflow-chat-sec">
                                    <div className="tab-content" id="myTabContent">

                                        <div
                                            className="tab-pane fade show active"
                                            id="business-tabs-02"
                                            role="tabpanel"
                                        >
                                            <div className="custom-profile-slider-section mt-2">
                                                {bookmarkData?.length > 0 ? <div id="customProfileSlider" class="splide">
                                                    <Splide
                                                        options={{
                                                            type: 'loop',
                                                            autoplay: true,
                                                            interval: 3000,
                                                            resetProgress: false,
                                                            perPage: 3,
                                                            breakpoints: {
                                                                1024: { perPage: 3 },
                                                                768: { perPage: 1 },
                                                            },
                                                            perMove: 1,
                                                            pagination: false,
                                                            arrows: false,
                                                            gap: '2rem',
                                                        }}
                                                        aria-label="Custom Profile Slider"
                                                    >
                                                        {bookmarkData?.length > 0 &&
                                                            bookmarkData?.map((item, key) =>
                                                                <SplideSlide key={key}>
                                                                    <div className="custom-profile-card">
                                                                        <div className="profile-image mb-3">
                                                                            <img src={item?.profile?.isDefaultBanner ? `${base_url}/${item?.profile?.categories[0].category.image}` : `${base_url}/${item?.profile?.bannerImage}`} alt="Banner"
                                                                                style={{ width: '470px', height: '170px', objectFit: 'cover', borderRadius: '10px' }} />
                                                                        </div>
                                                                        <div className="slide-tab-custm-card">
                                                                            <div className="user-logo d-flex align-items-center gap-2 mb-2">
                                                                                <img
                                                                                    src={item?.profile?.profileImage ? `${base_url}/${item?.profile?.profileImage}` : images?.sliderLogo}
                                                                                    className="rounded-circle"
                                                                                    alt="User"
                                                                                />
                                                                                <div>
                                                                                    <div className="slider-name-card">
                                                                                        <h6 className="mb-0 text-capitalize">{item?.bookmarkUser?.firstName} {item?.bookmarkUser?.lastName}</h6>
                                                                                        <img src={images?.verifyUers} alt="" />
                                                                                        <i className="fa-regular fa-gem" />
                                                                                    </div>
                                                                                    <small>{item?.profile?.company}</small>
                                                                                </div>
                                                                            </div>
                                                                            <div className="d-flex align-items-center gap-2 mb-2 slider-bx-dta-card justify-content-between">
                                                                                <Link className="slider-tab-recon" onClick={() => recommendUserProfile(item?.bookmarkUser?._id)}>
                                                                                    {recommendedData?.some(rec => rec?.recommendedUser === item?.bookmarkUser?._id)
                                                                                        ? <i className="fa-solid fa-thumbs-up" ></i>
                                                                                        : <i className="fa-regular fa-thumbs-up" ></i>}
                                                                                    <span className="fw-bold">{item?.totalRecommended}</span>
                                                                                    <p className="mb-0">Recommendations</p>
                                                                                </Link>

                                                                                <Link onClick={() => bookMarkUser(item?.bookmarkUser?._id)}>
                                                                                    <i className="fa-solid fa-bookmark ms-auto" />
                                                                                </Link>
                                                                            </div>
                                                                            <div className="slide-btm-dta-crd">
                                                                                <h5 className="fw-semibold mb-1">Client Profile</h5>
                                                                                <p className="text-muted small">
                                                                                    {item?.profile?.idealClientProfile}
                                                                                </p>
                                                                                {!trustedReferences?.some(t => t?.referenceUser == item?.bookmarkUser?._id) ?
                                                                                    <a role='button' onClick={() => handleTrustedRef(item?.bookmarkUser?._id)} className=" small d-block mb-1">
                                                                                        <i className="fa-solid fa-bullhorn me-1" />
                                                                                        Request a Reference
                                                                                    </a> : <a role='button' className=" small d-block mb-1">
                                                                                        <br/>
                                                                                    </a>}
                                                                            </div>
                                                                            <div className="d-flex justify-content-between align-items-center pt-2 mt-2 slide-btm-design-crd">
                                                                                <span className="text-dark small fw-semibold">{item?.profile?.title}</span>
                                                                                <Link to={`/wizbizla/provider?name=${item?.bookmarkUser.firstName}&wiz=${item?.bookmarkUser?._id}`} className="text-warning small">
                                                                                    View Profile
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </SplideSlide>)}
                                                    </Splide>
                                                </div> : <div className="">
                                                    <p>You have not added any bookmarks yet.</p>
                                                </div>}

                                            </div>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="business-tabs-03"
                                            role="tabpanel"
                                        >
                                            <div className="custom-profile-slider-section mt-2">
                                                {bookmarkData?.length > 0 ? <div id="customProfileSlider" class="splide">
                                                    <Splide
                                                        options={{
                                                            type: 'loop',
                                                            autoplay: true,
                                                            interval: 3000,
                                                            resetProgress: false,
                                                            perPage: 3,
                                                            breakpoints: {
                                                                1024: { perPage: 3 },
                                                                768: { perPage: 1 },
                                                            },
                                                            perMove: 1,
                                                            pagination: false,
                                                            arrows: false,
                                                            gap: '2rem',
                                                        }}
                                                        aria-label="Custom Profile Slider"
                                                    >
                                                        {trackerBookmark?.length > 0 &&
                                                            trackerBookmark?.map((item, key) =>
                                                                <SplideSlide key={key}>
                                                                    <div className="custom-profile-card">
                                                                        <div className="profile-image mb-3">
                                                                            <img src={item?.trackerBookmark?.image && `${base_url}/${item?.trackerBookmark.image}`} alt="Banner"
                                                                                style={{ width: '500px', height: '170px', objectFit: 'cover', borderRadius: '10px' }} />
                                                                        </div>
                                                                        <div className="slide-tab-custm-card">
                                                                            <div className="d-flex align-items-center gap-2 mb-2 slider-bx-dta-card justify-content-between">
                                                                                <h5 className="fw-semibold mb-1">{item?.trackerBookmark?.title}</h5>
                                                                                <Link onClick={() => bookMarkUser(item?.trackerBookmark?._id)}>
                                                                                    <i className="fa-solid fa-bookmark ms-auto" />
                                                                                </Link>
                                                                            </div>
                                                                            <div className="slide-btm-dta-crd">
                                                                                <p className="text-muted small">
                                                                                    {item?.trackerBookmark?.description?.slice(0, 50)}
                                                                                </p>

                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </SplideSlide>)}
                                                    </Splide>
                                                </div> : <div className="">
                                                    <p>You have not added any bookmarks yet.</p>
                                                </div>}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="dash-profile-sec dash-profile-rating">
                            <div>
                                <div className="main-profile-sec">
                                    <h3>My Ratings</h3>
                                    <ul>
                                        <li className="divider" />
                                    </ul>
                                </div>
                                <ul className="dash-your-profle-sec">
                                    <li className="dash-profile-list dash-board-text">
                                        Received
                                        <span>{totalRecommend}</span>
                                    </li>
                                    <li className="dash-profile-list dash-board-text">
                                        Given
                                        <span>{recommendedData?.length}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>                        
                        <div className="row dash-profile-overflow dash-sub-box mt-4">
                            <div className="dash-profile-sec dash-profile-my-promotions p-0">
                                <div>
                                    <div className="main-profile-sec">
                                        <h3>My Promotions</h3>
                                        <ul>
                                            <li className="divider" />
                                        </ul>
                                    </div>
                                    <ul className="dash-your-profle-sec">
                                        <p>
                                            You have not yet posted information about PROMOTIONS with us
                                        </p>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="dash-profile-sec dash-profile-contact">
                            <div>
                                <div className="main-profile-sec">
                                    <h3>Contact us</h3>
                                    <ul>
                                        <li className="divider" />
                                    </ul>
                                </div>
                                <div className="faq-rgt">
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button
                                                    className="accordion-button"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#faq-01"
                                                >
                                                    Need&nbsp;help? FAQs
                                                </button>
                                            </h2>
                                            <div
                                                id="faq-01"
                                                className="accordion-collapse collapse show"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <p>
                                                        Wizbizla can assist you with that. We'll ask you a series
                                                        of questions designed to help us help you work with the
                                                        service provider with which you have a dispute. Be as
                                                        specific as possible as you answer the questions--this can
                                                        make the process work much more quickly and efficiently.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button
                                                    className="accordion-button collapsed"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#faq-02"
                                                >
                                                    Want to&nbsp;share&nbsp;your work on WizBizLa?
                                                </button>
                                            </h2>
                                            <div
                                                id="faq-02"
                                                className="accordion-collapse collapse"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <p>
                                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                                        Maxime cupiditate saepe commodi voluptas, adipisci hic
                                                        dolore, quasi voluptatem dolor aperiam eveniet? Neque est
                                                        perspiciatis quisquam suscipit corrupti, voluptatibus
                                                        deserunt obcaecati!{" "}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button
                                                    className="accordion-button collapsed"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#faq-03"
                                                >
                                                    Full&nbsp;terms and conditions&nbsp;are available for
                                                    viewing here
                                                </button>
                                            </h2>
                                            <div
                                                id="faq-03"
                                                className="accordion-collapse collapse"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <p>
                                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                                        Repellendus odio amet, ratione porro distinctio
                                                        consequuntur excepturi, placeat similique id facere cum,
                                                        corrupti possimus? Nihil eum repellendus deserunt hic,
                                                        architecto, quos!{" "}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="dash-profile-sec dash-profile-service-link">
                            <div>
                                <div className="main-profile-sec">
                                    <h3>Boost Your Visibility &amp; Services (Quick Links)</h3>
                                    <ul>
                                        <li className="divider" />
                                    </ul>
                                </div>
                            </div>
                            <div className="dash-both-box">
                                <div className="dash-pro-service-link-box dash-board-pro-service-link-box">
                                    <ul>
                                        <li className="navigation-menu-item">
                                            <Link
                                                to="/provider/advertisement"
                                                className="navigation-menu-link locaylti-ward"
                                            >
                                                <i className="fa-solid fa-link me-2" />
                                                Place an Ad
                                            </Link>
                                        </li>
                                        <li className="navigatio n-menu-item">
                                            <Link
                                                to="/provider/advertisement"
                                                className="navigation-menu-link locaylti-ward"
                                            >
                                                <i className="fa-solid fa-link me-2" />
                                                Place an Ad and Earn Points
                                            </Link>
                                        </li>
                                        <li className="navigation-menu-item">
                                            <Link
                                                to="/provider/loyalty"
                                                className="navigation-menu-link locaylti-ward"
                                            >
                                                <i className="fa-solid fa-link me-2" />
                                                Redeem Loyalty Points
                                            </Link>
                                        </li>
                                        {!membershipData?.membershipId?.topChoice && <li className="navigation-menu-item">
                                            <Link
                                                to="/provider/upgrade-membership"
                                                className="navigation-menu-link locaylti-ward"
                                            >
                                                <i className="fa-solid fa-link me-2" />
                                                Upgrade Membership
                                            </Link>
                                        </li>}
                                        <li className="navigation-menu-item">
                                            <Link
                                                to="/podcast"
                                                className="navigation-menu-link locaylti-ward"
                                            >
                                                <i className="fa-solid fa-link me-2" />
                                                Guest Feature on Expats in Dubai Podcast
                                            </Link>
                                        </li>
                                        <li className="navigation-menu-item">
                                            <a
                                                href="#"
                                                className="navigation-menu-link locaylti-ward"
                                            >
                                                <i className="fa-solid fa-link me-2" />
                                                How to Effectively Complete Your Business Profile
                                            </a>
                                        </li>
                                        <li className="navigation-menu-item">
                                            <a
                                                href="#"
                                                className="navigation-menu-link locaylti-ward"
                                            >
                                                <i className="fa-solid fa-link me-2" />
                                                Request personal onboarding to fully optimize your profile
                                            </a>
                                        </li>
                                        <li className="navigation-menu-item">
                                            <Link
                                                to="/provider/purchase"
                                                className="navigation-menu-link locaylti-ward"
                                            >
                                                <i className="fa-solid fa-link me-2" />
                                                Request a Bespoke Concierge Service
                                            </Link>
                                        </li>
                                        <li className="navigation-menu-item">
                                            <Link
                                                to="/provider/purchase"
                                                className="navigation-menu-link locaylti-ward"
                                            >
                                                <i className="fa-solid fa-link me-2" />
                                                Request a Due Diligence Service
                                            </Link>
                                        </li>
                                        <li className="navigation-menu-item">
                                            <a
                                                href="#"
                                                className="navigation-menu-link locaylti-ward"
                                            >
                                                <i className="fa-solid fa-link me-2" />
                                                Join the Reference Program
                                            </a>
                                        </li>
                                        <li className="navigation-menu-item">
                                            <Link
                                                to="/provider/loyalty"
                                                className="navigation-menu-link locaylti-ward"
                                            >
                                                <i className="fa-solid fa-link me-2" />
                                                Join the Wizbizla Loyalty Program
                                            </Link>
                                        </li>
                                        <li className="navigation-menu-item">
                                            <Link to='/report-scam'
                                                className="navigation-menu-link locaylti-ward"
                                            >
                                                <i className="fa-solid fa-link me-2" />
                                                Report a Scam
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="dash-service-customer-pic">
                                    <img src={images?.dashCustomPic} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="dash-profile-sec dash-profile-earn-point-sec">
                            <div className="">
                                <div className="main-profile-sec">
                                    <h3>Earn points for</h3>
                                    <ul>
                                        <li className="divider" />
                                    </ul>
                                </div>
                            </div>
                            <div className="row py-3">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div>
                                        <ul className="faq-list">
                                            <li className="faq-item">
                                                <div className="faq-header">
                                                    <div className="faq-title">
                                                        1. Completing 100% of company profile
                                                    </div>
                                                    <div className="faq-right">
                                                        <span className="points">50</span>
                                                        <span className="arrow-icon">
                                                            <i className="fas fa-chevron-right" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="faq-answer">
                                                    Fill out all sections of your company profile to earn these
                                                    points.
                                                </div>
                                            </li>
                                            <li className="faq-item">
                                                <div className="faq-header">
                                                    <div className="faq-title">
                                                        2. For every 50 star customer rating
                                                    </div>
                                                    <div className="faq-right">
                                                        <span className="points">50</span>
                                                        <span className="arrow-icon">
                                                            <i className="fas fa-chevron-right" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="faq-answer">
                                                    You’ll earn points for each batch of 50 five-star reviews
                                                    received.
                                                </div>
                                            </li>
                                            <li className="faq-item">
                                                <div className="faq-header">
                                                    <div className="faq-title">
                                                        3. Enrol on the Reference Programme
                                                    </div>
                                                    <div className="faq-right">
                                                        <span className="points">150</span>
                                                        <span className="arrow-icon">
                                                            <i className="fas fa-chevron-right" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="faq-answer">
                                                    Join the reference program to start earning credibility
                                                    points.
                                                </div>
                                            </li>
                                            <li className="faq-item">
                                                <div className="faq-header">
                                                    <div className="faq-title">
                                                        4. Receive a validated reference from a client met on
                                                        Wizbizla
                                                    </div>
                                                    <div className="faq-right">
                                                        <span className="points">250</span>
                                                        <span className="arrow-icon">
                                                            <i className="fas fa-chevron-right" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="faq-answer">
                                                    Ask clients you worked with on Wizbizla to leave a validated
                                                    reference.
                                                </div>
                                            </li>
                                            <li className="faq-item">
                                                <div className="faq-header">
                                                    <div className="faq-title">
                                                        5. Successful company referral conversion:
                                                        <span className="info-icon">
                                                            ?
                                                            <span className="info-tooltip">
                                                                Client you referred completed a profile.
                                                            </span>
                                                        </span>
                                                    </div>
                                                    <div className="faq-right">
                                                        <span className="points">500</span>
                                                        <span className="arrow-icon">
                                                            <i className="fas fa-chevron-right" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="faq-answer">
                                                    When someone you refer successfully creates a profile, you
                                                    get 500 points.
                                                </div>
                                            </li>
                                            <li className="faq-item">
                                                <div className="faq-header">
                                                    <div className="faq-title">
                                                        6. Resolve a complaint fairly and promptly
                                                    </div>
                                                    <div className="faq-right">
                                                        <span className="points">500</span>
                                                        <span className="arrow-icon">
                                                            <i className="fas fa-chevron-right" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="faq-answer">
                                                    If you respond to and resolve disputes well, you’ll earn
                                                    additional points.
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="earn-rward-pic">
                                        <img
                                            src={images?.dashUserImage}
                                            alt=""
                                            className=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row dash-profile-overflow mt-4">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="dash-profile-sec dash-profile-earn-point-sec">
                            <div className="">
                                <div className="main-profile-sec">
                                    <h3>Redeem points for</h3>
                                    <ul>
                                        <li className="divider" />
                                    </ul>
                                </div>
                            </div>
                            <div className="row py-3">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div>
                                        <ul className="faq-list">
                                            <li className="faq-item">
                                                <div className="faq-header">
                                                    <div className="faq-title">
                                                        1. Completing 100% of company profile
                                                    </div>
                                                    <div className="faq-right">
                                                        <span className="points">50</span>
                                                        <span className="arrow-icon">
                                                            <i className="fas fa-chevron-right" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="faq-answer">
                                                    Fill out all sections of your company profile to earn these
                                                    points.
                                                </div>
                                            </li>
                                            <li className="faq-item">
                                                <div className="faq-header">
                                                    <div className="faq-title">
                                                        2. For every 50 star customer rating
                                                    </div>
                                                    <div className="faq-right">
                                                        <span className="points">50</span>
                                                        <span className="arrow-icon">
                                                            <i className="fas fa-chevron-right" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="faq-answer">
                                                    You’ll earn points for each batch of 50 five-star reviews
                                                    received.
                                                </div>
                                            </li>
                                            <li className="faq-item">
                                                <div className="faq-header">
                                                    <div className="faq-title">
                                                        3. Enrol on the Reference Programme
                                                    </div>
                                                    <div className="faq-right">
                                                        <span className="points">150</span>
                                                        <span className="arrow-icon">
                                                            <i className="fas fa-chevron-right" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="faq-answer">
                                                    Join the reference program to start earning credibility
                                                    points.
                                                </div>
                                            </li>
                                            <li className="faq-item">
                                                <div className="faq-header">
                                                    <div className="faq-title">
                                                        4. Receive a validated reference from a client met on
                                                        Wizbizla
                                                    </div>
                                                    <div className="faq-right">
                                                        <span className="points">250</span>
                                                        <span className="arrow-icon">
                                                            <i className="fas fa-chevron-right" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="faq-answer">
                                                    Ask clients you worked with on Wizbizla to leave a validated
                                                    reference.
                                                </div>
                                            </li>
                                            <li className="faq-item">
                                                <div className="faq-header">
                                                    <div className="faq-title">
                                                        5. Successful company referral conversion:
                                                        <span className="info-icon">
                                                            ?
                                                            <span className="info-tooltip">
                                                                Client you referred completed a profile.
                                                            </span>
                                                        </span>
                                                    </div>
                                                    <div className="faq-right">
                                                        <span className="points">500</span>
                                                        <span className="arrow-icon">
                                                            <i className="fas fa-chevron-right" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="faq-answer">
                                                    When someone you refer successfully creates a profile, you
                                                    get 500 points.
                                                </div>
                                            </li>
                                            <li className="faq-item">
                                                <div className="faq-header">
                                                    <div className="faq-title">
                                                        6. Resolve a complaint fairly and promptly
                                                    </div>
                                                    <div className="faq-right">
                                                        <span className="points">500</span>
                                                        <span className="arrow-icon">
                                                            <i className="fas fa-chevron-right" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="faq-answer">
                                                    If you respond to and resolve disputes well, you’ll earn
                                                    additional points.
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="earn-rward-pic">
                                        <img
                                            src={images.redeemPointImage}
                                            alt=""
                                            className=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="dash-profile-sec dash-profile-share-feedback">
                            <div>
                                <div className="main-profile-sec">
                                    <h3 className='my-2 fw-500'>Share Your Feedback</h3>
                                    <ul>
                                        <li className="divider" />
                                    </ul>
                                </div>
                            </div>
                            <div id="feedback-slider">
                                <Splide
                                    options={{
                                        type: "loop",
                                        perPage: 3,
                                        perMove: 1,
                                        gap: "1rem",
                                        autoplay: true,
                                        interval: 3000,
                                        breakpoints: {
                                            1024: { perPage: 3 },
                                            768: { perPage: 1 },
                                        },
                                        pagination: false,
                                        arrows: false,
                                    }}
                                    aria-label="Feedback Options"
                                >


                                    <SplideSlide>
                                        <div className="feedback-card">
                                            <div className="icon">
                                                <i className="fa-regular fa-star dash-feed-icon" />
                                            </div>
                                            <h5>Leave Your Website Feedback</h5>
                                            <p>
                                                Your opinion is important to us. Help us improve your online
                                                experience.
                                            </p>
                                            <a href="#" className="btn-link"
                                                data-bs-toggle="modal"
                                                data-bs-target="#feedbackModal">
                                                Submit feedback <i className="fas fa-arrow-right" />
                                            </a>
                                        </div>
                                    </SplideSlide>


                                    <SplideSlide>
                                        <div className="feedback-card">
                                            <div className="icon">
                                                <i className="fa-regular fa-comment-dots dash-feed-icon" />
                                            </div>
                                            <h5>Get In Touch</h5>
                                            <p>
                                                Need answers? Here are the most convenient ways to contact us.
                                            </p>
                                            <a href="#" className="btn-link"
                                                data-bs-toggle="modal"
                                                data-bs-target="#touchModal">
                                                Contact us <i className="fas fa-arrow-right" />
                                            </a>
                                        </div>
                                    </SplideSlide>


                                    <SplideSlide>
                                        <div className="feedback-card">
                                            <div className="icon">
                                                <i className="fas fa-triangle-exclamation dash-feed-icon" />
                                            </div>
                                            <h5>Raise A Concern</h5>
                                            <p>
                                                If you've had a less than satisfying experience, we’d like to hear from you.
                                            </p>
                                            <a href="#" className="btn-link"
                                                data-bs-toggle="modal"
                                                data-bs-target="#concernModal">
                                                Submit a complaint <i className="fas fa-arrow-right" />
                                            </a>
                                        </div>
                                    </SplideSlide>
                                </Splide>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className=" modal fade" id="touchModal" tabindex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content p-4">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h5 className="modal-title fw-semibold text-black fz-24">
                                        Get in Touch
                                    </h5>
                                    <button
                                        type="button"
                                        className=" nw-achar-btn"
                                        data-bs-dismiss="modal"
                                    >
                                        <i className='fas fa-close'></i>
                                    </button>
                                </div>
                                <div className='modal-body business-progress-form px-0'>
                                    <form onSubmit={(e) => handleSubmit(e, 'get-in-touch')}>
                                        <div className="custom-frm-bx">
                                            <label>
                                                Name <span className='start-icon'>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter your name"
                                                name='firstName'
                                                required
                                                value={formData.firstName}
                                                onChange={handleModalChange}
                                            />
                                        </div>

                                        <div className="custom-frm-bx">
                                            <label>
                                                Email <span className='start-icon'>*</span>
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter your email"
                                                name='email'
                                                required
                                                value={formData.email}
                                                onChange={handleModalChange}
                                            />
                                        </div>
                                        <div className="custom-frm-bx">
                                            <label>
                                                Contact <span className='start-icon'>*</span>
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="789456879"
                                                name='contact'
                                                required
                                                value={formData.contact}
                                                onChange={handleModalChange}
                                            />
                                        </div>

                                        <div className="custom-frm-bx">
                                            <label>Message</label>
                                            <textarea
                                                className="form-control"
                                                defaultValue=""
                                                required
                                                name='message'
                                                value={formData.message}
                                                onChange={handleModalChange}
                                            />
                                        </div>

                                        <div className="custom-frm-bx">
                                            <p className='fw-500 text-black'>
                                                This site is protected by{" "}
                                                <a href="javascript:void(0);" className='nw-achar-btn'>reCAPTCHA</a> and the{" "}
                                                <a href="javascript:void(0);" className='nw-achar-btn'>Google Privacy Policy</a> and{" "}
                                                <a href="javascript:void(0);" className='nw-achar-btn'>Terms of Service</a> apply.
                                            </p>
                                        </div>

                                        <div className="business-submt-btn">
                                            <button className="thm-btn btn-next" type="submit">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" modal fade" id="concernModal" tabindex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content p-4">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h5 className="modal-title fw-semibold text-black">
                                        Raise a Concern
                                    </h5>
                                    <button
                                        type="button"
                                        className=" nw-achar-btn"
                                        data-bs-dismiss="modal"
                                    >
                                        <i className='fas fa-close'></i>
                                    </button>
                                </div>
                                <div className='modal-title'>

                                </div>
                                <div className='modal-body business-progress-form px-0'>
                                    <form onSubmit={(e) => handleSubmit(e, 'concern')}>
                                        <div className="custom-frm-bx">
                                            <label>
                                                Name <span className='start-icon'>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter your name"
                                                name='firstName'
                                                required
                                                value={formData.firstName}
                                                onChange={handleModalChange}
                                            />
                                        </div>

                                        <div className="custom-frm-bx">
                                            <label>
                                                Email <span className='start-icon'>*</span>
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter your email"
                                                name='email'
                                                required
                                                value={formData.email}
                                                onChange={handleModalChange}
                                            />
                                        </div>
                                        <div className="custom-frm-bx">
                                            <label>
                                                Contact <span className='start-icon'>*</span>
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Enter your email"
                                                name='contact'
                                                required
                                                value={formData.contact}
                                                onChange={handleModalChange}
                                            />
                                        </div>



                                        <div className="custom-frm-bx">
                                            <label>Message</label>
                                            <textarea
                                                className="form-control"
                                                defaultValue=""
                                                required
                                                name='message'
                                                value={formData.message}
                                                onChange={handleModalChange}
                                            />
                                        </div>

                                        <div className="custom-frm-bx">
                                            <p>
                                                This site is protected by{" "}
                                                <a href="javascript:void(0);" className='nw-achar-btn'>reCAPTCHA</a> and the{" "}
                                                <a href="javascript:void(0);" className='nw-achar-btn'>Google Privacy Policy</a> and{" "}
                                                <a href="javascript:void(0);" className='nw-achar-btn'>Terms of Service</a> apply.
                                            </p>
                                        </div>

                                        <div className="business-submt-btn">
                                            <button className="thm-btn mt-4 btn-next" type="submit">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" modal fade" id="feedbackModal" tabindex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content p-4">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h5 className="modal-title fw-semibold text-black">
                                        Share Your Feedback
                                    </h5>
                                    <button
                                        type="button"
                                        className=" nw-achar-btn"
                                        data-bs-dismiss="modal"
                                    >
                                        <i className='fas fa-close'></i>
                                    </button>
                                </div>
                                <div className='modal-title'>

                                </div>
                                <div className='modal-body business-progress-form px-0'>
                                    <form onSubmit={feedbackSubmit}>
                                        <div className="custom-frm-bx">
                                            <label>Message</label>
                                            <textarea
                                                className="form-control"
                                                defaultValue=""
                                                required
                                                value={feedbackMsg}
                                                onChange={(e) => setFeedbackMsg(e.target.value)}
                                            />
                                        </div>

                                        <div className="business-submt-btn">
                                            <button className="thm-btn mt-4 btn-next" type="submit">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="modal fade"
                id='confirmModal'
                tabIndex="-1"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content text-center p-4 rounded-3 border-0 shadow-sm">
                        <h2 className="fw-bold mb-3">Are you sure ?</h2>
                        {/* <p className="text-secondary mb-4">
                            To perform this action please log in or create a new account.
                        </p> */}
                        <div className='d-flex gap-4'>
                            <button
                                className="thm-btn nw-mb-thm-btn outline"

                                data-bs-dismiss="modal"

                            // onClick={() => setIsLogin(false)}
                            >
                                No, Cancel
                            </button>
                            <button
                                className="thm-btn nw-mb-thm-btn "
                                onClick={() => userActionProfile({ status: userData?.status === 'cdraft' ? 'live' : 'cdraft' })}

                            // onClick={() => setIsLogin(false)}
                            >
                                Yes, Proceed
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>}
        </>
    )
}

export default Dashboard
