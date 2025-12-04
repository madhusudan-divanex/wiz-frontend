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
const ProfileView = () => {
    const userId = localStorage.getItem('userId')
    const [profileData, setProfileData] = useState({})
    const [selectedType, setSelectedType] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [searchParams] = useSearchParams();
    const [membershipData, setMembershipData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if (Object.keys(membershipData).length > 0) {
            if (membershipData?.membershipId?.topChoice) {
                navigate('/vip')
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
    useEffect(() => {
        getUserProfile()
        getUserData()
    }, [userId])

    return (
        <>
            <section className="banner-sec business-main-sec mt-5">
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
                                <img src={rightImg} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="business-progress-form onboarding-section  py-4">
                <div className="container">
                    <p>Click Submit to complete and save your details.</p>
                    <div className="progress mb-4">
                        <div
                            id="progressBar"
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `${(currentStep / 4) * 100}%` }}
                            aria-valuenow={(currentStep / 4) * 100}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        />
                    </div>
                    <ul className="nav nav-tabs d-flex text-center mb-4 tabs-scroll-wrapper" id="myTab" role="tablist">
                        <li className="nav-item flex-fill" role="presentation">
                            <a className={`nav-link disabled ${currentStep === 1 ? 'active' : ''}`} id="step1-tab" data-bs-toggle="tab" data-bs-target="#step" type="button" role="tab" onClick={() => handleTabClick(1)}>
                                Profile
                            </a>
                        </li>
                        <li className="nav-item flex-fill" role="presentation">
                            <a className={`nav-link  ${currentStep === 2 ? 'active' : ''}`} id="step2-tab" data-bs-toggle="tab" data-bs-target="#step" type="button" role="tab" onClick={() => handleTabClick(2)} >
                                Your Marketing
                            </a>
                        </li>
                        <li className="nav-item flex-fill" role="presentation">
                            <a className={`nav-link disabled ${currentStep === 3 ? 'active' : ''}`} id="step3-tab" data-bs-toggle="tab" data-bs-target="#step" type="button" role="tab" onClick={() => handleTabClick(3)}>
                                Registration and Certificates
                            </a>
                        </li>
                        <li className="nav-item flex-fill" role="presentation">
                            <a className={`nav-link disabled ${currentStep === 4 ? 'active' : ''}`} id="step4-tab" data-bs-toggle="tab" data-bs-target="#step" type="button" role="tab" onClick={() => handleTabClick(4)}>
                                Features
                            </a>
                        </li>
                        <li className="nav-item flex-fill">
                            <Link className="nav-link" data-step={4} to="#">
                                Submit
                            </Link>
                        </li>
                    </ul>

                    <div className="tab-content mt-3">
                        {/* Step 1 */}
                        <div className={`tab-pane fade ${currentStep === 1 ? 'show active' : ''}`} id="step1" role="tabpanel">
                            <div class="row py-5 business-first-content business-border-bottom ">
                                <div class="col-lg-7 col-md-7 col-sm-12">
                                    <p>To optimize your profile for effective lead generation, please visit our guide on completing your business profile</p>
                                </div>
                                <div class="col-lg-5 col-md-5 col-sm-12">
                                    <div class="business-first-btn d-flex justify-content-center">
                                        <Link to='/how-complete-business-profile' class="btn btn-primary blue-stp-btn">Click here</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="row business-border-bottom py-5">
                                <div className="col-lg-6">
                                    <h5>Select Your Profile</h5>
                                    <p className="profile-para-cotxt">
                                        Choose Individual if you are signing up as a freelancer, consultant, or independent professional.
                                        <br />
                                        <br />
                                        Choose Company if you are registering a business or organization.
                                    </p>
                                </div>
                                <div className="col-lg-6 mt-1">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-6 col-sm-12">
                                            {/* Individual */}
                                            <div className="form-check-card position-relative mt-lg-4 mt-sm-0">
                                                <div className="form-check frm-check-business">
                                                    <input
                                                        className="form-check-input styled-check"
                                                        type="checkbox"
                                                        id="consumerCheck"
                                                        name="userType"
                                                        checked={selectedType === "individual"}
                                                        onChange={() => handleOpen("individual")}
                                                    />
                                                    <label className="form-check-label card-style" htmlFor="consumerCheck">
                                                        <div className="d-flex">
                                                            <div className="business-opt-box-content">
                                                                <h5 className="mb-0 fw-semibold">Individual</h5>
                                                                <p class="mb-0 small text-muted">
                                                                    <a href="#" class="blue-view-btn-txt">View Example</a>
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
                                                        className="form-check-input styled-check"
                                                        type="checkbox"
                                                        id="providerCheck"
                                                        name="userType"
                                                        checked={selectedType === "company"}
                                                        onChange={() => handleOpen("company")}
                                                    />
                                                    <label className="form-check-label card-style" htmlFor="providerCheck">
                                                        <div className="d-flex">
                                                            <div className="business-opt-box-content">
                                                                <h5 className="mb-0 fw-semibold">Company</h5>
                                                                <p class="mb-0 small text-muted">
                                                                    <a href="#" class="blue-view-btn-txt">View Example</a>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="form-check-card position-relative mt-lg-4 mt-sm-0">
                                                <div className="form-check frm-check-business">
                                                    <input
                                                        className="form-check-input styled-check"
                                                        type="checkbox"
                                                        id="restaurantCheck"
                                                        name="userType"
                                                        checked={selectedType === "restaurant"}
                                                        onChange={() => handleOpen("restaurant")}
                                                    />
                                                    <label className="form-check-label card-style" htmlFor="restaurantCheck">
                                                        <div className="d-flex">
                                                            <div className="business-opt-box-content">
                                                                <h5 className="mb-0 fw-semibold">Restaurant</h5>
                                                                <p class="mb-0 small text-muted">
                                                                    <a href="#" class="blue-view-btn-txt">View Example</a>
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
                            {selectedType === "individual" && <IndividualForm active profileData={profileData} />}
                            {selectedType === "company" && <CompanyForm active profileData={profileData} />}
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
                                    <p className=" step-para">
                                        Provide detailed information under each heading to highlight your experience and showcase your expertise effectively.
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
                        <div className={`tab-pane fade ${currentStep === 3 ? 'show active' : ''}`} id="step3" role="tabpanel">
                            <div className="row marketing-border-btm py-4 border-bottom">
                                <div className="col-lg-9 col-md-9 col-sm-12">
                                    <p className="step-para">
                                        Accreditation is a 3-step process. Only your active trade license and, if applicable, your regulated body will appear on your business profile. You may also choose to display additional certificates to showcase your expertise.
                                    </p>
                                </div>
                            </div>
                            <BusinessLicence
                                currentStep={currentStep}
                                goToNextStep={goToNextStep}
                                goToPrevStep={goToPrevStep}
                            />
                        </div>

                        {/* Step 4 */}
                        <div className={`tab-pane fade ${currentStep === 4 ? 'show active' : ''}`} id="step4" role="tabpanel">

                            {/* <div className="col-lg-5 col-md-5 col-sm-12 py-3">
                                    <h4>
                                        Enhance Your Profile and Connect with More Clients Using These Exciting Features
                                    </h4>
                                </div> */}
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

export default ProfileView;



