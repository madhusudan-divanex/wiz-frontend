
import React, { useEffect, useState } from 'react'
import images from '../../assets/images'
import { getSecureApiData, securePostData } from '../../services/api'
import { toast } from 'react-toastify'
import base_url from '../../baseUrl'

function ConsumerRating() {
  const userId = localStorage.getItem('userId')
  const [currentPage, setCurrentPage] = useState(1)
  const [givenRating, setGivenRating] = useState([])
  const [total, setTotal] = useState(1)
 
  async function getGivenRating() {
    try {
      const result = await getSecureApiData(`api/users/rating-given/${userId}?page=${currentPage}`)
      if (result.success) {
        setGivenRating(result.recommendedData)
        setTotal(result.totalPages)
      } else {
      }
    } catch (error) {
      toast.error(error)
    }
  }
  useEffect(() => {
    getGivenRating()
  }, [currentPage])

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
      <div className="row dash-profile-overflow  pt-4 mx-lg-2 mx-sm-0">
        <div className="d-lg-none d-md-block">
          <a href="javascript:void(0)">
            <i className="fa-solid fa-angle-left" />
            Back
          </a>
        </div>
        <h2>Rating Given</h2>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="main-profile-sec dash-profile-sec">
            <div className="posting-hostry-main-sec">
              <div className="posting-hostry-title-header-box rating-usr-toggle-bx flex-column align-items-start">
                <h3 className="mb-0">My Ratings Given</h3>
                <p>Here, you can find a record of all the ratings you have provided for service providers</p>
                
              </div>
              <ul>
                <li className="divider" />
              </ul>
            </div>
            <div className="">

              <div className="membership-cards rating-double-toggle-crds mt-4">                  
                    <div className="">
                      <table className="rating-tble-main">
                        <thead className="rating-table-head">
                          <tr>
                            <th>Service Provider</th>
                            <th>
                              Rating Given <span>↓</span>
                            </th>
                            <th>
                              Remove Rating 
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {givenRating?.length > 0 ?
                            givenRating?.map((item, key) =>
                              <tr key={key}>
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
                              </tr>):<div className='text-center w-100 mb-2'>No Data</div>}
                        </tbody>
                      </table>
                    </div>
                   {total >1 && <div className="row py-3">
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

  )
}

export default ConsumerRating
