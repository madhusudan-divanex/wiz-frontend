import React, { useState } from 'react'
import slideIcon from '../../assets/images/slide-icon.png'
import IntroduceWizbizla from '../../layout/IntroduceWizbizla'
import { Link, useNavigate } from 'react-router-dom'
import { handleChange } from '../../utils/GlobalFunction'
import { toast } from 'react-toastify'
import { postApiData } from '../../services/api'
import Loader from '../../layout/Loader'
function Login() {
    const [loading,setLoading]=useState(false)
    const [loginForm,setLoginForm]=useState({email:'',password:'',isRemember:false})
    const navigate=useNavigate()
    async function handleLogin(e) {
        e.preventDefault()
        if(loginForm.email=='' || loginForm.password==''){
            toast.error("Please enter the details")
            return
        }
        setLoading(true)
        try {
            const result= await postApiData('api/auth/sign-in',loginForm)
            if(result.status){
                localStorage.removeItem('token')
                localStorage.setItem('userId',result.userId)
                localStorage.setItem('email',loginForm.email)
                sessionStorage.setItem('isRemember',loginForm.isRemember)
                toast.success('OTP sent to the registered email')
                navigate('/otp')
            }else{
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return (
        <>
        {loading&&<Loader/> }<section className="login-sec">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-4 d-flex flex-column justify-content-center pe-lg-5 pe-md-5 pe-sm-0">
                        <div className=''>
                        <h2>Log in</h2>
                        <p>Welcome back! Please enter your details.</p>
                        <form action="" onSubmit={handleLogin} className='mt-4'>
                            <div className="custom-frm-bx">
                                <label htmlFor="">
                                    Email <span className="start-icon">*</span>
                                </label>
                                <input
                                    type="email"
                                    name='email'
                                    value={loginForm.email}
                                    onChange={handleChange(setLoginForm)}
                                    className="form-control"
                                    placeholder="Enter email address"
                                    defaultValue=""
                                />
                            </div>
                            <div className="custom-frm-bx">
                                <label htmlFor="">
                                    Password <span className="start-icon">*</span>
                                </label>
                                <input
                                    type="password"
                                    name='password'
                                    value={loginForm.password}
                                    onChange={handleChange(setLoginForm)}
                                    className="form-control"
                                    placeholder="********"
                                    defaultValue=""
                                />
                            </div>
                            <div className="login-forgot-sec d-flex justify-content-between mt-2">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name='isRemember'
                                        defaultValue=""
                                        checked={loginForm.isRemember}
                                        onChange={handleChange(setLoginForm)}
                                        id="checkDefault"
                                    />
                                    <label className="form-check-label" htmlFor="checkDefault">
                                        Remember for 30 days
                                    </label>
                                </div>
                                <Link to="/forgot-mail">Forgot Password?</Link>
                            </div>
                            <div className="login-btn d-flex justify-content-center mt-4">
                                <button className="btn btn-primary w-100" type='submit'>Sign In</button>
                            </div>
                            <div className="signup-sec mt-3 d-flex justify-content-center">
                                <span>
                                    Don’t have an account ? <Link to="/sign-up">Sign Up</Link>
                                </span>
                            </div>
                        </form>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 px-0">
                        <IntroduceWizbizla />
                    </div>
                </div>
            </div>
        </section>
        </>


    )
}

export default Login
