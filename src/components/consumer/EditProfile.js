import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getSecureApiData, securePostData } from '../../services/api';
import { servicesList } from '../../utils/staticData';
import { toast } from 'react-toastify';
import { Modal } from 'bootstrap';
import base_url from '../../baseUrl';
import { useDispatch } from 'react-redux';
import { fetchProfileData, fetchUserData } from '../../redux/features/userSlice';

function EditProfile() {
    const dispatch = useDispatch()
    const userId = localStorage.getItem('userId')
    const [profileData, setProfileData] = useState({})
    const [reason, setReason] = React.useState('')
    const [selectedType, setSelectedType] = useState(null);
    const [yesDelete, setYesDelete] = React.useState(false);
    const [profileImage, setProfileImage] = useState(null)
    const [searchParams] = useSearchParams();

    const [membershipData, setMembershipData] = useState({})
    const [profileForm, setProfileForm] = useState({ userId, firstName: '', lastName: '', company: '', email: '', dob: undefined, nationality: '', age: "", gender: "" })
    const [basketForm, setBasketForm] = useState({
        userId,
        address: "",
        area: "",
        emirate: "",
        phone: "",
        receiveGiftBox: false,
        expatStatus: ""
    })
    const [serviceForm, setServiceForm] = useState({ userId, intrestedServices: [], usedServices: '' })
    const [preferenceForm, setPreferenceForm] = useState({
        userId,
        passionateTopics: "",
        podcastSubjects: "",
        hobbies: "",
        favoriteActivities: "",
        infoPreference: "",
        desiredFeatures: "",
        expatChallenges: "",
        improvementSuggestions: ""
    })
    const [stayUpdated, setStayUpdated] = useState({
        userId, selectedService: false, promotions: false,
        offers: false,
    })
    const [businessData, setBusinessData] = useState({
        challenges: '',
        manageDisputes: '',
        supportNeeded1: '',
        marketingStrategy: '',
        supportNeeded2: '',
        vision: '',
        podcastTopics: ''
    });
    const navigate = useNavigate()
    useEffect(() => {
        if (userId) {
            getProfileData()
            getBasketData()
            getServiceData()
            getReferenceData()
            getStayUpdateData()
        }
    }, [userId])

    async function getProfileData() {
        try {
            const result = await getSecureApiData(`api/consumer/profile/${userId}`)
            if (result.status) {
                if (result.data.company) {
                    setSelectedType('company')
                } else {
                    setSelectedType('individual')
                }
                setProfileImage(result.data.profileImage || null)
                setProfileForm(result.data)
            }
        } catch (error) {

        }
    }
    async function getBasketData() {
        try {
            const result = await getSecureApiData(`api/consumer/basket/${userId}`)
            if (result.status && result.data !== null) {
                setBasketForm(result.data)
            }
        } catch (error) {

        }
    }
    async function getServiceData() {
        try {
            const result = await getSecureApiData(`api/consumer/service/${userId}`)
            if (result.status && result.data !== null) {
                setServiceForm(result.data)
            }
        } catch (error) {

        }
    }
    async function getReferenceData() {
        try {
            const result = await getSecureApiData(`api/consumer/preference/${userId}`)
            if (result.status && result.data !== null) {
                setPreferenceForm(result.data)
            }
        } catch (error) {

        }
    }
    async function getStayUpdateData() {
        try {
            const result = await getSecureApiData(`api/consumer/stayUpdated/${userId}`)
            if (result.status && result.data !== null) {
                setStayUpdated(result.data)
            }
        } catch (error) {

        }
    }
    const profileChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfileForm((prevForm) => ({
            ...prevForm,
            [name]: type === "checkbox" ? checked : value
        }));
    };
    const basketChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBasketForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };
    const stayUpdatedChange = (e) => {
        const { name, value, type, checked } = e.target;
        setStayUpdated((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };
    const preferenceChange = (e) => {
        const { name, value } = e.target;
        setPreferenceForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const businessPreferenceChange = (e) => {
        const { name, value } = e.target;
        setBusinessData((prev) => ({
            ...prev,
            [name]: value
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
    const profileSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await securePostData('api/consumer/profile', profileForm)
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
            data.append('image', file);

            try {
                const result = await securePostData('api/consumer/profile-image', data);
                if (result.status) {
                    dispatch(fetchProfileData())
                    getProfileData();
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

    const basketSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await securePostData('api/consumer/basket', basketForm)
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
            const result = await securePostData('api/consumer/service', serviceForm)
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
            const result = await securePostData('api/consumer/preference', preferenceForm)
            if (result.status) {

                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const stayUpdatedSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await securePostData('api/consumer/stayUpdated', stayUpdated)
            if (result.status) {
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            const response = await securePostData('api/users/delete-user', { userId, reason })
            if (response.success) {
                const modalElement = document.getElementById('finalModal');
                const modal = new Modal(modalElement);
                modal.show();
                setTimeout(() => {
                    localStorage.clear()
                    sessionStorage.clear()
                    navigate('/')
                }, 3000);
            }
        } catch (error) {

        }
    }
    const openSecondModal = () => {
        setYesDelete(true);

        setTimeout(() => {
            const modal = new Modal(document.getElementById('midModal'));
            modal.show();
        }, 100);

    };
    const closeSecondModal = () => {
        setYesDelete(false);

        const modalElement = document.getElementById("midModal");
        if (modalElement) {
            const modal = Modal.getInstance(modalElement)
                || new Modal(modalElement);
            modal.hide();
        }

    };




    return (
        <div className="main-section posting-histry-sec flex-grow-1">
            <div className="row dash-profile-overflow  pt-4 mx-lg-2 mx-sm-0">
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
                            <h3>Personal Information</h3>
                            <ul>
                                <li className="divider" />
                            </ul>
                        </div>
                        <div className="posting-history-crd-box">
                            <p>
                                <span>*Required</span>&nbsp;Please enter your full, correct
                                information you wish to be used for your account
                            </p>
                            <form onSubmit={profileSubmit} className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="custom-frm-bx">
                                        <label htmlFor="">
                                            First Name <span className="start-icon">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Wizbizla"
                                            name='firstName'
                                            value={profileForm.firstName}
                                            onChange={profileChange}
                                            required
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
                                            name='lastName'
                                            value={profileForm.lastName}
                                            onChange={profileChange}
                                            required
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
                                            name='email'
                                            value={profileForm.email}
                                            onChange={profileChange}
                                            required
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
                                                    name="gender"
                                                    value="male"
                                                    checked={profileForm.gender == 'male'}
                                                    onChange={profileChange}
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
                                                    name="gender"
                                                    value="female"
                                                    checked={profileForm.gender == 'female'}
                                                    onChange={profileChange}
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
                                    <div className="custom-frm-bx option-size">
                                        <label htmlFor="">
                                            Date of Birth <span className="start-icon">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="dob"
                                            value={profileForm.dob ? profileForm.dob.split("T")[0] : ""}
                                            onChange={profileChange}
                                            max={new Date().toISOString().split("T")[0]}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="custom-frm-bx option-size">
                                        <label htmlFor="">
                                            Age Range <span className="start-icon">*</span>{" "}
                                        </label>
                                        <select name="age"
                                            value={profileForm.age}
                                            onChange={profileChange} id="" className="form-select" required>
                                            <option value="">Select Age Range</option>
                                            <option value="under-18">Under 18</option>
                                            <option value="18-24">18 - 24</option>
                                            <option value="25-34">25 - 34</option>
                                            <option value="35-44">35 - 44</option>
                                            <option value="45-54">45 - 54</option>
                                            <option value="55-64">55 - 64</option>
                                            <option value="65-74">65 - 74</option>
                                            <option value="75-plus">75 and above</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="custom-frm-bx option-size">
                                        <label htmlFor="">
                                            Nationality <span className="start-icon">*</span>{" "}
                                        </label>
                                        <select name="nationality"
                                            value={profileForm.nationality}
                                            onChange={profileChange} id="" className="form-select" required>
                                            <option value="">Select Nationality</option>
                                            <option value="American">American</option>
                                            <option value="British">British</option>
                                            <option value="Canadian">Canadian</option>
                                            <option value="Australian">Australian</option>
                                            <option value="Indian">Indian</option>
                                            <option value="Chinese">Chinese</option>
                                            <option value="Japanese">Japanese</option>
                                            <option value="German">German</option>
                                            <option value="French">French</option>
                                            <option value="Brazilian">Brazilian</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="individual-frm-btn">
                                    <button type="submit" className="btn btn-primary">
                                        Save Details
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row dash-profile-overflow mt-4">
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
                                    src={profileImage ? `${base_url}/${profileImage}` : "/assets/images/indiv-profile-photo.jpg"}
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
                                <div className="customer-right-angel" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row dash-profile-overflow mt-4">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="main-profile-sec dash-profile-sec individual-frm-box">
                        <div className="main-profile-sec">
                            <h3>Welcome Basket!</h3>
                            <ul>
                                <li className="divider" />
                            </ul>
                        </div>
                        <div className="posting-history-crd-box">
                            <h5 className="fs-6 mb-0">Friendly Reminder: </h5>
                            <p>
                                A welcome basket will be sent to the UAE address associated with
                                your account. Each account is eligible for one basket. To qualify,
                                simply connect with a service provider on the platform!
                            </p>
                            <form onSubmit={basketSubmit} className="row mt-2">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="custom-frm-bx">
                                        <label htmlFor="">
                                            Address <span className="start-icon">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter address"
                                            name="address"
                                            value={basketForm.address}
                                            onChange={basketChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="custom-frm-bx option-size">
                                        <label htmlFor="">
                                            Area/Location<span className="start-icon">*</span>
                                        </label>
                                        <select name="area"
                                            value={basketForm.area}
                                            onChange={basketChange} id="" className="form-select" required>
                                            <option value="">Select Area</option>
                                            <option value="Downtown">Downtown</option>
                                            <option value="Marina">Marina</option>
                                            <option value="Jumeirah">Jumeirah</option>
                                            <option value="Business Bay">Business Bay</option>
                                            <option value="Deira">Deira</option>
                                            <option value="Al Barsha">Al Barsha</option>
                                            <option value="Mirdif">Mirdif</option>
                                            <option value="Jebel Ali">Jebel Ali</option>
                                            <option value="Dubai Silicon Oasis">Dubai Silicon Oasis</option>
                                            <option value="Palm Jumeirah">Palm Jumeirah</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="custom-frm-bx option-size">
                                        <label htmlFor="">
                                            Emirate<span className="start-icon">*</span>
                                        </label>
                                        <select name="emirate"
                                            value={basketForm.emirate}
                                            onChange={basketChange} id="" className="form-select" required>
                                            <option value="">Select Emirate</option>
                                            <option value="Abu Dhabi">Abu Dhabi</option>
                                            <option value="Dubai">Dubai</option>
                                            <option value="Sharjah">Sharjah</option>
                                            <option value="Ajman">Ajman</option>
                                            <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                                            <option value="Fujairah">Fujairah</option>
                                            <option value="Umm Al Quwain">Umm Al Quwain</option>
                                            <option value="Al Ain">Al Ain</option>
                                            <option value="Khor Fakkan">Khor Fakkan</option>
                                            <option value="Dibba Al Fujairah">Dibba Al Fujairah</option>

                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="custom-frm-bx">
                                        <label htmlFor="">
                                            Office Phone number <span className="start-icon">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="055070"
                                            name="phone"
                                            value={basketForm.phone}
                                            onChange={basketChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="custom-frm-bx">
                                        <label htmlFor="">
                                            Choose Your Expat Status in the UAE{" "}
                                            <span className="start-icon">*</span>
                                        </label>
                                        <div className="">
                                            <div className="form-check custom-radio-purple">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="expatStatus"
                                                    value="I am a Seasoned Expat"
                                                    onChange={basketChange}
                                                    checked={basketForm.expatStatus === "I am a Seasoned Expat"}
                                                    id="radioDefault-expert"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="radioDefault-expert"
                                                >
                                                    I am a Seasoned Expat
                                                </label>
                                            </div>
                                            <div className="form-check custom-radio-purple">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="expatStatus"
                                                    value="I am a New Expat (under 6 months)"
                                                    onChange={basketChange}
                                                    checked={basketForm.expatStatus === "I am a New Expat (under 6 months)"}
                                                    id="radioDefault-new-ex"
                                                    defaultChecked=""
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="radioDefault-new-ex"
                                                >
                                                    I am a New Expat (under 6 months)
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="individual-frm-btn">
                                    <button type="submit" className="btn btn-primary">
                                        Save Details
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row dash-profile-overflow mt-4">
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
                                    <button type="submit" className="btn btn-primary">
                                        Save Details
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row dash-profile-overflow mt-4">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="main-profile-sec dash-profile-sec individual-frm-box">
                        <div className="main-profile-sec">
                            <h3>Personal Preferences</h3>
                            <ul>
                                <li className="divider" />
                            </ul>
                        </div>
                        <div className="posting-history-crd-box">
                            <p>
                                At Wizbizla, we’re committed to enhancing your experience as an
                                Service Provider in the UAE. Your insights are invaluable in helping
                                us tailor our platform to better meet your needs and ensure you get
                                the most out of your membership.
                            </p>
                            <form onSubmit={preferenceSubmit} className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="custom-frm-bx">
                                        <label htmlFor="">
                                            What topics are you most passionate about in the UAE?
                                        </label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Separate services with a comma."
                                            id="floatingTextarea2"
                                            style={{ height: 120 }}
                                            name='passionateTopics'
                                            value={preferenceForm.passionateTopics}
                                            onChange={preferenceChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="custom-frm-bx">
                                        <label htmlFor="">
                                            Which podcast subjects do you enjoy listening to the most?
                                        </label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Separate services with a comma."
                                            id="floatingTextarea2"
                                            style={{ height: 120 }}
                                            name='podcastSubjects'
                                            value={preferenceForm.podcastSubjects}
                                            onChange={preferenceChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="custom-frm-bx">
                                        <label htmlFor="">
                                            What hobbies do you pursue in your free time?
                                        </label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Separate services with a comma."
                                            id="floatingTextarea2"
                                            style={{ height: 120 }}
                                            name='hobbies'
                                            value={preferenceForm.hobbies}
                                            onChange={preferenceChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="custom-frm-bx">
                                        <label htmlFor="">
                                            What are your favorite activities as an expat?
                                        </label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Separate services with a comma."
                                            id="floatingTextarea2"
                                            style={{ height: 120 }}
                                            name='favoriteActivities'
                                            value={preferenceForm.favoriteActivities}
                                            onChange={preferenceChange}
                                        />
                                    </div>
                                </div>
                                <div className="individual-frm-btn">
                                    <button type="submit" className="btn btn-primary">
                                        Save Details
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row dash-profile-overflow mt-4">
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
                                        <label htmlFor="">
                                            How do you prefer to receive information (e.g., email, social
                                            media, newsletters)?
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter answer"
                                            name='infoPreference'
                                            value={preferenceForm.infoPreference}
                                            onChange={preferenceChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="custom-frm-bx">
                                        <label htmlFor="">
                                            What features would you like to see on the Wizbizla platform?
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter answer"
                                            name='desiredFeatures'
                                            value={preferenceForm.desiredFeatures}
                                            onChange={preferenceChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="custom-frm-bx">
                                        <label htmlFor="">
                                            What challenges do you face as an expat in the UAE?
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter answer"
                                            name='expatChallenges'
                                            value={preferenceForm.expatChallenges}
                                            onChange={preferenceChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="custom-frm-bx">
                                        <label htmlFor="">
                                            How can we improve your experience as a member?
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter answer"
                                            name='improvementSuggestions'
                                            value={preferenceForm.improvementSuggestions}
                                            onChange={preferenceChange}
                                        />
                                    </div>
                                </div>
                                <div className="individual-frm-btn">
                                    <button type="submit"
                                        className="btn btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#deleteModal"
                                    >
                                        Save Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row dash-profile-overflow mt-4">
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
                                We’d love to keep you informed about promotions, discounts, and
                                special offers on our services.
                            </p>
                            <form onSubmit={stayUpdatedSubmit} className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="custom-frm-bx custom-frm-bx-small">
                                        <div className="form-check check-fm-box-bordr">
                                            <input
                                                className="form-check-input frm-chck-inpt"
                                                type="checkbox"
                                                name='selectedService'
                                                checked={stayUpdated.selectedService}
                                                onChange={stayUpdatedChange}
                                                id="checkDefaultprofile-12"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="checkDefaultprofile-12"
                                            >
                                                Updates on my selected services
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
                                                name='promotions'
                                                id="checkDefaultprofile-13"
                                                checked={stayUpdated.promotions}
                                                onChange={stayUpdatedChange}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="checkDefaultprofile-13"
                                            >
                                                Promotions and discounts
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
                                                name='offers'
                                                checked={stayUpdated.offers}
                                                onChange={stayUpdatedChange}
                                                id="checkDefaultprofile-14"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="checkDefaultprofile-14"
                                            >
                                                Special Offers
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <p>
                                    By subscribing, you'll also receive our newsletter with valuable
                                    tips and insights for expats in the UAE! Your personal information
                                    will be processed and stored in accordance with{" "}
                                    <span>
                                        <Link
                                            to="/privacy-policy"
                                            target='_blank'
                                            className="posting-histry-indi-span"
                                        >
                                            Wizbizla’s privacy policy
                                        </Link>
                                    </span>
                                </p>
                                <div className="individual-frm-btn d-flex justify-content-between">
                                    <button type="submit"
                                        className="btn btn-primary delete-my-acc-btn"
                                    >
                                        Save Details
                                    </button>
                                    <a style={{ background: '#D92D20', border: 'none' }} className="btn btn-primary setting-btn delete-my-acc-btn" data-bs-toggle="modal" data-bs-target="#deleteModal" >Delete Account</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Personal Information Modal Popup */}
            <div>
                
                <div className="delete-model-section modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content p-4">
                            <div className="text-start">
                                Do you want to delete your account?
                            </div>

                            <div className="d-flex gap-2 mt-3">
                                <button onClick={openSecondModal} data-bs-dismiss="modal" className="btn deleteBtn">Submit</button>

                                <a herf="javascript:void(0)" data-bs-dismiss="modal" id="submitBtn" className="btn  deleteBtn delete-not-Btn">No</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="midModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="false">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header align-items-baseline">
                                <h5 className="modal-title">
                                    Are you sure you want to delete your account?
                                </h5>
                                <a
                                    href="#"
                                    className="mdal-clse-btn"
                                    data-bs-dismiss="modal"
                                >
                                    <i className="fa-solid fa-xmark" />
                                </a>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <div className="custom-frm-bx">
                                        <div className="d-flex flex-column gap-1">
                                            <div className="form-check custom-radio-purple model-chck-bx">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    checked={yesDelete}
                                                    onChange={() => setYesDelete(true)}
                                                    name="radioDefault"
                                                    id="yesOption"
                                                />
                                                <label className="form-check-label" htmlFor="yesOption">
                                                    Yes, Delete
                                                </label>
                                            </div>
                                            <div className="form-check custom-radio-purple model-chck-no-bx">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    checked={!yesDelete}
                                                    onChange={closeSecondModal}
                                                    name="radioDefault"
                                                    id="noOption"
                                                />
                                                <label className="form-check-label" htmlFor="noOption">
                                                    No, Cancel
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {yesDelete &&
                                    <form onSubmit={handleDelete} id="textareaBox" className="mb-3 ">
                                        <label htmlFor="extraDetails" className="form-label">
                                            We are sorry to see a valued customer leave our platform. If you
                                            have a moment, please let us know why you deactivated your
                                            account:
                                        </label>
                                        <textarea
                                            id="extraDetails"
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                            className="form-control"
                                            rows={3}
                                            placeholder="Message"
                                            defaultValue={""}
                                        />
                                        <div className="modal-footer mt-2">
                                            <button
                                                type='submit'
                                                data-bs-dismiss="modal"
                                                id="submitBtn"
                                                className="btn btn-success submitBtn"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="finalModal" tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content modal-content-secnd">
                            <div className="modal-body text-center p-0">
                                <div className="modal-header align-items-baseline p-0">
                                    <h5 className="modal-title">
                                        Your account has been deactivated.
                                    </h5>
                                    <a
                                        href="javascript:void(0)"
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
                    </div>
                </div>
            </div>

        </div>


    )
}

export default EditProfile
