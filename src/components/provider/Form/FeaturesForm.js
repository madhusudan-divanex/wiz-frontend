import axios from "axios";
import React, { useEffect, useEffectEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import images from '../../../assets/images'
import { getApiData, getSecureApiData, securePostData } from "../../../services/api";
import { Select, Spin } from "antd";
import { useSelector } from "react-redux";
const closeImg = images.closeImg;

const FeaturesForm = ({ currentStep, goToNextStep, goToPrevStep }) => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId')
    const [findText, setFindText] = useState('')
    const {profileData}=useSelector(state=>state.user)
    const [matchProfile, setMatchProfile] = useState([])
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // State for form fields
    const [formData, setFormData] = useState({
        recommendations: false,
        referenceProgram: false,
        references: [],
        connection: [],
        chatShow: false,
    });

    useEffect(() => {
        setFormData({ ...formData, userId })
    }, [userId])

    // Handle checkbox changes
    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;
        if (id === "referenceProgram" && !checked) {
            // If user unticks "Join Reference Program", clear references
            setFormData((prev) => ({
                ...prev,
                [id]: checked,
                references: [], // Clear references when unticked
            }));
        }
        else if (id === "recommendations" && !checked) {
            // If user unticks "Join Reference Program", clear references
            setFormData((prev) => ({
                ...prev,
                [id]: checked,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [id]: checked,
            }));
        }
    };

    // Handle adding a reference
    const addReference = () => {
        setFormData((prev) => ({
            ...prev,
            references: [
                ...prev.references,
                { name: "", relationship: "", workTogether: "", contact: "" },
            ],
        }));
    };

    // Handle reference field changes
    const handleReferenceChange = (index, field, value) => {
        const updatedReferences = [...formData.references];
        updatedReferences[index][field] = value;
        setFormData((prev) => ({
            ...prev,
            references: updatedReferences,
        }));
    };

    // Handle removing a reference
    const removeReference = (index) => {
        const updatedReferences = [...formData.references];
        updatedReferences.splice(index, 1);
        setFormData((prev) => ({
            ...prev,
            references: updatedReferences,
        }));
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // If Reference Program is selected, validate references
        if (formData.referenceProgram) {
            if (formData.references.length < 3) {
                toast.error("Please provide at least three references.");
                return;
            }

            if (!validateReferences()) {
                return;
            }
        }

        // If no reference program is selected, there are no reference checks needed
        // if (!formData.referenceProgram && formData.references.length > 0) {
        //     toast.error("Please untick 'Join our Trusted Reference Program' if no references are provided.");
        //     return;
        // }

        setIsLoading(true);
        try {
            const response = await securePostData("api/provider/create-feature", formData);

            if (response.status) {
                toast.success("Features saved successfully!");
                if(profileData.status=="live" || profileData?.status=='cdraft'){
                    navigate("/provider/dashboard");
                }else{
                    navigate("/provider/profile");
                }
            } else {
                toast.error(response.data.message || "Something went wrong.");
            }
        } catch (error) {
            toast.error("Server error, please try again later.", error);
        } finally {
            setIsLoading(false);
        }
    };

    const validateReferences = () => {
        let isValid = true;
        formData.references.forEach((ref, index) => {
            if (!ref.name.trim()) {
                toast.error(`Reference ${index + 1}: Name is required`);
                isValid = false;
            }
            if (!ref.relationship.trim()) {
                toast.error(`Reference ${index + 1}: Relationship is required`);
                isValid = false;
            }
            if (!ref.workTogether.trim()) {
                toast.error(`Reference ${index + 1}: Work together field is required`);
                isValid = false;
            }
            if (!ref.contact.trim()) {
                toast.error(`Reference ${index + 1}: Contact is required`);
                isValid = false;
            }
        });

        return isValid;
    };
    const setConnectionValues = (values) => {
        setFormData((prevData) => ({
            ...prevData,
            connection: values,
        }));
    };
    async function getUserFeature() {
        try {
            const result = await getSecureApiData(`api/provider/get-feature/${userId}`)
            if (result.status) {
                const data = result.data;
                const connection=data?.connection || []

                setFormData({
                    ...data,
                    connection:connection?.length>0? connection?.map((conn) => conn.userId._id) :[], // ✅ store only IDs
                });

                // ✅ set matchProfile options (so frontend can show names)
                if(connection?.length>0){
                     const fData=connection?.map(item=>item?.userId)
                    setMatchProfile(fData);
                }
            } else {
                goToPrevStep()
            }
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        getUserFeature()
    }, [userId])
    const fetchUserProfile = async (searchText) => {
        if (searchText.length < 2) {
            setMatchProfile([]);
            return;
        }
        try {
            setLoading(true);
            const result = await getApiData(`api/users/search-profile/${searchText}?role=provider`);
            if (result.success) {
                setMatchProfile(result.profileUsers);
            } else {
                setMatchProfile([]);
            }
        } catch (error) {
            console.error(error);
            setMatchProfile([]);
        } finally {
            setLoading(false);
        }
    };
    //     useEffect(() => {
    //   if (formData?.connection?.length >0) {
    //     fetchUserProfile(); // load names for saved IDs
    //   }
    // }, [formData?.connection]);


    return (
        <form onSubmit={handleSubmit}>
            <div className="marketing-sec">

                <div className="row marketing-border-btm py-4 ">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <p className="step-para">Enhance Your Profile and Connect with More Clients Using These Exciting Features</p>
                        {/* <p className="step-para">
                            Provide at least three references who can vouch for your expertise.
                            Aligned with Wizbizla’s verification-focused platform, we validate
                            these references and, on request, share them with customers – enhancing your credibility, authenticity, and trust across the platform.
                        </p> */}
                    </div>
                </div>
                <div className="row marketing-border-btm py-4 border-0">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <h5>Recommendations</h5>

                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-check">
                            <input
                                className="form-check-input custom-checkbox "
                                type="checkbox"
                                id="recommendations"
                                name="recommendations"
                                checked={formData.recommendations}
                                onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label" htmlFor="recommendations">
                                Opt to show the number of recommendations you have received on your profile page
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row marketing-border-btm py-4 ">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <h4>Chat</h4>

                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-check">
                            <input
                                className="form-check-input custom-checkbox "
                                type="checkbox"
                                id="chatShow"
                                checked={formData.chatShow}
                                onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label" htmlFor="chatShow">
                                Opt to show the chat button on your profile page
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row marketing-border-btm py-4">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <h5>Wizbizla connections <span className="start-icon">*</span></h5>
                        <p>Link this profile to other profiles within Wizbizla</p>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 wiz-connect">
                        <div className="custom-frm-bx">
                            <label>Enter Name <span className="start-icon ">*</span></label>
                            <Select
                                mode="multiple"
                                showSearch
                                allowClear
                                className="w-100 multi-service-select"
                                placeholder="Search and select user"
                                value={formData.connection}   // ✅ IDs here
                                onChange={setConnectionValues}
                                filterOption={false}
                                onSearch={fetchUserProfile}
                                notFoundContent={loading ? <Spin size="small" /> : "No users found"}
                                options={matchProfile.map((user) => ({
                                    label: `${user.firstName} ${user?.lastName}`, // ✅ display name
                                    value: user._id, // ✅ backend receives ID
                                }))}
                            />

                            {/* <Select
                                mode="tags" 
                                allowClear
                                className="w-100 multi-service-select"
                                placeholder="Select or type name"
                                value={formData.connection}
                                onChange={setConnectionValues}
                                // options={connectionOptions}
                                // optional: disable based on some condition
                                disabled={false}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="business-submt-btn d-flex justify-content-between">
                <div>
                    <button
                        type="button"

                        className="btn  mt-4 btn-prev btn-prev-second"
                        onClick={goToPrevStep}
                    >
                        Previous Step
                    </button>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary mt-4 btn-next" disabled={isLoading}>
                        {isLoading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FeaturesForm;

