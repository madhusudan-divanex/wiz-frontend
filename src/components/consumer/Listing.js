import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getSecureApiData, securePostData } from '../../services/api'
import { Link } from 'react-router-dom'
import base_url from '../../baseUrl'

function Listing() {
  const userId = localStorage.getItem('userId')
  const [allData, setAllData] = useState([])
  const [filter, setFilter] = useState({ location: '' })
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [recommendedData, setRecommendedData] = useState([])
  const [bookmarkData, setBookMarkData] = useState([])
  const [trustedReferences, setTrustedReferences] = useState([])
  async function getBookmarkData() {
    try {
      const result = await getSecureApiData(`api/users/bookmark/${userId}?type=provider`)
      if (result.success) {
        setBookMarkData(result.bookmarkData)
      } else {
      }
    } catch (error) {
      toast.error(error)
    }
  }
  async function getRecommendedData() {
    try {
      const result = await getSecureApiData(`api/users/recommended/${userId}`)
      if (result.success) {
        setRecommendedData(result.recommendedData)
      } else {
      }
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(() => {
    getRecommendedData()
    getBookmarkData()
    getTrustedRef()
  }, [])
  async function getTrustedRef() {
    try {
      const result = await getSecureApiData(`api/provider/trusted-reference/${userId}`)

      if (result.status) {
        setTrustedReferences(result.data)
      } else {
      }
    } catch (error) {
      toast.error(error)
    }
  }
  async function handleTrustedRef(referenceUser) {

    const data = { referenceUser, userId }
    try {
      const result = await securePostData(`api/provider/trusted-reference`, data)
      if (result.status) {
        getTrustedRef()
      } else {
      }
    } catch (error) {
      toast.error(error)
    }
  }
  async function recommendUserProfile(id) {
    if (id == null || id == undefined) {
      return
    }
    const data = { userId, recommendedUser: id }
    try {
      const result = await securePostData('api/users/recommend-user', data)
      if (result.success) {
        getUserProfile()
        getRecommendedData()
      }

    } catch (error) {

    }
  }
  async function getUserProfile() {
    try {
      const result = await getSecureApiData(`api/users/listing-provider?page=${currentPage}&category=&subCategory=&location=${filter.location}`)
      if (result.success) {
        setAllData(result.userData)
        setTotalPages(result.totalPages)
      } else {
      }
    } catch (error) {
      toast.error(error)
    }
  }
  async function bookMarkProfile(id) {
    if (id == null || id == undefined) {
      return
    }
    if (userId == id) {
      return
    }
    const data = { userId, bookmarkUser: id }
    try {
      const result = await securePostData('api/users/bookmark-profile', data)
      if (result.success) {
        getBookmarkData()
      }
    } catch (error) {

    }
  }
  useEffect(() => {
    getUserProfile()
  }, [currentPage])
  useEffect(() => {
    setTimeout(() => {
      getUserProfile()
    }, 300)
  }, [filter])
  return (
    <>
      <section className="banner-sec business-main-sec customer-frm-section ">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="banner-innr">
                <h1>Special offer</h1>
                <p>GLE SUV 2024</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="business-main-sec-right-img"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="sub-category-providers">
        <div className="container">
          <ol className="breadcrumb custom-bredcump">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="">Automobiles</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Service Providers
            </li>
          </ol>
          <h4 className="innr-title ">Automobiles</h4>
          <div className="row">
            <div className="col-lg-2">
              <a href="javascript:void(0);">
                <div className="category-cards">
                  <img src="/assets/images/search-02.svg" alt="" />
                  <p>Vehicle financing</p>
                </div>
              </a>
            </div>
            <div className="col-lg-2">
              <a href="javascript:void(0);">
                <div className="category-cards">
                  <img src="/assets/images/warehouse.svg" alt="" />
                  <p>Search for prestige cars</p>
                </div>
              </a>
            </div>
            <div className="col-lg-2">
              <a href="javascript:void(0);">
                <div className="category-cards">
                  <img src="/assets/images/money-check-01.svg" alt="" />
                  <p>Selling a vehicle</p>
                </div>
              </a>
            </div>
            <div className="col-lg-2">
              <a href="javascript:void(0);">
                <div className="category-cards">
                  <img src="/assets/images/money-check-01.svg" alt="" />
                  <p>Selling a vehicle</p>
                </div>
              </a>
            </div>
            <div className="col-lg-2">
              <a href="javascript:void(0);">
                <div className="category-cards">
                  <img src="/assets/images/gold-01.svg" alt="" />
                  <p>Protecting your car's paintwork</p>
                </div>
              </a>
            </div>
            <div className="col-lg-2">
              <a href="javascript:void(0);">
                <div className="category-cards">
                  <img src="/assets/images/gold-01.svg" alt="" />
                  <p>Protecting your car's paintwork</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="custmr-listing-srvice-provide-sec">
        <div className="container">
          <div className="row">
            <h2>Your Accredited Service Providers</h2>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="custom-frm-bx cht-search-br me-2">
                <input
                  type="text"
                  id=""
                  className="form-control custmr-input"
                  placeholder="Search"
                />
                <a href="javascript:void(0)">
                  <i className="fa-solid fa-magnifying-glass custm-search-icon" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12">
              <div className="custom-frm-bx option-size">
                <select name="" id="" className="form-select">
                  <option value="">Show all</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12">
              <div className="custom-frm-bx option-size">
                {/* <select name="" id="" className="form-select">
                  <option value="">Location</option>
                </select> */}
                <select name='location' value={filter.location}
                  onChange={(e) => setFilter({ ...filter, location: e.target.value })} className='form-select' >
                  <option value="">Select Location</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Ajman"> Ajman</option>
                  <option value="Dubai"> Dubai</option>
                  <option value="Fujairah">Fujairah </option>
                  <option value="Khaimah">  Ras Al-Khaimah</option>
                  <option value="Sharjah"> Sharjah</option>
                  <option value=" Umm Al Quwain">  Umm Al Quwain</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-6 col-sm-12">
              {allData?.length > 0 &&
                allData?.map((item, key) =>
                  <div className="provider-card d-flex gap-3" key={key}>
                    <div className="cutomr-admin-usr-main-pic">
                      <img src={item?.isDefaultBanner ? `${base_url}/${item?.categories[0]?.category.image}` : `${base_url}/${item?.profileImage}`}
                        alt="Banner"
                        style={{ minWidth: '250px', minHeight: '260px', width: '250px', height: '260px', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div className="cutomr-admin-usr-logo">
                        <div className="">
                          <div className="d-flex">
                            <div>
                              <img src={item?.profileImage ? `${base_url}/${item?.profileImage}` : "/assets/images/slider-logo.png"} alt="" />
                            </div>
                            <div className="custmor-admin-usr-content">
                              <h4 className="mb-0 text-capitalize">{item?.userId?.firstName} {item?.userId?.lastName}</h4>
                              <img src="/assets/images/verify-uers.png" alt="" />
                              <img src="/assets/images/yellow-dimond.png" alt="" />
                            </div>
                          </div>
                          {item?.company && <div className="cstmr-small-logo text-center">
                            <img src="/assets/images/any.png" alt="" />
                            <span>{item?.company}</span>
                          </div>}
                        </div>
                        <div className="d-flex gap-3">
                          {/* <div className="custmr-thumb-logo">
                            {recommendedData?.some(rec => rec?.recommendedUser === item?.userId?._id)
                              ? <i className="fa-solid fa-thumbs-up" ></i>
                              : <i className="fa-regular fa-thumbs-up" ></i>}
                            <span>{item?.totalRecommendations || 0}</span>
                          </div> */}
                          <Link className="slider-tab-recon" onClick={() => recommendUserProfile(item?.userId?._id)}>
                            {recommendedData?.some(rec => rec?.recommendedUser === item?.userId?._id)
                              ? <i className="fa-solid fa-thumbs-up" ></i>
                              : <i className="fa-regular fa-thumbs-up" ></i>}
                            <span className="fw-bold">{item?.totalRecommendations}</span>
                          </Link>
                          <div className="custmr-thumb-logo-second">
                            {bookmarkData?.some(rec => rec?.bookmarkUser._id === item?.userId?._id) ?
                              <button onClick={() => bookMarkProfile(item?.userId?._id)}>
                                <i className="fa-solid fa-bookmark fs-4" style={{ color: '#4F40FF' }} />
                              </button>
                              : <button onClick={() => bookMarkProfile(item?.userId?._id)}>
                                <i className="fa-regular fa-bookmark fs-4" style={{ color: '#4F40FF' }} />
                              </button>}
                          </div>
                        </div>
                      </div>
                      <div className="custmr-listing-content my-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <h5 className="mb-0">Client Profile</h5>
                          <h6 className="mb-0">Request a Reference</h6>
                        </div>
                        <p>
                          {item?.idealClientProfile}
                        </p>
                        <div className="d-flex align-items-center justify-content-between">
                          <h5 className="mb-0">{item?.title}</h5>
                          <h6 className="mb-0">
                            <Link to={`/wizbizla/provider?name=${item?.userId.firstName}&wiz=${item?.userId?._id}`}>View Profile</Link>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>)}
              <div className="provider-card d-flex gap-3">
                <div className="cutomr-admin-usr-main-pic">
                  <img src="/assets/images/listing-pic.png" alt="" />
                </div>
                <div>
                  <div className="cutomr-admin-usr-logo">
                    <div className="">
                      <div className="d-flex">
                        <div>
                          <img src="/assets/images/slider-logo.png" alt="" />
                        </div>
                        <div className="custmor-admin-usr-content">
                          <h4 className="mb-0">Amélie Laurent</h4>
                          <img src="/assets/images/verify-uers.png" alt="" />
                          <img src="/assets/images/yellow-dimond.png" alt="" />
                        </div>
                      </div>
                      <div className="cstmr-small-logo text-center">
                        <img src="/assets/images/any.png" alt="" />
                        <span>Anyday</span>
                      </div>
                    </div>
                    <div className="d-flex gap-3">
                      <div className="custmr-thumb-logo">
                        <img src="/assets/images/thumb.png" alt="" />
                        <span>50</span>
                      </div>
                      <div className="custmr-thumb-logo-second">
                        <img src="/assets/images/bookmark.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="custmr-listing-content my-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="mb-0">Client Profile</h5>
                      <h6 className="mb-0">Request a Reference</h6>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                      irure dolor in reprehenderit
                    </p>
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="mb-0">UX UI Designer</h5>
                      <h6 className="mb-0">
                        <a href="">View Profile</a>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="provider-card d-flex gap-3">
                <div className="cutomr-admin-usr-main-pic">
                  <img src="/assets/images/listing-pic.png" alt="" />
                </div>
                <div>
                  <div className="cutomr-admin-usr-logo">
                    <div className="">
                      <div className="d-flex">
                        <div>
                          <img src="/assets/images/slider-logo.png" alt="" />
                        </div>
                        <div className="custmor-admin-usr-content">
                          <h4 className="mb-0">Amélie Laurent</h4>
                          <img src="/assets/images/verify-uers.png" alt="" />
                          <img src="/assets/images/yellow-dimond.png" alt="" />
                        </div>
                      </div>
                      <div className="cstmr-small-logo text-center">
                        <img src="/assets/images/any.png" alt="" />
                        <span>Anyday</span>
                      </div>
                    </div>
                    <div className="d-flex gap-3">
                      <div className="custmr-thumb-logo">
                        <img src="/assets/images/thumb.png" alt="" />
                        <span>50</span>
                      </div>
                      <div className="custmr-thumb-logo-second">
                        <img src="/assets/images/bookmark.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="custmr-listing-content my-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="mb-0">Client Profile</h5>
                      <h6 className="mb-0">Request a Reference</h6>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                      irure dolor in reprehenderit
                    </p>
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="mb-0">UX UI Designer</h5>
                      <h6 className="mb-0">
                        <a href="">View Profile</a>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="provider-card d-flex gap-3">
                <div className="cutomr-admin-usr-main-pic">
                  <img src="/assets/images/listing-pic.png" alt="" />
                </div>
                <div>
                  <div className="cutomr-admin-usr-logo">
                    <div className="">
                      <div className="d-flex">
                        <div>
                          <img src="/assets/images/slider-logo.png" alt="" />
                        </div>
                        <div className="custmor-admin-usr-content">
                          <h4 className="mb-0">Amélie Laurent</h4>
                          <img src="/assets/images/verify-uers.png" alt="" />
                          <img src="/assets/images/yellow-dimond.png" alt="" />
                        </div>
                      </div>
                      <div className="cstmr-small-logo text-center">
                        <img src="/assets/images/any.png" alt="" />
                        <span>Anyday</span>
                      </div>
                    </div>
                    <div className="d-flex gap-3">
                      <div className="custmr-thumb-logo">
                        <img src="/assets/images/thumb.png" alt="" />
                        <span>50</span>
                      </div>
                      <div className="custmr-thumb-logo-second">
                        <img src="/assets/images/bookmark.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="custmr-listing-content my-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="mb-0">Client Profile</h5>
                      <h6 className="mb-0">Request a Reference</h6>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                      irure dolor in reprehenderit
                    </p>
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="mb-0">UX UI Designer</h5>
                      <h6 className="mb-0">
                        <a href="">View Profile</a>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="provider-card d-flex gap-3">
                <div className="cutomr-admin-usr-main-pic">
                  <img src="/assets/images/listing-pic.png" alt="" />
                </div>
                <div>
                  <div className="cutomr-admin-usr-logo">
                    <div className="">
                      <div className="d-flex">
                        <div>
                          <img src="/assets/images/slider-logo.png" alt="" />
                        </div>
                        <div className="custmor-admin-usr-content">
                          <h4 className="mb-0">Amélie Laurent</h4>
                          <img src="/assets/images/verify-uers.png" alt="" />
                          <img src="/assets/images/yellow-dimond.png" alt="" />
                        </div>
                      </div>
                      <div className="cstmr-small-logo text-center">
                        <img src="/assets/images/any.png" alt="" />
                        <span>Anyday</span>
                      </div>
                    </div>
                    <div className="d-flex gap-3">
                      <div className="custmr-thumb-logo">
                        <img src="/assets/images/thumb.png" alt="" />
                        <span>50</span>
                      </div>
                      <div className="custmr-thumb-logo-second">
                        <img src="/assets/images/bookmark.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="custmr-listing-content my-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="mb-0">Client Profile</h5>
                      <h6 className="mb-0">Request a Reference</h6>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                      irure dolor in reprehenderit
                    </p>
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="mb-0">UX UI Designer</h5>
                      <h6 className="mb-0">
                        <a href="">View Profile</a>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="provider-card d-flex gap-3">
                <div className="cutomr-admin-usr-main-pic">
                  <img src="/assets/images/listing-pic.png" alt="" />
                </div>
                <div>
                  <div className="cutomr-admin-usr-logo">
                    <div className="">
                      <div className="d-flex">
                        <div>
                          <img src="/assets/images/slider-logo.png" alt="" />
                        </div>
                        <div className="custmor-admin-usr-content">
                          <h4 className="mb-0">Amélie Laurent</h4>
                          <img src="/assets/images/verify-uers.png" alt="" />
                          <img src="/assets/images/yellow-dimond.png" alt="" />
                        </div>
                      </div>
                      <div className="cstmr-small-logo text-center">
                        <img src="/assets/images/any.png" alt="" />
                        <span>Anyday</span>
                      </div>
                    </div>
                    <div className="d-flex gap-3">
                      <div className="custmr-thumb-logo">
                        <img src="/assets/images/thumb.png" alt="" />
                        <span>50</span>
                      </div>
                      <div className="custmr-thumb-logo-second">
                        <img src="/assets/images/bookmark.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="custmr-listing-content my-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="mb-0">Client Profile</h5>
                      <h6 className="mb-0">Request a Reference</h6>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                      irure dolor in reprehenderit
                    </p>
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="mb-0">UX UI Designer</h5>
                      <h6 className="mb-0">
                        <a href="">View Profile</a>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              {/* <div className="provider-card d-flex gap-3">
                <div>
                  <div className="cutomr-admin-usr-logo">
                    <div className="">
                      <div className="d-flex">
                        <div>
                          <img src="/assets/images/onboarding-first.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="custmr-listing-content my-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="mb-0">Client Profile</h5>
                      <h6 className="mb-0">Request a Reference</h6>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                      irure dolor in reprehenderit
                    </p>
                    <div className="d-flex flex-column align-items-center justify-content-between">
                      <button className='btn btn-primary'>Accredit a Service Provider</button>
                      <button className='btn btn-primary btn-preview'>Request Bespoke Concierge Service</button>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>

  )
}

export default Listing
