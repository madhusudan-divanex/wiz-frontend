import React, { useEffect, useState } from 'react'
import { getSecureApiData, securePostData } from '../../../services/api'
import { toast } from 'react-toastify'

function References() {
    const [references, setReferences] = useState([])
    const [isShow,setIsShow]=useState(null)
    const userId = localStorage.getItem('userId')
    const [refData, setRefData] = useState({ name: "", relationship: "", workTogether: "", contact: "" })
    async function getUserFeature() {
        try {
            const result = await getSecureApiData(`api/provider/get-feature/${userId}`)
            if (result.status) {
                const data = result.data
                setReferences(data.references)
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function addUserFeature(e) {
        e.preventDefault()
        const data = { userId, refData }
        try {
            const result = await securePostData(`api/provider/add-reference`, data)
            if (result.status) {
                toast.success('Reference added successfully')
                setRefData({name: "", relationship: "", workTogether: "", contact: ""})
                getUserFeature()
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function removeUserRef(id) {
        const data = { userId, referenceId: id }
        try {
            const result = await securePostData(`api/provider/remove-reference`, data)
            if (result.status) {
                setIsShow(null)
                getUserFeature()
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setRefData({ ...refData, [name]: value })
    }
    useEffect(() => {
        getUserFeature()
    }, [])
    return (
        <>
            <div class="main-section posting-histry-sec flex-grow-1">
                <div class="row dash-profile-overflow posting-histry-main-box pt-4 p-0 mx-lg-2 mx-sm-0">
                    <div class="d-lg-none d-md-block">
                        <a href="javascript:void(0)" className='mb-mobile-btn'><i class="fa-solid fa-angle-left"></i>Back</a>
                    </div>
                    <div class="posting-hist-btn-bx d-flex justify-content-between align-items-center mb-2">
                        <h2 className='fz-32 fw-600 mb-3'>References</h2>
                        <button
                            data-bs-toggle="modal" data-bs-target="#addModal"
                            class="thm-btn d-lg-block d-md-none d-sm-none">
                            Add Reference</button>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="dash-profile-sec dash-profile-share-feedback references-crd-bx">
                            <div>
                                <div class="main-profile-sec">
                                    <h3 className='mb-3'>Instructions for Signature Service Providers</h3>
                                    <ul>
                                        <li class="divider"></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="posting-history-crd-box ern-refferals-crd ">
                                <div class="row">
                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                        <div class="ern-refrals-crd-box">
                                            <div class="feedback-card">
                                                <div class="icon">1</div>
                                                <h5 class="py-2">Submit References</h5>
                                                <p>Provide at least three client references for Wizbizla to validate.
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                        <div class="ern-refrals-crd-box">
                                            <div class="feedback-card">
                                                <div class="icon">2</div>
                                                <h5 class="py-2">Manage References</h5>
                                                <p>Use your dashboard to add or remove references, ensuring a minimum of
                                                    three are always active.
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                        <div class="ern-refrals-crd-box">
                                            <div class="feedback-card">
                                                <div class="icon">3</div>
                                                <h5 class="py-2">Add New References</h5>
                                                <p>Each time you add a reference, Wizbizla will verify it and make it
                                                    available to consumers.
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="main-profile-sec dash-profile-sec">
                            <div class="posting-hostry-main-sec">
                                <div class="posting-hostry-title-header-box rating-usr-toggle-bx">
                                    <h3 class="mb-0">References: Minimum (3/3)</h3>
                                </div>

                                <ul>
                                    <li class="divider"></li>
                                </ul>
                            </div>

                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="table-responsive">
                                        <table class="table custom-table">
                                            <thead>
                                                <tr>
                                                    <th>Name of Reference</th>
                                                    <th>Relationship</th>
                                                    <th>Where did you work together?</th>
                                                    <th>Best Contact Detail</th>
                                                    <th>Status</th>
                                                    <th>Approval Date</th>
                                                    <th>Remove Reference</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {references?.length >  0 ?
                                                    references?.map((item, key) =>
                                                        <tr class={key < 3 && "reference-tble-dta"} key={key}>
                                                            <td>{item?.name}</td>
                                                            <td>{item?.relationship}</td>
                                                            <td class="text-truncate-custom">{item?.workTogether}</td>
                                                            <td class="text-truncate-custom">{item?.contact}
                                                            </td>
                                                            <td><span class="position-relative"><a href="javascript:void(0)"
                                                                class="badge badge-resolved">Resolved</a></span>
                                                            </td>
                                                            <td>5/27/2024</td>
                                                            <td class="reference-tble-clse-dta">
                                                                <button disabled={references.length <= 3} onClick={() => setIsShow(item._id)}><i class="fa-solid fa-xmark"></i></button>
                                                            </td>
                                                        </tr>)
                                                        
                                                    :<p className='pb-3 ms-3'>No data found</p>}


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* <div class="row pb-2">
                                <div class="col-lg-12">
                                    <div class="">
                                        <div
                                            class="d-flex justify-content-between adver-pagi-sec adver-pagi-desk-sec align-items-center px-3">
                                            <div class="adver-prev">
                                                <a href="javascript:void(0)"><i
                                                    class="fa-solid fa-arrow-left"></i>Previous</a>
                                            </div>
                                            <div>
                                                <ul class="adver-numbr-list">
                                                    <li><a href="javascript:void(0)" class="active">1</a></li>
                                                    <li><a href="javascript:void(0)">2</a></li>
                                                    <li><a href="javascript:void(0)">3</a></li>
                                                    <li><a href="javascript:void(0)">---</a></li>
                                                    <li><a href="javascript:void(0)">4</a></li>
                                                    <li><a href="javascript:void(0)">5</a></li>
                                                    <li><a href="javascript:void(0)">6</a></li>
                                                </ul>
                                            </div>
                                            <div class="adver-next">
                                                <a href="javascript:void(0)">Next<i class="fa-solid fa-arrow-right"></i></a>
                                            </div>
                                        </div>

                                        <div
                                            class="d-flex justify-content-between adver-pagi-sec adver-pagi-mob-sec d-none px-3">
                                            <div class="adver-prev">
                                                <a href="javascript:void(0)"><i class="fa-solid fa-arrow-left"></i></a>
                                            </div>
                                            <div>
                                                <ul class="adver-numbr-list">
                                                    <li><a href="javascript:void(0)" class="active">1</a></li>
                                                    <li><a href="javascript:void(0)">2</a></li>
                                                    <li><a href="javascript:void(0)">3</a></li>
                                                </ul>
                                            </div>
                                            <div class="adver-next">
                                                <a href="javascript:void(0)"><i class="fa-solid fa-arrow-right"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-0 modal-content-secnd border-0 shadow">

                        <div className="modal-header">
                            <h5 className="modal-title">Add a Reference</h5>
                            <a
                                href="#"
                                className="mdal-clse-btn btn-close"
                                data-bs-dismiss="modal"
                            >
                                {/* <i className="fa-solid fa-xmark" /> */}
                            </a>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={addUserFeature}>
                                <div className="mb-3">
                                    <label className="form-label">Reference Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter name"
                                        name="name"
                                        value={refData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Best Contact Details</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter phone number or email address"
                                        name="contact"
                                        value={refData.contact}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Relationship
                                        <small className="d-block text-muted">
                                            Examples include new client, referral, agent, business
                                            partner, supplier, colleague, mentor, etc.
                                        </small>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter relationship"
                                        name="relationship"
                                        value={refData.relationship}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Where did you work together?
                                        <small className="d-block text-muted">
                                            (The company or project where you collaborated)
                                        </small>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter company"
                                        name="workTogether"
                                        value={refData.workTogether}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div id='textareaBox'>

                                    <button type="submit" className="btn btn-primary submitBtn" data-bs-dismiss="modal">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content modal-content-secnd">
                        <div className="modal-body text-center p-0">
                            <div className="modal-header align-items-baseline p-0">
                                <h5 className="modal-title">
                                    Your account has been deactivated.
                                </h5>
                                <a
                                    href="#"
                                    className="mdal-clse-btn btn-close"
                                    data-bs-dismiss="modal"
                                >
                                    <i className="fa-solid fa-xmark" />
                                </a>
                            </div>
                            <p className="mb-0 text-start pt-3">
                                We hope to see you again, very soon.
                            </p>
                        </div>
                    </div>
                </div> */}
            {/* </div> */}

            {isShow &&<div
                className={`modal fade ${isShow ? "show d-block" : ""}`}
                id='confirmModal'
                tabIndex="-1"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content text-center p-4 rounded-3 border-0 shadow-sm">
                        <h2 className="fw-bold mb-3">Are you sure ?</h2>
                        {/* <p className="text-secondary mb-4">
                            To perform this action please log in or create a new account.
                        </p> */}
                        <div className='d-flex gap-4'>
                            <button
                                className="thm-btn nw-mb-thm-btn outline"

                                data-bs-dismiss="modal"

                            onClick={() => setIsShow(null)}
                            >
                                No
                            </button>
                            <button
                                className="thm-btn nw-mb-thm-btn "
                                onClick={() => removeUserRef(isShow)}

                            // onClick={() => setIsLogin(false)}
                            >
                                Yes
                            </button>
                        </div>

                    </div>
                </div>
            </div>}
        </>
    )
}

export default References
