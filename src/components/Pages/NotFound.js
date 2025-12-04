import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='newBnr'>
      <section className="error-sec tp-space">
  <div className="container">
    <div className="row align-items-center">
      <div className="col-lg-6 order-2 order-lg-1">
        <div className="error-content">
          <h3>
            OOPS! <br /> WE’LL BE RIGHT BACK.
          </h3>
          <h5>Error</h5>
          <p>
            Sorry, something went wrong. Rest assured, we are working hard to
            fix the problem as soon as possible.{" "}
          </p>
          <p>
            In the meantime, try refreshing this page or visiting our homepage.
          </p>
          <Link to='/' className="thm-btn">
            Back to Home
          </Link>
        </div>
      </div>
      <div className="col-lg-6 order-1 order-lg-2">
        <img src="assets/images/404-img.png" alt="" />
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default NotFound
