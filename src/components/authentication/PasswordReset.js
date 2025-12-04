import React from 'react'
import images from '../../assets/images'
import IntroduceWizbizla from '../../layout/IntroduceWizbizla'
import { Link } from 'react-router-dom'

function PasswordReset() {
  return (
    <section className="check-email-section pass-rest-section">
  <div className="container">
    <div className="row">
      <div className="col-lg-6 col-md-6 col-sm-12 mb-4 d-flex flex-column justify-content-center pe-lg-5 pe-sm-0">
        <form action="" className=''>
          <div className="your-otp-title">
            <div className="check-email-pic">
              <img src={images.resetPassword} alt="" />
            </div>
            <h2 className="mt-3 text-center fw-semibold">Password reset</h2>
            <p className="text-center">
              Your password has been successfully reset. Click below to log in
              magically.
            </p>
          </div>
          <div className="check-email-btn d-flex justify-content-center my-4">
            <Link to='/login' className="btn btn-primary w-100">Continue</Link>
          </div>

          <div className="d-flex justify-content-center back-arrow-btn">
          <span>
            <a href="">
              <i className="fa-solid fa-arrow-left" /> Back to log in
            </a>
          </span>
        </div>

        </form>
        
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12 px-0">
        <IntroduceWizbizla/>
      </div>
    </div>
  </div>
</section>

  )
}

export default PasswordReset
