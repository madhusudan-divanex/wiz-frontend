import React, { useEffect, useState } from 'react'
import images from '../../../assets/images'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getSecureApiData } from '../../../services/api'
import { fetchUserProfile } from '../../../redux/features/userSlice'

function UpgradePremium() {
    const navigate = useNavigate()
    const { profileData } = useSelector(state => state.user)
    const [selectedDurations, setSelectedDurations] = useState({});

    const dispatch = useDispatch()
    const [membershipData, setMembershipData] = useState({})

    async function fetchMembershipdata() {
        try {
            const result = await getSecureApiData('get-membership?type=provider')
            if (result.status) {
                const membership = result.membershipData.find(item => item?.topChoice === true)
                setMembershipData(membership)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        fetchMembershipdata()
    }, [])

    useEffect(() => {
        dispatch(fetchUserProfile())
    }, [dispatch])
    const handleBuy = (item, duration) => {
        const startDate = new Date();
        const price = duration == 'monthly' ? membershipData?.price?.monthly : membershipData?.price?.yearly
        const days = duration == 'monthly' ? 30 : 360
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + days);
        const data = {
            membershipId: membershipData?._id,
            startDate,
            endDate,
            price,
            type: 'provider'
        };
        sessionStorage.setItem('membershipData', JSON.stringify(data));
        sessionStorage.setItem('providerMembership',true)
        navigate('/payment-gateway')
    };
    useEffect(() => {
        if (profileData && profileData.role) {
            if (profileData.role !== 'provider') {
                navigate(-1)
            }
        }
    }, [profileData])

    return (
        <section className="membership-sec pt-100 membership-section">
            <div className='container'>
                <h2 className="title mb-3 text-center membership-section-title">
                    Choose Your Package
                </h2>
                <p className="fz-18 mb-4 text-center">
                    For group or team profile purchases, contact us at &nbsp;
                    <a href="javascript:void(0);" className="clr">
                        hello@wizbizla.com
                    </a>
                </p>
                <div className="row justify-content-center">
                    {membershipData &&
                        <div className="col-lg-6 " >
                            <div className="membership-cards membership-dark mb-0">
                                <span className="popular-tag">Most popular plan</span>
                                <span className="membership-badge">
                                    <img src={images.reward} alt="" />
                                </span>
                                <h4 className="text-white">{membershipData?.name}</h4>
                                <ul className="nav" id="myTab" role="tablist">
                                    <li className="tab-item" role="presentation">
                                        <button
                                            className={`tab-link ${selectedDurations[membershipData?._id] !== 'yearly' ? 'active' : ''}`}
                                            data-bs-toggle="tab"
                                            data-bs-target={`#signature-tab-01-1`}
                                            type="button"
                                            role="tab"
                                            onClick={() => setSelectedDurations(prev => ({ ...prev, [membershipData?._id]: 'monthly' }))}
                                        >
                                            Monthly
                                        </button>
                                    </li>
                                    <li className="tab-item" role="presentation">
                                        <button
                                            className={`tab-link ${selectedDurations[membershipData?._id] === 'yearly' ? 'active' : ''}`}
                                            data-bs-toggle="tab"
                                            data-bs-target={`#signature-tab-02-1`}
                                            type="button"
                                            role="tab"
                                            onClick={() => setSelectedDurations(prev => ({ ...prev, [membershipData?._id]: 'yearly' }))}
                                        >
                                            Yearly
                                        </button>
                                    </li>
                                </ul>

                                <div className="tab-content" id="myTabContent">
                                    <div
                                        className={`tab-pane fade show pb-lg-5 ${selectedDurations[membershipData?._id] !== 'yearly' ? 'active' : ''}`}
                                        id={`signature-tab-01-1`}
                                        role="tabpanel"
                                    >
                                        <h3 className="text-white">
                                            {membershipData?.price?.monthly} AED <sup>/ Per Month</sup>
                                        </h3>
                                        <p className="fz-14 text-white">
                                            {membershipData?.description}
                                        </p>
                                        {membershipData?.features?.map((fet, index) =>
                                            <ul className="custom-content-list" key={index}>
                                                <li>
                                                    <span>{fet?.title}</span>: {fet?.detail}
                                                </li>

                                            </ul>)}
                                    </div>
                                    <div
                                        className={`tab-pane fade pb-lg-5 ${selectedDurations[membershipData?._id] === 'yearly' ? 'active' : ''}`}
                                        id={`signature-tab-02-1`}
                                        role="tabpanel"
                                    >
                                        <h3 className="text-white">
                                            {membershipData?.price?.yearly} AED <sup>/ Per Year       {
                                                (() => {
                                                    const monthly = membershipData?.price?.monthly || 0;
                                                    const yearly = membershipData?.price?.yearly || 0;
                                                    const regularYearly = monthly * 12;

                                                    if (yearly >= regularYearly || monthly === 0) return null;

                                                    const percentOff = ((regularYearly - yearly) / regularYearly) * 100;
                                                    return ` (${percentOff.toFixed(0)}% off)`;
                                                })()
                                            }
                                            </sup>
                                        </h3>
                                        <p className="fz-14 text-white">
                                            {membershipData?.description}
                                        </p>
                                        {membershipData?.features?.map((fet, index) =>
                                            <ul className="custom-content-list" key={index}>
                                                <li>
                                                    <span>{fet?.title}</span>: {fet?.detail}
                                                </li>

                                            </ul>)}
                                    </div>
                                </div>
                                <div className="membership-btn">
                                    <button
                                        type='button'
                                        onClick={() => handleBuy(membershipData, selectedDurations[membershipData?._id] || 'monthly')}
                                        className="thm-btn w-100 becm-mem-thm-btn"
                                    >
                                        {membershipData?.btnText}
                                    </button>

                                </div>
                            </div>
                        </div>}
                </div>
            </div>
        </section>

    )
}

export default UpgradePremium
