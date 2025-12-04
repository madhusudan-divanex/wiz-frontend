import React, { useEffect, useState } from 'react';
import images from '../../../assets/images'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getSecureApiData, securePostData } from '../../../services/api';
import { servicesList } from '../../../utils/staticData';
import GolderProfile from './GolderProfile';
import ReactIntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import { Modal } from 'bootstrap';

const rightImg = images.businessRightImage;
const ConsumerProfile = () => {
    const userId = localStorage.getItem('userId')
    const [profileData, setProfileData] = useState({})
    const [selectedType, setSelectedType] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [searchParams] = useSearchParams();
    const [userData,setUserData] =useState()
    const [membershipData, setMembershipData] = useState({})
    const [profileForm, setProfileForm] = useState({ userId, firstName: '', lastName: '', company: '', email: '', dob: undefined, nationality: '', age: "", gender: "" })
    const [basketForm, setBasketForm] = useState({
        userId,
        address: "",
        area: "",
        emirate: "",
        phone: "",
        receiveGiftBox: false,
        expatStatus: ""
    })
    const [serviceForm, setServiceForm] = useState({ userId, intrestedServices: [], usedServices: '' })
    const [preferenceForm, setPreferenceForm] = useState({
        userId,
        passionateTopics: "",
        podcastSubjects: "",
        hobbies: "",
        favoriteActivities: "",
        infoPreference: "",
        desiredFeatures: "",
        expatChallenges: "",
        improvementSuggestions: ""
    })
    const [stayUpdated, setStayUpdated] = useState({ userId, selectedService: false, promotions: false, offers: false })
    const navigate = useNavigate()


    useEffect(() => {
        const stepParam = searchParams.get('step');
        if (stepParam && !isNaN(stepParam)) {
            setCurrentStep(Number(stepParam));
            navigate(window.location.pathname, { replace: true });
        }
    }, [searchParams]);
    const handleTabClick = (stepNumber) => {
        setCurrentStep(stepNumber);
    };
    async function getUserData() {
        try {
            const result = await getSecureApiData(`api/users/${userId}`)
            if (result.success) {
                setUserData(result.user)
                setProfileData({...profileData,email:result.user.email})
                setMembershipData(result.membershipData)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        if (userId) {

            getUserData()
        }
    }, [userId])
    const profileChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfileForm((prevForm) => ({
            ...prevForm,
            [name]: type === "checkbox" ? checked : value
        }));
    };
    const basketChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBasketForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };
    const stayUpdatedChange = (e) => {
        const { name, value, type, checked } = e.target;
        setStayUpdated((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };
    const preferenceChange = (e) => {
        const { name, value } = e.target;
        setPreferenceForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        setServiceForm((prevForm) => {
            let updatedServices = [...prevForm.intrestedServices];

            if (checked) {
                updatedServices.push(value);
            } else {
                updatedServices = updatedServices.filter((item) => item !== value);
            }

            return { ...prevForm, intrestedServices: updatedServices };
        });
    };
    const profileSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await securePostData('api/consumer/profile', profileForm)
            if (result.status) {
                setCurrentStep(currentStep + 1)
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const basketSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await securePostData('api/consumer/basket', basketForm)
            if (result.status) {
                if (result.isNew && basketForm.receiveGiftBox) {
                    const modalEl = document.getElementById('deleteModal');
                    const modal = new Modal(modalEl);
                    modal.show();
                } else {
                    setCurrentStep(currentStep + 1)
                    toast.success(result.message)
                }
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const serviceSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await securePostData('api/consumer/service', serviceForm)
            if (result.status) {
                setCurrentStep(currentStep + 1)
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const preferenceSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await securePostData('api/consumer/preference', preferenceForm)
            if (result.status) {
                setCurrentStep(currentStep + 1)
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const stayUpdatedSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await securePostData('api/consumer/stayUpdated', stayUpdated)
            if (result.status) {
                toast.success(result.message)
                navigate('/consumer/dashboard')
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (userId) {
            getProfileData()
            getBasketData()
            getServiceData()
            getReferenceData()
            getStayUpdateData()
        }
    }, [userId])

    async function getProfileData() {
        try {
            const result = await getSecureApiData(`api/consumer/profile/${userId}`)
            if (result.status) {
                if (result.data.company) {
                    setSelectedType('company')
                } else {
                    setSelectedType('individual')
                }
                setProfileForm(result.data)
            }
        } catch (error) {

        }
    }
    async function getBasketData() {
        try {
            const result = await getSecureApiData(`api/consumer/basket/${userId}`)
            if (result.status && result.data !== null) {
                setBasketForm(result.data)
            }
        } catch (error) {

        }
    }
    async function getServiceData() {
        try {
            const result = await getSecureApiData(`api/consumer/service/${userId}`)
            if (result.status && result.data !== null) {
                setServiceForm(result.data)
            }
        } catch (error) {

        }
    }
    async function getReferenceData() {
        try {
            const result = await getSecureApiData(`api/consumer/preference/${userId}`)
            if (result.status && result.data !== null) {
                setPreferenceForm(result.data)
            }
        } catch (error) {

        }
    }
    async function getStayUpdateData() {
        try {
            const result = await getSecureApiData(`api/consumer/stayUpdated/${userId}`)
            if (result.status && result.data !== null) {
                setStayUpdated(result.data)
            }
        } catch (error) {

        }
    }
    const [otp, setOtp] = useState(['', '', '', '']);
    const handleOtpChange = (value, index) => {
        // Allow only digits
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move focus to next input if current input is filled
            if (value && index < otp.length - 1) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handleOtpPaste = (e) => {
        const pastedOtp = e.clipboardData.getData('Text').slice(0, 4); // Limit to 4 characters
        const newOtp = pastedOtp.split('');
        setOtp(newOtp);

        // Focus on the last filled input
        setTimeout(() => {
            const nextEmptyIndex = newOtp.findIndex((digit) => digit === '');
            if (nextEmptyIndex !== -1) {
                document.getElementById(`otp-input-${nextEmptyIndex}`).focus();
            }
        }, 0);
    };
    const sendBasket = async (e) => {
        e.preventDefault()
        console.log("stiill")
        try {
            const result = await securePostData(`api/users/send-basket/${userId}`)
            if (result.success) {
                const modalEl = document.getElementById('deleteModal');
                const modal = Modal.getInstance(modalEl);
                modal.hide();
                document.body.classList.remove('modal-open');
                document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());

                const successModalEl = document.getElementById('successModal');
                const successModal = new Modal(successModalEl);
                successModal.show();
            } else {
                toast.error(result.message);
            }

        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <>
            {membershipData?.membershipId?.topChoice ? <GolderProfile />
                : <>
                    <section className="banner-sec business-main-sec customer-frm-section">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="banner-innr">
                                        <h1>Custom profile webpage</h1>
                                        <p>Help us target the right provider for you</p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="business-main-sec-right-img"></div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="business-progress-form onboarding-section customer-main-section  py-4">
                        <div className="container">
                            <div className="progress mb-4">
                                <div
                                    id="progressBar"
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: "20%" }}
                                    aria-valuenow={20}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </div>
                            <ul
                                className="nav nav-tabs d-flex text-center mb-4 tabs-scroll-wrapper"
                                id="formTabs"
                            >
                                <li className="nav-item flex-fill">
                                    <a className={`nav-link disabled ${currentStep === 1 ? 'active' : ''}`} data-step={0} type="button" onClick={() => handleTabClick(1)}>
                                        Profile
                                    </a>
                                </li>
                                <li className="nav-item flex-fill">
                                    <a className={`nav-link disabled ${currentStep === 2 ? 'active' : ''}`} data-step={1} type="button" onClick={() => handleTabClick(2)}>
                                        Welcome Basket
                                    </a>
                                </li>
                                <li className="nav-item flex-fill">
                                    <a className={`nav-link disabled ${currentStep === 3 ? 'active' : ''}`} data-step={2} type="button" onClick={() => handleTabClick(3)}>
                                        Services and Resources{" "}
                                    </a>
                                </li>
                                <li className="nav-item flex-fill">
                                    <a className={`nav-link disabled ${currentStep === 4 ? 'active' : ''}`} data-step={3} type="button" onClick={() => handleTabClick(4)}>
                                        Personal Preferences
                                    </a>
                                </li>
                                <li className="nav-item flex-fill">
                                    <a className={`nav-link disabled ${currentStep === 5 ? 'active' : ''}`} data-step={4} type="button" onClick={() => handleTabClick(5)}>
                                        Stay Updated
                                    </a>
                                </li>
                            </ul>
                            <div id="multiStepForm">
                                {/* Step 1 */}
                                {currentStep == 1 &&
                                    <div className="step">
                                        <div className="row business-border-bottom py-5">
                                            <div className="col-lg-6">
                                                <h5>Select your profile</h5>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-6 col-sm-12">
                                                        <div className="form-check-card mb-3 position-relative">
                                                            <div className="form-check frm-check-business">
                                                                <input
                                                                    className="form-check-input styled-check"
                                                                    type="checkbox"
                                                                    id="consumerCheck"
                                                                    checked={selectedType == 'individual'}
                                                                    onChange={() => setSelectedType('individual')}
                                                                    name="userType"
                                                                    onclick="toggleOnly(this)"
                                                                />
                                                                <label
                                                                    className="form-check-label card-style"
                                                                    htmlFor="consumerCheck"
                                                                >
                                                                    <div className="d-flex">
                                                                        <div className="business-opt-box-content">
                                                                            <h5 className="mb-2 fw-semibold">Individual</h5>
                                                                            <p className="mb-0 small text-muted">
                                                                                <a href="#">View Example</a>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="form-check-card position-relative">
                                                            <div className="form-check frm-check-business">
                                                                <input
                                                                    className="form-check-input styled-check"
                                                                    type="checkbox"
                                                                    id="companyCheck"
                                                                    name="userType"
                                                                    checked={selectedType == 'company'}
                                                                    onChange={() => setSelectedType('company')}
                                                                    onclick="toggleOnly(this)"
                                                                />
                                                                <label
                                                                    className="form-check-label card-style"
                                                                    htmlFor="companyCheck"
                                                                >
                                                                    <div className="d-flex">
                                                                        <div className="business-opt-box-content">
                                                                            <h5 className="mb-2 fw-semibold">Company</h5>
                                                                            <p className="mb-0 small text-muted">
                                                                                <a href="">View Example</a>
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
                                        {selectedType == 'individual' &&
                                            <form onSubmit={profileSubmit}  >
                                                <div className="row mt-5 individual-form">
                                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">
                                                                First name<span className="start-icon">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="firstName"
                                                                value={profileForm.firstName}
                                                                onChange={profileChange}
                                                                className="form-control"
                                                                placeholder="Enter first name"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">
                                                                Last name <span className="start-icon">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="lastName"
                                                                value={profileForm.lastName}
                                                                onChange={profileChange}
                                                                className="form-control"
                                                                placeholder="Enter last name"

                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">
                                                                Email address <span className="start-icon">*</span>
                                                            </label>
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                value={profileForm.email}
                                                                // onChange={profileChange}
                                                                className="form-control"
                                                                placeholder="Enter email address"
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">
                                                                Gender <span className="start-icon">*</span>
                                                            </label>
                                                            <div className="d-flex gap-3">
                                                                <div className="form-check custom-radio-purple">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="radio"
                                                                        name="gender"
                                                                        value="male"
                                                                        onChange={profileChange}
                                                                        checked={profileForm.gender === "male"}
                                                                        id="radioDefaultfree"
                                                                    />
                                                                    <label
                                                                        className="form-check-label"
                                                                        htmlFor="radioDefaultfree"
                                                                    >
                                                                        Male
                                                                    </label>
                                                                </div>
                                                                <div className="form-check custom-radio-purple">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="radio"
                                                                        name="gender"
                                                                        value="female"
                                                                        onChange={profileChange}
                                                                        checked={profileForm.gender === "female"}
                                                                        id="radioDefaultmain"
                                                                        defaultChecked=""
                                                                    />
                                                                    <label
                                                                        className="form-check-label"
                                                                        htmlFor="radioDefaultmain"
                                                                    >
                                                                        Female
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">
                                                                Date of Birth<span className="start-icon">*</span>
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                name="dob"
                                                                value={profileForm.dob ? profileForm.dob.split("T")[0] : ""} // show existing date
                                                                onChange={profileChange}
                                                                max={new Date().toISOString().split("T")[0]} // prevent future dates
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12 location-input">
                                                        <div className="custom-frm-bx option-size">
                                                            <label htmlFor="">
                                                                Nationality <span className="start-icon">*</span>{" "}
                                                            </label>
                                                            <select id="" className="form-select" name="nationality"
                                                                value={profileForm.nationality}
                                                                onChange={profileChange} required>
                                                                <option value="">Select Nationality</option>
                                                                <option value="American">American</option>
                                                                <option value="British">British</option>
                                                                <option value="Canadian">Canadian</option>
                                                                <option value="Australian">Australian</option>
                                                                <option value="Indian">Indian</option>
                                                                <option value="Chinese">Chinese</option>
                                                                <option value="Japanese">Japanese</option>
                                                                <option value="German">German</option>
                                                                <option value="French">French</option>
                                                                <option value="Brazilian">Brazilian</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12 location-input">
                                                        <div className="custom-frm-bx option-size">
                                                            <label htmlFor="">
                                                                Age Range <span className="start-icon">*</span>{" "}
                                                            </label>
                                                            <select name="age"
                                                                value={profileForm.age}
                                                                onChange={profileChange} id="" className="form-select" required>
                                                                <option value="">Select Age Range</option>
                                                                <option value="under-18">Under 18</option>
                                                                <option value="18-24">18 - 24</option>
                                                                <option value="25-34">25 - 34</option>
                                                                <option value="35-44">35 - 44</option>
                                                                <option value="45-54">45 - 54</option>
                                                                <option value="55-64">55 - 64</option>
                                                                <option value="65-74">65 - 74</option>
                                                                <option value="75-plus">75 and above</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="business-submt-btn d-flex justify-content-between">
                                                    <div className="business-submt-out-btn">
                                                    </div>
                                                    <div>
                                                        <button type="submit" className="btn btn-primary mt-4 btn-next">
                                                            Save and Continue
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>}
                                        {selectedType == 'company' &&
                                            <form onSubmit={profileSubmit} id="companyForm" >
                                                <div className="row mt-5 individual-form">
                                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">
                                                                First name<span className="start-icon">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="firstName"
                                                                value={profileForm.firstName}
                                                                onChange={profileChange}
                                                                className="form-control"
                                                                placeholder="Enter first name"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">
                                                                Last name <span className="start-icon">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="lastName"
                                                                required
                                                                value={profileForm.lastName}
                                                                onChange={profileChange}
                                                                className="form-control"
                                                                placeholder="Enter last name"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">
                                                                Company / Organization <span className="start-icon">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="company"
                                                                value={profileForm.company}
                                                                onChange={profileChange}
                                                                className="form-control"
                                                                placeholder="Enter company name"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">
                                                                Email address <span className="start-icon">*</span>
                                                            </label>
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                value={profileForm.email}
                                                                // onChange={profileChange}
                                                                disabled
                                                                className="form-control"
                                                                placeholder="Enter email address"
                                                                
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">
                                                                Date of Birth<span className="start-icon">*</span>
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                name="dob"
                                                                value={profileForm.dob ? profileForm.dob.split("T")[0] : ""} 
                                                                onChange={profileChange}
                                                                max={new Date().toISOString().split("T")[0]}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12 location-input">
                                                        <div className="custom-frm-bx option-size">
                                                            <label htmlFor="">
                                                                Nationality <span className="start-icon">*</span>{" "}
                                                            </label>
                                                            <select name="nationality"
                                                                value={profileForm.nationality}
                                                                onChange={profileChange} id="" className="form-select" required>
                                                                <option value="">Select Nationality</option>
                                                                <option value="American">American</option>
                                                                <option value="British">British</option>
                                                                <option value="Canadian">Canadian</option>
                                                                <option value="Australian">Australian</option>
                                                                <option value="Indian">Indian</option>
                                                                <option value="Chinese">Chinese</option>
                                                                <option value="Japanese">Japanese</option>
                                                                <option value="German">German</option>
                                                                <option value="French">French</option>
                                                                <option value="Brazilian">Brazilian</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12 location-input">
                                                        <div className="custom-frm-bx option-size">
                                                            <label htmlFor="">
                                                                Age Range <span className="start-icon">*</span>{" "}
                                                            </label>
                                                            <select name="age"
                                                                value={profileForm.age}
                                                                onChange={profileChange} id="" className="form-select" required>
                                                                <option value="">Select Age Range</option>
                                                                <option value="under-18">Under 18</option>
                                                                <option value="18-24">18 - 24</option>
                                                                <option value="25-34">25 - 34</option>
                                                                <option value="35-44">35 - 44</option>
                                                                <option value="45-54">45 - 54</option>
                                                                <option value="55-64">55 - 64</option>
                                                                <option value="65-74">65 - 74</option>
                                                                <option value="75-plus">75 and above</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">
                                                                Gender <span className="start-icon">*</span>
                                                            </label>
                                                            <div className="d-flex gap-3">
                                                                <div className="form-check custom-radio-purple">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="radio"
                                                                        name="gender"
                                                                        checked={profileForm.gender == 'male'}
                                                                        value="male"
                                                                        onChange={profileChange}
                                                                        id="radioDefaultfree-male"
                                                                    />
                                                                    <label
                                                                        className="form-check-label"
                                                                        htmlFor="radioDefaultfree-male"
                                                                    >
                                                                        Male
                                                                    </label>
                                                                </div>
                                                                <div className="form-check custom-radio-purple">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="radio"
                                                                        id="radioDefaultmain-fe"
                                                                        name="gender"
                                                                        value="female"
                                                                        checked={profileForm.gender == 'female'}
                                                                        onChange={profileChange}
                                                                        defaultChecked=""
                                                                    />
                                                                    <label
                                                                        className="form-check-label"
                                                                        htmlFor="radioDefaultmain-fe"
                                                                    >
                                                                        Female
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="business-submt-btn d-flex justify-content-between">
                                                    <div className="business-submt-out-btn">

                                                    </div>
                                                    <div>
                                                        <button type="submit" className="btn btn-primary mt-4 btn-next">
                                                            Save and Continue
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>}
                                    </div>}
                                {/* Step 2 */}
                                {currentStep == 2 &&
                                    <form onSubmit={basketSubmit} className="step  marketing-sec">
                                        <div className="row marketing-border-btm py-4">
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <h4>Welcome Basket!</h4>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="custom-frm-bx">
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input custom-checkbox"
                                                            type="checkbox"
                                                            name="receiveGiftBox"
                                                            checked={basketForm.receiveGiftBox}
                                                            onChange={basketChange}
                                                            id="checkDefaultsix"
                                                        />
                                                        <label className="form-check-label" htmlFor="checkDefaultsix">
                                                            I would like to receive a gift box of sample products and
                                                            services from local businesses
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row marketing-border-btm py-4">
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="custom-frm-bx">
                                                    <label htmlFor="">
                                                        Address <span className="start-icon">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter address"

                                                        name="address"
                                                        value={basketForm.address}
                                                        onChange={basketChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12 location-input">
                                                <div className="custom-frm-bx option-size">
                                                    <label htmlFor="">
                                                        Area/Location <span className="start-icon">*</span>{" "}
                                                    </label>
                                                    <select name="area"
                                                        value={basketForm.area}
                                                        onChange={basketChange} id="" className="form-select" required>
                                                        <option value="">Select Area</option>
                                                        <option value="Downtown">Downtown</option>
                                                        <option value="Marina">Marina</option>
                                                        <option value="Jumeirah">Jumeirah</option>
                                                        <option value="Business Bay">Business Bay</option>
                                                        <option value="Deira">Deira</option>
                                                        <option value="Al Barsha">Al Barsha</option>
                                                        <option value="Mirdif">Mirdif</option>
                                                        <option value="Jebel Ali">Jebel Ali</option>
                                                        <option value="Dubai Silicon Oasis">Dubai Silicon Oasis</option>
                                                        <option value="Palm Jumeirah">Palm Jumeirah</option>

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12 location-input">
                                                <div className="custom-frm-bx option-size">
                                                    <label htmlFor="">
                                                        Emirate <span className="start-icon">*</span>{" "}
                                                    </label>
                                                    <select name="emirate"
                                                        value={basketForm.emirate}
                                                        onChange={basketChange} id="" className="form-select" required>
                                                        <option value="">Select Emirate</option>
                                                        <option value="Abu Dhabi">Abu Dhabi</option>
                                                        <option value="Dubai">Dubai</option>
                                                        <option value="Sharjah">Sharjah</option>
                                                        <option value="Ajman">Ajman</option>
                                                        <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                                                        <option value="Fujairah">Fujairah</option>
                                                        <option value="Umm Al Quwain">Umm Al Quwain</option>
                                                        <option value="Al Ain">Al Ain</option>
                                                        <option value="Khor Fakkan">Khor Fakkan</option>
                                                        <option value="Dibba Al Fujairah">Dibba Al Fujairah</option>

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="custom-frm-bx option-size d-flex flex-column">
                                                    <label htmlFor="">
                                                        Contact No <span className="start-icon">*</span>{" "}
                                                    </label>
                                                    <ReactIntlTelInput
                                                        preferredCountries={['us', 'gb', 'in']}
                                                        defaultValue={basketForm.phone}
                                                        className="form-control border-0 shadow-none pay-coutry-list"
                                                        id="phone"
                                                        placeholder="Mobile Number"
                                                        onPhoneNumberChange={(status, value, countryData, number, id) => {
                                                            setBasketForm(prev => ({ ...prev, phone: number }));
                                                        }}
                                                        inputProps={{
                                                            name: 'phone',
                                                            required: true,
                                                        }}
                                                        containerClassName="intl-tel-input form-control"
                                                        fieldId="phone"
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                        <div className="row marketing-border-btm py-5">
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <h4>Choose Your Expat Status in the UAE:</h4>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="form-check custom-radio-purple">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        id="radioDefault-under"
                                                        name="expatStatus"
                                                        value="I am a Seasoned Expat"
                                                        onChange={basketChange}
                                                        checked={basketForm.expatStatus === "I am a Seasoned Expat"}
                                                    />
                                                    <label className="form-check-label" htmlFor="radioDefault-under">
                                                        I am a Seasoned Expat
                                                    </label>
                                                </div>

                                                <div className="form-check custom-radio-purple">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        id="radioDefault-expert"
                                                        name="expatStatus"
                                                        value="I am a New Expat (under 6 months)"
                                                        onChange={basketChange}
                                                        checked={basketForm.expatStatus === "I am a New Expat (under 6 months)"}
                                                    />
                                                    <label className="form-check-label" htmlFor="radioDefault-expert">
                                                        I am a New Expat (under 6 months)
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="business-submt-btn d-flex justify-content-between">
                                            <div className="business-submt-out-btn">
                                                <button
                                                    type="button"
                                                    onClick={() => setCurrentStep(currentStep - 1)}
                                                    className="btn btn-outline-primary mt-4 btn-prev"
                                                >
                                                    Previous Page
                                                </button>
                                            </div>
                                            <div>
                                                <button type="submit" className="btn btn-primary mt-4 btn-next">
                                                    Save and Continue
                                                </button>
                                            </div>
                                        </div>
                                    </form>}
                                {/* Step 3 */}
                                {currentStep == 3 &&
                                    <form onSubmit={serviceSubmit} className="step active step-three marketing-sec">
                                        <div className="row marketing-border-btm py-4 inter-oper-sec">
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <h6>
                                                    What are the top 10 services you would use this website for?
                                                </h6>
                                                <p>Feel free to check all that apply!</p>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="row">
                                                    {servicesList?.map((item, key) =>
                                                        <div className="col-lg-12 col-md-12 col-sm-12" key={key}>
                                                            <div className="custom-frm-bx custom-frm-bx-small">
                                                                <div className="form-check check-fm-box-bordr">
                                                                    <input
                                                                        className="form-check-input frm-chck-inpt mt-0"
                                                                        type="checkbox"

                                                                        id={`checkDefaultprofile-${key}`}
                                                                        value={item}
                                                                        checked={serviceForm?.intrestedServices?.includes(item)}
                                                                        onChange={handleCheckboxChange}
                                                                    />
                                                                    <label
                                                                        className="form-check-label"
                                                                        htmlFor={`checkDefaultprofile-${key}`}
                                                                    >
                                                                        {item}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>)}

                                                </div>
                                            </div>
                                        </div>
                                        <div className="row marketing-border-btm py-4 inter-oper-sec">
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <h6>
                                                    What are the top 10 services you would use this website for?
                                                </h6>
                                                <p>Feel free to check all that apply!</p>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="custom-frm-bx">
                                                    <textarea
                                                        className="form-control"
                                                        placeholder="Separate services with a comma."
                                                        id="floatingTextarea2"
                                                        style={{ height: 120 }}
                                                        value={serviceForm.usedServices}
                                                        onChange={(e) => setServiceForm({ ...serviceForm, usedServices: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="business-submt-btn d-flex justify-content-between">
                                            <div className="business-submt-out-btn business-pre-btn">
                                                <button
                                                    type="button"
                                                    onClick={() => handleTabClick(currentStep - 1)}
                                                    className="btn btn-outline-primary mt-4 btn-prev"
                                                >
                                                    Previous Page
                                                </button>
                                            </div>
                                            <div className="business-nxt-btn">
                                                <button type="submit" className="btn btn-primary mt-4 btn-next">
                                                    Save and Continue
                                                </button>
                                            </div>
                                        </div>
                                    </form>}
                                {/* Step 4 */}
                                {currentStep == 4 &&
                                    <form onSubmit={preferenceSubmit} className="step marketing-sec step-four">
                                        <div className="row marketing-border-btm py-4 inter-oper-sec">
                                            <h4>Personal Preferences</h4>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="custom-frm-bx">
                                                    <label htmlFor="">
                                                        What topics are you most passionate about in the UAE?
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        placeholder="Separate services with a comma."
                                                        id="floatingTextarea2"
                                                        style={{ height: 120 }}
                                                        defaultValue={""}
                                                        name='passionateTopics'
                                                        value={preferenceForm.passionateTopics}
                                                        onChange={preferenceChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="custom-frm-bx">
                                                    <label htmlFor="">
                                                        Which podcast subjects do you enjoy listening to the most?
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        placeholder="Separate services with a comma."
                                                        id="floatingTextarea2"
                                                        style={{ height: 120 }}
                                                        defaultValue={""}
                                                        name='podcastSubjects'
                                                        value={preferenceForm.podcastSubjects}
                                                        onChange={preferenceChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="custom-frm-bx">
                                                    <label htmlFor="">
                                                        What hobbies do you pursue in your free time?
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        placeholder="Separate services with a comma."
                                                        id="floatingTextarea2"
                                                        style={{ height: 120 }}
                                                        defaultValue={""}
                                                        name='hobbies'
                                                        value={preferenceForm.hobbies}
                                                        onChange={preferenceChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="custom-frm-bx">
                                                    <label htmlFor="">
                                                        What are your favorite activities as an expat?
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        placeholder="Separate services with a comma."
                                                        id="floatingTextarea2"
                                                        style={{ height: 120 }}
                                                        defaultValue={""}
                                                        name='favoriteActivities'
                                                        value={preferenceForm.favoriteActivities}
                                                        onChange={preferenceChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row marketing-border-btm py-4">
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="custom-frm-bx">
                                                    <label htmlFor="">
                                                        How do you prefer to receive information (e.g., email, social
                                                        media, newsletters)?{" "}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter answer"

                                                        name='infoPreference'
                                                        value={preferenceForm.infoPreference}
                                                        onChange={preferenceChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="custom-frm-bx">
                                                    <label htmlFor="">
                                                        What features would you like to see on the Wizbizla platform?
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter answer"

                                                        name='desiredFeatures'
                                                        value={preferenceForm.desiredFeatures}
                                                        onChange={preferenceChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="custom-frm-bx">
                                                    <label htmlFor="">
                                                        What challenges do you face as an expat in the UAE?
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter answer"

                                                        name='expatChallenges'
                                                        value={preferenceForm.expatChallenges}
                                                        onChange={preferenceChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="custom-frm-bx">
                                                    <label htmlFor="">
                                                        How can we improve your experience as a member?
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter answer"

                                                        name='improvementSuggestions'
                                                        value={preferenceForm.improvementSuggestions}
                                                        onChange={preferenceChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="business-submt-btn d-flex justify-content-between">
                                            <div className="business-submt-out-btn">
                                                <button
                                                    type="button"
                                                    onClick={() => handleTabClick(currentStep - 1)}
                                                    className="btn btn-outline-primary mt-4 btn-prev"
                                                >
                                                    Previous Page
                                                </button>
                                            </div>
                                            <div>
                                                <button type='submit' className="btn btn-primary mt-4 btn-next">
                                                    {" "}
                                                    Save and Continue
                                                </button>
                                            </div>
                                        </div>
                                    </form>}
                                {/* Step 5 */}
                                {currentStep == 5 &&
                                    <form onSubmit={stayUpdatedSubmit} className="step">
                                        <div className="row marketing-border-btm py-4 ">
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <h6>I would like to receive emails from Wizbizla regarding</h6>
                                                <p>
                                                    We’d love to keep you informed about promotions, discounts, and
                                                    special offers on our services.
                                                </p>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="row ">
                                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <div className="custom-frm-bx custom-frm-bx-small">
                                                            <div className="form-check check-fm-box-bordr">
                                                                <input
                                                                    className="form-check-input frm-chck-inpt mt-0"
                                                                    type="checkbox"

                                                                    id="checkDefaultprofile-12"
                                                                    name='selectedService'
                                                                    checked={stayUpdated.selectedService}
                                                                    onChange={stayUpdatedChange}
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="checkDefaultprofile-12"
                                                                >
                                                                    Updates on my selected services
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <div className="custom-frm-bx custom-frm-bx-small">
                                                            <div className="form-check check-fm-box-bordr">
                                                                <input
                                                                    className="form-check-input frm-chck-inpt mt-0"
                                                                    type="checkbox"

                                                                    id="checkDefaultprofile-11"
                                                                    name='promotions'
                                                                    checked={stayUpdated.promotions}
                                                                    onChange={stayUpdatedChange}
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="checkDefaultprofile-11"
                                                                >
                                                                    Promotions and discounts
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <div className="custom-frm-bx custom-frm-bx-small">
                                                            <div className="form-check check-fm-box-bordr">
                                                                <input
                                                                    className="form-check-input frm-chck-inpt mt-0"
                                                                    type="checkbox"

                                                                    id="checkDefaultprofile-10"
                                                                    name='offers'
                                                                    checked={stayUpdated.offers}
                                                                    onChange={stayUpdatedChange}
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="checkDefaultprofile-10"
                                                                >
                                                                    Special Offers
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p>
                                                        By subscribing, you'll also receive our newsletter with
                                                        valuable tips and insights for expats in the UAE! Your
                                                        personal information will be processed and stored in
                                                        accordance with Wizbizla’s privacy policy
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="business-submt-btn d-flex justify-content-between">
                                            <div className="business-submt-out-btn">
                                                <button
                                                    type="button"
                                                    onClick={() => handleTabClick(currentStep - 1)}
                                                    className="btn btn-outline-primary mt-4 btn-prev"
                                                >
                                                    Back
                                                </button>
                                            </div>
                                            <div>
                                                <button
                                                    type='submit'
                                                    className="btn btn-primary mt-4 btn-next"
                                                >
                                                    {" "}
                                                    Save and Submit
                                                </button>
                                            </div>
                                        </div>
                                    </form>}
                            </div>
                        </div>
                    </section >
                    <div>
                        <div className="delete-model-section modal fade" id="deleteModal" tabindex="-1" aria-hidden="true"
                            data-bs-backdrop="static"
                            data-bs-keyboard="false"
                        >
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content p-4">
                                    <div className="text-start">
                                        <h3 className='text-black'> UAE SMS (Text message) Verification</h3>
                                        <p>We have sent you an SMS to the following phone number: [Phone Number Here]. Please enter the four digit code below.</p>
                                    </div>
                                    <div
                                        className="custom-frm-bx opt-filed d-flex gap-2 my-4"
                                        onPaste={handleOtpPaste}
                                    >
                                        {otp.map((digit, idx) => (
                                            <input
                                                key={idx}
                                                id={`otp-input-${idx}`}
                                                type="text"
                                                placeholder="0"
                                                className="form-control text-center"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOtpChange(e.target.value, idx)}
                                            />
                                        ))}
                                    </div>
                                    <span className='clr fw-600'>Resend Code</span>
                                    <div className="d-flex gap-2 mt-3">
                                        <button onClick={sendBasket} className="btn deleteBtn ">Continue</button>

                                        <a herf="javascript:void(0)" data-bs-dismiss="modal" onClick={() => setCurrentStep(currentStep + 1)} id="submitBtn" className="btn  deleteBtn delete-not-Btn">Cancel</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="delete-model-section modal fade" id="successModal" tabindex="-1" aria-hidden="true"
                            data-bs-backdrop="static"
                            data-bs-keyboard="false"
                        >
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content p-5">
                                    <div className="text-start">
                                        <h3 className='text-black'> Your Exclusive Welcome Basket is Coming Your Way!</h3>
                                        <p className='mt-4'>Thank you for registering with Wizbizla! As a special welcome, we’re thrilled to offer you a hand-delivered Welcome Basket, right to your door.
                                            Inside, you’ll find exclusive offers and products from trusted local companies—helping you connect with the best services in the UAE.
                                        </p>
                                        <h6 className='mt-3'>Enjoy these great deals and discover what the community has to offer!</h6>
                                    </div>
                                    <div className="d-flex gap-2 mt-3">
                                        <button data-bs-dismiss="modal" className="btn deleteBtn" onClick={() => setCurrentStep(currentStep + 1)}>Continue</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="delete-model-section modal fade" id="failModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static"
                            data-bs-keyboard="false"
                        >
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content p-5">
                                    <div className="text-start">
                                        <h3 className='text-black'> Sorry!</h3>
                                        <p className='mt-4'>According to our records, your account has already received a Welcome Basket from Wizbizla.
                                        </p>
                                        <h6 className='mt-3'>If you believe this is an error or if you have any questions, please don’t hesitate to contact us directly. We’re here to assist you!</h6>
                                    </div>
                                    <div className="d-flex gap-2 mt-3">
                                        <button data-bs-dismiss="modal" className="btn deleteBtn">Continue</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
        </>

    )
}

export default ConsumerProfile;



