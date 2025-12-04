import React, { useState, useEffect } from 'react';
import images from '../../assets/images';
import IntroduceWizbizla from '../../layout/IntroduceWizbizla';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postApiData } from '../../services/api';
import Loader from '../../layout/Loader';

function SetPassword() {
  const [loading,setLoading]=useState(false)
  const params=useParams()
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    minChar: false,
    specialChar: false,
  });

  const { password, confirmPassword, minChar, specialChar } = formData;

  // Update checkbox flags automatically when password changes
  useEffect(() => {
    const hasMinChar = password.length >= 8;
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    setFormData((prev) => ({
      ...prev,
      minChar: hasMinChar,
      specialChar: hasSpecialChar,
    }));
  }, [password]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!minChar || !specialChar) {
      toast.error('Password must meet all requirements.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    setLoading(true)

    // Submit or navigate
    const data={...formData,userId:params.id}
    try {
      const result=await postApiData('api/auth/reset-password',data)
      if(result.status){
        toast.success("Password reset successfully !")
        navigate('/password-reset');

      }else{
        toast.error(result.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  return (
     <>
        {loading&&<Loader/> }
    <section className="set-new-pass-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 mb-4 d-flex flex-column justify-content-center pe-lg-5 pe-sm-0">
            <form onSubmit={handleSubmit} className="">
              <div className="set-new-pass-title">
                <div className="otp-pass-pic">
                  <img src={images.setNewPass} alt="Set new password" />
                </div>
              <div className='my-3'>
                 <h2 className="mt-3 text-center fw-semibold">Set new password</h2>
                <p className="text-center">
                  Your new password must be different from previously used passwords.
                </p>
              </div>
              </div>

              {/* Password Input */}
              <div className="custom-frm-bx">
                <label htmlFor="password">
                  Password <span className="start-icon">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="********"
                  value={password}
                  onChange={handleInputChange}
                />
              </div>

              {/* Confirm Password Input */}
              <div className="custom-frm-bx">
                <label htmlFor="confirmPassword">
                  Confirm password <span className="start-icon">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="form-control"
                  placeholder="********"
                  value={confirmPassword}
                  onChange={handleInputChange}
                />
              </div>

              {/* Validation Checkboxes */}
              <div className="form-check custom-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="checkMinChar"
                  checked={minChar}
                  readOnly
                />
                <label className="form-check-label" htmlFor="checkMinChar">
                  Must be at least 8 characters
                </label>
              </div>

              <div className="form-check custom-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="checkSpecialChar"
                  checked={specialChar}
                  readOnly
                />
                <label className="form-check-label" htmlFor="checkSpecialChar">
                  Must contain one special character
                </label>
              </div>

              {/* Submit Button */}
              <div className="new-pass-btn d-flex justify-content-center my-4 ">
                <button type="submit" className="frm-main-btn w-100">
                  Reset password
                </button>
              </div>

                {/* Back to login */}
            <div className="d-flex justify-content-center back-arrow-btn">
              <span>
                <Link to="/login">
                  <i className="fa-solid fa-arrow-left" /> Back to log in
                </Link>
              </span>
            </div>

            </form>

          
          </div>

          {/* Right Side Image/Intro */}
          <div className="col-lg-6 col-md-6 col-sm-12 px-0">
            <IntroduceWizbizla />
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default SetPassword;
