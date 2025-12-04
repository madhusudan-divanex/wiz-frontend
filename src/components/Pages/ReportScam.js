import React, { useState } from 'react'
import { postApiData } from '../../services/api';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ReportScam() {
  const { profileData } = useSelector(state => state.user)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dateReported: "",
    format: "Online",
    scamType: "",
    serviceCategory: "",
    amountOfLost: "",
    name: "",
    reportToAuthoritise: false,
    reportedToWhom: "",
    image: null,
    preview: null
  });
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0]; // take the first file
      setFormData((prev) => ({
        ...prev,
        [name]: file,
        preview: file ? URL.createObjectURL(file) : null, // generate preview URL
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  // handle button group selections (format & reportToAuthoritise)
  const handleSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
     for (let key in formData) {
    if (key === "preview") continue; // skip preview field

    // Check if field is empty (including null/undefined)
    if (
      formData[key] === "" ||
      formData[key] === null ||
      formData[key] === undefined
    ) {
        const fieldName = key.charAt(0).toUpperCase() + key.slice(1);
      toast.error(`${fieldName} cannot be empty`);
      return; // stop the function
    }
  }
    const data = new FormData()
    if (localStorage.getItem('userId')) {
      data.append('userId', localStorage.getItem('userId'))
    }
    for (let key in formData) {
      if (key === "preview") continue;
      if (key === "image" && formData[key]) {
        data.append(key, formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    }
    try {
      const result = await postApiData('api/users/report-scam', data)
      if (result.success) {
        toast.success('Reported Successfully!')
        setFormData({
          title: "",
          description: "",
          dateReported: "",
          format: "Online",
          scamType: "",
          serviceCategory: "",
          amountOfLost: "",
          name: "",
          reportToAuthoritise: false,
          reportedToWhom: "",
        })
        if (profileData?.status == 'live' || profileData?.status == 'cdraft') {

          navigate(-1)
        }
      } else {
        toast.error('Please contact to support team')
      }
    } catch (error) {

    }
  };

  return (
    <div className='newBnr'>
      <section
        className="scamtip-bnnr scam-alert-bnnr"
        style={{
          backgroundImage: "url(assets/images/scam-images/scam-tracker-bnnr.png)"
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <img src="assets/images/scam-images/w-scamtip-icon.png" alt="" />
              <h1>Report a Scam</h1>
              <p className="text-white ">
                Stay Alert and Keep Fraudsters Away. Wizbizla is proud to introduce
                the Scam Tracker, a vital programme designed to educate, safeguard,
                and empower expatriates in the UAE against the rising tide of fraud
                and scams.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="scam-report-sec tp-space category-relations">
        <div className="container">
          <Link to="/scam-tracker" className="back-btn">
            <i class="fa-solid fa-chevron-left me-2"></i>
            Back to search
          </Link>
          <h4 className="innr-title">Scam Report Form</h4>
          <div className="row ">
            <div className="col-lg-8 order-2 order-lg-1">
              <div className="scam-report-form">
                <form onSubmit={handleSubmit}>
                  <div className="custom-frm-bx">
                    <label>Title of the Scam Report</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="Enter Title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="custom-frm-bx">
                    <label>Description</label>
                    <textarea
                      name="description"
                      className="form-control"
                      placeholder="Describe what happened"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="custom-frm-bx">
                    <label>Date Reported to Wizbizla</label>
                    <input
                      type="date"
                      name="dateReported"
                      className="form-control"
                      value={formData.dateReported}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="custom-frm-bx">
                    <label>Format</label>
                    <div className="custom-frm-bx-buttons">
                      {["Online", "At a shop", "At home", "At work"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleSelect("format", option)}
                          className={
                            formData.format === option
                              ? "selected"
                              : ""
                          }
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="custom-frm-bx">
                    <label>Scam Type</label>
                    <select
                      name="scamType"
                      className="form-select"
                      value={formData.scamType}
                      onChange={handleChange}
                    >
                      <option value="">Select one</option>
                      <option value="Phishing">Phishing</option>
                      <option value="Investment Fraud">Investment Fraud</option>
                      <option value="Online Shopping Scam">Online Shopping Scam</option>
                      <option value="Job Scam">Job Scam</option>
                    </select>
                  </div>

                  <div className="custom-frm-bx">
                    <label>Service Category</label>
                    <select
                      name="serviceCategory"
                      className="form-select"
                      value={formData.serviceCategory}
                      onChange={handleChange}
                    >
                      <option value="">Select one</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Banking">Banking</option>
                      <option value="Telecom">Telecom</option>
                      <option value="Social Media">Social Media</option>
                    </select>
                  </div>

                  <div className="custom-frm-bx">
                    <label>Amount of Money Lost</label>
                    <input
                      type="number"
                      name="amountOfLost"
                      className="form-control"
                      placeholder="Enter amount of lost"
                      value={formData.amountOfLost}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="custom-frm-bx">
                    <label>Name or Anonymous</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter your name or 'Member'"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="custom-frm-bx">
                    <label>Reported to Authorities</label>
                    <div className="custom-frm-bx-buttons">

                      <button
                        type="button"
                        onClick={() => handleSelect("reportToAuthoritise", true)}
                        className={
                          formData.reportToAuthoritise
                            ? "selected w-50"
                            : "w-50"
                        }
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelect("reportToAuthoritise", false)}
                        className={
                          !formData.reportToAuthoritise
                            ? "selected w-50"
                            : "w-50"
                        }
                      >
                        No
                      </button>
                    </div>
                  </div>

                  <div className="custom-frm-bx">
                    <label>Reported to Whom</label>
                    <input
                      type="text"
                      name="reportedToWhom"
                      className="form-control"
                      placeholder="Enter details if applicable"
                      value={formData.reportedToWhom}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="custom-frm-bx  border-black">
                    <label>Image</label>
                    <div className='custom-frm-bx text-center' style={{ border: '1px dashed black', borderRadius: '15px' }}>
                      <label htmlFor="scamImage" style={{ width: "100%" }}>
                        <div className="upload-box p-4 text-center" id="uploadArea3">
                          <div className="upload-icon mx-auto mb-2">
                            <img
                              src='/assets/images/business-file-upload.png'
                              alt="Upload"
                            />
                          </div>
                          <p className="fw-semibold mb-1">
                            <label
                              htmlFor="scamImage"
                              className="text-primary file-label"
                              style={{ cursor: "pointer" }}
                            >
                              Click to upload
                            </label>{" "}
                          </p>
                          <small className="text-muted">
                            <small class="text-muted"> PNG, JPG </small>
                          </small>

                          {/* {menuFileName && (
                                    <div className="mt-2 text-muted">
                                        <i className="fas fa-file-video me-1"></i> {menuFileName}
                                    </div>
                                )} */}
                          {formData?.preview && <div className=" mt-3">
                            <img
                              src={formData?.preview}
                              alt="Preview"
                              className="img-thumbnail"
                              style={{ maxWidth: 100 }}
                            />
                          </div>}
                        </div>
                      </label>
                    </div>
                    <input
                      type="file"
                      id="scamImage"
                      name="image"
                      className="form-control d-none"
                      onChange={handleChange}
                      accept="image/*"
                    />

                  </div>

                  <div className="custom-frm-bx text-end mb-0">
                    <button className="thm-lg-btn grn-btn" type="submit">
                      Submit
                    </button>
                  </div>
                </form>

              </div>
            </div>
            <div className="col-lg-4 order-1 order-lg-2">
              <div className="instruction-cards">
                <h4>
                  <span className="fal fa-info-circle" /> Instructions
                </h4>
                <ul className="instruction-list">
                  <li>
                    <span>Title of the Scam Report:</span>Provide a concise title
                    for the scam.{" "}
                  </li>
                  <li>
                    <span>Description:</span>Describe what happened to you in
                    detail.{" "}
                  </li>
                  <li>
                    <span>Date Reported:</span>Enter today's date.{" "}
                  </li>
                  <li>
                    <span>Format:</span>Indicate where the scam took place (online,
                    at a shop, at home, at work).{" "}
                  </li>
                  <li>
                    <span>Scam Type:</span>Select the type of scam (e.g., Online
                    Purchase, Employment Scam).{" "}
                  </li>
                  <li>
                    <span>Service Category:</span>Select one of the 20 categories.{" "}
                  </li>
                  <li>
                    <span>Service Sub-Category:</span>Choose from the sub-categories
                    available in our network.{" "}
                  </li>
                  <li>
                    <span>Amount of Money Lost:</span>State the amountOfLost of money lost
                    in the scam.{" "}
                  </li>
                  <li>
                    <span>Name or Anonymous:</span>You may leave your name or use
                    'Member' to remain anonymous.
                  </li>
                  <li>
                    <span>Reported to Authorities:</span>Indicate if you reported
                    the scam to the appropriate authorities (Yes or No).
                  </li>
                  <li>
                    <span>Reported to Whom:</span>If reported, provide details of
                    whom it was reported to.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  )
}

export default ReportScam
