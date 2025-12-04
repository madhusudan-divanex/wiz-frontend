
import React, { useEffect, useState } from 'react'
import images from '../../../assets/images'
import { getSecureApiData, securePostData } from '../../../services/api'
import { toast } from 'react-toastify'
import base_url from '../../../baseUrl'

function CustomerRating() {
  const userId = localStorage.getItem('userId')
  const [currentPage, setCurrentPage] = useState(1)
  const [gCurrentPage, setGCurrentPage] = useState(1)
  const [receivedRating, setReceivedRating] = useState([])
  const [givenRating, setGivenRating] = useState([])
  const [total, setTotal] = useState(1)
  const [gTotal, setGTotal] = useState(1)
  async function getReceivedRating() {
    try {
      const result = await getSecureApiData(`api/users/rating-received/${userId}?page=${currentPage}`)
      if (result.success) {
        setReceivedRating(result.recommendedData)
        setTotal(result.totalPages)
      } else {
      }
    } catch (error) {
      toast.error(error)
    }
  }
  async function getGivenRating() {
    try {
      const result = await getSecureApiData(`api/users/rating-given/${userId}?page=${currentPage}`)
      if (result.success) {
        setGivenRating(result.recommendedData)
        setGTotal(result.totalPages)
      } else {
      }
    } catch (error) {
      toast.error(error)
    }
  }
  useEffect(() => {
    getReceivedRating()
  }, [currentPage])
  useEffect(() => {
    getGivenRating()
  }, [gCurrentPage])

  async function recommendUserProfile(id) {
    const data = { userId, recommendedUser: id }
    try {
      const result = await securePostData('api/users/recommend-user', data)
      if (result.success) {
        getGivenRating()
      }

    } catch (error) {

    }
  }
  return (
    <div className="main-section posting-histry-sec flex-grow-1">
      <div className="row dash-profile-overflow pt-4 mx-lg-2 mx-sm-0">
        <div className="d-lg-none d-md-block">
          <a href="javascript:void(0)" className='mb-mobile-btn'>
            <i className="fa-solid fa-angle-left" />
            Back
          </a>
        </div>
        <h2 className='fz-32 fw-600 mb-3'>Customer Rating</h2>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="main-profile-sec dash-profile-sec">
            <div className="posting-hostry-main-sec">
              <div className="posting-hostry-title-header-box rating-usr-toggle-bx">
                <h3 className="mb-0">Recommendation</h3>
                <div className="membership-cards rating-toggle-sec">
                  <ul className="nav" id="myTab" role="tablist">
                    <li className="tab-item" role="presentation">
                      <button
                        className="tab-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#business-tabs-01"
                        type="button"
                        role="tab"
                      >
                        Received
                      </button>
                    </li>
                    <li className="tab-item" role="presentation">
                      <button
                        className="tab-link"
                        data-bs-toggle="tab"
                        data-bs-target="#business-tabs-02"
                        type="button"
                        role="tab"
                      >
                        Given
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <ul>
                <li className="divider" />
              </ul>
            </div>
            <div className="">
              <div className="membership-cards rating-double-toggle-crds mt-4">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="business-tabs-01"
                    role="tabpanel"
                  >
                    <div className="">
                      <table className="rating-tble-main">
                        <thead className="rating-table-head">
                          <tr>
                            <th>Service Provider</th>
                            <th>
                              Rating Given <span>↓</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {receivedRating?.length > 0 ?
                            receivedRating?.map((item, key) =>
                              <tr key={key}>
                                <td>
                                  <div className="provider">
                                    <img
                                      src={item?.profile?.profileImage ? `${base_url}/${item.profile.profileImage}` : images?.sliderLogo}
                                      alt="James Catering"
                                    />
                                    <span className="provider-name">
                                      {item?.userId?.firstName} {item?.userId?.lastName}
                                    </span>
                                  </div>
                                </td>
                                <td>
                                  <span className="date">{new Date(item?.createdAt)?.toLocaleDateString('en-GB', {                                                                                        day: '2-digit',                                                                                        month: '2-digit',                                                                                        year: 'numeric'                                                                                    })}</span>
                                </td>
                              </tr>) : <p className='pb-3 ms-3'>No data found</p>}
                        </tbody>
                      </table>
                    </div>
                    {total>1 &&<div className="row py-3">
                      <div className="col-lg-12">
                        <div>
                          <div className="d-flex justify-content-between adver-pagi-sec adver-pagi-desk-sec align-items-center px-3">
                            {/* Previous Button */}
                            <div className="adver-prev">
                              <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className="btn btn-link"
                              >
                                <i className="fa-solid fa-arrow-left" /> Previous
                              </button>
                            </div>

                            {/* Page Numbers */}
                            <div>
                              <ul className="adver-numbr-list d-flex gap-2 list-unstyled mb-0">
                                {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
                                  <li key={page}>
                                    <button
                                      onClick={() => setCurrentPage(page)}
                                      className={`btn btn-link ${currentPage === page ? 'active' : ''}`}
                                    >
                                      {page}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {/* Next Button */}
                            <div className="adver-next">
                              <button
                                disabled={currentPage === total}
                                onClick={() => setCurrentPage(currentPage + 1)}
                                className="btn btn-link"
                              >
                                Next <i className="fa-solid fa-arrow-right" />
                              </button>
                            </div>
                          </div>

                          {/* Mobile Version */}
                          <div className="d-flex justify-content-between adver-pagi-sec adver-pagi-mob-sec d-none px-3">
                            <div className="adver-prev">
                              <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className="btn btn-link"
                              >
                                <i className="fa-solid fa-arrow-left" />
                              </button>
                            </div>
                            <div>
                              <ul className="adver-numbr-list d-flex gap-2 list-unstyled mb-0">
                                {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
                                  <li key={page}>
                                    <button
                                      onClick={() => setCurrentPage(page)}
                                      className={`btn btn-link ${currentPage === page ? 'active' : ''}`}
                                    >
                                      {page}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="adver-next">
                              <button
                                disabled={currentPage === total}
                                onClick={() => setCurrentPage(currentPage + 1)}
                                className="btn btn-link"
                              >
                                <i className="fa-solid fa-arrow-right" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>}

                  </div>
                  <div
                    className="tab-pane fade "
                    id="business-tabs-02"
                    role="tabpanel"
                  >
                    <div className="">
                      <table className="rating-tble-main">
                        <thead className="rating-table-head">
                          <tr>
                            <th>Service Provider</th>
                            <th>
                              Rating Given <span>↓</span>
                            </th>
                            <th className="text-end">Remove Rating</th>
                          </tr>
                        </thead>
                        <tbody>
                          {givenRating?.length > 0 &&
                            givenRating?.map((item, key) =>
                              <tr>
                                <td>
                                  <div className="provider">
                                    <img
                                      src={item?.profile?.profileImage ? `${base_url}/${item.profile.profileImage}` : images?.sliderLogo}
                                      alt="James Catering"
                                    />
                                    <span className="provider-name">
                                      {item?.recommendedUser?.firstName} {item?.recommendedUser?.lastName}
                                    </span>
                                  </div>
                                </td>
                                <td>
                                  <span className="date">{new Date(item?.createdAt)?.toLocaleDateString('en-GB', {                                                                                        day: '2-digit',                                                                                        month: '2-digit',                                                                                        year: 'numeric'                                                                                    })}</span>
                                </td>
                                <td className="rating-tble-clse">
                                  <button onClick={() => recommendUserProfile(item.recommendedUser._id)} className="rating-close">
                                    <i className="fa-solid fa-xmark" />
                                  </button>
                                </td>
                              </tr>)}
                        </tbody>
                      </table>
                    </div>
                    {gTotal > 1 && <div className="row py-3">
                      <div className="col-lg-12">
                        <div>
                          <div className="d-flex justify-content-between adver-pagi-sec adver-pagi-desk-sec align-items-center px-3">
                            {/* Previous Button */}
                            <div className="adver-prev">
                              <button
                                disabled={gCurrentPage === 1}
                                onClick={() => setGCurrentPage(gCurrentPage - 1)}
                                className="btn btn-link"
                              >
                                <i className="fa-solid fa-arrow-left" /> Previous
                              </button>
                            </div>

                            {/* Page Numbers */}
                            <div>
                              <ul className="adver-numbr-list d-flex gap-2 list-unstyled mb-0">
                                {Array.from({ length: gTotal }, (_, i) => i + 1).map((page) => (
                                  <li key={page}>
                                    <button
                                      onClick={() => setGCurrentPage(page)}
                                      className={`btn btn-link ${gCurrentPage === page ? 'active' : ''}`}
                                    >
                                      {page}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Next Button */}
                            <div className="adver-next">
                              <button
                                disabled={gCurrentPage === gTotal}
                                onClick={() => setGCurrentPage(gCurrentPage + 1)}
                                className="btn btn-link"
                              >
                                Next <i className="fa-solid fa-arrow-right" />
                              </button>
                            </div>
                          </div>

                          {/* Mobile Version */}
                          <div className="d-flex justify-content-between adver-pagi-sec adver-pagi-mob-sec d-none px-3">
                            <div className="adver-prev">
                              <button
                                disabled={gCurrentPage === 1}
                                onClick={() => setGCurrentPage(gCurrentPage - 1)}
                                className="btn btn-link"
                              >
                                <i className="fa-solid fa-arrow-left" />
                              </button>
                            </div>
                            <div>
                              <ul className="adver-numbr-list d-flex gap-2 list-unstyled mb-0">
                                {Array.from({ length: gTotal }, (_, i) => i + 1).map((page) => (
                                  <li key={page}>
                                    <button
                                      onClick={() => setGCurrentPage(page)}
                                      className={`btn btn-link ${gCurrentPage === page ? 'active' : ''}`}
                                    >
                                      {page}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="adver-next">
                              <button
                                disabled={gCurrentPage === gTotal}
                                onClick={() => setGCurrentPage(gCurrentPage + 1)}
                                className="btn btn-link"
                              >
                                <i className="fa-solid fa-arrow-right" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>}

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default CustomerRating
