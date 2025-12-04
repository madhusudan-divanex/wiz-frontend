import React from 'react'
import images from '../../assets/images'

function MissionVission() {
  return (
    <>
  <section className="wizbizla-corparate">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 order-2 order-lg-1">
          <div className="wizbizla-corparate-content">
            <h1>
              Corporate <br /> Philosophy &amp; Values
            </h1>
          </div>
        </div>
        <div className="col-lg-6 order-2 order-lg-3">
          <div className="wizbizla-corparate-content">
            <p>
              At Wizbizla, we are dedicated to fostering trust and transparency
              within the UAE's unique expat community. Our corporate philosophy
              revolves around our mission to enhance consumer confidence and
              establish a network of reliability through our independent
              accreditation process.
            </p>
            <p>
              We strive to create an exclusive network that safeguards both
              expat consumers and service providers, setting high standards of
              excellence and building a community of trustworthy businesses.
            </p>
          </div>
        </div>
        <div className="col-lg-12 order-1 order-lg-3">
          <div className="corparate-img">
            <img src="assets/images/corparate-img.png" alt="" />
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
              <img src="assets/images/mission-img.png" alt="" />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="custom-category-content">
              <h3>Mission and Vision</h3>
              <p className="fz-18">
                Wizbizla's mission is clear: to advance trust within the expat
                community by offering an independent accreditation system that
                upholds the highest standards of excellence for both consumers
                and service providers. We aim to be the UAE’s premier network
                for finding accredited professionals, ensuring a secure and
                reputable marketplace.
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
  <section className="vision-sec tp-space">
    <div className="container">
      <div className="row">
        <div className="col-lg-7 order-2 order-lg-1">
          <div className="vision-content">
            <h3>
              Our vision is to establish a thriving consumer ecosystem in the
              UAE characterized by:
            </h3>
            <ul className="vision-content-list">
              <li>
                <span>
                  <img src="assets/images/deal01.svg" alt="" />
                </span>
                <div>
                  <h6>Accredited Service Providers on Wizbizla</h6>
                  <p>
                    Promoting transparency and integrity in all marketing
                    practices.
                  </p>
                </div>
              </li>
              <li>
                <span>
                  <img src="assets/images/student.svg" alt="" />
                </span>
                <div>
                  <h6>Transparent and Lawful Business Practices</h6>
                  <p>
                    Ensuring that all business operations comply with legal
                    standards and ethical norms.
                  </p>
                </div>
              </li>
              <li>
                <span>
                  <img src={images?.chatting} alt="" />
                </span>
                <div>
                  <h6>
                    Prompt and Equitable Resolution of Consumer Complaints
                  </h6>
                  <p>Addressing issues swiftly and fairly to maintain trust.</p>
                </div>
              </li>
              <li>
                <span>
                  <img src="assets/images/shield-02.svg" alt="" />
                </span>
                <div>
                  <h6>Reduction of Scams and Fraudulent Transactions</h6>
                  <p>
                    Minimizing financial harm and preserving the reputation of
                    service providers through proactive measures.
                  </p>
                </div>
              </li>
              <li>
                <span>
                  <img src="assets/images/chart-bar.svg" alt="" />
                </span>
                <div>
                  <h6>
                    Strengthening Wizbizla’s Role as the Leading Consumer Trust
                    Validator
                  </h6>
                  <p>
                    Continuously raising the bar for service provider standards
                    and reinforcing our position as the trusted authority in the
                    UAE.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-5 order-1 order-lg-2">
          <div className="vision-new-img">
            <img src="assets/images/vision-img.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div className="container position-relative p-100 vision-impact">
      {/* <div class="impact-shape-01 shape">
														<img src="assets/images/.png" alt="">
				</div> */}
      <h3 className="title mb-3">Impact of Wizbizla’s Vision and Mission</h3>
      <p className="mb-5">
        Our commitment to these ideals has tangible benefits for our community:
      </p>
      <div className="row">
        <div className="col-lg-4">
          <div className="impact-cards">
            <span>
              <img src="assets/images/hourglass-start.svg" alt="" />
            </span>
            <h5>Significant Savings and Time</h5>
            <p>
              Consumers save both time and money by accessing our accredited
              directory and utilizing our Bespoke Concierge Service and
              Customized Due Diligence services, avoiding unlicensed and
              substandard companies.
            </p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="impact-cards">
            <span>
              <img src="assets/images/chat-clock.svg" alt="" />
            </span>
            <h5>Effective Dispute Resolution</h5>
            <p>
              Our facilities help resolve conflicts efficiently, saving further
              time and resources for consumers.
            </p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="impact-cards">
            <span>
              <img src="assets/images/chart-arrow-down.svg" alt="" />
            </span>
            <h5>Reduced Fraud Victimization</h5>
            <p>
              Our Scam Prevention Programme significantly lowers the incidence
              of fraud and scams, protecting consumers and maintaining market
              integrity.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="upholding-sec tp-space">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-7 order-2 order-lg-1">
          <div className="upholding-content">
            <p className="text-white">Commitment to Excellence</p>
            <h4 className="text-white">
              Wizbizla is dedicated to upholding the highest standards of
              business ethics and integrity.{" "}
            </h4>
            <p className="text-white">
              We lead by example, adhering to our own rigorous Standards for
              Excellence in all operations and strategies. By sharing verified
              knowledge through various media channels, we empower consumers to
              navigate the marketplace confidently.
            </p>
            <p className="text-white">
              We celebrate and spotlight role models in the private sector while
              continuously evaluating our progress and impact through community
              feedback. This ensures our approach remains innovative, adaptable,
              and true to our mission and values.
            </p>
            <p className="text-white">
              At Wizbizla, our commitment is to create a marketplace where trust
              and integrity thrive, benefiting both consumers and service
              providers alike.
            </p>
          </div>
        </div>
        <div className="col-lg-5 order-1 order-lg-2">
          <img src="assets/images/upholding-img.png" alt="" />
        </div>
      </div>
    </div>
  </section>
  <section className="get-know-sec tp-space pb-0">
    <div className="container-fluid">
      <div className="get-know-innr wizbizla-community">
        <div className="container">
          <div className="get-know-slider owl-theme owl-carousel">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="wizbizla-community-content">
                  <h2 className="title text-white">
                    Wizbizla: <br /> A Crucial Service for UAE's Expat Community
                  </h2>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="wizbizla-community-content">
                  <p className="text-white">
                    Our Founders’ unfortunate experience of falling victim to
                    fraud in the UAE underscores a critical need for reliable
                    financial guidance. Had she conducted thorough research into
                    her advisor's credentials, she might have avoided the loss
                    of her life savings. Such breaches of trust not only affect
                    individual consumers but also tarnish the reputation of
                    service providers across the UAE, forcing them to invest
                    additional resources to regain consumer confidence.
                  </p>
                  <p className="text-white">
                    Wizbizla emerges as a vital player in this landscape,
                    serving as a trustworthy intermediary that helps protect
                    consumers from fraud and connects them with accredited
                    service providers. By offering a straightforward path to
                    reliable services, Wizbizla saves consumers both time and
                    money.
                  </p>
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="wizbizla-community-content">
                  <h2 className="title text-white">
                    Wizbizla: <br /> A Crucial Service for UAE's Expat Community
                  </h2>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="wizbizla-community-content">
                  <p className="text-white">
                    The UAE’s diverse population—including locals, long-term
                    expats, transient expats, and tourists—creates a unique
                    market dynamic. With approximately 90% of the population
                    being expatriates and an annual influx of around 275,000 new
                    arrivals, the demand for services is substantial. Expats
                    often face tight deadlines and high pressure when
                    relocating, leading to challenges in finding suitable
                    accommodation, transportation, and other essential services.
                  </p>
                  <p className="text-white">
                    This transient nature makes the UAE an attractive target for
                    scammers and substandard service providers. As a result,
                    ethical businesses must work harder to distinguish
                    themselves from fraudulent operators. This additional effort
                    is compounded by the UAE's relatively underdeveloped
                    consumer protection framework and inconsistent regulatory
                    enforcement, which leaves many expats vulnerable to scams.
                  </p>
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="wizbizla-community-content">
                  <h2 className="title text-white">
                    Wizbizla: <br /> A Crucial Service for UAE's Expat Community
                  </h2>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="wizbizla-community-content">
                  <p className="text-white">
                    Given that about 75% of expats have been affected by
                    financial advisory fraud, consumer safety is paramount.
                    Expats, especially newcomers, may lack the time or resources
                    to conduct thorough due diligence on every service provider.
                    Language barriers and unfamiliarity with the local market
                    further complicate their search for trustworthy services.
                  </p>
                  <p className="text-white">
                    With over 665,000 registered businesses in the UAE,
                    selecting reliable service providers can be overwhelming.
                    Local search engines often fail to filter out scammers,
                    leaving consumers to wade through unreliable information and
                    poorly informed advice on social media.
                  </p>
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="wizbizla-community-content">
                  <h2 className="title text-white">
                    Wizbizla: <br /> A Crucial Service for UAE's Expat Community
                  </h2>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="wizbizla-community-content">
                  <p className="text-white">
                    Wizbizla addresses these challenges through its rigorous
                    accreditation process. By thoroughly vetting service
                    providers, Wizbizla eliminates spammy ads and unreliable
                    companies, presenting expats with a curated network of
                    trusted professionals across various industries. This
                    accreditation process not only simplifies the consumer's
                    search but also enhances their confidence in the services
                    they choose.
                  </p>
                  <p className="text-white">
                    Wizbizla’s commitment to integrity and performance makes it
                    an invaluable resource in the UAE market. The platform
                    ensures transparent business practices and ethical
                    advertising, supporting service providers who meet high
                    standards and address consumer concerns effectively.
                  </p>
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="wizbizla-community-content">
                  <h2 className="title text-white">
                    Wizbizla: <br /> A Crucial Service for UAE's Expat Community
                  </h2>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="wizbizla-community-content">
                  <p className="text-white">
                    Operating in Dubai, a major commercial and tourist hub with
                    a large expatriate population, Wizbizla is uniquely
                    positioned to cater to the needs of millions of expats. The
                    network’s pre-vetted service providers adhere to industry
                    standards, offering the best options for those seeking
                    reliable and high-quality services.
                  </p>
                  <p className="text-white">
                    In summary, Wizbizla plays a crucial role in creating a
                    safer and more reliable environment for consumers and
                    service providers in the UAE.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="vision-sec tp-space bg-white consumers-vision-cls">
    <div className="container">
      <h3 className="title">
        Wizbizla: Enhancing Value for <br /> Consumers and Service Providers
      </h3>
      <div className="row gx-5">
        <div className="col-lg-7 order-2 order-lg-1">
          <div className="vision-content">
            <h4>Value for Consumers:</h4>
            <ul className="vision-content-list">
              <li>
                <span>
                  <img src="assets/images/deal01.svg" alt="" />
                </span>
                <div>
                  <h6>Access to Trusted Providers</h6>
                  <p>
                    Wizbizla connects consumers with accredited service
                    providers, ensuring they receive reliable and ethical
                    services.
                  </p>
                </div>
              </li>
              <li>
                <span>
                  <img src="assets/images/shield-02.svg" alt="" />
                </span>
                <div>
                  <h6>Enhanced Safety</h6>
                  <p>
                    Our accreditation effectively blocks fraudulent businesses,
                    safeguarding consumers from scams and fraud.
                  </p>
                </div>
              </li>
              <li>
                <span>
                  <img src="assets/images/target.svg" alt="" />
                </span>
                <div>
                  <h6>Established Trust</h6>
                  <p>
                    By promoting transparency and upholding high business
                    standards, Wizbizla fosters a trustworthy environment for
                    consumers.
                  </p>
                </div>
              </li>
              <li>
                <span>
                  <img src="assets/images/chat-notification.svg" alt="" />
                </span>
                <div>
                  <h6>Support and Resolution</h6>
                  <p>
                    We offer support and dispute resolution services to address
                    any issues that may arise between consumers and
                    Wizbizla-accredited providers.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-5 order-1 order-lg-2">
          <img src="assets/images/vision-img-02.png" alt="" />
        </div>
      </div>
      <div className="row pt-100 gx-5">
        <div className="col-lg-5">
          <img src="assets/images/vision-img-03.png" alt="" />
        </div>
        <div className="col-lg-7">
          <div className="vision-content">
            <h4>Value for Service Providers:</h4>
            <ul className="vision-content-list">
              <li>
                <span>
                  <img src="assets/images/chart-arrow-up 01.svg" alt="" />
                </span>
                <div>
                  <h6>Competitive Edge</h6>
                  <p>
                    Wizbizla enhances brand awareness and builds familiarity,
                    giving service providers an advantage in the competitive UAE
                    market.
                  </p>
                </div>
              </li>
              <li>
                <span>
                  <img src="assets/images/star.svg" alt="" />
                </span>
                <div>
                  <h6>Prestigious Accreditation</h6>
                  <p>
                    Our independent accreditation process and trust badge boost
                    credibility and help establish a strong reputation.
                  </p>
                </div>
              </li>
              <li>
                <span>
                  <img src="assets/images/bar-chart-02.svg" alt="" />
                </span>
                <div>
                  <h6>Comprehensive Marketing</h6>
                  <p>
                    Our 360-degree marketing model—including specialized SEO,
                    PR, interviews, and validated customer feedback—saves time
                    and resources while maximizing exposure.
                  </p>
                </div>
              </li>
              <li>
                <span>
                  <img src="assets/images/pie-chart.svg" alt="" />
                </span>
                <div>
                  <h6>Targeted Exposure</h6>
                  <p>
                    Service providers receive preferential introduction to
                    newcomer expat consumers, driving business growth and
                    increasing returns on investment.
                  </p>
                </div>
              </li>
            </ul>
            <p>
              Wizbizla serves as a trusted guide and guardian, fostering
              long-term relationships and sustainable growth for both consumers
              and service providers.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="about-content tp-space">
    <div className="container">
      <p className="clr fw-500">Lets Achieve Success</p>
      <h3 className="title">
        Community Benefits for <br /> Consumers Using Wizbizla
      </h3>
      <p className="mb-5">
        Navigating the myriad of services in a new country can be overwhelming,
        especially for expats in the UAE. From setting up a home and schooling
        to finding the right healthcare professionals and local services, the
        journey can be fraught with challenges. Social media groups and general
        search engines may offer a wealth of information, but they often include
        unreliable sources and misleading results. That’s where Wizbizla comes
        in, transforming the experience for expat consumers with its
        comprehensive service platform.
      </p>
      <h4 className="innr-title">How Wizbizla Simplifies Your Life:</h4>
      <ul className="about-content-list">
        <li>
          <h5>1. Accreditation and Verification</h5>
          <p>
            Wizbizla ensures that all listed Service Providers are accredited
            and verified, giving you confidence in their reliability and
            professionalism. This rigorous vetting process helps you avoid
            potential scams and businesses that do not meet high standards.
          </p>
        </li>
        <li>
          <h5>2. Curated Search Results</h5>
          <p>
            Say goodbye to endless, irrelevant search results. Wizbizla filters
            out the clutter and connects you directly with the most suitable
            service providers tailored to your specific needs and preferences.
            This not only saves you time but also ensures you find trustworthy
            services efficiently
          </p>
          <p>
            Our streamlined 4-step directory process makes discovering the right
            provider simpler than ever. Start with our 20 top-level
            categories—covering everything from legal and medical to pet
            relocation and automobiles. Each category is further refined into
            sub-categories that spotlight specialized expertise. Our exclusive
            listings feature 10-15 carefully selected service providers, each
            identified by a unique avatar, so you can effortlessly connect with
            the business profile that’s perfect for you.
          </p>
        </li>
        <li>
          <h5>3. Transparent Ratings and References</h5>
          <p>
            On Wizbizla, you can easily review and rate Service Providers based
            on your personal experience. Each provider's profile includes
            consumer ratings and you can request for detailed references,
            allowing you to make informed decisions and choose the best options
            available.
          </p>
        </li>
        <li>
          <h5>4. Priority Contact Function</h5>
          <p>
            Simplify your communication with Service Providers through
            Wizbizla’s priority contact function. This feature eliminates delays
            and complex communication channels, ensuring that you get the
            service you need when you need it.
          </p>
        </li>
        <li>
          <h5>5. Fair Feedback System</h5>
          <p>
            Our platform allows you to leave instant thumbs-up ratings or
            detailed reviews of your interactions with Service Providers.
            Wizbizla moderates written reviews to maintain clarity and
            relevance, contributing to a trustworthy community.
          </p>
        </li>
        <li>
          <h5>6. Dispute Resolution</h5>
          <p>
            In case of any disputes, Wizbizla offers an unbiased, independent
            third-party mediation service. This ensures fair handling of
            conflicts between consumers and Service Providers. Positive dispute
            resolution reviews contribute to a Service Provider’s good
            reputation in the Wizbizla community.
          </p>
        </li>
        <li>
          <h5>7. Resources through our Scam Prevention Programme</h5>
          <p>
            Protect yourself from fraud with Wizbizla’s free Scam Tracker, which
            lets you report and research known scams. We collaborate with our
            partners to share scam alerts and provide helpful tips to keep the
            community informed and resilient. For more serious concerns, our
            Scam Investigation service, in collaboration with Khaleej Times and
            UAE authorities, provides expert investigative support.
          </p>
        </li>
        <li>
          <h5>8. Recommendation Programme</h5>
          <p>
            Our Recommendation Programme offers unbiased consumer endorsements,
            validating the expertise and reliability of Service Providers
            through genuine user experiences.
          </p>
        </li>
        <li>
          <h5>9. Bespoke Concierge Service</h5>
          <p>
            For a fully tailored experience, our Bespoke Concierge Service
            manages every aspect of your search for a Service Provider. We
            handle background checks, validate credentials, and address any
            issues to ensure a seamless experience. You can also choose our
            premium option, where we take over the entire search process,
            providing customized service provider options based on your
            preferences and budget, saving you valuable time.
          </p>
        </li>
        <li>
          <h5>10. Customized Due Diligence</h5>
          <p>
            Consumers and registered Service Providers can use Wizbizla’s
            Customized Due Diligence Service to investigate and validate
            external service providers before doing business with them. This
            service is especially useful for verifying service providers not
            listed on our platform, ensuring their business registration,
            credentials, and regulatory details are accurate.
          </p>
        </li>
      </ul>
      <p>
        By leveraging Wizbizla, you gain access to a well-organized, reliable
        platform designed to streamline your service searches and enhance your
        expat experience in the UAE. Enjoy peace of mind and efficiency as you
        settle into your new home with Wizbizla by your side.
      </p>
    </div>
  </section>
  <section className="community-benefits-sec tp-space">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h3 className="title text-white">
            Discover the Community Benefits for <br /> Service Providers with
            Wizbizla
          </h3>
          <p>
            In the dynamic UAE market, service providers face the challenge of
            consistently acquiring new customers due to the frequent turnover of
            expat residents. With new expats establishing their business and
            personal networks within the first year of their arrival, seizing
            this opportunity is crucial for sustained profitability.
          </p>
          <p>
            Wizbizla bridges this gap by connecting service providers with new
            expat consumers who fit their ideal customer profile as soon as they
            arrive in the UAE. By introducing your business as a preferred
            supplier, Wizbizla helps build strong customer relationships from
            the outset. This initial six-month period, when new expats are most
            likely to make significant purchases, represents the prime
            opportunity for service providers to capture high-value clients.
          </p>
          <div className="community-benefits-img">
            <img src="assets/images/community-benefits-img-01.png" alt="" />
          </div>
          <p>
            The rapid turnover of expat residents means service providers must
            continually attract new customers to replace those who leave.
            Wizbizla enhances your visibility to incoming expats, enabling you
            to establish customer loyalty early in their UAE journey. New expats
            typically spend up to 20 times more on business and personal
            services in their first six months than established expats do over
            two years, making this a lucrative period for capturing high-value
            clients.
          </p>
          <p>
            In addition to connecting you with new clients, Wizbizla offers
            robust protection against fraud. Our Scam Tracker reinforces your
            reputation by providing valuable insights to swiftly address any
            fraudulent activities that could harm your business.
          </p>
          <div className="community-benefits-img">
            <img src="assets/images/community-benefits-img-02.png" alt="" />
          </div>
          <p>
            For smaller or newer service providers who may lack a strong
            reputation or extensive online reviews, Wizbizla's accreditation
            process provides essential credibility. Our rigorous protocols
            ensure consumers feel confident using your services, enhancing your
            competitive edge without the high costs of traditional
            accreditation.
          </p>
          <p>
            Our modest annual subscription fees provide access to a broader
            consumer base, with no compromise on the quality of exposure. Fair
            and unbiased reviews on Wizbizla ensure that potential clients see
            accurate, reliable feedback. For Signature Profile Service
            Providers, additional benefits include detailed analysis and
            feedback reports.
          </p>
          <div className="community-benefits-img">
            <img src="assets/images/community-benefits-img-03.png" alt="" />
          </div>
          <p>
            Wizbizla stands out as the only concierge accreditation and dispute
            resolution network in the UAE, offering a comprehensive range of
            services:
          </p>
          <ul className="benefits-list">
            <li>Background checks, validation, and onboarding.</li>
            <li>Monitoring and managing consumer feedback.</li>
            <li>Targeted advertising and media exposure.</li>
            <li>Third-party validation and conflict resolution services</li>
            <li>Investigation of fraud and scams</li>
          </ul>
          <p>
            Our market research indicates that 85% of UAE consumers prefer
            working with independently accredited service providers. With the
            rise of fraud, Wizbizla's accreditation reassures consumers of your
            trustworthiness.
          </p>
          <div className="community-benefits-img">
            <img src="assets/images/community-benefits-img-04.png" alt="" />
          </div>
          <p>
            Unlike costly SEO and paid advertising, Wizbizla's verified
            directory enhances your visibility in a user-friendly format. Our
            high domain authority boosts your profile's search ranking,
            improving your online presence and generating more leads.
          </p>
          <p>
            Service Provider Profiles on Wizbizla include an “Ideal Client
            Profile” section, allowing you to attract quality leads by defining
            your preferred demographics and industry categories. Consumers can
            easily access your profile, view ratings, and request references,
            streamlining their selection process.
          </p>
          <p>
            Wizbizla also supports your profile through general PR and SEO
            efforts. Signature Profile members benefit from strategic marketing
            services, including podcasts, interviews, and site inspections,
            along with opportunities for collaborations through events and
            workshops.
          </p>
          <div className="community-benefits-img">
            <img src="assets/images/community-benefits-img-05.png" alt="" />
          </div>
          <p>
            Our mark of accreditation not only enhances your credibility but
            also gives you a competitive edge. We provide in-house mediation
            services for dispute resolution, ensuring fair cooperation and
            maintenance of accreditation status.
          </p>
          <p>
            Choose Wizbizla to connect with new clients, protect your
            reputation, and enhance your market presence. Join us today and
            leverage our community benefits to drive your business success.
          </p>
        </div>
      </div>
    </div>
  </section>
  <section className="inspired-sec tp-space">
    <div className="container">
      <h3 className="title">
        All of this inspired the naming of the company{" "}
        <span className="clr">‘Wizbizla’</span>
      </h3>
      <p>
        The story behind the company name ‘Wizbizla’ is rooted in the desire to
        bring clarity and confidence to expats navigating the vibrant yet often
        unpredictable landscape of the United Arab Emirates. As someone who
        understands the challenges of being new in a country, the name reflects
        the core values that inspired the creation of the platform.
      </p>
      <ul className="inspired-list">
        <li>
          <span className="name">Wiz</span>
          <div>
            <p>
              <em>"Wiz"</em> stands for wisdom—symbolizing the deep knowledge
              and experience required to handpick accredited service providers
              who uphold the highest standards.{" "}
              <span>
                It speaks to the expertise behind every recommendation and the
                commitment to making well-informed, thoughtful choices that
                benefit expats.
              </span>
            </p>
          </div>
        </li>
        <li>
          <span className="name secondary">Biz</span>
          <div>
            <p>
              <em>"Biz"</em> refers to the business aspect—acknowledging the
              transactional world of services.{" "}
              <span>
                But more than that, it speaks to how business should be
                conducted—with transparency, trust, and accountability, ensuring
                that expats connect with professionals who genuinely care about
                their needs.
              </span>
            </p>
          </div>
        </li>
        <li>
          <span className="name success">La</span>
          <div>
            <p>
              <em>"La"</em> is a nod to the lively, fast-paced nature of Dubai.
              It captures the energy and excitement of the "most popular" city
              while also reflecting the importance of simplicity and ease.{" "}
              <span>
                The platform’s purpose is to cut through the noise, making the
                process of finding reliable services as effortless as possible.
              </span>
            </p>
          </div>
        </li>
      </ul>
      <p>
        Wizbizla came to life from a clear mission: to provide expats peace of
        mind in a transient market, minimizing risks and connecting them with
        genuine, trustworthy service providers. That’s what led to the creation
        of Wizbizla—a hub where quality meets integrity, making the process of
        settling into life in the United Arab Emirates smoother and safer for
        everyone.
      </p>
    </div>
  </section>
  <section className="faq-sec tp-space pb-0">
    <div className="container">
      <div className="row">
        <div className="col-lg-5">
          <div className="faq-lft">
            <h3 className="title">How can we help?</h3>
            <p>
              Wizbizla welcomes the opportunity to assist you with your
              marketplace challenge. Whether you need to file a complaint, share
              your experience, tell us about a misleading advertisement, or
              report a scam, you're in the right place.
            </p>
            <img
              src="assets/images/faq-img.png"
              className="d-none d-lg-block"
              alt=""
            />
          </div>
        </div>
        <div className="col-lg-7">
          <div className="faq-rgt">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-01"
                  >
                    I'd like to file a complaint against a Service Provider, and
                    have Wizbizla help me get a resolution to my problem.
                  </button>
                </h2>
                <div
                  id="faq-01"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      Wizbizla can assist you with that. We'll ask you a series
                      of questions designed to help us help you work with the
                      service provider with which you have a dispute. Be as
                      specific as possible as you answer the questions--this can
                      make the process work much more quickly and efficiently.
                    </p>
                    <a href="javascript:void(0);" className="request-btn">
                      <i className="far fa-arrow-right me-2" />
                      File a Complaint
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
                    data-bs-target="#faq-02"
                  >
                    I'd like to share an experience about a service provider.
                  </button>
                </h2>
                <div
                  id="faq-02"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Maxime cupiditate saepe commodi voluptas, adipisci hic
                      dolore, quasi voluptatem dolor aperiam eveniet? Neque est
                      perspiciatis quisquam suscipit corrupti, voluptatibus
                      deserunt obcaecati!{" "}
                    </p>
                    <a href="javascript:void(0);" className="request-btn">
                      <i className="far fa-arrow-right me-2" />
                      File a Complaint
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
                    data-bs-target="#faq-03"
                  >
                    I'd like to share an experience about a service provider.
                  </button>
                </h2>
                <div
                  id="faq-03"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Repellendus odio amet, ratione porro distinctio
                      consequuntur excepturi, placeat similique id facere cum,
                      corrupti possimus? Nihil eum repellendus deserunt hic,
                      architecto, quos!{" "}
                    </p>
                    <a href="javascript:void(0);" className="request-btn">
                      <i className="far fa-arrow-right me-2" />
                      File a Complaint
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
                    data-bs-target="#faq-04"
                  >
                    I'd like to share an experience about a service provider.
                  </button>
                </h2>
                <div
                  id="faq-04"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Repellendus odio amet, ratione porro distinctio
                      consequuntur excepturi, placeat similique id facere cum,
                      corrupti possimus? Nihil eum repellendus deserunt hic,
                      architecto, quos!{" "}
                    </p>
                    <a href="javascript:void(0);" className="request-btn">
                      <i className="far fa-arrow-right me-2" />
                      File a Complaint
                    </a>
                  </div>
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

export default MissionVission
