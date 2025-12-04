import React, { useState } from 'react'
import images from '../../assets/images'

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import IntroduceWizbizla from '../../layout/IntroduceWizbizla';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getApiData } from '../../services/api';
import Loader from '../../layout/Loader';
function ForgotMail() {
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate()
  const [email,setEmail]=useState('')
  async function handleForgot(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const result=await getApiData(`api/auth/forgot-password/${email}`)
      if(result.status){
        toast.success('Reset password email sent!')
        navigate(`/check-mail/${email}`)
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
        {loading&&<Loader/> }<section className="forgot-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 mb-4 d-flex flex-column justify-content-center pe-lg-5 pe-sm-0">
            <form action="" className='' onSubmit={handleForgot}>
              <div className="your-otp-title">
                <div className="otp-pass-pic">
                  <img src={images.passKey} alt="" />
                </div>
               <div className='my-3'>
                 <h2 className="mt-3 text-center fw-semibold">Forgot password?</h2>
                <p className="text-center">
                  Enter your email below and a link wiil be sent to your address to
                  create a new password.
                </p>
               </div>
              </div>
              <div className="custom-frm-bx">
                {/* <label htmlFor="">
                  Email <span className="start-icon">*</span>
                </label> */}
                <input
                  type="email"
                  value={email}
                  required
                  name='email'
                  onChange={(e)=>setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Enter email"
                  defaultValue=""
                />
              </div>
              <div className="forgot-pass-btn d-flex justify-content-center my-4">
                <button type="submit"  className="frm-main-btn w-100">
                  Reset password
                </button>
              </div>
            </form>
            <div className="d-flex justify-content-center back-arrow-btn">
              <span>
                <Link to='/login' className='fs-6'>
                  <i className="fa-solid fa-arrow-left" /> Back to log in
                </Link>
              </span>
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

export default ForgotMail
