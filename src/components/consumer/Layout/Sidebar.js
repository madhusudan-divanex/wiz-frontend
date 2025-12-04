import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getSecureApiData } from '../../../services/api'
import base_url from '../../../baseUrl'
import { fetchProfileData, fetchUserProfile } from '../../../redux/features/userSlice'
import { useDispatch, useSelector } from 'react-redux'

function Sidebar() {
    const location = useLocation();
    const path = location.pathname?.replace('/consumer/', '');
    const userId = localStorage.getItem('userId')
    const { profileData, membershipData, userProfile } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserProfile());
        dispatch(fetchProfileData())
    }, [dispatch]);
    return (
        <div className='col-lg-2 px-lg-0'>
            <div className="left-dashboar-sidebar">
                <div className="navigation-bars dash-left-navi-bar">
                    <ul className="navigation-menu">
                        <li className="navigation-menu-item">
                            <Link to='/consumer/dashboard' className={`navigation-menu-link ${path === "dashboard" ? "active" : ""}`}>
                                <i className="bi bi-window me-2" />
                                {"  "}Dashboard
                            </Link>
                        </li>
                        <li className="navigation-menu-item">
                            <Link
                                to="/consumer/posting-history"
                                className={`navigation-menu-link  ${path === "posting-history" ? "active" : ""}`}
                            >
                                <i className="fa-regular fa-file me-2" />
                                My Posting History
                            </Link>
                        </li>
                        <li className="navigation-menu-item pb-2">
                            <Link to="/consumer/bookmark" className={`navigation-menu-link ${path === "bookmark" ? "active" : ""}`}>
                                <i className="far fa-bookmark me-2" />
                                My Bookmarks
                            </Link>
                        </li>
                        <li className="divider" />
                        <li className="navigation-menu-item pt-2">
                            <Link
                                to="/consumer/reference"
                                className={`navigation-menu-link  ${path === "reference" ? "active" : ""}`}
                            >
                                <i className="fas fa-link me-2" />
                                Reference Requests
                            </Link>
                        </li>
                        <li className="navigation-menu-item">
                            <Link
                                to="/consumer/rating"
                                className={`navigation-menu-link  ${path === "rating" ? "active" : ""}`}
                            >
                                <i className="far fa-star me-2" />Consumer Ratings
                            </Link>
                        </li>
                        <li className="navigation-menu-item pb-2">
                            <Link
                                to="/consumer/feedback"
                                className={`navigation-menu-link  ${path === "feedback" ? "active" : ""}`}
                            >
                                <i className="fas fa-comment-dots me-2" /> Share your Feedback
                            </Link>
                        </li>
                        <li className="divider" />
                        <li className="navigation-menu-item pt-2">
                            <Link to="/consumer/chat" className={`navigation-menu-link ${path === "chat" ? "active" : ""}`}>
                                <i className="fa-regular fa-comments me-2" />
                                My Chats
                            </Link>
                        </li>
                        <li className="navigation-menu-item pb-2">
                            <Link to='/consumer/service' className={`navigation-menu-link ${path === "service" ? "active" : ""}`}>
                                <i className="bi bi-receipt me-2" /> Service Disputes
                            </Link>
                        </li>
                        <li className="divider" />
                        <li className="navigation-menu-item pt-2">
                            <Link to='/consumer/purchase' className={`navigation-menu-link ${path === "purchase" ? "active" : ""}`}>
                                <i className="fas fa-cart-shopping me-2" />
                                My Purchases
                            </Link>
                        </li>
                        <li className="navigation-menu-item pb-2">
                            <Link to='/consumer/notification' className={`navigation-menu-link ${path === "notification" ? "active" : ""}`}>
                                <i className="fa-regular fa-bell me-2" />
                                Notification
                            </Link>
                        </li>
                        <li className="divider" />
                        <li className="navigation-menu-item pt-2">
                            <Link
                                to="/consumer/edit-profile"
                                className={`navigation-menu-link dash-board-view-profile-pic ${path === "edit-profile" ? "active" : ""}`}
                            >
                                <img src={userProfile?.profileImage ? `${base_url}/${userProfile.profileImage}` : "/assets/images/left-dash-board-img.jpg"} alt="" />
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
