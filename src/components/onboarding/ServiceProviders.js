import React, { useState, useEffect } from 'react';
import images from '../../assets/images';
import IntroduceWizbizla from '../../layout/IntroduceWizbizla';
import { useNavigate, useSearchParams } from 'react-router-dom';

function ServiceProviders() {
    const navigate=useNavigate()
    const [searchParams]=useSearchParams()
    const referedBy=searchParams.get('invite')
    const [selectedUserType, setSelectedUserType] = useState('');

    // Load previously selected type from sessionStorage (optional)
    useEffect(() => {
        const savedType = sessionStorage.getItem('userType');
        if (savedType) {
            setSelectedUserType(savedType);
        }
    }, []);

    const handleSelect = (type) => {
        setSelectedUserType(type);
        sessionStorage.setItem('userType', type); // or use localStorage
    };
    async function handleSignIn() {
        if (!selectedUserType) {
            alert('Please select a user type before proceeding.');
        } else {
            if(referedBy){
                localStorage.setItem('referedBy',referedBy)
            }
            // Navigate or submit logic here
            navigate('/sign-up')
        }
    }

    return (
        <section className="onboarding-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-4 d-flex flex-column justify-content-center pe-lg-5 pe-sm-0">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="form-check-card mb-3 position-relative ">
                                    <div className="form-check form-check-first srvice-provide-bx">
                              <div className="onboarding-title p-0 m-0  m-sm-0">
                            <h2 className="mt-3 text-center fw-semibold px-lg-0 px-md-0">
                                Wizbizla is personalized for you.
                            </h2>
                            <p className="text-center">Select the user type</p>
                        </div>

                                        <input
                                            className="form-check-input form-chk-inpt styled-check d-none"
                                            type="checkbox"
                                            id="consumerCheck"
                                            name="userType"
                                            checked={selectedUserType === 'consumer'}
                                            onChange={() => handleSelect('consumer')}
                                        />
                                        <label className="form-check-label card-style" htmlFor="consumerCheck">
                                            <div className="d-flex">
                                                <div className="icon-box me-3">
                                                    <img src={images.onboardingFirst} alt="" />
                                                </div>
                                                <div>
                                                    <h5 className="mb-2 fw-semibold">Users</h5>
                                                    <p className="mb-0 small text-muted">
                                                        I’d like to meet and connect with service providers on the  Wizbizla platform
                                                    </p>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                            
                                <div className="form-check-card position-relative">
                                    <div className="form-check form-check-first srvice-provide-bx">
                                        <input
                                            className="form-check-input form-chk-inpt styled-check d-none"
                                            type="checkbox"
                                            id="providerCheck"
                                            name="userType"
                                            checked={selectedUserType === 'provider'}
                                            onChange={() => handleSelect('provider')}
                                        />
                                        <label className="form-check-label card-style" htmlFor="providerCheck">
                                            <div className="d-flex">
                                                <div className="icon-box me-3">
                                                    <img src={images.onboardingFirst} alt="" />
                                                </div>
                                                <div>
                                                    <h5 className="mb-2 fw-semibold">Service Providers</h5>
                                                    <p className="mb-0 small text-muted">
                                                        I’d like to showcase my services to potential customers on the  Wizbizla platform
                                                    </p>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="onboarding-btn my-4">
                            <button
                                className="btn btn-primary w-100"
                                onClick={() => handleSignIn()}
                            >
                                Continue
                            </button>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 px-0">
                        <IntroduceWizbizla />

                       

                    </div>
                </div>
            </div>
        </section>
    );
}

export default ServiceProviders;
