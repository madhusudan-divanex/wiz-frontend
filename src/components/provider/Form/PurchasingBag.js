import React, { useState } from 'react'
import images from '../../assets/images'
const slideIcon = images.slideIcon;
const slideImg = images.sliderImg;
const onFirst = images.onboardingFirst;
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PurchasingBag = () => {
    const userId=localStorage.getItem('userId')
    const [selectedRole, setSelectedRole] = useState('');
    const navigate = useNavigate();

    const handleCheckboxChange = (e) => {
        const { value } = e.target;
        setSelectedRole(value);
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        if (!selectedRole) {
            toast.error('Please select a role.');
            return;
        }

        localStorage.setItem('role', selectedRole); // Save role in localStorage
        navigate('/second'); // Replace with your actual next route
    };
        async function getUserProfile() {
            try {
                const result = await getSecureApiData(`api/provider/profile-get/${userId}`)
                if (result.status) {
                    setSelectedRole(result.data?.type)
                } else {
                    goToPrevStep()
                }
            } catch (error) {
                toast.error(error)
            }
        }
        useEffect(() => {
            getUserProfile()
        }, [userId])
    
    return (
        <>
            <Header />
            <section className="onboarding-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 mt-3 d-flex flex-column justify-content-center pe-lg-5 pe-sm-0">
                            <div className="onboarding-title">
                                <h2 className="mt-3 text-center fw-semibold">
                                    Wizbizla is personalized for you.
                                </h2>
                                <p className="text-center">Select the user type</p>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-6 col-sm-12">
                                    <div className="form-check-card mb-3 position-relative">
                                        <div className="form-check form-check-first">
                                            <input
                                                className="form-check-input form-chk-inpt styled-check"
                                                type="checkbox"
                                                defaultValue=""
                                                id="consumerCheck"
                                                name="userType"
                                                value="consumer"
                                                checked={selectedRole === 'consumer'}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label
                                                className="form-check-label card-style"
                                                htmlFor="consumerCheck"
                                            >
                                                <div className="d-flex">
                                                    <div className="icon-box me-3">
                                                        <img src={onFirst} alt="" />
                                                    </div>
                                                    <div>
                                                        <h5 className="mb-2 fw-semibold">Consumers</h5>
                                                        <p className="mb-0 small text-muted">
                                                            I’d like to use meet and connect with service providers
                                                            on the Wizbizla platform
                                                        </p>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-check-card position-relative">
                                        <div className="form-check form-check-first">
                                            <input
                                                className="form-check-input form-chk-inpt styled-check"
                                                type="checkbox"
                                                defaultValue=""
                                                id="providerCheck"
                                                name="userType"
                                                value="provider"
                                                checked={selectedRole === 'provider'}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label
                                                className="form-check-label card-style"
                                                htmlFor="providerCheck"
                                            >
                                                <div className="d-flex">
                                                    <div className="icon-box me-3">
                                                        <img src={onFirst} alt="" />
                                                    </div>
                                                    <div>
                                                        <h5 className="mb-2 fw-semibold">Service Providers</h5>
                                                        <p className="mb-0 small text-muted">
                                                            I’d like to showcase my services to potential customers
                                                            on the Wizbizla platform
                                                        </p>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="onboarding-btn mt-4">
                                <button type='button' className="btn btn-primary w-100" onClick={handleSignIn}>Sign In</button>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="slider-container">
                                <div className="slides">
                                    <div className="slide">
                                        <div className="tooltip-box">
                                            <div className="tooltip-box-content">
                                                <img src={slideIcon} alt="" />
                                                <span>Dispute Resolution</span>
                                            </div>
                                            <div className="slide-send-arrow-request">
                                                <p>
                                                    This is where we can try to resolve service issues. If you
                                                    have an issue with a service provider, our customer support
                                                    team is available to assist you.
                                                </p>
                                                <a href="javascript:void(0)">
                                                    <i className="fa-solid fa-arrow-right slide-right-arrow" />{" "}
                                                    Send a request
                                                </a>
                                            </div>
                                        </div>
                                        <div className="slide-back-img">
                                            <img src={slideImg} alt="" />
                                        </div>
                                        <div className="bottom-content">
                                            <h2>Introducing Wizbizla</h2>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                                do eiusmod tempor incididunt ut labore et dolore magna.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="slide">
                                        <div className="tooltip-box">
                                            <div className="tooltip-box-content">
                                                <img src={slideIcon} alt="" />
                                                <span>Dispute Resolution</span>
                                            </div>
                                            <div className="slide-send-arrow-request">
                                                <p>
                                                    This is where we can try to resolve service issues. If you
                                                    have an issue with a service provider, our customer support
                                                    team is available to assist you.
                                                </p>
                                                <a href="javascript:void(0)">
                                                    <i className="fa-solid fa-arrow-right slide-right-arrow" />{" "}
                                                    Send a request
                                                </a>
                                            </div>
                                        </div>
                                        <div className="slide-back-img">
                                            <img src={slideImg} alt="" />
                                        </div>
                                        <div className="bottom-content">
                                            <h2>Introducing Wizbizla</h2>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                                do eiusmod tempor incididunt ut labore et dolore magna.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="slide">
                                        <div className="tooltip-box">
                                            <div className="tooltip-box-content">
                                                <img src={slideIcon} alt="" />
                                                <span>Dispute Resolution</span>
                                            </div>
                                            <div className="slide-send-arrow-request">
                                                <p>
                                                    This is where we can try to resolve service issues. If you
                                                    have an issue with a service provider, our customer support
                                                    team is available to assist you.
                                                </p>
                                                <a href="javascript:void(0)">
                                                    <i className="fa-solid fa-arrow-right slide-right-arrow" />{" "}
                                                    Send a request
                                                </a>
                                            </div>
                                        </div>
                                        <div className="slide-back-img">
                                            <img src={slideImg} alt="" />
                                        </div>
                                        <div className="bottom-content">
                                            <h2>Introducing Wizbizla</h2>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                                do eiusmod tempor incididunt ut labore et dolore magna.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="slider-controls">
                                    <div className="arrow-btn" onclick="prevSlide()">
                                        <i className="fa-solid fa-chevron-left" />
                                    </div>
                                    <div className="slider-dots" id="dots" />
                                    <div className="arrow-btn" onclick="nextSlide()">
                                        <i className="fa-solid fa-chevron-right" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default PurchasingBag