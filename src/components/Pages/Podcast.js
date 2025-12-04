import React, { useState } from 'react'
import images from '../../assets/images'
import { postApiData } from '../../services/api'
import { toast } from 'react-toastify'
import { Modal } from 'bootstrap'
import { Link } from 'react-router-dom'

function Podcast() {
    const [isMsg, setIsMsg] = useState(false)
    const [micForm, setMicForm] = useState({ name: "", email: "", topic: "", message: "" })
    const [formData, setFormData] = useState({ name: "", email: "", country: "" })
    async function subscribePodcast(e) {
        e.preventDefault()
        if (formData.email == '' || formData.name == '' || formData.country == "") {
            toast.error("Please fill all fields")
            return
        }
        try {
            const result = await postApiData('api/users/podcast-subscribe', formData)
            if (result.success) {
                setIsMsg(true)
                setFormData({ name: "", email: "", country: "" })
                setTimeout(() => {
                    setIsMsg(false)
                }, 5000)
            } else {
                toast.error(result.message)
            }
        } catch (error) {

        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleMicChange = (e) => {
        const { name, value } = e.target;
        setMicForm((prev) => ({ ...prev, [name]: value }));
    };
    async function micSubmit(e) {
        e.preventDefault()
        if (micForm.email == '' || micForm.name == '' || micForm.message == "" || micForm.topic == "") {
            toast.error("Please fill all fields")
            return
        }
        try {
            const result = await postApiData('share-mic', micForm)
            if (result.success) {
                toast.success("A member of the Wizbizla team will contact you shortly.")
                const modalEl = document.getElementById('join-modal');
                const modal = Modal.getInstance(modalEl);
                modal.hide();
                document.body.classList.remove('modal-open');
                document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
                setMicForm({ name: "", email: "", message: "", topic: "" })

            } else {
                toast.error(result.message)
            }
        } catch (error) {

        }
    }
    return (
        <>
            <section className="padcast-bnnr">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 order-2 order-lg-1">
                            <div className="padcast-bnnr-content">
                                <h6>Hosted by Amber Waheed</h6>
                                <img
                                    src={images?.dubaiLogo}
                                    className="podcast-logo"
                                    alt=""
                                />
                                <p>
                                    <img src="assets/images/signature.svg" alt="" />
                                    Author of The Great Fraud Fightback
                                </p>
                                <p>
                                    <img src="assets/images/ranking.svg" alt="" />
                                    Named in the top 10 rankings of 2023 by Apple
                                </p>
                                <p>
                                    <img src="assets/images/flash.svg" alt="" />
                                    Powered by Wizbizla
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-5 order-1 order-lg-2">
                            <div className="padcast-bnnr-img">
                                <img src={images?.podBanner} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="partner-sec">
                <div className="container">
                    <h3>
                        Highlighting stories from across the emirate, the Expats in Dubai
                        podcast brings you the insight and knowledge you need to stay ahead of
                        scammers, thrive in business and enjoy the best of the expat lifestyle
                        safely.
                    </h3>
                    <ul className="partner-logo-list">
                        <li>
                            <img src={images?.podLogo1} alt="" />
                        </li>
                        <li>
                            <img src={images?.podLogo2} alt="" />
                        </li>
                        <li>
                            <img src={images?.podLogo3} alt="" />
                        </li>
                    </ul>
                </div>
            </section>
            <section className="podcast-commonplace tp-space">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 order-2 order-lg-1">
                            <div className="podcast-commonplace-content pe-5">
                                <h4 className="new_title">
                                    Behind the Scenes of Commonplace Confidence Fraud
                                </h4>
                                <p>
                                    Join me each week as we sit down with guests from all walks of
                                    life who are helping to combat prevalent commonplace confidence
                                    fraud in a variety of ways.
                                </p>
                                <p>
                                    From lawmakers and company leaders to famous activists, survivors
                                    and journalists, Expats in Dubai shows you just how prominent
                                    modern fraud is and that we can all do something about it.
                                </p>
                                <p>
                                    Guests also appear on the show to talk about their experience
                                    working with victims of fraud, and the supportive communities and
                                    resources available to help you along your expat journey.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6 order-1 order-lg-2">
                            <div className="podcast-commonplace-img">
                                <img src={images?.podCmnPlc1} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="row pt-100">
                        <div className="col-lg-6">
                            <div className="podcast-commonplace-img">
                                <img src={images?.podCmnPlc2} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="podcast-commonplace-content ps-5">
                                <h4 className="new_title">
                                    The True Crime Stories from the expat community
                                </h4>
                                <p>
                                    Delve into the world of expat confidence fraud through our
                                    exclusive podcast series by the Wizbizla Network.
                                </p>
                                <p>
                                    Each month, we conduct investigations into reported scams,
                                    revealing their intricacies and vulnerabilities. Understanding
                                    their methods empowers listeners to prevent future scams. Our
                                    investigations expose regulatory loopholes, systemic weaknesses,
                                    and behavioral patterns, informing robust fraud prevention
                                    measures. Stay informed with our scam alerts and expert tips,
                                    ensuring that the expat community remains vigilant and resilient
                                    in the face of deception.
                                </p>
                                <Link to="/login" className="thm-lg-btn warning">
                                    Join Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="guest-sec tp-space">
                <div className="container">
                    <h3 className="title text-center text-white mb-4">Our Guests</h3>
                    <p className="text-center text-white">
                        We've had some incredible guests on Expats in Dubai to share their
                        expertise <br /> and insight. You can listen to a portion of their
                        stories here:
                    </p>
                    <ul className="guest-img-list">
                        <li>
                            <img src={images?.podGuest1} alt="" />
                        </li>
                        <li>
                            <img src={images?.podGuest2} alt="" />
                        </li>
                        <li>
                            <img src={images?.podGuest3} alt="" />
                        </li>
                    </ul>
                </div>
            </section>
            <section className="episode-sec tp-space bg-light">
                <div className="container">
                    <h3 className="title">
                        Episodes
                        <i className="fas fa-chevron-right ms-2" />
                    </h3>
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="episode-cards">
                                <div className="episode-img">
                                    <img
                                        src={images?.scamAudioBook}
                                        alt=""
                                    />
                                </div>
                                <div className="episode-content">
                                    <img src={images?.dubaiLogo} alt="" />
                                    <h6>
                                        Job scams and employment fraud...welcome to real estate | Ep. 44
                                    </h6>
                                    <div className="episode-audio">
                                        <audio controls="">
                                            <source src={images?.scamAudio} type="audio/ogg" />
                                            <source
                                                src={images?.scamAudio3}
                                                type="audio/mpeg"
                                            />
                                        </audio>
                                        <p className="episode-text">
                                            <span>0:00</span>
                                            <span>8:24</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="episode-main">
                                <ul className="episode-list">
                                    <li>
                                        <div className="episode-list-img">
                                            <img
                                                src={images?.scamAudioBook}
                                                alt=""
                                            />
                                        </div>
                                        <p>
                                            The National with Amber Waheed offer advice on how to avoid
                                            dishonest financial advisers | Ep. 45
                                        </p>
                                    </li>
                                    <li>
                                        <div className="episode-list-img">
                                            <img
                                                src={images?.scamAudioBook}
                                                alt=""
                                            />
                                        </div>
                                        <p>
                                            The National with Amber Waheed offer advice on how to avoid
                                            dishonest financial advisers | Ep. 45
                                        </p>
                                    </li>
                                    <li>
                                        <div className="episode-list-img">
                                            <img
                                                src={images?.scamAudioBook}
                                                alt=""
                                            />
                                        </div>
                                        <p>
                                            The National with Amber Waheed offer advice on how to avoid
                                            dishonest financial advisers | Ep. 45
                                        </p>
                                    </li>
                                    <li>
                                        <div className="episode-list-img">
                                            <img
                                                src={images?.scamAudioBook}
                                                alt=""
                                            />
                                        </div>
                                        <p>
                                            The National with Amber Waheed offer advice on how to avoid
                                            dishonest financial advisers | Ep. 45
                                        </p>
                                    </li>
                                    <li>
                                        <div className="episode-list-img">
                                            <img
                                                src={images?.scamAudioBook}
                                                alt=""
                                            />
                                        </div>
                                        <p>
                                            The National with Amber Waheed offer advice on how to avoid
                                            dishonest financial advisers | Ep. 45
                                        </p>
                                    </li>
                                    <li>
                                        <div className="episode-list-img">
                                            <img
                                                src={images?.scamAudioBook}
                                                alt=""
                                            />
                                        </div>
                                        <p>
                                            The National with Amber Waheed offer advice on how to avoid
                                            dishonest financial advisers | Ep. 45
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="category-relations listeners-sec tp-space">
                <div className="container">
                    <div className="union-shape-top">
                        <img src={images?.union} alt="" />
                    </div>
                    <div className="cards-bg" />
                    <div className="custom-category">
                        <div className="row align-items-center">
                            <div className="col-lg-5">
                                <div className="custom-category-img">
                                    <img src={images?.listeners} alt="" />
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="custom-category-content">
                                    <h3 className="text-white">
                                        We are always looking for qualified experts to share your
                                        experience and expertise with our listeners.
                                    </h3>
                                    <p>
                                        Sign up on Wizbizla for the opportunity to be a guest on our
                                        podcast.
                                    </p>
                                    <a
                                        href="#"
                                        className="thm-lg-btn warning mt-4"
                                        data-bs-toggle="modal"
                                        data-bs-target="#join-modal"
                                    >
                                        Join Us Here
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div
                className="modal fade custom-modal podcast-modal"
                id="join-modal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <img
                                src={images?.dubaiLogo}
                                className="podcast-logo-02"
                                alt=""
                            />
                            <form onSubmit={micSubmit}>
                                <h3 className='text-black my-2'>Share the Mic with Us</h3>
                                <div className="custom-frm-bx">
                                    <label>
                                        Name <em>*</em>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your name"
                                        name='name'
                                        required
                                        value={micForm.name}
                                        onChange={handleMicChange}
                                    />
                                </div>

                                <div className="custom-frm-bx">
                                    <label>
                                        Email <em>*</em>
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        name='email'
                                        required
                                        value={micForm.email}
                                        onChange={handleMicChange}
                                    />
                                </div>

                                <div className="custom-frm-bx">
                                    <label>
                                        Topic <em>*</em>
                                    </label>
                                    <select className="form-select" name='topic'
                                        value={micForm.topic}
                                        onChange={handleMicChange} required>
                                        <option value="">Select Topic</option>
                                        <option value="entrepreneurship">Entrepreneurship & Startups</option>
                                        <option value="technology">Technology & Innovation</option>
                                        <option value="real-estate">Real Estate & Investment</option>
                                        <option value="travel">Travel & Lifestyle</option>
                                        <option value="health">Health & Wellness</option>
                                        <option value="career-growth">Career Growth & Personal Development</option>
                                        <option value="finance">Finance & Wealth Management</option>
                                        <option value="culture">Culture & Community Stories</option>
                                        <option value="marketing">Marketing & Branding</option>
                                        <option value="leadership">Leadership & Motivation</option>

                                    </select>
                                </div>

                                <div className="custom-frm-bx">
                                    <label>Message</label>
                                    <textarea
                                        className="form-control"
                                        defaultValue=""
                                        required
                                        name='message'
                                        value={micForm.message}
                                        onChange={handleMicChange}
                                    />
                                </div>

                                <div className="custom-frm-bx">
                                    <p>
                                        This site is protected by{" "}
                                        <a href="javascript:void(0);">reCAPTCHA</a> and the{" "}
                                        <a href="javascript:void(0);">Google Privacy Policy</a> and{" "}
                                        <a href="javascript:void(0);">Terms of Service</a> apply.
                                    </p>
                                </div>

                                <div className="custom-frm-bx buttons">
                                    <a
                                        href="javascript:void(0);"
                                        data-bs-dismiss="modal"
                                        className="thm-lg-btn warning outline"
                                    >
                                        Cancel
                                    </a>
                                    <button className="thm-lg-btn warning" type="submit">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <section className="category-relations new-episode tp-space bg-light">
                <div className="container">
                    <div className="union-shape-top">
                        <img src={images?.union} alt="" />
                    </div>
                    <div className="cards-bg" />
                    <div className="custom-category">
                        <div className="row">
                            <div className="col-lg-7 order-2 order-lg-1">
                                <div className="new-episode-frm">
                                    <img src={images?.dubaiLogo} alt="" />
                                    <h3 className="title">Get Notified when a new episode drops</h3>
                                    <form onSubmit={subscribePodcast}>
                                        <div className="custom-frm-bx">
                                            <input
                                                type="text"
                                                value={formData.name}
                                                className="form-control"
                                                onChange={handleChange}
                                                placeholder="Name"
                                                name='name'
                                            />
                                        </div>
                                        <div className="custom-frm-bx">
                                            <input
                                                type="email"
                                                name='email'
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Email address"
                                            />
                                        </div>
                                        <div className="custom-frm-bx">
                                            <select className="form-select" onChange={handleChange} name='country' value={formData.country}>
                                                <option value="">Country</option>
                                                <option value="india">India</option>
                                                <option value="usa">Usa</option>
                                                <option value="dubai">Dubai</option>
                                                <option value="uk">Uk</option>
                                            </select>
                                        </div>
                                        <div className="custom-frm-bx text-end">
                                            <button className="thm-lg-btn warning" type="submit" >
                                                Subscribe
                                            </button>
                                        </div>
                                    </form>
                                    {isMsg && <div className="thank-bx">
                                        <span className="far fa-check" />
                                        <div>
                                            <h6>Thank You!</h6>
                                            <p>Your complimentary book sample has been sent to you. Happy reading!</p>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                            <div className="col-lg-5 order-1 order-lg-2">
                                <div className="custom-category-img">
                                    <img src={images?.podNewEp} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="union-shape-bttm">
                        <img src={images?.union3} alt="" />
                    </div>
                </div>

                {/* Modal */}

            </section>

        </>
    )
}

export default Podcast
