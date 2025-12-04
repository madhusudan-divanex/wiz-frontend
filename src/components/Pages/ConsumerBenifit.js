import React, { useEffect, useState } from 'react'
import { getApiData, getSecureApiData } from '../../services/api'
import { toast } from 'react-toastify'

function ConsumerBenifit() {
   const [membershipData, setMembershipData] = useState([])
    const [addOnData, setAddOnData] = useState([])
  
    async function fetchMembershipdata() {
      try {
        const result = await getApiData('get-membership?type=consumer')
        if (result.status) {
          setMembershipData(result.membershipData)
        } else {
          toast.error(result.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
    async function fetchAddOnData() {
      try {
        const result = await getApiData('get-addon')
        if (result.status) {
          setAddOnData(result.addOnData)
        } else {
          toast.error(result.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
    useEffect(() => {
      fetchMembershipdata()
      fetchAddOnData()
    }, [])
  
    const handleBuy = (item) => {
    }
  return (
    <div className='newBnr'>
  <section className="membership-bnnr membership-consumer">
    <div className="container">
      <h1>Welcome to Wizbizla</h1>
      <p>Unlock Exclusive Benefits on the Wizbizla Platform</p>
    </div>
  </section>
  <section className="membership-sec tp-space">
    <div className="container">
      <h2 className="title mb-3">Select Your Ideal Membership</h2>
      <p className="fz-18 mb-4">
        Unlock your perfect fit with Wizbizla! Whether you prefer the
        flexibility of our Free Self-Service option or the hands-on support of
        our personalized assistance package, we’ve got you covered. Tailored for
        busy professionals and expats, enjoy dedicated help from the Wizbizla
        team to meet your unique needs.
      </p>
      <div className="row">
        <div className="col-lg-12">
          <div className="membership-cards h-auto">
            <h4>Enhance Your Experience with Our Exclusive Add-On Services</h4>
            <div className="custom-content-list ">
            {addOnData?.length > 0 &&
                  addOnData?.map((item, key) =>
                    <div className="row" key={key}>
                      <div className='col-lg-10 col-md-8 col-sm-12'>
                        <p>
                          {item?.name}: {item?.description}
                        </p>
                      </div>
                      <div className='col-lg-2 col-md-4 col-sm-12'>
                        {" "}
                        <p className='text-start'>
                          AED {item?.price}<span className='text-capitalize'>/ {item?.type}</span>
                        </p>
                      </div>
                    </div>)}
            </div>
          </div>
        </div>
        {membershipData?.filter(item => !item.topChoice)?.length > 0 && membershipData?.filter(item => !item.topChoice).map((item, key) =>
            <div className="col-lg-6" key={key}>
              <div className="membership-cards">
                <h4>{item?.name}</h4>
                <h3 className="tab-item">{item?.price?.monthly == 0 && 'Free'}</h3>
                <p className="fz-14">
                  {item?.description}
                </p>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="business-tab-01"
                    role="tabpanel"
                  >
                    {item?.features?.map((fet, index) =>
                      <ul className="custom-content-list" key={index}>
                        <li>
                          <span>{fet?.title}</span>: {fet?.detail}
                        </li>

                      </ul>)}

                  </div>
                </div>
                <div className="membership-btn">
                  <button onClick={()=>handleBuy(item)} className="thm-btn w-100">
                    {item?.btnText}
                  </button>
                </div>
              </div>
            </div>)}
          {membershipData?.filter(item => item.topChoice)?.length > 0 && membershipData?.filter(item => item.topChoice).map((item, key) =>
            <div className="col-lg-6" key={key}>
              <div className="membership-cards membership-dark membership-dark-second">
                <p className="popular-tag popular-tag-second">
                  <span>
                    Top 1% Choice <br />
                  </span>
                  Preferred by leading businesses!
                </p>
                <h4 className="text-white">{item?.name}</h4>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="signature-tab-01"
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
                    {/* <ul className="custom-content-list">
                <li>
                  5 Bespoke Concierge Services for a Seamless, Time-Saving,
                  Risk-Free Experience!
                </li>
                <li>Custom Search: Tailored to your needs.</li>
                <li>Vetting: Full checks and onboarding.</li>
                <li>Dispute Support: Help with any issues.</li>
                <li>Joining fee AED 300 + VAT</li>
                <li>20% discount for annual subscription (2 months free)</li>
              </ul> */}
                  </div>
                </div>
                <div className="membership-btn">
                   <button onClick={()=>handleBuy(item)} className="thm-btn w-100 light-btn">
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

export default ConsumerBenifit
