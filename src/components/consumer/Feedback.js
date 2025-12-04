import React, { useEffect, useState } from 'react'
import images from '../../assets/images'
import { getSecureApiData } from '../../services/api'
import { toast } from 'react-toastify'
import base_url from '../../baseUrl'

function ConsumerFeedback() {
  const [total, setTotal] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const userId = localStorage.getItem('userId')
  const [showAll, setShowAll] = useState(false)
  const [feedbacks, setFeedbacks] = useState([])
  async function getFeedback() {
    try {
      const result = await getSecureApiData(`api/users/my-given-feedback/${userId}?page=${currentPage}&limit=10`)
      if (result.status) {
        setFeedbacks(result.data)
        setTotal(result.totalCount)

      } else {
      }
    } catch (error) {
      toast.error(error)
    }
  }
  useEffect(() => {
    getFeedback()
  }, [currentPage])
  return (
    <>
      <div className="main-section posting-histry-sec flex-grow-1">
        <div className="row dash-profile-overflow  pt-4 mx-lg-2 mx-sm-0">
          <h2>Share your Feedback</h2>
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="main-profile-sec dash-profile-sec">
              <div className="posting-hostry-main-sec">
                <div className="posting-hostry-title-header-box">
                  <h3 className="mb-0">My Feedback</h3>
                </div>
                <ul>
                  <li className="divider" />
                </ul>
              </div>
              <div className="posting-history-crd-box feedback-bx-sec">
                <div className="row mb-4">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="">
                      {feedbacks?.length > 0 &&
                        feedbacks?.map((item, key) => (
                          <div className="review-card mb-4" key={key}>
                            <h3 className="review-title">{item?.title}</h3>
                            <p className="review-date">{new Date(item?.createdAt).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}</p>

                            <div className="review-header">
                              <img
                                src={item?.profile?.profileImage ? `${base_url}/${item?.profile?.profileImage}` : images?.feedback}
                                alt="Profile"
                                className="review-avatar"
                              />
                              <span className="review-name">
                                {item?.userId?.firstName} {item?.userId?.lastName}
                              </span>

                              <span className="review-stars">
                                {Array.from({ length: item?.rating || 0 }).map((_, i) => (
                                  <i key={i} className="fa fa-star text-warning" />
                                ))}
                              </span>
                            </div>

                            <p className="review-text">
                              {item?.feedback}
                            </p>
                          </div>
                        ))
                      }

                      {feedbacks?.length > 10 && <div className="col-lg-4 posting-stories-crd-sec mt-4">
                        <div className="posting-stories-btn">
                          <button onClick={() => setShowAll(!showAll)} className="btn btn-primary">
                            Show {showAll ? 'less' : 'more'}
                          </button>
                        </div>
                      </div>}
                      {feedbacks?.length >0 && <div className="row py-3">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default ConsumerFeedback
