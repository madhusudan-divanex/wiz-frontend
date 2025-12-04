import React, { useEffect } from 'react'
import { securePostData, updateApiData } from '../../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../../redux/features/userSlice';
function Setting() {
    const navigate = useNavigate()
    const dispatch =useDispatch()
    const [yesDelete, setYesDelete] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const userId = localStorage.getItem('userId');
    const [reason, setReason] = React.useState('')
    const {userData,profileData}=useSelector(state=>state.user)
    const [passwordForm, setPasswordForm] = React.useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = React.useState({
        old: false,
        new: false,
        confirm: false
    });
    const chagnePassword = async (e) => {
        e.preventDefault();
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast.error("New Password and Confirm Password do not match");
            return;
        }
        if (!passwordForm.oldPassword) {
            toast.error("Please enter your current password");
            return;
        }
        if ((passwordForm.newPassword || '').length < 6) {
            toast.error("New password must be at least 6 characters");
            return;
        }
        try {
            // replace '/change-password' with the real endpoint if different
            const payload = {
                userId,
                oldPassword: passwordForm.oldPassword,
                newPassword: passwordForm.newPassword
            }
            const response = await securePostData('api/auth/change-password', payload)
            if (response.status) {
                //password changed successfully
                toast.success("Password changed successfully");
                setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                toast.error(response.message || "Failed to change password");
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.message || 'An error occurred while changing password');
        }
        //logic to change password
    }
    const changeEmail = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter a valid email address");
            return;
        }
        try {
            const response = await updateApiData('api/auth/update-user', { userId, email })
            if (response.status) {
                dispatch(fetchUserProfile())
                toast.success("Email changed successfully");
            } else {
                toast.error(response.message || "Failed to change email");
            }
        } catch (error) {
            toast.error(error?.message || 'An error occurred while changing email');
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
    useEffect(()=>{
        setEmail(profileData.email)
    },[profileData])
    return (
        <>
            <div className="main-section posting-histry-sec flex-grow-1">
                <div className="row dash-profile-overflow posting-histry-main-box pt-4 p-0 setting-sec mx-lg-2 mx-sm-0">
                    <div className="d-lg-none d-md-block">
                        <a href="#" className='mb-mobile-btn'>
                            <i className="fa-solid fa-angle-left" />
                            Back
                        </a>
                    </div>
                    <div className="posting-hist-btn-bx d-flex justify-content-between align-items-center mb-2">
                        <h2 className='fz-32 fw-600 mb-3'>Settings</h2>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="main-profile-sec dash-profile-sec">
                            <div className="main-profile-sec">
                                <h3 className='mb-3'>Change Password</h3>
                                <ul>
                                    <li className="divider" />
                                </ul>
                            </div>
                            <div className="posting-history-crd-box">
                                <form className="row" onSubmit={chagnePassword}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="custom-frm-bx position-relative">
                                            <label htmlFor="">
                                                Old Password <span className="start-icon">*</span>
                                            </label>
                                            <input
                                                type={showPassword.old ? 'text' : 'password'}
                                                className="form-control"
                                                placeholder=""
                                                value={passwordForm.oldPassword}
                                                onChange={(ev) => setPasswordForm(prev => ({ ...prev, oldPassword: ev.target.value }))}
                                            />
                                            <button type="button" className="btn  p-0 position-absolute" style={{ right: 10, top: 36 }} 
                                            onClick={() => setShowPassword(prev => ({ ...prev, old: !prev.old }))}>
                                                <i className={`fa-regular ${showPassword.old ? 'fa-eye' : 'fa-eye-slash'} setting-pass-eye`} />
                                            </button>
                                        </div>
                                        <div className="custom-frm-bx position-relative">
                                            <label htmlFor="">
                                                New Password <span className="start-icon">*</span>
                                            </label>
                                            <input
                                                type={showPassword.new ? 'text' : 'password'}
                                                className="form-control"
                                                placeholder="QWERTY123"
                                                value={passwordForm.newPassword}
                                                onChange={(ev) => setPasswordForm(prev => ({ ...prev, newPassword: ev.target.value }))}
                                            />
                                            <button type="button" className="btn  p-0 position-absolute" style={{ right: 10, top: 36 }} onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}>
                                                <i className={`fa-regular ${showPassword.new ? 'fa-eye' : 'fa-eye-slash'} setting-pass-eye`} />
                                            </button>
                                        </div>
                                        <div className="custom-frm-bx position-relative">
                                            <label htmlFor="">
                                                Confirm Password <span className="start-icon">*</span>
                                            </label>
                                            <input
                                                type={showPassword.confirm ? 'text' : 'password'}
                                                className="form-control"
                                                placeholder="QWERTY123"
                                                value={passwordForm.confirmPassword}
                                                onChange={(ev) => setPasswordForm(prev => ({ ...prev, confirmPassword: ev.target.value }))}
                                            />
                                            <button type="button" className="btn  p-0 position-absolute" style={{ right: 10, top: 36 }} onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}>
                                                <i className={`fa-regular ${showPassword.confirm ? 'fa-eye' : 'fa-eye-slash'} setting-pass-eye`} />
                                            </button>
                                        </div>
                                        <div className="rating-usr-toggle-bx">
                                            <button
                                                type="submit"
                                                className="btn btn-primary setting-btn"
                                                style={{ textDecoration: "none !important" }}
                                            >
                                                Change Password
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="main-profile-sec dash-profile-sec chnge-setting-bx">
                            <div className="main-profile-sec">
                                <h3 className='mb-3'>Change Email Address</h3>
                                <ul>
                                    <li className="divider" />
                                </ul>
                            </div>
                            <div className="posting-history-crd-box">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="custom-frm-bx">
                                            <label htmlFor="">
                                                Email Address <span className="start-icon">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="form-control"
                                                placeholder="Enter new Email Address"
                                                defaultValue=""
                                            />
                                        </div>
                                        <div className="rating-usr-toggle-bx">
                                            <button
                                                type="button"
                                                onClick={changeEmail}
                                                className="btn btn-primary setting-btn"
                                                style={{ textDecoration: "none !important" }}
                                            >
                                                Update Email
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="main-profile-sec dash-profile-sec mt-4 delete-my-account-box">
                            <div className="main-profile-sec">
                                <h3 className='mb-3'>Account Deactivation</h3>
                                <ul>
                                    <li className="divider" />
                                </ul>
                            </div>
                            <div className="posting-history-crd-box">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="rating-usr-toggle-bx">
                                            <button
                                                type="button" className="btn btn-primary setting-btn delete-my-acc-btn"
                                                data-bs-toggle="modal" data-bs-target="#deleteModal"
                                            >
                                                Delete My Account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
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
                                                        onChange={() => setYesDelete(false)}
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
                                            onChange={(e)=>setReason(e.target.value)}
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
                    <div class="modal fade" id="finalModal" tabindex="-1" aria-labelledby="finalModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content modal-content-secnd">
                                <div className="modal-body text-center p-0">
                                    <div className="modal-header align-items-baseline p-0">
                                        <h5 className="modal-title">
                                            Your account has been deactivated.
                                        </h5>
                                        {/* <a
                                            href="#"
                                            className="mdal-clse-btn btn-close"
                                            data-bs-dismiss="modal"
                                        >
                                            <i className="fa-solid fa-xmark" />
                                        </a> */}
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

        </>
    )
}

export default Setting
