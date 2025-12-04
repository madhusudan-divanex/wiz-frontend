import React, { useEffect, useState } from 'react'
import Header from '../../../layout/Header'
import Footer from '../../../layout/Footer'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { getSecureApiData } from '../../../services/api'
import { useSelector } from 'react-redux'
function Main() {
    const location = useLocation()
    const navigate = useNavigate()
    const userId = localStorage.getItem('userId')
    const blockPath = ['/consumer/profile','/consumer/listing']
    const currentPath = location.pathname
    const { profileData, membershipData } = useSelector(state => state.user)

    useEffect(() => {

        if (profileData && Object.keys(profileData).length>0 && profileData.role !== 'consumer') {
            navigate('/login')
        }
    }, [profileData])
    return (
        <>
            <Header />
            <div className='container-fluid'>
                <div className={`dashboard-profile-main-ori-sec ${!blockPath?.includes(currentPath) && 'prvd-content'} `}>
                    <div className='row'>
                        {!blockPath?.includes(currentPath) && <Sidebar />}
                        <div className={`${!blockPath?.includes(currentPath) && 'col-lg-10 '} px-0`}>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Main
