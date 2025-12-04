import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { postApiData } from '../../services/api';

function ScamAlert() {
  const [email,setEmail]=useState('')
    async function newsLetterSubmit(e){
      e.preventDefault();
      if(!email){
        toast.error("Please enter email")
        return
      }
      try {
        const result = await postApiData(`api/users/subscribe-newsletter`,{email})
        if (result.success) {
          setEmail('')
          toast.success(result.message)
        } else {
          toast.error(result.message)
        }
      } catch (error) {
        
      }
    }
  return (
    <div className='newBnr'>
  <section className="scamtip-bnnr scam-alert-bnnr">
    <div className="container">
      <div className="row">
        <div className="col-lg-5">
          <img src="assets/images/scam-images/w-scamtip-icon.png" alt="" />
          <h1>Scam Alert</h1>
          <p className="text-white">
            Wizbizla offers information and resources on different types of
            scams, along with key warning signs to watch for.
          </p>
        </div>
      </div>
    </div>
  </section>
  <section className="featured-tip-sec featured-scam tp-space">
    <div className="container">
      <h3 className="title text-center text-white">Featured Scam Alert</h3>
      <div className="row">
        <div className="col-lg-12">
          <div className="featured-vdo">
            <video controls="">
              <source src="assets/images/wizbizla-intro.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="featured-tip-cards">
            <div className="featured-tip-img">
              <img
                src="assets/images/scam-images/featured-tip-img-01.png"
                alt=""
              />
            </div>
            <a href="javascript:void(0);">
              Beware of Romance Scams - I'm in love with an internet fraudster
            </a>
            <p>How to spot and avoid identity thefy</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="featured-tip-cards">
            <div className="featured-tip-img">
              <img
                src="assets/images/scam-images/featured-tip-img-02.png"
                alt=""
              />
            </div>
            <a href="javascript:void(0);">How scammers target the elderly</a>
            <p>Government grant scam via Facebook</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="featured-tip-cards">
            <div className="featured-tip-img">
              <img
                src="assets/images/scam-images/featured-tip-img-03.png"
                alt=""
              />
            </div>
            <a href="javascript:void(0);">
              Emirates ID scams are the most reported, most expensive
            </a>
            <p>A jaw dropping prPR scam</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="featured-tip-cards">
            <div className="featured-tip-img">
              <img
                src="assets/images/scam-images/featured-tip-img-01.png"
                alt=""
              />
            </div>
            <a href="javascript:void(0);">
              Beware of Romance Scams - I'm in love with an internet fraudster
            </a>
            <p>How to spot and avoid identity thefy</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="featured-tip-cards">
            <div className="featured-tip-img">
              <img
                src="assets/images/scam-images/featured-tip-img-02.png"
                alt=""
              />
            </div>
            <a href="javascript:void(0);">How scammers target the elderly</a>
            <p>Government grant scam via Facebook</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="featured-tip-cards">
            <div className="featured-tip-img">
              <img
                src="assets/images/scam-images/featured-tip-img-03.png"
                alt=""
              />
            </div>
            <a href="javascript:void(0);">
              Emirates ID scams are the most reported, most expensive
            </a>
            <p>A jaw dropping prPR scam</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="featured-tip-cards">
            <div className="featured-tip-img">
              <img
                src="assets/images/scam-images/featured-tip-img-01.png"
                alt=""
              />
            </div>
            <a href="javascript:void(0);">
              Beware of Romance Scams - I'm in love with an internet fraudster
            </a>
            <p>How to spot and avoid identity thefy</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="featured-tip-cards">
            <div className="featured-tip-img">
              <img
                src="assets/images/scam-images/featured-tip-img-02.png"
                alt=""
              />
            </div>
            <a href="javascript:void(0);">How scammers target the elderly</a>
            <p>Government grant scam via Facebook</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="featured-tip-cards">
            <div className="featured-tip-img">
              <img
                src="assets/images/scam-images/featured-tip-img-03.png"
                alt=""
              />
            </div>
            <a href="javascript:void(0);">
              Emirates ID scams are the most reported, most expensive
            </a>
            <p>A jaw dropping prPR scam</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="featured-tip-cards">
            <div className="featured-tip-img">
              <img
                src="assets/images/scam-images/featured-tip-img-01.png"
                alt=""
              />
            </div>
            <a href="javascript:void(0);">
              Beware of Romance Scams - I'm in love with an internet fraudster
            </a>
            <p>How to spot and avoid identity thefy</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="featured-tip-cards">
            <div className="featured-tip-img">
              <img
                src="assets/images/scam-images/featured-tip-img-02.png"
                alt=""
              />
            </div>
            <a href="javascript:void(0);">How scammers target the elderly</a>
            <p>Government grant scam via Facebook</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="featured-tip-cards">
            <div className="featured-tip-img">
              <img
                src="assets/images/scam-images/featured-tip-img-03.png"
                alt=""
              />
            </div>
            <a href="javascript:void(0);">
              Emirates ID scams are the most reported, most expensive
            </a>
            <p>A jaw dropping prPR scam</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="featured-tip-cards">
            <div className="featured-tip-img">
              <img
                src="assets/images/scam-images/featured-tip-img-01.png"
                alt=""
              />
            </div>
            <a href="javascript:void(0);">
              Beware of Romance Scams - I'm in love with an internet fraudster
            </a>
            <p>How to spot and avoid identity thefy</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="featured-tip-cards">
            <div className="featured-tip-img">
              <img
                src="assets/images/scam-images/featured-tip-img-02.png"
                alt=""
              />
            </div>
            <a href="javascript:void(0);">How scammers target the elderly</a>
            <p>Government grant scam via Facebook</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="featured-tip-cards">
            <div className="featured-tip-img">
              <img
                src="assets/images/scam-images/featured-tip-img-03.png"
                alt=""
              />
            </div>
            <a href="javascript:void(0);">
              Emirates ID scams are the most reported, most expensive
            </a>
            <p>A jaw dropping prPR scam</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="featured-tip-cards">
            <div className="featured-tip-img">
              <img
                src="assets/images/scam-images/featured-tip-img-01.png"
                alt=""
              />
            </div>
            <a href="javascript:void(0);">
              Beware of Romance Scams - I'm in love with an internet fraudster
            </a>
            <p>How to spot and avoid identity thefy</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="featured-tip-cards">
            <div className="featured-tip-img">
              <img
                src="assets/images/scam-images/featured-tip-img-02.png"
                alt=""
              />
            </div>
            <a href="javascript:void(0);">How scammers target the elderly</a>
            <p>Government grant scam via Facebook</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="featured-tip-cards">
            <div className="featured-tip-img">
              <img
                src="assets/images/scam-images/featured-tip-img-03.png"
                alt=""
              />
            </div>
            <a href="javascript:void(0);">
              Emirates ID scams are the most reported, most expensive
            </a>
            <p>A jaw dropping prPR scam</p>
          </div>
        </div>
        <div className="custom-pagination dark-pagination">
          <nav aria-label="...">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link link-icon" href="javascript:void(0);">
                  <i className="fas fa-chevron-double-left" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link link-icon" href="javascript:void(0);">
                  <i className="fas fa-chevron-left" />
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="javascript:void(0);">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="javascript:void(0);">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="javascript:void(0);">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="javascript:void(0);">
                  4
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="javascript:void(0);">
                  5
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="javascript:void(0);">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="javascript:void(0);">
                  16
                </a>
              </li>
              <li className="page-item">
                <a className="page-link link-icon" href="javascript:void(0);">
                  <i className="fas fa-chevron-right" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link link-icon" href="javascript:void(0);">
                  <i className="fas fa-chevron-double-right" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </section>
  <section className="scam-empowering-sec tp-space">
    <div className="container">
      <h3 className="title text-white mb-5">
        Empowering expats to{" "}
        <span className="d-block">combat fraud together</span>
      </h3>
      <div className="row">
        <div className="col-lg-3">
          <div className="empowering-cards">
            <span>
              <img
                src="assets/images/scam-images/chat-information.svg"
                alt=""
              />
            </span>
            <h6>
              <a href="javascript:void(0);">Scam Tips</a>
            </h6>
            <p>Stay informed and resilient</p>
            <a href="javascript:void(0);" className="seemore-btn">
              See more <i className="far fa-arrow-right ms-2" />
            </a>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="empowering-cards">
            <span>
              <img src="assets/images/scam-images/chat-01.svg" alt="" />
            </span>
            <h6>
              <a href="javascript:void(0);">Scam Tips</a>
            </h6>
            <p>Empower yourself to recognise the red flags</p>
            <a href="javascript:void(0);" className="seemore-btn">
              See more <i className="far fa-arrow-right ms-2" />
            </a>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="empowering-cards">
            <span>
              <img src="assets/images/scam-images/zoom-text.svg" alt="" />
            </span>
            <h6>
              <a href="javascript:void(0);">Scam case studies</a>
            </h6>
            <p>Understand how scams works</p>
            <a href="javascript:void(0);" className="seemore-btn">
              See more <i className="far fa-arrow-right ms-2" />
            </a>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="empowering-cards">
            <span>
              <img src="assets/images/scam-images/time-fast.svg" alt="" />
            </span>
            <h6>
              <a href="javascript:void(0);">Scam tracker</a>
            </h6>
            <p>Report and research scams to raise awareness</p>
            <a href="javascript:void(0);" className="seemore-btn">
              See more <i className="far fa-arrow-right ms-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="scam-connected-sec">
    <div className="container">
      <div className="scam-connected-innr">
        <div className="row">
          <div className="col-lg-6">
            <h3 className="title mb-3">Stay Connected</h3>
            <p>
              Sign up for our monthly newsletter, Minute with Wizbizla, and stay
              informed with the latest scam tips, alerts, and case studies.
              Follow us on social media for real-time updates and more ways to
              protect yourself
            </p>
          </div>
          <div className="col-lg-6">
            <div className="newsletter">
              <p>Subscribe to our newsletter</p>
              <div className="newsletter-innr">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email address"
                  required
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <button type="button" onClick={newsLetterSubmit}>Send</button>
              </div>
              <a href="javascript:void(0);" target="_blank">
                <img src="assets/images/scam-images/facebook-02.svg" alt="" />
              </a>
              <a href="javascript:void(0);" target="_blank">
                <img src="assets/images/scam-images/new-twitter.svg" alt="" />
              </a>
              <a href="javascript:void(0);" target="_blank">
                <img src="assets/images/scam-images/linkedin-02.svg" alt="" />
              </a>
              <a href="javascript:void(0);" target="_blank">
                <img src="assets/images/scam-images/youtube.svg" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

  )
}

export default ScamAlert
