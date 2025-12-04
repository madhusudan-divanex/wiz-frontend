import React, { useEffect, useState } from 'react'
import images from '../../../assets/images'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { getSecureApiData } from '../../../services/api';
import { toast } from 'react-toastify';
import base_url from '../../../baseUrl';
function Sidebar() {
  const location = useLocation();
  const userId = localStorage.getItem('userId')
  const [userProfile, setUserProfile] = useState()
  const path = location.pathname?.replace('/provider/', '');
  async function getUserProfile() {
    try {
      const result = await getSecureApiData(`api/provider/profile-get/${userId}`)
      if (result.status) {
        setUserProfile(result.data)
      } else {
      }
    } catch (error) {
      toast.error(error)
    }
  }
  useEffect(() => {
    getUserProfile()
  }, [userId])
  return (
    <div className='col-lg-2 px-lg-0'>
      <div className="left-dashboar-sidebar">
      <div className="navigation-bars dash-left-navi-bar">
        <ul className="navigation-menu">
          <li className="navigation-menu-item">
            <Link
              to="/provider/dashboard"
              className={`navigation-menu-link ${path === "dashboard" ? "active" : ""
                }`}
            >
              <i className="bi bi-window me-2" />
              {/* <i class="fa-solid fa-credit-card me-2"></i> */}
              {" "}Dashboard
            </Link>
          </li>

          <li className="navigation-menu-item">
            <Link
              to="/provider/posting-history"
              className={`navigation-menu-link ${path === "posting-history" ? "active" : ""
                }`}
            >
              <i className=" fa-regular fa-file me-2" />
              Posting History
            </Link>
          </li>

          <li className="navigation-menu-item">
            <Link
              to="/provider/loyality"
              className={`navigation-menu-link locaylti-ward ${path === "loyality" ? "active" : ""
                }`}
            >
              <i className="fas fa-book-medical me-2" />
              Refer a Service Provider
            </Link>
          </li>
          <li className="navigation-menu-item">
            <Link to='/provider/advertisement' className={`navigation-menu-link ${path === "advertisement" ? "active" : ""
              }`}>
              <i className="far fa-lightbulb me-2" />
              Advertisement
            </Link>
          </li>
          <li className="navigation-menu-item pb-2">
            <Link to='/provider/bookmark' className={`navigation-menu-link ${path === "bookmark" ? "active" : ""
              }`}>
              <i className="far fa-bookmark me-2" />
              My Bookmarks
            </Link>
          </li>
          <li className="divider" />
          <li className="navigation-menu-item pt-2">
            <Link to='/provider/reference-request'
              className={`navigation-menu-link  ${path === "reference-request" ? "active" : ""
                }`}
            >
              <i className="fas fa-link me-2" />
              Reference Requests
            </Link>
          </li>
          <li className="navigation-menu-item">
            <Link to='/provider/customer-rating'
              className={`navigation-menu-link  ${path === "customer-rating" ? "active" : ""
                }`}
            >
              <i className="far fa-star me-2" /> Ratings
            </Link>
          </li>
          <li className="navigation-menu-item pb-2">
            <Link to='/provider/feedback'
              className={`navigation-menu-link  ${path === "feedback" ? "active" : ""
                }
          `}>
              <i className="fa-regular fa-comment-dots me-2" /> Share your Feedback
            </Link>
          </li>
          <li className="divider" />
          <li className="navigation-menu-item  pt-2">
            <Link to='/provider/chat' className={`navigation-menu-link ${path === "chat" ? "active" : ""
              }`}>
              <i className="fa-regular fa-comments me-2" />
              My Chats
            </Link>
          </li>
          <li className="navigation-menu-item pb-2">
            <Link to='/provider/add-on' className={`navigation-menu-link ${path === "add-on" ? "active" : ""
              }`}>
              <i class="fa-solid fa-chart-simple me-2 border-2"></i> Service Disputes
            </Link>
          </li>
          <li className="divider" />
          <li className="navigation-menu-item pt-2">
            <Link to='/provider/purchase' className={`navigation-menu-link ${path === "purchase" ? "active" : ""
              }`}>
              <i className="fas fa-cart-shopping me-2" />
              My Purchases
            </Link>
          </li>
          <li className="navigation-menu-item pb-2">
            <Link to='/provider/notification' className={`navigation-menu-link ${path === "notification" ? "active" : ""
              }`}>
              <i className="fa-regular fa-bell me-2" />
              Notification
            </Link>
          </li>
          <li className="divider" />
          <li className="navigation-menu-item pt-2">
            <Link to='/provider/references'
              className={`navigation-menu-link  ${path === "references" ? "active" : ""
                }`}
            >
              <i className="fas fa-link me-2" />
              References
            </Link>
          </li>
          <li className="navigation-menu-item">
            <Link to='/provider/analytics'
              className={`navigation-menu-link " ${path === "analytics" ? "active" : ""
                }`}
            >
              <i class="fa-solid fa-chart-simple me-2"></i>
              Analytics
            </Link>
          </li>
          <li className="navigation-menu-item">
            <Link to='/provider/billing' className={`navigation-menu-link ${path === "billing" ? "active" : ""
              }`}>
              <i className="far fa-home me-2" />
              Billing
            </Link>
          </li>
          <li className="navigation-menu-item pb-2">
            <Link to='/provider/setting' className={`navigation-menu-link ${path === "setting" ? "active" : ""
              }`}>
              <i className="fas fa-cog me-2" />
              Settings
            </Link>
          </li>
          <li className="divider" />
          <li className="navigation-menu-item">
            <Link to='/provider/edit-profile'
              className="navigation-menu-link dash-board-view-profile-pic"
            >
              <img src={userProfile?.profileImage ? `${base_url}/${userProfile?.profileImage}` : images?.avatar} alt="" />
              Profile Customer
            </Link>
          </li>
        </ul>
      </div>
    </div>
    </div>
  )
}

export default Sidebar
