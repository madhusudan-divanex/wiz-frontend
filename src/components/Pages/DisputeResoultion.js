import React from 'react'
import { Link } from 'react-router-dom'

function DisputeResoultion() {
  return (
    <div className='newBnr'>
  <section className="dispute-hero tp-space">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="dispute-content">
            <h1>Wizbizla Dispute Resolution Center</h1>
            <h2>Your Path to Fair and Swift Solutions</h2>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="dispute-content">
            <p>
              At Wizbizla, we understand that disputes can arise unexpectedly
              and often disrupt the harmony of personal, group, and business
              relationships.{" "}
            </p>
            <p>
              Our Dispute Resolution Center is dedicated to providing a secure,
              remote platform where disagreements can be resolved amicably and
              efficiently.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="category-relations tp-space">
    <div className="container">
      <div className="union-shape-top">
        <img src="assets/images/union.png" alt="" />
      </div>
      <div className="cards-bg" />
      <div className="custom-category">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className="custom-category-img">
              <img src="assets/images/mission-img-03.png" alt="" />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="custom-category-content">
              <h3>What Wizbizla's Mediators Do</h3>
              <p className="mb-4">
                Our skilled mediators play a crucial role in facilitating
                discussions between disputing parties. They are impartial guides
                who help individuals work together to find mutually acceptable
                solutions. Unlike judges or lawyers, our mediators do not make
                decisions or enforce agreements. Instead, they empower the
                disputing parties to craft their own agreements and decide
                whether to finalize them at the end of the mediation process.
              </p>
              <Link to="/login" className="thm-btn">
                File a Complaint
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="union-shape-bttm">
        <img src="assets/images/union-shape-03.png" alt="" />
      </div>
    </div>
  </section>
  <section className="vision-sec tp-space pt-0">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 order-2 order-lg-1">
          <div className="vision-content">
            <h2 className="title mb-3">
              Why Wizbizla's Dispute Resolution Works
            </h2>
            <p className="mb-4">
              Wizbizla's approach to dispute resolution is built on principles
              of fairness, efficiency, and cost-effectiveness:
            </p>
            <ul className="vision-content-list">
              <li>
                <span>
                  <img src="assets/images/shield-02.svg" alt="" />
                </span>
                <div>
                  <h6>Fairness</h6>
                  <p>
                    Parties involved in the dispute control the resolution
                    process, ensuring that the outcome is fair and agreeable to
                    everyone.
                  </p>
                </div>
              </li>
              <li>
                <span>
                  <img src="assets/images/chart-arrow-up 01.svg" alt="" />
                </span>
                <div>
                  <h6>Efficiency</h6>
                  <p>
                    Mediation typically leads to faster resolutions compared to
                    lengthy court cases.
                  </p>
                </div>
              </li>
              <li>
                <span>
                  <img src="assets/images/pie-chart.svg" alt="" />
                </span>
                <div>
                  <h6>Cost-Effectiveness</h6>
                  <p>
                    By resolving disputes directly, parties can save
                    significantly on legal fees and other litigation costs.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-6 order-1 order-lg-2">
          <div className="vision-new-img">
            <img src="assets/images/dispute-img.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="our-process-sec tp-space">
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <h3 className="title text-white">Our Process</h3>
        </div>
        <div className="col-lg-8">
          <div className="our-process-content">
            <div className="accordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#process-01"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <em>01</em> <span>Filing a Complain</span>
                  </button>
                </h2>
                <div
                  id="process-01"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body">
                    <p>
                      The consumer files a complaint with a Wizbizla Service
                      Provider.
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
                    data-bs-target="#process-02"
                  >
                    <em>02</em> <span>Review and Processing</span>
                  </button>
                </h2>
                <div id="process-02" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <p>
                      Wizbizla will review and process your complaint within 48
                      hours. If your complaint does not meet the eligibility
                      criteria, it will be rejected. For details on what is and
                      isn’t covered, please see the FAQ section titled "How do I
                      qualify to open a service dispute?" If the complaint is
                      accepted, the consumer must pay AED 750, and a case number
                      will be assigned.
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
                    data-bs-target="#process-03"
                  >
                    <em>03</em> <span>Service Provider Response</span>
                  </button>
                </h2>
                <div id="process-03" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <p>The Service Provider has 10 business days to respond.</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#process-04"
                  >
                    <em>04</em> <span>Consumer Notification</span>
                  </button>
                </h2>
                <div id="process-04" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <p>
                      The consumer is notified of the business’s response and
                      has 5 days to reply.
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
                    data-bs-target="#process-05"
                  >
                    <em>05</em> <span>Follow-Up</span>
                  </button>
                </h2>
                <div id="process-05" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <p>
                      If the business fails to respond, a second notice will be
                      issued. If the response remains unsatisfactory, additional
                      steps, including mediation, may be recommended. Depending
                      on the complaint's nature and severity, an independent
                      industry-expert lawyer assigned by Wizbizla may
                      participate in the mediation process to help reach a
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
                    data-bs-target="#process-06"
                  >
                    <em>06</em> <span>Resolution Status </span>
                  </button>
                </h2>
                <div
                  id="process-06"
                  className="accordion-collapse collapse"
                  data-bs-parent="#Process"
                >
                  <div className="accordion-body">
                    <p>
                      Complaints are typically resolved within 30 days, from the
                      date the Consumer filed the complaint.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="vision-sec tp-space bg-white">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="vision-new-img">
            <img src="assets/images/resolution-img-01.png" alt="" />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="vision-content">
            <h2 className="title mb-3">Resolution Statuses</h2>
            <p className="mb-4">Upon closure, complaints are categorized as:</p>
            <ul className="vision-content-list">
              <li>
                <span>
                  <img src="assets/images/tick.svg" alt="" />
                </span>
                <div>
                  <h6>Resolved</h6>
                  <p>The issue is satisfactorily addressed.</p>
                </div>
              </li>
              <li>
                <span>
                  <img src="assets/images/remove.svg" alt="" />
                </span>
                <div>
                  <h6>Unresolved</h6>
                  <p>
                    The service provider responded but did not resolve the issue
                    in good faith.
                  </p>
                </div>
              </li>
              <li>
                <span>
                  <img src="assets/images/chat-accept.svg" alt="" />
                </span>
                <div>
                  <h6>Answered</h6>
                  <p>
                    The consumer did not confirm satisfaction or remains
                    dissatisfied despite the service provider's response.
                  </p>
                </div>
              </li>
              <li>
                <span>
                  <img src="assets/images/chat-close.svg" alt="" />
                </span>
                <div>
                  <h6>Unanswered</h6>
                  <p>
                    The service provider did not respond. The next step is to
                    seek recourse through the relevant professional body or
                    regulatory authority to which the service provider is
                    affiliated, if applicable.&nbsp; Additionally, Wizbizla may
                    recommend legal recourse if necessary.
                  </p>
                </div>
              </li>
              <li>
                <span>
                  <img src="assets/images/chat-block.svg" alt="" />
                </span>
                <div>
                  <h6>Unpursuable</h6>
                  <p>
                    The service provider is unreachable or has left the country.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="vision-sec tp-space">
    <div className="container position-relative vision-impact benefits-consumers">
      <h3 className="title mb-5">
        Benefits for Consumers and Service Providers
      </h3>
      <div className="row ">
        <div className="col-lg-6">
          <div className="impact-cards">
            <span>
              <img src="assets/images/user.svg" alt="" />
            </span>
            <h5>Consumers</h5>
            <p>
              Gain a platform to address grievances without the complexities and
              expenses of court proceedings. They receive timely updates and
              fair resolutions tailored to their needs.
            </p>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="impact-cards">
            <span>
              <img src="assets/images/briefcase-04.svg" alt="" />
            </span>
            <h5>Service Providers</h5>
            <p>
              Maintain reputational integrity by demonstrating responsiveness
              and commitment to ethical business practices. Resolving disputes
              efficiently helps preserve customer trust and loyalty.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="container pt-100">
      <div className="row align-items-center">
        <div className="col-lg-6 order-2 order-lg-1">
          <h3 className="title mb-3">
            Service Providers and Consumer Complaints
          </h3>
          <p>
            Service providers can also file complaints against consumers,
            following the same transparent and fair process.
          </p>
        </div>
        <div className="col-lg-6 order-1 order-lg-2">
          <div className="vision-new-img">
            <img src="assets/images/service-provider-img.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="category-relations tp-space">
    <div className="container">
      <div className="union-shape-top">
        <img src="assets/images/union.png" alt="" />
      </div>
      <div className="cards-bg" />
      <div className="custom-category">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className="custom-category-img">
              <img src="assets/images/dispute-img-02.png" alt="" />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="custom-category-content">
              <h3>
                The Role of Complaint History and Wizbizla's Effectiveness in
                Dispute Resolution
              </h3>
              <p>
                Our commitment to customer satisfaction is at the core of
                Wizbizla’s values. Service Providers are held to high standards,
                and failure to respond adequately to complaints can impact their
                membership status. Persistent poor feedback may lead to
                membership non-renewal or consumer account deactivation.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="union-shape-bttm">
        <img src="assets/images/union-shape-03.png" alt="" />
      </div>
    </div>
  </section>
  <section className="comparing-sec tp-space">
    <div className="container-fluid">
      <div className="comparing-innr">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2 className="text-white">
                Comparing Court Litigation with Wizbizla’s Dispute Resolution
              </h2>
            </div>
            <div className="col-lg-6">
              <p>
                Court litigation can be lengthy, expensive, and unpredictable,
                with challenges in enforcing judgments even when rulings are in
                your favor. In contrast, Wizbizla offers a simpler, more
                cost-effective, and collaborative approach to resolving
                disputes. Our process emphasizes ethical and responsible
                solutions that benefit all parties involved.
              </p>
              <p>
                Even if you don’t have a legal claim, you might have a moral
                claim. Wizbizla ensures that Service Providers adhere to high
                ethical standards and respond responsibly to complaints. We aim
                to achieve fair and equitable resolutions that address the
                interests of all parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="choose-sec tp-space">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6 order-2 order-lg-1">
          <div className="choose-content">
            <p className="clr">Why Choose Wizbizla First</p>
            <h4>
              For Service Providers who value their Wizbizla membership and for
              consumers seeking fair settlements, our Dispute Resolution Center
              offers an effective first step.
            </h4>
            <p className="mb-4">
              Opting for mediation with Wizbizla can save time, money, and the
              uncertainty associated with court proceedings, providing an
              equitable and satisfactory resolution for all.
            </p>
            <Link to="/login" className="thm-btn">
              File a Complaint
            </Link>
          </div>
        </div>
        <div className="col-lg-6 order-1 order-lg-2">
          <div className="choose-img">
            <img src="assets/images/choose-img.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

  )
}

export default DisputeResoultion
