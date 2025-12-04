import React, { useEffect, useState } from 'react'
import images from '../../../assets/images';
import { Link, useNavigate } from 'react-router-dom';
import { getApiData, getSecureApiData, securePostData } from '../../../services/api';
import { toast } from 'react-toastify';
import { Modal } from 'bootstrap';
import base_url from '../../../baseUrl';
import { categoryData } from '../../../utils/GlobalFunction';
import { useSelector } from 'react-redux';

function MyAddon() {
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId');
  const [isDetail, setIsDeatil] = React.useState(false);
  const [isMatch, setIsMatch] = useState(false)
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [openDispute, setOpenDispute] = useState({ userId, message: "", type: "", against: "", againstId: "", subject: "", image: null, preview: null })
  const [allDispute, setAllDispute] = useState([])
  const [selectedAddOn, setSelectedAddOn] = useState(0)
  const [total, setTotal] = useState(0)
  const [myCurrent, setMyCurrent] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [addOnData, setAddOnData] = useState([])
  const [isKey, setIsKey] = useState(null)
  const [myDispute, setMyDispute] = useState(0)
  const [myTotal, setMyTotal] = useState(0)
  const [matchProfile, setMatchProfile] = useState([])
  const [businessCategory, setBusinessCategory] = useState([])
  const [disputeAddOn, setDisputeAddOn] = useState(null)
  const { profileData, membershipData, businessData } = useSelector(state => state.user)
  const [bespokeForm, setBespokeForm] = useState({
    userId, firstName: "", lastName: "", email: "", contactNumber: "", businessName: "", businessCategory: "",
    serviceActivity: "", priceRange: null, serviceDate: undefined, specificRequirement: '', preferenceToAvoid: "", serviceLocation: ""
  })
  async function fetchAddOnData() {
    try {
      const result = await getSecureApiData('get-addon')
      if (result.status) {
        const data = result.addOnData?.filter(item => item?.name?.toLowerCase().includes('dispute'))
        console.log(data)
        setDisputeAddOn(data[0])

        setAddOnData(result.addOnData)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  async function catData() {
    const data = await categoryData()
    setBusinessCategory(data)

  }
  useEffect(() => {
    catData()
  }, [])
  async function fetchUserProfile() {
    if (openDispute.against?.length < 2) {
      return
    }
    try {
      const result = await getApiData(`api/users/search-profile/${openDispute.against}?role=provider`)
      if (result.success) {
        if (result?.profileUsers?.length > 0) {
          setIsMatch(true)
        }
        const data = result?.profileUsers?.filter(item => item?._id !== userId)
        setMatchProfile(data)
      }
    } catch (error) {

    }
  }
  useEffect(() => {
    setTimeout(() => {
      fetchUserProfile()
    }, 800);
  }, [openDispute.against])
  useEffect(() => {
    fetchAddOnData()
  }, [])
  async function getDispute() {
    try {
      const result = await getSecureApiData(`api/users/my-dispute/${userId}?page=${currentPage}`)
      if (result.success) {
        setAllDispute(result.disputeData)
        setTotal(result.totalPages)

      } else {
      }
    } catch (error) {
      toast.error(error)
    }
  }
  async function getDisputeAgainstMe() {
    try {
      const result = await getSecureApiData(`api/users/my-dispute/${userId}?page=${myCurrent}&type=againstMe`)
      if (result.success) {
        setMyDispute(result.disputeData)
        setMyTotal(result.totalPages)

      } else {
      }
    } catch (error) {
      toast.error(error)
    }
  }
  useEffect(() => {
    getDispute()
  }, [currentPage])
  useEffect(() => {
    getDisputeAgainstMe()
  }, [myCurrent])
  async function disputeSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    for (let i in openDispute) {
      if (i === "image" || i === "preview") continue;
      if (i === "against" || i === "againstId") continue;

      data.append(i, openDispute[i]);
    }

    if (openDispute.image) {
      data.append("image", openDispute.image);
    }

    data.append("addOnId", selectedAddOn._id);
    data.append("against", openDispute.againstId);

    data.append("addOnPrice", selectedAddOn?.price);
    data.append("addOnType", selectedAddOn?.type);
    if(profileData?.freeService>0){
      data.append('serviceUsed',true)
    }

    try {
      const result = await securePostData("api/users/open-dispute", data);

      if (result.success) {
        const payload = {
          price: selectedAddOn?.price,
          disputeId: result.dispute._id,
          name: selectedAddOn?.name,
        };

        localStorage.setItem("serviceData", JSON.stringify(payload));

        // ✅ CLOSE MODAL BEFORE NAVIGATE
        const modalEl = document.getElementById("disputeModal");
        const modal = Modal.getInstance(modalEl);
        modal.hide();

        document.body.classList.remove("modal-open");
        document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());

        setOpenDispute({
          userId,
          message: "",
          type: "",
          against: "",
          againstId: "",
          subject: "",
          image: null,
          preview: null,
        });

        getDispute();

        // ⭐ NOW NAVIGATE — after modal is closed
        navigate("/service-payment");
      } else {
        toast.message(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDisputeChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setOpenDispute((prev) => ({
        ...prev,
        [name]: file,
        preview: file ? URL.createObjectURL(file) : null,
      }));
    } else {
      setOpenDispute((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    // if(name=='against'){
    //   setIsMatch(true)
    // }
  };
  const handleBespokeChange = (e) => {
    const { name, value, } = e.target;
    setBespokeForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  async function bespokeSubmit(e, type) {
    e.preventDefault()
    const data = { ...bespokeForm, type, addOnId: selectedAddOn._id }
    if(profileData?.freeService>0){
      data.serviceUsed=true
    }
    try {
      const result = await securePostData('api/users/request-bespoke', data)
      if (result.success) {
        const payload = {
          price: selectedAddOn?.price,
          requestId: result.request._id,
          name: selectedAddOn?.name,
        };

        localStorage.setItem("serviceData", JSON.stringify(payload));
        const modalEl = document.getElementById(type == 'concierge-service' ? 'bespokeModal' : 'customizeModal');
        const modal = Modal.getInstance(modalEl);
        modal.hide();
        document.body.classList.remove('modal-open');
        document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
        setBespokeForm({
          userId, firstName: "", lastName: "", email: "", contactNumber: "", businessName: "", businessCategory: "", serviceLocation: "",
          serviceActivity: "", priceRange: null, serviceDate: undefined, specificRequirement: '', preferenceToAvoid: ""
        })
        navigate("/service-payment");
      } else {
        toast.message(result.message)
      }
    } catch (error) {

    }
  }
  const handleSelectProfile = (item) => {
    setIsMatch(false)
    setMatchProfile([])
    setOpenDispute(prev => ({
      ...prev,
      against: `${item.firstName} ${item.lastName}`,  // visible text
      againstId: item._id                               // backend value
    }));
  };

  const getTargetModal = (item) => {
    const name = item?.name?.toLowerCase() || "";

    if (name.includes("dispute")) return "#disputeModal";
    if (name.includes("customize")) return "#customizeModal";
    if (name.includes("bespoke")) return "#bespokeModal";

    return null; // or undefined, Bootstrap will ignore it
  };

  return (
    <>
      {isDetail ?
        isAdmin
          ? <div className="main-section posting-histry-sec flex-grow-1">
            <div className="row dash-profile-overflow mt-4">
              <div className="d-lg-none d-md-block">
                <a href="javascript:void(0)">
                  <i className="fa-solid fa-angle-left" />
                  Back
                </a>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="main-profile-sec dash-profile-sec">
                  <div className="posting-hostry-main-sec">
                    <div className="posting-hostry-title-header-box rating-usr-toggle-bx">
                      <h3 className="mb-0">Dispute Details</h3>
                    </div>
                    <ul>
                      <li className="divider" />
                    </ul>
                  </div>
                  <div className="posting-history-crd-box">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className=" srvice-dispute-details-heading">
                          <div className="d-flex justify-content-between">
                            <div>
                              <span>Type</span>
                              <h5>Fraud</h5>
                            </div>
                            <div>
                              <span>Submitted By</span>
                              <h5>Service Provider</h5>
                            </div>
                            <div>
                              <span>Dispute Against</span>
                              <h5>ABC Company</h5>
                            </div>
                            <div>
                              <span>Dispute Title</span>
                              <h5>Test Subject</h5>
                            </div>
                            <div>
                              <span>Current Status</span>
                              <h5>Pending</h5>
                            </div>
                          </div>
                          <div className="my-3">
                            <h4 className="mb-0">Dispute Description</h4>
                            <p>
                              Lorem ipsum dolor sit amet consectetur. Sit mi duis
                              scelerisque a. Sed mollis pretium ac massa. Morbi ornare
                              dignissim tortor blandit. Semper laoreet nec egestas
                              venenatis eu eu nibh dolor. Ut viverra sapien arcu erat ut
                              dictum malesuada.
                            </p>
                          </div>
                        </div>
                        <div className="row srvice-dis-detaisl-pic mb-3">
                          <h3>Attachments</h3>
                          <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="srvice-details-picture">
                              <img src={images?.serviceDisDetail} alt="" />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="srvice-details-picture">
                              <img src={images?.serviceDisDetail} alt="" />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="srvice-details-picture">
                              <img src={images?.serviceDisDetail} alt="" />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="srvice-details-picture">
                              <img src={images?.serviceDisDetail} alt="" />
                            </div>
                          </div>
                        </div>
                        <div className="row srvice-dis-detaisl-pic mb-3">
                          <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="srvice-details-picture">
                              <img src={images?.serviceDisDetail} alt="" />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="srvice-details-picture">
                              <img src={images?.serviceDisDetail} alt="" />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="srvice-details-picture">
                              <img src={images?.serviceDisDetail} alt="" />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="srvice-details-picture">
                              <img src={images?.serviceDisDetail} alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row dash-profile-overflow mt-4">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="main-profile-sec dash-profile-sec">
                  <div className="posting-hostry-main-sec">
                    <div className="posting-hostry-title-header-box rating-usr-toggle-bx">
                      <h3 className="mb-0">Resolution</h3>
                    </div>
                    <ul>
                      <li className="divider" />
                    </ul>
                  </div>
                  <div className="posting-history-crd-box">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className=" srvice-dispute-details-heading">
                          <div className="my-3">
                            <h4 className="mb-0">Description</h4>
                            <p className="srvice-dis-desc py-3">
                              Lorem ipsum dolor sit amet consectetur. Sit mi duis
                              scelerisque a. Sed mollis pretium ac massa. Morbi ornare
                              dignissim tortor blandit. Semper laoreet nec egestas
                              venenatis eu eu nibh dolor. Ut viverra sapien arcu erat ut
                              dictum malesuada.
                            </p>
                            <p>Final Resolution</p>
                            <p className="srvice-dis-desc">This has been resolved</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row dash-profile-overflow mt-4">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="main-profile-sec dash-profile-sec">
                  <div className="posting-hostry-main-sec">
                    <div className="posting-hostry-title-header-box rating-usr-toggle-bx">
                      <h3 className="mb-0">Comments By Admin</h3>
                    </div>
                    <ul>
                      <li className="divider" />
                    </ul>
                  </div>
                  <div className="posting-history-crd-box">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="srvice-admin-details posting-hostry-main-sec">
                          <div className="srvice-commit-admn">
                            <div className="d-flex justify-content-between">
                              <h4>Katherine Moss</h4>
                              <h5>Thursday 10:16am</h5>
                            </div>
                            <p>
                              Thanks Olivia! Almost there. I’ll work on making those
                              changes you suggested and will shoot it over.
                            </p>
                          </div>
                          <div className="srvice-commit-admn mt-3">
                            <div className="d-flex justify-content-between">
                              <h4 className="mb-0">Katherine Moss</h4>
                              <h5>Thursday 10:16am</h5>
                            </div>
                            <p>
                              Thanks Olivia! Almost there. I’ll work on making those
                              changes you suggested and will shoot it over.
                            </p>
                          </div>
                          <div className="srvice-commit-admn mt-3">
                            <div className="d-flex justify-content-between">
                              <h4 className="mb-0">Katherine Moss</h4>
                              <h5>Thursday 10:16am</h5>
                            </div>
                            <p>
                              Thanks Olivia! Almost there. I’ll work on making those
                              changes you suggested and will shoot it over.
                            </p>
                          </div>
                          <div className="srvice-commit-admn mt-3">
                            <div className="d-flex justify-content-between">
                              <h4 className="mb-0">Katherine Moss</h4>
                              <h5>Thursday 10:16am</h5>
                            </div>
                            <p>
                              Thanks Olivia! Almost there. I’ll work on making those
                              changes you suggested and will shoot it over.
                            </p>
                          </div>
                          <div className="custom-frm-bx mt-4">
                            <textarea
                              className="form-control"
                              placeholder="Add comments"
                              id="floatingTextarea2"
                              defaultValue={""}
                            />
                          </div>
                          <div className="posting-hostry-title-header-box rating-usr-toggle-bx mx-0 ">
                            <a
                              href="javascript:void(0)"
                              className="btn btn-primary report-btn"
                              style={{ textDecoration: "none !important" }}
                            >
                              Submit
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row dash-profile-overflow mt-4">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="main-profile-sec dash-profile-sec">
                  <div className="posting-hostry-main-sec">
                    <div className="posting-hostry-title-header-box rating-usr-toggle-bx">
                      <h3 className="mb-0">Resolution</h3>
                    </div>
                    <ul>
                      <li className="divider" />
                    </ul>
                  </div>
                  <div className="posting-history-crd-box">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="srvice-admin-details posting-hostry-main-sec">
                          <div className="custom-frm-bx">
                            <textarea
                              className="form-control"
                              placeholder="Add comments"
                              id="floatingTextarea2"
                              defaultValue={""}
                            />
                          </div>
                          <div className="custom-frm-bx">
                            <label htmlFor="">
                              Final Resolution <span className="start-icon">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Write your final resolution"
                              defaultValue=""
                            />
                          </div>
                          <div className="custom-frm-bx option-size">
                            <label htmlFor="">
                              Status <span className="start-icon">*</span>
                            </label>
                            <select name="" id="" className="form-select">
                              <option value="">Select</option>
                            </select>
                          </div>
                          <div className="posting-hostry-title-header-box rating-usr-toggle-bx mx-0 ">
                            <a
                              href="javascript:void(0)"
                              className="btn btn-primary report-btn"
                              style={{ textDecoration: "none !important" }}
                            >
                              Submit
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          <div className="main-section posting-histry-sec flex-grow-1">
            <div className="row dash-profile-overflow mt-4">
              <div className="">
                <button onClick={() => setIsDeatil(false)} className='text-black'>
                  <i className="fa-solid fa-angle-left" />
                  Back
                </button>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="main-profile-sec dash-profile-sec">
                  <div className="posting-hostry-main-sec">
                    <div className="posting-hostry-title-header-box rating-usr-toggle-bx">
                      <h3 className="mb-0">Dispute Details</h3>
                    </div>
                    <ul>
                      <li className="divider" />
                    </ul>
                  </div>
                  <div className="posting-history-crd-box">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className=" srvice-dispute-details-heading">
                          <div className="d-flex justify-content-between">
                            <div>
                              <span>Type</span>
                              <h5>Fraud</h5>
                            </div>
                            <div>
                              <span>Submitted By</span>
                              <h5>Service Provider</h5>
                            </div>
                            <div>
                              <span>Dispute Against</span>
                              <h5>ABC Company</h5>
                            </div>
                            <div>
                              <span>Dispute Title</span>
                              <h5>Test Subject</h5>
                            </div>
                            <div>
                              <span>Current Status</span>
                              <h5>Pending</h5>
                            </div>
                          </div>
                          <div className="my-3">
                            <h4 className="mb-0">Dispute Description</h4>
                            <p>
                              Lorem ipsum dolor sit amet consectetur. Sit mi duis
                              scelerisque a. Sed mollis pretium ac massa. Morbi ornare
                              dignissim tortor blandit. Semper laoreet nec egestas
                              venenatis eu eu nibh dolor. Ut viverra sapien arcu erat ut
                              dictum malesuada.
                            </p>
                          </div>
                        </div>
                        <div className="row srvice-dis-detaisl-pic mb-3">
                          <h3>Attachments</h3>
                          <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="srvice-details-picture">
                              <img src={images?.serviceDisDetail} alt="" />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="srvice-details-picture">
                              <img src={images?.serviceDisDetail} alt="" />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="srvice-details-picture">
                              <img src={images?.serviceDisDetail} alt="" />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="srvice-details-picture">
                              <img src={images?.serviceDisDetail} alt="" />
                            </div>
                          </div>
                        </div>
                        <div className="row srvice-dis-detaisl-pic mb-3">
                          <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="srvice-details-picture">
                              <img src={images?.serviceDisDetail} alt="" />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="srvice-details-picture">
                              <img src={images?.serviceDisDetail} alt="" />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="srvice-details-picture">
                              <img src={images?.serviceDisDetail} alt="" />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="srvice-details-picture">
                              <img src={images?.serviceDisDetail} alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row dash-profile-overflow mt-4 ">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="main-profile-sec dash-profile-sec">
                  <div className="posting-hostry-main-sec">
                    <div className="posting-hostry-title-header-box rating-usr-toggle-bx">
                      <h3 className="mb-0">Resolution</h3>
                    </div>
                    <ul>
                      <li className="divider" />
                    </ul>
                  </div>
                  <div className="posting-history-crd-box">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className=" srvice-dispute-details-heading">
                          <div className="my-3">
                            <h4 className="mb-0">Description</h4>
                            <p className="srvice-dis-desc py-3">
                              Lorem ipsum dolor sit amet consectetur. Sit mi duis
                              scelerisque a. Sed mollis pretium ac massa. Morbi ornare
                              dignissim tortor blandit. Semper laoreet nec egestas
                              venenatis eu eu nibh dolor. Ut viverra sapien arcu erat ut
                              dictum malesuada.
                            </p>
                            <p>Final Resolution</p>
                            <p className="srvice-dis-desc">This has been resolved</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        : <div className="main-section posting-histry-sec flex-grow-1">
          <div className="row dash-profile-overflow pt-4 mx-lg-2 mx-sm-0">
            <h2 className='fz-32 fw-600 mb-3'>Service Disputes</h2>

            {addOnData?.length > 0 ?
              addOnData?.map((item, key) =>
                <div className='col-lg-4'>

                  <div className="main-profile-sec dash-profile-sec " key={key}>
                    <div className="posting-hostry-main-sec ">
                      <div className="posting-hostry-title-header-box rating-usr-toggle-bx flex-column justify-content-start align-items-start" >
                        <div>
                          <h3 className="mb-0">{item?.name} </h3>
                        </div>
                        <div className="resq-price">
                          <h5>
                            {item?.price} AED <span>/ {item?.type}</span>
                          </h5>
                          {isKey == key && <p>{item?.description}</p>}
                        </div>
                        <div className="d-flex gap-3 justify-content-between align-items-center srvices-btn-div w-100">
                          <button
                            onClick={() => setSelectedAddOn(item)}
                            data-bs-toggle="modal"
                            data-bs-target={getTargetModal(item)}
                            className="thm-btn srvice-dist-btn"
                          >
                            Buy now
                          </button>

                          <button
                            onClick={() => setIsKey(isKey !== key ? key : null)}
                            className=" srvice-dist-out-btn"
                          >
                            {isKey == key ? 'Hide' : 'View'} Details
                          </button>
                        </div>
                      </div>
                      <div />
                    </div>

                  </div>
                </div>
              ) : <p className='pb-3 ms-3'>No data found</p>}

          </div>
          <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
            <div className="d-lg-none d-md-block">
              <a href="javascript:void(0)">
                <i className="fa-solid fa-angle-left" />
                Back
              </a>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="main-profile-sec dash-profile-sec">
                <div className="posting-hostry-main-sec">
                  <div className="posting-hostry-title-header-box rating-usr-toggle-bx">
                    <h3 className="mb-0">My Disputes</h3>
                    <a href="" data-bs-toggle="modal"
                      data-bs-target="#disputeModal" className="thm-btn ">
                      Submit a Dispute request
                    </a>
                  </div>
                  <ul>
                    <li className="divider" />
                  </ul>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="table-responsive">
                      <table className="table custom-table">
                        <thead>
                          <tr>
                            <th>Dispute ID</th>
                            <th>
                              Initiated Date <i className="bi bi-arrow-down-short" />
                            </th>
                            <th>Dispute Against</th>
                            <th>Dispute Type</th>
                            <th>Dispute Message</th>
                            <th>Dispute Status</th>
                            <th>Resolution</th>
                            <th>Resolution Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allDispute?.length > 0 ?
                            allDispute?.map((item, key) =>
                              <tr key={key}>
                                <td>#{item?._id?.slice(-8)}</td>
                                <td>{new Date(item?.createdAt)?.toLocaleDateString('en-GB', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric'
                                })}</td>
                                <td className="text-truncate-custom">{item?.against?.firstName + " " + item?.against?.lastName}</td>
                                <td className="text-truncate-custom">{item?.type}</td>
                                <td className="text-truncate-custom">
                                  {item?.message}
                                </td>
                                <td>
                                  <span className=" position-relative">
                                    {item?.status == 'resolved' ?
                                      <a
                                        href="javascript:void(0)"
                                        className="badge badge-resolved"
                                      >
                                        Resolved
                                      </a> :
                                      <a
                                        href="javascript:void(0)"
                                        className="badge badge-pending "
                                      >
                                        Pending
                                      </a>
                                    }
                                  </span>
                                </td>
                                <td>{item?.resolution?.length > 50 ? <button className='thm-btn'>Read More</button> : item?.resolution}</td>
                                <td>
                                  {item?.status === 'resolved'
                                    ? new Date(item?.updatedAt).toLocaleDateString('en-GB', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric'
                                    })
                                    : '-'}
                                </td>

                              </tr>
                            ) : <span className='ps-3'>No Data</span>}

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {total > 1 && <div className="row">
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
          <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="main-profile-sec dash-profile-sec">
                <div className="posting-hostry-main-sec">
                  <div className="posting-hostry-title-header-box rating-usr-toggle-bx">
                    <h3 className="mb-0">Disputes Against Me</h3>
                  </div>
                  <ul>
                    <li className="divider" />
                  </ul>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="table-responsive">
                      <table className="table custom-table">
                        <thead>
                          <tr>
                            <th>Dispute ID</th>
                            <th>
                              Initiated Date <i className="bi bi-arrow-down-short" />
                            </th>
                            <th>Claimant's Name</th>
                            <th>Dispute Type</th>
                            <th>Dispute Summary</th>
                            <th>Dispute Status</th>
                            <th>Resolution</th>
                            <th>Resolution Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {myDispute?.length > 0 ?
                            myDispute?.map((item, key) =>
                              <tr key={key}>
                                <td>#{item?._id}</td>
                                <td>{new Date(item?.createdAt)?.toLocaleDateString('en-GB', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric'
                                })}</td>
                                <td className="text-truncate-custom">{item?.userId?.firstName} {item?.userId?.lastName}</td>
                                <td className="text-truncate-custom">{item?.type}</td>
                                <td className="text-truncate-custom">
                                  {item?.message?.length > 50 ? <button className='thm-btn'>Read More</button> : item?.message}
                                </td>
                                <td>
                                  <span className=" position-relative">
                                    {item?.status == 'resolved' ?
                                      <a
                                        href="javascript:void(0)"
                                        className="badge badge-resolved"
                                      >
                                        Resolved
                                      </a> :
                                      <a
                                        href="javascript:void(0)"
                                        className="badge badge-pending "
                                      >
                                        Pending
                                      </a>
                                    }
                                  </span>
                                </td>
                                <td>{item?.resolution?.length > 50 ? <button className='thm-btn'>Read More</button> : item?.resolution}</td>
                                <td>{item?.status === 'resolved'
                                  ? new Date(item?.updatedAt).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                  })
                                  : '-'}</td>
                              </tr>) : <p className='ms-3 pb-3'>No data found</p>}

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {myTotal > 1 && <div className="row">
                  <div className="col-lg-12">
                    <div className="d-flex justify-content-between adver-pagi-sec adver-pagi-desk-sec align-items-center">
                      {/* Previous Button */}
                      <div className="adver-prev">
                        <button
                          disabled={myCurrent === 1}
                          onClick={() => setMyCurrent(prev => Math.max(prev - 1, 1))}
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
                                  className={pageNum === myCurrent ? "active" : ""}
                                  onClick={() => setMyCurrent(pageNum)}
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
                          disabled={myCurrent === myTotal}
                          onClick={() => setMyCurrent(prev => Math.min(prev + 1, myTotal))}
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
          <div
            className="modal fade"
            id="disputeModal"
            tabIndex={-1}
            aria-labelledby="disputeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-md modal-dialog-centered">
              <div className="modal-content" style={styles.modalContent}>
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-bold" id="disputeModalLabel">
                    Open a Service Dispute
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"

                  />

                </div>
                <div className="modal-body">
                  {/* Addon Box */}
                  <div className="addon-box dash-profile-sec" style={styles.addonBox}>
                    <div>
                      {/* <small className="text-muted">Add On</small> */}
                      <div className="addon-title text-black" style={styles.addonTitle}>{disputeAddOn?.name}</div>
                    </div>
                    <div className="addon-price" style={styles.addonPrice}>
                      {disputeAddOn?.price} AED <small className="text-muted text-capitalize"> <sup className='fw-400'>/ {disputeAddOn?.type}</sup> </small>
                    </div>
                  </div>
                  <p className="fw-400 fz-16" style={{ fontSize: 14 }}>
                    Explain your problem and what you want to do to solve it. Wizbizla will help in the resolution of disputes between customer and service provider with the assistance of an independent lawyer, if applicable.
                    If you’re case is registered, the dissatisfied party pays a fee of AED 500.
                    <a href="#" style={{ color: "#4F40FF" }}> For more information on what is and isn't covered by our dispute resolution process, please click here.
                      Please click here</a>.
                  </p>
                  {/* Form */}
                  <form onSubmit={disputeSubmit}>
                    <div className="custom-frm-bx mb-3">
                      <label htmlFor="disputeAgainst" className="">
                        Dispute Against <span className='start-icon'>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="disputeAgainst"
                        required
                        name='against'
                        value={openDispute.against}
                        onChange={handleDisputeChange}
                      />
                      {isMatch && <div className="search-bar-box" id="search-bar">
                        <ul className="search-bar-box-list">
                          {matchProfile?.map((item, key) =>
                            <li key={key} className='pb-2'>
                              <button className='d-flex gap-2 align-items-center justify-content-between' onClick={() => handleSelectProfile(item)}>
                                <div className="ct-icon">
                                  <img style={{ width: '40px', height: '40px', borderRadius: '50%' }} src={item?.profileData?.profileImage ? `${base_url}/${item?.profileData?.profileImage}` : "/assets/images/car-01.svg"} alt="" />
                                </div>
                                <div>
                                  <p className='mb-0'>{item?.firstName} {item?.lastName}</p>
                                </div>
                              </button>
                            </li>)}
                        </ul>
                      </div>}
                    </div>
                    <div className="custom-frm-bx mb-3">
                      <label htmlFor="disputeType" className="">
                        Dispute Type <span className='start-icon'>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        required
                        name='type'
                        value={openDispute.type}
                        onChange={handleDisputeChange}
                      />
                      {/* <select className="form-select" id="disputeType" required name='type'
                        value={openDispute.type}
                        onChange={handleDisputeChange}>
                        <option selected="" disabled="">
                          Select Type
                        </option>
                        <option value="Service">Service</option>
                        <option value="Payment">Payment</option>
                        <option value="Other">Other</option>
                      </select> */}
                    </div>
                    <div className="custom-frm-bx mb-3">
                      <label htmlFor="subject" className="form-label">
                        Subject <span className='start-icon'>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        required
                        name='subject'
                        value={openDispute.subject}
                        onChange={handleDisputeChange}
                      />
                    </div>
                    <div className="mb-3 custom-frm-bx">
                      <label htmlFor="message" className="">
                        Message
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        rows={4}
                        name='message'
                        value={openDispute.message}
                        onChange={handleDisputeChange}
                      />
                    </div>
                    <div className="mb-3 custom-frm-bx">
                      <label className="">Upload File</label>
                      <div className="upload-box" style={styles.uploadBox}>
                        <input
                          type="file"
                          className="form-control d-none"
                          id="uploadFiles"
                          name='image'
                          onChange={handleDisputeChange}
                        />
                        <div htmlFor="uploadFiles" className="upload-icon mx-auto mb-2">
                          <img
                            src='/assets/images/upload.svg'
                            alt="Upload"
                          />
                        </div>
                        <label
                          htmlFor="uploadFiles"
                          className="text-black"
                          style={{ cursor: "pointer" }}
                        >
                          <span className='my-add-upload'>Click to upload</span> or drag and drop <br />
                          <small className="text-muted">
                            PDF, JPG, PNG, DOC (max. 10 MB)
                          </small>
                          {openDispute?.preview && <div className=" mt-3">
                            <img
                              src={openDispute?.preview}
                              alt="Preview"
                              className="img-thumbnail"
                              style={{ maxWidth: 100 }}
                            />
                          </div>}
                        </label>
                      </div>
                    </div>
                    <div className=" mt-4">
                      <button type="submit" style={styles.btnPrimary} className="thm-btn">
                        File a Complaint
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="customizeModal"
            tabIndex={-1}
            aria-labelledby="customizeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-md modal-dialog-centered">
              <div className="modal-content" style={styles.modalContent}>
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-bold" id="disputeModalLabel">
                    Request a Customized Due Diligence Service
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">

                  <p className="text-muted" style={{ fontSize: 14 }}>
                    Wizbizla will use this information to contact you via phone or email to discuss your inquiry and share their research on the service provider.
                  </p>
                  {/* Form */}
                  <form onSubmit={(e) => bespokeSubmit(e, 'customize-service')}>
                    <div className="mb-3 custom-frm-bx">
                      <label htmlFor="disputeAgainst" className="">
                        First name  <span className="start-icon">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="disputeAgainst"
                        required
                        name='firstName'
                        value={bespokeForm.firstName}
                        onChange={handleBespokeChange}
                      />
                    </div>
                    <div className="mb-3 custom-frm-bx">
                      <label htmlFor="disputeAgainst" className="">
                        Last name  <span className="start-icon">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="disputeAgainst"
                        required
                        name='lastName'
                        value={bespokeForm.lastName}
                        onChange={handleBespokeChange}
                      />
                    </div>
                    <div className="mb-3 custom-frm-bx">
                      <label htmlFor="disputeAgainst" className="">
                        Email  <span className="start-icon">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="disputeAgainst"
                        required
                        name='email'
                        value={bespokeForm.email}
                        onChange={handleBespokeChange}
                      />
                    </div>
                    <div className="mb-3 custom-frm-bx">
                      <label htmlFor="disputeAgainst" className="">
                        Contact number  <span className="start-icon">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="disputeAgainst"
                        required
                        name='contactNumber'
                        value={bespokeForm.contactNumber}
                        onChange={handleBespokeChange}
                      />
                    </div>
                    <div className="mb-3 custom-frm-bx">
                      <label htmlFor="disputeAgainst" className="">
                        Business Name, if applicable  <span className="start-icon">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="disputeAgainst"
                        required
                        name='businessName'
                        value={bespokeForm.businessName}
                        onChange={handleBespokeChange}
                      />
                    </div>
                    <div className="mb-3 custom-frm-bx">
                      <label htmlFor="disputeAgainst" className="">
                        Business Category  <span className="start-icon">*</span>
                      </label>
                      <select className="form-select" id="disputeType" required name='businessCategory'
                        value={bespokeForm.businessCategory}
                        onChange={handleBespokeChange}>
                        <option selected="" disabled="">
                          Select Type
                        </option>
                        {businessCategory?.length > 0 &&
                          businessCategory?.map((item, key) => <option value={item?._id} key={key}>{item?.name}</option>)}
                        <option value="Payment">Payment</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="mb-3 custom-frm-bx">
                      <label htmlFor="disputeAgainst" className="">
                        Location for service to take place  <span className="start-icon">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="disputeAgainst"
                        required
                        name='serviceLocation'
                        value={bespokeForm.serviceLocation}
                        onChange={handleBespokeChange}
                      />
                    </div>
                    <div className="mb-3 custom-frm-bx">
                      <label htmlFor="disputeAgainst" className="">
                        Service Activity  <span className="start-icon">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="disputeAgainst"
                        required
                        name='serviceActivity'
                        value={bespokeForm.serviceActivity}
                        onChange={handleBespokeChange}
                      />
                    </div>
                    <div className="mb-3 custom-frm-bx">
                      <label htmlFor="disputeAgainst" className="">
                        Service Providers’ Name, if applicable  <span className="start-icon">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="disputeAgainst"
                        required
                        name='preferenceToAvoid'
                        value={bespokeForm.preferenceToAvoid}
                        onChange={handleBespokeChange}
                      />
                    </div>
                    <div class="custom-frm-bx">
                      <p>This site is protected by <a href="javascript:void(0);" className='nw-achar-btn'>reCAPTCHA</a> and the <a href="javascript:void(0);" className='nw-achar-btn'>Google Privacy Policy</a> and <a href="javascript:void(0);" className='nw-achar-btn'>Terms of Service</a> apply.</p>
                    </div>
                    <div className="mt-4">
                      <button type="submit" style={styles.btnPrimary} className="thm-btn btn-lg">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="bespokeModal"
            tabIndex={-1}
            aria-labelledby="bespokeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-md modal-dialog-centered">
              <div className="modal-content" style={styles.modalContent}>
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-bold" id="disputeModalLabel">
                    Request a Bespoke Concierge Service
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">

                  <p className="text-muted" style={{ fontSize: 14 }}>
                    Wizbizla will use this information to contact you via phone or email to discuss your inquiry and share their research on the service provider.

                  </p>
                  {/* Form */}
                  <form onSubmit={(e) => bespokeSubmit(e, 'concierge-service')}>
                    <div className="custom-frm-bx mb-3">
                      <label htmlFor="disputeAgainst" className="">
                        First name  <span className="start-icon">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="disputeAgainst"
                        required
                        name='firstName'
                        value={bespokeForm.firstName}
                        onChange={handleBespokeChange}
                      />
                    </div>
                    <div className="mb-3 custom-frm-bx">
                      <label htmlFor="disputeAgainst" className="">
                        Last name  <span className="start-icon">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="disputeAgainst"
                        required
                        name='lastName'
                        value={bespokeForm.lastName}
                        onChange={handleBespokeChange}
                      />
                    </div>
                    <div className="mb-3 custom-frm-bx">
                      <label htmlFor="disputeAgainst" className="">
                        Email  <span className="start-icon">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="disputeAgainst"
                        required
                        name='email'
                        value={bespokeForm.email}
                        onChange={handleBespokeChange}
                      />
                    </div>
                    <div className="mb-3 custom-frm-bx">
                      <label htmlFor="disputeAgainst" className="">
                        Contact number  <span className="start-icon">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="disputeAgainst"
                        required
                        name='contactNumber'
                        value={bespokeForm.contactNumber}
                        onChange={handleBespokeChange}
                      />
                    </div>
                    <div className="mb-3 custom-frm-bx">
                      <label htmlFor="disputeAgainst" className="">
                        Business Name, if applicable  <span className="start-icon">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="disputeAgainst"
                        required
                        name='businessName'
                        value={bespokeForm.businessName}
                        onChange={handleBespokeChange}
                      />
                    </div>
                    <div className="mb-3 custom-frm-bx">
                      <label htmlFor="disputeAgainst" className="">
                        Location for service to take place  <span className="start-icon">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="disputeAgainst"
                        required
                        name='serviceLocation'
                        value={bespokeForm.serviceLocation}
                        onChange={handleBespokeChange}
                      />
                    </div>
                    <div className="mb-3 custom-frm-bx">
                      <label htmlFor="disputeAgainst" className="">
                        Business Category  <span className="start-icon">*</span>
                      </label>
                      <select className="form-select" id="disputeType" required name='businessCategory'
                        value={bespokeForm.businessCategory}
                        onChange={handleBespokeChange}>
                        <option selected="" disabled="">
                          Select Type
                        </option>
                        {businessCategory?.length > 0 &&
                          businessCategory?.map((item, key) => <option value={item?._id} key={key}>{item?.name}</option>)}

                      </select>
                    </div>
                    <div className="mb-3 custom-frm-bx">
                      <label htmlFor="disputeAgainst" className="">
                        Service Activity  <span className="start-icon">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="disputeAgainst"
                        required
                        name='serviceActivity'
                        value={bespokeForm.serviceActivity}
                        onChange={handleBespokeChange}
                      />
                    </div>
                    <div className="mb-3 custom-frm-bx">
                      <label htmlFor="disputeAgainst" className="">
                        Price Range  <span className="start-icon">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="disputeAgainst"
                        required
                        name='priceRange'
                        value={bespokeForm.priceRange}
                        onChange={handleBespokeChange}
                      />
                    </div>
                    <div className="mb-3 custom-frm-bx">
                      <label htmlFor="disputeAgainst" className="">
                        Date of when to administer the service  <span className="start-icon">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="disputeAgainst"
                        required
                        name='serviceDate'
                        value={bespokeForm.serviceDate}
                        onChange={handleBespokeChange}
                      />
                    </div>
                    <div className="mb-3 custom-frm-bx">
                      <label htmlFor="disputeAgainst" className="">
                        Any specific requirements  <span className="start-icon">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="disputeAgainst"
                        required
                        name='specificRequirement'
                        value={bespokeForm.specificRequirement}
                        onChange={handleBespokeChange}
                      />
                    </div>
                    <div className="mb-3 custom-frm-bx">
                      <label htmlFor="disputeAgainst" className="">
                        Any preference to Service Providers or any Service Providers to avoid  <span className="start-icon">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="disputeAgainst"
                        required
                        name='preferenceToAvoid'
                        value={bespokeForm.preferenceToAvoid}
                        onChange={handleBespokeChange}
                      />
                    </div>
                    <div class="custom-frm-bx">
                      <p className='fw-500 fz-16'>This site is protected by <a href="javascript:void(0);" className='nw-achar-btn'>reCAPTCHA</a> and the <a href="javascript:void(0);" className='nw-achar-btn'>Google Privacy Policy</a> and <a href="javascript:void(0);" className='nw-achar-btn'>Terms of Service</a> apply.</p>
                    </div>
                    <div className=" mt-4">
                      <button type="submit" style={styles.btnPrimary} className="thm-btn btn-lg">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </>

  )
}

export default MyAddon
const styles = {
  modalContent: {
    borderRadius: "12px",
    padding: "20px",
  },
  addonBox: {
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addonTitle: {
    fontWeight: 600,
    fontSize: "15px",
  },
  addonPrice: {
    fontWeight: "bold",
    color: "#4a4aff",
    fontSize: "20px",
  },
  btnPrimary: {
    backgroundColor: "#4a4aff",
    border: "none",
    borderRadius: "8px",
  },
  uploadBox: {
    border: "1px dashed #ccc",
    borderRadius: "8px",
    textAlign: "center",
    padding: "20px",
    cursor: "pointer",
  },
};