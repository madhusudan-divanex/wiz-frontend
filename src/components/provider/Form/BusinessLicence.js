import React, { useEffect, useState } from 'react';
import images from '../../../assets/images'
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { getSecureApiData, securePostData } from '../../../services/api';
const uploadImg = images.businessFileUpload;
const closeImg = images.closeImg;

const BusinessLicence = ({ currentStep, goToNextStep, goToPrevStep }) => {
    const [isFormDisabled, setIsFormDisabled] = useState(false);
    const userId = localStorage.getItem('userId')

    const [formData, setFormData] = useState({
        licenseUsedBy: 'Free Zone Licensed Business in UAE',
        licenseCurrentlyActive: true,
        licenses: [
            {
                tradeLicenseFile: null,
                tradeLicenseNumber: '',
                licenseIssueDate: '',
                licenseExpiryDate: '',
                licenseIssuingBody: '',
                licenseIssuedIn: '',
                companyFormationType: 'Mainland',
                licenseProfessionalBody: '',
                licenseProfessionalCategory: '',
                licenseServicesUnder: '',
                licenseInternationalOperation: false,
            }
        ],
        isRegulatedByLaw: false,
        regulatedProfession: '',
        isActive: false,
        displayOnProfile: false,
        hasCertificate: false,
        additionalCertificates: [
            {
                title: '',
            }
        ],
        termsAgreed: false,
        termsAgreedSecond: false,
        termsAgreedThird: false,
        fullName: '',
        professionalServices: [
            {
                regulatedProfession: '',
                isActive: false,
                displayOnProfile: false,
            }
        ],
    });
    // Add a new license to the licenses array
    const addLicense = () => {
        if (isFormDisabled) return
        setFormData(prev => ({
            ...prev,
            licenses: [
                ...prev.licenses,
                {
                    tradeLicenseFile: null,
                    tradeLicenseNumber: '',
                    licenseIssueDate: '',
                    licenseExpiryDate: '',
                    licenseIssuingBody: '',
                    licenseIssuedIn: '',
                    companyFormationType: 'Mainland',
                    licenseProfessionalBody: '',
                    licenseProfessionalCategory: '',
                    licenseServicesUnder: '',
                    licenseInternationalOperation: false,
                }
            ]
        }));
    };
    // Remove a license from the licenses array
    const removeLicense = (index) => {
        if (isFormDisabled) return
        if (formData.licenses.length <= 1) {
            toast.error("You must have at least one trade license");
            return;
        }

        setFormData(prev => ({
            ...prev,
            licenses: prev.licenses.filter((_, i) => i !== index)
        }));
    };

    // Handle changes to license fields
    const handleLicenseChange = (index, field, value) => {
        if (isFormDisabled) return
        setFormData(prev => {
            const updatedLicenses = [...prev.licenses];
            updatedLicenses[index] = {
                ...updatedLicenses[index],
                [field]: value
            };
            return {
                ...prev,
                licenses: updatedLicenses
            };
        });
    };

    // Handle file upload for a specific license
    const handleLicenseFileChange = (index, file) => {
        if (isFormDisabled) return
        setFormData(prev => {
            const updatedLicenses = [...prev.licenses];
            updatedLicenses[index] = {
                ...updatedLicenses[index],
                tradeLicenseFile: file
            };
            return {
                ...prev,
                licenses: updatedLicenses
            };
        });
    };

    const addProfessionalService = () => {
        setFormData(prev => ({
            ...prev,
            professionalServices: [
                ...prev.professionalServices,
                {
                    regulatedProfession: '',
                    isActive: false,
                    displayOnProfile: false,
                }
            ]
        }));
    };
    const addCertificate = () => {
        setFormData(prev => ({
            ...prev,
            additionalCertificates: [
                ...prev.additionalCertificates,
                {
                    title: '',
                }
            ]
        }));
    };

    const removeCertificate = (index) => {
        setFormData(prev => ({
            ...prev,
            additionalCertificates: prev.additionalCertificates.filter((_, i) => i !== index)
        }));
    };

    const handleCertificateChange = (index, field, value) => {
        setFormData(prev => {
            const updatedCertificates = [...prev.additionalCertificates];
            updatedCertificates[index] = {
                ...updatedCertificates[index],
                [field]: value
            };
            return {
                ...prev,
                additionalCertificates: updatedCertificates
            };
        });
    };
    const removeProfessionalService = (index) => {
        setFormData(prev => ({
            ...prev,
            professionalServices: prev.professionalServices.filter((_, i) => i !== index)
        }));
    };

    const handleProfessionalServiceChange = (index, field, value) => {
        setFormData(prev => {
            const updatedServices = [...prev.professionalServices];
            updatedServices[index] = {
                ...updatedServices[index],
                [field]: value
            };
            return {
                ...prev,
                professionalServices: updatedServices
            };
        });
    };

    const validateForm = () => {
        // Validate each license
        if (!isFormDisabled) {
            //     return true;
            // }
            for (let i = 0; i < formData.licenses.length; i++) {
                const license = formData.licenses[i];

                if (!license.tradeLicenseFile) {
                    toast.error(`Please upload your trade license file (PDF or image) for License #${i + 1}`);
                    return false;
                }
                if (!license.tradeLicenseNumber.trim()) {
                    toast.error(`Please enter trade license number for License #${i + 1}`);
                    return false;
                }
                if (!license.licenseIssueDate || !license.licenseExpiryDate) {
                    toast.error(`Please select trade license validity dates for License #${i + 1}`);
                    return false;
                }
                if (!license.licenseIssuingBody.trim()) {
                    toast.error(`Please enter the name under which trade license is issued for License #${i + 1}`);
                    return false;
                }
                if (!license.licenseIssuedIn) {
                    toast.error(`Please select the Emirate where license is issued for License #${i + 1}`);
                    return false;
                }
                if (!license.licenseProfessionalBody.trim()) {
                    toast.error(`Please enter company formation year for License #${i + 1}`);
                    return false;
                }
                if (license.companyFormationType === 'Freezone' && !license.licenseProfessionalCategory.trim()) {
                    toast.error(`Please enter Freezone name for License #${i + 1}`);
                    return false;
                }
                if (!license.licenseServicesUnder.trim()) {
                    toast.error(`Please enter licensed activities for License #${i + 1}`);
                    return false;
                }
            }
        }
        // Validate professional services if regulated by law
        if (formData.isRegulatedByLaw) {
            for (let i = 0; i < formData.professionalServices.length; i++) {
                if (!formData.professionalServices[i].regulatedProfession.trim()) {
                    toast.error(`Please enter regulated profession name for service #${i + 1}`);
                    return false;
                }
            }
        }
        if (formData.hasCertificate) {
            // Validate certificate if hasCertificate is true
            if (formData.additionalCertificates.length > 0) {
                for (let i = 0; i < formData.additionalCertificates.length; i++) {
                    if (!formData.additionalCertificates[i].title.trim()) {
                        toast.error(`Please enter certificate name for certificate #${i + 1}`);
                        return false;
                    }
                }
            }
        }

        if (!formData.termsAgreed) {
            toast.error("You must agree to the terms and conditions");
            return false;
        }

        if (!formData.termsAgreedSecond || !formData.termsAgreedThird) {
            toast.error("You must agree to the terms and conditions");
            return false;
        }

        return true;
    };


    const [filePreviews, setFilePreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox' || type === 'radio') {
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!validateForm()) return;
        setLoading(true);

        try {
            const formDataToSend = new FormData();

            // Append all form data to FormData object
            Object.keys(formData).forEach(key => {
                if (key === 'licenses') {
                    // Stringify the licenses array
                    const licensesForJson = formData[key].map(license => ({
                        ...license,
                        tradeLicenseFile: license.tradeLicenseFile instanceof File
                            ? license.tradeLicenseFile.name
                            : license.tradeLicenseFile
                    }));
                    formDataToSend.append('licenses', JSON.stringify(licensesForJson));
                } else if (key === 'professionalServices') {
                    // Stringify the professionalServices array
                    formDataToSend.append('professionalServices', JSON.stringify(formData[key]));
                } else if (key === 'additionalCertificates') {
                    // Stringify the additionalCertificates array
                    formDataToSend.append('additionalCertificates', JSON.stringify(formData[key]));
                } else if (key !== 'hasCertificate') {
                    formDataToSend.append(key, formData[key]);
                }
            });
            if(formData.additionalCertificates.length>0){
                formDataToSend.append('hasCertificate',true)
            }

            // Append license files
            formData.licenses.forEach((license, index) => {
                if (license.tradeLicenseFile && license.tradeLicenseFile instanceof File) {
                    formDataToSend.append(`tradeLicenseFile_${index}`, license.tradeLicenseFile);
                }
            });
            formDataToSend.append('userId', userId)

            // Get token from local storage or wherever it's stored
            const token = localStorage.getItem('token');

            const response = await securePostData('api/provider/create-accreditation', formDataToSend);

            if (response.status) {
                // Handle successful submission
                toast.success('License created successfully');
                document.getElementById('step4-tab').click();
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100)

            } else {
                setError(response.data.message || 'Failed to create business license');
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            setError(err.response?.data?.message || err.message || 'Server Error');
        } finally {
            setLoading(false);
        }
    };

    const currentDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).replace(/\//g, '/');

    const handleLicenseActiveChange = (value) => {
        if (value === false) {
            Swal.fire({
                title: '',
                html: `
            <p>  Wizbizla accepts applications only from legally licensed professional and trade service providers based in the UAE.</p>
            <p>Please save your progress and contact <span><a href="mailto:hello@wizbizla.com" class="" style="color : #4F40FF">hello@wizbizla.com</a></span> with any questions.  </br><p class="mb-0">Thank you</p> </p>
        `,

                icon: 'info',
                confirmButtonText: 'I Understand',
                confirmButtonColor: '#6f42c1',
                customClass: {
                    popup: 'custom-swal-popup',
                    title: 'custom-swal-title',
                    htmlContainer: 'custom-swal-html'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    setFormData(prev => ({ ...prev, licenseCurrentlyActive: value }));
                    setIsFormDisabled(true); // Disable form when No is selected
                }
            });
        } else {
            setFormData(prev => ({ ...prev, licenseCurrentlyActive: value }));
            setIsFormDisabled(false); // Enable form when Yes is selected
        }
    };

    // Add this function to your component
    const renderFilePreview = (fileData, index) => {
        if (!fileData) return null;

        // Check if it's a PDF
        if (fileData.type === 'application/pdf' ||
            fileData.name?.endsWith('.pdf') ||
            typeof fileData === 'string' && fileData.includes('application/pdf')) {
            return (
                <div id={`filePreview-${index}`} className="mt-3">
                    <div className="pdf-preview p-2 border rounded d-flex align-items-center">
                        <i className="fa-solid fa-file-pdf text-danger me-2 fs-4"></i>
                        <span className="small">{fileData.name || 'document.pdf'}</span>
                    </div>
                </div>
            );
        }

        // For images
        return (
            <div id={`filePreview-${index}`} className="mt-3">
                <img
                    src={typeof fileData === 'string' ? fileData : fileData.data}
                    alt="Preview"
                    className="img-thumbnail"
                    style={{ maxWidth: 100 }}
                />
            </div>
        );
    };
    async function getUserProfile() {
        try {
            const result = await getSecureApiData(`api/provider/get-accreditation/${userId}`)
            if (result.status) {
                const data = result.data
                const formattedLicenses = data.licenses?.map((item) => ({
                    tradeLicenseFile: item?.tradeLicenseFile,
                    tradeLicenseNumber: item?.tradeLicenseNumber,
                    licenseExpiryDate: new Date(item.licenseExpiryDate).toISOString().split('T')[0],
                    licenseIssueDate: new Date(item.licenseIssueDate).toISOString().split('T')[0],
                    licenseIssuingBody: item?.licenseIssuingBody,
                    licenseIssuedIn: item?.licenseIssuedIn,
                    companyFormationType: item?.companyFormationType,
                    licenseProfessionalBody: item?.licenseProfessionalBody,
                    licenseProfessionalCategory: item?.licenseProfessionalCategory,
                    licenseServicesUnder: item?.licenseServicesUnder,
                    licenseInternationalOperation: item?.licenseInternationalOperation
                })) || [{ category: "", services: [] }];
                const formattedCertification = data.additionalCertificates?.map((item) => ({
                    title: item?.title
                })) || [{ title: '' }];
                const formattedService = data?.professionalServices?.map((item) => ({
                    regulatedProfession: item.regulatedProfession,
                    isActive: item?.isActive,
                    displayOnProfile: item.displayOnProfile
                })) || [{ regulatedProfession: "", isActive: false, displayOnProfile: false }];
                setFormData({
                    licenseUsedBy: data.licenseUsedBy,
                    licenseCurrentlyActive: data?.licenseCurrentlyActive,
                    licenses: formattedLicenses,
                    isRegulatedByLaw: data?.isRegulatedByLaw,
                    regulatedProfession: '',
                    isActive: false,
                    displayOnProfile: false,
                    hasCertificate: data?.hasCertificate,
                    additionalCertificates: formattedCertification,
                    termsAgreed: data?.termsAgreed,
                    termsAgreedSecond: data?.termsAgreedSecond,
                    termsAgreedThird:data?.termsAgreedThird,
                    fullName: '',
                    professionalServices: formattedService,
                })
            } else {
                // goToPrevStep()
            }
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        getUserProfile()
    }, [userId])
    return (
        <form onSubmit={handleSubmit} className={isFormDisabled ? 'form-disabled' : ''}>
            <div className="row marketing-border-btm py-4 trade-lice-sec">
                <h2 className="pb-4">Trade License</h2>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <h6>Please select by using the tick boxes:</h6>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 pt-lg-0 pt-md-2">
                    <div className="custom-frm-bx">
                        <div className="form-check">
                            <input
                                className="form-check-input custom-checkbox"
                                type="checkbox"
                                name="hasLicense"
                                checked={formData.licenseUsedBy === 'Free Zone Licensed Business in UAE'}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    licenseUsedBy: e.target.checked ? 'Free Zone Licensed Business in UAE' : 'Other'
                                }))}
                                id="checkDefaulttrad"
                            />
                            <label className="form-check-label" htmlFor="checkDefaulttrad">
                                I/We have a licenced business in UAE
                            </label>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 ">
                    <h6>
                        Is your trade license currently active, <br /> as of&nbsp;
                        <span className='optional-colr'>{currentDate}</span>
                    </h6>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-check custom-radio-purple">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="licenseCurrentlyActive"
                            id="radioDefault1"
                            checked={formData.licenseCurrentlyActive === true}
                            onChange={() => handleLicenseActiveChange(true)}
                        />
                        <label className="form-check-label" htmlFor="radioDefault1">
                            Yes
                        </label>
                    </div>
                    <div className="form-check custom-radio-purple">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="licenseCurrentlyActive"
                            id="radioDefault2"
                            checked={formData.licenseCurrentlyActive === false}
                            onChange={() => handleLicenseActiveChange(false)}
                        />
                        <label className="form-check-label" htmlFor="radioDefault2">
                            No
                        </label>
                    </div>
                </div>
            </div>
            {formData.licenses.map((license, licenseIndex) => (
                <div key={licenseIndex} className="license-section mb-4 p-3 border rounded">
                    {formData.licenses.length > 1 && (
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4>License #{licenseIndex + 1}</h4>
                            <button
                                type="button"
                                className="rm-cate-btn rm-remove-btn"
                                onClick={() => removeLicense(licenseIndex)}
                                disabled={formData.licenses.length <= 1}
                            >
                                <img src={closeImg} className='close-icon-pic' />
                                Remove
                            </button>
                        </div>
                    )}

                    <div className="row file-upload-box pt-4">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <h6>Upload a copy of your trade license</h6>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="custom-frm-bx">
                                <label htmlFor={`fileInput-${licenseIndex}`} style={{ width: "100%" }} className={isFormDisabled ? 'form-disabled' : ''}>
                                    <div className="upload-box  p-4 text-center" id={`uploadArea-${licenseIndex}`}>
                                        <div className="upload-icon mx-auto mb-2">
                                            <img src={uploadImg} alt="Upload" />
                                        </div>
                                        <p className="fw-semibold mb-1">
                                            <label
                                                htmlFor={`fileInput-${licenseIndex}`}
                                                className="text-primary file-label"
                                                style={{ cursor: "pointer" }}
                                            >
                                                Click to upload
                                            </label>{" "}
                                            or drag and drop
                                        </p>
                                        <small className="text-muted">
                                            SVG, PNG, JPG or PDF (max. 10MB)
                                        </small>
                                        {filePreviews[licenseIndex] && (
                                            renderFilePreview(filePreviews[licenseIndex], licenseIndex)
                                        ) }
                                        {typeof license?.tradeLicenseFile === 'string' &&<div id={`filePreview-${licenseIndex}`} className="mt-3">
                                            <div className="pdf-preview p-2 border rounded d-flex align-items-center justify-content-center">
                                                <i className="fa-solid fa-file-pdf text-danger me-2 fs-4"></i>
                                                <span className="small">{license.tradeLicenseFile?.slice(32) || 'document.pdf'}</span>
                                            </div>
                                        </div>}
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    className="d-none"
                                    id={`fileInput-${licenseIndex}`}
                                    name={`tradeLicenseFile-${licenseIndex}`}
                                    accept=".png,.jpg,.jpeg,.svg,.pdf"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            if (file.size > 10 * 1024 * 1024) {
                                                toast.error("File size must be less than 10MB.");
                                                e.target.value = '';
                                                return;
                                            }
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                const newPreviews = [...filePreviews];
                                                newPreviews[licenseIndex] = {
                                                    data: reader.result,
                                                    type: file.type,
                                                    name: file.name
                                                };
                                                setFilePreviews(newPreviews);
                                            };
                                            reader.readAsDataURL(file);
                                            handleLicenseFileChange(licenseIndex, file);
                                        }
                                    }}
                                    disabled={isFormDisabled}
                                />
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="custom-frm-bx">
                                        <label htmlFor="">Enter your trade license number <span className="start-icon">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter license number"
                                            value={license.tradeLicenseNumber}
                                            onChange={(e) => handleLicenseChange(licenseIndex, 'tradeLicenseNumber', e.target.value)}
                                            disabled={isFormDisabled}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-end" aria-colspan="trade-lic-text">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="custom-frm-bx">
                                        <label htmlFor="">Trade license validity: <span className="start-icon">*</span></label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            placeholder="Date of issue"
                                            value={license.licenseIssueDate}
                                            onChange={(e) => handleLicenseChange(licenseIndex, 'licenseIssueDate', e.target.value)}
                                            disabled={isFormDisabled}
                                            max={new Date().toISOString().split("T")[0]}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="custom-frm-bx">
                                        <input
                                            type="date"
                                            className="form-control"
                                            placeholder="Date of expiry"
                                            value={license.licenseExpiryDate}
                                            onChange={(e) => handleLicenseChange(licenseIndex, 'licenseExpiryDate', e.target.value)}
                                            disabled={isFormDisabled}
                                            min={license.licenseIssueDate || new Date().toISOString().split("T")[0]}  // issue date ke baad ya aaj ke baad
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="custom-frm-bx">
                                    <label htmlFor="">
                                        Under what name is your trade license issued? <span className="start-icon">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter registered company name"
                                        value={license.licenseIssuingBody}
                                        onChange={(e) => handleLicenseChange(licenseIndex, 'licenseIssuingBody', e.target.value)}
                                        disabled={isFormDisabled}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="custom-frm-bx option-size">
                                    <label htmlFor="">
                                        Which Emirate is your trade license issued from? {" "}
                                        <span className="start-icon">*</span>{" "}
                                    </label>
                                    <select
                                        className="form-select"
                                        value={license.licenseIssuedIn}
                                        onChange={(e) => handleLicenseChange(licenseIndex, 'licenseIssuedIn', e.target.value)}
                                        disabled={isFormDisabled}
                                    >
                                        <option value="">Select</option>
                                        <option value="Abu Dhabi">Abu Dhabi</option>
                                        <option value="Ajman">Ajman</option>
                                        <option value="Dubai">Dubai</option>
                                        <option value="Fujairah">Fujairah</option>
                                        <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                                        <option value="Sharjah">Sharjah</option>
                                        <option value="Umm Al Quwain">Umm Al Quwain</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="custom-frm-bx">
                                    <label htmlFor="">Year of Company Formation <span className="start-icon">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Please enter the year"
                                        value={license.licenseProfessionalBody}
                                        onChange={(e) => handleLicenseChange(licenseIndex, 'licenseProfessionalBody', e.target.value)}
                                        disabled={isFormDisabled}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="custom-frm-bx">
                                    <label htmlFor="">Please select where your license is issued <span className="start-icon">*</span></label>
                                    <div className="d-flex gap-3">
                                        <div className="form-check custom-radio-purple">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name={`companyFormationType-${licenseIndex}`}
                                                id={`radioDefaultfree-${licenseIndex}`}
                                                checked={license.companyFormationType === 'Freezone'}
                                                onChange={() => handleLicenseChange(licenseIndex, 'companyFormationType', 'Freezone')}
                                                disabled={isFormDisabled}
                                            />
                                            <label className="form-check-label" htmlFor={`radioDefaultfree-${licenseIndex}`}>
                                                Freezone
                                            </label>
                                        </div>
                                        <div className="form-check custom-radio-purple">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name={`companyFormationType-${licenseIndex}`}
                                                id={`radioDefaultmain-${licenseIndex}`}
                                                checked={license.companyFormationType === 'Mainland'}
                                                onChange={() => handleLicenseChange(licenseIndex, 'companyFormationType', 'Mainland')}
                                                disabled={isFormDisabled}
                                            />
                                            <label className="form-check-label" htmlFor={`radioDefaultmain-${licenseIndex}`}>
                                                Mainland
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {license.companyFormationType === 'Freezone' && (
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="custom-frm-bx">
                                        <label htmlFor="">Name of the Freezone <span className="start-icon">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter name"
                                            value={license.licenseProfessionalCategory}
                                            onChange={(e) => handleLicenseChange(licenseIndex, 'licenseProfessionalCategory', e.target.value)}
                                            // required={license.companyFormationType === 'Freezone'}
                                            disabled={isFormDisabled}
                                        />
                                    </div>
                                </div>
                            )}

                            {license.companyFormationType === 'Mainland' && (
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="custom-frm-bx">
                                        <label htmlFor="">Name of the Mainland <span className="start-icon">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter name"
                                            value={license.licenseProfessionalCategory}
                                            onChange={(e) => handleLicenseChange(licenseIndex, 'licenseProfessionalCategory', e.target.value)}
                                            // required={license.companyFormationType === 'Mainland'}
                                            disabled={isFormDisabled}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row pt-5 ">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <p>
                                Please enter the activities you are licensed to conduct under
                                this license&nbsp;optional
                            </p>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="custom-frm-bx">
                                <div className="form-floating">
                                    <textarea
                                        className="form-control"
                                        id={`message-${licenseIndex}`}
                                        rows={4}
                                        placeholder="Enter licensed activities"
                                        value={license.licenseServicesUnder}
                                        onChange={(e) => handleLicenseChange(licenseIndex, 'licenseServicesUnder', e.target.value)}
                                        disabled={isFormDisabled}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row marketing-border-btm py-4 inter-oper-sec">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <h6>International Operations</h6>
                            <p>
                                Does your trade license allow you to operate internationally{" "}
                                <br /> (outside of the UAE)?
                            </p>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="form-check custom-radio-purple">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name={`licenseInternationalOperation-${licenseIndex}`}
                                    id={`radioDefaulty-${licenseIndex}`}
                                    checked={license.licenseInternationalOperation === true}
                                    onChange={() => handleLicenseChange(licenseIndex, 'licenseInternationalOperation', true)}
                                    disabled={isFormDisabled}
                                />
                                <label className="form-check-label" htmlFor={`radioDefaulty-${licenseIndex}`}>
                                    Yes
                                </label>
                            </div>
                            <div className="form-check custom-radio-purple">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name={`licenseInternationalOperation-${licenseIndex}`}
                                    id={`radioDefaultn-${licenseIndex}`}
                                    checked={license.licenseInternationalOperation === false}
                                    onChange={() => handleLicenseChange(licenseIndex, 'licenseInternationalOperation', false)}
                                    disabled={isFormDisabled}
                                />
                                <label className="form-check-label" htmlFor={`radioDefaultn-${licenseIndex}`}>
                                    No
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className="row marketing-border-btm py-4" style={{ borderBottom: "1px solid #E4E7EC" }}>
                <div className="col-lg-12">
                    <div className="d-flex justify-content-center gap-4">
                        <div className="business-add-btn">
                            <button
                                type="button"
                                onClick={addLicense}
                                style={isFormDisabled ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                                className="blue-plus p-0 border-0 align-baseline"
                            >
                                <i className="fa-solid fa-plus" />
                                Add another trade license
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row py-4 regular-body ">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <h2>Regulatory Body</h2>
                    <p>
                        Step 2 of the accreditation process involves confirming your
                        membership with a relevant professional body, if required by
                        law. If your trade or industry is regulated, provide details of
                        the applicable associations or regulatory bodies.
                    </p>
                </div>
            </div>

            <div className='marketing-sec marketing-border-btm '>
                <div className="row marketing-border-btm  border-0 py-4 regular-body">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <h6 >Does your trade or industry require regulation by law?</h6>
                        <p>
                            Note: certain industries in the <span >UAE</span>, such as coaching, financial{" "}
                            <br /> advisory, and marketing, are not regulated by law.
                        </p>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-check custom-radio-purple">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="isRegulatedByLaw"
                                id="radioDefaultright"
                                checked={formData.isRegulatedByLaw === true}
                                onChange={() => setFormData(prev => ({ ...prev, isRegulatedByLaw: true }))}
                            />
                            <label className="form-check-label" htmlFor="radioDefaultright">
                                Yes
                            </label>
                        </div>
                        <div className="form-check custom-radio-purple">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="isRegulatedByLaw"
                                id="radioDefaultnot"
                                checked={formData.isRegulatedByLaw === false}
                                onChange={() => setFormData(prev => ({ ...prev, isRegulatedByLaw: false }))}
                            />
                            <label className="form-check-label" htmlFor="radioDefaultnot">
                                No
                            </label>
                        </div>
                    </div>
                </div>

            </div>

            {formData.isRegulatedByLaw && (
                <div className="row py-4 regular-body marketing-border-btm py-4" >
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <h6>
                            Please state which professional service you are regulated by.
                        </h6>
                        {/* <div className="business-add-btn">
                                <button
                                    type="button"
                                    onClick={addProfessionalService}
                                    style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
                                >
                                    <i className="fa-solid fa-plus" />
                                    Add another Regulatory body or <br /> Professional affiliation
                                </button>
                            </div> */}
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                        {formData.professionalServices.map((service, index) => (
                            <div key={index} className="professional-service-item mb-4 p-3 border rounded">
                                <div className="custom-frm-bx">
                                    <label htmlFor={`regulatedProfession-${index}`}>

                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter the full name"
                                        value={service.regulatedProfession}
                                        onChange={(e) => handleProfessionalServiceChange(index, 'regulatedProfession', e.target.value)}
                                        // required={formData.isRegulatedByLaw}
                                        id={`regulatedProfession-${index}`}
                                    />
                                </div>
                                <div className="custom-frm-bx custom-frm-bx-small">
                                    <div className="form-check check-fm-box-bordr ">
                                        <input
                                            className="form-check-input custom-checkbox"
                                            style={{ marginTop: "0" }}
                                            type="checkbox"
                                            checked={service.isActive}
                                            onChange={(e) => handleProfessionalServiceChange(index, 'isActive', e.target.checked)}
                                            id={`checkDefaultactive-${index}`}
                                        />
                                        <label className="form-check-label" htmlFor={`checkDefaultactive-${index}`}>
                                            Active&nbsp;as of <span style={{ color: "#4F40FF" }}>{currentDate}</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="custom-frm-bx custom-frm-bx-small">
                                    <div className="form-check check-fm-box-bordr">
                                        <input
                                            className="form-check-input custom-checkbox" style={{ marginTop: "0" }}
                                            type="checkbox"
                                            checked={service.displayOnProfile}
                                            onChange={(e) => handleProfessionalServiceChange(index, 'displayOnProfile', e.target.checked)}
                                            id={`checkDefaultprofile-${index}`}
                                        />
                                        <label className="form-check-label" htmlFor={`checkDefaultprofile-${index}`}>
                                            I consent to have this displayed on my profile.
                                        </label>
                                    </div>
                                </div>
                                {formData.professionalServices.length > 1 && (
                                    <div className="d-flex justify-content-end business-rm-btn">
                                        <button
                                            type="button"
                                            className="text-end rm-cate-btn   rm-remove-btn"
                                            onClick={() => removeProfessionalService(index)}
                                            style={{ background: 'none', border: 'none' }}
                                        >

                                            <img src={closeImg} className='close-icon-pic' />

                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="business-add-btn">
                            <button
                                type="button"
                                onClick={addProfessionalService}
                                className='blue-plus'

                            >
                                <i className="fa-solid fa-plus" />
                                Add another Regulatory body or Professional affiliation
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="row regular-body " style={{ borderTop: "1px solid rgb(228, 231, 236)" }}>
                <h2 className="py-4">Certificates</h2>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <p>
                        To enhance your profile would you like to share any other
                        relevant details such as degrees, certifications, trade
                        association memberships, or qualifications that set your
                        business or services apart?
                    </p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-check custom-radio-purple">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="hasCertificate"
                            id="radioDefaultcerti"
                            checked={formData.hasCertificate === true}
                            onChange={() => setFormData(prev => ({ ...prev, hasCertificate: true }))}
                        />
                        <label className="form-check-label" htmlFor="radioDefaultcerti">
                            Yes
                        </label>
                    </div>
                    <div className="form-check custom-radio-purple">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="hasCertificate"
                            id="radioDefaultopt"
                            checked={formData.hasCertificate === false}
                            onChange={() => setFormData(prev => ({ ...prev, hasCertificate: false }))}
                        />
                        <label className="form-check-label" htmlFor="radioDefaultopt">
                            No
                        </label>
                    </div>
                </div>
            </div>

            {formData.hasCertificate &&
                <>
                    <div className="row marketing-border-btm pt-4 ">
                        {formData.additionalCertificates.map((certificate, index) => (
                            <div key={index} className="certificate-item mb-4 p-3 border rounded">
                                <h6>Certificate #{index + 1}</h6>
                                <div className="custom-frm-bx">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter certificate name"
                                        value={certificate.title}
                                        onChange={(e) => handleCertificateChange(index, 'title', e.target.value)}
                                        id={`certificateName-${index}`}
                                    />
                                </div>
                                <div className="d-flex justify-content-between mt-2">

                                    {index === formData.additionalCertificates.length - 1 && (
                                        <div className='d-flex justify-content-start w-100'>

                                            <button
                                                type="button"
                                                className="blue-plus"
                                                onClick={addCertificate}
                                                style={{ background: 'none', border: 'none' }}
                                            >
                                                <i className="fa-solid fa-plus" />
                                                Add Another Certificate
                                            </button>
                                        </div>
                                    )}

                                    <div className='d-flex justify-content-end w-100'>
                                        <button
                                            type="button"
                                            className="text-danger rm-cate-btn  rm-remove-btn"
                                            onClick={() => removeCertificate(index)}
                                            style={{ background: 'none', border: 'none' }}
                                        >
                                            <img src={closeImg} className='close-icon-pic' />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="row marketing-border-btm ">
                        <div className="col-lg-12">
                            <div className="d-flex justify-content-center gap-4">
                                {formData.additionalCertificates.length === 0 && (
                                    <div className="business-add-btn">
                                        <button
                                            type="button"
                                            style={{ background: 'none', border: 'none', color: 'inherit' }}
                                            onClick={addCertificate}
                                        >
                                            <i className="fa-solid fa-plus" />
                                            Add another certificate, trade associations and/or qualifications
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            }
            <div className="row pt-4 mt-2" style={{ borderTop: "1px solid rgb(228, 231, 236)" }}>
                <div className="col-lg-6 col-md-6 col-sm-12" >
                    <h4>Terms and Conditions<sup className="start-icon fs-6 " style={{ top: "-.4em" }}>*</sup></h4>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                        <div className="form-check">
                            <input
                                className="form-check-input custom-checkbox"
                                type="checkbox"
                                name="termsAgreed"
                                checked={formData.termsAgreed}
                                onChange={handleChange}
                                id="checkDefaultnine"
                            />
                            <label className="form-check-label" htmlFor="checkDefaultnine">
                                Please confirm that you agree all the information provided
                                is correct and not fraudulently provided
                            </label>
                        </div>
                    </div>
                    <div className="custom-frm-bx">
                        <div className="form-check">
                            <input
                                className="form-check-input custom-checkbox"
                                type="checkbox"
                                id="checkDefaultseven"
                                name='termsAgreedSecond'
                                checked={formData.termsAgreedSecond}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="checkDefaultseven">
                                I understand my personal information will be processed and
                                stored in accordance with Wizbizla{" "}
                                <span>Privacy Policy</span>
                            </label>
                        </div>
                    </div>
                    <div className="custom-frm-bx">
                        <div className="form-check">
                            <input
                                className="form-check-input custom-checkbox"
                                type="checkbox"
                                id="checkDefaulteight"
                                name='termsAgreedThird'
                                checked={formData.termsAgreedThird}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="checkDefaulteight">
                                I agree to comply with Wizbizla's Standards for Excellence
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}
            <div className="business-submt-btn d-flex justify-content-between">
                <div className="business-submt-out-btn">
                    <button
                        type="button"
                        className="btn btn-outline-primary btn-prev mt-4"
                        onClick={goToPrevStep}
                    >
                        Previous Step
                    </button>

                </div>
                <div className="business-submt-btn d-flex justify-content-end">
                    <button
                        type="submit"
                        className="btn btn-primary mt-4"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Next Step'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default BusinessLicence;
