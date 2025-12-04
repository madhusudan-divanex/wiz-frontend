import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { getSecureApiData, securePostData, getApiData } from '../../services/api'
import base_url from '../../baseUrl'
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { profiles } from '../../utils/staticData';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import FeedbackModal from './FeedBackModal';

function FindProfile() {
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name');
    const wiz = searchParams.get('wiz');
    const splideRef = useRef(null);
    const navigate = useNavigate()
    const viewer = localStorage.getItem('userId')
    const userId = searchParams.get('wiz')
    const [isBookmark, setIsBookmark] = useState(false)
    const [isRecommend, setIsRecommend] = useState(false)
    const [bannerPath, setBannerPath] = useState()
    const [profileData, setProfileData] = useState({})
    const [recomended, setRecomended] = useState(0)
    const [marketingData, setMarketingData] = useState({})
    const [businessData, setBusinessData] = useState({})
    const [featureData, setFeatureData] = useState({})
    const [membershipData, setMembershipData] = useState({})
    const [userData, setUserData] = useState({})
    const [viewerData, setViewerData] = useState({})
    const [bookmarkData, setBookMarkData] = useState([])
    const [connections, setConnections] = useState([])
    const [recommendedData, setRecommendedData] = useState([])
    const [trustedReferences, setTrustedReferences] = useState([])
    const [feedbackUsers, setFeedbackUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [showModal, setShowModal] = useState(false);
    const [isThank, setIsThank] = useState(false)
    const [isLogin, setIsLogin] = useState(false)

    async function getUserProfile() {
        try {
            const result = await getApiData(`api/provider/profile-get/${userId}`)
            if (result.status) {
                setRecomended(result.totalRecommend)
                setProfileData(result.data)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function getTrustedRef() {
        try {
            const result = await getSecureApiData(`api/provider/trusted-reference/${viewer}`)

            if (result.status) {
                setTrustedReferences(result.data)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function getUserFeature() {
        try {
            const result = await getSecureApiData(`api/provider/get-feature/${userId}?page=${currentPage}`)
            if (result.status) {
                setFeatureData(result.data)
                setTotalPage(result.pagination.totalPage)
                setConnections(result.data.connection)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function getUserBusiness() {
        try {
            const result = await getApiData(`api/provider/get-accreditation/${userId}`)
            if (result.status) {
                setBusinessData(result.data)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function getUserMarketing() {
        try {
            const result = await getApiData(`api/provider/get-marketing/${userId}`)
            if (result.status) {
                setMarketingData(result.data)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function getUserData() {
        try {
            const result = await getApiData(`api/users/${userId}`)
            if (result.success) {
                setUserData(result.user)
                setMembershipData(result.membershipData)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function getBookmarkData() {
        try {
            const result = await getSecureApiData(`api/users/bookmark/${viewer}`)
            if (result.success) {
                setBookMarkData(result.bookmarkData)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function getRecommendedData() {
        try {
            const result = await getSecureApiData(`api/users/recommended/${viewer}`)
            if (result.success) {
                setRecommendedData(result.recommendedData)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function getMyFeedbackBack() {
        try {
            const result = await getSecureApiData(`api/users/my-given-feedback/${viewer}`)
            if (result.status) {
                setFeedbackUsers(result.data)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function getViewerData() {
        try {
            const result = await getApiData(`api/users/${viewer}`)
            if (result.success) {
                setViewerData(result.user)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        if (!userId) {
            navigate(-1)
        } else {
            getViewerData()
            getUserMarketing()
            getUserProfile()
            getRecommendedData()
            getUserData()
            getUserFeature()
            getUserBusiness()
            getTrustedRef()
            getMyFeedbackBack()
        }
    }, [userId])
    useEffect(() => {
        const splide = splideRef.current?.splide;
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");

        if (splide && prevBtn && nextBtn) {
            prevBtn.addEventListener("click", () => splide.go("<"));
            nextBtn.addEventListener("click", () => splide.go(">"));
        }

        // cleanup listeners on unmount
        return () => {
            if (prevBtn) prevBtn.removeEventListener("click", () => splide.go("<"));
            if (nextBtn) nextBtn.removeEventListener("click", () => splide.go(">"));
        };
    }, []);

    useEffect(() => {
        if (Object.keys(profileData).length > 0) {
            const bPath = profileData?.isDefaultBanner ? profileData?.categories[0]?.category?.image : profileData?.bannerImage?.replace(/\\/g, '/'); // fix Windows backslashes
            setBannerPath(bPath)
        }
    }, [profileData])

    const bannerUrl = bannerPath?.startsWith('/')
        ? `${base_url}${bannerPath}`
        : `${base_url}/${bannerPath}`;

    async function viewProfile() {
        if (viewer == null || viewer == undefined) {
            return
        }
        const data = { userId: viewer, viewUserId: userId }
        try {
            const result = await securePostData('api/users/view-profile', data)

        } catch (error) {

        }
    }
    async function bookMarkProfile() {
        if (viewer == null || viewer == undefined) {
            return
        }
        if (userId == viewer) {
            return
        }
        const data = { userId: viewer, bookmarkUser: userId }
        try {
            const result = await securePostData('api/users/bookmark-profile', data)
            if (result.success) {

                getBookmarkData()
            }

        } catch (error) {

        }
    }
    async function recommendUserProfile() {
        if (viewer == null || viewer == undefined) {
            return
        }
        const data = { userId: viewer, recommendedUser: userId }
        try {
            const result = await securePostData('api/users/recommend-user', data)
            if (result.success) {
                getUserProfile()
                getRecommendedData()
            }

        } catch (error) {

        }
    }
    useEffect(() => {
        if (viewer) {
            getBookmarkData()
            viewProfile()
        }

    }, [viewer])
    useEffect(() => {
        if (bookmarkData && Array.isArray(bookmarkData)) {
            const isUserBookmarked = bookmarkData.some(
                (item) => item.bookmarkUser === userId
            );
            setIsBookmark(isUserBookmarked);
        }
        if (recommendedData && Array.isArray(recommendedData)) {
            const isUserRecommended = recommendedData.some(
                (item) => item.recommendedUser === userId
            );
            setIsRecommend(isUserRecommended);
        }
    }, [bookmarkData, userId, recommendedData]);

    useEffect(() => {
        getUserFeature()
    }, [currentPage])

    async function handleTrustedRef() {
        if (viewer == null || viewer == undefined) {
            setIsLogin(true)
            return
        }
        if (userId == viewer) {
            return
        }
        const data = { referenceUser: userId, userId: viewer }
        try {
            const result = await securePostData(`api/provider/trusted-reference`, data)
            if (result.status) {
                getTrustedRef()
                setIsThank(true)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    return (
        <div className='newBnr' >
            <section
                key={bannerUrl}
                className="banner-sec business-main-sec business-preview-sec"
                style={{
                    backgroundImage: `url("${encodeURI(bannerUrl || '/assets/media/banner-bg.9341af13e329cd77f904.png')}")`,
                    // minHeight: '300px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="banner-innr"></div>
                        </div>
                        <div className="col-lg-6"></div>
                    </div>
                </div>
            </section>
            <section className="profile-section customer-pro-section pb-4 business-user-preview">
                <div className="container">
                    <div className=" profile-card text-center text-md-start py-4  ">
                        <div className="profile-image business-profile-pic me-md-4 mb-3 mb-md-0 res-mobile-none mt-3">
                            <img
                                src={profileData?.profileImage ? `${base_url}/${profileData?.profileImage}` : "/assets/images/profile-preview-img.png"}
                                alt="Profile"
                                className="rounded-circle border border-white"
                                style={{ objectFit: "cover", width: '220px', height: '220px' }}
                            />
                        </div>
                        <div>
                            <div className="d-flex justify-content-between align-items-center res-mobile-none">
                                <div className="wz-left-bx">
                                    <div className="user-verify mb-1">
                                        <h4 className="text-capitalize">{userData?.firstName} {userData?.lastName}</h4>
                                        <img src="/assets/images/verify-uers.png" alt="verified" style={{ width: '32px', height: '32px' }} />
                                    </div>
                                    <div className="">
                                        <span>
                                            <img src="/assets/images/anyday.png" alt="" width="36px" />{" "}
                                            {profileData?.company}
                                        </span>
                                    </div>
                                    <div className="text-muted business-client-dta d-flex align-items-center  gap-3 mt-2">
                                        <a href="javascript:void(0)" className={`verify-user-btn ${membershipData?.membershipId?.topChoice && 'verify-user-btn-glod'}  `}>
                                            <i className="fa-regular fa-gem" />
                                            {membershipData?.membershipId?.name}
                                        </a>
                                        <h6 className="mb-0 text-muted">{profileData?.title}</h6>
                                    </div>
                                </div>
                                <div className="res-mobile-none">
                                    <div className="text-muted business-client-dta client-custmr-dta text-end">
                                        {featureData?.recommendations && <p>
                                            {isRecommend ?
                                                <i className="fa-solid fa-thumbs-up" onClick={() => recommendUserProfile()}> </i>
                                                : <i className="fa-regular fa-thumbs-up" onClick={() => recommendUserProfile()}> </i>} {recomended} Recommendations
                                        </p>}
                                        <div className='d-flex gap-3 align-items-center'>
                                            {!feedbackUsers?.some(item => item.feedbackUser._id == userId) && <div className='pr-pic-bx' onClick={() => {
                                                if (userId) {
                                                    setShowModal(true)
                                                } else {
                                                    setIsLogin(true)
                                                }
                                            }}>
                                                <img src='/assets/images/msg-plus.png' width={30} />
                                            </div>}

                                            <span className='pr-pic-bx'>
                                                {" "}
                                                {isBookmark ?
                                                    <button onClick={() => bookMarkProfile()}>
                                                        <i className="fa-solid fa-bookmark fs-4" style={{ color: '#4F40FF', fontSize: '20px' }} />
                                                    </button>
                                                    : <button onClick={() => bookMarkProfile()}>
                                                        <i className="fa-regular fa-bookmark fs-4" style={{ color: '#4F40FF', fontSize: '20px' }} />
                                                    </button>}
                                            </span>
                                            {featureData?.chatShow && <div className="preview-bnner-btn-two">
                                                <Link to={`/${viewerData?.role === 'consumer' ? 'consumer' : 'provider'}/chat?name=${userData?.firstName}&wiz=${userId}`} className="pre-sv-btn pre-sv-btn-second">Chat</Link>
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mobile-res-sec">
                            <div className="mb-res-preview nw-res-mb">
                                <img
                                    src={profileData?.profileImage ? `${base_url}/${profileData?.profileImage}` : "/assets/images/profile-preview-img.png"}
                                    alt="Profile"
                                    className="rounded-circle border border-white"
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                            <div className="botm-res-rating mt-5">
                                <div className="user-verify mb-1">
                                    <h4 className="mb-0">{userData?.firstName} {userData?.lastName}</h4>
                                    <img src="/assets/images/verify-uers.png" alt="verified" />
                                </div>
                                <div className="">
                                    <span className="fs-6">
                                        <img src="/assets/images/anyday.png" alt="" width="30px" />{" "}
                                        {profileData?.company}
                                    </span>
                                </div>
                                <div className="business-client-dta mt-2 d-flex align-items-center gap-3">
                                    <a href="javascript:void(0)" className={`verify-user-btn ${membershipData?.membershipId?.topChoice && 'verify-user-btn-glod'}  `}>
                                        <i className="fa-regular fa-gem" />
                                        {membershipData?.membershipId?.name}
                                    </a>
                                    <h6 className="mb-0 text-muted">{profileData?.title}</h6>
                                </div>

                                <div className="text-muted business-client-dta client-custmr-dta mt-3">
                                    {featureData?.recommendations && <p>
                                        {isRecommend ?
                                            <i className="fa-solid fa-thumbs-up" onClick={() => recommendUserProfile()}> </i>
                                            : <i className="fa-regular fa-thumbs-up" onClick={() => recommendUserProfile()}> </i>} {recomended} Recommendations
                                    </p>}

                                    {/* <div className='d-flex align-items-center'>

                                        <span>
                                            {" "}
                                            <a href="javascript:void(0)">
                                                <i className="fa-regular fa-bookmark" />
                                            </a>
                                        </span>
                                        {featureData?.chatShow && <div className="preview-bnner-btn-two">
                                            <button className="pre-sv-btn pre-sv-btn-second pre-sv-btn-second-third w-100">
                                                Chat
                                            </button>
                                        </div>
                                        }
                                    </div> */}


                                    <div className='d-flex gap-3 align-items-center'>
                                        {featureData?.chatShow && <div className="preview-bnner-btn-two">
                                            <Link to={`/${viewerData.role === 'consumer' ? 'consumer' : 'provider'}/chat?wiz=${userId}`} className="pre-sv-btn pre-sv-btn-second">Chat</Link>
                                        </div>}

                                        {!feedbackUsers?.some(item => item?.feedbackUser?._id == userId) && <div className='pr-pic-bx' onClick={() => {
                                            if (userId) {
                                                setShowModal(true)
                                            } else {
                                                setIsLogin(true)
                                            }
                                        }}>
                                            <img src='/assets/images/msg-plus.png' width={30} />
                                        </div>}

                                        <span className='pr-pic-bx'>
                                            {" "}
                                            {isBookmark ?
                                                <button onClick={() => bookMarkProfile()}>
                                                    <i className="fa-solid fa-bookmark fs-4" style={{ color: '#4F40FF' }} />
                                                </button>
                                                : <button onClick={() => bookMarkProfile()}>
                                                    <i className="fa-regular fa-bookmark fs-4" style={{ color: '#4F40FF' }} />
                                                </button>}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* <div class="mb-res-contxt">
               <p><i class="fa-regular fa-thumbs-up"> </i> Recommended By: <br> <span>50 Users</span></p>
                <h6 class="mb-2 text-muted">UX UI Designer</h6>
          </div> */}
                        </div>
                    </div>
                </div>
            </section>
            <section className="my-4 customer-business-profile">
                <div className="container ">
                    <div className="row business-user-preview-box">
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="profile-right-main-box">
                                {membershipData?.membershipId?.topChoice &&
                                    !trustedReferences?.some(item => item.referenceUser == userId) && <div class="profile-btm-box">
                                        <div class="d-flex align-items-center gld-announ-content gap-2" onClick={() => handleTrustedRef()} style={{ cursor: 'pointer' }}>
                                            <img src="/assets/images/anno-gold.png" alt="/" />
                                            <h4 class="mb-0">Request a Trusted Reference</h4>


                                        </div>
                                    </div>}
                                {/* <div className="profile-btm-box">
                                    <h4 className="mb-0">Contact details</h4>
                                </div> */}
                                <div className="d-flex gap-2 profile-loca-box">
                                    <img src="/assets/images/profile-map.png" alt="" />
                                    <div className="profile-loc-content">
                                        <h5>Location</h5>
                                        <ul className="customr-addres-box">
                                            <li>{profileData?.location}</li>
                                        </ul>
                                    </div>
                                </div>
                                {businessData?.licenseCurrentlyActive &&
                                    <div className="d-flex flex-column gap-2 profile-loca-box">
                                        <div className='d-flex gap-2'>
                                            <img src="/assets/images/bill.png" alt="" />
                                            <div className="profile-loc-content">
                                                <h5>Accredited</h5>
                                            </div>
                                        </div>
                                        <ul className="customr-addres-box">
                                            <h6>UAE Trade License</h6>
                                            {/* <li>Active in</li> */}
                                            {businessData?.licenses?.length > 0 ?
                                                businessData?.licenses?.map((item, key) =>
                                                    <li key={key}><span className='clr'> Active </span>in {item?.licenseIssuedIn} </li>) : 'not applicable'}
                                        </ul>
                                    </div>}
                                <div className="d-flex gap-2 profile-loca-box">
                                    <div className="profile-loc-content">
                                        <h5>Regulated Professional Body:</h5>
                                        <ul className="customr-addres-box">
                                            {businessData?.professionalServices?.length > 0 ?
                                                businessData.professionalServices.some(
                                                    (item) => item?.regulatedProfession?.trim() !== ""
                                                ) && (
                                                    <li>
                                                        Active In{" "}
                                                        {businessData.professionalServices
                                                            .filter(item => item.displayOnProfile)
                                                            .map((item) => item?.regulatedProfession)
                                                            .filter(Boolean)
                                                            .join(", ")}
                                                    </li>
                                                ) : 'not applicable'}
                                        </ul>
                                    </div>
                                </div>

                                <div className="d-flex gap-2 profile-loca-box flex-column-reverse">
                                    <div className="profile-loc-content profile-nw-ceri">
                                        <h5>Certificates:</h5>
                                        <ul className="customr-addres-box cert pb-3">
                                            {businessData?.additionalCertificates?.length > 0 ? businessData?.additionalCertificates?.map((item, key) =>
                                                <li key={key}>
                                                    {item?.title}
                                                </li>)
                                                : 'No certificate available'}
                                            {/* <li>Final Examination- College of Law (Chester)</li> */}
                                        </ul>
                                    </div>
                                </div>
                                {/* <div className="d-flex gap-2 profile-loca-box">
                                    <img src="/assets/images/net.png" alt="" />
                                    <div className="profile-loc-content">
                                        <h5>Website</h5>
                                        <ul className="customr-addres-box">
                                            <li>
                                                <a href="javascript:void(0)">www.Loremisup.com</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div> */}
                                <div className="d-flex gap-2 profile-loca-box profile-nw-ceri py-2">
                                    <img src="/assets/images/users-02.svg" alt="" />
                                    <div className="profile-loc-content">
                                        <h5>My Connections</h5>
                                        <ul className="customr-addres-box">
                                            <li>
                                                <button
                                                    id="tab-btn-feedconnec"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#tab-content-connec"
                                                    type="button"
                                                    role="tab"
                                                    className="custmor-view-conne"
                                                >
                                                    View Connections
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="d-flex gap-2 profile-loca-box">
                                    <div className="profile-loc-content">
                                        <h5 className='mb-3'>My Introduction</h5>
                                        <div>
                                            {/* <iframe width="560" height="315" 
                                            src={marketingData?.videoIntro
                                                            ? `${base_url}${marketingData.videoIntro.startsWith('/') ? '' : '/'}${marketingData.videoIntro}`
                                                            : ''
                                                } frameborder="0" allowfullscreen></iframe> */}
                                            {marketingData && marketingData?.videoIntro ?
                                                <video controls className="profile-video">
                                                    <source
                                                        src={
                                                            marketingData?.videoIntro
                                                                ? `${base_url}${marketingData?.videoIntro.startsWith('/') ? '' : '/'}${marketingData?.videoIntro}`
                                                                : ''
                                                        }
                                                        type="video/mp4"
                                                    />
                                                </video>
                                                : 'No video available'}

                                            {/* <img
                                                src="/assets/images/custom-video.png"
                                                alt=""
                                                className="w-100 h-100"
                                            /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-6 col-sm-12">
                            <div className="profile-left-main-box">
                                <ul
                                    className="nav nav-tabs custom-tabs w-100"
                                    id="tabNavigation"
                                    role="tablist"
                                >
                                    {/* Static Tabs */}
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link active"
                                            id="tab-btn-profile"
                                            data-bs-toggle="tab"
                                            data-bs-target="#tab-content-profile"
                                            type="button"
                                            role="tab"
                                        >
                                            Profile
                                        </button>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="tab-btn-feedback"
                                            data-bs-toggle="tab"
                                            data-bs-target="#tab-content-feedback"
                                            type="button"
                                            role="tab"
                                        >
                                            Experience
                                        </button>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="tab-btn-expert"
                                            data-bs-toggle="tab"
                                            data-bs-target="#tab-content-expert"
                                            type="button"
                                            role="tab"
                                        >
                                            Expertise
                                        </button>
                                    </li>

                                    {profileData?.type === 'restaurant' && (
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className="nav-link"
                                                id="tab-btn-restaurant"
                                                data-bs-toggle="tab"
                                                data-bs-target="#tab-content-restaurant"
                                                type="button"
                                                role="tab"
                                            >
                                                Menu
                                            </button>
                                        </li>
                                    )}
                                    {marketingData?.additionalSections
                                        ?.filter(sec => sec.type === 'gallery')
                                        ?.map((item, key) => (
                                            <li className="nav-item" role="presentation" key={key}>
                                                <button
                                                    className="nav-link"
                                                    id={`tab-btn-feedgallery-${key}`}
                                                    data-bs-toggle="tab"
                                                    data-bs-target={`#tab-content-gallery-${key}`}
                                                    type="button"
                                                    role="tab"
                                                >
                                                    {item?.title}
                                                </button>
                                            </li>))}

                                    {/* ✅ Dynamically Generated Tabs */}
                                    {marketingData?.additionalSections
                                        ?.filter(sec => sec.type === 'text')
                                        ?.map((item, key) => (
                                            <li className="nav-item" role="presentation" key={key}>
                                                <button
                                                    className="nav-link text-capitalize"
                                                    id={`tab-btn-other-${key}`}
                                                    data-bs-toggle="tab"
                                                    data-bs-target={`#tab-content-other-${key}`}
                                                    type="button"
                                                    role="tab"
                                                >
                                                    {item?.title}
                                                </button>
                                            </li>
                                        ))}

                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="tab-btn-feedconnec"
                                            data-bs-toggle="tab"
                                            data-bs-target="#tab-content-connec"
                                            type="button"
                                            role="tab"
                                        >
                                            Connections
                                        </button>
                                    </li>
                                </ul>

                                <div
                                    className="tab-content tab-content-area"
                                    id="tabContentContainer"
                                >
                                    {/* Profile Tab */}
                                    <div
                                        className="tab-pane fade show active"
                                        id="tab-content-profile"
                                        role="tabpanel"
                                    >
                                        <h4 className="my-4">Profile</h4>
                                        <p className="text-break">{profileData?.avatar}</p>

                                        <h4 className="mt-5">Target Audience</h4>
                                        <p>{profileData?.idealClientProfile}</p>

                                        {/* Categories Section */}
                                        <section className="category-provider tp-space-scond">
                                            <div className="container">
                                                <h4 className="text-start mb-3">Categories</h4>
                                                <ul className="category-list justify-content-start">
                                                    {profileData?.categories?.map((item, key) => (
                                                        <li className="category-item category-custm-second" key={key}>
                                                            <div className="category-card">
                                                                <span className="border-shape shape-01" />
                                                                <span className="border-shape shape-02" />
                                                                <span className="border-shape shape-03" />
                                                                <span className="border-shape shape-04" />
                                                                <div className="category-card-innr category-card-innr-secnd">
                                                                    <img
                                                                        style={{ width: "36px", height: "36px" }}
                                                                        src={`${base_url}/${item?.category?.icon}`}
                                                                        alt=""
                                                                    />
                                                                    <a href="javascript:void(0);">{item?.category?.name}</a>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </section>

                                        {/* Services Section */}
                                        <section className="category-provider tp-space-scond">
                                            <div className="container">
                                                <h4 className="text-start mb-3">My Services</h4>
                                                <ul className="category-list justify-content-start">
                                                    {profileData?.categories?.map((item, i) =>
                                                        item?.service?.map((cat, j) => (
                                                            <li
                                                                className="category-item custmor-category-three nw-category-item"
                                                                key={`${i}-${j}`}
                                                            >
                                                                <div className="category-card">
                                                                    <span className="border-shape shape-01" />
                                                                    <span className="border-shape shape-02" />
                                                                    <span className="border-shape shape-03" />
                                                                    <span className="border-shape shape-04" />
                                                                    <div className="category-card-innr category-card-innr-secnd">
                                                                        <a href="#">{cat?.name}</a>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))
                                                    )}
                                                </ul>
                                            </div>
                                        </section>
                                    </div>

                                    {/* Expertise */}
                                    <div className="tab-pane fade" id="tab-content-expert" role="tabpanel">
                                        <div
                                            className="editor-content my-4"
                                            dangerouslySetInnerHTML={{ __html: marketingData?.expertise }}
                                        ></div>
                                    </div>

                                    {/* Experience */}
                                    <div className="tab-pane fade" id="tab-content-feedback" role="tabpanel">
                                        <div
                                            className="editor-content my-4"
                                            dangerouslySetInnerHTML={{ __html: marketingData?.experience }}
                                        ></div>
                                    </div>

                                    {/* Gallery */}
                                    {marketingData?.additionalSections
                                        ?.filter(sec => sec.type === "gallery")
                                        ?.map((item, key) => (
                                            <div key={key} className="tab-pane fade" id={`tab-content-gallery-${key}`} role="tabpanel">
                                                {/* <h4 className="my-4">Gallery</h4> */}
                                                <div className="row">
                                                    {item?.galleryImages?.map((con, i) => (
                                                        <div className="col-lg-4 col-md-4 col-sm-12 mt-2" key={i}>
                                                            <div className="customr-gallery">
                                                                <img
                                                                    src={`${base_url}/${con}` || "/assets/images/customr-gallary.jpg"}
                                                                    alt=""
                                                                    style={{minHeight:'250px'}}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}

                                    {/* Restaurant Menu */}
                                    {profileData?.type === "restaurant" && (
                                        <div className="tab-pane fade" id="tab-content-restaurant" role="tabpanel">
                                            <h4 className="my-4">Menu</h4>
                                            <div className="row">
                                                <div className="mt-2">
                                                    <div className="customr-gallery">
                                                        {marketingData?.menu ? (
                                                            marketingData.menu.endsWith(".pdf") ? (
                                                                <iframe
                                                                    src={`${base_url}/${marketingData.menu}`}
                                                                    width="100%"
                                                                    height="400px"
                                                                    title="PDF Preview"
                                                                    style={{ border: "1px solid #ccc" }}
                                                                ></iframe>
                                                            ) : (
                                                                <img
                                                                    src={`${base_url}/${marketingData.menu}`}
                                                                    alt="Marketing Material"
                                                                    style={{ maxHeight: "400px", maxWidth: "400px" }}
                                                                />
                                                            )
                                                        ) : (
                                                            "No Data"
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Dynamically Added Text Sections */}
                                    {marketingData?.additionalSections
                                        ?.filter(sec => sec.type === "text")
                                        ?.map((item, key) => (
                                            <div
                                                key={key}
                                                className="tab-pane fade"
                                                id={`tab-content-other-${key}`}
                                                role="tabpanel"
                                            >
                                                <h4 className="my-4">{item?.title}</h4>
                                                <div
                                                    className="editor-content"
                                                    dangerouslySetInnerHTML={{ __html: item?.content }}
                                                ></div>
                                            </div>
                                        ))}

                                    <div
                                        className="tab-pane fade"
                                        id="tab-content-connec"
                                        role="tabpanel"
                                    >
                                        <div className="row business-user-preview-box">
                                            <div className="col-lg-12">
                                                <div className="dash-slide-sec p-4">
                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                        <h5 className=''>Connections</h5>
                                                        {totalPage > 1 && <div>
                                                            <button disabled={currentPage == 1} onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}><i className='fas fa-chevron-left' style={{ color: '#4F40FF' }} /></button>
                                                            <button disabled={currentPage == totalPage} onClick={() => currentPage > totalPage && setCurrentPage(currentPage + 1)}><i className='fas fa-chevron-right' style={{ color: '#4F40FF' }} /></button>
                                                        </div>}
                                                    </div>
                                                    <div className="row g-3">
                                                        {connections?.length > 0 &&
                                                            connections?.map((item, key) =>
                                                                <div className="col-md-4 col-sm-6" key={key}>
                                                                    <div className="card text-center border-0">
                                                                        <div className="dash-slider-bx">
                                                                            <img
                                                                                src={item?.profileData?.profileImage ? `${base_url}/${item?.profileData?.profileImage}` : '/assets/images/dash-slider-fours.png'}
                                                                                alt={item?.firstName}
                                                                                style={{ width: '265px', height: '265px' }}
                                                                                className="mx-auto"
                                                                            />
                                                                        </div>
                                                                        <div className="dash-slide-content mt-3">
                                                                            <h6 className="mb-0 fw-bold">{item?.firstName} {item?.lastName}</h6>
                                                                            <h4 className="text-primary">
                                                                                {item?.profileData?.title}
                                                                            </h4>
                                                                            <small className="text-muted">{item?.profileData?.company}</small>
                                                                        </div>
                                                                    </div>
                                                                </div>)}

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
            </section>
            <section className="portfolio-section  tp-space-scond">
                <div className="container">
                    <h2 className="text-white"> Portfolio</h2>
                    {marketingData?.thoughtLeadershipPortfolio?.length > 0 ?
                        <div id="portfolio-slider" className="splide">
                            <Splide
                                ref={splideRef}
                                options={{
                                    type: 'loop',
                                    perPage: 4,
                                    autoPlay: true,
                                    perMove: 1,
                                    arrows: true,
                                    pagination: false,
                                    gap: '1rem',
                                    breakpoints: {
                                        768: { perPage: 1 },
                                        1024: { perPage: 2 },
                                        1440: { perPage: 4 },
                                    },
                                }}
                                aria-label="Profile Slider"
                            >
                                {marketingData?.thoughtLeadershipPortfolio?.map((item, index) => (
                                    <SplideSlide key={index}>
                                        <div className="portfolio-card">
                                            <img src={item?.imageUrl ? `${base_url}/${item?.imageUrl}` : '/assets/images/dash-slider-fours.png'}
                                                alt={item?.userId?.firstName} className="mx-auto"
                                                style={{ width: '250px', height: '224px' }} />
                                            <a href={item?.contentLink} className="arward-btn" target='_blank'>
                                                {item?.tagLabel}
                                            </a>

                                        </div>
                                    </SplideSlide>
                                ))}
                            </Splide>

                        </div> : <span className='text-black'> not applicable</span>}
                </div>
            </section>


            <FeedbackModal show={showModal} onClose={() => setShowModal(false)} feedbackUser={userId} />
            <div
                className={`poup-sec-box modal fade ${isThank ? "show d-block" : ""}`}
                tabIndex="-1"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
                <div className="modal-dialog modal-dialog-centered modal-md z-3" style={{ maxWidth: "600px" }}>
                    <div className="modal-content text-center p-5 rounded-3 border-0 z-3">
                        <div className='model-body pay-shape'>
                            <h1 className="fw-bold mb-3">Thank You!</h1>
                            <p className="text-secondary pb-4">
                                Your request has been received. A member of the Wizbizla team will
                                contact you shortly.
                            </p>
                            <button
                                type="button"
                                className="thm-btn w-100"
                                onClick={() => setIsThank(false)}
                            >
                                Okay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`poup-sec-box modal fade ${isLogin ? "show d-block" : ""}`}
                tabIndex="-1"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
                <div className=" modal-dialog modal-dialog-centered modal-md z-3" style={{ maxWidth: "600px" }}>
                    <div className="modal-content  text-center p-5 rounded-3 border-0 z-3">
                        <div className='model-body pay-shape'>

                            <h1 className="fw-bold mb-3 title ">Request a Trusted Reference – {userData?.firstName} {userData?.lastName}</h1>
                            <p className="text-secondary mb-4 fz-16">
                                To perform this action please log in or create a new account.
                            </p>
                            <div className='d-flex gap-4'>
                                <Link
                                    to="/login"
                                    className="thm-btn outline w-50 bg-white fnd-hovr"
                                    state={{ color: "#4F40FF" }}

                                    onClick={() => setIsLogin(false)}
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/"
                                    className="thm-btn w-50"
                                    onClick={() => setIsLogin(false)}
                                >
                                    SignUp
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            {/* <div
                            className="popup-bg-sec-shape poup-sec-box modal fade "
                            id="edit-Inventory"
                           
                            tabIndex={-1}
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                            data-bs-backdrop="static"
                            data-bs-keyboard="false"

                        >
                            <div className="modal-dialog modal-dialog-centered z-3">
                                <div className="modal-content text-center z-3">
                                    <div className="modal-body pay-shape py-5">

                                        <div className="" id="popupBox">                                            <h3>Thank you for your purchase</h3>                                          
                                                
                                                    <p>
                                                        <span>Membership Tier: </span> Signature and Loyalty Rewards 

                                                        Programme
                                                    </p>
                                                    <p>
                                                        <span>Add-ons: </span> Reference Program
                                                    </p>
                                                    <div className="new-pass-btn popup-btn">
                                                        <button
                                                            id="closePopup"
                                                            data-bs-dismiss="modal"
                                                            className="btn"
                                                            style={{ marginTop: 15 }}
                                                        >
                                                           This
                                                        </button>
                                                    </div>
                                                
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div> */}


        </div>


    )
}

export default FindProfile
