import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { postApiData } from '../../services/api';
import { contactData } from '../../utils/GlobalFunction';

function CaseStudy() {
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
   const [cData,setCData]=useState({});
    async function getCData() {
      const data=await contactData()
      setCData(data);
    }
    useEffect(()=>{ 
      getCData()
    },[])
  return (
    <div className='newBnr'>
  <section
    className="scamtip-bnnr scam-alert-bnnr"
    style={{
      backgroundImage: "url(assets/images/scam-images/case-studies-bnnr.png)"
    }}
  >
    <div className="container">
      <div className="row">
        <div className="col-lg-5">
          <img src="assets/images/scam-images/w-scamtip-icon.png" alt="" />
          <h1>Case Studies</h1>
          <p className="text-white ">
            Wizbizla investigators have conducted some in-depth studies to give
            consumers and businesses a better understanding of how each specific
            scam works.
          </p>
        </div>
      </div>
    </div>
  </section>
  <section className="financial-fraud-sec tp-space">
    <div className="container">
      <h3 className="title text-white mb-3">
        The Bullet Proof Plan for Financial Fraud
      </h3>
      <p className="text-white mb-5">
        One of the really sinister things about financial fraud is that it is so
        often disguised as legitimate financial advice. Indeed, this is the very
        nature of ‘fraud’. If somebody was just indiscriminately robbing your
        money we would call it ‘theft’, not ‘fraud’. Instead fraud typically has
        to involve some element of deception, one where the victim is deceived
        into being robbed. Often such fraud leaves a paper trail and a fairly
        clear avenue of legal recourse afterwards. But some forms of financial
        fraud involve complex arrangements which protect the fraudsters even
        after the crime has been committed. It’s something I’m all too familiar
        with and which I call ‘the bullet proof plan’ in my book{" "}
        <a href="javascript:void(0);">The Great Fraud Fightback</a>.
      </p>
      <div className="row">
        <div className="col-lg-6">
          <h4 className="innr-title fw-500 mb-3">Watch the trailer</h4>
          <div className="featured-vdo">
            <video controls="">
              <source src="assets/images/wizbizla-intro.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="col-lg-6">
          <h4 className="innr-title fw-500 mb-3">Listen to the full story</h4>
          <div className="audio-cards">
            <h5>Expats in Dubai</h5>
            <div className="audio-book">
              <div className="audio-book-img">
                <img
                  src="assets/images/scam-images/audio-book-img-01.png"
                  alt=""
                />
              </div>
              <div className="audio-book-content">
                <p>
                  Think fitness life - secrets of a personal trainer and
                  nutrition coach
                </p>
                <div className="audio-book-control">
                  <button type="button">
                    <i className="fas fa-pause" />
                  </button>
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div className="progress-bar" style={{ width: "75%" }} />
                  </div>
                </div>
                <div className="audio-text">
                  <span>4:12</span>
                  <span>8:24</span>
                </div>
              </div>
            </div>
          </div>
          <h4 className="innr-title fw-500 mb-2">Read the Overview</h4>
          <div className="audio-overview-card">
            <div className="audio-overview-img">
              <img
                src="assets/images/scam-images/audio-overview-img.png"
                alt=""
              />
            </div>
            <div className="audio-overview-content">
              <h5>
                The devil is the paperwork and sometimes he’s hidden so well
                he’s bullet proof
              </h5>
              <p>
                One of the really sinister things about financial fraud is it is
                so often disguse...
              </p>
              <a href="javascript:void(0);">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="financial-fraud-sec financial-light tp-space">
    <div className="container">
      <h3 className="title mb-3">The Bullet Proof Plan for Financial Fraud</h3>
      <p className="mb-5">
        One of the really sinister things about financial fraud is that it is so
        often disguised as legitimate financial advice. Indeed, this is the very
        nature of ‘fraud’. If somebody was just indiscriminately robbing your
        money we would call it ‘theft’, not ‘fraud’. Instead fraud typically has
        to involve some element of deception, one where the victim is deceived
        into being robbed. Often such fraud leaves a paper trail and a fairly
        clear avenue of legal recourse afterwards. But some forms of financial
        fraud involve complex arrangements which protect the fraudsters even
        after the crime has been committed. It’s something I’m all too familiar
        with and which I call ‘the bullet proof plan’ in my book{" "}
        <a href="javascript:void(0);">The Great Fraud Fightback</a>.
      </p>
      <div className="row">
        <div className="col-lg-6">
          <h4 className="innr-title fw-500 mb-3 text-dark">
            Watch the trailer
          </h4>
          <div className="featured-vdo">
            <video controls="">
              <source src="assets/images/wizbizla-intro.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="col-lg-6">
          <h4 className="innr-title fw-500 mb-3 text-dark">
            Listen to the full story
          </h4>
          <div className="audio-cards">
            <h5>Expats in Dubai</h5>
            <div className="audio-book">
              <div className="audio-book-img">
                <img
                  src="assets/images/scam-images/audio-book-img-01.png"
                  alt=""
                />
              </div>
              <div className="audio-book-content">
                <p>
                  Think fitness life - secrets of a personal trainer and
                  nutrition coach
                </p>
                <div className="audio-book-control">
                  <button type="button">
                    <i className="fas fa-pause" />
                  </button>
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div className="progress-bar" style={{ width: "75%" }} />
                  </div>
                </div>
                <div className="audio-text">
                  <span>4:12</span>
                  <span>8:24</span>
                </div>
              </div>
            </div>
          </div>
          <h4 className="innr-title fw-500 mb-2 text-dark">
            Read the Overview
          </h4>
          <div className="audio-overview-card">
            <div className="audio-overview-img">
              <img
                src="assets/images/scam-images/audio-overview-img.png"
                alt=""
              />
            </div>
            <div className="audio-overview-content">
              <h5>
                The devil is the paperwork and sometimes he’s hidden so well
                he’s bullet proof
              </h5>
              <p>
                One of the really sinister things about financial fraud is it is
                so often disguse...
              </p>
              <a href="javascript:void(0);">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="financial-fraud-sec tp-space">
    <div className="container">
      <h3 className="title text-white mb-3">
        The Bullet Proof Plan for Financial Fraud
      </h3>
      <p className="text-white mb-5">
        One of the really sinister things about financial fraud is that it is so
        often disguised as legitimate financial advice. Indeed, this is the very
        nature of ‘fraud’. If somebody was just indiscriminately robbing your
        money we would call it ‘theft’, not ‘fraud’. Instead fraud typically has
        to involve some element of deception, one where the victim is deceived
        into being robbed. Often such fraud leaves a paper trail and a fairly
        clear avenue of legal recourse afterwards. But some forms of financial
        fraud involve complex arrangements which protect the fraudsters even
        after the crime has been committed. It’s something I’m all too familiar
        with and which I call ‘the bullet proof plan’ in my book{" "}
        <a href="javascript:void(0);">The Great Fraud Fightback</a>.
      </p>
      <div className="row">
        <div className="col-lg-6">
          <h4 className="innr-title fw-500 mb-3">Watch the trailer</h4>
          <div className="featured-vdo">
            <video controls="">
              <source src="assets/images/wizbizla-intro.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="col-lg-6">
          <h4 className="innr-title fw-500 mb-3">Listen to the full story</h4>
          <div className="audio-cards">
            <h5>Expats in Dubai</h5>
            <div className="audio-book">
              <div className="audio-book-img">
                <img
                  src="assets/images/scam-images/audio-book-img-01.png"
                  alt=""
                />
              </div>
              <div className="audio-book-content">
                <p>
                  Think fitness life - secrets of a personal trainer and
                  nutrition coach
                </p>
                <div className="audio-book-control">
                  <button type="button">
                    <i className="fas fa-pause" />
                  </button>
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div className="progress-bar" style={{ width: "75%" }} />
                  </div>
                </div>
                <div className="audio-text">
                  <span>4:12</span>
                  <span>8:24</span>
                </div>
              </div>
            </div>
          </div>
          <h4 className="innr-title fw-500 mb-2">Read the Overview</h4>
          <div className="audio-overview-card">
            <div className="audio-overview-img">
              <img
                src="assets/images/scam-images/audio-overview-img.png"
                alt=""
              />
            </div>
            <div className="audio-overview-content">
              <h5>
                The devil is the paperwork and sometimes he’s hidden so well
                he’s bullet proof
              </h5>
              <p>
                One of the really sinister things about financial fraud is it is
                so often disguse...
              </p>
              <a href="javascript:void(0);">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="category-relations victim-fraud tp-space">
    <div className="container">
      <div className="union-shape-top">
        <img src="assets/images/union.png" alt="" />
      </div>
      <div className="cards-bg" />
      <div className="custom-category">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className="custom-category-img">
              <img
                src="assets/images/scam-images/victim-fraud-img.png"
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="custom-category-content">
              <h3>Do you think you have been the victim of fraud?</h3>
              <p className="mb-4">
                Tell us your story and let Wizbizla investigate and develop it
                into a case study. We recommend that you also notify the local
                authorities.
              </p>
              <a href="javascript:void(0);" className="thm-btn">
                Share your story
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="union-shape-bttm">
        <img src="assets/images/union-shape-03.png" alt="" />
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
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                />
                <button type="button" onClick={newsLetterSubmit}>Send</button>
              </div>
              <a href={cData?.socialMedia?.facebook} target="_blank">
                <img src="assets/images/scam-images/facebook-02.svg" alt="" />
              </a>
              <a href={cData?.socialMedia?.twitter} target="_blank">
                <img src="assets/images/scam-images/new-twitter.svg" alt="" />
              </a>
              <a href={cData?.socialMedia?.linkedin} target="_blank">
                <img src="assets/images/scam-images/linkedin-02.svg" alt="" />
              </a>
              <a href={cData?.socialMedia?.youtube} target="_blank">
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

export default CaseStudy
