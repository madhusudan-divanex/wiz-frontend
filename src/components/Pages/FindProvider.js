import React, { useEffect, useRef, useState } from 'react'
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import wizbizlaIntro from '../../assets/images/wizbizla-intro.mp4'
import { Link } from 'react-router-dom';
import { getApiData, getSecureApiData, postApiData } from '../../services/api';
import { toast } from 'react-toastify';
import base_url from '../../baseUrl';
import { contactData } from '../../utils/GlobalFunction';
function FindProvider() {
    const splideRef = useRef(null);
    const [isMsg, setIsMsg] = useState(false)
    const [cntMsg, setCntMsg] = useState(false)
    const [email, setEmail] = useState('')
    const [findText, setFindText] = useState('')
    const [topProvider, setTopProvider] = useState([])
    const [category, setCategory] = useState([])
    const [viewAll, setViewAll] = useState(false)
    const [subCategory, setSubCategory] = useState([])
    const [matchProfile, setMatchProfile] = useState([])
    const [activeId, setActiveId] = useState(null)
    const [faqList, setFaqList] = useState([])
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", message: "" })
    const [rotation, setRotation] = useState(0);

    async function buyScamBook() {
        if (email == '') {
            return
        }
        try {
            const result = await postApiData('api/users/scam-book', { email })
            if (result.success) {
                setEmail('')
                setIsMsg(true)
                setTimeout(() => {
                    setIsMsg(false)
                }, 5000)
            } else {
                toast.error(result.message)
            }
        } catch (error) {

        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (formData.email == '' || formData.firstName == '' || formData.message == "") {
            toast.error("Please fill all fields")
            return
        }
        try {
            const result = await postApiData('api/users/contact', formData)
            if (result.success) {
                setCntMsg(true)
                setFormData({ firstName: "", lastName: "", email: "", message: "" })
                setTimeout(() => {
                    setCntMsg(false)
                }, 5000)
            } else {
                toast.message(result.message)
            }
        } catch (error) {

        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const handleScroll = () => {
            const rotateValue = window.scrollY / 5; // adjust speed
            setRotation(rotateValue);
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup on unmount
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
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

    async function fetchUserProfile() {
        if (findText?.length < 2) {
            return
        }
        try {
            const result = await getApiData(`api/users/search-profile/${findText}?role=provider`)
            if (result.success) {
                setMatchProfile(result.profileUsers)
            }
        } catch (error) {

        }
    }
    async function fetchTopProviders() {
        try {
            const result = await getApiData(`api/users/top-provider`)
            if (result.success) {
                setTopProvider(result.topProvider)
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        if (findText?.length > 2) {
            fetchUserProfile()
        }
    }, [findText])
    const fetchCategory = async () => {
        try {
            const result = await getApiData(`get-category`)
            if (result.status) {
                setCategory(result.categoryData)
            } else {
                toast.error(result.message)
            }
            // const res = await axios.get(`https://api.wizbizlaonboard.com/api/categorys/all?page=${pageNumber}&q=${searchQuery}`);
            // if (res.data.success) {
            //     setCategoryList(res.data.categorys || []);
            //     setPage(res.data.currentPage);
            //     setPages(res.data.totalPages);
            //     setTotal(res.data.totalCategorys);
            // }
        } catch (error) {
        }
    }


    useEffect(() => {
        fetchTopProviders()
        fetchCategory()
    }, [])

    const [cData, setCData] = useState({});
    async function getCData() {
        const data = await contactData()
        setCData(data);
    }
    useEffect(() => {
        getCData()
        fetchFaq()
    }, [])
    const fetchFaq = async () => {
        try {
            const result = await getApiData(`cms/faq`)
            if (result.success) {
                const data = result.data.filter(item => item.category == "Help");
                setFaqList(data)
            } else {
                toast.error(result.message)
            }

        } catch (error) {
            console.log("error fetch categorys", error);
        }
    }


    return (
        <>
            <section className="banner-sec">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="banner-innr">
                                <h1>Find Your Trusted Expert in the UAE</h1>
                                <p>
                                    Wizbizla connects expats with service providers they can trust
                                </p>
                            </div>
                            <div className="banner-filter">
                                <div className="banner-filter-innr">
                                    <span>
                                        <img src="assets/images/search.svg" alt="" />
                                    </span>
                                    <input
                                        type="text"
                                        value={findText}
                                        onChange={(e) => setFindText(e.target.value)}
                                        className="form-control"
                                        id="search-filter"
                                        name=""
                                    />
                                    <button type="button">Search</button>
                                </div>
                                {findText?.length > 2 && <div className="search-bar-box" id="search-bar">
                                    <ul className="search-bar-box-list">
                                        {matchProfile?.map((item, key) =>
                                            <li key={key}>
                                                <Link to={`/wizbizla/provider?name=${item?.firstName}&wiz=${item._id}`}>
                                                    <div className="ct-icon">
                                                        <img style={{ width: '50px', height: '50px' }} src={item?.profileData?.profileImage ? `${base_url}/${item?.profileData?.profileImage}` : "/assets/images/car-01.svg"} alt="" />
                                                    </div>
                                                    <div>
                                                        <h5>{item?.firstName} {item?.lastName}</h5>
                                                    </div>
                                                </Link>
                                            </li>)}
                                        {/* <li>
                                            <a href="javascript:void(0);">
                                                <div className="ct-icon">
                                                    <img src="assets/images/donate-coin.svg" alt="" />
                                                </div>
                                                <div>
                                                    <h5>Charitied + Support</h5>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);">
                                                <div className="ct-icon">
                                                    <img src="assets/images/donate.svg" alt="" />
                                                </div>
                                                <div>
                                                    <h5>Coaching</h5>
                                                </div>
                                            </a>
                                        </li> */}
                                    </ul>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-shaped">
                    <img src="assets/images/w-shape.png" alt="" style={{
                        transform: `rotate(${rotation}deg)`,
                        transition: "transform 0.1s linear", // optional smoothing
                    }} />
                </div>
            </section>
            <section className="provider-sec tp-space">
                <div className="container d-flex align-items-start justify-content-between">
                    <h3 className="title">Top Accredited Service Providers</h3>
                    <div>
                        <button id="prevBtn"><i className='fas fa-chevron-left' style={{ color: '#4F40FF' }} /></button>
                        <button id="nextBtn"><i className='fas fa-chevron-right' style={{ color: '#4F40FF' }} /></button>
                    </div>
                </div>
                <div className="provider-slider owl-theme owl-carousel position-relative">
                    <Splide
                        ref={splideRef}
                        options={{
                            type: 'loop',
                            perPage: 5,
                            autoPlay: true,
                            perMove: 1,
                            arrows: false,
                            pagination: false,
                            gap: '1rem',
                            breakpoints: {
                                768: { perPage: 1.5 },
                                1024: { perPage: 4 },
                                1440: { perPage: 5 },
                            },
                        }}
                        aria-label="Profile Slider"
                    >
                        {topProvider?.length > 0 &&
                            topProvider?.map((item, key) =>
                                <SplideSlide key={key}>
                                    <div className="provider-card">
                                        <div className="provider-img">
                                            <img src={item?.profile?.isDefaultBanner ? `${base_url}/${item?.profile?.categories[0].category.image}` : `${base_url}/${item?.profile?.bannerImage}`}
                                                alt="banner"
                                                style={{ width: '340px', height: '140px', borderRadius: '5px' }} />
                                        </div>
                                        <div className="provider-user">
                                            <div className="provider-user-img">
                                                <img src={item?.profile?.profileImage ? `${base_url}/${item?.profile?.profileImage}` : "assets/images/provider-user-01.png"} alt="" />
                                            </div>
                                            <div className="provider-user-content">
                                                <h5 className='text-capitalize'>{item?.profile.userId?.firstName + "  " + item?.profile.userId?.lastName}</h5>
                                                <p>
                                                    <img src="assets/images/home-5.svg" className="me-2" alt="" />
                                                    {item?.profile?.company}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="provider-bttm">
                                            <span>{item?.title}</span>
                                            <Link to={`/wizbizla/provider?name=${item?.profile?.userId?.firstName}&wiz=${item?.profile?.userId._id}`}>View Profile</Link>
                                        </div>
                                    </div>
                                </SplideSlide>)}
                        <SplideSlide>

                            <div className="provider-card">
                                <div className="provider-img">
                                    <img src="assets/images/provider-img-02.png" alt="" />
                                </div>
                                <div className="provider-user">
                                    <div className="provider-user-img">
                                        <img src="assets/images/provider-user-01.png" alt="" />
                                    </div>
                                    <div className="provider-user-content">
                                        <h5>Amélie Laurent</h5>
                                        <p>
                                            <img src="assets/images/home-5.svg" className="me-2" alt="" />
                                            Anyday
                                        </p>
                                    </div>
                                </div>
                                <div className="provider-bttm">
                                    <span>UX UI Designer</span>
                                    <a href="javascript:void(0);">View Profile</a>
                                </div>
                            </div>
                        </SplideSlide>
                        <SplideSlide>
                            <div className="provider-card">
                                <div className="provider-img">
                                    <img src="assets/images/provider-img.png" alt="" />
                                </div>
                                <div className="provider-user">
                                    <div className="provider-user-img">
                                        <img src="assets/images/provider-user-01.png" alt="" />
                                    </div>
                                    <div className="provider-user-content">
                                        <h5>Amélie Laurent</h5>
                                        <p>
                                            <img src="assets/images/home-5.svg" className="me-2" alt="" />
                                            Anyday
                                        </p>
                                    </div>
                                </div>
                                <div className="provider-bttm">
                                    <span>UX UI Designer</span>
                                    <a href="javascript:void(0);">View Profile</a>
                                </div>
                            </div>
                        </SplideSlide>
                        <SplideSlide>
                            <div className="provider-card">
                                <div className="provider-img">
                                    <img src="assets/images/provider-img-02.png" alt="" />
                                </div>
                                <div className="provider-user">
                                    <div className="provider-user-img">
                                        <img src="assets/images/provider-user-01.png" alt="" />
                                    </div>
                                    <div className="provider-user-content">
                                        <h5>Amélie Laurent</h5>
                                        <p>
                                            <img src="assets/images/home-5.svg" className="me-2" alt="" />
                                            Anyday
                                        </p>
                                    </div>
                                </div>
                                <div className="provider-bttm">
                                    <span>UX UI Designer</span>
                                    <a href="javascript:void(0);">View Profile</a>
                                </div>
                            </div>
                        </SplideSlide>
                        <SplideSlide>
                            <div className="provider-card">
                                <div className="provider-img">
                                    <img src="assets/images/provider-img.png" alt="" />
                                </div>
                                <div className="provider-user">
                                    <div className="provider-user-img">
                                        <img src="assets/images/provider-user-01.png" alt="" />
                                    </div>
                                    <div className="provider-user-content">
                                        <h5>Amélie Laurent</h5>
                                        <p>
                                            <img src="assets/images/home-5.svg" className="me-2" alt="" />
                                            Anyday
                                        </p>
                                    </div>
                                </div>
                                <div className="provider-bttm">
                                    <span>UX UI Designer</span>
                                    <a href="javascript:void(0);">View Profile</a>
                                </div>
                            </div>
                        </SplideSlide>
                        <SplideSlide>
                            <div className="provider-card">
                                <div className="provider-img">
                                    <img src="assets/images/provider-img-02.png" alt="" />
                                </div>
                                <div className="provider-user">
                                    <div className="provider-user-img">
                                        <img src="assets/images/provider-user-01.png" alt="" />
                                    </div>
                                    <div className="provider-user-content">
                                        <h5>Amélie Laurent</h5>
                                        <p>
                                            <img src="assets/images/home-5.svg" className="me-2" alt="" />
                                            Anyday
                                        </p>
                                    </div>
                                </div>
                                <div className="provider-bttm">
                                    <span>UX UI Designer</span>
                                    <a href="javascript:void(0);">View Profile</a>
                                </div>
                            </div>
                        </SplideSlide>
                        <SplideSlide>
                            <div className="provider-card">
                                <div className="provider-img">
                                    <img src="assets/images/provider-img.png" alt="" />
                                </div>
                                <div className="provider-user">
                                    <div className="provider-user-img">
                                        <img src="assets/images/provider-user-01.png" alt="" />
                                    </div>
                                    <div className="provider-user-content">
                                        <h5>Amélie Laurent</h5>
                                        <p>
                                            <img src="assets/images/home-5.svg" className="me-2" alt="" />
                                            Anyday
                                        </p>
                                    </div>
                                </div>
                                <div className="provider-bttm">
                                    <span>UX UI Designer</span>
                                    <a href="javascript:void(0);">View Profile</a>
                                </div>
                            </div>
                        </SplideSlide>
                        <SplideSlide>
                            <div className="provider-card">
                                <div className="provider-img">
                                    <img src="assets/images/provider-img-02.png" alt="" />
                                </div>
                                <div className="provider-user">
                                    <div className="provider-user-img">
                                        <img src="assets/images/provider-user-01.png" alt="" />
                                    </div>
                                    <div className="provider-user-content">
                                        <h5>Amélie Laurent</h5>
                                        <p>
                                            <img src="assets/images/home-5.svg" className="me-2" alt="" />
                                            Anyday
                                        </p>
                                    </div>
                                </div>
                                <div className="provider-bttm">
                                    <span>UX UI Designer</span>
                                    <a href="javascript:void(0);">View Profile</a>
                                </div>
                            </div>
                        </SplideSlide>
                    </Splide>
                </div>
            </section>
            <section className="category-provider tp-space">
                <div className="container">
                    <h3 className="title text-center mb-5">
                        Find a Trusted Service Provider by Category{" "}
                    </h3>
                    <ul className="category-list">
                        {category?.length > 0 &&
                            category?.slice(0, viewAll ? category.length : 8)?.map((item, key) =>
                                <li className={`category-item ${activeId == 1 ? 'active' : ''}`} key={key}>
                                    <div className="category-card " onClick={() => {
                                        if (activeId == key) {
                                            setActiveId(null)
                                        } else {
                                            setActiveId(key)
                                        }
                                    }}>
                                        <span className="border-shape shape-01" />
                                        <span className="border-shape shape-02" />
                                        <span className="border-shape shape-03" />
                                        <span className="border-shape shape-04" />
                                        <div className="category-card-innr">
                                            <img src={item?.image ? `${base_url}/${item.icon}` : "assets/images/car-02.svg"} alt="" />
                                            <button type='button' onClick={() => setActiveId(key)}>{item?.name}</button>
                                        </div>
                                    </div>
                                    {activeId == key && <div className="category-menu">
                                        <ul className="category-menu-list">
                                            <li className="cat-menu-item">
                                                <Link to={`/sub-category/${item?._id}`} className="cat-menu-links">
                                                    <span>
                                                        View all sub-categories{" "}
                                                        <i className="fas fa-chevron-right ms-3" />
                                                    </span>
                                                </Link>
                                            </li>
                                            {item?.subCat?.slice(0, 3).map((s, i) =>
                                                <li className="cat-menu-item" key={i}>
                                                    <a href="javascript:void(0);" className="cat-menu-links">
                                                        <span>
                                                            {" "}
                                                            <img
                                                                src="assets/images/money-check.svg"
                                                                className="me-2"
                                                                alt=""
                                                            />
                                                            {s.name}{" "}
                                                        </span>
                                                        <i className="fas fa-chevron-right" />
                                                    </a>
                                                </li>)}

                                        </ul>
                                    </div>}
                                </li>)}
                        {/* <li className={`category-item ${activeId == 3 ? 'active' : ''}`}>
                            <div className="category-card" onClick={() => {
                                if (activeId == 3) {
                                    setActiveId(null)
                                } else {
                                    setActiveId(3)
                                }
                            }}>
                                <span className="border-shape shape-01" />
                                <span className="border-shape shape-02" />
                                <span className="border-shape shape-03" />
                                <span className="border-shape shape-04" />
                                <div className="category-card-innr">
                                    <img src="assets/images/donate-coin-02.svg" alt="" />
                                    <button type='button' >Charity &amp; Support</button>
                                </div>
                            </div>
                            {activeId == 3 && <div className="category-menu">
                                <ul className="category-menu-list">
                                    <li className="cat-menu-item">
                                        <a href="javascript:void(0);" className="cat-menu-links">
                                            <span>
                                                View all sub-categories{" "}
                                                <i className="fas fa-chevron-right ms-3" />
                                            </span>
                                        </a>
                                    </li>
                                    <li className="cat-menu-item">
                                        <a href="javascript:void(0);" className="cat-menu-links">
                                            <span>
                                                {" "}
                                                <img
                                                    src="assets/images/money-check.svg"
                                                    className="me-2"
                                                    alt=""
                                                />
                                                Vehicle Finance{" "}
                                            </span>
                                            <i className="fas fa-chevron-right" />
                                        </a>
                                    </li>
                                    <li className="cat-menu-item">
                                        <a href="javascript:void(0);" className="cat-menu-links">
                                            <span>
                                                <img src="assets/images/gold.svg" className="me-2" alt="" />
                                                Vehicle Insurance
                                            </span>
                                            <i className="fas fa-chevron-right" />
                                        </a>
                                    </li>
                                    <li className="cat-menu-item">
                                        <a href="javascript:void(0);" className="cat-menu-links">
                                            <span>
                                                <img
                                                    src="assets/images/sale-01.svg"
                                                    className="me-2"
                                                    alt=""
                                                />
                                                Vehicle Sale
                                            </span>
                                            <i className="fas fa-chevron-right" />
                                        </a>
                                    </li>
                                </ul>
                            </div>}
                        </li>
                        <li className={`category-item ${activeId == 4 ? 'active' : ''}`}>
                            <div className="category-card" onClick={() => {
                                if (activeId == 4) {
                                    setActiveId(null)
                                } else {
                                    setActiveId(4)
                                }
                            }}>
                                <span className="border-shape shape-01" />
                                <span className="border-shape shape-02" />
                                <span className="border-shape shape-03" />
                                <span className="border-shape shape-04" />
                                <div className="category-card-innr">
                                    <img src="assets/images/donate-02.svg" alt="" />
                                    <button type='button' >Coaching</button>
                                </div>
                            </div>
                            {activeId == 4 && <div className="category-menu">
                                <ul className="category-menu-list">
                                    <li className="cat-menu-item">
                                        <a href="javascript:void(0);" className="cat-menu-links">
                                            <span>
                                                View all sub-categories{" "}
                                                <i className="fas fa-chevron-right ms-3" />
                                            </span>
                                        </a>
                                    </li>
                                    <li className="cat-menu-item">
                                        <a href="javascript:void(0);" className="cat-menu-links">
                                            <span>
                                                {" "}
                                                <img
                                                    src="assets/images/money-check.svg"
                                                    className="me-2"
                                                    alt=""
                                                />
                                                Vehicle Finance{" "}
                                            </span>
                                            <i className="fas fa-chevron-right" />
                                        </a>
                                    </li>
                                    <li className="cat-menu-item">
                                        <a href="javascript:void(0);" className="cat-menu-links">
                                            <span>
                                                <img src="assets/images/gold.svg" className="me-2" alt="" />
                                                Vehicle Insurance
                                            </span>
                                            <i className="fas fa-chevron-right" />
                                        </a>
                                    </li>
                                    <li className="cat-menu-item">
                                        <a href="javascript:void(0);" className="cat-menu-links">
                                            <span>
                                                <img
                                                    src="assets/images/sale-01.svg"
                                                    className="me-2"
                                                    alt=""
                                                />
                                                Vehicle Sale
                                            </span>
                                            <i className="fas fa-chevron-right" />
                                        </a>
                                    </li>
                                </ul>
                            </div>}
                        </li>
                        <li className="category-item">
                            <div className="category-card">
                                <span className="border-shape shape-01" />
                                <span className="border-shape shape-02" />
                                <span className="border-shape shape-03" />
                                <span className="border-shape shape-04" />
                                <div className="category-card-innr">
                                    <img src="assets/images/color-palette.svg" alt="" />
                                    <a href="javascript:void(0);">Design &amp; Art</a>
                                </div>
                            </div>
                        </li>
                        <li className="category-item">
                            <div className="category-card">
                                <span className="border-shape shape-01" />
                                <span className="border-shape shape-02" />
                                <span className="border-shape shape-03" />
                                <span className="border-shape shape-04" />
                                <div className="category-card-innr">
                                    <img src="assets/images/open-book.svg" alt="" />
                                    <a href="javascript:void(0);">Education &amp; Tutoring</a>
                                </div>
                            </div>
                        </li>
                        <li className="category-item">
                            <div className="category-card">
                                <span className="border-shape shape-01" />
                                <span className="border-shape shape-02" />
                                <span className="border-shape shape-03" />
                                <span className="border-shape shape-04" />
                                <div className="category-card-innr">
                                    <img src="assets/images/atom-01.svg" alt="" />
                                    <a href="javascript:void(0);">Event &amp; Entainment</a>
                                </div>
                            </div>
                        </li>
                        <li className="category-item">
                            <div className="category-card">
                                <span className="border-shape shape-01" />
                                <span className="border-shape shape-02" />
                                <span className="border-shape shape-03" />
                                <span className="border-shape shape-04" />
                                <div className="category-card-innr">
                                    <img src="assets/images/bar-chart.svg" alt="" />
                                    <a href="javascript:void(0);">Facilities Management</a>
                                </div>
                            </div>
                        </li>
                        <li className="category-item">
                            <div className="category-card">
                                <span className="border-shape shape-01" />
                                <span className="border-shape shape-02" />
                                <span className="border-shape shape-03" />
                                <span className="border-shape shape-04" />
                                <div className="category-card-innr">
                                    <img src="assets/images/safe-box-01.svg" alt="" />
                                    <a href="javascript:void(0);">Finacial</a>
                                </div>
                            </div>
                        </li>
                        <li className="category-item">
                            <div className="category-card">
                                <span className="border-shape shape-01" />
                                <span className="border-shape shape-02" />
                                <span className="border-shape shape-03" />
                                <span className="border-shape shape-04" />
                                <div className="category-card-innr">
                                    <img src="assets/images/activity.svg" alt="" />
                                    <a href="javascript:void(0);">Health &amp; Wellness</a>
                                </div>
                            </div>
                        </li>
                        <li className="category-item">
                            <div className="category-card">
                                <span className="border-shape shape-01" />
                                <span className="border-shape shape-02" />
                                <span className="border-shape shape-03" />
                                <span className="border-shape shape-04" />
                                <div className="category-card-innr">
                                    <img src="assets/images/hospital.svg" alt="" />
                                    <a href="javascript:void(0);">Hospitality</a>
                                </div>
                            </div>
                        </li>
                        <li className="category-item">
                            <div className="category-card">
                                <span className="border-shape shape-01" />
                                <span className="border-shape shape-02" />
                                <span className="border-shape shape-03" />
                                <span className="border-shape shape-04" />
                                <div className="category-card-innr">
                                    <img src="assets/images/student-02.svg" alt="" />
                                    <a href="javascript:void(0);">Law</a>
                                </div>
                            </div>
                        </li>
                        <li className="category-item">
                            <div className="category-card">
                                <span className="border-shape shape-01" />
                                <span className="border-shape shape-02" />
                                <span className="border-shape shape-03" />
                                <span className="border-shape shape-04" />
                                <div className="category-card-innr">
                                    <img src="assets/images/delivery-done.svg" alt="" />
                                    <a href="javascript:void(0);">Logistics &amp; Distribution</a>
                                </div>
                            </div>
                        </li>
                        <li className="category-item">
                            <div className="category-card">
                                <span className="border-shape shape-01" />
                                <span className="border-shape shape-02" />
                                <span className="border-shape shape-03" />
                                <span className="border-shape shape-04" />
                                <div className="category-card-innr">
                                    <img src="assets/images/target-02.svg" alt="" />
                                    <a href="javascript:void(0);">Marketing &amp; Advertising</a>
                                </div>
                            </div>
                        </li>
                        <li className="category-item">
                            <div className="category-card">
                                <span className="border-shape shape-01" />
                                <span className="border-shape shape-02" />
                                <span className="border-shape shape-03" />
                                <span className="border-shape shape-04" />
                                <div className="category-card-innr">
                                    <img src="assets/images/stethoscope.svg" alt="" />
                                    <a href="javascript:void(0);">Media &amp; Communications</a>
                                </div>
                            </div>
                        </li>
                        <li className="category-item">
                            <div className="category-card">
                                <span className="border-shape shape-01" />
                                <span className="border-shape shape-02" />
                                <span className="border-shape shape-03" />
                                <span className="border-shape shape-04" />
                                <div className="category-card-innr">
                                    <img src="assets/images/eye-dropper.svg" alt="" />
                                    <a href="javascript:void(0);">Media &amp; Healthcare</a>
                                </div>
                            </div>
                        </li>
                        <li className="category-item">
                            <div className="category-card">
                                <span className="border-shape shape-01" />
                                <span className="border-shape shape-02" />
                                <span className="border-shape shape-03" />
                                <span className="border-shape shape-04" />
                                <div className="category-card-innr">
                                    <img src="assets/images/Animals.svg" alt="" />
                                    <a href="javascript:void(0);">Pets</a>
                                </div>
                            </div>
                        </li>
                        <li className="category-item">
                            <div className="category-card">
                                <span className="border-shape shape-01" />
                                <span className="border-shape shape-02" />
                                <span className="border-shape shape-03" />
                                <span className="border-shape shape-04" />
                                <div className="category-card-innr">
                                    <img src="assets/images/home-03.svg" alt="" />
                                    <a href="javascript:void(0);">Real Estste</a>
                                </div>
                            </div>
                        </li>
                        <li className="category-item">
                            <div className="category-card">
                                <span className="border-shape shape-01" />
                                <span className="border-shape shape-02" />
                                <span className="border-shape shape-03" />
                                <span className="border-shape shape-04" />
                                <div className="category-card-innr">
                                    <img src="assets/images/Sport.svg" alt="" />
                                    <a href="javascript:void(0);">Sports &amp; Fitness</a>
                                </div>
                            </div>
                        </li>
                        <li className="category-item">
                            <div className="category-card">
                                <span className="border-shape shape-01" />
                                <span className="border-shape shape-02" />
                                <span className="border-shape shape-03" />
                                <span className="border-shape shape-04" />
                                <div className="category-card-innr">
                                    <img src="assets/images/map-location.svg" alt="" />
                                    <a href="javascript:void(0);">Tourism</a>
                                </div>
                            </div>
                        </li> */}
                    </ul>
                    <div className="text-center mt-5">
                        <button onClick={() => setViewAll(!viewAll)} className="thm-btn">
                            {viewAll ? 'Show less' : 'View All'} Categories
                        </button>
                    </div>
                </div>
            </section>
            <section className="service-sec tp-space">
                <div className="container">
                    <h6 className="subtitle text-center text-white">Our services</h6>
                    <h3 className="title text-center mb-5 text-white">
                        Robust resolution resources on demand{" "}
                    </h3>
                    <div className="service-cards service-dark">
                        <div className="row align-items-end">
                            <div className="col-lg-8">
                                <div className="service-cards-title">
                                    <span>
                                        <img src="assets/images/deal-02.svg" alt="" />
                                    </span>
                                    <Link to="/login">
                                        Dispute Resolution{" "}
                                        <img src="assets/images/maximize.svg" alt="" />
                                    </Link>
                                </div>
                                <p>
                                    This is where we can try to resolve service issues. If you have an
                                    issue with a service provider, our customer support team is
                                    available to assist you.
                                </p>
                                <Link to="/login" className="request-btn">
                                    <i className="far fa-arrow-right me-2" />
                                    Send a Request
                                </Link>
                            </div>
                            <div className="col-lg-4 d-none d-lg-block">
                                <img src="assets/images/law-attachment.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <h4 className="innr-title text-center">
                                Premium Services: Tailored Search Solutions
                            </h4>
                        </div>
                        <div className="col-lg-6">
                            <div className="service-cards">
                                <div className="service-cards-title">
                                    <span>
                                        <img src="assets/images/search-3.svg" alt="" />
                                    </span>
                                    <Link to="/login">
                                        Let Us Do the Searching
                                        <img src="assets/images/maximize.svg" alt="" />
                                    </Link>
                                </div>
                                <p>
                                    Simply share what you’re looking for, and get matched with the
                                    right professionals in the local market.
                                </p>
                                <Link to="/login" className="request-btn">
                                    <i className="far fa-arrow-right me-2" />
                                    Bespoke Concierge Service
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="service-cards">
                                <div className="service-cards-title">
                                    <span>
                                        <img src="assets/images/sad-circle.svg" alt="" />
                                    </span>
                                    <Link to="/login">
                                        Didn't Find the Service Provider ?
                                        <img src="assets/images/maximize.svg" alt="" />
                                    </Link>
                                </div>
                                <p>
                                    We’re here to help. If the service provider you're looking for
                                    isn't in our directory, submit a request to have it accredited.
                                </p>
                                <Link to="/login" className="request-btn">
                                    <i className="far fa-arrow-right me-2" />
                                    Request a Service Provider
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <h4 className="innr-title text-center">
                                Community Services: Customized Feedback Solutions
                            </h4>
                        </div>
                        <div className="col-lg-6">
                            <div className="service-cards">
                                <div className="service-cards-title">
                                    <span>
                                        <img src="assets/images/file-03.svg" alt="" />
                                    </span>
                                    <Link to="/login">
                                        Need a Reference?
                                        <img src="assets/images/maximize.svg" alt="" />
                                    </Link>
                                </div>
                                <p>
                                    Get exactly the right feedback, in exactly the right service
                                    provider, exactly when you need it.
                                </p>
                                <Link to="/login" className="request-btn">
                                    <i className="far fa-arrow-right me-2" />
                                    Request a Trusted Reference
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="service-cards">
                                <div className="service-cards-title">
                                    <span>
                                        <img src="assets/images/file-sharing.svg" alt="" />
                                    </span>
                                    <Link to='/report-scam'>
                                        Report a Scam
                                        <img src="assets/images/maximize.svg" alt="" />
                                    </Link>
                                </div>
                                <p>
                                    Alert the public about your experience with a scam by completing a
                                    scam report.
                                </p>
                                <Link to='/report-scam'>
                                    <i className="far fa-arrow-right me-2" />
                                    Report a Scam
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="get-know-sec tp-space">
                <div className="container-fluid">
                    <div className="get-know-innr">
                        <div id="getKnowCarousel" class="carousel slide" >
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-lg-8">
                                                <div class="get-know-lft">
                                                    <h2>
                                                        Get to know <br /> Wizbizla
                                                    </h2>
                                                    <Link to="/about-us" class="thm-lg-btn">
                                                        About Us
                                                    </Link>
                                                </div>
                                            </div>
                                            <div class="col-lg-4">
                                                <div class="get-know-rgt">
                                                    <h4>
                                                        Wizbizla is your reliable partner in the United Arab Emirates,
                                                        helping expatriates confidently choose top service providers
                                                        for their needs
                                                    </h4>
                                                    <p>
                                                        Our platform connects expats with verified professionals, from
                                                        lawyers to plumbers, ensuring peace of mind with trusted
                                                        credentials.
                                                    </p>
                                                    <p>
                                                        Our mission is to identify the best resources and minimize
                                                        risks for everyone. We prioritize trust through accredited
                                                        certifications and careful recommendations.
                                                    </p>
                                                    <p>
                                                        If any issues arise, our independent recourse process resolves
                                                        disputes while upholding our ethical standards.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="carousel-item">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div class="get-know-middle">
                                                    <p class="text-white">Why choose Wizbizla</p>
                                                    <h3>
                                                        <span>
                                                            Finding reputable licensed service providers in the UAE can
                                                            be challenging.
                                                        </span>
                                                        Wizbizla aims to create a safe environment, install consumer
                                                        confidence, and foster a trustworthy marketplace for all.
                                                    </h3>

                                                    <div class="row">
                                                        <div class="col-lg-6">
                                                            <p class="text-white">
                                                                We rigorously verify service providers to ensure they meet
                                                                legal, regulatory, and qualification standards within
                                                                their fields of operation.
                                                            </p>
                                                            <p class="text-white">
                                                                Our services save expatriates significant time and money
                                                                while avoiding unnecessary hassles.
                                                            </p>
                                                        </div>
                                                        <div class="col-lg-6">
                                                            <p class="text-white">
                                                                This unparalleled level of security and support sets us
                                                                apart, providing ultimate peace of mind.
                                                            </p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#getKnowCarousel" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon"></span>
                            </button>

                            <button class="carousel-control-next" type="button" data-bs-target="#getKnowCarousel" data-bs-slide="next">
                                <span class="carousel-control-next-icon"></span>
                            </button>

                            <div class="carousel-indicators">
                                <button type="button" data-bs-target="#getKnowCarousel" data-bs-slide-to="0" class="active"></button>
                                <button type="button" data-bs-target="#getKnowCarousel" data-bs-slide-to="1"></button>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
            <section className="counter-sec tp-space">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            <div className="counter-card">
                                <h6>
                                    Annual New Arrivals <br /> in the UAE
                                </h6>
                                <h2>275,000</h2>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="counter-card">
                                <h6>
                                    Active Registered <br /> Business Licenses
                                </h6>
                                <h2>665,000</h2>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="counter-card">
                                <h6>
                                    Accredited Service Providers <br /> on Wizbizla
                                </h6>
                                <h2>500</h2>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="counter-card">
                                <h6>
                                    Scams reported to <br /> Wizbizla Scam Tracker
                                </h6>
                                <h2>200</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="counter-bttm-card">
                                <span>
                                    <img src="assets/images/shield.svg" alt="" />
                                </span>
                                <p>We help keep you safe and secure</p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="counter-bttm-card">
                                <span>
                                    <img src="assets/images/search-3.svg" alt="" />
                                </span>
                                <p>
                                    We verify Service Providers to keep the unscrupulous ones out.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="counter-bttm-card">
                                <span>
                                    <img src="assets/images/check.svg" alt="" />
                                </span>
                                <p>
                                    Committed to providing excellent customer standards and services
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="counter-bttm-card">
                                <span>
                                    <img src="assets/images/data.svg" alt="" />
                                </span>
                                <p>Access to our network and scam prevention programme</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="relations-sec tp-space">
                <div className="container">
                    <div className="union-shape">
                        <img src="assets/images/union.png" alt="" />
                    </div>
                    <div className="relations-card">
                        <div className="row">
                            <div className="col-lg-5">
                                <div className="relations-img">
                                    <img src="assets/images/relations-img.png" alt="" />
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="relations-content">
                                    <h3>
                                        Interested in <span>partnering</span> with Wizbizla to stop
                                        scammers?
                                    </h3>
                                    <p>
                                        We seek partners to expand effects to combat fraud in the expat
                                        community.
                                    </p>
                                    <h4>Gain Accreditation</h4>
                                    <p>
                                        Enhance your visibility within the UAE marketplace as a leading
                                        industry professional. Gain recognition as a trusted service
                                        provider in a dynamic and evolving market. Build connections
                                        with your ideal clients and distinguish your business from less
                                        reputable competitors.
                                    </p>
                                    <Link to="/login" className="thm-btn">
                                        Apply for Accreditation
                                    </Link>
                                    <Link to="/accreditation-process" className="thm-btn outline">
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-7">
                            <div className="trusted-content">
                                <h3>L</h3>
                                <p>
                                    Make Wizbizla your trusted ally for informed buying decisions and
                                    your go-to resource for additional consumer information.
                                </p>
                                <ul className="trusted-content-list">
                                    <li>Search</li>
                                    <li>Report and Stay Safe from Fraud</li>
                                    <li>Expert Consumer Tips</li>
                                    <li>Get the Latest Advice</li>
                                    <li>Find Trusted Service Providers</li>
                                    <li>Connect, and Get Quotes</li>
                                    <li>Request References</li>
                                    <li>News and Scam Alerts</li>
                                </ul>
                                <Link to="/login" className="thm-btn">
                                    Join Here
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="trusted-img">
                                <img src="assets/images/trusted-img.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="premium-card">
                            <h6>Exclusive Premium Membership</h6>
                            <h4>
                                Elevate your experience with our premium annual membership. As an
                                expat, you can outsource your monthly service needs to the Wizbizla
                                team, letting our bespoke concierge service streamline your life.{" "}
                                <span>
                                    Discover how we can save you valuable time and effort with
                                    tailored support.
                                </span>
                            </h4>
                            <a href="javascript:void(0);" className="thm-btn">
                                Learn More and simplify your life
                            </a>
                            <div className="union-shape-02">
                                <img src="assets/images/union-bttm.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="scam-prevention-sec tp-space">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="scam-prevention-content">
                                <h2>Scam Prevention Programme</h2>
                                <p>
                                    Wizbizla builds trust and communities not only through our network
                                    but also by addressing prevalent confidence fraud in the market
                                    through our Scam Prevention programme.
                                </p>
                                <Link to="/scam-prevention" className="thm-btn">
                                    Learn More
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="scam-prevention-vdo">
                                <video controls>
                                    <source src={wizbizlaIntro} type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="investigations-sec tp-space">
                <div className="container-fluid">
                    <div className="investigations-cards">
                        <div className="container">
                            <div className="investigations-tabs">
                                <ul className="nav" id="myTab" role="tablist">
                                    <li className="tab-item" role="presentation">
                                        <button
                                            className="tab-link active"
                                            data-bs-toggle="tab"
                                            data-bs-target="#investigations-tab-01"
                                            type="button"
                                            role="tab"
                                        >
                                            <span className="bi bi-unlock2" />
                                            Latest Scam
                                        </button>
                                    </li>
                                    <li className="tab-item" role="presentation">
                                        <button
                                            className="tab-link"
                                            data-bs-toggle="tab"
                                            data-bs-target="#investigations-tab-02"
                                            type="button"
                                            role="tab"
                                        >
                                            <span className="bi bi-file-text" />
                                            Most Read
                                        </button>
                                    </li>
                                    <li className="tab-item" role="presentation">
                                        <button
                                            className="tab-link"
                                            data-bs-toggle="tab"
                                            data-bs-target="#investigations-tab-03"
                                            type="button"
                                            role="tab"
                                        >
                                            <span className="bi bi-camera-video" />
                                            Top Investigations
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="tab-content" id="myTabContent">
                            <div
                                className="tab-pane fade show active"
                                id="investigations-tab-01"
                                role="tabpanel"
                                tabIndex={0}
                            >
                                <div className="row">
                                    <div className="col-lg-7">
                                        <div className="featured-card">
                                            <div className="featured-vdo">
                                                <video controls>
                                                    <source
                                                        src="assets/images/wizbizla-intro.mp4"
                                                        type="video/mp4"
                                                    />
                                                </video>
                                            </div>
                                            <h3>Featured Scam</h3>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                Vivamus ut congue ex, nec ullamcorper tortor. Maecenas
                                                eleifend viverra est, sed commodo dui faucibus sed. Mauris
                                                sit amet venenatis justo. Morbi tempor, lorem vel interdum
                                                tincidunt, magna tortor dignissim arcu, quis pellentesque
                                                erat augue eu tortor.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <ul className="featured-list">
                                            <li>
                                                <div className="featured-list-img">
                                                    <img src="assets/images/featured-img-01.png" alt="" />
                                                </div>
                                                <Link to='/scam-tips' className="featured-list-content">
                                                    <h5>Scam Tip</h5>
                                                    <p>How to spot and avoid identity thefy </p>
                                                </Link>
                                            </li>
                                            <li>
                                                <div className="featured-list-img">
                                                    <img src="assets/images/featured-img-02.png" alt="" />
                                                </div>
                                                <Link to='/scam-alert' className="featured-list-content">
                                                    <h5>Scam Alert</h5>
                                                    <p>Government grant scam via Facebook</p>
                                                </Link>
                                            </li>
                                            <li>
                                                <div className="featured-list-img">
                                                    <img src="assets/images/featured-img-03.png" alt="" />
                                                </div>
                                                <Link to='/case-study' className="featured-list-content">
                                                    <h5>Scam Case Study</h5>
                                                    <p>A jaw dropping prPR scam</p>
                                                </Link>
                                            </li>
                                            <li>
                                                <div className="featured-list-img">
                                                    <img src="assets/images/featured-img-04.png" alt="" />
                                                </div>
                                                <Link to='/scam-tracker' className="featured-list-content">
                                                    <h5>Scam Tracker</h5>
                                                    <p>Report a Scam</p>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="investigations-tab-02"
                                role="tabpanel"
                                tabIndex={0}
                            >
                                <div className="row">
                                    <div className="col-lg-4 col-md-6">
                                        <div className="investigations-blog-card">
                                            <a href="javascript:void(0);">
                                                <img
                                                    src="assets/images/investigations-blog-01.png"
                                                    alt=""
                                                />
                                            </a>
                                            <h4>
                                                <a href="javascript:void(0);">
                                                    Pellentesque placerat, nulla in ornare ultrices, nisl nibh
                                                    faucibus felis, eget condimentum elit eros at mauris
                                                    <img src="assets/images/arrow.svg" alt="" />
                                                </a>
                                            </h4>
                                            <p>
                                                Collaboration can make our teams stronger, and our
                                                individual designs better.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="investigations-blog-card">
                                            <a href="javascript:void(0);">
                                                <img
                                                    src="assets/images/investigations-blog-02.png"
                                                    alt=""
                                                />
                                            </a>
                                            <h4>
                                                <a href="javascript:void(0);">
                                                    How collaboration makes us better designers
                                                    <img src="assets/images/arrow.svg" alt="" />
                                                </a>
                                            </h4>
                                            <p>
                                                Collaboration can make our teams stronger, and our
                                                individual designs better.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="investigations-blog-card">
                                            <a href="javascript:void(0);">
                                                <img
                                                    src="assets/images/investigations-blog-03.png"
                                                    alt=""
                                                />
                                            </a>
                                            <h4>
                                                <a href="javascript:void(0);">
                                                    How collaboration makes us better designers
                                                    <img src="assets/images/arrow.svg" alt="" />
                                                </a>
                                            </h4>
                                            <p>
                                                Collaboration can make our teams stronger, and our
                                                individual designs better.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="investigations-tab-03"
                                role="tabpanel"
                                tabIndex={0}
                            >
                                <div className="investigations-content text-center">
                                    <h2 className="title ">
                                        The Top True Crime Expat Scams Our Success Stories to Watch Out
                                        For
                                    </h2>
                                    <ul className="investigations-content-list">
                                        <li>The Bulletproof Plan Against Financial Fraud</li>
                                        <li>
                                            Inside the Debbie Steedman Facebook Group Investment Scam
                                        </li>
                                        <li>Caught in the Act: Exposing the PR Scam</li>
                                        <li>
                                            Unmasking the Holiday Deceit: The Christmas Charity Scam
                                            Revealed
                                        </li>
                                        <li>Social Media Shenanigans: Fake Cases Exposed</li>
                                        <li>
                                            Victory in the Digital Arena: A Legal Win Against Social Media
                                            Harassment
                                        </li>
                                        <li>
                                            The Inside Story: Investigating the Bank Credit Card Scam
                                        </li>
                                        <li>Heartbreak and Deceit: Unveiling the Romance Scam</li>
                                        <li>Behind the Curtain: The Property Developer Scam Exposed</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="complimentary-lft">
                                <h4>The Great Fraud Fightback</h4>
                                <p>
                                    Discover how the Founder of Wizbizla was scammed by a rogue
                                    Financial Advisor in Dubai and learn how to avoid the same fate.
                                    This gripping tale offers a practical roadmap to help expats
                                    tackle complex legal challenges.
                                </p>
                                <ul className="complimentary-content">
                                    <li>
                                        <span>
                                            <img src="assets/images/complimentary-icon-01.png" alt="" />
                                        </span>
                                        <div>
                                            <h6>
                                                "Landmark court case comes to life in a book" - Gulf News,
                                                Dubai
                                            </h6>
                                        </div>
                                    </li>
                                    <li>
                                        <span>
                                            <img src="assets/images/complimentary-icon-02.png" alt="" />
                                        </span>
                                        <div>
                                            <h6>
                                                "The Great Fraud Fightback: How to protect yourself from
                                                financial advisory fraud" - The National, Abu Dhabi
                                            </h6>
                                        </div>
                                    </li>
                                    <li>
                                        <span>
                                            <img src="assets/images/complimentary-icon-03.png" alt="" />
                                        </span>
                                        <div>
                                            <h6>
                                                "Landmark legal case for thousands of UK citizen" - The
                                                Times, London
                                            </h6>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="text-end">
                                <img src="assets/images/book-img.png" alt="" />
                            </div>
                            <div className="subscribe">
                                <h5>Complimentary</h5>
                                <p>
                                    Claim the first full chapter and exclusive book samples, and arm
                                    yourself with the knowledge to protect against fraud!
                                </p>
                                <div className="subscribe-bx">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        placeholder="Email address"
                                    />
                                    <button className="thm-btn" type="button" onClick={() => buyScamBook()}>
                                        Send
                                    </button>
                                </div>
                            </div>
                            {isMsg && <div className="thank-bx">
                                <span className="far fa-check" />
                                <div>
                                    <h6>Thank You!</h6>
                                    <p>
                                        Your complimentary book sample has been sent to you.Happy
                                        reading!
                                    </p>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </section>
            <section className="faq-sec tp-space pb-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="faq-lft">
                                <h3 className="title">How can we help?</h3>
                                <p>
                                    Wizbizla welcomes the opportunity to assist you with your
                                    marketplace challenge. Whether you need to file a complaint, share
                                    your experience, tell us about a misleading advertisement, or
                                    report a scam, you're in the right place.
                                </p>
                                <img
                                    src="assets/images/faq-img.png"
                                    className="d-none d-lg-block"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="faq-rgt">
                                <div className="accordion" id="accordionExample">
                                    {faqList?.length > 0 &&
                                        faqList?.map((item, key) =>
                                            <div className="accordion-item" key={key}>
                                                <h2 className="accordion-header">
                                                    <button
                                                        className="accordion-button"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target={`#business-${key}`}
                                                        aria-expanded={key === 0 ? "true" : "false"}
                                                    >
                                                        {item?.question}
                                                    </button>
                                                </h2>
                                                <div
                                                    id={`business-${key}`}
                                                    className={`accordion-collapse collapse ${key === 0 ? "show" : ""}`}
                                                    data-bs-parent="#accordionExample"
                                                >
                                                    <div className="accordion-body">
                                                        <div
                                                            dangerouslySetInnerHTML={{ __html: item?.answer }}
                                                        ></div>
                                                        <a href="javascript:void(0);" className="request-btn">
                                                            <i className="far fa-arrow-right me-2" />
                                                            File a Complaint
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>)}
                                    {/* <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#faq-02"
                                            >
                                                I'd like to share an experience about a service provider.
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
                                                <a href="javascript:void(0);" className="request-btn">
                                                    <i className="far fa-arrow-right me-2" />
                                                    File a Complaint
                                                </a>
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
                                                I'd like to share an experience about a service provider.
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
                                                <a href="javascript:void(0);" className="request-btn">
                                                    <i className="far fa-arrow-right me-2" />
                                                    File a Complaint
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#faq-04"
                                            >
                                                I'd like to share an experience about a service provider.
                                            </button>
                                        </h2>
                                        <div
                                            id="faq-04"
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
                                                <a href="javascript:void(0);" className="request-btn">
                                                    <i className="far fa-arrow-right me-2" />
                                                    File a Complaint
                                                </a>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="contact-sec tp-space" id='contactWizbizla'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="contact-lft">
                                <h4 className="title text-white">Connect with Us</h4>
                                <p>
                                    <a href="mailto:hello@wizbizla.com">
                                        <img src="assets/images/mail-01.svg" className="me-2" alt="" />
                                        hello@wizbizla.com
                                    </a>
                                </p>
                                <p>
                                    <a href="tel:97145132019">
                                        <img
                                            src="assets/images/phone-call-01.svg"
                                            className="me-2"
                                            alt=""
                                        />
                                        971 4 513 2019
                                    </a>
                                </p>
                                <div className="contact-social">
                                    <a href={cData?.socialMedia?.linkedin} target="_blank">
                                        <i className="fab fa-linkedin" />
                                    </a>
                                    <a href={cData?.socialMedia?.twitter} target="_blank">
                                        <i className="fab fa-twitter" />
                                    </a>
                                    <a href={cData?.socialMedia?.instagram} target="_blank">
                                        <i className="fab fa-instagram" />
                                    </a>
                                    <a href={cData?.socialMedia?.facebook} target="_blank">
                                        <i className="fab fa-facebook" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="contact-rgt">
                                <form action="" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                            <div className="custom-frm-bx">
                                                <label htmlFor="" className="text-white">
                                                    First name <span>*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    name='firstName'
                                                    className="form-control"
                                                    placeholder="Enter first name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="custom-frm-bx">
                                                <label htmlFor="" className="text-white">
                                                    Last name <span>*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    name='lastName'
                                                    placeholder="Enter Last name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="custom-frm-bx">
                                                <label htmlFor="" className="text-white">
                                                    Email <span>*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    name='email'
                                                    className="form-control"
                                                    placeholder="Enter your email"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="custom-frm-bx">
                                                <label htmlFor="" className="text-white">
                                                    Message <span>*</span>
                                                </label>
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    id=""
                                                    className="form-control"
                                                    placeholder="Enter your message"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="custom-frm-bx">
                                                <button className="thm-btn" type="submit">
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                {cntMsg && <div className="thank-bx">
                                    <span className="far fa-check" />
                                    <div>
                                        <h6>Thank You!</h6>
                                        <p>
                                            Your message has been sent. <br />A member of the Wizbizla
                                            team will contact you shortly.
                                        </p>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default FindProvider
