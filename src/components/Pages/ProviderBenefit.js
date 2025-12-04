import React, { useEffect, useState } from 'react'
import { getApiData } from '../../services/api'
import { toast } from 'react-toastify'
import images from '../../assets/images';

function ProviderBenefit() {
   const [selectedDurations, setSelectedDurations] = useState({});
  const [membershipData, setMembershipData] = useState([])

  async function fetchMembershipdata() {
    try {
      const result = await getApiData('get-membership?type=provider')
      if (result.status) {
        setMembershipData(result.membershipData)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    fetchMembershipdata()
  },[])
  const handleBuy=()=>{

  }
  return (
    <div className='newBnr'>
      <section className="membership-bnnr">
        <div className="container">
          <h1>Wizbizla Membership</h1>
          <p>Unlock Exclusive Benefits on the Wizbizla Platform</p>
        </div>
      </section>
      <section className="membership-sec tp-space">
        <div className="container">
          <h2 className="title mb-3">Choose Your Membership</h2>
          <p className="fz-18 mb-4">
            If you would like to purchase profiles for a group or team, please
            contact us at{" "}
            <a href="javascript:void(0);" className="clr">
              hello@wizbizla.com
            </a>
          </p>
          <div className="row">
            <div className="col-lg-12">
              <div className="membership-cards h-auto">
                <h4>Joining fee</h4>
                <h3>300 AED </h3>
                <p>20% discount for annual subscription (2 months free)</p>
                <h6>Requirements for Application:</h6>
                <ul className="custom-content-list">
                  <li>
                    UAE Company Trade License for the service offered
                    <small className="text-danger">*</small>
                  </li>
                  <li>
                    Details of Regulation by the relevant professional organization,
                    if legally required<small className="text-danger">*</small>
                  </li>
                  <li>
                    Professional Qualifications (optional): Provide certificates if
                    your profession requires specific qualifications to validate
                    your expertise
                  </li>
                </ul>
              </div>
            </div>
             {membershipData?.filter(item => !item.topChoice)?.length > 0 && membershipData?.filter(item => !item.topChoice).map((item, key) =>
            <div className="col-lg-6" key={key}>
              <div className="membership-cards">
                <h4 className='mt-4'>{item?.name}</h4>
                <ul className="nav" id="myTab" role="tablist">
                  <li className="tab-item" role="presentation">
                    <button
                      className={`tab-link ${selectedDurations[item._id] !== 'yearly' ? 'active' : ''}`}
                      data-bs-toggle="tab"
                      data-bs-target="#business-tab-01"
                      type="button"
                      role="tab"
                      onClick={() => setSelectedDurations(prev => ({ ...prev, [item._id]: 'monthly' }))}
                    >
                      Monthly
                    </button>
                  </li>
                  <li className="tab-item" role="presentation">
                    <button
                      className={`tab-link ${selectedDurations[item._id] === 'yearly' ? 'active' : ''}`}
                      data-bs-toggle="tab"
                      data-bs-target="#business-tab-02"
                      type="button"
                      role="tab"
                      onClick={() => setSelectedDurations(prev => ({ ...prev, [item._id]: 'yearly' }))}
                    >
                      Yearly
                    </button>
                  </li>
                </ul>

                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active pb-lg-5"
                    id="business-tab-01"
                    role="tabpanel"
                  >
                    <h3>
                      {item?.price?.monthly} AED <sup>/ Per Month</sup>
                    </h3>
                    <p className="fz-14">
                      {item?.description}
                    </p>
                    {item?.features?.map((fet, index) =>
                      <ul className="custom-content-list" key={index}>
                        <li>
                          <span>{fet?.title}</span>: {fet?.detail}
                        </li>
                      </ul>)}
                  </div>
                  <div className="tab-pane fade" id="business-tab-02" role="tabpanel">
                    <h3>
                      {item?.price?.yearly} AED <sup>/ Per Year       {
                        (() => {
                          const monthly = item?.price?.monthly || 0;
                          const yearly = item?.price?.yearly || 0;
                          const regularYearly = monthly * 12;

                          if (yearly >= regularYearly || monthly === 0) return null;

                          const percentOff = ((regularYearly - yearly) / regularYearly) * 100;
                          return ` (${percentOff.toFixed(0)}% off)`;
                        })()
                      }
                      </sup>
                    </h3>
                    <p className="fz-14">
                      {item?.description}
                    </p>
                    {item?.features?.map((fet, index) =>
                      <ul className="custom-content-list" key={index}>
                        <li>
                          <span>{fet?.title}</span>: {fet?.detail}
                        </li>
                      </ul>)}
                  </div>
                </div>
                <div className="membership-btn">
                  <button
                    type='button'
                    onClick={() => handleBuy(item, selectedDurations[item._id] || 'monthly')}
                    className="thm-btn w-100"
                  >
                    {item?.btnText}
                  </button>

                </div>
              </div>
            </div>)}
          {membershipData?.filter(item => item.topChoice)?.length > 0 && membershipData?.filter(item => item.topChoice).map((item, key) =>
            <div className="col-lg-6" key={key}>
              <div className="membership-cards membership-dark mb-0">
                <span className="popular-tag">Most popular plan</span>
                <span className="membership-badge">
                  <img src={images.reward} alt="" />
                </span>
                <h4 className="text-white">{item?.name}</h4>
                <ul className="nav" id="myTab" role="tablist">
                  <li className="tab-item" role="presentation">
                    <button
                      className={`tab-link ${selectedDurations[item._id] !== 'yearly' ? 'active' : ''}`}
                      data-bs-toggle="tab"
                      data-bs-target={`#signature-tab-01-${key}`}
                      type="button"
                      role="tab"
                      onClick={() => setSelectedDurations(prev => ({ ...prev, [item._id]: 'monthly' }))}
                    >
                      Monthly
                    </button>
                  </li>
                  <li className="tab-item" role="presentation">
                    <button
                      className={`tab-link ${selectedDurations[item._id] === 'yearly' ? 'active' : ''}`}
                      data-bs-toggle="tab"
                      data-bs-target={`#signature-tab-02-${key}`}
                      type="button"
                      role="tab"
                      onClick={() => setSelectedDurations(prev => ({ ...prev, [item._id]: 'yearly' }))}
                    >
                      Yearly
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className={`tab-pane fade show pb-lg-5 ${selectedDurations[item._id] !== 'yearly' ? 'active' : ''}`}
                    id={`signature-tab-01-${key}`}
                    role="tabpanel"
                  >
                    <h3 className="text-white">
                      {item?.price?.monthly} AED <sup>/ Per Month</sup>
                    </h3>
                    <p className="fz-14 text-white">
                      {item?.description}
                    </p>
                    {item?.features?.map((fet, index) =>
                      <ul className="custom-content-list" key={index}>
                        <li>
                          <span>{fet?.title}</span>: {fet?.detail}
                        </li>

                      </ul>)}

                  </div>
                  <div
                    className={`tab-pane fade pb-lg-5 ${selectedDurations[item._id] === 'yearly' ? 'active' : ''}`}
                    id={`signature-tab-02-${key}`}
                    role="tabpanel"
                  >
                    <h3 className="text-white">
                      {item?.price?.yearly} AED <sup>/ Per Year       {
                        (() => {
                          const monthly = item?.price?.monthly || 0;
                          const yearly = item?.price?.yearly || 0;
                          const regularYearly = monthly * 12;

                          if (yearly >= regularYearly || monthly === 0) return null;

                          const percentOff = ((regularYearly - yearly) / regularYearly) * 100;
                          return ` (${percentOff.toFixed(0)}% off)`;
                        })()
                      }
                      </sup>
                    </h3>
                    <p className="fz-14 text-white">
                      {item?.description}
                    </p>
                    {item?.features?.map((fet, index) =>
                      <ul className="custom-content-list" key={index}>
                        <li>
                          <span>{fet?.title}</span>: {fet?.detail}
                        </li>

                      </ul>)}
                  </div>
                </div>
                <div className="membership-btn">
                  <button
                    type='button'
                    onClick={() => handleBuy(item, selectedDurations[item._id] || 'monthly')}
                    className="thm-btn w-100 becm-mem-thm-btn"
                  >
                    {item?.btnText}
                  </button>

                </div>
              </div>
            </div>)}
          </div>
        </div>
      </section>
    </div>

  )
}

export default ProviderBenefit
