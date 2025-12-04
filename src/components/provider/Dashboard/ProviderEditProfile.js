import React, { useEffect, useState } from 'react'
import { getSecureApiData, securePostData } from '../../../services/api';
import { toast } from 'react-toastify';
import { servicesList } from '../../../utils/staticData';
import { prefetchDNS } from 'react-dom';
import base_url from '../../../baseUrl';
import { fetchProfileData } from '../../../redux/features/userSlice';
import { useDispatch } from 'react-redux';

function ProviderEditProfile() {
  const dispatch=useDispatch();
  const userId = localStorage.getItem('userId');
  const [profileData, setProfileData] = useState({})
  const [serviceForm, setServiceForm] = useState({ userId, intrestedServices: [], usedServices: '' })
  const [stayUpdated, setStayUpdated] = useState({
    userId, selectedService: false, promotions: false,
    offers: false,
  })
  const [formData, setFormData] = useState({
    userId,
    keyChallenges: "",
    supportNeededArea1: "",
    supportNeededArea2: "",
    visionForFuture: "",
    disputeManagement: "",
    marketingStrategy: "",
    businessPodcastTopics: "",
    improveExperience: "",
    preferredCommunication: "",
    platformFeatures: "",
  });

  async function getUserProfile() {
    try {
      const result = await getSecureApiData(`api/provider/profile-get/${userId}`)
      if (result.status) {
        setProfileData(result.data)
      } else {
      }
    } catch (error) {
      toast.error(error)
    }
  }
  async function getStayUpdateData() {
    try {
      const result = await getSecureApiData(`api/provider/stayUpdated/${userId}`)
      if (result.status && result.data !== null) {
        setStayUpdated(result.data)
      }
    } catch (error) {

    }
  }
  useEffect(() => {
    getStayUpdateData();
    getServiceData()
    getUserProfile()
    getPreferenceData()
  }, [])
  const stayUpdatedChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStayUpdated((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  async function getServiceData() {
    try {
      const result = await getSecureApiData(`api/provider/service/${userId}`)
      if (result.status && result.data !== null) {
        setServiceForm(result.data)
      }
    } catch (error) {

    }
  }
  async function getPreferenceData() {
    try {
      const result = await getSecureApiData(`api/provider/preference/${userId}`)
      if (result.status && result.data !== null) {
        setFormData(result.data)
      }
    } catch (error) {

    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setServiceForm((prevForm) => {
      let updatedServices = [...prevForm.intrestedServices];

      if (checked) {
        updatedServices.push(value);
      } else {
        updatedServices = updatedServices.filter((item) => item !== value);
      }

      return { ...prevForm, intrestedServices: updatedServices };
    });
  };
  const stayUpdatedSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await securePostData('api/provider/stayUpdated', stayUpdated)
      if (result.status) {
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const serviceSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await securePostData('api/provider/service', serviceForm)
      if (result.status) {

        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const preferenceSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await securePostData('api/provider/preference', formData)
      if (result.status) {

        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const imageSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;

    // Check image dimensions before uploading
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = async () => {
      const width = img.width;
      const height = img.height;
      URL.revokeObjectURL(objectUrl);

      if (width > 500 || height > 500) {
        toast.error('Image dimensions must not exceed 500x500 pixels.');
        return;
      }

      const data = new FormData();
      data.append('userId', userId);
      data.append('profileImage', file);

      try {
        const result = await securePostData('api/provider/profile-image', data);
        if (result.status) {
          dispatch(fetchProfileData())
          getUserProfile();
          toast.success('Profile image updated successfully!');
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    img.onerror = () => {
      toast.error('Invalid image file.');
      URL.revokeObjectURL(objectUrl);
    };

    img.src = objectUrl;
  };
  return (
    <>

      <div className="main-section posting-histry-sec flex-grow-1">
        <div className="row dash-profile-overflow pt-4  mx-lg-2 mx-sm-0">
          {/* <div className="mt-2">
        <a href="javascript:void(0)">
          <i className="fa-solid fa-angle-left" />
          Back
        </a>
      </div> */}
          <h2 className="my-3">My Profile</h2>
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="main-profile-sec dash-profile-sec individual-frm-box">
              <div className="main-profile-sec">
                <h3>Individual Profile</h3>
                <ul>
                  <li className="divider" />
                </ul>
              </div>
              <div className="posting-history-crd-box">
                <p>
                  <span>*Required</span>&nbsp;Please enter your full, correct
                  information you wish to be used for your account
                </p>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label htmlFor="">
                        First Name <span className="start-icon">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Wizbizla"
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label htmlFor="">
                        Last Name <span className="start-icon">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Admin"
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label htmlFor="">
                        Email <span className="start-icon">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="hello@wizbizla.com"
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label htmlFor="">
                        Gender <span className="start-icon">*</span>
                      </label>
                      <div className="d-flex gap-3">
                        <div className="form-check custom-radio-purple">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radioDefault"
                            id="radioDefaultmale"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="radioDefaultmale"
                          >
                            Male
                          </label>
                        </div>
                        <div className="form-check custom-radio-purple">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radioDefault"
                            id="radioDefaultfemale"
                            defaultChecked=""
                          />
                          <label
                            className="form-check-label"
                            htmlFor="radioDefaultfemale"
                          >
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="custom-frm-bx option-size">
                          <label htmlFor="">
                            Date of Birth (Day){" "}
                            <span className="start-icon">*</span>
                          </label>
                          <select name="" id="" className="form-select">
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4</option>
                            <option value="">5</option>
                            <option value="">6</option>
                            <option value="">7</option>
                            <option value="">8</option>
                            <option value="">9</option>
                            <option value="">10</option>
                            <option value="">11</option>
                            <option value="" selected="">
                              12
                            </option>
                            <option value="">13</option>
                            <option value="">14</option>
                            <option value="">15</option>
                            <option value="">16</option>
                            <option value="">17</option>
                            <option value="">18</option>
                            <option value="">19</option>
                            <option value="">20</option>
                            <option value="">21</option>
                            <option value="">22</option>
                            <option value="">23</option>
                            <option value="">24</option>
                            <option value="">25</option>
                            <option value="">26</option>
                            <option value="">27</option>
                            <option value="">28</option>
                            <option value="">29</option>
                            <option value="">30</option>
                            <option value="">31</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="custom-frm-bx option-size">
                          <label htmlFor="">
                            Date of Birth (Month){" "}
                            <span className="start-icon">*</span>
                          </label>
                          <select name="" id="" className="form-select">
                            <option value="">Jan</option>
                            <option value="">Feb</option>
                            <option value="">March</option>
                            <option value="">April</option>
                            <option value="">May</option>
                            <option value="" selected="">
                              June
                            </option>
                            <option value="">July</option>
                            <option value="">Aug</option>
                            <option value="">Sep</option>
                            <option value="">Oct</option>
                            <option value="">Nov</option>
                            <option value="">Dec</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx option-size">
                      <label htmlFor="">
                        Age Range <span className="start-icon">*</span>{" "}
                      </label>
                      <select name="" id="" className="form-select">
                        <option value="">31 - 40</option>
                        <option value="">41 - 60</option>
                        <option value="">61 - 80</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx option-size">
                      <label htmlFor="">
                        Nationality <span className="start-icon">*</span>{" "}
                      </label>
                      <select name="" id="" className="form-select">
                        <option value="">Select</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx option-size">
                      <label htmlFor="">
                        Visa Status <span className="start-icon">*</span>{" "}
                      </label>
                      <select name="" id="" className="form-select">
                        <option value="">Business</option>
                      </select>
                    </div>
                  </div>
                  <div className="individual-frm-btn">
                    <a href="javascript:void(0)" className="thm-btn">
                      Save Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="main-profile-sec dash-profile-sec">
              <div className="posting-hostry-main-sec">
                <div className="posting-hostry-title-header-box">
                  <h3 className="mb-0">Your Photo</h3>
                </div>
                <ul>
                  <li className="divider" />
                </ul>
              </div>
              <div className="posting-history-crd-box">
                <div className="text-center position-relative d-inline-block indi-frm-picture-chng">
                  <img
                    id="profilePreview"
                    src={profileData?.profileImage ? `${base_url}/${profileData?.profileImage}` : "/assets/images/avatar.png"}
                    alt="Profile"
                    className="rounded-circle profile-img shadow-sm border border-light"
                  />
                  <input type="file" id="profileInput" accept="image/*" hidden onChange={(e) => imageSubmit(e)} />
                  <label
                    htmlFor="profileInput"
                    className="edit-icon-btn position-absolute"
                  >
                    <i className="fas fa-pen" />
                  </label>
                  <h5 className="mt-2 mb-0"> Size (500px x 500px)</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="main-profile-sec dash-profile-sec individual-frm-box">
              <div className="main-profile-sec">
                <h3>Business Profile</h3>
                <ul>
                  <li className="divider" />
                </ul>
              </div>
              <div className="posting-history-crd-box">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label htmlFor="">
                        Company Name <span className="start-icon">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter company name"
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label htmlFor="">
                        Email address <span className="start-icon">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email address"
                        defaultValue=""
                      />
                      <p>You will use your email address to login in the future.</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label htmlFor="">
                        Website <span className="start-icon">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Website URL"
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="custom-frm-bx option-size">
                          <label htmlFor="">
                            Contact No <span className="start-icon">*</span>
                          </label>
                          <select name="" id="" className="form-select">
                            <option value="">1</option>
                            <option value="">2</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="custom-frm-bx">
                          <label htmlFor="">
                            Office Phone number{" "}
                            <span className="start-icon">*</span>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder={'05507964835'}
                            defaultValue=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label htmlFor="">
                        UAE Office Address <span className="start-icon">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter UAE office address"
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx option-size">
                      <label htmlFor="">
                        Emirate <span className="start-icon">*</span>
                      </label>
                      <select name="" id="" className="form-select">
                        <option value="">Select</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label htmlFor="">
                        Postcode <span className="start-icon">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter postcode"
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="individual-frm-btn">
                    <a href="javascript:void(0)" className="thm-btn">
                      Save Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="main-profile-sec dash-profile-sec individual-frm-box">
              <div className="main-profile-sec">
                <h3>Services and Resources</h3>
                <ul>
                  <li className="divider" />
                </ul>
              </div>
              <div className="posting-history-crd-box">
                <p>
                  To better serve you, we’d like to know which Wizbizla services you
                  find most valuable:
                </p>
                <form onSubmit={serviceSubmit} className="row">
                  {servicesList?.map((item, key) =>
                    <div className="col-lg-6 col-md-6 col-sm-12" key={key}>
                      <div className="custom-frm-bx custom-frm-bx-small">
                        <div className="form-check check-fm-box-bordr">
                          <input
                            className="form-check-input frm-chck-inpt"
                            type="checkbox"
                            id={`checkDefaultprofile-${key}`}
                            value={item}
                            checked={serviceForm?.intrestedServices?.includes(item)}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`checkDefaultprofile-${key}`}
                          >
                            {item}
                          </label>
                        </div>
                      </div>
                    </div>)}
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="custom-frm-bx">
                      <label for="">What are the top 10 services you would use this website for? <span
                        className="start-icon">*</span></label>
                      <input type="text" className="form-control" placeholder="Lawyer, Accountant" value={serviceForm.usedServices}
                        onChange={(e) => setServiceForm({ ...serviceForm, usedServices: e.target.value })} />
                    </div>
                  </div>

                  <div className="individual-frm-btn">
                    <button type="submit" className="thm-btn">
                      Save Details
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="main-profile-sec dash-profile-sec individual-frm-box">
              <div className="main-profile-sec">
                <h3>Business Preferences</h3>
                <ul>
                  <li className="divider" />
                </ul>
              </div>
              <div className="posting-history-crd-box">
                <p>
                  At Wizbizla, we’re committed to enhancing your experience as an
                  Service Provider in the UAE. Your insights are invaluable in
                  helping us tailor our platform to better meet your needs and
                  ensure you get the most out of your membership.
                </p>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label>
                        Please share any key challenges your business faces in the UAE market
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="For example, challenges like competition, regulatory requirements, customer behavior, or operational difficulties."
                        style={{ height: 120 }}
                        name="keyChallenges"
                        value={formData.keyChallenges}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label>
                        How do you currently manage disputes or conflicts that may arise in your business?
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="Formal mediation, open communication, written policies, customer feedback, negotiation, escalation protocols, and conflict resolution training"
                        style={{ height: 120 }}
                        name="disputeManagement"
                        value={formData.disputeManagement}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label>
                        What type of support do you currently feel you need in these areas?
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="Enter answer"
                        style={{ height: 120 }}
                        name="supportNeededArea1"
                        value={formData.supportNeededArea1}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label>
                        What does your marketing strategy and available resources entail?
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="This includes your social media presence and engagement, SEO initiatives, lead generation, ROI on advertisements, and the time invested in content creation."
                        style={{ height: 120 }}
                        name="marketingStrategy"
                        value={formData.marketingStrategy}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label>What is your vision for the future of your business?</label>
                      <textarea
                        className="form-control"
                        placeholder="Enter answer"
                        style={{ height: 120 }}
                        name="visionForFuture"
                        value={formData.visionForFuture}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label>Which business podcast topics do you find most engaging?</label>
                      <textarea
                        className="form-control"
                        placeholder="Separate subjects with a comma."
                        style={{ height: 120 }}
                        name="businessPodcastTopics"
                        value={formData.businessPodcastTopics}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="individual-frm-btn">
                    <button className="thm-btn" onClick={preferenceSubmit}>
                      Save Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="main-profile-sec dash-profile-sec individual-frm-box">
              <div className="main-profile-sec">
                <h3>Follow-Up Questions</h3>
                <ul>
                  <li className="divider" />
                </ul>
              </div>
              <div className="posting-history-crd-box">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label>How can we improve your experience as a Business?</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter answer"
                        name="improveExperience"
                        value={formData.improveExperience}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label>What features would you like to see on the Wizbizla platform?</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter answer"
                        name="platformFeatures"
                        value={formData.platformFeatures}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label>How do you prefer to receive information (e.g., email, social media, newsletters)?</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter answer"
                        name="preferredCommunication"
                        value={formData.preferredCommunication}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="individual-frm-btn">
                    <button className="thm-btn" onClick={preferenceSubmit}>
                      Save Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="main-profile-sec dash-profile-sec individual-frm-box">
              <div className="main-profile-sec">
                <h3>I would like to receive emails from Wizbizla regarding</h3>
                <ul>
                  <li className="divider" />
                </ul>
              </div>
              <div className="posting-history-crd-box">
                <p>
                  To better serve you, we’d like to know which Wizbizla services you
                  find most valuable:
                </p>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx custom-frm-bx-small">
                      <div className="form-check check-fm-box-bordr">
                        <input
                          className="form-check-input frm-chck-inpt"
                          type="checkbox"
                          name='serviceProvider'
                          checked={stayUpdated.serviceProvider}
                          onChange={stayUpdatedChange}
                          id="checkDefaultprofile-10"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="checkDefaultprofile-10"
                        >
                          Vetted Trusted Service Providers
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx custom-frm-bx-small">
                      <div className="form-check check-fm-box-bordr">
                        <input
                          className="form-check-input frm-chck-inpt"
                          type="checkbox"
                          name='disputeResolution'
                          checked={stayUpdated.disputeResolution}
                          onChange={stayUpdatedChange}
                          id="checkDefaultprofile-9"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="checkDefaultprofile-9"
                        >
                          Dispute Resolution
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx custom-frm-bx-small">
                      <div className="form-check check-fm-box-bordr">
                        <input
                          className="form-check-input frm-chck-inpt"
                          type="checkbox"
                          name='verifiedReferences'
                          checked={stayUpdated.verifiedReferences}
                          onChange={stayUpdatedChange}
                          id="checkDefaultprofile-8"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="checkDefaultprofile-8"
                        >
                          Independently Verified References
                        </label>
                      </div>
                    </div>
                  </div>
                  <p>
                    By subscribing, you'll also receive our newsletter with valuable
                    tips and insights for Service Providers in the UAE!. Your
                    personal information will be processed and stored in accordance
                    with{" "}
                    <span>
                      <a
                        href="javascript:void(0)"
                        className="posting-histry-indi-span"
                      >
                        Wizbizla’s privacy policy
                      </a>
                    </span>
                  </p>
                  <div className="individual-frm-btn">
                    <button onClick={stayUpdatedSubmit} className="thm-btn">
                      Save Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div class="row dash-profile-overflow mt-4">
          <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="main-profile-sec dash-profile-sec">
                  <div class="posting-hostry-main-sec">
                      <div class="posting-hostry-title-header-box">
                          <h3 class="mb-0">Scam Tracker</h3>
                          <a href="" class="btn btn-primary report-btn">Report a Scam Form</a>
                      </div>

                      <ul>
                          <li class="divider"></li>
                      </ul>
                  </div>
                  <div class="posting-history-crd-box">
                      <p>The write up is approved by the Wizbizla team to ensure that it complies with the legal
                          guidelines and laws of the UAE. Wizbizla posts the story on the Scam Tracker and a copy
                          of it goes into the dashboard in this tab. Once written they cannot edit it - they can
                          only delete the story.</p>
                  </div>
              </div>
          </div>
      </div> */}
      </div>

    </>
  )
}

export default ProviderEditProfile
