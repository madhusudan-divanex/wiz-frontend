import React from 'react'
import images from '../../../assets/images';
import { toast } from 'react-toastify';
import { postApiData } from '../../../services/api';
import { useSelector } from 'react-redux';
import { Splide, SplideSlide } from '@splidejs/react-splide';

function Loyality() {
  const userId = localStorage.getItem('userId');
  const [email, setEmail] = React.useState('');
  const [isData, setIsData] = React.useState(true);
  const { profileData } = useSelector(state => state.user);
  const handleCopy = () => {
    navigator.clipboard.writeText(`http://216.48.189.66:9758?invite=${userId}`)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy!", err);
      });
  };
  async function inviteUser() {
    if (email == '') {
      return
    }
    const data = { userId, email, link: `http://216.48.189.66:9758?invite=${userId}` }
    try {
      const result = await postApiData('api/users/invite-user', data)
      if (result.success) {
        toast.success("Invitation sent successfully")
        setEmail('')
      }
    } catch (error) {

    }
  }
  return (
    <>
      {isData ?
        <div className="main-section posting-histry-sec flex-grow-1">
          <div className="row dash-profile-overflow posting-histry-main-box pt-4 p-0 mx-lg-2 mx-sm-0">
            <div className="d-lg-none d-md-block">
              <a href="javascript:void(0)">
                <i className="fa-solid fa-angle-left" />
                Back
              </a>
            </div>
            <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="dash-profile-sec dash-profile-service-link loyalty-referal-bx">
                  <div>
                    <div className="main-profile-sec">
                      <h3>Sam, take the points for referring friends to Wizbizla!</h3>
                      <ul>
                        <li className="divider" />
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="dash-pro-service-link-box loyalty-referal-box ">
                        <div>
                          <p className="py-3">
                            Earn up to 500 in Wizbizla points — from each referral.
                          </p>
                          <div className="custom-frm-bx mt-2 mb-0">
                            <label htmlFor="">
                              Invite Friends Through Email{" "}
                              <span className="start-icon">*</span>
                            </label>
                            <input
                              type="email"
                              className="form-control position-relative"
                              placeholder="Wizbizla"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <div>
                              <button onClick={inviteUser} className="btn btn-primary referal-btn">
                                Send Invitations
                              </button>
                            </div>
                            <div className="d-flex justify-content-between align-items-baseline pt-3">
                              <h5 className="mb-0">Separate Emails with Commas</h5>
                              <h6>
                                <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#exampleModal" className="email-previw">
                                  Preview Email
                                </a>
                              </h6>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-10 col-md-6 col-sm-12">
                            <div className="custom-frm-bx mt-2">
                              <label htmlFor="">
                                Or Share Your Personal Referral Link{" "}
                                <span className="start-icon">*</span>
                              </label>
                              <input
                                type="email"
                                className="form-control positi-relative"
                                value={`http://216.48.189.66:9758?invite=${userId}`}
                                placeholder="http://216.48.189.66:9758?invite="
                                defaultValue=""
                              />
                              <div>
                                <button onClick={handleCopy} className="btn btn-primary referal-btn">
                                  Copy
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2 col-md-6 col-sm-12 d-flex align-items-center justify-content-between px-0">
                            <ul className="d-flex ">
                              <li className="border-0">
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`http://216.48.189.66:9758?invite=${userId}`)}`} target='_blank'>
                                  <i className="fa-brands fa-facebook-f referal-icon fb-color" />
                                </a>
                              </li>
                              <li className="border-0">
                                <a href={`https://twitter.com/intent/tweet?url=http://216.48.189.66:9758?invite=${userId}&text=Wizbizla`} target='_blank'>
                                  <i className="fa-brands fa-x-twitter referal-icon twittr-color" />
                                </a>
                              </li>
                              <li className="border-0">
                                <a href={`https://api.whatsapp.com/send?text=Wizbizla http://216.48.189.66:9758?invite=${userId}`} target='_blank'>
                                  <i className="fa-brands fa-whatsapp referal-icon whatapp-color" />
                                </a>
                              </li>
                              <li className="border-0">
                                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=http://216.48.189.66:9758?invite=${userId}`} target='_blank'>
                                  <i className="fa-brands fa-linkedin-in referal-icon linkedn-color" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="dash-profile-sec dash-profile-share-feedback">
                <div>
                  <div className="main-profile-sec">
                    <h3 className='my-2 fw-500'>It’s Easy to Earn with Referrals!</h3>
                    <ul>
                      <li className="divider" />
                    </ul>
                    <h6 className='my-2 mx-4 mt-4'>Invite Friends, They Get a Discount, and You Reap the Rewards</h6>
                    <p className='my-2  mx-4'>Sharing the benefits of Wizbizla has never been easier! Here’s how you can earn big just by spreading the word:</p>
                  </div>
                </div>
                <div id="feedback-slider">
                  <Splide
                    options={{
                      type: "loop",
                      perPage: 3,
                      perMove: 1,
                      gap: "1rem",
                      autoplay: true,
                      interval: 3000,
                      breakpoints: {
                        1024: { perPage: 3 },
                        768: { perPage: 1 },
                      },
                      pagination: false,
                      arrows: false,
                    }}
                    aria-label="Feedback Options"
                  >


                    <SplideSlide>
                      <div className="feedback-card">
                        <div className="icon">
                          <i className="fa-regular fa-star dash-feed-icon" />
                          {/* <img src='/assets/images/sup-2.png'/> */}
                        </div>
                        <h5>Refer a Friend</h5>
                        <p>
                          Use your personal referral link to invite friends through email or share the news on social media. Let them in on the secret to boosting their business visibility!
                        </p>
                      </div>
                    </SplideSlide>


                    <SplideSlide>
                      <div className="feedback-card">
                        <div className="icon">
                          <i className="fa-regular fa-comment-dots dash-feed-icon" />
                        </div>
                        <h5>They Enjoy a Discount</h5>
                        <p>
                          When your referrals join Wizbizla, they’ll receive 10% off their first month’s membership! It’s a win-win opportunity that makes joining even more enticing
                        </p>
                      </div>
                    </SplideSlide>


                    <SplideSlide>
                      <div className="feedback-card">
                        <div className="icon">
                          <i className="fas fa-triangle-exclamation dash-feed-icon" />
                        </div>
                        <h5>You Earn points</h5>
                        <p>
                          Once your friends complete their membership payment, you’ll receive a whopping 500 Wizbizla points! These points can be redeemed for advertising slots around the platform, amplifying your visibility and helping your business shine even brighter.
                        </p>
                      </div>
                    </SplideSlide>
                  </Splide>
                </div>
              </div>
            </div>
          </div>
          <div className="row dash-profile-overflow mt-4 mx-lg-2 mx-sm-0">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="dash-profile-sec dash-profile-service-link">
                <div>
                  <div className="main-profile-sec">
                    <h3>Frequently asked questions</h3>
                    <ul>
                      <li className="divider" />
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="dash-pro-service-link-box dash-board-pro-service-link-box loyalty-supp-bx">
                      <h5 className="pt-4">Validity of WizBiz Rewards</h5>
                      <p>
                        1. WizBiz Rewards are valid for one year from the date a member
                        undertakes, receives, or enters into any specified applicable
                        transaction (the “Validity Period”).
                      </p>
                      <p>
                        2. According to Wizbizla’s standard practice, WizBiz Rewards
                        will expire and be deducted from a member’s account after the
                        full validity period (the “Standard Expiry”).
                      </p>
                      <p>
                        3. For example, if the last day of the validity period for a
                        member’s WizBiz Rewards is December 31, 2025, the standard
                        expiry date for those rewards will be December 31, 2025. Unused
                        rewards that have expired and been deducted from a member’s
                        account will not be re-credited and will be considered forfeited
                        by the member.
                      </p>
                      <p>
                        4. Members are responsible for keeping track of the number of
                        WizBiz Rewards in their account and their expiry date. This
                        information can be monitored at any time on the website under
                        their account profile.
                      </p>
                      <p>
                        5. If WizBiz Rewards are redeemed for a reward that is later
                        cancelled and those rewards have since expired in accordance
                        with the program rules, they will not be eligible for a refund
                        or reinstatement
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 d-flex align-items-end">
                    <div className="d-flex justify-content-center">
                      <img
                        src={images?.dashCustomPic}
                        alt=""
                        className="w-75"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        :
        <div className="main-section posting-histry-sec flex-grow-1">
          <div className="row dash-profile-overflow posting-histry-main-box mt-4 p-0">
            <div className="posting-hist-btn-bx d-flex justify-content-between align-items-center mb-2">
              <h2>Wizbizla Loyalty Rewards Programme Form</h2>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="main-profile-sec dash-profile-sec">
                <div className="main-profile-sec">
                  <h3>Available Points</h3>
                  <ul>
                    <li className="divider" />
                  </ul>
                </div>
                <div className="posting-history-crd-box">
                  <p>
                    Please provide the email address of the Individual/company you
                    referred:
                  </p>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="custom-frm-bx">
                        <label htmlFor="">
                          Account Name <span className="start-icon">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter account name"
                          defaultValue=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="custom-frm-bx">
                        <label htmlFor="">
                          Email Address <span className="start-icon">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter email address"
                          defaultValue=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="custom-frm-bx">
                        <label htmlFor="">
                          Wizbizla Profile URL <span className="start-icon">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter profile URL"
                          defaultValue=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="custom-frm-bx">
                        <label htmlFor="">
                          Contact Person Name<span className="start-icon">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter contact person name"
                          defaultValue=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="custom-frm-bx">
                        <label htmlFor="">
                          Phone Number <span className="start-icon">*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter phone number"
                          defaultValue=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row dash-profile-overflow mt-4">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="main-profile-sec dash-profile-sec">
                <div className="posting-hostry-main-sec">
                  <div className="posting-hostry-title-header-box loyalty-rewrd-point-bx">
                    <h3 className="mb-0">Referral Program</h3>
                    <div className="localty-ern-tp-heading">
                      <h5 className="text-end mb-0">500</h5>
                      <p className="text-end">Points Per Referral</p>
                    </div>
                  </div>
                  <ul>
                    <li className="divider" />
                  </ul>
                </div>
                <div className="posting-history-crd-box">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="custom-frm-bx">
                        <label htmlFor="">
                          Referral’s Email Address:{" "}
                          <span className="start-icon">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter email address"
                          defaultValue=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="custom-frm-bx">
                        <label htmlFor="">
                          Date of Referral <span className="start-icon">*</span>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          placeholder="Select date"
                          defaultValue=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="custom-frm-bx">
                        <label htmlFor="">
                          Referral Account Name (If Known){" "}
                          <span className="start-icon">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter account name"
                          defaultValue=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="custom-frm-bx">
                        <label htmlFor="">
                          Referral Status <span className="start-icon">*</span>
                        </label>
                        <div className="d-flex gap-3">
                          <div className="form-check custom-radio-purple">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="radioDefault"
                              id="radioDefaultreg"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="radioDefaultreg"
                            >
                              Registered
                            </label>
                          </div>
                          <div className="form-check custom-radio-purple">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="radioDefault"
                              id="radioDefaultpending"
                              defaultChecked=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="radioDefaultpending"
                            >
                              Pending
                            </label>
                          </div>
                          <div className="form-check custom-radio-purple">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="radioDefault"
                              id="radioDefaultnotreg"
                              defaultChecked=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="radioDefaultnotreg"
                            >
                              Not Registered&nbsp;
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row dash-profile-overflow mt-4">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="main-profile-sec dash-profile-sec">
                <div className="posting-hostry-main-sec">
                  <div className="posting-hostry-title-header-box loyalty-rewrd-point-bx">
                    <h3 className="mb-0">Redeem Points</h3>
                    <div className="localty-ern-tp-heading">
                      <h5 className="text-end mb-0">26,000</h5>
                      <p className="text-end">Total Points Available</p>
                    </div>
                  </div>
                  <ul>
                    <li className="divider" />
                  </ul>
                </div>
                <div className="posting-history-crd-box">
                  <div className="row">
                    <p>Please provide details on any complaints you resolved:</p>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="custom-frm-bx">
                        <label htmlFor="">
                          Dispute ID <span className="start-icon">*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter email address"
                          defaultValue=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="custom-frm-bx">
                        <label htmlFor="">
                          Date Resolved <span className="start-icon">*</span>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          placeholder="Select date"
                          defaultValue=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="custom-frm-bx">
                        <label htmlFor="">
                          Details of Resolution <span className="start-icon">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          placeholder="Enter answer"
                          id="floatingTextarea2"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="custom-frm-bx">
                        <label htmlFor="">
                          Was the resolution accepted by the customer?{" "}
                          <span className="start-icon">*</span>
                        </label>
                        <div className="d-flex gap-3">
                          <div className="form-check custom-radio-purple">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="radioDefault"
                              id="radioDefaultright"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="radioDefaultright"
                            >
                              Yes
                            </label>
                          </div>
                          <div className="form-check custom-radio-purple">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="radioDefault"
                              id="radioDefaultwrong"
                              defaultChecked=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="radioDefaultwrong"
                            >
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row dash-profile-overflow mt-4">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="main-profile-sec dash-profile-sec">
                <div className="posting-hostry-main-sec p-0">
                  <div className="posting-hostry-title-header-box loyalty-rewrd-point-bx">
                    <h3 className="mb-0">Redeem Points</h3>
                    <div className="localty-ern-tp-heading">
                      <h5 className="text-end mb-0">26,000</h5>
                      <p className="text-end">Total Points Available</p>
                    </div>
                  </div>
                  <ul>
                    <li className="divider" />
                  </ul>
                </div>
                <div className="">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="-reward-table-responsive">
                        <table className="table mb-0 reward-table">
                          <thead className="table-reward-header">
                            <tr>
                              <th className="text-start">Reward Option</th>
                              <th className="text-end">Points Required</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="align-middle">
                                <div className="custom-frm-bx mb-0">
                                  <div className="form-check form-check-first ">
                                    <input
                                      className="form-check-input form-chk-input custom-checkbox"
                                      type="checkbox"
                                      defaultValue=""
                                      id="checkDefaultone-f"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="checkDefaultone-f"
                                    >
                                      Banner Advertisement in Subcategories
                                    </label>
                                  </div>
                                </div>
                              </td>
                              <td className="text-end align-middle">1,000</td>
                            </tr>
                            <tr>
                              <td className="align-middle">
                                <div className="custom-frm-bx mb-0">
                                  <div className="form-check form-check-first ">
                                    <input
                                      className="form-check-input form-chk-input custom-checkbox"
                                      type="checkbox"
                                      defaultValue=""
                                      id="checkDefaultone-e"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="checkDefaultone-e"
                                    >
                                      Banner Advertisement in Subcategories
                                    </label>
                                  </div>
                                </div>
                              </td>
                              <td className="text-end align-middle">2,000</td>
                            </tr>
                            <tr>
                              <td className="align-middle">
                                <div className="custom-frm-bx mb-0">
                                  <div className="form-check form-check-first ">
                                    <input
                                      className="form-check-input form-chk-input custom-checkbox"
                                      type="checkbox"
                                      defaultValue=""
                                      id="checkDefaultone-d"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="checkDefaultone-d"
                                    >
                                      Banner Advertisement in Subcategories
                                    </label>
                                  </div>
                                </div>
                              </td>
                              <td className="text-end align-middle">3,000</td>
                            </tr>
                            <tr>
                              <td className="align-middle">
                                <div className="custom-frm-bx mb-0">
                                  <div className="form-check form-check-first ">
                                    <input
                                      className="form-check-input form-chk-input custom-checkbox"
                                      type="checkbox"
                                      defaultValue=""
                                      id="checkDefaultone-c"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="checkDefaultone-c"
                                    >
                                      Banner Advertisement in Subcategories
                                    </label>
                                  </div>
                                </div>
                              </td>
                              <td className="text-end align-middle">5,000</td>
                            </tr>
                            <tr>
                              <td className="align-middle">
                                <div className="custom-frm-bx mb-0">
                                  <div className="form-check form-check-first ">
                                    <input
                                      className="form-check-input form-chk-input custom-checkbox"
                                      type="checkbox"
                                      defaultValue=""
                                      id="checkDefaultone-b"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="checkDefaultone-b"
                                    >
                                      Banner Advertisement in Subcategories
                                    </label>
                                  </div>
                                </div>
                              </td>
                              <td className="text-end align-middle">5,000</td>
                            </tr>
                            <tr>
                              <td className="align-middle">
                                <div className="custom-frm-bx mb-0">
                                  <div className="form-check form-check-first ">
                                    <input
                                      className="form-check-input form-chk-input custom-checkbox"
                                      type="checkbox"
                                      defaultValue=""
                                      id="checkDefaultone-a"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="checkDefaultone-a"
                                    >
                                      Banner Advertisement in Subcategories
                                    </label>
                                  </div>
                                </div>
                              </td>
                              <td className="text-end align-middle">10,000</td>
                            </tr>
                          </tbody>
                          <tfoot className="rewrd-table-footr">
                            <tr>
                              <td className="fw-bold text-end" colSpan={2}>
                                <p className="mb-0">1,000</p>
                                <small className="text-muted">
                                  Total Points Redeemed
                                </small>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row dash-profile-overflow mt-4">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="main-profile-sec dash-profile-sec">
                <div className="posting-hostry-main-sec">
                  <div className="posting-hostry-title-header-box loyalty-rewrd-point-bx">
                    <h3 className="mb-0">Submission</h3>
                  </div>
                  <ul>
                    <li className="divider" />
                  </ul>
                </div>
                <div className="posting-history-crd-box posting-hostry-main-sec">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="custom-frm-bx rewrd-submission-chck ">
                        <div className="form-check mt-2 form-check-first ">
                          <input
                            className="form-check-input form-chk-input custom-checkbox"
                            type="checkbox"
                            defaultValue=""
                            id="checkDefaultone"
                          />
                          <label className="form-check-label" htmlFor="checkDefaultone">
                            By submitting this form, I confirm that the information
                            provided is accurate, and I understand that rewards are
                            subject to verification by Wizbizla.
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="custom-frm-bx ">
                        <label htmlFor="">
                          Date <span className="start-icon">*</span>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          placeholder="Select date"
                          defaultValue=""
                        />
                      </div>
                    </div>
                    <div className="rating-usr-toggle-bx">
                      <a
                        href="javascript:void(0)"
                        className="btn btn-primary report-btn"
                        style={{ textDecoration: "none !important" }}
                      >
                        Submit
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row dash-profile-overflow mt-4">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="dash-profile-sec dash-profile-share-feedback">
                <div>
                  <div className="main-profile-sec">
                    <h3>It’s Easy to Earn with Referrals!</h3>
                    <ul>
                      <li className="divider" />
                    </ul>
                  </div>
                </div>
                <div className="posting-history-crd-box ern-refferals-crd">
                  <div className="row">
                    <p className="ern-pra">
                      <span>
                        Invite Friends, They Get a Discount, and You Reap the Rewards!
                      </span>
                      <br />
                      Sharing the benefits of <b>Wizbizla</b> has never been easier!
                      Here’s how you can earn big just by spreading the word:
                    </p>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <div className="ern-refrals-crd-box">
                        <div className="feedback-card">
                          <div className="icon">
                            <i className="fa-regular fa-user dash-feed-icon" />
                          </div>
                          <h5 className="py-2">Refer a Friend</h5>
                          <p>
                            Use your personal referral link to invite friends through
                            email or share the news on social media. Let them in on the
                            secret to boosting their business visibility!
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <div className="ern-refrals-crd-box">
                        <div className="feedback-card">
                          <div className="icon">
                            <i className="fa-regular fa-user dash-feed-icon" />
                          </div>
                          <h5 className="py-2">They Enjoy a Discount</h5>
                          <p>
                            When your referrals join Wizbizla, they’ll receive 10% off
                            their first month’s membership! It’s a win-win opportunity
                            that makes joining even more enticing
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <div className="ern-refrals-crd-box">
                        <div className="feedback-card">
                          <div className="icon">
                            <i className="fa-regular fa-user dash-feed-icon" />
                          </div>
                          <h5 className="py-2">You Earn points</h5>
                          <p>
                            Once your friends complete their membership payment, you’ll
                            receive a whopping 500 Wizbizla points! These points can be
                            redeemed for advertising slots around the platform,
                            amplifying your visibility and helping your business shine
                            even brighter.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      }
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Earn Rewards by Referring Friends to Wizbizla!</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Hi ,<br />
              <br />

              You can earn up to 500 Wizbizla points for each friend you refer! Simply use the link below to invite your friends and start earning:<br />
              <br />
              Referral Link: http://216.48.189.66:9758?invite={userId} <br />

              It’s that easy! Let me know if you have any questions. <br /><br />

              Best, <br />
              {profileData?.firstName} {profileData?.lastName}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Loyality
