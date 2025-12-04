import React from 'react'
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
function AboutWizbizla() {
    return (
        <>
            <section className="about-bnnr">
                <div className="container">
                    <div className="about-bnnr-content">
                        <p>
                            Amber Waheed is a British expatriate who relocated to Dubai, where she
                            built a diverse career in sectors such as aviation and construction
                            before transitioning to a Lawyer Coach, specializing in professional
                            development.
                        </p>
                        <p>
                            In 2010, seeking to manage her investments in low-risk funds, Amber
                            was introduced to a financial advisor. Unbeknownst to her, this
                            advisor was operating illegally under a management consulting license
                            rather than the required regulated financial advisor license. He
                            persuaded Amber to invest $80,000 in high-risk funds to earn large
                            commissions, leading to substantial financial losses for Amber and
                            many others, including friends and referrals.
                        </p>
                        <p>
                            Determined to seek justice, Amber immersed herself in financial and
                            legal education, ultimately suing the advisor in both Dubai Criminal
                            and Civil courts. Against the odds, she won a landmark victory, which
                            drew significant international media attention. Through this ordeal,
                            Amber uncovered the widespread issue of financial mis-selling and
                            fraud, particularly affecting over 75% of the expat population in the
                            Middle East.
                        </p>
                        <p>
                            Amber chronicled her journey and the invaluable lessons learned in her
                            book, "The Great Fraud Fightback," providing a roadmap for others
                            facing similar legal battles. In 2021, she launched the "Expats in
                            Dubai" podcast, featuring industry experts who offer clear, practical
                            advice to the expat community, filling a crucial gap in reliable
                            information.
                        </p>
                        <p>
                            Inspired by her experiences, Amber founded Wizbizla, a trusted
                            platform connecting expats in the UAE with accredited professionals
                            across various sectors. Wizbizla is dedicated to safeguarding expat
                            consumers through specialized programs, ensuring they avoid the
                            exploitation Amber once faced.
                        </p>
                        <p>
                            Amber's story is a testament to resilience and advocacy, empowering
                            others to navigate complex challenges and fostering a trustworthy
                            environment for the expat community in the Middle East.
                        </p>
                    </div>
                </div>
            </section>
            <section className="about-bttm tp-space">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 order-2 order-lg-1">
                            <div className="about-bttm-content">
                                <p className="text-white">The journey and invaluable lessons</p>
                                <h4 className="text-white">
                                    The Great Fraud Fightback is more than just a compelling story -
                                    it's a vital survival guide for anyone navigating the financial
                                    advisory landscape in Dubai.
                                </h4>
                                <p className="text-white desc-txt">
                                    In this gripping account, Amber Waheed reveals how she lost
                                    everything to an unlicensed, fraudulent advisor and fought back to
                                    secure an unprecedented court victory. The book exposes the darker
                                    side of Dubai’s financial industry and the widespread impact of
                                    deceptive practices on thousands of expats.{" "}
                                </p>
                                <a
                                    href="https://www.amazon.com/Great-Fraud-Fightback-international-crimewave/dp/1838377611"
                                    className="thm-btn"
                                >
                                    Get The Great Fraud Fightback from Amazon
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-6 text-end order-1 order-lg-2">
                            <img src="assets/images/fraud-book-01.png" alt="" />
                        </div>
                    </div>
                    <div className="row align-items-center mt-5">
                        <div className="col-lg-6">
                            <img src="assets/images/fraud-book-02.png" alt="" />
                        </div>
                        <div className="col-lg-6">
                            <div className="about-bttm-content">
                                <h4 className="text-white">
                                    Readers will gain valuable insights into Amber’s landmark legal
                                    triumph and find practical legal advice
                                </h4>
                                <p className="text-white">
                                    Including templates, to help them tackle their own cases against
                                    rogue financial advisors. This book is not just a narrative - it’s
                                    a comprehensive roadmap for reclaiming one’s financial future.
                                </p>
                                <p className="text-white">
                                    The Great Fraud Fightback is ideal for those who: - Want to
                                    understand the financial advisory industry before making
                                    investment decisions. - Feel trapped by poor financial investments
                                    and need a way out. Are prepared to take legal action against a
                                    fraudulent financial advisor but need guidance on where to begin
                                </p>
                                <p className="text-white">
                                    By simplifying complex financial topics and highlighting critical
                                    red flags, this book equips readers to safeguard their hard-earned
                                    money and navigate the world of financial fraud with confidence.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="media-sec tp-space">
                <div className="container">
                    <div className="media-card">
                        <h3 className="title mb-2 ">Media Testimonials</h3>
                        <p>
                            The Great Fraud Fightback has been featured in more than 30 media
                            outlets.
                        </p>
                        <div className="media-slider owl-theme owl-carousel">
                            <Splide
                                options={{
                                    type: 'loop',
                                    perPage: 5,
                                    autoPlay:true,
                                    perMove: 1,
                                    arrows: false,
                                    pagination: true,
                                    gap: '1rem',
                                    breakpoints: {
                                        768: { perPage: 1.5 },
                                        1024: { perPage: 4 },
                                        1440: { perPage: 5 },
                                    },
                                }}
                                aria-label="Profile Slider"
                            >
                                <SplideSlide>
                                    <div className="media-item">
                                        <img src="assets/images/media-img-01.png" alt="" />
                                    </div>
                                </SplideSlide>
                                <SplideSlide>
                                    <div className="media-item">
                                        <img src="assets/images/media-img-02.png" alt="" />
                                    </div>
                                </SplideSlide>
                                <SplideSlide>
                                    <div className="media-item">
                                        <img src="assets/images/media-img-03.png" alt="" />
                                    </div>
                                </SplideSlide>
                                <SplideSlide>
                                    <div className="media-item">
                                        <img src="assets/images/media-img-04.png" alt="" />
                                    </div>
                                </SplideSlide>
                            </Splide>
                        </div>
                    </div>
                </div>
                <div className="container position-relative">
                    <div className="cards-bg" />
                    <div className="about-testimonial ">
                        <div className="testimonial-slider owl-theme owl-carousel">
                            <Splide
                                options={{
                                    type: 'loop',
                                    perPage: 1,
                                    perMove: 1,
                                    arrows: false,
                                    pagination: true,
                                    gap: '1rem',
                                    breakpoints: {
                                        768: { perPage: 1 },
                                        1024: { perPage: 1 },
                                        1440: { perPage: 1 },
                                    },
                                }}
                                aria-label="Profile Slider"
                            >
                                <SplideSlide>
                                    <div className="testimonial-innr">
                                        <div className="testimonial-image">
                                            <img src="assets/images/img-testimonial-1.png" alt="" />
                                        </div>
                                        <div className="testimonial-content">
                                            <img src="assets/images/quote-icon.png" alt="" />
                                            <h4>The Times Dubai expat sue advisor for damages and wins</h4>
                                            <p>
                                                The judgement is being recorded as a landmark decision as it's
                                                one of the first convictions of its kind in any expat
                                                destination which allows clients who've lost money to sue for
                                                reparation in a civil court. Scottish independent financial
                                                advisor Neil Grant was working illegally without the necessary
                                                registration of his business, and was channelling clients' funds
                                                into risky investment such as UK student accommodation and waste
                                                removal.
                                            </p>
                                        </div>
                                    </div>
                                </SplideSlide>
                                <SplideSlide>
                                    <div className="testimonial-innr">
                                        <div className="testimonial-image">
                                            <img src="assets/images/img-testimonial-1.png" alt="" />
                                        </div>
                                        <div className="testimonial-content">
                                            <img src="assets/images/quote-icon.png" alt="" />
                                            <h4>The Times Dubai expat sue advisor for damages and wins</h4>
                                            <p>
                                                The judgement is being recorded as a landmark decision as it's
                                                one of the first convictions of its kind in any expat
                                                destination which allows clients who've lost money to sue for
                                                reparation in a civil court. Scottish independent financial
                                                advisor Neil Grant was working illegally without the necessary
                                                registration of his business, and was channelling clients' funds
                                                into risky investment such as UK student accommodation and waste
                                                removal.
                                            </p>
                                        </div>
                                    </div>
                                </SplideSlide>
                                <SplideSlide>
                                    <div className="testimonial-innr">
                                        <div className="testimonial-image">
                                            <img src="assets/images/img-testimonial-1.png" alt="" />
                                        </div>
                                        <div className="testimonial-content">
                                            <img src="assets/images/quote-icon.png" alt="" />
                                            <h4>The Times Dubai expat sue advisor for damages and wins</h4>
                                            <p>
                                                The judgement is being recorded as a landmark decision as it's
                                                one of the first convictions of its kind in any expat
                                                destination which allows clients who've lost money to sue for
                                                reparation in a civil court. Scottish independent financial
                                                advisor Neil Grant was working illegally without the necessary
                                                registration of his business, and was channelling clients' funds
                                                into risky investment such as UK student accommodation and waste
                                                removal.
                                            </p>
                                        </div>
                                    </div>
                                </SplideSlide>
                                <SplideSlide>
                                    <div className="testimonial-innr">
                                        <div className="testimonial-image">
                                            <img src="assets/images/img-testimonial-1.png" alt="" />
                                        </div>
                                        <div className="testimonial-content">
                                            <img src="assets/images/quote-icon.png" alt="" />
                                            <h4>The Times Dubai expat sue advisor for damages and wins</h4>
                                            <p>
                                                The judgement is being recorded as a landmark decision as it's
                                                one of the first convictions of its kind in any expat
                                                destination which allows clients who've lost money to sue for
                                                reparation in a civil court. Scottish independent financial
                                                advisor Neil Grant was working illegally without the necessary
                                                registration of his business, and was channelling clients' funds
                                                into risky investment such as UK student accommodation and waste
                                                removal.
                                            </p>
                                        </div>
                                    </div>
                                </SplideSlide>
                                <SplideSlide>
                                    <div className="testimonial-innr">
                                        <div className="testimonial-image">
                                            <img src="assets/images/img-testimonial-1.png" alt="" />
                                        </div>
                                        <div className="testimonial-content">
                                            <img src="assets/images/quote-icon.png" alt="" />
                                            <h4>The Times Dubai expat sue advisor for damages and wins</h4>
                                            <p>
                                                The judgement is being recorded as a landmark decision as it's
                                                one of the first convictions of its kind in any expat
                                                destination which allows clients who've lost money to sue for
                                                reparation in a civil court. Scottish independent financial
                                                advisor Neil Grant was working illegally without the necessary
                                                registration of his business, and was channelling clients' funds
                                                into risky investment such as UK student accommodation and waste
                                                removal.
                                            </p>
                                        </div>
                                    </div>
                                </SplideSlide>
                                <SplideSlide>
                                    <div className="testimonial-innr">
                                        <div className="testimonial-image">
                                            <img src="assets/images/img-testimonial-1.png" alt="" />
                                        </div>
                                        <div className="testimonial-content">
                                            <img src="assets/images/quote-icon.png" alt="" />
                                            <h4>The Times Dubai expat sue advisor for damages and wins</h4>
                                            <p>
                                                The judgement is being recorded as a landmark decision as it's
                                                one of the first convictions of its kind in any expat
                                                destination which allows clients who've lost money to sue for
                                                reparation in a civil court. Scottish independent financial
                                                advisor Neil Grant was working illegally without the necessary
                                                registration of his business, and was channelling clients' funds
                                                into risky investment such as UK student accommodation and waste
                                                removal.
                                            </p>
                                        </div>
                                    </div>
                                </SplideSlide>
                            </Splide>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default AboutWizbizla
