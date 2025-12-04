import React, { useEffect, useState } from 'react'
import images from '../../assets/images'
import { getSecureApiData, securePostData } from '../../services/api'
import { toast } from 'react-toastify'
import base_url from '../../baseUrl'
import { Link } from 'react-router-dom'

function ConsumerBookmark() {
    const userId = localStorage.getItem('userId')
    const [showAll, setShowAll] = useState(false);
    const [scamShowAll, setScamShowAll] = useState(false);
    const [isData, setIsData] = useState(true)
    const [isScam, setIsScam] = useState(true)
    const [recommendedData, setRecommendedData] = useState([])
    const [bookmarkData, setBookMarkData] = useState([])
    const [trustedReferences, setTrustedReferences] = useState([])
    const [scamBookmark, setScamBookmark] = useState([])
    async function getBookmarkData() {
        try {
            const result = await getSecureApiData(`api/users/bookmark/${userId}?type=provider`)
            if (result.success) {
                if (result?.bookmarkData.length == 0) {
                    setIsData(false)
                } else {

                    setBookMarkData(result.bookmarkData)
                }
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function getScamBookmarkData() {
        try {
            const result = await getSecureApiData(`api/users/bookmark/${userId}?type=scam`)
            if (result.success) {
                if (result?.bookmarkData.length == 0) {
                    setIsScam(false)
                } else {

                    setScamBookmark(result.bookmarkData)
                }
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

    useEffect(() => {
        getRecommendedData()
        getBookmarkData()
        getTrustedRef()
        getScamBookmarkData()
    }, [])
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
    async function bookMarkUser(id,type) {
        if (id == null || id == undefined) {
            return
        }
        if (userId == id) {
            return
        }
        let data={}
        if(type=='scam'){
            data = { userId, trackerBookmark: id }    
        }else{
            data = { userId, bookmarkUser: id }
        }
        try {
            const result = await securePostData('api/users/bookmark-profile', data)
            if (result.success) {
                getScamBookmarkData()
                getBookmarkData()
            }
        } catch (error) {

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
    const visibleBookmarks = showAll ? bookmarkData : bookmarkData?.slice(0, 3);
    return (
        <>
            {(isData || isScam) ?
                <div className="main-section posting-histry-sec flex-grow-1">
                    <div className="row dash-profile-overflow pt-4 mx-lg-2 mx-sm-0">
                        <div className="d-lg-none d-md-block">
                            <a href="javascript:void(0)">
                                <i className="fa-solid fa-angle-left" />
                                Back
                            </a>
                        </div>
                        <h2>Bookmarks</h2>
                        {isData &&<div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="main-profile-sec dash-profile-sec">
                                <div className="main-profile-sec">
                                    <h3>Service Providers</h3>
                                    <ul>
                                        <li className="divider" />
                                    </ul>
                                </div>
                                <div className="posting-history-crd-box">
                                    <div className="row">
                                        {visibleBookmarks?.length > 0 &&
                                            visibleBookmarks?.map((item, key) => <div className="col-lg-4 col-md-4 col-sm-12" key={key}>
                                                <div className="custom-profile-card book-crd-box">
                                                    <div className="profile-image mb-3">
                                                        <img src={item?.profile?.isDefaultBanner ? `${base_url}/${item?.profile?.categories[0].category.image}` : `${base_url}/${item?.profile?.bannerImage}`}
                                                            alt="Banner"
                                                            style={{ width: '492px', height: '170px', objectFit: 'cover' }} />
                                                    </div>
                                                    <div className="slide-tab-custm-card">
                                                        <div className="user-logo  d-flex align-items-center gap-2 mb-2">
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
                                                                <div>
                                                                    <i className="fa-regular fa-house" />
                                                                    <small className="">{item?.profile?.company}</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className=" d-flex align-items-center justify-content-between gap-2 mb-2 slider-bx-dta-card">
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
                                                                    {/* <i className="fa-solid fa-bullhorn me-1" />
                                                                    Request a Reference */}
                                                                </a>}
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-center pt-2  mt-2 slide-btm-design-crd">
                                                            <span className="text-dark small fw-semibold">
                                                                {item?.profile?.title}
                                                            </span>
                                                            <Link to={`/wizbizla/provider?name=${item?.bookmarkUser.firstName}&wiz=${item?.bookmarkUser?._id}`} className="text-warning small">
                                                                View Profile
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)}
                                    </div>
                                    {bookmarkData?.length > 3 &&
                                        <div className="row mt-4">
                                            <div className="col-lg-4 posting-stories-crd-sec">
                                                <div className="posting-stories-btn">
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => setShowAll(!showAll)}
                                                    >
                                                        {showAll ? "Show Less" : "Show All"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>}
                                </div>
                            </div>
                        </div>}
                    </div>
                    {/* <div className="row dash-profile-overflow mt-4">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="main-profile-sec dash-profile-sec">
                                <div className="posting-hostry-main-sec">
                                    <div className="posting-hostry-title-header-box">
                                        <h3 className="mb-0">Wizbizla Blog</h3>
                                    </div>
                                    <ul>
                                        <li className="divider" />
                                    </ul>
                                </div>
                                <div className="posting-history-crd-box">
                                    <div className="row mb-4">
                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                            <div className="posting-stories-crd-sec">
                                                <div className="posting-stories-crd-picture position-relative">
                                                    <img src={images?.bookmarkPicOne} alt="" />
                                                    <a href="javascript:void(0)" className="posting-bookmrk">
                                                        <i className="fa-solid fa-bookmark" />
                                                    </a>
                                                </div>
                                                <div className="posting-stories-crd-content bookmrk-heading-sec">
                                                    <div className="posting-stories-title">
                                                        <h3 className="mb-0">
                                                            How collaboration makes us better designers
                                                        </h3>
                                                        <a
                                                            href="javascript:void(0)"
                                                            className="posting-stories-share"
                                                        >
                                                            <i className="fa-solid fa-arrow-right" />
                                                        </a>
                                                    </div>
                                                    <div className="posting-stories-crd-subtitle">
                                                        <p>
                                                            Collaboration can make our teams stronger, and our
                                                            individual designs better.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                            <div className="posting-stories-crd-sec">
                                                <div className="posting-stories-crd-picture position-relative">
                                                    <img
                                                        src={images?.bookmarkPicSecond}
                                                        alt=""
                                                    />
                                                    <a href="javascript:void(0)" className="posting-bookmrk">
                                                        <i className="fa-solid fa-bookmark" />
                                                    </a>
                                                </div>
                                                <div className="posting-stories-crd-content bookmrk-heading-sec">
                                                    <div className="posting-stories-title">
                                                        <h3 className="mb-0">
                                                            How collaboration makes us better designers
                                                        </h3>
                                                        <a
                                                            href="javascript:void(0)"
                                                            className="posting-stories-share"
                                                        >
                                                            <i className="fa-solid fa-arrow-right" />
                                                        </a>
                                                    </div>
                                                    <div className="posting-stories-crd-subtitle">
                                                        <p>
                                                            Collaboration can make our teams stronger, and our
                                                            individual designs better.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                            <div className="posting-stories-crd-sec">
                                                <div className="posting-stories-crd-picture position-relative">
                                                    <img
                                                        src={images?.bookmarkPicThird}
                                                        alt=""
                                                    />
                                                    <a href="javascript:void(0)" className="posting-bookmrk">
                                                        <i className="fa-solid fa-bookmark" />
                                                    </a>
                                                </div>
                                                <div className="posting-stories-crd-content bookmrk-heading-sec">
                                                    <div className="posting-stories-title">
                                                        <h3 className="mb-0">
                                                            How collaboration makes us better designers
                                                        </h3>
                                                        <a
                                                            href="javascript:void(0)"
                                                            className="posting-stories-share"
                                                        >
                                                            <i className="fa-solid fa-arrow-right" />
                                                        </a>
                                                    </div>
                                                    <div className="posting-stories-crd-subtitle">
                                                        <p>
                                                            Collaboration can make our teams stronger, and our
                                                            individual designs better.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 posting-stories-crd-sec ">
                                            <div className="posting-stories-btn">
                                                <a href="javascript:void(0)" className="btn btn-primary">
                                                    Show all
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="main-profile-sec dash-profile-sec">
                                <div className="posting-hostry-main-sec">
                                    <div className="posting-hostry-title-header-box">
                                        <h3 className="mb-0">Scam Tracker</h3>
                                    </div>
                                    <ul>
                                        <li className="divider" />
                                    </ul>
                                </div>
                                <div className="posting-history-crd-box">
                                    <div className="row mb-4">
                                        {scamBookmark?.length>0 && 
                                        scamBookmark?.slice(0,scamShowAll?scamBookmark.length:9).map((item,key)=>
                                        <div className="col-lg-6 col-md-6 col-sm-12" key={key}>
                                            <div className="posting-stories-crd-sec d-flex gap-3 scam-trackr-crd">
                                                <div className="posting-stories-crd-picture position-relative w-100">
                                                    <img
                                                        src={item?.trackerBookmark?.image ?
                                                            `${base_url}/${item?.trackerBookmark?.image}` : images?.scamTrackerOne}
                                                        alt=""
                                                        className="w-100"
                                                    />
                                                    <a href="#" onClick={()=>bookMarkUser(item?.trackerBookmark?._id,'scam')} className="posting-bookmrk">
                                                        <i className="fa-solid fa-bookmark" />
                                                    </a>
                                                </div>
                                                <div className="posting-stories-crd-content bookmrk-heading-sec">
                                                    <Link to={`/scam-tracker-detail/${item?.trackerBookmark?.title}/${item?.trackerBookmark?._id}`} className="posting-stories-titles scam-tracking-heading">
                                                        <h5>Scam</h5>
                                                        <h3 className="mb-0">
                                                            {item?.trackerBookmark?.title}
                                                        </h3>
                                                        <p>
                                                            {item?.trackerBookmark?.description?.slice(0,250)}
                                                        </p>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>)}
                                        {/* <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="posting-stories-crd-sec d-flex gap-3 scam-trackr-crd">
                                                <div className="posting-stories-crd-picture position-relative w-100">
                                                    <img
                                                        src={images?.scamTrackerSecond}
                                                        alt=""
                                                        className="w-100"
                                                    />
                                                    <a href="javascript:void(0)" className="posting-bookmrk">
                                                        <i className="fa-solid fa-bookmark" />
                                                    </a>
                                                </div>
                                                <div className="posting-stories-crd-content bookmrk-heading-sec">
                                                    <div className="posting-stories-titles scam-tracking-heading">
                                                        <h5>Scam</h5>
                                                        <h3 className="mb-0">
                                                            How collaboration makes us better designers
                                                        </h3>
                                                        <p>
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                                            sed do eiusmod tempor incididunt ut labore et dolore magna
                                                            aliqua. Ut enim ad minim veniam, quis nostrud
                                                            exercitation&nbsp;
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                    {scamBookmark?.length>9 &&<div className="row">
                                        <div className="col-lg-4 posting-stories-crd-sec ">
                                            <div className="posting-stories-btn">
                                                <a href="" onClick={()=>setScamShowAll(!scamShowAll)} className="btn btn-primary">
                                                    Show {scamShowAll?'less':'all'}
                                                </a>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                :
                <div className="main-section posting-histry-sec flex-grow-1">
                    <div className="row dash-profile-overflow mt-4">
                        <div className="d-lg-none d-md-block">
                            <a href="javascript:void(0)">
                                <i className="fa-solid fa-angle-left" />
                                Back
                            </a>
                        </div>
                        <h2>Bookmarks</h2>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="main-profile-sec dash-profile-sec posting-histry-main-box">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="pos-his-firt-div chat-fist-heading">
                                            <div>
                                                <a href="javascript:void(0)">
                                                    <i className="fa-solid fa-xmark" />
                                                </a>
                                            </div>
                                            <div>
                                                <h5 className="mb-1">
                                                    You currently don’t have any bookmarks.
                                                </h5>
                                                <p className="mb-0">
                                                    To fill your bookmarks click the ‘bookmark’ button while
                                                    viewing services and resources.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ConsumerBookmark
