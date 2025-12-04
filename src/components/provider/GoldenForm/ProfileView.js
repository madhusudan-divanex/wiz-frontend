import React, { useEffect, useState } from 'react';
import images from '../../../assets/images'
import IndividualForm from './IndividualForm';
import Marketing from './Marketing';
import BusinessLicence from './BusinessLicence';
import CompanyForm from './CompanyForm';
import FeaturesForm from './FeaturesForm';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import RestaurantForm from './RestaurantForm';
import { getSecureApiData } from '../../../services/api';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const rightImg = images.businessRightImage;
const GoldenProfileView = () => {
    const userId = localStorage.getItem('userId')
    const [profileData, setProfileData] = useState({})
    const [membershipData, setMembershipData] = useState({})
    const [vipMembership, setVipMembership] = useState()
    const [selectedType, setSelectedType] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    useEffect(() => {
        if (Object.keys(membershipData).length > 0) {
            if (!membershipData?.membershipId?.topChoice) {
                navigate('/profile')
            }
        }
    }, [membershipData])

    useEffect(() => {
        const stepParam = searchParams.get('step');
        if (stepParam && !isNaN(stepParam)) {
            setCurrentStep(Number(stepParam));
            navigate(window.location.pathname, { replace: true });
        }
    }, [searchParams]);

    const handleOpen = (type) => {
        sessionStorage.setItem('profileType', type)
        setSelectedType(prevType => prevType === type ? null : type);
    };

    const handleTabClick = (stepNumber) => {
        setCurrentStep(stepNumber);
    };

    // Function to go to the next step
    const goToNextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    // Function to go to the previous step
    const goToPrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };
    async function getUserProfile() {
        try {
            const result = await getSecureApiData(`api/provider/profile-get/${userId}`)
            if (result.status) {
                setProfileData(result.data)
                setSelectedType(result.data?.type)
            } else {
                goToPrevStep()
            }
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        getUserProfile()
        getUserData()
    }, [userId])
    async function getUserData() {
        try {
            const result = await getSecureApiData(`api/users/${userId}`)
            if (result.success) {
                setMembershipData(result.membershipData)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function fetchMembershipdata() {
        try {
            const result = await getSecureApiData('get-membership?type=provider')
            if (result.status) {
                const max = result.membershipData?.filter(item => item?.topChoice)
                setVipMembership(max[0])
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

    return (
        <>
            <section className="banner-sec business-main-sec gold-frm-sec">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="banner-innr">
                                <h1>Custom profile webpage</h1>
                                <p>Help us target the right customer user for you</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="business-main-sec-right-img">
                                <img src="assets/images/" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="business-progress-form onboarding-section onboarding-second-tp-sec py-4">
                <div className="container">
                    <p>Registration takes about 20 minutes to complete.</p>
                    <div className="progress mb-4">
                        <div
                            id="progressBar"
                            className="progress-bar progress-gold-bar"
                            role="progressbar"
                            style={{ width: `${(currentStep / 4) * 100}%` }}
                            aria-valuenow={(currentStep / 4) * 100}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        />
                    </div>
                    <ul className="nav nav-tabs d-flex text-center mb-4 tabs-scroll-wrapper" id="formTabs" role="tablist">
                        <li className="nav-item flex-fill" role="presentation">
                            <a className={`nav-link disabled nav-link-glod is-active  ${currentStep === 1 ? 'active' : ''}`} id="step1-tab" data-bs-toggle="tab" data-bs-target="#step" type="button" role="tab" onClick={() => handleTabClick(1)}>
                                Profile
                            </a>
                        </li>
                        <li className="nav-item flex-fill" role="presentation">
                            <a className={`nav-link disabled nav-link-glod is-active  ${currentStep === 2 ? 'active' : ''}`} id="step2-tab" data-bs-toggle="tab" data-bs-target="#step" type="button" role="tab" onClick={() => handleTabClick(2)}>
                                Scope of Work
                            </a>
                        </li>
                        <li className="nav-item flex-fill" role="presentation">
                            <a className={`nav-link disabled nav-link-glod is-active  ${currentStep === 3 ? 'active' : ''}`} id="step3-tab" data-bs-toggle="tab" data-bs-target="#step" type="button" role="tab" onClick={() => handleTabClick(3)}>
                                Registration and Certificates
                            </a>
                        </li>
                        <li className="nav-item flex-fill" role="presentation">
                            <a className={`nav-link disabled nav-link-glod is-active  ${currentStep === 4 ? 'active' : ''}`} id="step4-tab" data-bs-toggle="tab" data-bs-target="#step" type="button" role="tab" onClick={() => handleTabClick(4)}>
                                Features
                            </a>
                        </li>
                        <li className="nav-item flex-fill">
                            <Link className="nav-link nav-link-glod is-active " data-step={4} to="#">
                                View
                                and Publish
                            </Link>
                        </li>
                    </ul>

                    <div className="tab-content mt-3">
                        {/* Step 1 */}
                        <div className={` tab-pane fade ${currentStep === 1 ? 'show active' : ''}`} id="step1" role="tabpanel">
                            <div class="row pb-5 business-first-content business-border-bottom">
                                <div class="col-lg-7 col-md-7 col-sm-12">
                                    <p className='step-para'>To ensure your profile is fully optimized for effective lead generation</p>
                                </div>
                                <div class="col-lg-5 col-md-5 col-sm-12">
                                    <div class="business-first-btn d-flex justify-content-end">
                                        <Link to='/how-complete-business-profile' class="btn btn-primary gold-stp-btn">How to Complete Your Business Profile page</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="row business-border-bottom py-5">
                                <div className="col-lg-6 d-flex align-items-center">
                                    <h5>Select Your Profile</h5>

                                </div>
                                <div className="col-lg-6 mt-1">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-6 col-sm-12">
                                            {/* Individual */}
                                            <div className="form-check-card position-relative mt-lg-4 mt-sm-0">
                                                <div className="form-check frm-check-business">
                                                    <input
                                                        className="form-check-input styled-check styled-check-gld"
                                                        type="checkbox"
                                                        id="consumerCheck"
                                                        name="userType"
                                                        checked={selectedType === "individual"}
                                                        onChange={() => handleOpen("individual")}
                                                    />
                                                    <label className="form-check-label card-style card-style-gld" htmlFor="consumerCheck">
                                                        <div className="d-flex">
                                                            <div className="business-opt-box-content">
                                                                <h5 className="mb-0 fw-semibold">Individual</h5>
                                                                <p class="mb-0 small text-muted">
                                                                    <a href="#" class="gld-view-btn-txt">View Example</a>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Company */}
                                            <div className="form-check-card position-relative " style={{ marginTop: "30px" }}>
                                                <div className="form-check frm-check-business">
                                                    <input
                                                        className="form-check-input styled-check styled-check-gld"
                                                        type="checkbox"
                                                        id="providerCheck"
                                                        name="userType"
                                                        checked={selectedType === "company"}
                                                        onChange={() => handleOpen("company")}
                                                    />
                                                    <label className="form-check-label card-style  card-style-gld" htmlFor="providerCheck">
                                                        <div className="d-flex">
                                                            <div className="business-opt-box-content">
                                                                <h5 className="mb-0 fw-semibold">Company</h5>
                                                                <p class="mb-0 small text-muted">
                                                                    <a href="#" class="gld-view-btn-txt">View Example</a>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="form-check-card position-relative mt-lg-4 mt-sm-0">
                                                <div className="form-check frm-check-business">
                                                    <input
                                                        className="form-check-input styled-check styled-check-gld"
                                                        type="checkbox"
                                                        id="restaurantCheck"
                                                        name="userType"
                                                        checked={selectedType === "restaurant"}
                                                        onChange={() => handleOpen("restaurant")}
                                                    />
                                                    <label className="form-check-label card-style card-style-gld" htmlFor="restaurantCheck">
                                                        <div className="d-flex">
                                                            <div className="business-opt-box-content">
                                                                <h5 className="mb-0 fw-semibold">Restaurant</h5>
                                                                <p class="mb-0 small text-muted">
                                                                    <a href="#" class="gld-view-btn-txt">View Example</a>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Forms based on selection */}
                            {selectedType === "company" && <CompanyForm active profileData={profileData} />}
                            {selectedType === "individual" && <IndividualForm active profileData={profileData} />}
                            {selectedType === "restaurant" && <RestaurantForm active profileData={profileData} />}

                            {/* Navigation buttons for Step 1 */}
                            {/* <div className="business-submt-btn d-flex justify-content-end mt-4">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={goToNextStep}
                                    disabled={!selectedType}
                                >
                                    Next Step
                                </button>
                            </div> */}
                        </div>



                        {/* Step 2 */}
                        <div className={`tab-pane fade marketing-sec ${currentStep === 2 ? 'show active' : ''}`} id="step2" role="tabpanel">
                            <div className="row marketing-border-btm py-4 ">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <p className="step-para">
                                        Provide detailed information under each heading to highlight your
                                        experience and showcase
                                        your expertise effectively.
                                    </p>
                                </div>
                            </div>
                            <Marketing
                                currentStep={currentStep}
                                goToNextStep={goToNextStep}
                                goToPrevStep={goToPrevStep}
                                selectedType={selectedType}
                            />
                        </div>

                        {/* Step 3 */}
                        <div className={`marketing-sec step-three tab-pane fade ${currentStep === 3 ? 'show active' : ''}`} id="step3" role="tabpanel">
                            <div className="row marketing-border-btm py-4 border-bottom">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <p class="gold-three-stp-pra">Please provide your company registration details and regulatory information (where required by law) in the fields below. You also have the option to upload any certificates you'd like to share.</p>
                                    <p class="gold-three-stp-pra">For more details on our qualifying criteria, please visit our <span>FAQs</span></p>
                                </div>
                            </div>
                            <BusinessLicence
                                currentStep={currentStep}
                                goToNextStep={goToNextStep}
                                goToPrevStep={goToPrevStep}
                            />
                        </div>

                        {/* Step 4 */}
                        <div className={`marketing step-four tab-pane fade ${currentStep === 4 ? 'show active' : ''}`} id="step4" role="tabpanel">
                            <div className="row marketing-border-btm py-4 sign-member">
                                <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                                    <h5>Wizbizla {vipMembership?.name} Features</h5>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    {vipMembership?.features?.length > 0 &&
                                        vipMembership?.features?.map((item, key) =>
                                            <div className="custom-frm-bx" key={key}>
                                                <div className="form-check gold-check-wrap">
                                                    <input
                                                        className="form-check-input custom-checkbox-one custom-checkbox-gradient"
                                                        type="checkbox"
                                                        checked
                                                        defaultValue=""
                                                        id="checkDefaulttwoone"
                                                    />
                                                    <label className="form-check-label" htmlFor="">
                                                        {item?.title}: {item?.detail}
                                                    </label>
                                                </div>
                                            </div>)}

                                </div>
                            </div>

                            <FeaturesForm
                                currentStep={currentStep}
                                goToNextStep={goToNextStep}
                                goToPrevStep={goToPrevStep}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default GoldenProfileView;



