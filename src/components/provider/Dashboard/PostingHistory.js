import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import images from '../../../assets/images'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteApiData, getSecureApiData } from '../../../services/api'
import base_url from '../../../baseUrl'

function PostingHistory() {
    const [total, setTotal] = useState(1)
    const userId = localStorage.getItem('userId')
    const [currentPage, setCurrentPage] = useState(1)
    const { memembershipData } = useSelector(state => state.user)
    const [postingHistory, setPostingHistory] = useState([])

    async function getPostingHistory() {
        try {
            const result = await getSecureApiData(`api/users/my-scam-report/${userId}?page=${currentPage}`)
            if (result.success) {
                setPostingHistory(result.allReport)
                setTotal(result.totalPages)

            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function deleteReport(id) {
        try {
            const result = await deleteApiData(`api/users/delete-report/${id}`)
            if (result.success) {
                getPostingHistory()
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        getPostingHistory()
    }, [currentPage])

    return (
        <>
            {postingHistory?.length == 0 ? <div className="main-section posting-histry-sec flex-grow-1">
                <div className="row dash-profile-overflow pt-4 mx-lg-2 mx-sm-0">
                    <div className="d-lg-none d-md-block">
                        <a href="#" className='mb-mobile-btn'>
                            <i className="fa-solid fa-angle-left" />
                            Back
                        </a>
                    </div>
                    <h2 className='fz-32 fw-600 mb-3'>Posting History</h2>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="main-profile-sec dash-profile-sec posting-histry-main-box">
                            <div className="row mx-lg-2 mx-sm-0">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="pos-his-firt-div">
                                        <a href="#">
                                            <i className="fa-solid fa-xmark" />
                                        </a>
                                        <p className="mb-0">
                                            Sorry! You currently haven’t posted anything. Report a scam or
                                            add your business profile.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="d-flex justify-content-end align-items-center posting-hist-btn-bx gap-3">
                                        <a href="" className="thm-btn text-decoration-underline" >
                                            Add your business profile
                                        </a>
                                        <Link
                                            to="/report-scam"
                                            className="thm-btn outline nw-mb-thm-btn"
                                            
                                        >
                                            Report fraud{" "}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> :
                <div className="main-section posting-histry-sec flex-grow-1">
                    <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
                        <div className="d-lg-none d-md-block">
                            <a href="#" className='mb-mobile-btn'>
                                <i className="fa-solid fa-angle-left" />
                                Back
                            </a>
                        </div>
                        <h2>Posting History</h2>
                    </div>
                    {/* <div className="row dash-profile-overflow mt-4">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="main-profile-sec dash-profile-sec">
                                <div className="posting-hostry-main-sec">
                                    <div className="posting-hostry-title-header-box">
                                        <h3 className="mb-0">Scam Tracker</h3>
                                        <Link to="/report-scam" className="btn btn-primary report-btn">
                                            Report a Scam
                                        </Link>
                                    </div>
                                    <ul>
                                        <li className="divider" />
                                    </ul>
                                </div>
                                <div className="posting-history-crd-box">
                                    <p>
                                        The write up is approved by the Wizbizla team to ensure that it
                                        complies with the legal guidelines and laws of the UAE. Wizbizla
                                        posts the story on the Scam Tracker and a copy of it goes into the
                                        dashboard in this tab. Once written they cannot edit it - they can
                                        only delete the story.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="main-profile-sec dash-profile-sec">
                                <div className="posting-hostry-main-sec">
                                    <div className="posting-hostry-title-header-box">
                                        <h3 className="mb-0">My Scam Stories Listing</h3>
                                        <Link to="/report-scam" className="btn btn-primary report-btn">
                                            Add New
                                        </Link>
                                    </div>
                                    <ul>
                                        <li className="divider" />
                                    </ul>
                                </div>
                                <div className="posting-history-crd-box">
                                    <div className="row mb-4">
                                        {postingHistory?.map((item, key) =>
                                            <div className="col-lg-4 col-md-6 col-sm-12" key={key}>
                                                <div className="posting-stories-crd-sec">
                                                    <div className="posting-stories-crd-picture">
                                                        <img src={item?.image ? `${base_url}/${item?.image}` : images?.postingStoreFirst} alt="" />
                                                    </div>
                                                    <div className="posting-stories-crd-content">
                                                        <div className="posting-stories-title">
                                                            <h3 className="mb-0 text-capitalize">
                                                                {item?.title}
                                                            </h3>
                                                            {/* <a
                                                                href="#"
                                                                className="posting-stories-share"
                                                            >
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </a> */}
                                                        </div>
                                                        <div className="posting-stories-crd-subtitle">
                                                            <h4 className="mb-0">Submitted: {new Date(item?.createdAt)?.toLocaleDateString('en-GB', {
                                                                day: '2-digit',
                                                                month: 'long',
                                                                year: 'numeric',
                                                            })}</h4>
                                                            {item?.status == 'pending' && <h5 className="mb-0 ">Approval Pending</h5>}
                                                            {item?.status == 'live' && <h5 className="mb-0 posting-live">Live</h5>}
                                                            {item?.status == 'declined' && <h5 className="mb-0 posting-declined">Declined</h5>}
                                                        </div>
                                                        <span>ID: #{item?._id?.slice(-10)}</span>
                                                    </div>
                                                    <div className="posting-stories-btn">
                                                        <button
                                                            onClick={() => deleteReport(item._id)}
                                                            className="btn btn-outline-primary rm-outline-btn"
                                                        >
                                                            Remove
                                                        </button>
                                                        <Link to={`/scam-tracker-detail/${item?.title}/${item?._id}`} className="btn btn-primary">
                                                            View
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>)}
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-center pb-2 gap-2">
                                    <div id="custom-arrows" className="d-flex  gap-2" style={styles.paginationContainer}>
                                        <button disabled={currentPage == 1} className="btn-outline-secondary btn-sm" style={{ color: currentPage == 1 ? '#4F40FF80' : "#4F40FF" }} id="prev">
                                            <i class="fa-solid fa-chevron-left"></i>
                                        </button>
                                        {[...Array(total)].map((_, index) => {
                                            const page = index + 1;
                                            return (
                                                <span
                                                    key={page}
                                                    style={{
                                                        ...styles.dot,
                                                        backgroundColor: page === currentPage ? "#4F40FF" : "#d6d6ff",
                                                    }}
                                                    onClick={() => setCurrentPage(page)}
                                                    aria-current={page === currentPage ? "page" : undefined}
                                                />
                                            );
                                        })}
                                        <button disabled={total == currentPage} className="btn-outline-secondary btn-sm" style={{ color: total == currentPage ? "#4F40FF80" : "#4F40FF" }} id="next">
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

export default PostingHistory
const styles = {
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    marginTop: "16px",
  },
  arrowButton: {
    cursor: "pointer",
    border: "none",
    background: "transparent",
    fontSize: "18px",
    color: "#7a5fff",
    padding: "4px 8px",
    userSelect: "none",
    disabled: {
      opacity: 0.3,
      cursor: "not-allowed",
    },
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    display: "inline-block",
    cursor: "pointer",
  },
};
