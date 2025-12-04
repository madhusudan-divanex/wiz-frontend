import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getApiData } from '../../services/api'

function Faq() {
  const [faqList, setFaqList] = React.useState([])
  const fetchFaq = async () => {
    try {
      const result = await getApiData(`cms/faq`)
      if (result.success) {
        setFaqList(result.data)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.log("error fetch categorys", error);
    }
  }

  useEffect(() => {
    fetchFaq();
  }, []);
  return (
    <>
      <section className="faq-bnnr">
        <div className="container">
          <h1>
            Frequently Asked <br /> Questions
          </h1>
        </div>
      </section>
      <section className="business-faq tp-space faq-page bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="business-table-content">
                <div className="custom-frm-bx d-lg-none d-block">
                  <select className="form-select">
                    <option value="">Table of contents</option>
                    {faqList?.map((item, key) =>
                      <option value="" key={key}>{item?.question}</option>)}
                    <option value="">
                      What does Wizbizla Accreditation mean and why is it important?
                    </option>
                    <option value="">
                      How do I become Wizbizla Accredited and feature my profile on
                      the platform?
                    </option>
                    <option value="">
                      What checks does Wizbizla perform on service providers before
                      granting accreditation?
                    </option>
                    <option value="">
                      What types of Regulators, Professional Organizations, or
                      International Associations are involved?
                    </option>
                    <option value="">
                      If Wizbizla funding comes from service providers, how does the
                      organization ensure fairness to consumers?
                    </option>
                    <option value="">
                      Can Wizbizla recommend a reputable service provider for me to
                      deal with?
                    </option>
                    <option value="">
                      What are the membership options for Accredited Service
                      Providers at Wizbizla?
                    </option>
                    <option value="">
                      What are the membership options for Consumers at Wizbizla?
                    </option>
                    <option value="">Benefits of Creating an Account</option>
                    <option value="">
                      How do I contact a service provider to get a quote?
                    </option>
                    <option value="">
                      How do I qualify to open a service dispute?
                    </option>
                    <option value="">What happens when I file a complaint?</option>
                    <option value="">
                      Why can’t I leave written reviews for Service Providers on the
                      platform?
                    </option>
                    <option value="">
                      Can Consumers vet service providers’ authenticity themselves
                      via Wizbizla?
                    </option>
                    <option value="">
                      How do I use the Customized Due Diligence Service?
                    </option>
                    <option value="">How do I report a scam on Wizbizla?</option>
                    <option value="">Wizbizla Purchase Terms</option>
                    <option value="">
                      How is my personal information protected on the portal?
                    </option>
                    <option value="">
                      How Can Accredited Service Providers Place Banner
                      Advertisements?
                    </option>
                  </select>
                </div>
                <div className="d-none d-lg-block">
                  <h5>Table of contents</h5>
                  <ul className="table-content-menu d-none d-lg-block">
                    {faqList?.map((item, key) =>
                      <li>
                        <a href="javascript:void(0);">{item?.question}</a>
                      </li>
                    )}
                    {/* <li>
                      <a href="javascript:void(0);">
                        What does Wizbizla Accreditation mean and why is it
                        important?
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        How do I become Wizbizla Accredited and feature my profile
                        on the platform?
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        What checks does Wizbizla perform on service providers
                        before granting accreditation?
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        What types of Regulators, Professional Organizations, or
                        International Associations are involved?
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        If Wizbizla funding comes from service providers, how does
                        the organization ensure fairness to consumers?
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        Can Wizbizla recommend a reputable service provider for me
                        to deal with?
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        What are the membership options for Accredited Service
                        Providers at Wizbizla?
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        What are the membership options for Consumers at Wizbizla?
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        Benefits of Creating an Account
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        How do I contact a service provider to get a quote?
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        How do I qualify to open a service dispute?
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        What happens when I file a complaint?
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        Why can’t I leave written reviews for Service Providers on
                        the platform?
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        Can Consumers vet service providers’ authenticity themselves
                        via Wizbizla?
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        How do I use the Customized Due Diligence Service?
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        How do I report a scam on Wizbizla?
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">Wizbizla Purchase Terms</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        How is my personal information protected on the portal?
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        How Can Accredited Service Providers Place Banner
                        Advertisements?
                      </a>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="accordion" id="Business">
                {faqList?.length > 0 &&
                  faqList.map((item, key) => (
                    <div className="accordion-item" key={key}>
                      <h2 className="accordion-header">
                        <button
                          className={`accordion-button ${key !== 0 ? "collapsed" : ""}`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#business-${key}`}
                          aria-expanded={key === 0 ? "true" : "false"}
                        >
                          {item?.question}
                        </button>
                      </h2>

                      <div
                        id={`business-${key}`}
                        className={`accordion-collapse collapse ${key === 0 ? "show" : ""}`}
                        data-bs-parent="#Business"
                      >
                        <div className="accordion-body">
                          <div
                            dangerouslySetInnerHTML={{ __html: item?.answer }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))
                }


                {/* <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#business-02"
                      aria-expanded="false"
                    >
                      What does Wizbizla Accreditation mean and why is it important?
                    </button>
                  </h2>
                  <div
                    id="business-02"
                    className="accordion-collapse collapse"
                    data-bs-parent="#Business"
                  >
                    <div className="accordion-body">
                      <p>
                        Wizbizla’s stringent vetting and transparent monitoring
                        system ensure that every professional and company listed on
                        the site is correctly licensed and maintains a high standard
                        of work. Accredited service providers have met the rigorous
                        standards set by Wizbizla and agree to operate according to
                        the Wizbizla Standards for Excellence.
                      </p>
                      <p>
                        An accredited service provider has provided legitimate
                        certifications, is regulatory compliant, fully licensed, and
                        operates within the scope of their license. Accreditation is
                        a valuable certification for service providers in the UAE,
                        reassuring consumers that the service provider adheres to a
                        specific code of ethics and maintains high-quality service.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#business-03"
                      aria-expanded="false"
                    >
                      How do I become Wizbizla Accredited and feature my profile on
                      the platform?
                    </button>
                  </h2>
                  <div
                    id="business-03"
                    className="accordion-collapse collapse"
                    data-bs-parent="#Business"
                  >
                    <div className="accordion-body">
                      <div className="accordion-motive-content">
                        <h6>
                          To become Wizbizla Accredited and feature your profile on
                          our platform, follow these steps:
                        </h6>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="accordion-motive-content">
                            <h5>1. Create an Account</h5>
                            <p>
                              First create an account on Wizbizla using a valid
                              email address and a registered mobile number (for OTP
                              verification).
                            </p>
                          </div>
                          <div className="accordion-motive-content">
                            <h5>3. Fill Out Application</h5>
                            <p>
                              Complete the application form available on our
                              website. Provide all the required information and
                              supporting documents.
                            </p>
                          </div>
                          <div className="accordion-motive-content">
                            <h5>5. Approval</h5>
                            <p>
                              Once your application is approved, you will receive
                              your Wizbizla Accreditation.
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="accordion-motive-content">
                            <h5>2. Review Standards</h5>
                            <p>
                              Begin by reviewing the Wizbizla Standards for
                              Excellence, which outline the criteria for
                              accreditation.
                            </p>
                          </div>
                          <div className="accordion-motive-content">
                            <h5>4. Verification</h5>
                            <p>
                              Our team will verify your legal licenses, professional
                              affiliations, and qualifications to ensure compliance
                              with our standards.
                            </p>
                          </div>
                          <div className="accordion-motive-content">
                            <h5>6. Feature Profile</h5>
                            <p>
                              After accreditation, you can select your membership
                              option and feature your profile on our platform,
                              showcasing your credentials and services to potential
                              clients.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-motive-content">
                        <h5>
                          By following these steps, you can become a trusted,
                          accredited service provider on Wizbizla, enhancing your
                          visibility and credibility with consumers.
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#business-04"
                      aria-expanded="false"
                    >
                      What checks does Wizbizla perform on service providers before
                      granting accreditation?
                    </button>
                  </h2>
                  <div
                    id="business-04"
                    className="accordion-collapse collapse"
                    data-bs-parent="#Business"
                  >
                    <div className="accordion-body">
                      <p>
                        At Wizbizla, we conduct a comprehensive verification process
                        for each service seeking accreditation. We confirm that they
                        possess the required legal licenses and that their
                        activities align with these licensing requirements.
                        Additionally, we check their affiliations with relevant
                        trade associations and ensure they hold all necessary
                        qualifications for their trade.
                      </p>
                      <p>
                        In the event of an unresolved service dispute, we ensure
                        that a regulatory body is on record to help facilitate
                        resolution.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#business-05"
                      aria-expanded="false"
                    >
                      What types of Regulators, Professional Organizations, or
                      International Associations are involved?
                    </button>
                  </h2>
                  <div
                    id="business-05"
                    className="accordion-collapse collapse"
                    data-bs-parent="#Business"
                  >
                    <div className="accordion-body">
                      <p>
                        The types of regulators, professional organizations, and
                        international associations involved vary depending on the
                        profession. For professions that are not legally regulated,
                        such as coaching, their licenses are managed by their
                        license providers. In such cases, you can file a complaint
                        with the licensing body, which will be investigated.
                      </p>
                      <p>
                        For all other professional services, service providers must
                        list the relevant associations they need to be affiliated
                        with based on their specific trade. These affiliations
                        ensure that service providers adhere to industry standards
                        and best practices.{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#business-06"
                      aria-expanded="false"
                    >
                      If Wizbizla funding comes from service providers, how does the
                      organization ensure fairness to consumers?
                    </button>
                  </h2>
                  <div
                    id="business-06"
                    className="accordion-collapse collapse"
                    data-bs-parent="#Business"
                  >
                    <div className="accordion-body">
                      <p>
                        Wizbizla’s value to the business community is based on our
                        commitment to marketplace neutrality. Our role is not to
                        advocate for businesses or consumers, but to serve as a
                        mutually trusted intermediary. We promote trustworthy
                        business practices, resolve disputes, and provide
                        information to help consumers make wise purchasing
                        decisions. Businesses support Wizbizla because a trustworthy
                        marketplace benefits everyone.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#business-07"
                      aria-expanded="false"
                    >
                      Can Wizbizla recommend a reputable service provider for me to
                      deal with?
                    </button>
                  </h2>
                  <div
                    id="business-07"
                    className="accordion-collapse collapse"
                    data-bs-parent="#Business"
                  >
                    <div className="accordion-body">
                      <p>
                        Wizbizla’s basic policy is to refrain from recommending or
                        endorsing any specific business, product, or service to
                        ensure continued public trust in our fairness. However, all
                        Wizbizla Accredited Businesses must meet certain standards
                        to qualify for and maintain their accreditation.{" "}
                      </p>
                      <p>
                        If you’re looking for a more tailored approach, you can opt
                        for our premium bespoke concierge service. This service
                        allows you to delegate the entire search process to us.
                        We’ll find customized options that fit your price points and
                        preferences, saving you valuable time. Plus, as a concierge
                        service user, you’ll move to the front of the line, making
                        client acquisition easy.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#business-08"
                      aria-expanded="false"
                    >
                      What are the membership options for Accredited Service
                      Providers at Wizbizla?
                    </button>
                  </h2>
                  <div
                    id="business-08"
                    className="accordion-collapse collapse"
                    data-bs-parent="#Business"
                  >
                    <div className="accordion-body">
                      <div className="accordion-motive-content">
                        <h6>
                          At Wizbizla, we offer flexible membership packages
                          tailored to your needs:
                        </h6>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="accordion-motive-img">
                            <img src="assets/images/accordion-img-01.png" alt="" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="accordion-motive-img">
                            <img src="assets/images/accordion-img-02.png" alt="" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="accordion-motive-content">
                            <h5>Business Profile</h5>
                            <p>
                              Perfect for showcasing your profile with general PR
                              and SEO support, but without marketing assistance.
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="accordion-motive-content">
                            <h5>Signature Profile:</h5>
                            <p>
                              Ideal if you’re looking for comprehensive marketing
                              support. This package includes personalized mentoring
                              from Wizbizla and offers the most cost-effective
                              360-degree marketing solution to complement your own
                              efforts.
                            </p>
                          </div>
                        </div>
                      </div>
                      <h4 className="innr-title">
                        With the Signature Profile, you also gain access to
                        exclusive features:
                      </h4>
                      <ul className="accordion-motive-list">
                        <li>Two named representative profiles.</li>
                        <li>
                          Enrollment in our Loyalty Program, with the opportunity to
                          highlight your profile on our homepage.
                        </li>
                        <li>Access to the Reference Programme.</li>
                        <li>
                          Customized analytics for your profile, including visit
                          counts, bookmarks, and ratings.
                        </li>
                        <li>Complimentary attendance at all our workshops.</li>
                      </ul>
                      <p className="fz-14">
                        Choose the package that best fits your goals and unlock a
                        range of benefits designed to elevate your business.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#business-09"
                      aria-expanded="false"
                    >
                      What are the membership options for Consumers at Wizbizla?
                    </button>
                  </h2>
                  <div
                    id="business-09"
                    className="accordion-collapse collapse"
                    data-bs-parent="#Business"
                  >
                    <div className="accordion-body">
                      <p>
                        Wizbizla provides various options for consumers looking for
                        trusted service providers in the UAE. Our basic services are
                        free and include getting quotes, searching for providers,
                        reporting scams, and requesting references.{" "}
                      </p>
                      <p>
                        For a more tailored experience, consider our Premium Bespoke
                        Concierge Membership. This service lets you outsource your
                        search for a suitable provider and receive three customized
                        options based on your budget and preferences, saving you
                        time and effort.{" "}
                      </p>
                      <p>
                        Premium Concierge members can also upgrade to a paid annual
                        membership. This plan includes five tokens per month, each
                        for one request. Tokens cannot be rolled over, offering
                        flexibility and convenience for managing your service needs.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#business-10"
                      aria-expanded="false"
                    >
                      Benefits of Creating an Account
                    </button>
                  </h2>
                  <div
                    id="business-10"
                    className="accordion-collapse collapse"
                    data-bs-parent="#Business"
                  >
                    <div className="accordion-body">
                      <p>
                        Creating a free account with Wizbizla offers numerous
                        advantages. You can effortlessly manage your interactions
                        with both Wizbizla and service providers while ensuring your
                        information remains secure. Track your search pages,
                        ratings, and responses to service providers from one
                        convenient location, streamlining the process of addressing
                        any concerns. Additionally, logging in connects you with the
                        Wizbizla team, providing valuable resources to help you make
                        informed decisions about the service providers you engage
                        with. Your account also protects you and provides proof of
                        interaction with a service provider, which can be useful for
                        potential future disputes or mediation.{" "}
                      </p>
                      <p>
                        To get started, sign up and complete the registration with
                        all the required details. To help combat online fraud and
                        scams, users must verify their account with a local mobile
                        number. An SMS will be sent to the mobile number entered
                        during the registration process.
                      </p>
                      <a href="javascript:void(0);" className="thm-btn mt-4">
                        Register your account here
                      </a>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#business-11"
                      aria-expanded="false"
                    >
                      How do I contact a service provider to get a quote?
                    </button>
                  </h2>
                  <div
                    id="business-11"
                    className="accordion-collapse collapse"
                    data-bs-parent="#Business"
                  >
                    <div className="accordion-body">
                      <p>
                        To request a quote from a service provider, start by
                        visiting the Wizbizla homepage. Use the search bar to enter
                        relevant keywords or select a service category to browse
                        subcategories. This will show you a list of accredited
                        professionals in your chosen category.{" "}
                      </p>
                      <p>
                        Click on any search result to access the service provider’s
                        profile page, which includes their contact information. You
                        can communicate directly through the platform, and your
                        conversation history will be saved in your account profile.
                        This helps protect you and provides proof of interaction for
                        potential future disputes or mediation.
                      </p>
                      <p>
                        Discuss your service needs with the service provider, and if
                        both parties are satisfied, you can exchange contact details
                        and finalize costs outside the platform. If you find a
                        business profile, you can also request a quote directly by
                        using the <span className="clr">“connect”</span> button.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#business-12"
                      aria-expanded="false"
                    >
                      How do I qualify to open a service dispute?
                    </button>
                  </h2>
                  <div
                    id="business-12"
                    className="accordion-collapse collapse"
                    data-bs-parent="#Business"
                  >
                    <div className="accordion-body">
                      <p className="mb-4">
                        To open a service dispute with Wizbizla, both parties must
                        have connected through our platform, and the issue must
                        relate to the agreed-upon service.{" "}
                      </p>
                      <div className="accordion-motive-content">
                        <h6 className="fw-500">
                          With the Signature Profile, you also gain access to
                          exclusive features:
                        </h6>
                      </div>
                      <ul className="accordion-motive-list">
                        <li>
                          Complaints about buyer’s remorse (regret over spending
                          money).
                        </li>
                        <li>Issues solely based on pricing differences.</li>
                        <li>Requests for apologies from the service provider.</li>
                        <li>Complaints meant only for Wizbizla’s information.</li>
                        <li>
                          Complaints about discrimination or civil rights
                          violations.
                        </li>
                        <li>Employer/employee disputes.</li>
                        <li>Complaints related to criminal acts.</li>
                        <li>Complaints that are currently in litigation.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#business-13"
                      aria-expanded="false"
                    >
                      What happens when I file a complaint?
                    </button>
                  </h2>
                  <div
                    id="business-13"
                    className="accordion-collapse collapse"
                    data-bs-parent="#Business"
                  >
                    <div className="accordion-body">
                      <p>
                        If your complaint meets our complaint acceptance criteria,
                        your complaint will be sent to the business within
                        approximately two business days.
                      </p>
                      <p>
                        The business will be asked to respond within 15 calendar
                        days.
                      </p>
                      <p>
                        You will be notified of the business's response when we
                        receive it (or notified that we received no response).
                      </p>
                      <p>Complaints are usually closed within 30 days.</p>
                      <p>
                        You can find more information on Dispute Resolution{" "}
                        <a href="javascript:void(0);" className="clr">
                          here
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#business-14"
                      aria-expanded="false"
                    >
                      Why can’t I leave written reviews for Service Providers on the
                      platform?
                    </button>
                  </h2>
                  <div
                    id="business-14"
                    className="accordion-collapse collapse"
                    data-bs-parent="#Business"
                  >
                    <div className="accordion-body">
                      <p>
                        To avoid issues with fraudulent or unverified claims that
                        could unfairly impact service providers, we don’t offer an
                        option for written reviews. Instead, we focus on verifying
                        the licensing and professional qualifications of businesses
                        to ensure their credibility.{" "}
                      </p>
                      <p>
                        Your feedback is important to us, and we encourage you to
                        contact us directly with any positive or negative
                        experiences. We share this feedback with the service
                        providers to help maintain high standards.
                      </p>
                      <p>
                        If a service provider is part of the Signature Profile
                        Membership and enrolled in the{" "}
                        <a href="javascript:void(0);" className="clr">
                          Wizbizla Reference Program
                        </a>
                        , they may include validated references available to
                        interested consumers upon request. Additionally, you can
                        leave a public “recommendation” rating for service providers
                        through your account.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#business-15"
                      aria-expanded="false"
                    >
                      Can Consumers vet service providers’ authenticity themselves
                      via Wizbizla?
                    </button>
                  </h2>
                  <div
                    id="business-15"
                    className="accordion-collapse collapse"
                    data-bs-parent="#Business"
                  >
                    <div className="accordion-body">
                      <p>
                        Yes. We have added a chat feature that allows users to
                        communicate directly with service providers on our website.
                        You can ask questions about the service provider and their
                        offerings to get a better understanding of their
                        capabilities. This helps you determine if they can do the
                        job, if they will do the job, how long it will take, and if
                        they will do a good job.
                      </p>
                      <p>
                        Service providers are notified by email when someone wants
                        to connect with them on Wizbizla.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#business-16"
                      aria-expanded="false"
                    >
                      How do I use the Customized Due Diligence Service?
                    </button>
                  </h2>
                  <div
                    id="business-16"
                    className="accordion-collapse collapse"
                    data-bs-parent="#Business"
                  >
                    <div className="accordion-body">
                      <p>
                        If you can’t find the service provider you’re looking for in
                        our directory, we’re here to assist. Follow these steps to
                        use our Customized Due Diligence Service:
                      </p>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="accordion-motive-content">
                            <h5>1. Create a Free Account</h5>
                            <p>Begin by opening a free account on Wizbizla.</p>
                          </div>
                          <div className="accordion-motive-content">
                            <h5>3. Pay the Fee</h5>
                            <p>A one-time fee will be required for this service.</p>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="accordion-motive-content">
                            <h5>2. Complete the Form</h5>
                            <p>
                              Provide detailed information about the service you
                              need in the form.
                            </p>
                          </div>
                          <div className="accordion-motive-content">
                            <h5>4. Receive Information</h5>
                            <p>
                              Once your payment is processed, the Wizbizla team will
                              perform the background checks and deliver the relevant
                              information within 2 working days.
                            </p>
                          </div>
                        </div>
                      </div>
                      <a href="javascript:void(0);" className="thm-btn">
                        Request a Service Provider
                      </a>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#business-17"
                      aria-expanded="false"
                    >
                      How do I avail the Bespoke Concierge Made-to-Measure Service?
                    </button>
                  </h2>
                  <div
                    id="business-17"
                    className="accordion-collapse collapse"
                    data-bs-parent="#Business"
                  >
                    <div className="accordion-body">
                      <p>
                        Ideal for expats with busy schedules, our Bespoke Concierge
                        Made-to-Measure Service is easy to access:
                      </p>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="accordion-motive-content">
                            <h5>1. Create a Free Account</h5>
                            <p>Start by setting up a free account on Wizbizla.</p>
                          </div>
                          <div className="accordion-motive-content">
                            <h5>3. Pay the Fee</h5>
                            <p>A one-time fee will be required for this service.</p>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="accordion-motive-content">
                            <h5>2. Complete the Form</h5>
                            <p>
                              Fill out the form with detailed information about the
                              service you need.
                            </p>
                          </div>
                        </div>
                      </div>
                      <a href="javascript:void(0);" className="thm-btn">
                        Request a Bespoke Service
                      </a>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#business-18"
                      aria-expanded="false"
                    >
                      How do I report a scam on Wizbizla?
                    </button>
                  </h2>
                  <div
                    id="business-18"
                    className="accordion-collapse collapse"
                    data-bs-parent="#Business"
                  >
                    <div className="accordion-body">
                      <p>To report a scam on Wizbizla, follow these steps:</p>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="accordion-motive-content">
                            <h5>1. Create a User Account</h5>
                            <p>Start by creating an account on Wizbizla.</p>
                          </div>
                          <div className="accordion-motive-content">
                            <h5>3. Review and Posting:</h5>
                            <p>
                              The Wizbizla team will review your report to ensure it
                              complies with UAE legal guidelines and laws. Once
                              approved, your report will be posted on the Scam
                              Tracker forum, and a copy will be available in your
                              account profile.
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="accordion-motive-content">
                            <h5>2. Complete the Report Scam Form</h5>
                            <p>
                              Provide detailed information about the scam in the
                              form. You can choose to report anonymously or use a
                              pseudonym.
                            </p>
                          </div>
                        </div>
                      </div>
                      <p>
                        There is no charge for this service. Depending on the nature
                        of the scam, it may be reported to the relevant governing
                        agency or published in a local newspaper with your consent.
                        For significant cases, the report may be referred to
                        investigative journalists at Khaleej Times, who collaborate
                        closely with local authorities.
                      </p>
                      <p>
                        Wizbizla will update you on the outcome of the investigation
                        and post details on the Scam Tracker forum, subject to UAE
                        authorities’ approval. Some criminal investigations may
                        remain confidential at the court’s discretion, in which case
                        Wizbizla will inform you of the investigation’s status.
                      </p>
                      <Link to="/report-scam" className="thm-btn mt-4">
                        Report a Scam
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#business-19"
                      aria-expanded="false"
                    >
                      Wizbizla Purchase Terms
                    </button>
                  </h2>
                  <div
                    id="business-19"
                    className="accordion-collapse collapse"
                    data-bs-parent="#Business"
                  >
                    <div className="accordion-body">
                      <p>
                        All memberships at Wizbizla are billed on a monthly
                        recurring subscription model. We also offer an annual
                        membership with exclusive rates for those interested.
                      </p>
                      <p>
                        If you decide to cancel, you can easily remove your profile
                        from your account at any time.{" "}
                        <a href="javascript:void(0);" className="decoration">
                          Please note that, due to the digital nature of our
                          subscription model, we cannot offer refunds.
                        </a>
                      </p>
                      <p>
                        After cancellation, you’ll still have access to the platform
                        until the end of your billing cycle.
                      </p>
                      <p>
                        Our memberships are designed for individual use. If you need
                        access for a group or team, feel free to contact us at{" "}
                        <a href="mailto:hello@wizbizla.com" className="clr">
                          hello@wizbizla.com
                        </a>
                        .
                      </p>
                      <p>
                        For any assistance with registration, don’t hesitate to
                        email us at{" "}
                        <a href="mailto:hello@wizbizla.com" className="clr">
                          hello@wizbizla.com
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#business-20"
                      aria-expanded="false"
                    >
                      How is my personal information protected on the portal?
                    </button>
                  </h2>
                  <div
                    id="business-20"
                    className="accordion-collapse collapse"
                    data-bs-parent="#Business"
                  >
                    <div className="accordion-body">
                      <p>
                        At Wizbizla, we take your privacy seriously. Our platform
                        uses the latest SSL encryption to secure the website,
                        ensuring that your data is encrypted and protected by
                        multiple layers of security. User accounts benefit from
                        additional security features such as One Time Passwords
                        (OTP), and all accounts are created using the user’s real
                        name. Wizbizla does not sell or share your personal
                        information or contact details with any third parties. For
                        more details, please review our Privacy Policy.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#business-21"
                      aria-expanded="false"
                    >
                      How Can Accredited Service Providers Place Banner
                      Advertisements?
                    </button>
                  </h2>
                  <div
                    id="business-21"
                    className="accordion-collapse collapse"
                    data-bs-parent="#Business"
                  >
                    <div className="accordion-body">
                      <p>
                        Accredited Service Providers can place targeted banner
                        advertisements within the marketplace. These ads can be
                        customized to reach specific audiences based on their
                        interests. To place an ad, simply click on the banner ad
                        section to open a pop-up form where you can enter basic
                        information such as your name, email address, contact
                        number, and the category for your ad. Service Providers with
                        a Signature Profile Membership are automatically enrolled in
                        the Wizbizla Loyalty Reward Points program, allowing them to
                        redeem points for banner ads in subcategories and listing
                        pages.
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>

  )
}

export default Faq
