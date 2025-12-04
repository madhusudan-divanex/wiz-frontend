import React from 'react'
import images from '../assets/images'

function HeaderSecond() {
  return (
    <header className="main-header ">
  <div className="top-bar">
    <p>
      Show expats that you are a trustworthy service provider.{" "}
      <span>Get Accredited</span>
    </p>
  </div>
  <nav className="navbar navbar-expand-lg custom-navbar dark-nav">
    <div className="container">
      <a className="navbar-brand" href="index.html">
        <img src={images.whiteLogo} alt="" />
      </a>
      <button
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
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
          <li className="nav-item dropdown position-static">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Home
            </a>
            <div className="dropdown-menu megamenu">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="dropdown-menu-innr">
                      <h5 className="menu-title">Home</h5>
                      <ul>
                        <li className="dropdown-menu-item">
                          <a href="index.html">
                            <span>
                              <img src={images.menuHome} alt="" />
                            </span>
                            <div>
                              <h6>Home</h6>
                              <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="dropdown-menu-innr">
                      <h5 className="menu-title">Welcome Basket</h5>
                      <ul>
                        <li className="dropdown-menu-item">
                          <a href="javascript:void(0);">
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
                          <a href="javascript:void(0);">
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
          <li className="nav-item dropdown position-static">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              About
            </a>
            <div className="dropdown-menu megamenu">
              <div className="container">
                <div className="row align-items-end">
                  <div className="col-lg-4">
                    <div className="dropdown-menu-innr">
                      <h5 className="menu-title">Blogs</h5>
                      <ul>
                        <li className="dropdown-menu-item">
                          <a href="javascript:void(0);">
                            <span>
                              <img src={images.listViewCircle} alt="" />
                            </span>
                            <div>
                              <h6>Blogs</h6>
                              <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </a>
                        </li>
                        <li className="dropdown-menu-item">
                          <a href="corporate-philosophy.html">
                            <span>
                              <img src={images.donate} alt="" />
                            </span>
                            <div>
                              <h6>Corporate Philosophy &amp; Values</h6>
                              <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </a>
                        </li>
                        <li className="dropdown-menu-item">
                          <a href="javascript:void(0);">
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
                          <a href="javascript:void(0);">
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
                          <a href="javascript:void(0);">
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
                        <li className="dropdown-menu-item">
                          <a href="javascript:void(0);">
                            <span>
                              <img src={images.userCircle} alt="" />
                            </span>
                            <div>
                              <h6>Benefits for Consumers Using Wizbizla</h6>
                              <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </a>
                        </li>
                        <li className="dropdown-menu-item">
                          <a href="javascript:void(0);">
                            <span>
                              <img src={images.userRectangle} alt="" />
                            </span>
                            <div>
                              <h6>
                                Benefits for Service Providers with Wizbizla
                              </h6>
                              <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </a>
                        </li>
                        <li className="dropdown-menu-item">
                          <a href="javascript:void(0);">
                            <span>
                              <img src={images.information} alt="" />
                            </span>
                            <div>
                              <h6>
                                Behind the Name Wizbizla: A Purposeful Choice
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
                      <h5 className="menu-title">Wizbizla in Media</h5>
                      <ul>
                        <li className="dropdown-menu-item">
                          <a href="podcast.html">
                            <span>
                              <img src={images.microphone} alt="" />
                            </span>
                            <div>
                              <h6>Expats in Dubai Podcast</h6>
                              <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </a>
                        </li>
                        <li className="dropdown-menu-item">
                          <a href="about-wizbizla.html">
                            <span>
                              <img src={images.bookIcon} alt="" />
                            </span>
                            <div>
                              <h6>The Story Behind Wizbizla</h6>
                              <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </a>
                        </li>
                        <li className="dropdown-menu-item">
                          <a href="javascript:void(0);">
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
                          <a href="javascript:void(0);">
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
          <li className="nav-item dropdown position-static">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Our Services
            </a>
            <div className="dropdown-menu megamenu">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="dropdown-menu-innr">
                      <h5 className="menu-title">Memberships</h5>
                      <ul>
                        <li className="dropdown-menu-item">
                          <a href="wizbizla-membership.html">
                            <span>
                              <img src={images.briefcase} alt="" />
                            </span>
                            <div>
                              <h6>Business Memberships</h6>
                              <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </a>
                        </li>
                        <li className="dropdown-menu-item">
                          <a href="consumer-membership.html">
                            <span>
                              <img src={images.editIcon} alt="" />
                            </span>
                            <div>
                              <h6>Customer Memberships</h6>
                              <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="dropdown-menu-innr">
                      <h5 className="menu-title">Premium Services</h5>
                      <ul>
                        <li className="dropdown-menu-item">
                          <a href="bespoke-concierge.html">
                            <span>
                              <img src={images.landscape} alt="" />
                            </span>
                            <div>
                              <h6>Bespoke Concierge</h6>
                              <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </a>
                        </li>
                        <li className="dropdown-menu-item">
                          <a href="bespoke-concierge.html">
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
                          <a href="loyalty-rewards.html">
                            <span>
                              <img src={images.ticket} alt="" />
                            </span>
                            <div>
                              <h6>Loyalty Rewards Program</h6>
                              <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="dropdown-menu-innr">
                      <h5 className="menu-title">Processes</h5>
                      <ul>
                        <li className="dropdown-menu-item">
                          <a href="accreditation-process.html">
                            <span>
                              <img src={images.diploma} alt="" />
                            </span>
                            <div>
                              <h6>Accreditation Process</h6>
                              <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </a>
                        </li>
                        <li className="dropdown-menu-item">
                          <a href="dispute-resolution-process.html">
                            <span>
                              <img src={images.chatAccept} alt="" />
                            </span>
                            <div>
                              <h6>Dispute Resolution Process</h6>
                              <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </a>
                        </li>
                        <li className="dropdown-menu-item">
                          <a href="business-profile.html">
                            <span>
                              <img src={images.briefcase01} alt="" />
                            </span>
                            <div>
                              <h6>How do I complete the Business Profile</h6>
                              <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </a>
                        </li>
                        <li className="dropdown-menu-item">
                          <a href="reference-programme.html">
                            <span>
                              <img src={images.userAdd} alt="" />
                            </span>
                            <div>
                              <h6>Reference Program</h6>
                              <p>Request a Trusted Reference</p>
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
          <li className="nav-item dropdown position-static">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Scam Prevention
            </a>
            <div className="dropdown-menu megamenu">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="dropdown-menu-innr">
                      <h5 className="menu-title">Scam Tool</h5>
                      <ul>
                        <li className="dropdown-menu-item">
                          <a href="scam-prevention.html">
                            <span>
                              <img src={images.shieldCheck} alt="" />
                            </span>
                            <div>
                              <h6>Scam Prevention </h6>
                              <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </a>
                        </li>
                        <li className="dropdown-menu-item">
                          <a href="scam-tracker.html">
                            <span>
                              <img src={images.stopwatchCheck} alt="" />
                            </span>
                            <div>
                              <em className="coming-badge">Coming Soon</em>
                              <h6>Scam Tracker</h6>
                            </div>
                          </a>
                        </li>
                        <li className="dropdown-menu-item">
                          <a href="scam-tip.html">
                            <span>
                              <img src={images.training} alt="" />
                            </span>
                            <div>
                              <h6>Scam Tip </h6>
                              <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </a>
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
                          <a href="scam-report-form.html">
                            <span>
                              <img src={images.invoice} alt="" />
                            </span>
                            <div>
                              <h6>Report a Scam</h6>
                              <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </a>
                        </li>
                        <li className="dropdown-menu-item">
                          <a href="scam-alert.html">
                            <span>
                              <img src={images.chatNotification} alt="" />
                            </span>
                            <div>
                              <h6>Scam Alert</h6>
                              <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="dropdown-menu-innr">
                      <h5 className="menu-title">Case Studies</h5>
                      <ul>
                        <li className="dropdown-menu-item">
                          <a href="case-studies.html">
                            <span>
                              <img src={images.search02} alt="" />
                            </span>
                            <div>
                              <h6>Case Studies</h6>
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
          <li className="nav-item dropdown position-static">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Support
            </a>
            <div className="dropdown-menu megamenu">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="dropdown-menu-innr">
                      <h5 className="menu-title">Support</h5>
                      <ul>
                        <li className="dropdown-menu-item">
                          <a href="javascript:void(0);">
                            <span>
                              <img src={images.mailNotification} alt="" />
                            </span>
                            <div>
                              <h6>Dispute Resolution</h6>
                              <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </a>
                        </li>
                        <li className="dropdown-menu-item">
                          <a href="javascript:void(0);">
                            <span>
                              <img src={images.chatting} alt="" />
                            </span>
                            <div>
                              <h6>Contact Wizbizla</h6>
                              <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="dropdown-menu-innr">
                      <h5 className="menu-title">Standards</h5>
                      <ul>
                        <li className="dropdown-menu-item">
                          <a href="standards-excellence.html">
                            <span>
                              <img src={images.bookCheck} alt="" />
                            </span>
                            <div>
                              <h6>Standards for Excellence pages</h6>
                              <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="dropdown-menu-innr">
                      <h5 className="menu-title">FAQ</h5>
                      <ul>
                        <li className="dropdown-menu-item">
                          <a href="faq.html">
                            <span>
                              <img src={images.helpIcon} alt="" />
                            </span>
                            <div>
                              <h6>Frequently Asked Questions</h6>
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
        </ul>
        <div className="navigation-drop">
          <button className="drop-btn" type="button">
            <img src={images.avatar} alt="" />
          </button>
          <div className="navigation-bar">
            <ul className="navigation-menu">
              <li className="navigation-menu-item">
                <a href="javascript:void(0);" className="navigation-menu-link">
                  <i className="bi bi-window me-2" />
                  Dashboard
                </a>
              </li>
              <li className="navigation-menu-item">
                <a href="javascript:void(0);" className="navigation-menu-link">
                  <i className="fal fa-file-edit me-2" />
                  Posting History
                </a>
              </li>
              <li className="navigation-menu-item">
                <a href="javascript:void(0);" className="navigation-menu-link">
                  <i className="far fa-lightbulb me-2" />
                  Advertisement
                </a>
              </li>
              <li className="divider" />
              <li className="navigation-menu-item">
                <a href="javascript:void(0);" className="navigation-menu-link">
                  <i className="far fa-comments me-2" />
                  Conversations
                </a>
              </li>
              <li className="navigation-menu-item">
                <a href="javascript:void(0);" className="navigation-menu-link">
                  <i className="far fa-bookmark me-2" />
                  Bookmarks
                </a>
              </li>
              <li className="navigation-menu-item">
                <a href="javascript:void(0);" className="navigation-menu-link">
                  <i className="far fa-star me-2" /> Customer Rating
                </a>
              </li>
              <li className="divider" />
              <li className="navigation-menu-item">
                <a href="javascript:void(0);" className="navigation-menu-link">
                  <i className="far fa-thumbs-up me-2" />
                  Recommendations
                </a>
              </li>
              <li className="navigation-menu-item">
                <a href="javascript:void(0);" className="navigation-menu-link">
                  <i className="far fa-book-open me-2" /> Loyalty Rewards Point
                  Programme
                </a>
              </li>
              <li className="navigation-menu-item">
                <a href="javascript:void(0);" className="navigation-menu-link">
                  <i className="far fa-address-book me-2" />
                  Bespoke Concierge Requests
                </a>
              </li>
              <li className="navigation-menu-item">
                <a href="javascript:void(0);" className="navigation-menu-link">
                  <i className="far fa-file-alt me-2" />
                  Customized Due Diligence Requests
                </a>
              </li>
              <li className="navigation-menu-item">
                <a href="javascript:void(0);" className="navigation-menu-link">
                  <i className="bi bi-receipt me-2" />
                  EventsRequests
                </a>
              </li>
              <li className="navigation-menu-item">
                <a href="javascript:void(0);" className="navigation-menu-link">
                  <i className="fas fa-list me-2" />
                  Service Disputes
                </a>
              </li>
              <li className="divider" />
              <li className="navigation-menu-item">
                <a href="javascript:void(0);" className="navigation-menu-link">
                  <i className="fas fa-link me-2" />
                  References
                </a>
              </li>
              <li className="navigation-menu-item">
                <a href="javascript:void(0);" className="navigation-menu-link">
                  <i className="far fa-home me-2" />
                  Billing
                </a>
              </li>
              <li className="navigation-menu-item">
                <a href="javascript:void(0);" className="navigation-menu-link">
                  <i className="bi bi-bar-chart me-2" />
                  Analytics
                </a>
              </li>
              <li className="navigation-menu-item">
                <a href="javascript:void(0);" className="navigation-menu-link">
                  <i className="far fa-user me-2" />
                  Personal Information
                </a>
              </li>
              <li className="navigation-menu-item">
                <a href="javascript:void(0);" className="navigation-menu-link">
                  <i className="fas fa-cog me-2" />
                  Account Settings
                </a>
              </li>
              <li className="divider" />
              <li className="navigation-menu-item">
                <a href="javascript:void(0);" className="navigation-menu-link">
                  <i className="far fa-sign-out me-2" />
                  Log out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</header>

  )
}

export default HeaderSecond
