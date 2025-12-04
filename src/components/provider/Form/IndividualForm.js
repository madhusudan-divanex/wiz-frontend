import React, { useEffect, useState } from 'react';
import images from '../../../assets/images'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Select } from 'antd';
import { getSecureApiData, securePostData } from '../../../services/api';
import base_url from '../../../baseUrl';
import { categoryData } from '../../../utils/GlobalFunction';
const typeImg = images.fileTypeBackground;
const uploadImg = images.businessFileUpload;

const closeImg = images.closeImg


const IndividualForm = ({ active, profileData }) => {
    const [videoFile, setVideoFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const maxLength = 275;
    const userId = localStorage.getItem('userId')
    const [catData, setCatData] = useState([])
    const token = localStorage.getItem('token')
    const [values, setValues] = useState({
        name: '',
        title: '',
        company: '',
        location: '',
        avatar: "",
        idealClientProfile: "",
        categories: [{ category: "", services: [] }],
        bannerImage: null,
        profileImage: null,
        videoIntro: null,
        keepDefaultBanner: false,
        keepDefaultProfile: false,
        keepDefaultVideo: false,
    })

    const getTotalSelectedServices = () => {
        return values.categories.reduce((total, cat) => total + (cat.services?.length || 0), 0);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Strict character limit enforcement
        if ((name === 'avatar' || name === 'idealClientProfile') && value.length > maxLength) {
            toast.dismiss();
            toast.error(`Maximum ${maxLength} characters allowed.`);
            return;
        }

        setValues({ ...values, [name]: value });
    };

    const handleBannerImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ["image/jpeg", "image/png", "image/webp"];
            if (!validTypes.includes(file.type)) {
                toast.error("Only JPEG, PNG, or WEBP images are allowed.");
                return;
            }

            setValues(prev => ({
                ...prev,
                bannerImage: file,
            }));

            const reader = new FileReader();
            reader.onload = () => {
                const img = document.querySelector("#filePreview1 img");
                if (img) {
                    img.src = reader.result;
                    document.getElementById("filePreview1").classList.remove("d-none");
                }
            };
            reader.readAsDataURL(file);
        }
    };


    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ["image/jpeg", "image/png", "image/webp"];
            if (!validTypes.includes(file.type)) {
                toast.error("Only JPEG, PNG, or WEBP images are allowed.");
                return;
            }

            setValues(prev => ({
                ...prev,
                profileImage: file,
            }));

            const reader = new FileReader();
            reader.onload = () => {
                const img = document.querySelector("#filePreview2 img");
                if (img) {
                    img.src = reader.result;
                    document.getElementById("filePreview2").classList.remove("d-none");
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const addCategoryService = () => {
        if (values.categories.length >= 3) {
            toast.warning("You can add up to 3 categories.");
            return;
        }
        setValues(prev => ({
            ...prev,
            categories: [...prev.categories, { category: '', services: [] }]
        }));
    };

    const removeCategoryService = (index) => {
        const updated = values.categories.filter((_, i) => i !== index);
        setValues(prev => ({
            ...prev,
            categories: updated
        }));
    };

    const handleCategoryChange = (index, field, value) => {
        const updated = values.categories.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setValues(prev => ({
            ...prev,
            categories: updated
        }));
    };
    const handleServiceChange = (index, selectedServices) => {
        // calculate total services already selected (excluding current category)
        const otherServicesCount = values.categories.reduce(
            (sum, cat, i) => sum + (i !== index ? cat.services.length : 0),
            0
        );

        // if selection exceeds 6 globally, stop
        if (otherServicesCount + selectedServices.length > 6) {
            toast.error("You can select a maximum of 6 services across all categories.");
            return;
        }

        const updated = values.categories.map((item, i) =>
            i === index ? { ...item, services: selectedServices } : item
        );

        setValues(prev => ({ ...prev, categories: updated }));
    };


    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setValues(prev => ({ ...prev, [name]: checked }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // --- VALIDATION START ---
        if (!values.name.trim()) {
            toast.error("Name is required ");
            return;
        }
        if (!values.title.trim()) {
            toast.error("Title is required ");
            return;
        }
        if (!values.company.trim()) {
            toast.error("Company/Organization is required");
            return;
        }
        if (!values.location) {
            toast.error("Please select a location");
            return;
        }
        if (!values.avatar.trim()) {
            toast.error("Avatar description is required");
            return;
        }
        if (!values.idealClientProfile.trim()) {
            toast.error("Ideal Client Profile is required ");
            return;
        }
        if (!values.bannerImage && !values.keepDefaultBanner) {
            toast.error("Please upload a banner image or select 'Keep default'.");
            return;
        }

        // Profile image validation
        if (!values.profileImage && !values.keepDefaultProfile) {
            toast.error("Please upload a profile image or select 'Keep default'.");
            return;
        }

        // Validate categories
        for (let i = 0; i < values.categories.length; i++) {
            const cat = values.categories[i];
            if (!cat.category) {
                toast.error(`Category ${i + 1} is required`);
                return;
            }
            if (!cat.services || cat.services.length === 0) {
                toast.error(`Please select at least one service in category ${i + 1}`);
                return;
            }
            if (getTotalSelectedServices() > 6) {
                toast.error("You can select maximum 6 services in total.");
                return;
            }

        }
        // --- VALIDATION END ---
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('title', values.title);
            formData.append('company', values.company);
            formData.append('location', values.location);
            formData.append('avatar', values.avatar);
            formData.append('idealClientProfile', values.idealClientProfile);
            formData.append('isDefaultBanner', values.keepDefaultBanner)

            formData.append('bannerImage', values.bannerImage);
            formData.append('profileImage', values.profileImage);
            formData.append('videoIntro', videoFile);

            formData.append('type', 'individual');
            formData.append('userId', userId);
            formData.append('categories', JSON.stringify(values.categories));

            const response = await securePostData('api/provider/create-profile', formData);
            if (response.status) {

                toast.success("Profile submitted successfully!");
                document.getElementById('step2-tab').click();
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
            }
        } catch (error) {
            console.error("Error submitting profile:", error);
            toast.error(error.response.data.message || "Failed to submit profile.");
        } finally {
            setLoading(false);
        }
    };

    const categoryServices = {
        "Automobiles": [
            { label: 'Prestige Car sourcing', value: 'Prestige Car sourcing' },
            { label: 'Repairs & Detailing', value: 'Repairs & Detailing' },
            { label: 'Used Car Retail', value: 'Used Car Retail' },
            { label: 'Vehicle Finance', value: 'Vehicle Finance' },
            { label: 'Vehicle Insurance', value: 'Vehicle Insurance' },
            { label: 'Vehicle Paint Protection', value: 'Vehicle Paint Protection' },
            { label: 'Vehicle Purchasing', value: 'Vehicle Purchasing' },
            { label: 'Vehicle Sales', value: 'Vehicle Sales' },
            { label: 'Vehicle Service Repair', value: 'Vehicle Service Repair' },
            { label: 'Driver for Hire', value: 'Driver for Hire' },
            { label: 'Vehicle Rental', value: 'Vehicle Rental' },
        ],
        "Business Support": [
            { label: 'Business Consulting', value: 'Business Consulting' },
            { label: 'Business Planning', value: 'Business Planning' },
            { label: 'Company Set up', value: 'Company Set up' },
            { label: 'Corporate Training', value: 'Corporate Training' },
            { label: 'Marketing Research & Analysis', value: 'Marketing Research & Analysis' },
        ],
        "Charities & Support": [
            { label: 'Financial Support', value: 'Financial Support' },
            { label: 'Humanitarian', value: 'Humanitarian' },
            { label: 'Special Needs', value: 'Special Needs' },
            { label: 'Youth Education', value: 'Youth Education' },
        ],
        "Coaching": [
            { label: 'Adolescents', value: 'Adolescents' },
            { label: 'Book Writing', value: 'Book Writing' },
            { label: 'Career Exploration', value: 'Career Exploration' },
            { label: 'CV Writing', value: 'CV Writing' },
            { label: 'Lawyer Coaching', value: 'Lawyer Coaching' },
            { label: 'Leadership', value: 'Leadership' },
            { label: 'Life', value: 'Life' },
            { label: 'Makeovers', value: 'Makeovers' },
            { label: 'Matchmaking', value: 'Matchmaking' },
            { label: 'Menopause', value: 'Menopause' },
            { label: 'Mentoring', value: 'Mentoring' },
            { label: 'Neuroscience & Behaviourial Assessment', value: 'Neuroscience & Behaviourial Assessment' },
            { label: 'Nutrition', value: 'Nutrition' },
            { label: 'Personal Styling', value: 'Personal Styling' },
            { label: 'Sleep', value: 'Sleep' },
            { label: 'Golf Performance', value: 'Golf Performance' },
            { label: 'Business', value: 'Business' },
            { label: 'English Language', value: 'English Language' },
            { label: '1-1 LinkedIn', value: '1-1 LinkedIn' },
            { label: 'Personal Development', value: 'Personal Development' },
        ],
        "Design & Art": [
            { label: 'Interior Design', value: 'Interior Design' },
            { label: 'Tailoring', value: 'Tailoring' },
        ],
        "Education & Tutoring": [
            { label: 'Film Education & Training', value: 'Film Education & Training' },
            { label: 'Languages', value: 'Languages' },
            { label: 'Brain Development', value: 'Brain Development' },
        ],
        "Events & Entertainment": [
            { label: 'Interior Design', value: 'Interior Design' },
        ],
        "Facilities Management": [
            { label: 'Carpentry', value: 'Carpentry' },
            { label: 'Electrical', value: 'Electrical' },
            { label: 'Painting', value: 'Painting' },
            { label: 'Plumbing', value: 'Plumbing' },
            { label: 'Pool Maintenance', value: 'Pool Maintenance' },
            { label: 'Tile', value: 'Tile' },
            { label: 'Wrapping', value: 'Wrapping' },
        ],
        "Financial": [
            { label: 'Corporate Management', value: 'Corporate Management' },
            { label: 'Estate Planning', value: 'Estate Planning' },
            { label: 'Family Legacy', value: 'Family Legacy' },
            { label: 'Financial Planning', value: 'Financial Planning' },
            { label: 'Investment Management', value: 'Investment Management' },
            { label: 'Pension Review', value: 'Pension Review' },
            { label: 'Portfolio Review', value: 'Portfolio Review' },
            { label: 'Relocation Planning', value: 'Relocation Planning' },
            { label: 'Retirement Planning', value: 'Retirement Planning' },
            { label: 'Tax Planning', value: 'Tax Planning' },
            { label: 'Wealth Management', value: 'Wealth Management' },
            { label: 'Foreign Exchange (FX) Services', value: 'Foreign Exchange (FX) Services' },
            { label: 'Corporate Structuring', value: 'Corporate Structuring' },
        ],
        "Health & Wellness": [
            { label: 'Resilience & Wellbeing', value: 'Resilience & Wellbeing' },
            { label: 'Therapy', value: 'Therapy' },
            { label: 'Stress Relief', value: 'Stress Relief' },
            { label: 'Healthy Aging', value: 'Healthy Aging' },
            { label: 'PFAS-free water', value: 'PFAS-free water' },
        ],
        "Hospitality": [
            { label: 'Bakeries', value: 'Bakeries' },
            { label: 'Brazilian', value: 'Brazilian' },
            { label: 'Café', value: 'Café' },
            { label: 'Family', value: 'Family' },
            { label: 'Multi-cuisine', value: 'Multi-cuisine' },
            { label: 'Restaurant', value: 'Restaurant' },
            { label: 'Shisha', value: 'Shisha' },
            { label: 'Takeaway', value: 'Takeaway' },
            { label: 'Beverage Suppliers', value: 'Beverage Suppliers' },
        ],
        "Law": [
            { label: 'Company Restructuring', value: 'Company Restructuring' },
            { label: 'Compensation & Insurance Litigation', value: 'Compensation & Insurance Litigation' },
            { label: 'Construction Litigation', value: 'Construction Litigation' },
            { label: 'Employment', value: 'Employment' },
            { label: 'Inheritance & Wills', value: 'Inheritance & Wills' },
            { label: 'Intellectual Property Rights (IPR)', value: 'Intellectual Property Rights (IPR)' },
            { label: 'Labour Disputes', value: 'Labour Disputes' },
            { label: 'Legal Translation', value: 'Legal Translation' },
            { label: 'Litigation & Arbitration', value: 'Litigation & Arbitration' },
            { label: 'Medical Malpractice', value: 'Medical Malpractice' },
            { label: 'Personal & Family Law', value: 'Personal & Family Law' },
            { label: 'Practice Support', value: 'Practice Support' },
            { label: 'Property & Real Estate', value: 'Property & Real Estate' },
            { label: 'Public Prosecution', value: 'Public Prosecution' },
            { label: 'Transaction & Businesses', value: 'Transaction & Businesses' },
        ],
        "Logistics & Distribution": [
            { label: 'Domestic Moving', value: 'Domestic Moving' },
            { label: 'International Courier', value: 'International Courier' },
            { label: 'International Moving', value: 'International Moving' },
            { label: 'Pet Relocation', value: 'Pet Relocation' },
            { label: 'Shipping - Freight Forwarder', value: 'Shipping - Freight Forwarder' },
            { label: 'Storage', value: 'Storage' },
        ],
        "Marketing & Advertising": [
            { label: 'App Design', value: 'App Design' },
            { label: 'Digital Marketing', value: 'Digital Marketing' },
            { label: 'Google Ads (PPC)', value: 'Google Ads (PPC)' },
            { label: 'Influencer Marketing', value: 'Influencer Marketing' },
            { label: 'SEO', value: 'SEO' },
            { label: 'Social Media Management', value: 'Social Media Management' },
            { label: 'Web Design', value: 'Web Design' },
            { label: 'Website Maintenance', value: 'Website Maintenance' },
            { label: 'Meta Ads', value: 'Meta Ads' },
            { label: 'Tactical Marketing', value: 'Tactical Marketing' },
            { label: 'Website Development', value: 'Website Development' },
        ],
        "Media": [
            { label: 'Commercial Videography', value: 'Commercial Videography' },
            { label: 'Content Creation', value: 'Content Creation' },
            { label: 'Corporate Videos', value: 'Corporate Videos' },
            { label: 'Equipment', value: 'Equipment' },
            { label: 'Journalism', value: 'Journalism' },
            { label: 'Media Consulting', value: 'Media Consulting' },
            { label: 'Photography', value: 'Photography' },
            { label: 'Podcast Services', value: 'Podcast Services' },
            { label: 'PR', value: 'PR' },
            { label: 'Public Speaking', value: 'Public Speaking' },
            { label: 'TV Shows', value: 'TV Shows' },
        ],
        "Medical & Healthcare": [
            { label: 'IVF', value: 'IVF' },
            { label: 'Medical Licensing', value: 'Medical Licensing' },
            { label: 'Medical Training', value: 'Medical Training' },
            { label: 'Recruitment', value: 'Recruitment' },
            { label: 'Reproductive Healthcare', value: 'Reproductive Healthcare' },
        ],
        "Pets": [
            { label: 'Accessories', value: 'Accessories' },
            { label: 'Boarding', value: 'Boarding' },
            { label: 'Daycare', value: 'Daycare' },
            { label: 'Health & Nutrition', value: 'Health & Nutrition' },
            { label: 'Outdoor Dog Park', value: 'Outdoor Dog Park' },
            { label: 'Pet Exercise', value: 'Pet Exercise' },
            { label: 'Pet Sitting', value: 'Pet Sitting' },
        ],
        "Real Estate": [
            { label: 'Area Specialist - Downtown', value: 'Area Specialist - Downtown' },
            { label: 'Buying', value: 'Buying' },
            { label: 'Emaar Specialist', value: 'Emaar Specialist' },
            { label: 'Hotel Apartments', value: 'Hotel Apartments' },
            { label: 'Property Management', value: 'Property Management' },
            { label: 'Selling', value: 'Selling' },
            { label: 'Short Term Corporate', value: 'Short Term Corporate' },
            { label: 'Short Term Leisure', value: 'Short Term Leisure' },
            { label: 'Property Surveyors', value: 'Property Surveyors' },
            { label: 'Renovation Oversight', value: 'Renovation Oversight' },
            { label: 'MEP Surveyors', value: 'MEP Surveyors' },
            { label: 'FX Property Transactions', value: 'FX Property Transactions' },
        ],
        "Sports & Fitness": [
            { label: '1-1 Personal Training', value: '1-1 Personal Training' },
            { label: 'Online Personal Training', value: 'Online Personal Training' },
            { label: 'Golf Improvement Programs', value: 'Golf Improvement Programs' },
        ],
        "Tourism": [
            { label: 'Corporate Travel', value: 'Corporate Travel' },
            { label: 'Cruises', value: 'Cruises' },
            { label: 'Hotels', value: 'Hotels' },
            { label: 'Leisure Travels', value: 'Leisure Travels' },
            { label: 'Local Excursions', value: 'Local Excursions' },
            { label: 'Luxury Holidays', value: 'Luxury Holidays' },
            { label: 'Maldives Specialist', value: 'Maldives Specialist' },
            { label: 'Travel & Air Tickets', value: 'Travel & Air Tickets' },
            { label: 'Visa Arrangement', value: 'Visa Arrangement' },
            { label: 'Weddings', value: 'Weddings' },
        ],
    };
    async function setUserProfile() {
        const data = profileData
        const formattedCategories = data.categories?.map((item) => ({
            category: item.category?._id,
            services: item.service?.map(s =>s?._id) || []
        })) || [{ category: "", services: [] }];
        setValues({
            name: data?.name,
            title: data?.title,
            company: data?.company,
            location: data?.location,
            avatar: data?.avatar,
            idealClientProfile: data?.idealClientProfile,
            categories: formattedCategories,
            bannerImage: data?.bannerImage && base_url + '/' + data?.bannerImage,
            profileImage: data?.profileImage && base_url + '/' + data?.profileImage,
            videoIntro: data?.videoIntro && base_url + '/' + data?.videoIntro,
            keepDefaultBanner: data?.isDefaultBanner,
            keepDefaultProfile: data?.profileImage ? true : false,
            keepDefaultVideo: data?.videoIntro ? true : false,
        })

    }
    useEffect(() => {
        if (profileData && Object.keys(profileData).length > 0) {
            setUserProfile();
        }
    }, [profileData]);
    async function setDataInCategory() {
        const data = await categoryData()
        setCatData(data)
    }
    useEffect(() => {
        setDataInCategory()
    }, [token])


    return (
        <div id="individualForm" className={`${active} ? 'd-block' : 'd-none'`}>
            <h5 className="mb-2 fw-semibold py-2">Individual: Enter Your Details</h5>
            <p>Let's begin by building your professional profile with the essential company  <br /> details to ensure a strong foundation for your listing.</p>
            <form onSubmit={handleSubmit}>
                <div className="row mt-5 individual-form">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="custom-frm-bx">
                            <label htmlFor="Name">Name <span className="start-icon">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter name"
                                name='name'
                                value={values.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="custom-frm-bx">
                            <label htmlFor="">
                                Title <span className="start-icon">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                name='title'
                                value={values.title}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="custom-frm-bx">
                            <label htmlFor="">
                                Company / Organization <span className="start-icon">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter the name you'd like displayed on your profile"
                                name='company'
                                value={values.company}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="custom-frm-bx">
                            <label htmlFor="">
                                Head Office Location <span className="start-icon">*</span>
                            </label>
                            <select name='location' value={values.location}
                                onChange={handleChange} className='form-select' style={{ color: "grey" }}>
                                <option value="">Select Emirate</option>
                                <option value="Abu Dhabi">Abu Dhabi</option>
                                <option value="Ajman"> Ajman</option>
                                <option value="Dubai"> Dubai</option>
                                <option value="Fujairah">Fujairah </option>
                                <option value="Khaimah">  Ras Al-Khaimah</option>
                                <option value="Sharjah"> Sharjah</option>
                                <option value=" Umm Al Quwain">  Umm Al Quwain</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row your-avatar business-border-bottom py-4">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="custom-frm-bx">
                            <h5>Avatar</h5>
                            <p>
                                Enter short description of who you are <br /> and what you
                                do and who do you help.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="custom-frm-bx">
                            <div className="form-floating">
                                <textarea
                                    className="form-control"
                                    id="message"
                                    rows={4}
                                    placeholder=""
                                    name='avatar'
                                    value={values.avatar}
                                    onChange={handleChange}

                                />
                                <span className="pt-2">   {maxLength - values.avatar.length} characters left</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row your-avatar mt-5 business-border-bottom">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="custom-frm-bx">
                            <h5>Ideal Client Profile</h5>
                            <p>
                                Helps you identify the type of audience <br /> you want to
                                reach out to.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="custom-frm-bx">
                            <div className="form-floating">
                                <textarea
                                    className="form-control"
                                    id="message"
                                    rows={4}
                                    placeholder=""
                                    name='idealClientProfile'
                                    value={values.idealClientProfile}
                                    onChange={handleChange}

                                />
                                <span>{maxLength - values.idealClientProfile.length} characters left</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row file-upload-box business-border-bottom py-4">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="custom-frm-bx">
                            <h5 className="mb-2">Banner Image <span className='upload-size-title'>(1650px x 500px)</span> </h5>
                            {/* <span>Connect with the right expats through your profile. (Size 1650px x 500px)</span> */}
                            <div className="form-check mt-2 form-check-first ">
                                <input
                                    className="form-check-input form-chk-input position-relative custom-checkbox ms-0"
                                    type="checkbox"
                                    id="checkDefaultone"
                                    name="keepDefaultBanner"
                                    checked={values.keepDefaultBanner}
                                    onChange={handleCheckboxChange}
                                />
                                <label
                                    className="form-check-label ms-1"
                                    htmlFor="checkDefaultone"
                                >
                                    Use default banner image
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="custom-frm-bx">
                            <label htmlFor="fileInput1" style={{ width: "100%" }}>
                                <div
                                    className="upload-box p-4 text-center"
                                    id="uploadArea1"
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="upload-icon mx-auto mb-2">
                                        <img src={uploadImg} alt="Upload" />
                                    </div>
                                    <div className="d-flex justify-content-center gap-2">
                                        <div>
                                            <p className="fw-semibold mb-1 text-primary">
                                                <label htmlFor="fileInput1" className="text-primary file-label me-1" style={{ cursor: "pointer" }}>
                                                    Click to upload </label>
                                                or drag and drop
                                            </p>
                                            <small className="text-muted">
                                                SVG, PNG, JPG or GIF (max. 10MB)
                                            </small>
                                        </div>
                                        <div className="d-flex justify-content-end position-relative">
                                            {/* {/* <span className='file-ext-blue text-uppercase'>{typeof values?.bannerImage === 'object'
                                                ? values?.bannerImage?.name?.split('.').pop()
                                                : values?.bannerImage?.split('.').pop()
                                            }</span> */} 
                                            <img
                                                src="/assets/images/file-types.png"
                                                alt=""
                                                style={{ width: 40, height: 40 }}
                                            />
                                        </div>
                                    </div>
                                    <div id="filePreview1" className="d-none mt-3">
                                        <img
                                            src=""
                                            alt="Preview"
                                            className="img-thumbnail"
                                            style={{ maxWidth: 100, maxHeight: 100 }}
                                        />
                                    </div>
                                </div>
                            </label>
                            <input
                                type="file"
                                className="d-none"
                                id="fileInput1"
                                onChange={handleBannerImageChange}
                                accept=".png,.jpg,.jpeg,.gif,.svg"
                                multiple
                                // disabled={!values.keepDefaultBanner}
                            />
                        </div>
                    </div>
                </div>
                <div className="row file-upload-box mt-5 business-border-bottom py-4">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="custom-frm-bx">
                            <h5 className="mb-2">Profile Image <span className='upload-size-title'>(500px x 500px)</span> </h5>
                            {/* <span>Size 500px x 500px</span> */}
                            <div className="form-check mt-2 form-check-first">
                                <input
                                    className="form-check-input form-chk-input position-relative custom-checkbox ms-0"
                                    type="checkbox"
                                    id="checkDefaulttwo"
                                    name="keepDefaultProfile"
                                    checked={values.keepDefaultProfile}
                                    onChange={handleCheckboxChange}
                                />
                                <label
                                    className="form-check-label ms-1"
                                    htmlFor="checkDefaulttwo"
                                >
                                    Use default profile image
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                        <div className="custom-frm-bx">
                            <label htmlFor="fileInput2" style={{ width: "100%" }}>
                                <div className="upload-box p-4 text-center" id="uploadArea2">
                                    <div className="upload-icon mx-auto mb-2">
                                        <img
                                            src={uploadImg}
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
                                            {/* {/* <span className='file-ext-blue text-uppercase'>{typeof values?.profileImage === 'object'
                                                ? values?.profileImage?.name?.split('.').pop()
                                                : values?.profileImage?.split('.').pop()
                                            }</span> */}
                                            <img
                                                src="/assets/images/file-types.png"
                                                alt=""
                                                style={{ width: 40, height: 40 }}
                                            />
                                        </div>
                                    </div>

                                    <div id="filePreview2" className="d-none mt-3">
                                        <img
                                            src=""
                                            alt="Preview"
                                            className="img-thumbnail"
                                            style={{ maxWidth: 100 }}
                                        />
                                    </div>
                                </div>
                            </label>
                            <input
                                type="file"
                                className="d-none"
                                id="fileInput2"
                                onChange={handleProfileImageChange}
                                accept=".png,.jpg,.jpeg,.gif,.svg"
                                // disabled={!values.keepDefaultProfile}
                            />
                        </div>
                    </div>
                </div>

                <div className="row busines-frm-categries-sec pt-4">
                    <h4>Categories & Services</h4>
                    <p>Select up to 3 categories and add up to 6 services.</p>

                    {values?.categories?.map((cat, index) => (
                        <div className="row mb-3" key={index}>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <label></label>
                                <select
                                    className="form-select"
                                    value={cat.category}
                                    style={{ height: "45px", fontWeight: 500, color: "grey" }}
                                    onChange={(e) =>
                                        handleCategoryChange(index, 'category', e.target.value)
                                    }

                                >
                                    <option value="">Select category </option>
                                    {catData?.length > 0 && catData?.map((item, key) =>
                                        <option value={item?._id} key={key}>{item?.name} </option>)}
                                </select>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 mt-4 select-optn-fmr">
                                <label></label>
                                <Select
                                    style={{ color: "grey" }}
                                    mode="multiple"
                                    allowClear
                                    className="w-100 custom-select text-grey"
                                    placeholder="Select services"
                                    value={cat?.subCat || cat?.services}
                                    onChange={(selected) => handleServiceChange(index, selected)}
                                    options={
                                        cat?.category
                                            ? (catData?.find(item => item._id === cat.category)?.subCat || [])
                                                .slice() // create a copy to avoid mutating original
                                                .sort((a, b) => a?.name?.localeCompare(b?.name)) // sort alphabetically
                                                .map(sCat => ({
                                                    label: sCat?.name,
                                                    value: sCat?._id
                                                }))
                                            : []
                                    }
                                />

                            </div>


                            <div className="col-12 mt-2 d-flex justify-content-end ">
                                {values.categories.length > 1 && (
                                    <button
                                        type='button'
                                        className=" business-rm-btn-second rm-remove-btn text-danger"
                                        onClick={() => removeCategoryService(index)}
                                    >

                                        {/* <i class="fas fa-times"></i> */}
                                        <img src={closeImg} className='close-icon-pic' />
                                        Remove
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {values.categories.length < 3 && (
                        <div className="col-12">
                            <button
                                type='button'
                                className=" blue-plus mt-3"
                                onClick={addCategoryService}
                            >
                                + Add another category & service
                            </button>
                        </div>
                    )}
                </div>

                <div className='stp-compay-frm'>

                    <div className='pt-5'>
                        <p><span className='text-black'>Disclaimer:</span> Your information is used solely by Wizbizla to verify your enrollment and will not be shared.</p>
                    </div>
                    <div className="business-first-btn business-submt-btn d-flex justify-content-end ">
                        <button
                            type="submit"
                            className="btn btn-primary mt-4 btn-next"
                            disabled={loading}
                        >

                            {loading ? 'Saving...' : 'Next Step'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default IndividualForm