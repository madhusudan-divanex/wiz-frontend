import React from 'react'
import images from '../../assets/images'
import IntroduceWizbizla from '../../layout/IntroduceWizbizla'
import { Link, useParams } from 'react-router-dom'
import { getApiData } from '../../services/api'
import { toast } from 'react-toastify'

function CheckMail() {
  const params = useParams()
 async function handleForgot(e) {
    e.preventDefault()
    try {
      const result=await getApiData(`api/auth/forgot-password/${params.email}`)
      if(result.status){
        toast.success('Reset password email sent!')
      }else{
        toast.error(result.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <section className="check-email-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 mb-4 d-flex flex-column justify-content-center pe-lg-5 pe-sm-0">
            <form action="" className=''>
              <div className="your-otp-title">
                <div className="check-email-pic">
                  <img src={images.checkEmail} alt="" />
                </div>
                <h2 className="mt-3 text-center fw-semibold">Check your email</h2>
                <p className="text-center">
                  We sent a password reset link to <span>{params?.email}</span>
                </p>
              </div>
              {/* <div className="check-email-btn d-flex justify-content-center my-4">
                <a href="https://mail.google.com/" target="_blank" className="btn btn-primary w-100">
                  Open email app
                </a>
              </div> */}
              <div className="resend-email-title my-3">
                <h6 className="text-center mb-0">
                  Didn’t receive the email?{" "}
                  <span>
                    <button type='button ' className='clr fw-500' onClick={handleForgot}>Click to resend</button>
                  </span>
                </h6>
              </div>
            </form>
            <div className="d-flex justify-content-center back-arrow-btn">
              <span>
                <Link to="/login">
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

  )
}

export default CheckMail
