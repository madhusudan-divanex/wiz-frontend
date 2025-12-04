import JoditEditor from 'jodit-react';
import React, { useEffect, useRef, useState } from 'react'
import images from '../../../assets/images'
import { toast } from 'react-toastify';
import axios from 'axios';
import { getSecureApiData, securePostData } from '../../../services/api';
import base_url from '../../../baseUrl';
const closeImg = images.closeImg;
const typeImg = images.fileTypeBackground;
const uploadImg = images.businessFileUpload;

const Marketing = ({ currentStep, goToNextStep, goToPrevStep, selectedType }) => {
    const editorExperience = useRef(null);
    const editorExpertise = useRef(null);
    const [videoFile, setVideoFile] = useState(null);
    const [profileType, setProfileType] = useState('')
    const [videoFileName, setVideoFileName] = useState('');
    const [menuFileName, setMenuFileName] = useState('');
    const [menuFile, setMenuFile] = useState(null)
    const [additionalSections, setAdditionalSections] = useState([]);
    const [experience, setExperience] = useState('');
    const [expertise, setExpertise] = useState('');
    const [userProfile, setUserProfile] = useState()
    const userId = localStorage.getItem('userId')
    const [values, setValues] = useState({
        videoIntro: null,
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [keepPortfolio, setKeepPortFolio] = useState(false)
    const [portfolio, setPortfolio] = useState([
        { tagLabel: '', contentLink: '', imageUrl: null, preview: '' }
    ]);
    const [isLoadingPreviews, setIsLoadingPreviews] = useState(false);
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setValues(prev => ({ ...prev, [name]: checked }));
    }
    const handlePortfolioChange = (index, field, value) => {
        const updated = [...portfolio];
        updated[index][field] = value;
        setPortfolio(updated);
    };
    const handleCheckboxChange1 = (e) => {
        setKeepPortFolio(e.target.checked);
    };
    useEffect(() => {
        if (sessionStorage.getItem('profileType')) {
            setProfileType('restaurant')
        }
    }, [])
    const handleVideoChange = (e) => {
        console.log("cl")
        const file = e.target.files[0];
        if (file) {
            const validTypes = ["video/mp4", "video/quicktime", "video/x-msvideo"];
            if (!validTypes.includes(file.type)) {
                toast.error("Invalid video format. Please upload MP4, MOV, or AVI.");
                return;
            }

            if (file.size > 20 * 1024 * 1024) {
                toast.error("Video size must be less than 20MB.");
                return;
            }

            setVideoFile(file);
            setVideoFileName(file.name);
        }
    };
    const handleMenuChange = (e) => {
        console.log("menu")
        const file = e.target.files[0];
        if (file) {
            const validTypes = [
                "image/jpeg",     // JPG
                "image/png",      // PNG
                "image/webp",     // WebP
                "application/pdf" // PDF
            ];

            if (!validTypes.includes(file.type)) {
                toast.error("Invalid file format. Only JPG, PNG, WebP images and PDF files are allowed.");
                return;
            }

            if (file.size > 10 * 1024 * 1024) { // Optional: size limit (10MB here)
                toast.error("File size must be less than 10MB.");
                return;
            }

            setMenuFile(file);
            setMenuFileName(file.name);
        }
    };

    const addTextSection = (e) => {
        e.preventDefault();
        if (additionalSections.length >= 3) {
            toast.error("You can only add up to 3 sections");
            return;
        }
        setAdditionalSections([
            ...additionalSections,
            { type: "text", title: "", content: "" }
        ]);
    };

    const addGallerySection = (e) => {
        e.preventDefault();
        if (additionalSections.length >= 3) {
            toast.error("You can only add up to 3 sections");
            return;
        }
        setAdditionalSections([
            ...additionalSections,
            { type: "gallery", title: "", galleryImages: [], previews: [] }
        ]);
    };

    const removeSection = (index) => {
        const updated = [...additionalSections];
        updated.splice(index, 1);
        setAdditionalSections(updated);
        setTimeout(() => {
            const element = document.querySelector(".additional-sec");
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 100);
    };

    const handleSectionChange = (index, field, value) => {
        const updated = [...additionalSections];
        updated[index][field] = value;
        setAdditionalSections(updated);
    };


    const handleFileChange = (index, file) => {
        const updated = [...portfolio];
        updated[index].image = file;

        const reader = new FileReader();
        reader.onload = () => {
            updated[index].preview = reader.result;
            setPortfolio(updated); // Only update after reader loads
        };
        if (file) {
            reader.readAsDataURL(file);
        }


    };

    const addPortfolioItem = () => {
        setPortfolio([...portfolio, { tagLabel: '', contentLink: '', image: null }]);
    };

    const removePortfolioItem = (index) => {
        const updated = [...portfolio];
        updated.splice(index, 1);
        setPortfolio(updated);
    };

    const handleGalleryChange = (index, files) => {
        if (!files) return;
        setIsLoadingPreviews(true);
        try {
            const fileArray = Array.from(files);

            setAdditionalSections(prevSections => {
                const updated = [...prevSections];
                const section = { ...updated[index] }; // clone section object

                const existingFiles = section.galleryImages || [];
                const existingPreviews = section.previews || [];

                const newFiles = [...existingFiles, ...fileArray].slice(0, 9);
                const newPreviews = [
                    ...existingPreviews,
                    ...fileArray.map(file => URL.createObjectURL(file))
                ].slice(0, 9);

                section.galleryImages = newFiles;
                section.previews = newPreviews;

                updated[index] = section; // replace with cloned+updated
                return updated;
            });
        } catch (error) {
        } finally {
            setIsLoadingPreviews(false);
        }
    };

    const validateMarketing = () => {

        if (!experience.trim()) {
            toast.error("Experience is Required.");
            return false;
        }
        if (!expertise.trim()) {
            toast.error("Expertise is Required.");
            return false;
        }
        if (values.keepDefaultVideo && !videoFile) {
            toast.error("Please upload a video intro");
            return false;
        }

        if (keepPortfolio) {
            if (!portfolio || portfolio.length === 0) {
                toast.error("Please add at least one portfolio item.");
                return false;
            }

            const invalidItems = portfolio.filter(
                (item) =>
                    !item.tagLabel?.trim() || // tagLabel empty
                    !item.image              // image missing
            );

            if (invalidItems.length > 0) {
                toast.error("Each portfolio item must have a tag and an image.");
                return false;
            }
        }
        return true;
    }
    const handleSubmit = async () => {
        if (!validateMarketing()) return;

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('experience', experience);
            formData.append('expertise', expertise);
            formData.append('userId', userId);


            if (videoFile) {
                formData.append('videoIntro', videoFile);
            }
            if (menuFile) {
                formData.append('menu', menuFile);
            }

            // Portfolio
            const portfolioData = portfolio.map(({ tagLabel, contentLink }) => ({
                tagLabel,
                contentLink
            }));
            formData.append('thoughtLeadershipPortfolio', JSON.stringify(portfolioData));
            portfolio.forEach((item) => {
                if (item.image) {
                    formData.append('imageUrl', item.image);
                }
            });

            // Additional Sections
            const cleanSections = additionalSections.map((sec, index) => {
                if (sec.type === "gallery") {
                    return { type: sec.type, title: sec.title, galleryImages: [] };
                }
                return { type: sec.type, title: sec.title, content: sec.content };
            });

            formData.append('additionalSections', JSON.stringify(cleanSections));

            // Attach gallery images
            additionalSections.forEach((sec, index) => {
                if (sec.type === "gallery" && sec.galleryImages.length > 0) {
                    sec.galleryImages.forEach((file) => {
                        formData.append(`galleryImages_${index}`, file);
                    });
                }
            });


            const response = await securePostData('api/provider/create-marketing', formData);
            if (response.status) {
                toast.success('Marketing data saved successfully!');
                document.getElementById('step3-tab').click();
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
            }
        } catch (err) {
            console.error('Error submitting marketing data', err.response || err);
            toast.error('Submission failed.');
        } finally {
            setIsSubmitting(false); // ✅ stop loading
        }
    };

    const config = {
        readonly: false,
        height: 200,
        toolbarButtonSize: 'middle',
        buttons: ['bold', 'italic', 'underline', 'link', 'unlink', 'source'],
        uploader: {
            insertImageAsBase64URI: true,
        },
        showCharsCounter: false,   // 🚫 hide character counter
        showWordsCounter: false,   // 🚫 hide word counter
        showPoweredBy: false,      // 🚫 hide "Powered by Jodit"
        statusbar: false
    };
    useEffect(() => {
        return () => {
            // Clean up all object URLs to prevent memory leaks
            additionalSections.forEach(section => {
                if (section.previews) {
                    section.previews.forEach(preview => {
                        URL.revokeObjectURL(preview);
                    });
                }
            });

            // Clean up portfolio previews
            portfolio.forEach(item => {
                if (item.preview) {
                    URL.revokeObjectURL(item.preview);
                }
            });
        };
    }, []);
    async function getUserProfile() {
        try {
            const result = await getSecureApiData(`api/provider/profile-get/${userId}`)
            if (result.status) {
                setProfileType(result.data.type)
                setUserProfile(result.data)
            } else {
                goToPrevStep()
            }
        } catch (error) {
            toast.error(error)
        }
    }
    async function getUserMarketing() {
        try {
            const result = await getSecureApiData(`api/provider/get-marketing/${userId}`)
            if (result.status) {
                const data = result.data
                setExperience(data?.experience)
                setExpertise(data?.expertise)
                setMenuFile(data?.menu)
                setMenuFileName(data?.menu?.slice(32))
                setAdditionalSections(data?.additionalSections)
                setPortfolio(data?.thoughtLeadershipPortfolio)
                setVideoFileName(data?.videoIntro?.slice(32))
            } else {
                goToPrevStep()
            }
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        getUserProfile()
        getUserMarketing()
    }, [userId])



    return (
        <form>
            <div className="row marketing-border-btm py-4 border-0">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="editor-wrapper">
                        <label>Experience <span className="start-icon">*</span></label>
                        <JoditEditor
                            ref={editorExperience}
                            value={experience}
                            onBlur={(newContent) => setExperience(newContent)}
                            config={config}
                        />
                    </div>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="editor-wrapper">
                        <label>Expertise <span className="start-icon">*</span></label>
                        <JoditEditor
                            tabIndex={1} // tabIndex of textarea
                            ref={editorExpertise}
                            value={expertise}
                            onBlur={(newContent) => setExpertise(newContent)}
                            config={config}

                        />
                    </div>
                </div>

            </div>
            {selectedType === 'restaurant' && <div className="row marketing-border-btm py-4 additional-sec mb-3">
                <div className="col-lg-6 col-md-6 col-sm-12 file-upload-box">
                    <h5 style={{ fontSize: "18px", fontWeight: "600" }}>Upload Your Restaurant Menu</h5>
                    <div className="custom-frm-bx">
                        <label htmlFor="fileInput3" style={{ width: "100%" }}>
                            <div className="upload-box  p-4 text-center" id="uploadArea3">
                                <div className="upload-icon mx-auto mb-2">
                                    <img
                                        src={uploadImg}
                                        alt="Upload"
                                    />
                                </div>
                                <p className="fw-semibold mb-1">
                                    <label
                                        htmlFor="fileInput3"
                                        className="text-primary file-label"
                                        style={{ cursor: "pointer" }}
                                    >
                                        Click to upload
                                    </label>{" "}
                                    or drag and drop
                                </p>
                                <small className="text-muted">
                                    <small class="text-muted"> PNG, JPG or PDF (max. 10MB)</small>
                                </small>

                                {menuFileName && (
                                    <div className="mt-2 text-muted">
                                        <i className="fas fa-file-video me-1"></i> {menuFileName}
                                    </div>
                                )}
                                <div id="filePreview3" className="d-none mt-3">
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
                            id="fileInput3"
                            onChange={handleMenuChange}
                            accept=".png,.jpg,.jpeg,.pdf"

                        />
                    </div>
                </div>
            </div>}
            <div className="row marketing-border-btm py-4 additional-sec mb-3">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <h5 style={{ fontSize: "18px", fontWeight: "600" }}>Additional Section </h5>
                    <p>
                        You can enhance your profile by adding up to three custom sections tailored to your offerings such as a portfolio, testimonials, or galleries. If you prefer not to add additional sections after your Experience and Expertise, you can skip this step.
                    </p>
                </div>
            </div>
            {additionalSections.map((section, index) => (
                <div key={index} className="custom-frm-bx mb-4">
                    {section.type === "text" ? (
                        <>
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Enter Category Name (13 characters max)"
                                value={section.title}
                                maxLength={13}
                                onChange={(e) => handleSectionChange(index, "title", e.target.value)}
                            />

                            <JoditEditor
                                value={section.content}
                                onBlur={(newContent) => handleSectionChange(index, "content", newContent)}
                                config={config}
                            />
                            <div className='d-flex justify-content-end'>
                                <button type="button" className="business-rm-btn-second text-end rm-remove-btn text-danger" onClick={() => removeSection(index)} >
                                    <img src={closeImg} className='close-icon-pic' />
                                    Remove
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className='row marketing-border-btm py-4 gallery-multi-image-section'>
                            <div className='col-lg-6'>
                                <div className="custom-frm-bx">
                                    <label htmlFor="">Gallery <span className="start-icon">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={section?.title}
                                        placeholder="Enter Name (13 characters max)"
                                        maxLength={13}
                                        name='name'
                                        onChange={(e) => handleSectionChange(index, "title", e.target.value)}
                                    />
                                </div>
                                <div className='file-upload-box'>
                                    <div className="custom-frm-bx mb-0 pb-0">
                                        <label htmlFor={`fileInput_gallery_${index}`} style={{ width: "100%" }}>
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
                                                            <span className='text-primary file-label' htmlFor={`fileInput_gallery_${index}`}>
                                                                Click to upload
                                                            </span>  upto 9 Images or drag and drop
                                                        </p>
                                                        <small className="text-muted">
                                                            SVG, PNG, JPG or GIF (max. 10MB)
                                                        </small>
                                                    </div>
                                                    <div className="d-flex justify-content-end position-relative">
                                                        {/* <span className='file-ext-blue text-uppercase'>{section?.split('.')?.pop('')}</span> */}
                                                        <img
                                                            src="/assets/images/file-types.png"
                                                            alt=""
                                                            // className="img-thumbnail"
                                                            // className='img-fluid'
                                                            style={{ width: 40, height: 40 }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                        <input
                                            type="file"
                                            className="d-none"
                                            id={`fileInput_gallery_${index}`}
                                            onChange={(e) => handleGalleryChange(index, e.target.files)}
                                            accept=".png,.jpg,.jpeg,.gif,.svg"
                                            multiple
                                        />
                                        <div className="preview-grid">
                                            {section.previews?.map((src, i) => (
                                                <div key={i} className="thumb">
                                                    <img src={src} alt="preview" />
                                                    <button
                                                        type="button"
                                                        className="remove-btn"
                                                        onClick={() => {
                                                            const updated = [...additionalSections];
                                                            updated[index].galleryImages.splice(i, 1);
                                                            updated[index].previews.splice(i, 1);
                                                            setAdditionalSections(updated);
                                                        }}
                                                    >
                                                        <img src={closeImg} className='close-icon-pic' />
                                                    </button>
                                                </div>
                                            ))}
                                            {section?.galleryImages?.filter(item => typeof item === 'string' && item.startsWith('/')).map((src, i) => (
                                                <div key={i} className="thumb">
                                                    <img src={`${base_url}${src}`} alt="preview" />
                                                    <button
                                                        type="button"
                                                        className="remove-btn"
                                                        onClick={() => {
                                                            const updated = [...additionalSections];
                                                            updated[index].galleryImages.splice(i, 1);
                                                            setAdditionalSections(updated);
                                                        }}
                                                    >
                                                        <img src={closeImg} className='close-icon-pic' />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className='d-flex justify-content-end'>
                                            <button
                                                type="button"
                                                className="business-rm-btn-second text-end rm-remove-btn text-danger"
                                                onClick={() => removeSection(index)}
                                            >
                                                <img src={closeImg} className='close-icon-pic' />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            <div className="row marketing-border-btm py-4">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="d-flex justify-content-center gap-4 bus-categories-add-mob">
                        <div className="business-add-btn">
                            <button type='button ' className='blue-plus' onClick={addTextSection}><i className="fa-solid fa-plus" />Add another text category</button>
                        </div>
                        <strong>OR</strong>
                        <div className="business-add-btn">
                            <button type='button' className='blue-plus' onClick={addGallerySection}>
                                <i className="fa-solid fa-plus" />
                                Add a gallery
                            </button>
                            <span className='upload-size-title'>(up to 9 images size: 500px x 500px)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row py-4 marketing-border-btm" style={{ borderBottom: "1px solid #E4E7EC" }}>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <h5 className='fs-4'>Your Thought Leadership Portfolio </h5>
                    <p>
                        You can share up to 6 items, such as blogs, <br /> podcasts, articles,
                        awards, and more
                    </p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 file-upload-box ">
                    <div className="custom-frm-bx mb-0">
                        <div className="form-check">
                            <input
                                className="form-check-input custom-checkbox"
                                type="checkbox"
                                id="checkDefaultupload"
                                name="keepPortfolio"
                                checked={keepPortfolio}
                                onChange={handleCheckboxChange1}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="checkDefaultupload"
                            >
                                Upload an image of the thought leadership piece <br /> <span className='upload-size-title'
                                >(image size 500px x 500px)</span>
                            </label>
                        </div>
                    </div>
                    <span className="market-span">
                        Note:&nbsp;this does not include testimonials or CTA's
                    </span>
                    {portfolio.map((item, index) => {
                        return (
                            <>
                                <div className="custom-frm-bx mb-2 mt-2">
                                    <label htmlFor={`fileInput5_${index}`} style={{ width: "100%" }} className={`${!keepPortfolio ? 'disabled-upload' : ''}`}>
                                        <div className="upload-box  p-4 text-center" id="uploadArea4">
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
                                                            htmlFor={`fileInput5_${index}`}
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

                                                    {/* <span className='file-ext-blue text-uppercase'>{typeof item?.imageUrl =='object'
                                                    ? item?.imageUrl?.name?.split('.')?.pop() 
                                                    : item?.imageUrl?.split('.').pop()}</span> */}
                                                    <img
                                                        src="/assets/images/file-types.png"
                                                        alt=""
                                                        style={{ width: 40, height: 40 }}
                                                    />
                                                </div>
                                            </div>

                                            {item?.imageUrl && (
                                                <div className="mt-2">
                                                    <img
                                                        src={`${base_url}/${item.imageUrl}`}
                                                        alt="Preview"
                                                        className="img-thumbnail"
                                                        style={{ maxWidth: 100, height: 100 }}
                                                    />
                                                </div>
                                            )}
                                            {item.preview && (
                                                <div className="mt-2">
                                                    <img
                                                        src={item.preview}
                                                        alt="Preview"
                                                        className="img-thumbnail"
                                                        style={{ maxWidth: 100, height: 100 }}
                                                    />
                                                </div>
                                            )}

                                        </div>
                                    </label>
                                    <input
                                        type="file"
                                        className="d-none"
                                        id={`fileInput5_${index}`}
                                        accept=".png,.jpg,.jpeg,.gif,.svg"
                                        onChange={(e) => handleFileChange(index, e.target.files[0])}
                                        disabled={!keepPortfolio}
                                    />
                                </div>
                                <div className="custom-frm-bx my-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter a tag-label for your image (13 characters max)"
                                        maxLength={13}
                                        value={item.tagLabel}
                                        onChange={(e) => handlePortfolioChange(index, 'tagLabel', e.target.value)}
                                        disabled={!keepPortfolio}
                                    />
                                </div>
                                <div className="custom-frm-bx mb-0">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter a link to your content "
                                        value={item.contentLink}
                                        onChange={(e) => handlePortfolioChange(index, 'contentLink', e.target.value)}
                                        disabled={!keepPortfolio}
                                    />
                                </div>
                                <div className="d-flex justify-content-end business-rm-btn left-rmv-btn mt-2">
                                    <button
                                        type='button'
                                        onClick={() => removePortfolioItem(index)}
                                        className="text-end rm-cate-btn rm-remove-btn"
                                    >
                                        <img src={closeImg} className='close-icon-pic' />
                                        Remove
                                    </button>
                                </div>
                            </>
                        )
                    }
                    )}
                    <div className="d-flex justify-content-start mt-2">
                        <div className="business-add-btn">
                            <button type='button' className='blue-plus' onClick={addPortfolioItem}>
                                <i className="fa-solid fa-plus" />
                                Upload another image
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row file-upload-box mt-5 business-border-bottom ">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                        <h5 className="mb-2">Upload Your Video Introduction</h5>
                        <span>Maximum length: 1 minute</span>
                        <div className="form-check mt-2 form-check-first">
                            <input
                                className="form-check-input form-chk-input custom-checkbox position-relative ms-0"
                                type="checkbox"
                                name="keepDefaultVideo"
                                checked={values.keepDefaultVideo}
                                onChange={handleCheckboxChange}
                                id="checkDefault"
                            />
                            <label className="form-check-label ms-1" htmlFor="checkDefault">
                                Upload promotional video
                            </label>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                    <div className="custom-frm-bx">
                        <label htmlFor="fileInput4" style={{ width: "100%" }}>
                            <div className="upload-box  p-4 text-center" id="uploadArea3">
                                <div className="upload-icon mx-auto mb-2">
                                    <img
                                        src={uploadImg}
                                        alt="Upload"
                                    />
                                </div>
                                <p className="fw-semibold mb-1">
                                    <label
                                        htmlFor="fileInput4"
                                        className="text-primary file-label"
                                        style={{ cursor: "pointer" }}
                                    >
                                        Click to upload
                                    </label>{" "}
                                    or drag and drop
                                </p>
                                <small className="text-muted">
                                    .MP4, .MOV, .AVI or .WMV (max. 20MB)
                                </small>

                                {videoFileName && (
                                    <div className="mt-2 text-muted">
                                        <i className="fas fa-file-video me-1"></i> {videoFileName}
                                    </div>
                                )}

                                <div id="filePreview4" className="d-none mt-3">
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
                            id="fileInput4"
                            onChange={handleVideoChange}
                            accept="video/mp4,video/quicktime,video/x-msvideo"
                        />

                    </div>
                </div>
            </div>
            <div className="business-submt-btn d-flex justify-content-between">
                <div className="business-submt-out-btn">
                    <button
                        type="button"
                        onClick={goToPrevStep}
                        className="btn btn-outline-primary mt-4 btn-prev"
                    >
                        Previous Step
                    </button>
                </div>

                <div>
                    <button type="button" className="btn btn-primary mt-4 btn-next" onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Next Step"}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Marketing