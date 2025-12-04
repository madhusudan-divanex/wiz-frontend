import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getApiData, getSecureApiData, postApiData } from '../../services/api';
import base_url from '../../baseUrl';
import { Link } from 'react-router-dom';

function ScamTip() {
  const [email, setEmail] = useState('')
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [tipList, setTipList] = useState([]);
  const [featureTip, setFeatureTip] = useState({});
  async function newsLetterSubmit(e) {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter email")
      return
    }
    try {
      const result = await postApiData(`api/users/subscribe-newsletter`, { email })
      if (result.success) {
        setEmail('')
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    } catch (error) {

    }
  }
  const fetchTip = async (pageNumber = page,) => {
    try {
      const result = await getApiData(`cms/tips?page=${page}&limit=18`)
      if (result.success) {
        setTipList(result.data)
        setPages(result.page);
        setTotal(result.total);
        setFeatureTip(result.featureTip || {});
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.log("error fetch tips", error);
    }
  }
  useEffect(() => {
    fetchTip();
  }, [page]);
  const getPageNumbers = () => {
    let nums = [];

    if (pages <= 7) {
      // show all pages
      for (let i = 1; i <= pages; i++) nums.push(i);
    } else {
      // always show: 1 2 3 4 5 ... last
      nums = [1, 2, 3, 4, 5, "...", pages];
    }

    return nums;
  };
  return (
    <div className='newBnr'>
      <section className="scamtip-bnnr">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <img src="assets/images/scam-images/w-scamtip-icon.png" alt="" />
              <h1>Scam Tips</h1>
              <p className="text-white">
                Wizbizla offers information and resources on different types of
                scams, along with key warning signs to watch for.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="category-relations tp-space">
        <div className="container">
          <div className="union-shape-top">
            <img src="assets/images/scam-images/scam-top-shape.png" alt="" />
          </div>
          <div className="custom-category">
            <div className="row align-items-center">
              <div className="col-lg-5">
                <div className="custom-category-img">
                  <img src="assets/images/scam-images/beaware-img.png" alt="" />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="custom-category-content">
                  <h3>Beware of Scams! </h3>
                  <p>
                    Each day, the theft of basic personal information poses a risk.
                    Scammers constantly evolve their technology and tactics,
                    presenting a challenge for both consumers and businesses to
                    effectively safeguard their data. wizbizla offers valuable
                    insights and resources on different scam types, along with
                    warning signals to be vigilant of online, over the phone, or
                    when receiving unexpected text messages.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="union-shape-bttm">
            <img src="assets/images/scam-images/scam-bttm-shape.png" alt="" />
          </div>
        </div>
      </section>
      <section className="featured-tip-sec tp-space">
        <div className="container">
          <h3 className="title text-center">Featured Tip</h3>
          <div className="row">
            <div className="col-lg-12">
              <a href={featureTip?.link} target='_blank' className="featured-vdo">
                <img
                      src={featureTip?.image ? `${base_url}/${featureTip?.image}` : "assets/images/scam-images/featured-tip-img-01.png"}
                      alt=""
                    />
                {/* <video controls>
                  <source src="assets/images/wizbizla-intro.mp4" type="video/mp4" />
                </video> */}
              </a>
            </div>
            {tipList?.length > 0 && tipList?.map((item, key) =>
              <div className="col-lg-4" key={key}>
                <div className="featured-tip-cards">
                  <div className="featured-tip-img">
                    <img
                      src={item?.image ? `${base_url}/${item?.image}` : "assets/images/scam-images/featured-tip-img-01.png"}
                      alt=""
                    />
                    <span className="featured-icon">
                      {item?.type == 'youtube' && <img src="assets/images/scam-images/youtube-logo.png" alt="" />}
                      {item?.type == 'instagram' && <img src="assets/images/scam-images/Instagram-logo.png" alt="" />}
                      {item?.type == 'book' && <img
                        src="assets/images/scam-images/featured-icon-02.png"
                        alt=""
                      />}
                    </span>
                  </div>
                  <a href={item?.link} target="_blank" rel="noreferrer">
                    {item?.description}
                  </a>
                  <p>{item?.title}</p>
                </div>
              </div>)}
            
            <div className="custom-pagination">
              <nav aria-label="Pagination">
                <ul className="pagination">
                  {getPageNumbers().map((num, idx) => (
                    <li
                      key={idx}
                      className={`page-item ${page === num ? "active" : ""} ${num === "..." ? "disabled" : ""
                        }`}
                    >
                      <a
                        className="page-link"
                        href="javascript:void(0)"
                        onClick={() => num !== "..." && setPage(num)}
                      >
                        {num}
                      </a>
                    </li>
                  ))}
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
                 <Link to='/scam-tips'>Scam Tips</Link>
                </h6>
                <p>Stay informed and resilient</p>
                <Link to='/scam-tips' className="seemore-btn">
                  See more <i className="far fa-arrow-right ms-2" />
                </Link>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="empowering-cards">
                <span>
                  <img src="assets/images/scam-images/chat-01.svg" alt="" />
                </span>
                <h6>
                 <Link to='/scam-tips'>Scam Tips</Link>
                </h6>
                <p>Empower yourself to recognise the red flags</p>
                <Link to='/scam-tips' className="seemore-btn">
                  See more <i className="far fa-arrow-right ms-2" />
                </Link>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="empowering-cards">
                <span>
                  <img src="assets/images/scam-images/zoom-text.svg" alt="" />
                </span>
                <h6>
                  <Link to='/case-study'>Scam case studies</Link>
                </h6>
                <p>Understand how scams works</p>
                <Link to='/case-study' className="seemore-btn">
                  See more <i className="far fa-arrow-right ms-2" />
                </Link>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="empowering-cards">
                <span>
                  <img src="assets/images/scam-images/time-fast.svg" alt="" />
                </span>
                <h6>
                  <Link to='/scam-tracker'>Scam tracker</Link>
                </h6>
                <p>Report and research scams to raise awareness</p>
                <Link to='/scam-tracker' className="seemore-btn">
                  See more <i className="far fa-arrow-right ms-2" />
                </Link>
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
                      onChange={(e) => setEmail(e.target.value)}
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

export default ScamTip
