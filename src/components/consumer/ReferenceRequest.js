import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getSecureApiData } from '../../services/api'

function ConsumerReferencesRequest() {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const userId = localStorage.getItem('userId')
    const [trustedReferences, setTrustedReferences] = useState([])
    async function getTrustedRef() {
        try {
            const result = await getSecureApiData(`api/provider/trusted-reference/${userId}?page=${currentPage}`)
            if (result.status) {
                setTotalPages(result.totalPages)
                setTrustedReferences(result.data)

            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        getTrustedRef()
    }, [currentPage])
    return (
        <>
            <div class="main-section posting-histry-sec flex-grow-1">
                <div class="row dash-profile-overflow  pt-4 mx-lg-2 mx-sm-0 ">
                    <h2 class="mb-3">Reference Requests</h2>
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="main-profile-sec dash-profile-sec">
                            <div class="posting-hostry-main-sec">
                                <div class="posting-hostry-title-header-box">
                                    <h3 class="mb-0">My Reference Requests</h3>

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
                                                    <th>Request Sent On </th>
                                                    <th>Service Provider</th>
                                                    <th>Reference Status</th>
                                                    <th>Actioned On / Request Finalized </th>
                                                    <th>Notes / Comments</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {trustedReferences?.length > 0 ?
                                                    trustedReferences?.map((item, key) =>
                                                        <tr key={key}>
                                                            <td>{new Date(item?.createdAt).toLocaleDateString('en-GB', {                                                                                        day: '2-digit',                                                                                        month: '2-digit',                                                                                        year: 'numeric'                                                                                    })}</td>
                                                            <td>{item?.userId?.firstName} {item?.userId?.lastName}</td>
                                                            {item?.status == 'pending' && <td><span class="position-relative"><a
                                                                href="javascript:void(0)"
                                                                class="badge badge-pending">Pending</a></span>
                                                            </td>}
                                                            {item?.status == 'approved' && <td><span class="position-relative"><a
                                                                href="javascript:void(0)"
                                                                class="badge badge-resolved">Completed</a></span>
                                                            </td>}
                                                            {item?.status == 'cancel' && <td><span class="position-relative"><a
                                                                href="javascript:void(0)"
                                                                class="badge badge-declined">Cancel</a></span>
                                                            </td>}
                                                            <td class="">{(item?.status == 'approved' || item?.status == 'cancel' )? new Date(item?.updatedAt).toLocaleDateString('en-GB', {                                                                                        day: '2-digit',                                                                                        month: '2-digit',                                                                                        year: 'numeric'                                                                                    }) : '-'}</td>
                                                            <td>{item?.comment} </td>

                                                        </tr>):<tr>
                                                        <td colSpan="8" className="text-center p-5 my-5">
                                                            <h5>You haven’t submitted any reference requests</h5>
                                                            <p>When you request references to verify individuals or organizations, they’ll be listed here.</p>
                                                        </td>
                                                    </tr>}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {totalPages>1 &&<div className="row pb-2">
                                <div className="col-lg-12">
                                    <div className="">
                                        {/* Desktop Pagination */}
                                        <div className="d-flex justify-content-between adver-pagi-sec adver-pagi-desk-sec align-items-center px-3">

                                            {/* Previous Button */}
                                            <div className="adver-prev">
                                                <button
                                                    disabled={currentPage === 1}
                                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                                    className="btn btn-link text-decoration-none"
                                                >
                                                    <i className="fa-solid fa-arrow-left"></i> Previous
                                                </button>
                                            </div>

                                            {/* Page Numbers */}
                                            <div>
                                                <ul className="adver-numbr-list">
                                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                                                        <li key={num}>
                                                            <button
                                                                onClick={() => setCurrentPage(num)}
                                                                className={`page-link ${currentPage === num ? "active" : ""}`}
                                                            >
                                                                {num}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Next Button */}
                                            <div className="adver-next">
                                                <button
                                                    disabled={currentPage === totalPages}
                                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                                    className="btn btn-link text-decoration-none"
                                                >
                                                    Next <i className="fa-solid fa-arrow-right"></i>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Mobile Pagination */}
                                        <div className="d-flex justify-content-between adver-pagi-sec adver-pagi-mob-sec d-none px-3">
                                            <div className="adver-prev">
                                                <button
                                                    disabled={currentPage === 1}
                                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                                    className="btn btn-link text-decoration-none"
                                                >
                                                    <i className="fa-solid fa-arrow-left"></i>
                                                </button>
                                            </div>

                                            <div>
                                                <ul className="adver-numbr-list">
                                                    {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((num) => (
                                                        <li key={num}>
                                                            <button
                                                                onClick={() => setCurrentPage(num)}
                                                                className={`page-link ${currentPage === num ? "active" : ""}`}
                                                            >
                                                                {num}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="adver-next">
                                                <button
                                                    disabled={currentPage === totalPages}
                                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                                    className="btn btn-link text-decoration-none"
                                                >
                                                    <i className="fa-solid fa-arrow-right"></i>
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
        </>
    )
}

export default ConsumerReferencesRequest
