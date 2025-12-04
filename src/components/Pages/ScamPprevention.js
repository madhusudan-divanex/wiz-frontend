import React, { useEffect, useState } from 'react'
import images from '../../assets/images'
import '../../assets/css/scam-prevention.css'
import '../../assets/css/responsive.css'
import '../../assets/css/style.css'
import { Link } from 'react-router-dom'
import { postApiData } from '../../services/api'
import { toast } from 'react-toastify'
import { contactData } from '../../utils/GlobalFunction'

function ScamPprevention() {
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
    <div className='scmprev'>
  <section className="scam-prevention-bnnr">
    <div className="container">
      <div className="scam-prevention-content">
        <h5>Safeguarding the Expat Community in the UAE</h5>
        <h1>Scam Prevention Programme</h1>
        <p>
          At Wizbizla, trust and security are at the heart of our mission to
          protect expats in the UAE. We are proud to unveil our Scam Prevention
          Programme—an exclusive initiative designed to tackle the growing
          threat of fraud. Discover how this programme offers unmatched value to
          the expat community.
        </p>
      </div>
    </div>
  </section>
  <section className="category-relations tp-space">
    <div className="container">
      <div className="union-shape-top">
        <img src={images?.scamTopShape} alt="" />
      </div>
      <div className="custom-category">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className="custom-category-img">
              <img
                src={images?.scamProgImg1}
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="custom-category-content">
              <h3>
                What is the Scam <br /> Prevention Programme?
              </h3>
              <p>
                Wizbizla's Scam Prevention Programme is a cutting-edge
                initiative designed to combat fraud in the UAE. Through
                comprehensive measures, we protect expats from scams, educate
                them on how to recognize and avoid fraudulent schemes, and
                create a safer environment for all.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="union-shape-bttm">
        <img src={images?.scamTopShape} alt="" />
      </div>
    </div>
  </section>
  <section className="vision-sec scams-vision tp-space">
    <div className="container position-relative vision-impact reward-container">
      <h3 className="title mb-5 text-white">Key Components of the Programme</h3>
      <div className="row">
        <div className="col-lg-6 impact-cards-main">
          <div className="impact-cards">
            <span>
              <img
                src={images?.scamChatInfo}
                alt=""
              />
            </span>
            <h5>Scam Tips</h5>
            <p>
              We offer a wealth of educational resources, including practical
              tips on how to stay safe and resilient against scams. Our tips
              cover a range of topics, from recognizing phishing attempts to
              understanding common fraud tactics, helping our community members
              stay one step ahead of scammers.
            </p>
          </div>
        </div>
        <div className="col-lg-6 impact-cards-main">
          <div className="impact-cards">
            <span>
              <img src={images?.scamChat1} alt="" />
            </span>
            <h5>Scam Alerts</h5>
            <p>
              Through regular scam alerts, we keep our community updated on the
              latest fraudulent activities. These alerts provide crucial
              information on emerging scams, ensuring that our members remain
              well-informed and prepared to protect themselves.
            </p>
          </div>
        </div>
        <div className="col-lg-6 impact-cards-main">
          <div className="impact-cards">
            <span>
              <img src={images?.scamTeacher1} alt="" />
            </span>
            <h5>Investigations and Case Studies</h5>
            <p>
              We take reported scams seriously. Our team conducts thorough
              investigations into these incidents and develops detailed case
              studies. These case studies illustrate how various scams operate,
              empowering expats to recognize the warning signs and avoid falling
              victim to similar schemes.
            </p>
          </div>
        </div>
        <div className="col-lg-6 impact-cards-main">
          <div className="impact-cards">
            <span>
              <img src={images?.scamTimeFast} alt="" />
            </span>
            <h5>Scam Tracker</h5>
            <p>
              Our Scam Tracker is an interactive tool where members can report
              scams and share their experiences. This collective knowledge helps
              others stay informed and vigilant. The Scam Tracker also serves as
              a valuable resource for conducting background checks on service
              providers before engaging with them, thus preventing potential
              fraud.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="programme-sec tp-space">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6 order-2 order-lg-1">
          <h3 className="title text-white">Why This Programme Matters</h3>
          <p className="text-white mb-3">
            The expat community in the UAE faces unique challenges, and the rise
            in fraud and scams only adds to their concerns. At Wizbizla, we
            understand the importance of a safe and trustworthy environment for
            our members. Our Scam Prevention Programme not only addresses these
            concerns but also reinforces our commitment to consumer protection.
          </p>
          <p className="text-white">
            By validating our members' experiences and providing a platform for
            them to share their stories, we ensure that everyone feels heard and
            believed. This programme highlights our proactive approach to
            safeguarding the community, holding individuals and companies
            accountable for their actions, and promoting a culture of
            transparency and trust.
          </p>
        </div>
        <div className="col-lg-6 order-1 order-lg-2">
          <div className="vision-new-img">
            <img src={images?.scamProgImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="programme-sec resilient-sec tp-space ">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <div className="vision-new-img">
            <img src={images?.scamProgImg2} alt="" />
          </div>
        </div>
        <div className="col-lg-6">
          <h3 className="title text-white">Building a Resilient Community</h3>
          <p className="text-white mb-3">
            The Scam Prevention Programme is more than just a safety measure; it
            is a testament to Wizbizla's dedication to the wellbeing of the
            expat community. By equipping our members with the tools and
            knowledge to combat fraud, we foster a resilient and informed
            community that can confidently navigate the challenges of living in
            the UAE.
          </p>
          <p className="text-white">
            Join us in the fight against fraud. Together, we can create a safer,
            more trustworthy environment for everyone. Through our Scam
            Prevention Programme users can avoid scams, save valuable financial
            resources, and enhance their overall financial security.
          </p>
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
                src={images?.scamChatInfo}
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
              <img src={images?.scamChat1} alt="" />
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
              <img src={images?.scamZoom} alt="" />
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
              <img src={images?.scamTimeFast} alt="" />
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
  <section className="scam-help-sec tp-space">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="scam-help-faq">
            <div className="accordion" id="scam-help">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#help-faq-01"
                    aria-expanded="true"
                  >
                    How can we help?
                  </button>
                </h2>
                <div
                  id="help-faq-01"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#scam-help"
                >
                  <div className="accordion-body">
                    <p>Post your experience and help protect others.</p>
                    <Link to='/report-scam' className="request-btn">
                      <i className="far fa-arrow-right me-2" />
                      Report a scam
                    </Link>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#help-faq-02"
                  >
                    Do you suspect you are being targeted by a scam?
                  </button>
                </h2>
                <div
                  id="help-faq-02"
                  className="accordion-collapse collapse"
                  data-bs-parent="#scam-help"
                >
                  <div className="accordion-body">
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Totam iusto commodi tenetur ea nisi deleniti asperiores
                      magni necessitatibus quia veniam nemo consequatur, ipsa
                      dicta esse vitae ducimus? Autem, rem animi.
                    </p>
                   <Link to='/report-scam' className="request-btn">
                      <i className="far fa-arrow-right me-2" />
                      Report a scam
                    </Link>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#help-faq-03"
                  >
                    Do you think you have been the victim of fraud?
                  </button>
                </h2>
                <div
                  id="help-faq-03"
                  className="accordion-collapse collapse"
                  data-bs-parent="#scam-help"
                >
                  <div className="accordion-body">
                    <p>
                      Lorem ipsum dolor, sit amet consectetur, adipisicing elit.
                      Corporis rem alias quisquam officia. Nostrum ex fuga
                      harum, dolorum pariatur, quibusdam labore ratione
                      voluptatibus ipsa blanditiis, eos nisi cumque quod, magni!
                    </p>
                    <Link to='/report-scam' className="request-btn">
                      <i className="far fa-arrow-right me-2" />
                      Report a scam
                    </Link>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#help-faq-04"
                  >
                    Do you have a scam tip?
                  </button>
                </h2>
                <div
                  id="help-faq-04"
                  className="accordion-collapse collapse"
                  data-bs-parent="#scam-help"
                >
                  <div className="accordion-body">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Perspiciatis modi, aliquam molestias eos at! Facere, fugit
                      iste, dolor quaerat rerum cupiditate. Deleniti voluptas
                      cumque optio minima laudantium voluptates nisi molestias.
                    </p>
                    <Link to='/report-scam' className="request-btn">
                      <i className="far fa-arrow-right me-2 fw-900" />
                      Report a scam
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 text-end d-none d-lg-block">
          <img src={images?.scamHelp} alt="" />
        </div>
      </div>
    </div>
  </section>
  <section className="popular-scam-sec tp-space">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <h3 className="title text-white">
            <span>Top 9 popular Scams</span> in the UAE to watch out for
          </h3>
          <p className="text-white">Wizbizla UAE fraud survey</p>
          <Link to='/report-scam' className="thm-btn light-btn">
            Report a scam
          </Link>
        </div>
        <div className="col-lg-6">
          <ul className="popular-scam-content">
            <li>Online Purchase Scams</li>
            <li>Phishing</li>
            <li>Prize Scams</li>
            <li>Employment Scams</li>
            <li>Tech Support Scams</li>
            <li>Government Agency Imposters</li>
            <li>Counterfeit products</li>
            <li>Advance fee loan</li>
            <li>Home improvements</li>
          </ul>
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
              <a href={cData?.socialMedia?.facebook} target="_blank">
                <img src={images?.scamFacebook} alt="" />
              </a>
              <a href={cData?.socialMedia?.twitter} target="_blank">
                <img src={images?.scamTwitter} alt="" />
              </a>
              <a href={cData?.socialMedia?.linkedin} target="_blank">
                <img src={images?.scamLinkedin} alt="" />
              </a>
              <a href={cData?.socialMedia?.youtube} target="_blank">
                <img src={images?.scamYoutube} alt="" />
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

export default ScamPprevention
