import React, { useEffect, useState } from 'react'
import images from '../../../assets/images';
import { useSelector } from 'react-redux';
import { deleteApiData, getSecureApiData, securePostData } from '../../../services/api';
import { toast } from 'react-toastify';
import base_url from '../../../baseUrl';

function Advertisement() {
    const [isData, setIsData] = useState(false);
    const [total, setTotal] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const userId = localStorage.getItem('userId')
    const [isNew,setIsNew]=useState(false)
    const { memembershipData ,profileData} = useSelector(state => state.user)
    const [advertisement, setAdvertisement] = useState([])
    const [form, setForm] = useState({ userId, accountName: profileData.firstName, email: profileData?.email, contactNumber: profileData?.contactNumber, spot: "", detail: "", image: null, preview: null, usePoint: false })

    useEffect(()=>{
        setForm({userId, accountName: profileData.firstName, email: profileData?.email, contactNumber: profileData?.contactNumber, spot: "", detail: "", image: null, preview: null, usePoint: false})
    },[profileData])

    async function getAdvertisement() {
        try {
            const result = await getSecureApiData(`api/provider/ads/${userId}?page=${currentPage}`)
            if (result.status) {
                setAdvertisement(result.data)
                setTotal(result.pagination.totalPages)
                if(result.data.length==0){
                    setIsNew(true)
                }

            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function deleteAd(id) {
        try {
            const result = await deleteApiData(`api/provider/ads/${id}`)
            if (result.status) {
                getAdvertisement()
            } else {
            }
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        getAdvertisement()
    }, [currentPage])
    const handleAdChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "file") {
            // For file input, store the file and a preview URL
            const file = files[0];
            setForm((prevForm) => ({
                ...prevForm,
                [name]: file,
                preview: file ? URL.createObjectURL(file) : null,
            }));
        } else if (type === "checkbox") {
            // For checkbox, store the checked status (true/false)
            setForm((prevForm) => ({
                ...prevForm,
                [name]: checked,
            }));
        } else {
            // For text, email, number, textarea, select, radio, etc.
            setForm((prevForm) => ({
                ...prevForm,
                [name]: value,
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData()
        for (let key in form) {
            if (key == 'image') continue;
            data.append(key, form[key])
        }
        if (form.image) {
            data.append('image', form.image)
        }
        try {
            const result = await securePostData('api/provider/ads', data)
            if (result.status) {
                getAdvertisement()
                setIsNew(false)
                toast.success(result.message)
                setForm({userId, accountName: profileData.firstName, email: profileData?.email, contactNumber: profileData?.contactNumber, spot: "", detail: "", image: null, preview: null, usePoint: false })
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <>
            {(isNew || advertisement?.length==0)  ?
            <div className="main-section posting-histry-sec advertisement-main-sec flex-grow-1">
                    <div className="row dash-profile-overflow pt-4 mx-lg-2 mx-sm-0">
                        <div className="d-lg-none d-md-block">
                            <a href="#" className='mb-mobile-btn'>
                                <i className="fa-solid fa-angle-left" />
                                Back
                            </a>
                        </div>
                        <h2 className='fz-32 fw-600 mb-3'>Advertisement</h2>
                        {advertisement?.length==0 && <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="main-profile-sec dash-profile-sec posting-histry-main-box ">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="pos-his-firt-div">
                                            <a href="#">
                                                <i className="fa-solid fa-xmark" />
                                            </a>
                                            <div className="adver-title">
                                                <h4 className="mb-0">You haven’t placed any ads with us yet</h4>
                                                <p className="mb-0">
                                                    Please contact <span>hello@wizbizla.com</span> so we can help
                                                    place some interest-based advertisements for you.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>
                    <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="main-profile-sec dash-profile-sec individual-frm-box">
                                <div className="main-profile-sec individual-frm-head-box">
                                    <h3 className="mb-0">
                                        Stand Out from the Crowd: Boost Your Visibility!
                                    </h3>
                                    <p className="indi-para">
                                        Please complete the form below to place your banner advertisement.
                                    </p>
                                </div>
                                <div className="posting-history-crd-box">
                                    <form onSubmit={handleSubmit} className="row">
                                        <div className="col-lg-4 col-md-4 col-sm-12">
                                            <div className="custom-frm-bx">
                                                <label htmlFor="">
                                                    Account Name <span className="start-icon">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter first name"
                                                    required
                                                    name="accountName"
                                                    value={form.accountName}
                                                    // onChange={handleAdChange}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12">
                                            <div className="custom-frm-bx">
                                                <label htmlFor="">
                                                    Email <span className="start-icon">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Enter your email"
                                                    required
                                                    name="email"
                                                    value={form.email}
                                                    // onChange={handleAdChange}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12">
                                            <div className="custom-frm-bx">
                                                <label htmlFor="">
                                                    Contact number <span className="start-icon">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter your number"
                                                    required
                                                    name="contactNumber"
                                                    value={form.contactNumber}
                                                    // onChange={handleAdChange}
                                                    disabled
                                                />
                                            </div>
                                        </div>


                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="custom-frm-bx option-size">
                                                <label htmlFor="">
                                                    Which spots would you like to display your advertisement in? <span className="start-icon">*</span>
                                                </label>
                                                <select name="spot" value={form.spot} onChange={handleAdChange} id="" className="form-select" required>
                                                    <option value="">Select page</option>
                                                    <option value="home-top">Home Top</option>
                                                    <option value="home-sidebar">Home Sidebar</option>
                                                    <option value="home-bottom">Home Bottom</option>
                                                    <option value="category-top">Category Top</option>
                                                    <option value="category-sidebar">Category Sidebar</option>
                                                    <option value="category-bottom">Category Bottom</option>
                                                    <option value="product-top">Product Top</option>
                                                    <option value="product-sidebar">Product Sidebar</option>
                                                    <option value="product-bottom">Product Bottom</option>
                                                    <option value="checkout-top">Checkout Top</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div className="custom-frm-bx">
                                                <label htmlFor="">
                                                    Please describe your advertisement in detail, including the preferred run dates.
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    placeholder=""
                                                    id="floatingTextarea2"
                                                    required
                                                    name="detail"
                                                    value={form.detail}
                                                    onChange={handleAdChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="custom-frm-bx file-upload-box option-size">
                                                <label htmlFor="">
                                                    Advertisement Image <span className="start-icon">*</span>
                                                </label>
                                                <label htmlFor="fileInput2" style={{ width: "100%" }}>
                                                    <div className="upload-box p-4 text-center" id="uploadArea2">
                                                        <div className="upload-icon mx-auto mb-2">
                                                            <img
                                                                src='/assets/images/business-file-upload.png'
                                                                alt="Upload"
                                                            />
                                                        </div>
                                                        <div className="d-flex justify-content-center gap-2">
                                                            <div>
                                                                <p className="fw-semibold mb-1">
                                                                    <label
                                                                        htmlFor="fileInput2"
                                                                        className="text-primary file-label"
                                                                        style={{ cursor: "pointer" }}
                                                                    >
                                                                        Click to upload
                                                                    </label>{" "}
                                                                    or drag and drop
                                                                </p>
                                                                <small className="text-muted">
                                                                    SVG, PNG, JPG or GIF (max. 10MB)
                                                                </small>
                                                            </div>
                                                            <div className="d-flex justify-content-end position-relative">

                                                                <img
                                                                    src="/assets/images/file-types.png"
                                                                    alt=""
                                                                    style={{ width: 40, height: 40 }}
                                                                />
                                                            </div>
                                                        </div>

                                                        {form.preview == null && form?.image && <div id="filePreview2" className=" mt-3">
                                                            <img
                                                                src={form?.image}
                                                                alt="Preview"
                                                                className="img-thumbnail"
                                                                style={{ maxWidth: 100 }}
                                                            />
                                                        </div>}
                                                        {form?.preview && <div id="filePreview2" className=" mt-3">
                                                            <img
                                                                src={form?.preview}
                                                                alt="Preview"
                                                                className="img-thumbnail"
                                                                style={{ maxWidth: 100 }}
                                                            />
                                                        </div>}
                                                    </div>
                                                </label>
                                                <input
                                                    type="file"
                                                    name='image'
                                                    className="d-none"
                                                    id="fileInput2"
                                                    onChange={handleAdChange}
                                                    accept=".png,.jpg,.jpeg,"
                                                // disabled={!values.keepDefaultProfile}
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div>
                                                <div className="custom-frm-bx">
                                                    <div className="form-check check-advi-frm d-flex justify-content-between">
                                                        <div className="check-box-advis">
                                                            <input
                                                                className="form-check-input custom-checkbox"
                                                                type="checkbox"
                                                                defaultValue=""
                                                                id="checkDefaulttrad-advers-ponint"
                                                                name="usePoint"
                                                                checked={form.usePoint}
                                                                onChange={handleAdChange}
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="checkDefaulttrad-advers-ponint"
                                                            >
                                                                {" "}
                                                                I’d like to use my available points{" "}
                                                            </label>
                                                        </div>
                                                        <div className="d-none advi-resp">
                                                            <small>Total points price</small>
                                                        </div>
                                                        <div>
                                                            <span>
                                                                Earn 300 <small>points</small>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className="individual-frm-btn">
                                            <button type="submit" className="btn btn-primary">
                                                Save Details
                                            </button>
                                            {advertisement?.length>0 &&<button 
                                            type='button'
                                                onClick={()=>setIsNew(false)}
                                                className="btn btn-primary advis-clse-btn"
                                            >
                                                Close
                                            </button>}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                :
                <div className="main-section posting-histry-sec flex-grow-1">
                    <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
                        <div className="d-lg-none d-md-block">
                            <a href="#">
                                <i className="fa-solid fa-angle-left" />
                                Back
                            </a>
                        </div>
                        <h2>Advertisement</h2>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="main-profile-sec dash-profile-sec">
                                <div className="posting-hostry-main-sec">
                                    <div className="posting-hostry-title-header-box adver-header-bx">
                                        <h3 className="mb-0">My ads</h3>
                                        <button onClick={()=>setIsNew(true)} className="btn btn-primary report-btn">
                                            Place an Advertisement
                                        </button>
                                    </div>
                                    <ul>
                                        <li className="divider" />
                                    </ul>
                                </div>
                                <div className="posting-history-crd-box">
                                    <div className="row mb-4">
                                        {advertisement?.map((item, key) =>
                                            <div className="col-lg-4 col-md-6 col-sm-12" key={key}>
                                                <div className="posting-stories-crd-sec advertisement-crd-sec">
                                                    <div className="posting-stories-crd-picture nw-bookmark-picture">
                                                        <img src={item?.image ? `${base_url}/${item?.image}` : images?.adPhotoOne} alt="" className='w-100' />
                                                    </div>
                                                    <div className="posting-btn-list">
                                                        <ul>
                                                            {item?.status == 'live' && <li>
                                                                <a href="#" className="active">
                                                                    Live
                                                                </a>
                                                            </li>}
                                                            {item?.status == 'under-review' && <li>
                                                                <a href="#" className="draft">
                                                                    Under Review
                                                                </a>
                                                            </li>}
                                                            {item?.status=='expired'&&<li>
                                                                <a href="#">Expired</a>
                                                            </li>}
                                                            {item?.status == 'declined' && <li >
                                                                <a href="#" className="badge-declined" style={{background: '#D92D201A',color:'#D92D20'}}>
                                                                    Declined
                                                                </a>
                                                            </li>}
                                                            {/* <li>
                                                                <button onClick={() => deleteAd(item._id)}>Delete</button>
                                                            </li> */}
                                                        </ul>
                                                    </div>
                                                    <div className="my-2 advertisement-features">
                                                        <p className="py-1">Ad Period: Jan 1, 2024 - Apr 5, 2024</p>
                                                        <span>Featured on: {item?.spot}</span>
                                                    </div>
                                                    <div className="posting-stories-crd-content">
                                                        <div className="posting-stories-title">
                                                            <h3 className="mb-0">
                                                                {item?.detail}
                                                            </h3>
                                                            {/* <a
                                                                href="#"
                                                                className="posting-stories-share"
                                                            >
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </a> */}
                                                        </div>
                                                    </div>
                                                    {/* <h6>300 AED</h6> */}
                                                </div>
                                            </div>)}

                                    </div>
                                    {total>1 && <div className="row">
                                        <div className="col-lg-12">
                                            <div className="d-flex justify-content-between adver-pagi-sec adver-pagi-desk-sec align-items-center">
                                                {/* Previous Button */}
                                                <div className="adver-prev">
                                                    <button
                                                        disabled={currentPage === 1}
                                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                    >
                                                        <i className="fa-solid fa-arrow-left" /> Previous
                                                    </button>
                                                </div>
                                                {/* Page Numbers */}
                                                <div>
                                                    <ul className="adver-numbr-list">
                                                        {Array.from({ length: total }, (_, index) => {
                                                            const pageNum = index + 1;
                                                            return (
                                                                <li key={pageNum}>
                                                                    <button
                                                                        className={pageNum === currentPage ? "active" : ""}
                                                                        onClick={() => setCurrentPage(pageNum)}
                                                                    >
                                                                        {pageNum}
                                                                    </button>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>

                                                {/* Next Button */}
                                                <div className="adver-next">
                                                    <button
                                                        disabled={currentPage === total}
                                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, total))}
                                                    >
                                                        Next <i className="fa-solid fa-arrow-right" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Mobile version */}
                                            <div className="d-flex justify-content-between adver-pagi-sec adver-pagi-mob-sec d-none">
                                                <div className="adver-prev">
                                                    <button
                                                        disabled={currentPage === 1}
                                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                    >
                                                        <i className="fa-solid fa-arrow-left" />
                                                    </button>
                                                </div>
                                                <div>
                                                    <ul className="adver-numbr-list">
                                                        {Array.from({ length: total }, (_, index) => {
                                                            const pageNum = index + 1;
                                                            return (
                                                                <li key={pageNum}>
                                                                    <button
                                                                        className={pageNum === currentPage ? "active" : ""}
                                                                        onClick={() => setCurrentPage(pageNum)}
                                                                    >
                                                                        {pageNum}
                                                                    </button>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                                <div className="adver-next">
                                                    <button
                                                        disabled={currentPage === total}
                                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, total))}
                                                    >
                                                        <i className="fa-solid fa-arrow-right" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
        </>
    )
}

export default Advertisement
