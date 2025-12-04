import React, { useEffect, useState } from 'react'
import { getSecureApiData, securePostData } from '../../../services/api'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

function Billing() {
  const userId = localStorage.getItem('userId')
  const [total, setTotal] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const { memembershipData } = useSelector(state => state.user)
  const [billingInfo, setBillingInfo] = useState({ company: "", area: "", address: "", city: "", email: "", detail: "", street: "", country: "" })
  const [purchase, setPurchase] = useState([])

  async function getPurchase() {
    try {
      const result = await getSecureApiData(`api/users/billing/${userId}?page=${currentPage}`)
      if (result.success) {
        setPurchase(result.billingData)
        setTotal(result.totalPages)
      } else {
      }
    } catch (error) {
      toast.error(error)
    }
  }
  async function handleBilling(e) {
    e.preventDefault()
    const data = { ...billingInfo, userId }
    try {
      const result = await securePostData(`api/users/billing`, data)
      if (result.status) {
        toast.success(result.message)
        getPurchase()
        setBillingInfo({ company: "", area: "", address: "", city: "", email: "", detail: "", street: "", country: "" })
      } else {
      }
    } catch (error) {
      toast.error(error)
    }
  }
  useEffect(() => {
    getPurchase()
  }, [currentPage])
  const handleChange = (e) => {
    const { name, value } = e.target
    setBillingInfo({ ...billingInfo, [name]: value })
  }

  return (
    <>
      <div className="main-section posting-histry-sec flex-grow-1">
        <div className="row dash-profile-overflow posting-histry-main-box pt-4 p-0 mx-lg-2 mx-sm-0">
          <div className="d-lg-none d-md-block">
            <a href="javascript:void(0)">
              <i className="fa-solid fa-angle-left" />
              Back
            </a>
          </div>
          <div className="posting-hist-btn-bx d-flex justify-content-between align-items-center mb-2">
            <h2 className='fz-32 fw-600 mb-3'>Billing</h2>
          </div>
        </div>
        <div className="row dash-profile-overflow mx-lg-2 mx-sm-0">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="dash-profile-sec">
              <div>
                <div className="">
                  <div className="membership-cards billing-crds dash-history-tab-btn d-flex align-items-center justify-content-between p-0">
                    <h3 className="mb-0 p-0">Billing</h3>
                    <ul className="nav mb-0 my-2" id="myTab" role="tablist">
                      <li className="tab-item" role="presentation">
                        <button
                          className="tab-link active"
                          data-bs-toggle="tab"
                          data-bs-target="#business-tabs-01"
                          type="button"
                          role="tab"
                        >
                          Billing History
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
                          Billing Info
                        </button>
                      </li>
                    </ul>
                  </div>
                  <ul>
                    <li className="divider" />
                  </ul>
                </div>
                <div className="">
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="business-tabs-01"
                      role="tabpanel"
                    >
                      <div className="row mt-3 justify-content-between px-3">
                        <div className="col-lg-8 col-md-6 col-sm-12">
                          <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-12">
                              <div className="custom-frm-bx option-size">
                                <select name="" id="" className="form-select">
                                  <option value="">Date range</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12">
                              <div className="custom-frm-bx option-size">
                                <select name="" id="" className="form-select">
                                  <option value="">Transaction</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12">
                              <div className="custom-frm-bx option-size">
                                <select name="" id="" className="form-select">
                                  <option value="">Service</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12">
                              <div className="custom-frm-bx option-size">
                                <select name="" id="" className="form-select">
                                  <option value="">Currency</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                          <div className="custom-frm-bx">
                            <input
                              type="text"
                              required
                              id="searchInput"
                              className="form-control dash-board-other-connection-search"
                              placeholder="Search"
                            />
                            <a href="javascript:void(0)">
                              <i className="fa-solid fa-magnifying-glass billing-icon" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="table-responsive billing-tble-sec">
                            <table className="table custom-table">
                              <thead>
                                <tr>
                                  <th>
                                    <div className="custom-frm-bx mb-0">
                                      <div className="form-check form-check-first mb-0">
                                        <input
                                          className="form-check-input form-chk-input custom-checkbox"
                                          type="checkbox"
                                          defaultValue=""
                                          id="checkDefaultone-f"
                                          defaultChecked=""
                                        />
                                      </div>
                                    </div>
                                  </th>
                                  <th>
                                    Date <i className="fa-solid fa-arrow-down" />
                                  </th>
                                  <th>Billing Detail</th>
                                  <th>Company</th>
                                  <th>Email</th>
                                  {/* <th>Address</th>
                                  <th>Street</th>
                                  <th>City</th> */}
                                  <th>Country</th>
                                  <th>PDF</th>
                                </tr>
                              </thead>
                              <tbody>
                                {purchase?.length > 0 &&
                                  purchase?.map((item, key) =>
                                    <tr key={key}>
                                      <td>
                                        <div className="custom-frm-bx mb-0">
                                          <div className="form-check form-check-first mb-0">
                                            <input
                                              className="form-check-input form-chk-input custom-checkbox"
                                              type="checkbox"
                                              id="checkDefaultone-f"
                                              defaultChecked=""
                                            />
                                          </div>
                                        </div>
                                      </td>
                                      <td>{new Date(item?.createdAt)?.toLocaleDateString('en-GB', {                                                                                        day: '2-digit',                                                                                        month: '2-digit',                                                                                        year: 'numeric'                                                                                    })}</td>
                                      <td className="">{item?.detail}</td>
                                      <td>{item?.company}</td>
                                      <td>{item?.email}</td>
                                      {/* <td className="">{item?.address}</td>
                                  <td className="">{item?.street}</td>
                                  <td className="">{item?.city}</td> */}
                                      <td className="">{item?.country}</td>
                                      <td>
                                        <a href="javascript:void(0)">
                                          <i className="fa-solid fa-download" />
                                        </a>
                                      </td>
                                    </tr>)}

                              </tbody>
                            </table>
                            {/* <table className="table custom-table">
                              <thead>
                                <tr>
                                  <th>
                                    <div className="custom-frm-bx mb-0">
                                      <div className="form-check form-check-first mb-0">
                                        <input
                                          className="form-check-input form-chk-input custom-checkbox"
                                          type="checkbox"
                                          defaultValue=""
                                          id="checkDefaultone-f"
                                          defaultChecked=""
                                        />
                                      </div>
                                    </div>
                                  </th>
                                  <th>
                                    Date <i className="fa-solid fa-arrow-down" />
                                  </th>
                                  <th>Transaction</th>
                                  <th>Service</th>
                                  <th>Order</th>
                                  <th>Currency</th>
                                  <th className="text-nowrap">
                                    Total <i className="fa-solid fa-arrow-down" />
                                  </th>
                                  <th>PDF</th>
                                </tr>
                              </thead>
                              <tbody>
                                {purchase?.length>0 &&
                                purchase?.map((item,key)=>
                                <tr key={key}>
                                  <td>
                                    <div className="custom-frm-bx mb-0">
                                      <div className="form-check form-check-first mb-0">
                                        <input
                                          className="form-check-input form-chk-input custom-checkbox"
                                          type="checkbox"
                                          defaultValue=""
                                          id="checkDefaultone-f"
                                          defaultChecked=""
                                        />
                                      </div>
                                    </div>
                                  </td>
                                  <td>{new Date(item?.createdAt)?.toLocaleDateString('en-GB', {                                                                                        day: '2-digit',                                                                                        month: '2-digit',                                                                                        year: 'numeric'                                                                                    })}</td>
                                  <td className="">
                                    <h5 className="mb-0">Payment</h5>
                                    <h6 className="mb-0">F1322371480</h6>
                                  </td>
                                  <td className="">{item?.membershipId?.name}</td>
                                  <td>{item?._id?.slice(-15)}</td>
                                  <td>USD</td>
                                  <td className="">{item?.price}</td>
                                  <td>
                                    <a href="javascript:void(0)">
                                      <i className="fa-solid fa-download" />
                                    </a>
                                  </td>
                                </tr>)}
                                
                              </tbody>
                            </table> */}
                          </div>
                        </div>
                      </div>
                      {total >= 1 && (
                        <div className="row pb-2">
                          <div className="col-lg-12">
                            <div className="d-flex justify-content-between adver-pagi-sec adver-pagi-desk-sec align-items-center px-3">
                              <div className="adver-prev">
                                <button
                                  onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                                  disabled={currentPage === 1}
                                >
                                  <i className="fa-solid fa-arrow-left" /> Previous
                                </button>
                              </div>
                              <div>
                                <ul className="adver-numbr-list">
                                  {Array.from({ length: total }, (_, i) => i + 1).map((pageNum) => (
                                    <li key={pageNum}>
                                      <button
                                        className={pageNum === currentPage ? "active" : ""}
                                        onClick={() => setCurrentPage(pageNum)}
                                      >
                                        {pageNum}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="adver-next">
                                <button
                                  onClick={() =>
                                    currentPage < total && setCurrentPage(currentPage + 1)
                                  }
                                  disabled={currentPage === total}
                                >
                                  Next <i className="fa-solid fa-arrow-right" />
                                </button>
                              </div>
                            </div>

                            <div className="d-flex justify-content-between adver-pagi-sec adver-pagi-mob-sec d-none px-3">
                              <div className="adver-prev">
                                <button
                                  onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                                  disabled={currentPage === 1}
                                >
                                  <i className="fa-solid fa-arrow-left" />
                                </button>
                              </div>
                              <div>
                                <ul className="adver-numbr-list">
                                  {Array.from({ length: total }, (_, i) => i + 1)
                                    .slice(0, 3)
                                    .map((pageNum) => (
                                      <li key={pageNum}>
                                        <button
                                          className={pageNum === currentPage ? "active" : ""}
                                          onClick={() => setCurrentPage(pageNum)}
                                        >
                                          {pageNum}
                                        </button>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                              <div className="adver-next">
                                <button
                                  onClick={() =>
                                    currentPage < total && setCurrentPage(currentPage + 1)
                                  }
                                  disabled={currentPage === total}
                                >
                                  <i className="fa-solid fa-arrow-right" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className="tab-pane fade"
                      id="business-tabs-02"
                      role="tabpanel"
                    >
                      <div className="posting-history-crd-box">
                        <form onSubmit={handleBilling} className="row">
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="custom-frm-bx position-relative">
                              <label htmlFor="">
                                Billing Details <span className="start-icon">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                className="form-control"
                                placeholder=""
                                name="detail"
                                value={billingInfo.detail}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="custom-frm-bx position-relative">
                              <label htmlFor="">
                                Company Name <span className="start-icon">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                className="form-control"
                                placeholder=""
                                name="company"
                                value={billingInfo.company}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="custom-frm-bx position-relative">
                              <label htmlFor="">
                                Email Address <span className="start-icon">*</span>
                              </label>
                              <input
                                type="email"
                                required
                                className="form-control"
                                placeholder=""
                                name="email"
                                value={billingInfo.email}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="custom-frm-bx position-relative">
                              <label htmlFor="">
                                Billing Address <span className="start-icon">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                className="form-control"
                                placeholder=""
                                name="address"
                                value={billingInfo.address}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="custom-frm-bx position-relative">
                              <label htmlFor="">
                                Street <span className="start-icon">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                className="form-control"
                                placeholder=""
                                name="street"
                                value={billingInfo.street}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="custom-frm-bx position-relative">
                              <label htmlFor="">
                                City <span className="start-icon">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                className="form-control"
                                placeholder=""
                                name="city"
                                value={billingInfo.city}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="custom-frm-bx position-relative">
                              <label htmlFor="">
                                Country <span className="start-icon">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                className="form-control"
                                placeholder=""
                                name="country"
                                value={billingInfo.country}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 posting-stories-crd-sec ">
                            <div className="posting-stories-btn">
                              <button
                                type='submit'
                                className="btn btn-primary"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
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

export default Billing
