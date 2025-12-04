import React, { useEffect, useRef, useState } from 'react'
import { getSecureApiData, postApiData, securePostData } from '../../services/api'
import { toast } from 'react-toastify'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useNavigate, Link } from 'react-router-dom';
import base_url from '../../baseUrl';
import images from '../../assets/images';
import { timeAgo } from '../../utils/staticData';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../redux/features/userSlice';
import { Modal } from 'bootstrap';

function ConsumerDashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userId = localStorage.getItem('userId')
    const [feedbackMsg, setFeedbackMsg] = useState('')
    const [profileViews, setProfileViews] = useState([])
    const [trustedReferences, setTrustedReferences] = useState([])
    const [bookmarkData, setBookMarkData] = useState([])
    const [recommendedData, setRecommendedData] = useState([])
    const [upgradeMembership, setUpgradeMembership] = useState([])
    const [myChat, setMyChat] = useState([])
    const [totalOpen,setTotalOpen]=useState(0)
    const [feedbacks, setFeedbacks] = useState([])
    const [givenRating, setGivenRating] = useState([])
    
    const [formData, setFormData] = useState({ firstName: "", email: "", message: "", contact: "", type: "", userId })
    const { membershipData, profileData } = useSelector(state => state.user)
    useEffect(() => {
        if (!userId) {
            navigate('/login')
        }
    }, [userId, navigate])
    useEffect(() => {
        if (userId) {
            dispatch(fetchUserData())
        }
    }, [userId])
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
    async function getFeedback() {
        try {
            const result = await getSecureApiData(`api/users/my-given-feedback/${userId}`)
            if (result.status) {
                setFeedbacks(result.data)
                // setTotal(result.pagination.totalPages)

            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function getGivenRating() {
        try {
            const result = await getSecureApiData(`api/users/rating-given/${userId}?page=1`)
            if (result.success) {
                setGivenRating(result.recommendedData)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function getMembershipData() {
        try {
            const result = await getSecureApiData('get-membership?type=consumer')
            if (result.status) {
                const membership = result.membershipData.find(item => item.topChoice === true)
                const downmembership = result.membershipData.find(item => item.topChoice === false)

                setUpgradeMembership(membership)
            }
        } catch (error) {
            console.error('Error fetching membership data:', error)
        }
    }
    async function getDispute() {
        try {
            const result = await getSecureApiData(`api/users/my-dispute/${userId}?page=1`)
            if (result.success) {
                setTotalOpen(result.pendingCount)

            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        getUserProfileViews()
        getBookmarkData()
        getTrustedRef()
        getRecommendedData()
        getBookmarkData()
        getMyChat()
        getFeedback()
        getGivenRating()
        getMembershipData()
        getDispute()
    }, [])
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
    const buyMembership = () => {
        sessionStorage.setItem('consumerMembership', true)
        navigate('/consumer-membership')
    }
    const profileRef = useRef(null);

    useEffect(() => {
        const splide = profileRef.current?.splide;
        const prevBtn = document.getElementById('prev');
        const nextBtn = document.getElementById('next');
        if (prevBtn && nextBtn && splide) {
            prevBtn.addEventListener('click', () => splide.go('<'));
            nextBtn.addEventListener('click', () => splide.go('>'));
        }
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
        formData.userId=userId
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
  
    return (
        <div className="main-section flex-grow-1 dash-board-second-main-section customer-dashboard-section ">
            <div className="row dash-profile-overflow  pt-4 mx-lg-2 mx-sm-0">
                <div className="customer-dash-heading my-2">
                    <h2 className='text-capitalize'>{profileData?.firstName}, Welcome to Wizbizla 👋</h2>
                </div>
                {membershipData && !membershipData?.membershipId?.topChoice &&
                    <div className="dash-profile-sec dash-profile-sec-web-logo premium-membership premium-upgrade mb-5">
                        <div className="main-profile-sec">
                            <h3>Receive personalized assistance from the Wizbizla team</h3>
                            <ul><li className="divider" /></ul>
                        </div>
                        <ul className="dash-your-profle-sec">
                            <li className="dash-profile-list">
                                {upgradeMembership?.price?.monthly} AED <sub>/ Per Month</sub>
                            </li>
                            <li>
                                <p className='text-white'>Perfect for busy professionals and expats seeking tailored support</p>
                            </li>
                            <li className="d-flex justify-content-start align-items-center py-4">
                                <button
                                    onClick={() => buyMembership()}
                                    className="btn btn-primary upgrade-btn"
                                >
                                    Upgrade Now
                                </button>
                            </li>
                        </ul>
                    </div>
                }
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="dash-profile-sec dash-profile-second-box customer-dashboard-card">
                        <div>
                            <div className="main-profile-sec">
                                <h3>{membershipData?.membershipId?.name}</h3>
                                <ul>
                                    <li className="divider second-line-divi" />
                                </ul>
                            </div>
                            <div>
                                <div className="customer-crd-bx-pic">
                                    <img src="/assets/images/dashboard-coin.png" alt="" />
                                    <h6>
                                        <b>2</b>/5 tokens used
                                    </h6>
                                    <p>
                                        Make the most of your Bespoke Concierge service! Use any
                                        remaining tokens or top up by (insert date) to stay ahead
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="dash-profile-sec dash-my-conversations dash-board-my-conversations">
                        <div>
                            <div className="main-profile-sec">
                                <h3>My Conversations</h3>
                                <ul>
                                    <li className="divider" />
                                </ul>
                            </div>
                            <div className="dash-board-overflow-conversations-bx px-4">
                                {myChat?.length > 0 ?
                                    myChat?.map((item, key) =>
                                        <div className="dash-board-usr-my-conver" key={key}>
                                            <Link to={`/consumer/chat?wiz=${item?.user?._id}`} className=" dash-online-sec">
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
                                        </div>) : 'No data'}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {profileViews?.length > 0 && <div className="row dash-profile-overflow mt-4">
                <div className="col-lg-12">
                    <div className="dash-profile-sec dash-slide-sec p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5>Recently Viewed Profiles</h5>
                            <div className="d-flex align-items-center gap-2">
                                <div id="custom-arrows" className="d-flex gap-2">
                                    <button className="btn-outline-secondary btn-sm" style={{ color: "#4F40FF" }} id="prev">
                                        <i class="fa-solid fa-chevron-left"></i>

                                    </button>
                                    <button className="btn-outline-secondary btn-sm" id="next">
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
                                                    src={item?.viewerProfile?.profileImage ? `${base_url}/${item?.viewerProfile?.profileImage}` : '/assets/images/dash-slider-fours.png'}
                                                    alt={item?.viewUserId?.firstName}
                                                    className="mx-auto"
                                                    style={{ width: '265px', height: '265px' }}
                                                />
                                            </div>
                                            <div className="dash-slide-content mt-3 text-capitalize">
                                                <h6 className="mb-0 fw-bold">{item?.viewUserId?.firstName} {item?.viewUserId?.lastName}</h6>
                                                <h4 className="text-primary">{item?.viewerProfile?.title}</h4>
                                                <small className="text-muted">{item?.viewerProfile?.company}</small>
                                            </div>
                                        </Link>
                                    </SplideSlide>
                                ))}
                            </Splide>
                        </div>
                    </div>
                </div>
            </div>}
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
                                                data-bs-target="#business-tabs-01"
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
                                                data-bs-target="#business-tabs-02"
                                                type="button"
                                                role="tab"
                                            >
                                                Wizbizla Blog
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
                                        id="business-tabs-01"
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
                                                        gap: '1rem',
                                                    }}
                                                    aria-label="Custom Profile Slider"
                                                >
                                                    {bookmarkData?.length > 0 &&
                                                        bookmarkData?.map((item, key) =>
                                                            <SplideSlide key={key}>
                                                                <div className="custom-profile-card">
                                                                    <div className="profile-image mb-3">
                                                                        <img src={item?.profile?.isDefaultBanner ? `${base_url}/${item?.profile?.categories[0].category.image}` : `${base_url}/${item?.profile?.bannerImage}`} alt="Banner"
                                                                            style={{ width: '470px', height: '170px', objectFit: 'cover' }} />
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
                                        className="tab-pane fade "
                                        id="business-tabs-02"
                                        role="tabpanel"
                                    ></div>
                                    <div
                                        className="tab-pane fade"
                                        id="business-tabs-03"
                                        role="tabpanel"
                                    >
                                        <div className="">
                                            <p>You have not added any bookmarks yet.</p>
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
                                <div className="d-flex align-items-center justify-content-between">
                                    <h3>Reference Requests</h3>
                                    <a href="javascript:void(0)">
                                        <i className="fa-solid fa-ellipsis-vertical" />
                                    </a>
                                </div>
                                <ul>
                                    <li className="divider" />
                                </ul>
                            </div>
                            <div className="dash-board-overflow-conversations-bx dash-profile-list-second flex-column px-4">
                                <div className="dash-board-usr-my-conver custom-reference-requests-crd">
                                    <div className=" dash-online-sec">
                                        <div className="dash-user-details custmr-user-details d-flex justify-content-between align-items-center">
                                            <h5 className="">Widget Title</h5>
                                            <h6>Designation 1</h6>
                                        </div>
                                    </div>
                                    <div className="customr-crd-content">
                                        <span>Use Case 1</span>
                                        <p>
                                            Description: Lorem ipsum dolor sit amet, consectetur
                                            adipiscing elit.
                                        </p>
                                    </div>
                                    <div className="customr-crd-content">
                                        <span>Use Case 1</span>
                                        <p>
                                            Description: Lorem ipsum dolor sit amet, consectetur
                                            adipiscing elit.
                                        </p>
                                    </div>
                                </div>
                                <div className="dash-board-usr-my-conver custom-reference-requests-crd">
                                    <div className=" dash-online-sec">
                                        <div className="dash-user-details custmr-user-details d-flex justify-content-between align-items-center">
                                            <h5 className="">Widget Title</h5>
                                            <h6>Designation 1</h6>
                                        </div>
                                    </div>
                                    <div className="customr-crd-content">
                                        <span>Use Case 1</span>
                                        <p>
                                            Description: Lorem ipsum dolor sit amet, consectetur
                                            adipiscing elit.
                                        </p>
                                    </div>
                                    <div className="customr-crd-content">
                                        <span>Use Case 1</span>
                                        <p>
                                            Description: Lorem ipsum dolor sit amet, consectetur
                                            adipiscing elit.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row dash-profile-overflow dash-sub-box mt-4">
                        <div className="dash-profile-sec dash-profile-my-promotions p-0">
                            <div>
                                <div className="main-profile-sec">
                                    <h3>Rating Given</h3>
                                    <ul>
                                        <li className="divider" />
                                    </ul>
                                </div>
                                <Splide
                                    options={{
                                        type: "loop",
                                        perPage: 1.5,
                                        perMove: 1,
                                        gap: "1rem",
                                        autoplay: true,
                                        interval: 3000,
                                        breakpoints: {
                                            1024: { perPage: 1.5 },
                                            768: { perPage: 1 },
                                        },
                                        pagination: false,
                                        arrows: false,
                                    }}
                                    aria-label="Feedback Options"
                                >


                                    {givenRating?.length > 0 &&
                                        givenRating?.map((item, key) =>
                                            <SplideSlide key={key}>
                                                <div className="feedback-card d-flex gap-2">
                                                    <div className="icon">
                                                        <img src={`${base_url}/${item?.profile?.profileImage}`} width={50} style={{borderRadius:'100%',height:'50px'}}/>
                                                    </div>
                                                    <div>

                                                    <h5>{item?.recommendedUser?.firstName} {item?.recommendedUser?.lastName}</h5>
                                                    <p>
                                                        {item?.profile?.idealClientProfile}
                                                    </p>
                                                    </div>
                                                    {/* <a href="#" className="btn-link">
                                                        Submit feedback <i className="fas fa-arrow-right" />
                                                    </a> */}
                                                </div>
                                            </SplideSlide>)}

                                </Splide>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="dash-profile-sec dash-my-conversations-thrd dash-board-my-conversations">
                        <div>
                            <div className="main-profile-sec">
                                <h3>My Feedback</h3>
                                <ul>
                                    <li className="divider" />
                                </ul>
                            </div>
                            <div className="dash-board-overflow-conversations-bx dash-board-overflow-conversations-bx-second px-4">
                                <div className="dash-profile-list custmr-dash-profile-list">
                                    <div className=" dash-online-sec">
                                        <div className="dash-user-details">
                                            <h5 className="">Your Feedback Matters:</h5>
                                        </div>
                                    </div>
                                    <p>
                                        Your Feedback Matters: Rest assured, your feedback will remain
                                        confidential and will not be shared directly with the service
                                        provider. Instead, it will contribute to an overall rating
                                        that helps other customers get a general sense of the
                                        provider’s performance. All information is securely stored in
                                        line with Wizbizla’s privacy policy.
                                    </p>
                                </div>
                                {feedbacks?.length > 0 ?
                                    feedbacks?.slice(0, 5)?.map((item, key) =>
                                        <div className="dash-profile-list custmr-dash-profile-list" key={key}>
                                            <div className=" dash-online-sec">
                                                <div className="dash-online-usr-image custmr-dash-online-usr-image ">
                                                    <img src={item?.profile?.profileImage ? `${base_url}/${item?.profile.profileImage}` : "/assets/images/nation-dash-board.png"} alt="" />
                                                </div>
                                                <div className="dash-user-details">
                                                    <h5 className="">{item?.feedbackUser?.firstName} {item?.feedbackUser?.lastName}</h5>
                                                    <h6>{new Date(item?.createdAt).toLocaleDateString('en-GB', {                                                                                        day: '2-digit',                                                                                        month: '2-digit',                                                                                        year: 'numeric'                                                                                    })}</h6>
                                                </div>
                                            </div>
                                            <p>
                                                {item?.feedback}
                                            </p>
                                        </div>) : 'No Data'}

                            </div>
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
                                    <h3>My Disputes</h3>
                                    <a href="javascript:void(0)">
                                        <i className="fa-solid fa-ellipsis-vertical" />
                                    </a>
                                </div>
                                <ul>
                                    <li className="divider" />
                                </ul>
                            </div>
                            <ul className="dash-your-profle-sec">
                                <li className="dash-profile-list dash-board-text">
                                    Open Disputes
                                    <span>{totalOpen}</span>
                                </li>
                                <li className="dash-profile-list dash-board-text customer-disputes-btn">
                                    <Link href="/consumer/service"  className="customer-report-btn">
                                        Report a Service Provider
                                    </Link>
                                    <Link
                                        to="/consumer/service"
                                        className="customer-report-btn customer-report-out-line"
                                    >
                                        View Open Disputes
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="dash-profile-sec dash-profile-service-link">
                        <div>
                            <div className="main-profile-sec">
                                <h3>Resources – Quick Links</h3>
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
                                            to="/report-scam"
                                            className="navigation-menu-link locaylti-ward"
                                        >
                                            <i className="fa-solid fa-link me-2" />
                                            Report a Scam
                                        </Link>
                                    </li>
                                    <li className="navigation-menu-item">
                                        <Link
                                            to="/consumer/service"
                                            className="navigation-menu-link locaylti-ward"
                                        >
                                            <i className="fa-solid fa-link me-2" />
                                            Request a Bespoke Concierge Service
                                        </Link>
                                    </li>
                                    <li className="navigation-menu-item">
                                        <Link
                                            to="/consumer/service"
                                            className="navigation-menu-link locaylti-ward"
                                        >
                                            <i className="fa-solid fa-link me-2" />
                                            Request a Customized Due Diligence Service
                                        </Link>
                                    </li>
                                    <li className="navigation-menu-item">
                                        <Link
                                            to="/podcast"
                                            className="navigation-menu-link locaylti-ward"
                                        >
                                            <i className="fa-solid fa-link me-2" />
                                            Guest feature on Expats in Dubai Podcast
                                        </Link>
                                    </li>
                                    <li className="navigation-menu-item">
                                        <Link
                                            to="/faq"
                                            className="navigation-menu-link locaylti-ward"
                                        >
                                            <i className="fa-solid fa-link me-2" />
                                            FAQs
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="dash-profile-sec dash-profile-share-feedback">
                        <div>
                            <div className="main-profile-sec">
                                <h3>Share Your Feedback</h3>
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
                                        <button className="btn-link"
                                            data-bs-toggle="modal"
                                            data-bs-target="#feedbackModal">
                                            Submit feedback <i className="fas fa-arrow-right" />
                                        </button>
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
                                        <a href="#" data-bs-toggle="modal"
                                            data-bs-target="#touchModal" className="btn-link">
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
                                        <a href="#" className="btn-link" data-bs-toggle="modal"
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

    )
}

export default ConsumerDashboard

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