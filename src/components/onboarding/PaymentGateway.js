import React, { useEffect, useState } from 'react'
import images from '../../assets/images'
import { Link, useNavigate } from 'react-router-dom';
import { handleChange } from '../../utils/GlobalFunction';
import { toast } from 'react-toastify';
import { securePostData } from '../../services/api';
import { Modal } from 'bootstrap';
import ReactIntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import Loader from '../../layout/Loader';

function PaymentGateway() {
    const [loading, setLoading] = useState(false)
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()
    const [isThanq, setIsThanq] = useState(false)
    const [successTxt, setSuccessTxt] = useState('Continue registration')
    const [showPopup, setShowPopup] = useState(false);
    const [nextPage, setNextPage] = useState('/profile')
    const [showFailedPopup, setShowFailedPopup] = useState(false);
    const [membershipType, setMemberShipType] = useState('consumer')
    const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);
    const [paymentData, setPaymentData] = useState({
        email: '',
        cardInformation: {
            cardHolderName: "",
            cardNumber: "",
            expiryDate: "",
            cvv: ""
        },
        phoneNumber: "",
        zipCode: "",
        country: "united states",
    })
    const membershipData = JSON.parse(sessionStorage.getItem('membershipData'))

    useEffect(() => {
        if (!userId || !membershipData) {
            navigate('/login')
        } else {
            setMemberShipType(membershipData.type)
            setPaymentData({
                ...paymentData, userId, membershipId: membershipData.membershipId, price: membershipData?.price,
                startDate: membershipData?.startDate, endDate: membershipData?.endDate, price: membershipData?.price
            })
        }
    }, [userId])

    async function handlePay() {
        if (paymentData.cardInformation.cvv == '') {
            toast.error('Please fill in CVC field')
            return
        }
        if (paymentData.cardInformation.expiryDate == '') {
            toast.error('Please fill in expiry date field')
            return
        }
        setLoading(true)
        try {
            if ("true" === sessionStorage.getItem('providerMembership')) {
                setNextPage('/provider/dashboard')
                sessionStorage.removeItem('providerMembership')
                const result = await securePostData('api/users/upgrade-membership', paymentData)
                if (result.status) {
                    setSuccessTxt('Continue')
                    toast.success('Membership Purchased')
                    const modalElement = document.getElementById('exampleModal');
                    const bsModal = new Modal(modalElement); // 👈 Create a Bootstrap modal instance
                    bsModal.show();

                } else {
                    toast.error(result.message)
                    const modalElement = document.getElementById('failModal');
                    const bsModal = new Modal(modalElement); // 👈 Create a Bootstrap modal instance
                    bsModal.show();
                }
            } else if ("true" === sessionStorage.getItem('renewMembership')) {
                setNextPage('/provider/dashboard')
                sessionStorage.removeItem('renewMembership')
                const result = await securePostData('api/users/buy-membership', paymentData)
                if (result.status) {
                    setSuccessTxt('Continue')
                    toast.success('Membership Purchased')
                    const modalElement = document.getElementById('exampleModal');
                    const bsModal = new Modal(modalElement); // 👈 Create a Bootstrap modal instance
                    bsModal.show();

                } else {
                    toast.error(result.message)
                    const modalElement = document.getElementById('failModal');
                    const bsModal = new Modal(modalElement); // 👈 Create a Bootstrap modal instance
                    bsModal.show();
                }
            }else if ("true" === sessionStorage.getItem('consumerMembership')) {
                setNextPage('/consumer/dashboard')
                sessionStorage.removeItem('consumerMembership')
                const result = await securePostData('api/users/upgrade-membership', paymentData)
                if (result.status) {
                    toast.success('Membership Purchased')
                    const modalElement = document.getElementById('exampleModal');
                    const bsModal = new Modal(modalElement); // 👈 Create a Bootstrap modal instance
                    bsModal.show();

                } else {
                    toast.error(result.message)
                    const modalElement = document.getElementById('failModal');
                    const bsModal = new Modal(modalElement); // 👈 Create a Bootstrap modal instance
                    bsModal.show();
                }
            } else {
                const result = await securePostData('api/users/buy-membership', paymentData)
                if (result.status) {
                    if("true" === sessionStorage.getItem('renewMembership')){
                        setNextPage('/provider/dashboard')
                    }
                    else if (result.isGold && membershipType == 'provider') {
                        setNextPage('/vip')
                    }
                    toast.success('Membership Purchased')
                    if(sessionStorage.getItem('consumerMembership')){
                        sessionStorage.removeItem('consumerMembership')
                        setNextPage('/consumer/dashboard')
                    }
                    else if (membershipType == 'consumer') {
                        setNextPage('/consumer/profile')
                    }
                    const modalElement = document.getElementById('exampleModal');
                    const bsModal = new Modal(modalElement); // 👈 Create a Bootstrap modal instance
                    bsModal.show();

                } else {
                    toast.error(result.message)
                    const modalElement = document.getElementById('failModal');
                    const bsModal = new Modal(modalElement); // 👈 Create a Bootstrap modal instance
                    bsModal.show();
                }
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            {loading && <Loader />}
            <section className="payment-gateway-sec poup-sec-box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 d-grid align-content-between">
                            <div className="top-payment-sec">
                                <div className="d-flex justify-content-start back-arrow-btn align-items-center mb-3">
                                    <span className="me-2" >
                                        <button onClick={() => navigate(-1)} style={{ color: "grey" }}>
                                            <i className="fa-solid fa-arrow-left" />
                                        </button>
                                    </span>
                                    <div className="payment-compy-logo me-2">
                                        <img src={images.compLtdIcon} alt="" />
                                    </div>
                                    {/* <span className="comp-title">Company LTD</span> */}
                                </div>
                                <div className=" ms-4 ps-2 business-pro-pay mt-lg-4 mt-sm-0">
                                    <span>{membershipData?.name}</span>
                                    <h2>AED {membershipData?.price}</h2>
                                </div>
                            </div>
                            <div className="bottom-payment-sec d-lg-block d-md-none d-sm-none">
                                <ul>
                                    <li className="right-slash position-relative">
                                        <a href="javascript:void(0)">
                                            Powered by <img src={images.stripePayLog} alt="" />{" "}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">Terms</a>
                                    </li>
                                    <li>
                                        <a href="">Privacy</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 mt-lg-5 mt-sm-2">
                            <form action="" id="signupForm">
                                <div className="custom-frm-bx custom-payment-inpt-box mt-lg-3 mt-sm-0">
                                    <label htmlFor="">Email</label>
                                    <input
                                        type="email"
                                        name='email'
                                        value={paymentData?.email}
                                        className="form-control"
                                        onChange={handleChange(setPaymentData)}
                                        placeholder=""
                                        defaultValue=""
                                    />
                                </div>
                                <div className="custom-frm-bx custom-payment-inpt-box">
                                    <label htmlFor="">Card information</label>
                                    <input
                                        type="number"
                                        name='cardNumber'
                                        value={paymentData?.cardInformation?.cardNumber}
                                        onChange={(e) =>
                                            setPaymentData((prev) => ({
                                                ...prev,
                                                cardInformation: {
                                                    ...prev.cardInformation,
                                                    cardNumber: e.target.value
                                                }
                                            }))
                                        }
                                        className="form-control paymnt-conrtol"
                                        placeholder="1234 1234 1234 1234"
                                        defaultValue=""
                                    />
                                    <div className="card-payment-logo d-flex justify-content-end">
                                        <ul className="d-flex justify-content-end gap-1">
                                            <li>
                                                <img src={images.payVisa} alt="" />
                                            </li>
                                            <li>
                                                <img src={images.payMaster} alt="" />
                                            </li>
                                            <li>
                                                <img src={images.payAme} alt="" />
                                            </li>
                                            <li>
                                                <img src={images.payJcb} alt="" />
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="card-details d-flex   position-relative">
                                        <input
                                            type="text"
                                            name="expiryDate"
                                            value={paymentData?.cardInformation?.expiryDate || ''}
                                            onChange={(e) => {
                                                let input = e.target.value.replace(/\D/g, ''); // Remove non-digits

                                                // Limit input to 4 digits max (MMYY)
                                                if (input.length > 4) {
                                                    input = input.slice(0, 4);
                                                }

                                                // Validate month (first two digits)
                                                if (input.length >= 2) {
                                                    let month = input.slice(0, 2);
                                                    if (parseInt(month, 10) > 12) {
                                                        month = '12';
                                                    }
                                                    let year = input.slice(2, 4);
                                                    input = month + (year ? ' / ' + year : '');
                                                }

                                                setPaymentData((prev) => ({
                                                    ...prev,
                                                    cardInformation: {
                                                        ...prev.cardInformation,
                                                        expiryDate: input
                                                    }
                                                }));
                                            }}
                                            maxLength={7} // MM / YY (7 characters including slash and spaces)
                                            className="form-control w-lg-50 w-sm-100 paymnt-conrtol-first"
                                            placeholder="MM / YY"
                                        />


                                        <input
                                            type="number"
                                            className="form-control paymnt-conrtol-secnd"
                                            placeholder="CVC"
                                            defaultValue=""
                                            name='cvv'
                                            value={paymentData?.cardInformation?.cvv}
                                            onChange={(e) =>
                                                setPaymentData((prev) => ({
                                                    ...prev,
                                                    cardInformation: {
                                                        ...prev.cardInformation,
                                                        cvv: e.target.value
                                                    }
                                                }))
                                            }
                                        />
                                        <div className="cvc-image-box">
                                            <img src={images.payCvc} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="custom-frm-bx custom-payment-inpt-box">
                                    <label htmlFor="">Cardholder name</label>
                                    <input
                                        type="text"
                                        name='cardHolderName'
                                        value={paymentData?.cardInformation?.cardHolderName}
                                        onChange={(e) =>
                                            setPaymentData((prev) => ({
                                                ...prev,
                                                cardInformation: {
                                                    ...prev.cardInformation,
                                                    cardHolderName: e.target.value
                                                }
                                            }))
                                        }
                                        className="form-control "
                                        placeholder="Full name on card"
                                        defaultValue=""
                                    />
                                </div>
                                <div className="custom-frm-bx custom-payment-inpt-box">
                                    <label htmlFor="">Country or region</label>
                                    <select className="form-select paymnt-conrtol" aria-label="Default select example" name='country'
                                        value={paymentData?.country}
                                        onChange={(e) =>
                                            setPaymentData((prev) => ({
                                                ...prev,
                                                country: e.target.value

                                            }))
                                        }>
                                        <option selected="" value='united states'>United States</option>
                                        <option value='india'>India</option>
                                        <option value='usa'>USA</option>
                                        <option value='uk'>UK</option>
                                    </select>
                                    <input
                                        type="number"
                                        min={0}
                                        className="form-control paymnt-conrtol-thrd"
                                        placeholder="ZIP"
                                        name='zipCode'
                                        value={paymentData?.zipCode}
                                        onChange={(e) =>
                                            setPaymentData((prev) => ({
                                                ...prev,
                                                zipCode: e.target.value

                                            }))
                                        }
                                        defaultValue=""
                                    />
                                </div>
                                <div>
                                    <div className="card shadow-sm border rounded-4">
                                        <div className="p-3">
                                            <h6 className="fw-semibold mb-1">
                                                Securely save my information for 1-click checkout
                                            </h6>
                                            <p className="text-muted mb-3 small">
                                                Enter your phone number to create a Link account and pay
                                                faster on LEADER ADS LTD and everywhere Link is accepted.
                                            </p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between border-top p-2">
                                            {/*
                                          <input
                                            id="phone"
                                            type="number"
                                            className="form-control border-0 shadow-none"
                                            placeholder="(201) 555-0123"
                                            name='phoneNumber'
                                            value={paymentData?.phoneNumber}
                                            onChange={(e) =>
                                                setPaymentData((prev) => ({
                                                    ...prev,
                                                    phoneNumber: e.target.value
                                                }))
                                            }
                                        />

                                        */}
                                            <ReactIntlTelInput
                                                preferredCountries={['us', 'gb', 'in']}
                                                value={paymentData.phoneNumber}
                                                className="form-control border-0 shadow-none pay-coutry-list"
                                                id="phone"
                                                placeholder="(201) 555-0123"
                                                onPhoneNumberChange={(status, value, countryData, number, id) => {
                                                    setPaymentData({ ...paymentData, phoneNumber: value });
                                                }}
                                                inputProps={{
                                                    name: 'phone',
                                                    required: true,
                                                }}
                                                containerClassName="intl-tel-input"
                                                fieldId="phone"
                                            />
                                            <span className="badge bg-light border text-muted ms-2">
                                                Optional
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="pay-bottom-sec">
                                    <ul>
                                        <li className="my-3 text-center">
                                            <a href="">
                                                <img src={images.payLinkLogo} alt="" />
                                            </a>
                                        </li>
                                        <li style={{ listStyleType: "disc !important" }} className="ms-3">
                                            <a href="">More info</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="payment-gateway-btn new-pass-btn d-flex my-4">
                                    <button
                                        type="button"
                                        onClick={() => handlePay()}
                                        className="btn btn-primary w-100"
                                    // data-bs-toggle="modal"
                                    // data-bs-target="#exampleModal"
                                    >
                                        Pay
                                    </button>
                                </div>
                                <div className="bottom-payment-sec bottom-payment-gateway-sec d-lg-none d-md-block d-sm-block mt-4">
                                    <ul className="">
                                        <li className="right-slash position-relative">
                                            <a href="javascript:void(0)">
                                                Powered by{" "}
                                                <img src={images.stripePayLog} alt="" />{" "}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="">Terms</a>
                                        </li>
                                        <li>
                                            <a href="">Privacy</a>
                                        </li>
                                    </ul>
                                </div>
                            </form>
                        </div>
                        <div
                            className="popup-bg-sec-shape poup-sec-box modal fade "
                            id="exampleModal"
                            tabIndex={-1}
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                            data-bs-backdrop="static"
                            data-bs-keyboard="false"

                        >
                            <div className="modal-dialog modal-dialog-centered z-3">
                                <div className="modal-content text-center z-3">
                                    <div className="modal-body pay-shape py-5">

                                        <div className="" id="popupBox">
                                            <h3>Thank you for your purchase</h3>
                                            {membershipData?.type == 'consumer' ?
                                                <>
                                                    <p>5 Bespoke Concierge Tokens will be added to your account each month, starting from (insert date).

                                                    </p>
                                                    <div className="popup-registration-btns new-pass-btn">
                                                        <button onClick={()=>navigate(nextPage)} data-bs-dismiss="modal" className="btn-filled-registration btn w-100">
                                                            Redeem a Token
                                                        </button>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <p>
                                                        <span>Membership Tier: </span> Signature  <br/>
                                                        Programme
                                                    </p>
                                                    <p>
                                                        <span>Add-ons: </span> Reference Program
                                                    </p>
                                                    <div className="new-pass-btn popup-btn">
                                                        <button
                                                            // to={nextPage}
                                                            onClick={() => navigate(nextPage)}
                                                            id="closePopup"
                                                            // data-bs-toggle="modal"
                                                            // data-bs-target="#failModal"
                                                            data-bs-dismiss="modal"
                                                            className="btn"
                                                            style={{ marginTop: 15 }}
                                                        >
                                                            {successTxt}
                                                        </button>
                                                    </div>
                                                </>}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Failed */}
                        <div
                            className="popup-bg-sec-shape poup-sec-box modal fade "
                            id="failModal"
                            tabIndex={-1}
                            aria-labelledby="failModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog modal-dialog-centered z-3">
                                <div className="modal-content   text-center z-3">
                                    <div className="modal-body pay-shape py-5">
                                        <h3>Payment Failed!</h3>
                                        <p className='mb-5'>
                                            Unfortunately, your payment didn't go through. Please try again,
                                            ensure all fields are entered correctly, or contact Wizbizla
                                            directly, and we'll assist you manually!
                                        </p>
                                        <div className="popup-failed-btns ">
                                            <a
                                                href="#"
                                                className="btn-outline-failed btn"
                                                onclick="showRegistrationPopup();"
                                                data-bs-toggle="modal"
                                                data-bs-target="#registerModal"
                                            >
                                                Contact Support
                                            </a>
                                            <a href="#" className="btn-filled-failed btn" data-bs-dismiss="modal">
                                                Try Again
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Registration */}
                        <div
                            className="popup-bg-sec-shape poup-sec-box modal fade "
                            id="registerModal"
                            tabIndex={-1}
                            aria-labelledby="registerModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog modal-dialog-centered z-3">
                                <div className="modal-content px-4  text-center  z-3">
                                    <div className="modal-body pay-shape py-5">
                                        <h3 className='fs-2'>
                                            Complete Registration
                                            <br />
                                            and Submit to admin for accreditation
                                        </h3>
                                        <p className='mb-3'>
                                            Please note that we operate on a <span>3-working day</span>{" "}
                                            service level, and your documentation will be processed within
                                            this timeframe.
                                        </p>
                                        <div className="popup-registration-btns new-pass-btn">
                                            <a href="#" className="btn-filled-registration btn w-100">
                                                Send
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default PaymentGateway
