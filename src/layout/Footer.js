import React, { useEffect, useState } from 'react'
import images from '../assets/images'
import { Link } from 'react-router-dom';
import { contactData } from '../utils/GlobalFunction';

function Footer() {
  const [cData,setCData]=useState({});
  async function getCData() {
    const data=await contactData()
    setCData(data);
  }
  useEffect(()=>{ 
    getCData()
  },[])
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-12">
            <div className="ftr-abt">
              <img src={images.lightLogo} alt="" />
              <div className='d-flex gap-2'>

              <h5>Talk to us</h5>
              <a target='_blank' href={cData?.whatsappLink}>

              <img src={images.whatsappLogo} className='whatsapp-logo mb-0' />
              </a>
              </div>
              <p>
                {cData?.address1} <br /> {cData?.address2}
              </p>
              <a href={`mailto:${cData?.email}`}>{cData?.email}</a>
              <a href={`tel:+${cData?.mobileFirst}`}>+{cData?.mobileFirst}</a>
              <a href={`tel:+${cData?.mobileSecond}`}>+{cData?.mobileSecond}</a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-6">
            <h4 className="ftr-title">For Consumers</h4>
            <ul className="ftr-link">
              <li>
                <Link to='/find-provider'>Find a Trusted Service Provider</Link>
              </li>
              <li>
                <Link to="/provider-membership-benefit" >Premium Membership</Link>
              </li>
              <li>
                <Link to="/consumer-membership-benefit" >Community Benefits</Link>
              </li>
              <li>
                <Link to="/scam-prevention">Scam Prevention Program</Link>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); /* Your logic here */ }}>Share Your Feedback</a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); /* Your logic here */ }}>File A Complaint</a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); /* Your logic here */ }}>Request Bespoke Service</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 col-6">
            <h4 className="ftr-title">For Service Providers</h4>
            <ul className="ftr-link">
              <li>
                <Link to="/accreditation-process" >Apply for Accreditation</Link>
              </li>
              <li>
                <Link to='/consumer-membership-benefit' >Membership Benefits</Link>
              </li>
              <li>
                <Link to="/reference-programme">
                  Enroll in our Reference Program
                </Link>
              </li>
              <li>
                <Link to="/loyalty-rewards" >Join Our Loyalty Program</Link>
              </li>
              <li>
                <Link to="/standards-excellence">
                  Partner Standards for Excellence
                </Link>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); /* Your logic here */ }}>Partnership Inquires</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 col-6">
            <h4 className="ftr-title">About Wizbizla</h4>
            <ul className="ftr-link">
              <li>
                <Link to='/mission-vision' >Mission &amp; Vision</Link>
              </li>
              <li>
                <Link to="/about-wizbizla" >The Story Behind Wizbizla</Link>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); /* Your logic here */ }}>Service Provider Verification</a>
              </li>
              <li>
                <Link to="/scam-tracker" >Wizbizla Scam Tracker</Link>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); /* Your logic here */ }}>In the News</a>
              </li>
              <li>
                <Link to="/podcast" >Expats In Dubai Podcast</Link>
              </li>
              <li>
                <Link to="faq" >FAQs</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="ftr-bttm">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12">
              <p className="mb-0 text-dark">All rights reserved Wizbizla © 2024</p>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <ul className="bttm-link d-flex justify-content-lg-end">
                <li>
                  <Link to='/privacy-policy'>Privacy Policy</Link>
                </li>
                <li>
                  <Link to='/disclaimer'>Disclaimer</Link>
                </li>
                <li>
                  <Link to='/terms-of-use'>Terms of Use</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
