import React, { useEffect, useState } from 'react'
import images from '../../assets/images'
import { Link } from 'react-router-dom'
import { getApiData } from '../../services/api';

function ScamTracker() {
  const [totalScams, setTotalScams] = useState(0)
  const [scamData, setScamData] = useState([]);
  const [format, setFormat] = useState('')
  const [scamType, setScamType] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,setTotalPages]=useState(0)
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');

  const fetchScams = async (pageNumber = currentPage, searchQuery = search) => {
    try {
      const result = await getApiData(
        `get-report-scam?page=${pageNumber}&search=${encodeURIComponent(searchQuery)}&type=${format}&scamType=${scamType}`
      );

      if (result.status) {
        setScamData(result.scams || []);
        setCurrentPage(result.currentPage);
        setTotalPages(result.totalPages);
        setTotalScams(result.totalScams);
      }
    } catch (error) {
      console.log("Error fetching scams:", error);
    }
  };


  useEffect(() => {
    setTimeout(() => {
      fetchScams();
    }, 500)

  }, [currentPage, search, format, scamType]);
  const generatePages = () => {
    let pages = [];

    if (totalPages <= 7) {
      // show all pages
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // large pagination display
      if (currentPage > 3) pages.push(1);
      if (currentPage > 4) pages.push("dots-left");

      let start = Math.max(1, currentPage - 1);
      let end = Math.min(totalPages, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 3) pages.push("dots-right");
      if (currentPage < totalPages - 2) pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePages();
  const handleFirst = () => setCurrentPage(1);
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handleLast = () => setCurrentPage(totalPages);
  return (
    <>
      <section
        className="scamtip-bnnr scam-alert-bnnr"
      // style={{
      //   backgroundImage: "url(assets/images/scam-images/scam-tracker-bnnr.png)"
      // }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <img src={images?.scamTip} alt="" />
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
      <section className="tracker-work-sec tp-space">
        <div className="container">
          <h3 className="title text-white">How Wizbizla's Scam Tracker Works</h3>
          <div className="row">
            <div className="col-lg-3">
              <div className="tracker-cards">
                <span>
                  <img src={images?.scamWarning} alt="" />
                </span>
                <h4>Submit a Report</h4>
                <p>Submit a report using our guided 'Report a Scam' form.</p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="tracker-cards">
                <span>
                  <img src={images?.scamBookSearch} alt="" />
                </span>
                <h4>Internal Review</h4>
                <p>
                  Our team of investigators will audit the information and reach out
                  to you if we need additional information.
                </p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="tracker-cards">
                <span>
                  <img src={images?.scamLearning} alt="" />
                </span>
                <h4>Publish The Report</h4>
                <p>
                  Once the information is verified, your report will be published on
                  the website. You will be notified if your report should be
                  submitted as a business complaint.
                </p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="tracker-cards">
                <span>
                  <img src={images?.scamShare} alt="" />
                </span>
                <h4>Share with Partners</h4>
                <p>
                  We will share your report with governmental agencies, and law
                  enforcement to help shut down scammers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="loockup-sec tp-space" style={{ background: '#1C1C1C' }}>
        <div className="container">
          <div className="loockup-filter">
            <h4 className="innr-title fw-400 mb-2">All Fields</h4>
            <div className="loockup-filter-innr">
              <span className="far fa-search" />
              <input
                type="text"
                className="form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Look up Scam By / All fields"
              />
              <button type="button">Search</button>
            </div>
            <div className="filter-tag">
              <a href="javascript:void(0);" onClick={() => setScamType('')}>All</a>
              <a href="javascript:void(0);" onClick={() => setScamType('Phising')}>Phishing</a>
              <a href="javascript:void(0);" onClick={() => setScamType('Investment Fraud')}>Investment Fraud</a>
              <a href="javascript:void(0);" onClick={() => setScamType('Job Scam')}>Job Scam</a>
              <a href="javascript:void(0);" onClick={() => setScamType('Online Shopping Scam')}>Online Shopping Scam</a>
            </div>
          </div>
          <div className="scam-loockup">
            <h4 className="innr-title fw-400 mb-2">Search Results ({totalScams})</h4>
            {scamData?.length > 0 &&
              scamData?.map((item, key) =>
                <div className="scam-loockup-cards scam-yllw-cards" key={key}>
                  <p className="mb-0">Scam ID: #{item?._id?.slice(-10)}</p>
                  <div className="scam-loockup-tp">
                    <Link to={`/scam-tracker-detail/${item?.title}/${item?._id}`}>
                      {item?.title}
                    </Link>
                    <div className="scam-loockup-icon">
                      <span>
                        <img
                          src={images?.scamAnonymousFill}
                          alt=""
                        />
                      </span>
                      <span>
                        <img
                          src={images?.scamAnonymousFill}
                          alt=""
                        />
                      </span>
                      <span>
                        <img
                          src={images?.scamAnonymousOutline}
                          alt=""
                        />
                      </span>
                      <span>
                        <img
                          src={images?.scamAnonymousOutline}
                          alt=""
                        />
                      </span>
                      <span>
                        <img
                          src={images?.scamAnonymousOutline}
                          alt=""
                        />
                      </span>
                    </div>
                  </div>
                  <p>
                    {item?.description?.slice(0, 600)}
                  </p>
                  <div className="scam-loockup-bttm">
                    <span>
                      <img
                        src={images?.scamCoin1}
                        className="me-2"
                        alt=""
                      />
                      Money lost: <em>{item?.amountOfLost} AED</em>
                    </span>
                    <span>
                      <img
                        src={images?.scamSearch1}
                        className="me-2"
                        alt=""
                      />
                      Scam Type: <em>{item?.scamType}</em>
                    </span>
                    <span>
                      <img
                        src={images?.scamCalendar1}
                        className="me-2"
                        alt=""
                      />
                      Date reported: <em>{new Date(item?.dateReported)?.toLocaleDateString('en-GB', {                                                                                        day: '2-digit',                                                                                        month: '2-digit',                                                                                        year: 'numeric'                                                                                    })}</em>
                    </span>
                  </div>
                </div>)}
            <div className="scam-loockup-cards scam-yllw-cards">
              <p className="mb-0">Scam ID: #12341235125</p>
              <div className="scam-loockup-tp">
                <Link to='/scam-tracker-detail'>
                  Phishing&nbsp;- Amazon / imposter
                </Link>
                <div className="scam-loockup-icon">
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <p>
                I received a call from Amazon and it was a voice message indicating
                that there was a purchase of $1,000 made to my account and if I
                didn't make that purchase, then press #1. I pressed #1 and spoke
                with a gentleman. I told him that I was looking at my Amazon account
                and my last purchase was in July. He told me that Apple Airpods were
                bought and mailed to 49 Arcadia Ct., Albany, NY. He went on to
                suggest that my identity must have been taken and that it was
                possible if I was out shopping.
              </p>
              <div className="scam-loockup-bttm">
                <span>
                  <img
                    src={images?.scamCoin1}
                    className="me-2"
                    alt=""
                  />
                  Money lost: <em>20,000.000 AED</em>
                </span>
                <span>
                  <img
                    src={images?.scamSearch1}
                    className="me-2"
                    alt=""
                  />
                  Scam Type: <em>Pet Scam</em>
                </span>
                <span>
                  <img
                    src={images?.scamCalendar1}
                    className="me-2"
                    alt=""
                  />
                  Date reported: <em>21/06/2024</em>
                </span>
              </div>
            </div>
            <div className="scam-loockup-cards scam-yllw-cards">
              <p className="mb-0">Scam ID: #12341235125</p>
              <div className="scam-loockup-tp">
                <Link to='/scam-tracker-detail'>
                  Phishing&nbsp;- Amazon / imposter
                </Link>
                <div className="scam-loockup-icon">
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <p>
                I received a call from Amazon and it was a voice message indicating
                that there was a purchase of $1,000 made to my account and if I
                didn't make that purchase, then press #1. I pressed #1 and spoke
                with a gentleman. I told him that I was looking at my Amazon account
                and my last purchase was in July. He told me that Apple Airpods were
                bought and mailed to 49 Arcadia Ct., Albany, NY. He went on to
                suggest that my identity must have been taken and that it was
                possible if I was out shopping.
              </p>
              <div className="scam-loockup-bttm">
                <span>
                  <img
                    src={images?.scamCoin1}
                    className="me-2"
                    alt=""
                  />
                  Money lost: <em>20,000.000 AED</em>
                </span>
                <span>
                  <img
                    src={images?.scamSearch1}
                    className="me-2"
                    alt=""
                  />
                  Scam Type: <em>Pet Scam</em>
                </span>
                <span>
                  <img
                    src={images?.scamCalendar1}
                    className="me-2"
                    alt=""
                  />
                  Date reported: <em>21/06/2024</em>
                </span>
              </div>
            </div>
            <div className="scam-loockup-cards scam-yllw-cards">
              <p className="mb-0">Scam ID: #12341235125</p>
              <div className="scam-loockup-tp">
                <Link to='/scam-tracker-detail'>
                  Phishing&nbsp;- Amazon / imposter
                </Link>
                <div className="scam-loockup-icon">
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <p>
                I received a call from Amazon and it was a voice message indicating
                that there was a purchase of $1,000 made to my account and if I
                didn't make that purchase, then press #1. I pressed #1 and spoke
                with a gentleman. I told him that I was looking at my Amazon account
                and my last purchase was in July. He told me that Apple Airpods were
                bought and mailed to 49 Arcadia Ct., Albany, NY. He went on to
                suggest that my identity must have been taken and that it was
                possible if I was out shopping.
              </p>
              <div className="scam-loockup-bttm">
                <span>
                  <img
                    src={images?.scamCoin1}
                    className="me-2"
                    alt=""
                  />
                  Money lost: <em>20,000.000 AED</em>
                </span>
                <span>
                  <img
                    src={images?.scamSearch1}
                    className="me-2"
                    alt=""
                  />
                  Scam Type: <em>Pet Scam</em>
                </span>
                <span>
                  <img
                    src={images?.scamCalendar1}
                    className="me-2"
                    alt=""
                  />
                  Date reported: <em>21/06/2024</em>
                </span>
              </div>
            </div>
            <div className="scam-loockup-cards scam-yllw-cards">
              <p className="mb-0">Scam ID: #12341235125</p>
              <div className="scam-loockup-tp">
                <Link to='/scam-tracker-detail'>
                  Phishing&nbsp;- Amazon / imposter
                </Link>
                <div className="scam-loockup-icon">
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <p>
                I received a call from Amazon and it was a voice message indicating
                that there was a purchase of $1,000 made to my account and if I
                didn't make that purchase, then press #1. I pressed #1 and spoke
                with a gentleman. I told him that I was looking at my Amazon account
                and my last purchase was in July. He told me that Apple Airpods were
                bought and mailed to 49 Arcadia Ct., Albany, NY. He went on to
                suggest that my identity must have been taken and that it was
                possible if I was out shopping.
              </p>
              <div className="scam-loockup-bttm">
                <span>
                  <img
                    src={images?.scamCoin1}
                    className="me-2"
                    alt=""
                  />
                  Money lost: <em>20,000.000 AED</em>
                </span>
                <span>
                  <img
                    src={images?.scamSearch1}
                    className="me-2"
                    alt=""
                  />
                  Scam Type: <em>Pet Scam</em>
                </span>
                <span>
                  <img
                    src={images?.scamCalendar1}
                    className="me-2"
                    alt=""
                  />
                  Date reported: <em>21/06/2024</em>
                </span>
              </div>
            </div>
            <div className="scam-loockup-cards scam-yllw-cards">
              <p className="mb-0">Scam ID: #12341235125</p>
              <div className="scam-loockup-tp">
                <Link to='/scam-tracker-detail'>
                  Phishing&nbsp;- Amazon / imposter
                </Link>
                <div className="scam-loockup-icon">
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <p>
                I received a call from Amazon and it was a voice message indicating
                that there was a purchase of $1,000 made to my account and if I
                didn't make that purchase, then press #1. I pressed #1 and spoke
                with a gentleman. I told him that I was looking at my Amazon account
                and my last purchase was in July. He told me that Apple Airpods were
                bought and mailed to 49 Arcadia Ct., Albany, NY. He went on to
                suggest that my identity must have been taken and that it was
                possible if I was out shopping.
              </p>
              <div className="scam-loockup-bttm">
                <span>
                  <img
                    src={images?.scamCoin1}
                    className="me-2"
                    alt=""
                  />
                  Money lost: <em>20,000.000 AED</em>
                </span>
                <span>
                  <img
                    src={images?.scamSearch1}
                    className="me-2"
                    alt=""
                  />
                  Scam Type: <em>Pet Scam</em>
                </span>
                <span>
                  <img
                    src={images?.scamCalendar1}
                    className="me-2"
                    alt=""
                  />
                  Date reported: <em>21/06/2024</em>
                </span>
              </div>
            </div>
            <div className="scam-loockup-cards scam-yllw-cards">
              <p className="mb-0">Scam ID: #12341235125</p>
              <div className="scam-loockup-tp">
                <Link to='/scam-tracker-detail'>
                  Phishing&nbsp;- Amazon / imposter
                </Link>
                <div className="scam-loockup-icon">
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <p>
                I received a call from Amazon and it was a voice message indicating
                that there was a purchase of $1,000 made to my account and if I
                didn't make that purchase, then press #1. I pressed #1 and spoke
                with a gentleman. I told him that I was looking at my Amazon account
                and my last purchase was in July. He told me that Apple Airpods were
                bought and mailed to 49 Arcadia Ct., Albany, NY. He went on to
                suggest that my identity must have been taken and that it was
                possible if I was out shopping.
              </p>
              <div className="scam-loockup-bttm">
                <span>
                  <img
                    src={images?.scamCoin1}
                    className="me-2"
                    alt=""
                  />
                  Money lost: <em>20,000.000 AED</em>
                </span>
                <span>
                  <img
                    src={images?.scamSearch1}
                    className="me-2"
                    alt=""
                  />
                  Scam Type: <em>Pet Scam</em>
                </span>
                <span>
                  <img
                    src={images?.scamCalendar1}
                    className="me-2"
                    alt=""
                  />
                  Date reported: <em>21/06/2024</em>
                </span>
              </div>
            </div>
            <div className="scam-loockup-cards scam-yllw-cards">
              <p className="mb-0">Scam ID: #12341235125</p>
              <div className="scam-loockup-tp">
                <Link to='/scam-tracker-detail'>
                  Phishing&nbsp;- Amazon / imposter
                </Link>
                <div className="scam-loockup-icon">
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <p>
                I received a call from Amazon and it was a voice message indicating
                that there was a purchase of $1,000 made to my account and if I
                didn't make that purchase, then press #1. I pressed #1 and spoke
                with a gentleman. I told him that I was looking at my Amazon account
                and my last purchase was in July. He told me that Apple Airpods were
                bought and mailed to 49 Arcadia Ct., Albany, NY. He went on to
                suggest that my identity must have been taken and that it was
                possible if I was out shopping.
              </p>
              <div className="scam-loockup-bttm">
                <span>
                  <img
                    src={images?.scamCoin1}
                    className="me-2"
                    alt=""
                  />
                  Money lost: <em>20,000.000 AED</em>
                </span>
                <span>
                  <img
                    src={images?.scamSearch1}
                    className="me-2"
                    alt=""
                  />
                  Scam Type: <em>Pet Scam</em>
                </span>
                <span>
                  <img
                    src={images?.scamCalendar1}
                    className="me-2"
                    alt=""
                  />
                  Date reported: <em>21/06/2024</em>
                </span>
              </div>
            </div>
            <div className="scam-loockup-cards scam-yllw-cards">
              <p className="mb-0">Scam ID: #12341235125</p>
              <div className="scam-loockup-tp">
                <Link to='/scam-tracker-detail'>
                  Phishing&nbsp;- Amazon / imposter
                </Link>
                <div className="scam-loockup-icon">
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <p>
                I received a call from Amazon and it was a voice message indicating
                that there was a purchase of $1,000 made to my account and if I
                didn't make that purchase, then press #1. I pressed #1 and spoke
                with a gentleman. I told him that I was looking at my Amazon account
                and my last purchase was in July. He told me that Apple Airpods were
                bought and mailed to 49 Arcadia Ct., Albany, NY. He went on to
                suggest that my identity must have been taken and that it was
                possible if I was out shopping.
              </p>
              <div className="scam-loockup-bttm">
                <span>
                  <img
                    src={images?.scamCoin1}
                    className="me-2"
                    alt=""
                  />
                  Money lost: <em>20,000.000 AED</em>
                </span>
                <span>
                  <img
                    src={images?.scamSearch1}
                    className="me-2"
                    alt=""
                  />
                  Scam Type: <em>Pet Scam</em>
                </span>
                <span>
                  <img
                    src={images?.scamCalendar1}
                    className="me-2"
                    alt=""
                  />
                  Date reported: <em>21/06/2024</em>
                </span>
              </div>
            </div>
            <div className="scam-loockup-cards scam-yllw-cards">
              <p className="mb-0">Scam ID: #12341235125</p>
              <div className="scam-loockup-tp">
                <Link to='/scam-tracker-detail'>
                  Phishing&nbsp;- Amazon / imposter
                </Link>
                <div className="scam-loockup-icon">
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <p>
                I received a call from Amazon and it was a voice message indicating
                that there was a purchase of $1,000 made to my account and if I
                didn't make that purchase, then press #1. I pressed #1 and spoke
                with a gentleman. I told him that I was looking at my Amazon account
                and my last purchase was in July. He told me that Apple Airpods were
                bought and mailed to 49 Arcadia Ct., Albany, NY. He went on to
                suggest that my identity must have been taken and that it was
                possible if I was out shopping.
              </p>
              <div className="scam-loockup-bttm scam-yllw-cards">
                <span>
                  <img
                    src={images?.scamCoin1}
                    className="me-2"
                    alt=""
                  />
                  Money lost: <em>20,000.000 AED</em>
                </span>
                <span>
                  <img
                    src={images?.scamSearch1}
                    className="me-2"
                    alt=""
                  />
                  Scam Type: <em>Pet Scam</em>
                </span>
                <span>
                  <img
                    src={images?.scamCalendar1}
                    className="me-2"
                    alt=""
                  />
                  Date reported: <em>21/06/2024</em>
                </span>
              </div>
            </div>
            <div className="scam-loockup-cards scam-yllw-cards">
              <p className="mb-0">Scam ID: #12341235125</p>
              <div className="scam-loockup-tp">
                <Link to='/scam-tracker-detail'>
                  Phishing&nbsp;- Amazon / imposter
                </Link>
                <div className="scam-loockup-icon">
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <p>
                I received a call from Amazon and it was a voice message indicating
                that there was a purchase of $1,000 made to my account and if I
                didn't make that purchase, then press #1. I pressed #1 and spoke
                with a gentleman. I told him that I was looking at my Amazon account
                and my last purchase was in July. He told me that Apple Airpods were
                bought and mailed to 49 Arcadia Ct., Albany, NY. He went on to
                suggest that my identity must have been taken and that it was
                possible if I was out shopping.
              </p>
              <div className="scam-loockup-bttm">
                <span>
                  <img
                    src={images?.scamCoin1}
                    className="me-2"
                    alt=""
                  />
                  Money lost: <em>20,000.000 AED</em>
                </span>
                <span>
                  <img
                    src={images?.scamSearch1}
                    className="me-2"
                    alt=""
                  />
                  Scam Type: <em>Pet Scam</em>
                </span>
                <span>
                  <img
                    src={images?.scamCalendar1}
                    className="me-2"
                    alt=""
                  />
                  Date reported: <em>21/06/2024</em>
                </span>
              </div>
            </div>
            <div className="scam-loockup-cards scam-yllw-cards">
              <p className="mb-0">Scam ID: #12341235125</p>
              <div className="scam-loockup-tp">
                <Link to='/scam-tracker-detail'>
                  Phishing&nbsp;- Amazon / imposter
                </Link>
                <div className="scam-loockup-icon">
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <p>
                I received a call from Amazon and it was a voice message indicating
                that there was a purchase of $1,000 made to my account and if I
                didn't make that purchase, then press #1. I pressed #1 and spoke
                with a gentleman. I told him that I was looking at my Amazon account
                and my last purchase was in July. He told me that Apple Airpods were
                bought and mailed to 49 Arcadia Ct., Albany, NY. He went on to
                suggest that my identity must have been taken and that it was
                possible if I was out shopping.
              </p>
              <div className="scam-loockup-bttm">
                <span>
                  <img
                    src={images?.scamCoin1}
                    className="me-2"
                    alt=""
                  />
                  Money lost: <em>20,000.000 AED</em>
                </span>
                <span>
                  <img
                    src={images?.scamSearch1}
                    className="me-2"
                    alt=""
                  />
                  Scam Type: <em>Pet Scam</em>
                </span>
                <span>
                  <img
                    src={images?.scamCalendar1}
                    className="me-2"
                    alt=""
                  />
                  Date reported: <em>21/06/2024</em>
                </span>
              </div>
            </div>
            <div className="scam-loockup-cards scam-yllw-cards">
              <p className="mb-0">Scam ID: #12341235125</p>
              <div className="scam-loockup-tp">
                <Link to='/scam-tracker-detail'>
                  Phishing&nbsp;- Amazon / imposter
                </Link>
                <div className="scam-loockup-icon">
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <p>
                I received a call from Amazon and it was a voice message indicating
                that there was a purchase of $1,000 made to my account and if I
                didn't make that purchase, then press #1. I pressed #1 and spoke
                with a gentleman. I told him that I was looking at my Amazon account
                and my last purchase was in July. He told me that Apple Airpods were
                bought and mailed to 49 Arcadia Ct., Albany, NY. He went on to
                suggest that my identity must have been taken and that it was
                possible if I was out shopping.
              </p>
              <div className="scam-loockup-bttm">
                <span>
                  <img
                    src={images?.scamCoin1}
                    className="me-2"
                    alt=""
                  />
                  Money lost: <em>20,000.000 AED</em>
                </span>
                <span>
                  <img
                    src={images?.scamSearch1}
                    className="me-2"
                    alt=""
                  />
                  Scam Type: <em>Pet Scam</em>
                </span>
                <span>
                  <img
                    src={images?.scamCalendar1}
                    className="me-2"
                    alt=""
                  />
                  Date reported: <em>21/06/2024</em>
                </span>
              </div>
            </div>
            <div className="scam-loockup-cards scam-yllw-cards">
              <p className="mb-0">Scam ID: #12341235125</p>
              <div className="scam-loockup-tp">
                <Link to='/scam-tracker-detail'>
                  Phishing&nbsp;- Amazon / imposter
                </Link>
                <div className="scam-loockup-icon">
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <p>
                I received a call from Amazon and it was a voice message indicating
                that there was a purchase of $1,000 made to my account and if I
                didn't make that purchase, then press #1. I pressed #1 and spoke
                with a gentleman. I told him that I was looking at my Amazon account
                and my last purchase was in July. He told me that Apple Airpods were
                bought and mailed to 49 Arcadia Ct., Albany, NY. He went on to
                suggest that my identity must have been taken and that it was
                possible if I was out shopping.
              </p>
              <div className="scam-loockup-bttm">
                <span>
                  <img
                    src={images?.scamCoin1}
                    className="me-2"
                    alt=""
                  />
                  Money lost: <em>20,000.000 AED</em>
                </span>
                <span>
                  <img
                    src={images?.scamSearch1}
                    className="me-2"
                    alt=""
                  />
                  Scam Type: <em>Pet Scam</em>
                </span>
                <span>
                  <img
                    src={images?.scamCalendar1}
                    className="me-2"
                    alt=""
                  />
                  Date reported: <em>21/06/2024</em>
                </span>
              </div>
            </div>
            <div className="scam-loockup-cards scam-yllw-cards">
              <p className="mb-0">Scam ID: #12341235125</p>
              <div className="scam-loockup-tp">
                <Link to='/scam-tracker-detail'>
                  Phishing&nbsp;- Amazon / imposter
                </Link>
                <div className="scam-loockup-icon">
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousFill}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={images?.scamAnonymousOutline}
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <p>
                I received a call from Amazon and it was a voice message indicating
                that there was a purchase of $1,000 made to my account and if I
                didn't make that purchase, then press #1. I pressed #1 and spoke
                with a gentleman. I told him that I was looking at my Amazon account
                and my last purchase was in July. He told me that Apple Airpods were
                bought and mailed to 49 Arcadia Ct., Albany, NY. He went on to
                suggest that my identity must have been taken and that it was
                possible if I was out shopping.
              </p>
              <div className="scam-loockup-bttm">
                <span>
                  <img
                    src={images?.scamCoin1}
                    className="me-2"
                    alt=""
                  />
                  Money lost: <em>20,000.000 AED</em>
                </span>
                <span>
                  <img
                    src={images?.scamSearch1}
                    className="me-2"
                    alt=""
                  />
                  Scam Type: <em>Pet Scam</em>
                </span>
                <span>
                  <img
                    src={images?.scamCalendar1}
                    className="me-2"
                    alt=""
                  />
                  Date reported: <em>21/06/2024</em>
                </span>
              </div>
            </div>
          </div>
          <div className="custom-pagination dark-pagination">
            <nav>
              <ul className="pagination border-0">

                {/* FIRST */}
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link link-icon" onClick={handleFirst}>
                    <i className="fas fa-chevron-double-left" />
                  </button>
                </li>

                {/* PREVIOUS */}
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link link-icon" onClick={handlePrev}>
                    <i className="fas fa-chevron-left" />
                  </button>
                </li>

                {/* PAGE NUMBERS */}
                {pages.map((p, index) =>
                  p === "dots-left" || p === "dots-right" ? (
                    <li key={index} className="page-item disabled">
                      <span className="page-link">...</span>
                    </li>
                  ) : (
                    <li
                      key={index}
                      className={`page-item ${p === currentPage ? "active" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(p)}
                      >
                        {p}
                      </button>
                    </li>
                  )
                )}

                {/* NEXT */}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button className="page-link link-icon" onClick={handleNext}>
                    <i className="fas fa-chevron-right" />
                  </button>
                </li>

                {/* LAST */}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button className="page-link link-icon" onClick={handleLast}>
                    <i className="fas fa-chevron-double-right" />
                  </button>
                </li>

              </ul>
            </nav>
          </div>
        </div>
      </section>
      <section className="scam-empowering-sec tp-space">
        <div className="container">
          <h3 className="title text-white mb-5">
            Case studies are part of the Wizbizla{" "}
            <span className="d-block">Scam Prevention Programme.</span>
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
      <section className="scam-connected-sec">
        <div className="container">
          <div className="scam-connected-innr compat-fraud-card">
            <h3 className="title mb-3">Help Combat Fraud</h3>
            <p>
              Alert the community about your experience with a scam by completing a
              Scam Report.
            </p>
            <Link to='/report-scam' className="thm-lg-btn">
              Report a Scam
            </Link>
          </div>
        </div>
      </section>
    </>

  )
}

export default ScamTracker
