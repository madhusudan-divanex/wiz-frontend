import React, { useEffect, useState } from 'react'
import images from '../assets/images'
const slideIcon = images.slideIcon;
const slideImg = images.hero100;
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const OnBoardingSecond = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        password: "",
        role: "consumer"
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/profile", { replace: true });
            return;
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (values.password.length < 6) {
            toast.error('Please enter at least 6 characters');
            return;
        }
        const role = localStorage.getItem("role");

        try {
            const res = await axios.post('https://api.wizbizlaonboard.com/api/auth/register', values);
            if (res.status) {
                toast.success("User registered successfully");
                navigate('/profile');
                localStorage.setItem("token", res.data.token)
                localStorage.removeItem("role");
            } else {
                toast.error(res.data.message || "Registration failed");
            }
        } catch (error) {
            console.log("error handle Submit data", error);
            toast.error(error.response?.data?.message || "Server error");
        }
    };
    return (
        <section className="onboarding-second-section pt-0">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 mt-3 d-flex flex-column justify-content-center pe-lg-5 pe-sm-0">
                        <div className="d-flex justify-content-center back-arrow-btn">
                            {/* <span>
                                    <Link to="/">
                                        <i className="fa-solid fa-arrow-left" /> Back
                                    </Link>
                                </span> */}
                        </div>
                        <div className="onboarding-second-title mb-4">
                            <h2 className="mt-3 text-center" style={{ lineHeight: "35px" }}>
                                Join as Founding Provider Connect with UAE expats
                            </h2>
                            <p className="text-center">
                                Create a password to start
                            </p>
                        </div>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="custom-frm-bx">
                                        <label htmlFor=""></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="First Name "
                                            name='firstName'
                                            value={values.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="custom-frm-bx">
                                        <label htmlFor="Last"></label>
                                        <input
                                            id='Last'
                                            type="text"
                                            className="form-control"
                                            placeholder="Last Name"
                                            name='lastName'
                                            value={values.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="custom-frm-bx">
                                <label htmlFor=""></label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    name='email'
                                    value={values.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="custom-frm-bx">
                                <label htmlFor=""></label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1">+971</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Mobile Number"
                                        name='contactNumber'
                                        value={values.contactNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="custom-frm-bx pass-toggle-sec">
                                <label htmlFor=""></label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Password (Minimum 6 Characters)"
                                    name='password'
                                    value={values.password}
                                    onChange={handleChange}
                                    // minLength={6}
                                    required
                                />
                                <i
                                    className={`fa-regular ${showPassword ? "fa-eye" : "fa-eye-slash"} position-absolute end-0 translate-middle-y me-3 cursor-pointer`}
                                    style={{ right: '10px', top: "55px", cursor: 'pointer' }}
                                    onClick={() => setShowPassword(prev => !prev)} // 👈 toggle state
                                />
                            </div>
                            <div className="new-pass-btn d-flex my-4">
                                <button type='submit' className="btn btn-primary w-100"> Sign Up</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="slider-container">
                            <div className="slides">
                                <div className="slide">
                                    {/* <div className="tooltip-box">
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
                                    </div> */}
                                    <div className="slide-back-img">
                                        <img src={slideImg} alt="" />
                                    </div>
                                    {/* <div className="bottom-content">
                                        <h2>The UAE’s First Accredited Services Marketplace</h2>
                                        <p>
                                            Connecting Expats With Trusted Professionals
                                        </p>
                                    </div> */}
                                </div>
                                <div className="slide">
                                    {/* <div className="tooltip-box">
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
                                    </div> */}
                                    <div className="slide-back-img">
                                        <img src={slideImg} alt="" />
                                    </div>
                                    <div className="bottom-content">
                                        <h2>The UAE’s First Accredited Services Marketplace</h2>
                                        <p>
                                            Connecting Expats With Trusted Professionals
                                        </p>
                                    </div>
                                </div>
                                <div className="slide">
                                    {/* <div className="tooltip-box">
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
                                    </div> */}
                                    <div className="slide-back-img">
                                        <img src={slideImg} alt="" />
                                    </div>
                                    <div className="bottom-content">
                                        <h2>The UAE’s First Accredited Services Marketplace</h2>
                                        <p>
                                            Connecting Expats With Trusted Professionals
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="slider-controls">
                                <div className="arrow-btn" onclick="prevSlide()">
                                    <i className="fa-solid fa-chevron-left" />
                                </div>
                                <div className="slider-dots" id="dots" />
                                <div className="arrow-btn" onclick="nextSlide()">
                                    <i className="fa-solid fa-chevron-right" />
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default OnBoardingSecond