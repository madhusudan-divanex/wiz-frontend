import React, { useEffect, useState } from 'react'
import images from '../../assets/images'
import IntroduceWizbizla from '../../layout/IntroduceWizbizla'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getApiData, postApiData } from '../../services/api'
import Loader from '../../layout/Loader'
import { fetchUserProfile } from '../../redux/features/userSlice'
import { useDispatch } from 'react-redux'

function Otp() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [hasNew, sethasNew] = useState(false)
    const [hasVip, setHasVip] = useState(false)
    const [hasComplete, setHasComplete] = useState(false)
    const [userData, setUserData] = useState({})
    const profileData = JSON.parse(localStorage.getItem('profileData'))
    const [hasMembership, setHasMembership] = useState(false)
    const userId = localStorage.getItem('userId')
    const email = localStorage.getItem('email')
    const token = localStorage.getItem('token')
    const isRemember = sessionStorage.getItem('isRemember')
    const [otp, setOtp] = useState(['', '', '', '']);
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpCode = otp.join('');
        if (otpCode.length < 4) {
            toast.error('Please enter complete 4-digit OTP');
            return;
        }
        setLoading(true)
        const data = { userId, code: otpCode, isRemember };
        try {
            const result = await postApiData('api/auth/verify-otp', data);
            if (result.status) {
                setUserData(result.user)
                localStorage.setItem('profileData', JSON.stringify(result.user))
                localStorage.setItem('token', result.token)
                sethasNew(result.isNew)
                setHasMembership(result.isPurchase)
                setHasComplete(result?.isComplete)
                setHasVip(result.isVip)
                // toast.success('Verify Success');
                // if (result.isNew) {
                //     navigate('/login')
                // } else {
                //     if (result.isPurchase) {
                //         navigate('/profile')
                //     } else {

                //         if (result.user.role === 'consumer') {
                //             navigate('/consumer-membership');
                //         } else {
                //             navigate('/membership');
                //         }
                //     }
                // }
                dispatch(fetchUserProfile()).unwrap()
                setLoading(false)
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    };

    async function handleResendOtp(e) {
        e.preventDefault();
        setLoading(true)
        try {
            const result = await getApiData(`api/auth/resend-otp/${userId}`);
            if (result.status) {
                toast.success('OTP Resend to your email!');
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (token && profileData) {
            if (hasMembership && profileData.role == 'provider') {
                if (userData?.status === 'live' || userData?.status == 'cdraft' || userData?.status == 'tdraft') {
                    navigate('/provider/dashboard')
                }
                else {
                    if (hasComplete && userData.status == '') {
                        navigate('/provider/profile')
                    }
                    else if (hasComplete && userData.status == 'pending') {
                        navigate('/thank-you')
                    }
                    else if (hasVip) {
                        navigate('/vip')
                    } else {
                        navigate('/profile');
                    }
                }
            }
            else if (hasMembership && profileData.role == 'consumer') {
                if (hasComplete && userData.status == '') {
                    navigate('/consumer/profile')
                }
                else if (hasComplete && userData.status == 'pending') {
                    navigate('/thank-you')
                } else if(hasComplete && userData.status == 'live') {
                    navigate('/consumer/edit-profile');
                }

            } else {
                if (profileData.role === 'provider') {
                    navigate('/membership');
                } else if (profileData.role === 'consumer') {
                    navigate('/consumer-membership');
                }
            }
        }
    }, [token, hasNew, hasMembership, hasVip, profileData, hasComplete, userData, navigate]);


    return (
        <>
            {loading && <Loader />}<section className="opt-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 mb-4 d-flex flex-column justify-content-center pe-lg-5 pe-sm-0">
                            <form className="" onSubmit={handleSubmit}>
                                <div className="your-otp-title">
                                    <div className="otp-pass-pic">
                                        <img src={images.enterPass} alt="Enter Password" />
                                    </div>
                                    <h2 className="mt-3 text-center fw-semibold">Enter Verification Code</h2>
                                    <p className="text-center ">We’ve sent a code via email to <span className='text-lowercase'>{email || 'test@gmail.com'}</span></p>
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

                                <div className="login-btn d-flex justify-content-center mt-4">
                                    <button type="submit" className="btn btn-primary w-100">
                                        Submit Code
                                    </button>
                                </div>

                                <div className="resend-otp-title my-4">
                                    <h6 className="text-center mb-0 fw-400">
                                        Experiencing issues receiving the code?
                                    </h6>
                                    <p className="text-center">
                                        <button className='text-decoration-underline clr fw-500' type='button' onClick={handleResendOtp}>Resend Code</button>
                                    </p>
                                </div>
                                <div className="d-flex justify-content-center back-arrow-btn">
                                    <span>
                                        <Link to='/login'>
                                            <i className="fa-solid fa-arrow-left" /> Back to log in
                                        </Link>
                                    </span>
                                </div>

                            </form>

                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 px-0">
                            <IntroduceWizbizla />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Otp;
