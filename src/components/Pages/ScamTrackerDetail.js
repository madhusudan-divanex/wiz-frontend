import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getApiData, getSecureApiData, securePostData } from '../../services/api'
import { toast } from 'react-toastify'

function ScamTrackerDetail() {
  const params = useParams()
  const id = params.id
  const [scamData, setScamData] = useState({})
  const userId = localStorage.getItem('userId')
  const [isBookmark, setIsBookmark] = useState(false)
  const fetchScamData = async () => {
    try {
      const result = await getApiData(
        `get-scam/${id}?userId=${userId}`
      );

      if (result.success) {
        setScamData(result.data);
        setIsBookmark(result?.isBookmark)
      }
    } catch (error) {
      console.log("Error fetching scams:", error);
    }
  };


  useEffect(() => {
    fetchScamData()

  }, [id])
  async function bookMarkProfile() {
    const data = { userId, trackerBookmark: id }
    try {
      const result = await securePostData('api/users/bookmark-profile', data)
      if (result.success) {

        fetchScamData()
      }

    } catch (error) {

    }
  }
  return (
    <div className='newBnr'>
      <section
        className="scamtip-bnnr scam-alert-bnnr"
        style={{
          backgroundImage: "url(assets/images/scam-images/scam-tracker-bnnr.png)"
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <img src="/assets/images/scam-images/w-scamtip-icon.png" alt="" />
              <h1>Scam Tracker</h1>
              <p className="text-white ">
                The Scam Tracker is a comprehensive platform that allows users to
                report and share information about scams they have encountered. By
                collecting and analyzing this data, we create a robust database of
                scam activities. This collective effort helps identify and
                understand new scam tactics, strengthening the community’s ability
                to recognize and avoid potential threats.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="loockup-sec tp-space category-relations ">
        <div className="container">
          <Link to="/scam-tracker" className="back-btn">
            <i className="far fa-chevron-left me-2" />
            Back to search
          </Link>
          <div className="scam-loockup-cards scam-loockup-dtl">
            <p className="mb-0">Scam ID: #12341235125</p>
            <div className="scam-loockup-tp">
              <a href="#" onClick={()=>bookMarkProfile()}>
                {scamData?.title}{" "}
                {isBookmark?<span className="fa-solid fa-bookmark" />:<span className="fa-regular fa-bookmark" />}
              </a>
              <div className="scam-loockup-icon">
                <span>
                  <img src="/assets/images/scam-images/anonymous-fill.svg" alt="" />
                </span>
                <span>
                  <img src="/assets/images/scam-images/anonymous-fill.svg" alt="" />
                </span>
                <span>
                  <img
                    src="/assets/images/scam-images/anonymous-outline.svg"
                    alt=""
                  />
                </span>
                <span>
                  <img
                    src="/assets/images/scam-images/anonymous-outline.svg"
                    alt=""
                  />
                </span>
                <span>
                  <img
                    src="/assets/images/scam-images/anonymous-outline.svg"
                    alt=""
                  />
                </span>
              </div>
            </div>
            <p className="mb-4">
              {scamData?.description}
            </p>
            <div className="row">
              <div className="col-lg-6">
                <ul className="scam-loockup-bttm-list">
                  <li>
                    <span>
                      <img src="/assets/images/scam-images/calendar-02.svg" alt="" />
                    </span>
                    <div>
                      <h5>Date reported</h5>
                      <p>{new Date(scamData?.dateReported)?.toLocaleDateString('en-GB', {                                                                                        day: '2-digit',                                                                                        month: '2-digit',                                                                                        year: 'numeric'                                                                                    })}</p>
                    </div>
                  </li>
                  <li>
                    <span>
                      <img src="/assets/images/scam-images/profile.svg" alt="" />
                    </span>
                    <div>
                      <h5>Format</h5>
                      <p>{scamData?.format}</p>
                    </div>
                  </li>
                  <li>
                    <span>
                      <img src="/assets/images/scam-images/location-01.svg" alt="" />
                    </span>
                    <div>
                      <h5>Area</h5>
                      <p>Downtown</p>
                    </div>
                  </li>
                  <li>
                    <span>
                      <img src="/assets/images/scam-images/coins-02.svg" alt="" />
                    </span>
                    <div>
                      <h5>Amount of money lost</h5>
                      <p>{scamData?.amountOfLost}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul className="scam-loockup-bttm-list">
                  <li>
                    <span>
                      <img
                        src="/assets/images/scam-images/information-circle.svg"
                        alt=""
                      />
                    </span>
                    <div>
                      <h5>Scam ID number</h5>
                      <p>{scamData?._id}</p>
                    </div>
                  </li>
                  <li>
                    <span>
                      <img src="/assets/images/scam-images/library.svg" alt="" />
                    </span>
                    <div>
                      <h5>Scam Type</h5>
                      <p>{scamData?.scamType}</p>
                    </div>
                  </li>
                  <li>
                    <span>
                      <img
                        src="/assets/images/scam-images/dashboard-square-01.svg"
                        alt=""
                      />
                    </span>
                    <div>
                      <h5>Service Category</h5>
                      <p>{scamData.serviceCategory}</p>
                    </div>
                  </li>
                  <li>
                    <span>
                      <img
                        src="/assets/images/scam-images/document-validation.svg"
                        alt=""
                      />
                    </span>
                    <div>
                      <h5>Reported to appropriate authorities</h5>
                      <p>{scamData.reportToAuthoritise ? 'Yes' : 'No'}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container pt-100">
          <div className="row">
            <div className="col-lg-4">
              <div className="experiance-cards">
                <h4>Similar to your experience?</h4>
                <a href="javascript:void(0);" className="thm-lg-btn">
                  I Experienced This Too
                </a>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="experiance-cards">
                <h4>Media or law enforcement?</h4>
                <a href="javascript:void(0);" className="thm-lg-btn">
                  Inquire About This Report
                </a>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="experiance-cards">
                <h4>Wish to dispute this scam report?</h4>
                <a href="javascript:void(0);" className="thm-lg-btn">
                  Contact BBB
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  )
}

export default ScamTrackerDetail
