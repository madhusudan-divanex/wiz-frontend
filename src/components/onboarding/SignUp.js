import React, { useEffect, useState } from 'react'
import IntroduceWizbizla from '../../layout/IntroduceWizbizla'
import { Link, useNavigate } from 'react-router-dom'
import { handleChange } from '../../utils/GlobalFunction'
import { postApiData } from '../../services/api'
import { toast } from 'react-toastify'
import Loader from '../../layout/Loader'
import ReactIntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
function SignUp() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [countryCode, setCountryCode] = useState('')
    const [isPassword, setIsPassword] = useState(true)
    const referedBy=localStorage.getItem('referedBy')
    const [signUpForm, setSignUpForm] = useState({ firstName: '', lastName: '', email: '', contactNumber: '', password: '', })
    const userType = sessionStorage.getItem('userType')
    useEffect(() => {
        if (!userType) {
            navigate('/')
        } else {
            setSignUpForm({ ...signUpForm, role: userType })
        }
    }, [])
    async function handleSignUp(e) {
        e.preventDefault()
        if (signUpForm.contactNumber?.toString()?.length > 15 || signUpForm.contactNumber?.toString()?.length < 9) {
            toast.error('Please enter a valid phone number')
            return
        }
        if(referedBy){
            signUpForm.referedBy=referedBy
        }
        setLoading(true)
        try {
            const result = await postApiData('api/auth/sign-up', signUpForm)
            if (result.status) {
                localStorage.removeItem('referedBy')
                localStorage.removeItem('token')
                localStorage.setItem('email', signUpForm.email)
                localStorage.setItem('userId', result.userId)
                toast.success('OTP sent to the register email')
                navigate('/otp')
            } else {
                toast.error(result.message)
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            {loading && <Loader />}<section className="onboarding-second-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 mt-3 d-flex flex-column justify-content-center pe-lg-5 pe-sm-0">
                            <div className='onbording-signup-frm'>
                                <div className="d-flex justify-content-center back-arrow-btn">
                                    {/* <span>
                                <Link to='/' className='text-black'>
                                    <i className="fa-solid fa-arrow-left" /> Back
                                </Link>
                            </span> */}
                                </div>
                                <div className="onboarding-second-title mb-4">
                                    <h2 className="mt-3 text-center fw-semibold">
                                        Wizbizla is personalized for you.
                                    </h2>
                                    <p className="text-center">
                                        {/* Create a password to start your membership. */}
                                       Create a password to start your membership.
                                    </p>
                                </div>
                                <form action="" onSubmit={handleSignUp}>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-12 col-sm-12 ">
                                            <div className="custom-frm-bx">
                                                {/* <label htmlFor="">
                                            First name <span className="start-icon strt-mb-icon">*</span>
                                        </label> */}
                                                <input
                                                    type="text"
                                                    required
                                                    name='firstName'
                                                    value={signUpForm.firstName}
                                                    onChange={handleChange(setSignUpForm)}
                                                    className="form-control"
                                                    placeholder="First Name"
                                                    defaultValue=""
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12 col-sm-12 ">
                                            <div className="custom-frm-bx">
                                                {/* <label htmlFor="">
                                            Last name <span className="start-icon strt-mb-icon">*</span>
                                        </label> */}
                                                <input
                                                    type="text"
                                                    required
                                                    onChange={handleChange(setSignUpForm)}
                                                    className="form-control"
                                                    value={signUpForm.lastName}
                                                    name='lastName'
                                                    placeholder="Last Name"
                                                    defaultValue=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="custom-frm-bx">
                                        {/* <label htmlFor="">
                                    Email <span className="start-icon strt-mb-icon">*</span>
                                </label> */}
                                        <input
                                            type="email"
                                            name='email'
                                            required
                                            className="form-control"
                                            onChange={handleChange(setSignUpForm)}
                                            placeholder="Email"
                                            value={signUpForm.email}
                                            defaultValue=""
                                        />
                                    </div>
                                    {/* <div className="custom-frm-bx">
                                <label htmlFor="">
                                    Contact number <span className="start-icon">*</span>
                                </label>
                                <input
                                    type="number"
                                    required
                                    className="form-control"
                                    placeholder={+971}
                                    name='contactNumber'
                                    value={signUpForm.contactNumber}
                                    onChange={handleChange(setSignUpForm)}
                                    defaultValue=""
                                />
                            </div> */}

                                    <div className="custom-frm-bx">
                                        {/* <label htmlFor="">
                                    Contact number <span className="start-icon strt-mb-icon">*</span>
                                </label> */}
                                        <div class="input-group form-control">
                                            {/* <span class="input-group-text bg-white" id="basic-addon1" style={{color : "#626884"}} >+971</span> */}
                                            {/* <input class="form-control" type="number"
                                    required
                                    className="form-control ps-0"
                                    placeholder="Mobile Number"
                                    name='contactNumber'
                                    value={signUpForm.contactNumber}
                                    onChange={handleChange(setSignUpForm)}
                                    defaultValue=""
                                    style={{borderLeft : "0"}} /> */}
                                            <ReactIntlTelInput
                                                preferredCountries={['us', 'gb', 'in']}
                                                defaultValue={signUpForm.contactNumber} // <-- use defaultValue instead of value
                                                className="form-control border-0 shadow-none pay-coutry-list"
                                                id="phone"
                                                placeholder="Mobile Number"
                                                onPhoneNumberChange={(status, value, countryData, number, id) => {
                                                    // Update state only when needed (like on blur or submit)
                                                    setSignUpForm(prev => ({ ...prev, contactNumber: number }));
                                                }}
                                                inputProps={{
                                                    name: 'phone',
                                                    required: true,
                                                }}
                                                containerClassName="intl-tel-input"
                                                fieldId="phone"
                                            />
                                        </div>
                                    </div>
                                    <div className="custom-frm-bx pass-toggle-sec">
                                        {/* <label htmlFor="">
                                    Password <span className="start-icon strt-mb-icon">*</span>
                                </label> */}
                                        <input
                                            type={isPassword ? 'text' : "password"}
                                            className="form-control"
                                            required
                                            name='password'
                                            value={signUpForm.password}
                                            onChange={handleChange(setSignUpForm)}
                                            placeholder="Password (Minimum 6 Characters)"
                                            defaultValue=""
                                        />
                                        <div className='pass-eye pass-snd-bx' onClick={() => setIsPassword(!isPassword)}>
                                            {isPassword ? <i className="fa-regular fa-eye-slash" /> : <i className="fa-regular fa-eye" />}
                                        </div>

                                    </div>
                                    <div className="new-pass-btn d-flex my-4">
                                        <button type='submit' className="btn btn-primary w-100"> Sign Up</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 px-0 ">
                            <IntroduceWizbizla />
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default SignUp
