import React, { useEffect, useRef, useState } from "react";
import images from "../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchProfileData, fetchUserData, fetchUserProfile, setUserData } from "../redux/features/userSlice";
import { toast } from "react-toastify";
import { getSecureApiData } from "../services/api";
import base_url from "../baseUrl";

function Header() {
  const location = useLocation();
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  // const [userProfile, setUserProfile] = useState()
  const [dashboardMenu, setDashboardMenu] = useState(false)
  const navigate = useNavigate()
  const { profileData, membershipData,userProfile } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchProfileData())
  }, [dispatch]);

  const [isDropdownOpen, setIsDropdownOpen] = useState({
    home: false,
    about: false,
  });

  // Function to toggle dropdown visibility
  const toggleDropdown = (menu) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownClick = (menu) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".nav-item.dropdown")) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Disable Bootstrap hover behavior (in case Bootstrap JS is active)
  useEffect(() => {
    const dropdowns = document.querySelectorAll('[data-bs-toggle="dropdown"]');
    dropdowns.forEach((el) => el.removeAttribute("data-bs-toggle"));
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  async function handleLogout() {
    try {
      navigate('/')      
      localStorage.clear()
      sessionStorage.clear()
      dispatch(setUserData({}))
    } catch (error) {
      console.log(error)
    }
  }

  const dropRef = useRef(null);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropRef.current && !dropRef.current.contains(event.target)) {
        setDashboardMenu(false);
      }
    };

    if (dashboardMenu) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dashboardMenu]);

  async function getUserProfile() {
    if(!userId){
      return
    }
    try {
      const result = profileData.role == 'provider'
        ? await getSecureApiData(`api/provider/profile-get/${userId}`)
        : await getSecureApiData(`api/consumer/profile/${userId}`);
      if (result.status) {
        // setUserProfile(result.data);
      } else {
        // maybe handle unsuccessful status here
      }
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    if (userId && profileData?.role) {
      getUserProfile();
    }
  }, [userId, profileData?.role,dispatch]);

  return (

    <header className="main-header sticky-header">
      <div className="top-bar">
        <p>
          Show expats that you are a trustworthy service provider.{" "}
          <span>Get Accredited</span>
        </p>
      </div>

      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container px-lg-0">
          <a className="navbar-brand" href="#">
            <img src={images.whiteLogo} alt="" />
          </a>

          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button> */}

          <button
            className={`navbar-toggler ${menuOpen ? "collapsed" : ""}`}
            type="button"
            aria-expanded={menuOpen ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>


          <div
            className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {/* ==== HOME DROPDOWN ==== */}
              <li
                className={`nav-item dropdown position-static ${activeDropdown === "home" ? "show" : ""
                  }`}
              >
                <a
                  href="#"
                  className="nav-link dropdown-toggle "
                  onClick={(e) => {
                    e.preventDefault();
                    handleDropdownClick("home");
                  }}
                >
                  Home
                </a>

                <div
                  className={`dropdown-menu megamenu ${activeDropdown === "home" ? "show" : ""
                    }`}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="dropdown-menu-innr">
                          <h5 className="menu-title">Home</h5>
                          <ul>
                            <li className="dropdown-menu-item">
                              <Link to="/">
                                <span>
                                  <img src={images.menuHome} alt="" />
                                </span>
                                <div>
                                  <h6>Home</h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <div className="dropdown-menu-innr">
                          <h5 className="menu-title">Welcome Basket</h5>
                          <ul>
                            <li className="dropdown-menu-item">
                              <a href="#" onClick={(e) => { e.preventDefault(); /* Your logic here */ }}>
                                <span>
                                  <img src={images.badgePercent} alt="" />
                                </span>
                                <div>
                                  <h6>Promotions</h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </a>
                            </li>
                            <li className="dropdown-menu-item">
                              <a href="#" onClick={(e) => { e.preventDefault(); /* Your logic here */ }}>
                                <span>
                                  <img src={images.shoppingBasket} alt="" />
                                </span>
                                <div>
                                  <h6>Welcome Basket</h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li
                className={`nav-item dropdown position-static ${activeDropdown === "about" ? "show" : ""
                  }`}
              >
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDropdownClick("about");
                  }}
                >
                  About
                </a>
                <div
                  className={`dropdown-menu megamenu ${activeDropdown === "about" ? "show" : ""
                    }`}
                >
                  <div className="container">
                    <div className="row align-items-end">
                      <div className="col-lg-4">
                        <div className="dropdown-menu-innr">
                          <h5 className="menu-title">Blogs</h5>
                          <ul>
                            <li className="dropdown-menu-item">
                              <Link to='/blog'>
                                <span>
                                  <img src={images.listViewCircle} alt="" />
                                </span>
                                <div>
                                  <h6>Blogs</h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </Link>
                            </li>
                            <li className="dropdown-menu-item">
                              <Link to="/mission-vision">
                                <span>
                                  <img src={images.donate} alt="" />
                                </span>
                                <div>
                                  <h6>Corporate Philosophy &amp; Values</h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </Link>
                            </li>
                            <li className="dropdown-menu-item">
                              <a href="#" onClick={(e) => { e.preventDefault(); /* Your logic here */ }}>
                                <span>
                                  <img src={images.mapPeople} alt="" />
                                </span>
                                <div>
                                  <h6>
                                    {" "}
                                    Wizbizla: A Crucial Service for UAE's Expat
                                    Community
                                  </h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </a>
                            </li>
                            <li className="dropdown-menu-item">
                              <a href="#" onClick={(e) => { e.preventDefault(); /* Your logic here */ }}>
                                <span>
                                  <img src={images.medicalInformation} alt="" />
                                </span>
                                <div>
                                  <h6>
                                    Enhancing Value for Consumers and Service
                                    Providers
                                  </h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="dropdown-menu-innr">
                          <ul>
                            <li className="dropdown-menu-item">
                              <a href="#" onClick={(e) => { e.preventDefault(); /* Your logic here */ }}>
                                <span>
                                  <img
                                    src="assets/images/header/medical-information.svg"
                                    alt=""
                                  />
                                </span>
                                <div>
                                  <h6>
                                    Enhancing Value for Consumers and Service
                                    Providers
                                  </h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </a>
                            </li>
                            <li className="dropdown-menu-item">
                              <Link to="/consumer-membership-benefit">
                                <span>
                                  <img
                                    src="assets/images/header/user-circle.svg"
                                    alt=""
                                  />
                                </span>
                                <div>
                                  <h6>Benefits for Consumers Using Wizbizla</h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </Link>
                            </li>
                            <li className="dropdown-menu-item">
                              <Link to="/provider-membership-benefit">
                                <span>
                                  <img
                                    src="assets/images/header/user-rectangle.svg"
                                    alt=""
                                  />
                                </span>
                                <div>
                                  <h6>
                                    Benefits for Service Providers with Wizbizla
                                  </h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </Link>
                            </li>
                            <li className="dropdown-menu-item">
                              <Link to="/about-wizbizla">
                                <span>
                                  <img
                                    src="assets/images/header/information.svg"
                                    alt=""
                                  />
                                </span>
                                <div>
                                  <h6>
                                    Behind the Name Wizbizla: A Purposeful
                                    Choice
                                  </h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="dropdown-menu-innr">
                          <h5 className="menu-title">Wizbizla in Media</h5>
                          <ul>
                            <li className="dropdown-menu-item">
                              <Link to="/podcast">
                                <span>
                                  <img src={images.microphone} alt="" />
                                </span>
                                <div>
                                  <h6>Expats in Dubai Podcast</h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </Link>
                            </li>
                            <li className="dropdown-menu-item">
                              <Link to="/about-wizbizla">
                                <span>
                                  <img src={images.bookIcon} alt="" />
                                </span>
                                <div>
                                  <h6>The Story Behind Wizbizla</h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </Link>
                            </li>
                            <li className="dropdown-menu-item">
                              <a href="#" onClick={(e) => { e.preventDefault(); /* Your logic here */ }}>
                                <span>
                                  <img src={images.trophy} alt="" />
                                </span>
                                <div>
                                  <h6>The Great Fraud Fightback</h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </a>
                            </li>
                            <li className="dropdown-menu-item">
                              <a href="#" onClick={(e) => { e.preventDefault(); /* Your logic here */ }}>
                                <span>
                                  <img src={images.smartTv} alt="" />
                                </span>
                                <div>
                                  <h6>In the Media</h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li
                className={`nav-item dropdown position-static ${activeDropdown === "services" ? "show" : ""
                  }`}
              >
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDropdownClick("services");
                  }}
                >
                  Our Services
                </a>

                <div
                  className={`dropdown-menu megamenu ${activeDropdown === "services" ? "show" : ""
                    }`}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="dropdown-menu-innr">
                          <h5 className="menu-title">Memberships</h5>
                          <ul>
                            <li className="dropdown-menu-item">
                              <Link to="/provider-membership-benefit">
                                <span>
                                  <img src={images.briefcase} alt="" />
                                </span>
                                <div>
                                  <h6>Business Memberships</h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </Link>
                            </li>
                            <li className="dropdown-menu-item">
                              <Link to="/consumer-membership-benefit">
                                <span>
                                  <img src={images.editIcon} alt="" />
                                </span>
                                <div>
                                  <h6>Customer Memberships</h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="dropdown-menu-innr">
                          <h5 className="menu-title">Premium Services</h5>
                          <ul>
                            <li className="dropdown-menu-item">
                              <Link to="/bespoke-concierge">
                                <span>
                                  <img src={images.landscape} alt="" />
                                </span>
                                <div>
                                  <h6>Bespoke Concierge</h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </Link>
                            </li>
                            <li className="dropdown-menu-item">
                              <a href="#" onClick={(e) => { e.preventDefault(); /* Your logic here */ }}>
                                <span>
                                  <img src={images.tableLamp} alt="" />
                                </span>
                                <div>
                                  <h6>Customized Due Diligence</h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </a>
                            </li>
                            <li className="dropdown-menu-item">
                              <Link to="/loyalty-rewards">
                                <span>
                                  <img src={images.ticket} alt="" />
                                </span>
                                <div>
                                  <h6>Loyalty Rewards Program</h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="dropdown-menu-innr">
                          <h5 className="menu-title">Processes</h5>
                          <ul>
                            <li className="dropdown-menu-item">
                              <Link to="/accreditation-process">
                                <span>
                                  <img src={images.diploma} alt="" />
                                </span>
                                <div>
                                  <h6>Accreditation Process</h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </Link>
                            </li>
                            <li className="dropdown-menu-item">
                              <Link href="/dispute-resolution">
                                <span>
                                  <img src={images.chatAccept} alt="" />
                                </span>
                                <div>
                                  <h6>Dispute Resolution Process</h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </Link>
                            </li>
                            <li className="dropdown-menu-item">
                              <Link to='/how-complete-business-profile'>
                                <span>
                                  <img src={images.briefcase01} alt="" />
                                </span>
                                <div>
                                  <h6>
                                    How do I complete the Business Profile
                                  </h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </Link>
                            </li>
                            <li className="dropdown-menu-item">
                              <Link to="/reference-programme">
                                <span>
                                  <img src={images.userAdd} alt="" />
                                </span>
                                <div>
                                  <h6>Reference Program</h6>
                                  <p>Request a Trusted Reference</p>
                                </div>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li
                className={`nav-item dropdown position-static ${activeDropdown === "scam" ? "show" : ""
                  }`}
              >
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDropdownClick("scam");
                  }}
                >
                  Scam Prevention
                </a>

                <div
                  className={`dropdown-menu megamenu ${activeDropdown === "scam" ? "show" : ""
                    }`}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="dropdown-menu-innr">
                          <h5 className="menu-title">Scam Tool</h5>
                          <ul>
                            <li className="dropdown-menu-item">
                              <Link to="/scam-prevention" >
                                <span>
                                  <img src={images.shieldCheck} alt="" />
                                </span>
                                <div>
                                  <h6>Scam Prevention </h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </Link>
                            </li>
                            <li className="dropdown-menu-item">
                              <Link to="/scam-tracker" >
                                <span>
                                  <img src={images.stopwatchCheck} alt="" />
                                </span>
                                <div>
                                  <em className="coming-badge">Coming Soon</em>
                                  <h6>Scam Tracker</h6>
                                </div>
                              </Link>
                            </li>
                            <li className="dropdown-menu-item">
                              <Link to='/scam-tips'>
                                <span>
                                  <img src={images.training} alt="" />
                                </span>
                                <div>
                                  <h6>Scam Tip </h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="dropdown-menu-innr">
                          <h5 className="menu-title">
                            Scam Alerts &amp; Report Scams
                          </h5>
                          <ul>
                            <li className="dropdown-menu-item">
                              <Link to="/report-scam">
                                <span>
                                  <img src={images.invoice} alt="" />
                                </span>
                                <div>
                                  <h6>Report a Scam</h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </Link>
                            </li>
                            <li className="dropdown-menu-item">
                              <Link to="/scam-alert">
                                <span>
                                  <img src={images.chatNotification} alt="" />
                                </span>
                                <div>
                                  <h6>Scam Alert</h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="dropdown-menu-innr">
                          <h5 className="menu-title">Case Studies</h5>
                          <ul>
                            <li className="dropdown-menu-item">
                              <Link to="/case-study">
                                <span>
                                  <img src={images.search02} alt="" />
                                </span>
                                <div>
                                  <h6>Case Studies</h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li
                className={`nav-item dropdown position-static ${activeDropdown === "support" ? "show" : ""
                  }`}
              >
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDropdownClick("support");
                  }}
                >
                  Support
                </a>

                <div
                  className={`dropdown-menu megamenu ${activeDropdown === "support" ? "show" : ""
                    }`}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="dropdown-menu-innr">
                          <h5 className="menu-title">Support</h5>
                          <ul>
                            <li className="dropdown-menu-item">
                              <Link to="/dispute-resolution">
                                <span>
                                  <img src={images.mailNotification} alt="" />
                                </span>
                                <div>
                                  <h6>Dispute Resolution</h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </Link>
                            </li>
                            <li className="dropdown-menu-item">
                              <Link to={`/find-provider#contactWizbizla`}>
                                <span>
                                  <img src={images.chatting} alt="" />
                                </span>
                                <div>
                                  <h6>Contact Wizbizla</h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="dropdown-menu-innr">
                          <h5 className="menu-title">Standards</h5>
                          <ul>
                            <li className="dropdown-menu-item">
                              <Link to='/standards-excellence'>
                                <span>
                                  <img src={images.bookCheck} alt="" />
                                </span>
                                <div>
                                  <h6>Standards for Excellence pages</h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="dropdown-menu-innr">
                          <h5 className="menu-title">FAQ</h5>
                          <ul>
                            <li className="dropdown-menu-item">
                              <Link to="/faq" >
                                <span>
                                  <img src={images.helpIcon} alt="" />
                                </span>
                                <div>
                                  <h6>Frequently Asked Questions</h6>
                                  <p>Lorem ipsum dolor sit amet</p>
                                </div>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {/* ==== END HOME ==== */}
            </ul>

            {(!token || token == 'null') ? <div className="navigation-btn">
              <Link to="/login" className="me-1">
                Sign In
              </Link>
              <Link to="/">Sign Up</Link>
            </div> :
              <>
                <div className="navigation-btn me-2">
                  <button type="button" onClick={() => handleLogout()}>Logout</button>
                </div>
                <div className="navigation-drop" ref={dropRef}>
                  <button className={`drop-btn ${dashboardMenu ? 'show' : ''}`} type="button" onClick={() => setDashboardMenu(!dashboardMenu)}>
                    <img src={userProfile?.profileImage ? `${base_url}/${userProfile.profileImage}` : images.avatar} alt="" />
                  </button>
                  {dashboardMenu &&
                    profileData.role=='provider'?<div className={`navigation-bar ${dashboardMenu ? 'd-block' : ''}`}>
                      <ul className="navigation-menu">
                        <li className="navigation-menu-item">
                          <Link to="/provider/dashboard" className="navigation-menu-link">
                            <i className="bi bi-window me-2" />
                            Dashboard
                          </Link>
                        </li>
                        <li className="navigation-menu-item">
                          <Link to="/provider/posting-history" className="navigation-menu-link">
                            <i className="fal fa-file-edit me-2" />
                            Posting History
                          </Link>
                        </li>
                        <li className="navigation-menu-item">
                          <Link to="/provider/advertisement" className="navigation-menu-link">
                            <i className="far fa-lightbulb me-2" />
                            Advertisement
                          </Link>
                        </li>
                        <li className="divider" />
                        <li className="navigation-menu-item">
                          <Link to="/provider/chat" className="navigation-menu-link">
                            <i className="far fa-comments me-2" />
                            Conversations
                          </Link>
                        </li>
                        <li className="navigation-menu-item">
                          <Link to="/provider/bookmark" className="navigation-menu-link">
                            <i className="far fa-bookmark me-2" />
                            Bookmarks
                          </Link>
                        </li>
                        <li className="navigation-menu-item">
                          <Link to="/provider/customer-rating" className="navigation-menu-link">
                            <i className="far fa-star me-2" /> Customer Rating
                          </Link>
                        </li>
                        <li className="divider" />
                        <li className="navigation-menu-item">
                          <Link to="" className="navigation-menu-link">
                            <i className="far fa-thumbs-up me-2" />
                            Recommendations
                          </Link>
                        </li>
                        <li className="navigation-menu-item">
                          <Link to="/provider/loyality" className="navigation-menu-link">
                            <i className="far fa-book-open me-2" /> Loyalty Rewards Point
                            Programme
                          </Link>
                        </li>
                        {/* <li className="navigation-menu-item">
                          <Link to="" className="navigation-menu-link">
                            <i className="far fa-address-book me-2" />
                            Bespoke Concierge Requests
                          </Link>
                        </li> */}
                        <li className="navigation-menu-item">
                          <Link to="" className="navigation-menu-link">
                            <i className="far fa-file-alt me-2" />
                            Customized Due Diligence Requests
                          </Link>
                        </li>
                        {/* <li className="navigation-menu-item">
                          <Link to="" className="navigation-menu-link">
                            <i className="bi bi-receipt me-2" />
                            EventsRequests
                          </Link>
                        </li> */}
                        <li className="navigation-menu-item">
                          <Link to="/provider/add-on" className="navigation-menu-link">
                            <i className="fas fa-list me-2" />
                            Service Disputes
                          </Link>
                        </li>
                        <li className="divider" />
                        {membershipData?.membershipId?.topChoice && <li className="navigation-menu-item">
                          <Link to="/provider/references" className="navigation-menu-link">
                            <i className="fas fa-link me-2" />
                            References
                          </Link>
                        </li>}
                        <li className="navigation-menu-item">
                          <Link to="/provider/billing" className="navigation-menu-link">
                            <i className="far fa-home me-2" />
                            Billing
                          </Link>
                        </li>
                        <li className="navigation-menu-item">
                          <Link to="/provider/analytics" className="navigation-menu-link">
                            <i className="bi bi-bar-chart me-2" />
                            Analytics
                          </Link>
                        </li>
                        <li className="navigation-menu-item">
                          <Link to="/provider/edit-profile" className="navigation-menu-link">
                            <i className="far fa-user me-2" />
                            Personal Information
                          </Link>
                        </li>
                        <li className="navigation-menu-item">
                          <Link to="/provider/setting" className="navigation-menu-link">
                            <i className="fas fa-cog me-2" />
                            Account Settings
                          </Link>
                        </li>
                        <li className="divider" />
                        <li className="navigation-menu-item">
                          <button type="button" onClick={() => handleLogout()} className="navigation-menu-link">
                            <i className="far fa-sign-out me-2" />
                            Log out
                          </button>
                        </li>
                      </ul>
                    </div>:
                    <div className={`navigation-bar ${dashboardMenu ? 'd-block' : ''}`}>
                      <ul className="navigation-menu">
                        <li className="navigation-menu-item">
                          <Link to="/consumer/dashboard" className="navigation-menu-link">
                            <i className="bi bi-window me-2" />
                            Dashboard
                          </Link>
                        </li>
                        <li className="navigation-menu-item">
                          <Link to="/consumer/posting-history" className="navigation-menu-link">
                            <i className="fal fa-file-edit me-2" />
                            Posting History
                          </Link>
                        </li>
                        <li className="divider" />
                        <li className="navigation-menu-item">
                          <Link to="/consumer/chat" className="navigation-menu-link">
                            <i className="far fa-comments me-2" />
                            Conversations
                          </Link>
                        </li>
                        <li className="navigation-menu-item">
                          <Link to="/consumer/bookmark" className="navigation-menu-link">
                            <i className="far fa-bookmark me-2" />
                            Bookmarks
                          </Link>
                        </li>
                        <li className="navigation-menu-item">
                          <Link to="/consumer/rating" className="navigation-menu-link">
                            <i className="far fa-star me-2" /> Customer Rating
                          </Link>
                        </li>
                        <li className="divider" />
                        {/* <li className="navigation-menu-item">
                          <Link to="/consumer/rating" className="navigation-menu-link">
                            <i className="far fa-thumbs-up me-2" />
                            Recommendations
                          </Link>
                        </li> */}
                        {/* <li className="navigation-menu-item">
                          <Link to="" className="navigation-menu-link">
                            <i className="far fa-address-book me-2" />
                            Bespoke Concierge Requests
                          </Link>
                        </li> */}
                        <li className="navigation-menu-item">
                          <Link to="/consumer/service" className="navigation-menu-link">
                            <i className="fas fa-list me-2" />
                            Service Disputes
                          </Link>
                        </li>
                        <li className="divider" />
                        <li className="navigation-menu-item">
                          <Link to="/consumer/profile" className="navigation-menu-link">
                            <i className="fas fa-cog me-2" />
                            Account Settings
                          </Link>
                        </li>
                        <li className="divider" />
                        <li className="navigation-menu-item">
                          <button type="button" onClick={() => handleLogout()} className="navigation-menu-link">
                            <i className="far fa-sign-out me-2" />
                            Log out
                          </button>
                        </li>
                      </ul>
                    </div>}
                </div>
              </>
            }
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
