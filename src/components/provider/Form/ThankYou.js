import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ThankYou = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem("token");
        const handleBackButton = (e) => {
            e.preventDefault();
            navigate("/", { replace: true });
        };
        window.history.pushState(null, null, window.location.href);
        window.addEventListener('popstate', handleBackButton);
        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, [navigate]);
    return (
        <section className="thank-you-section content-sec thank-sec-second">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-sm-12">
                        <div className="text-center thank-you-content">
                            <h4 className="">
                                Thank You
                            </h4>
                            <p>You preferences have been saved successfully.<br />

                                We appreciate your time and effort! </p>

                            <h5>Thank you for joining the Wizbizla Marketplace.</h5>
                            <p>By submitting, you confirm that all information provided is accurate and complete. Any incorrect or incomplete details may delay onboarding.</p>
                            <p>We'll optimise your Business Profile for effective lead generation and contact you if further details are required. Once approved and our platform is LIVE, you'll receive your login details.
                                <br /> For assistance, email <span><a href="hello@wizbizla.com">hello@wizbizla.com</a>.</span></p>

                            <div className="mt-2">
                                <Link to='https://wizbizla.com/' target="blank" className="btn btn-primary thank-you-btn">Go to Wizbizla</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ThankYou;
