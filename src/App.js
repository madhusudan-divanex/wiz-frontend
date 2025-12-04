import logo from './logo.svg';
// import './App.css';
import './assets/css/style.css'
import './assets/css/responsive.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/authentication/Login';
import Layout from './layout/Layout';
import Otp from './components/authentication/Otp';
import ForgotMail from './components/authentication/ForgotMail';
import CheckMail from './components/authentication/CheckMail';
import SetPasssword from './components/authentication/SetPasssword';
import PasswordReset from './components/authentication/PasswordReset';
import ServiceProviders from './components/onboarding/ServiceProviders';
import SignUp from './components/onboarding/SignUp';
import Membership from './components/onboarding/Membership';
import PaymentGateway from './components/onboarding/PaymentGateway';
import ConsumerMembership from './components/onboarding/ConsumerMembership';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './ProtectedRoutes';
import ThankYou from './components/provider/Form/ThankYou'
import ProfileView from './components/provider/Form/ProfileView';
import GoldenProfileView from './components/provider/GoldenForm/ProfileView';
import ProviderLayout from './components/provider/Layout/main'
import ProviderDashboard from './components/provider/Dashboard/Dashboard'
import Test from './components/Test';
import UpgradePremium from './components/provider/Dashboard/UpgradePremium';
import PostingHistory from './components/provider/Dashboard/PostingHistory';
import Advertisement from './components/provider/Dashboard/Advertisement';
import Conversations from './components/provider/Dashboard/Conversations';
import Bookmark from './components/provider/Dashboard/Bookmark';
import CustomerRating from './components/provider/Dashboard/CustomerRating';
import MyAddon from './components/provider/Dashboard/MyAddon';
import Loyality from './components/provider/Dashboard/Loyality';
import References from './components/provider/Dashboard/References';
import Billing from './components/provider/Dashboard/Billing';
import Analytics from './components/provider/Dashboard/Analytics';
import Setting from './components/provider/Dashboard/Setting';
import Notification from './components/provider/Dashboard/Notification';
import ShareFeedback from './components/provider/Dashboard/ShareFeedback';
import ReferencesRequest from './components/provider/Dashboard/ReferencesRequest';
import Purchase from './components/provider/Dashboard/Purchase';
import ScamPprevention from './components/Pages/ScamPprevention';
import Faq from './components/Pages/Faq';
import Podcast from './components/Pages/Podcast';
import ScamTracker from './components/Pages/ScamTracker';
import MissionVission from './components/Pages/MissionVission';
import AboutWizbizla from './components/Pages/AboutWizbizla';
import AccreditationProcess from './components/Pages/AccreditationProcess';
import StandardsExcellence from './components/Pages/StandardsExcellence';
import LoyaltyRewards from './components/Pages/LoyaltyRewards';
import ReferenceProgramme from './components/Pages/ReferenceProgramme';
import ConsumerBenifit from './components/Pages/ConsumerBenifit';
import ProviderBenefit from './components/Pages/ProviderBenefit';
import BespokeConcierge from './components/Pages/BespokeConcierge';
import FindProvider from './components/Pages/FindProvider';
import SubCategory from './components/Pages/SubCategory';
import HowCompBusProfile from './components/Pages/HowCompBusProfile';
import Blog from './components/Pages/Blog';
import BlogDetail from './components/Pages/BlogDetail';
import ScamTip from './components/Pages/ScamTip';
import ScamAlert from './components/Pages/ScamAlert';
import CaseStudy from './components/Pages/CaseStudy';
import ReportScam from './components/Pages/ReportScam';
import TermsOfUse from './components/Pages/TermsOfUse';
import PrivacyPolicy from './components/Pages/PrivacyPolicy';
import Disclaimer from './components/Pages/Disclaimer';
import ScamTrackerDetail from './components/Pages/ScamTrackerDetail';
import OldBespoke from './components/Pages/OldBespoke';
import WizbizlaExclance from './components/Pages/WizbizlaExclance';
import DisputeResoultion from './components/Pages/DisputeResoultion';
import NotFound from './components/Pages/NotFound';
import ProviderProfile from './components/provider/Form/ViewProfile';
import FindProfile from './components/provider/FindProfile';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ConsumerProfile from './components/consumer/Form/ConsumerProfile';
import ConsumerLayout from './components/consumer/Layout/Main'
import Listing from './components/consumer/Listing';
import ConsumerDashboard from './components/consumer/Dashboard';
import ConsumerBookmark from './components/consumer/Bookmark';
import ConsumerChat from './components/consumer/Chat';
import ConsumerPostingHistory from './components/consumer/PostingHistory';
import EditProfile from './components/consumer/EditProfile';
import ConsumerRating from './components/consumer/Rating';
import ConsumerFeedback from './components/consumer/Feedback';
import ConsumerService from './components/consumer/Service';
import ConsumerPurchase from './components/consumer/Purchase';
import ConsumerNotification from './components/consumer/Notification';
import ConsumerReferencesRequest from './components/consumer/ReferenceRequest';
import ProviderEditProfile from './components/provider/Dashboard/ProviderEditProfile';
import ProviderPaymentGateway from './components/provider/Dashboard/PaymentGateway';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/otp' element={<Otp />} />
          <Route path='/forgot-mail' element={<ForgotMail />} />
          <Route path='/check-mail/:email' element={<CheckMail />} />
          <Route path='/set-new-password/:id' element={<SetPasssword />} />
          <Route path='/password-reset' element={<PasswordReset />} />
          <Route path='/vip' element={
            <ProtectedRoute >
              <GoldenProfileView />
            </ProtectedRoute>
          } />
          <Route path='/profile' element={<ProtectedRoute >
            <ProfileView />
          </ProtectedRoute>} />
          {/* <Route path='/view-profile' element={<ProtectedRoute >
            <ViewProfile />
          </ProtectedRoute>} /> */}
          <Route path='/thank-you' element={<ProtectedRoute >
            <ThankYou />
          </ProtectedRoute>} />


          {/* Sign Up  */}
          <Route path='/' element={<ServiceProviders />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/membership' element={<ProtectedRoute>
            <Membership />
          </ProtectedRoute>} />
          <Route path='/provider/upgrade-membership' element={<ProtectedRoute>
            <UpgradePremium />
          </ProtectedRoute>} />
          <Route path='/payment-gateway' element={<ProtectedRoute>
            <PaymentGateway />
          </ProtectedRoute>} />
          <Route path='/consumer-membership' element={<ProtectedRoute>
            <ConsumerMembership />
          </ProtectedRoute>} />
          <Route path='/scam-prevention' element={<ScamPprevention />} />
          <Route path='/faq' element={<Faq />} />
          <Route path='/podcast' element={
            <Podcast />} />
          <Route path='/scam-tracker' element={
            <ScamTracker />} />
          <Route path='/scam-tracker-detail/:title/:id' element={<ScamTrackerDetail />} />
          <Route path='/old-version' element={<OldBespoke />} />
          <Route path='/excallance' element={<WizbizlaExclance />} />
          <Route path='/mission-vision' element={<MissionVission />} />
          <Route path='/about-wizbizla' element={<AboutWizbizla />} />
          <Route path='/dispute-resolution' element={<DisputeResoultion />} />
          <Route path='/accreditation-process' element={<AccreditationProcess />} />
          <Route path='/standards-excellence' element={<StandardsExcellence />} />
          <Route path='/loyalty-rewards' element={<LoyaltyRewards />} />
          <Route path='/provider/profile' element={<ProviderProfile />} />
          <Route path='/reference-programme' element={<ReferenceProgramme />} />
          <Route path='/consumer-membership-benefit' element={<ConsumerBenifit />} />
          <Route path='/provider-membership-benefit' element={
            <ProviderBenefit />} />
          <Route path='/bespoke-concierge' element={<BespokeConcierge />} />
          <Route path='/find-provider' element={<FindProvider />} />
          <Route path='/sub-category/:id' element={<SubCategory />} />
          <Route path='/how-complete-business-profile' element={<HowCompBusProfile />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/blog-detail/:name/:id' element={<BlogDetail />} />
          <Route path='/scam-tips' element={<ScamTip />} />
          <Route path='/scam-alert' element={<ScamAlert />} />
          <Route path='/case-study' element={<CaseStudy />} />
          <Route path='/wizbizla/provider' element={<FindProfile />} />
          <Route path='/report-scam' element={<ReportScam />} />
          <Route path='/disclaimer' element={<Disclaimer />} />
          <Route path='/terms-of-use' element={<TermsOfUse />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
          <Route path='/service-payment' element={<ProtectedRoute>
            <ProviderPaymentGateway />
          </ProtectedRoute>} />
        </Route>
        <Route path='/' element={<ProviderLayout />}>
          <Route path='/testing' element={<ProtectedRoute >
            <Test />
          </ProtectedRoute>} />
          <Route path='/provider/dashboard' element={<ProtectedRoute>
            <ProviderDashboard />
          </ProtectedRoute>} />
          <Route path='/provider/posting-history' element={<ProtectedRoute>
            <PostingHistory />
          </ProtectedRoute>} />
          

          <Route path='/provider/advertisement' element={<ProtectedRoute>
            <Advertisement />
          </ProtectedRoute>} />
          <Route path='/provider/chat' element={<ProtectedRoute>
            <Conversations />
          </ProtectedRoute>} />
          <Route path='/provider/bookmark' element={<ProtectedRoute>
            <Bookmark />
          </ProtectedRoute>} />
          <Route path='/provider/customer-rating' element={<ProtectedRoute>
            <CustomerRating />
          </ProtectedRoute>} />
          <Route path='/provider/add-on' element={<ProtectedRoute>
            <MyAddon />
          </ProtectedRoute>} />
          <Route path='/provider/loyality' element={<ProtectedRoute>
            <Loyality />
          </ProtectedRoute>} />
          <Route path='/provider/references' element={<ProtectedRoute>
            <References />
          </ProtectedRoute>} />
          <Route path='/provider/billing' element={<ProtectedRoute>
            <Billing />
          </ProtectedRoute>} />
          <Route path='/provider/analytics' element={<ProtectedRoute>
            <Analytics />
          </ProtectedRoute>} />
          <Route path='/provider/setting' element={<ProtectedRoute>
            <Setting />
          </ProtectedRoute>} />
          <Route path='/provider/notification' element={<ProtectedRoute>
            <Notification />
          </ProtectedRoute>} />
          <Route path='/provider/feedback' element={<ProtectedRoute>
            <ShareFeedback />
          </ProtectedRoute>} />
          <Route path='/provider/reference-request' element={<ProtectedRoute>
            <ReferencesRequest />
          </ProtectedRoute>} />
          
          <Route path='/provider/purchase' element={<ProtectedRoute>
            <Purchase />
          </ProtectedRoute>} />
          <Route path='/provider/edit-profile' element={<ProtectedRoute>
            <ProviderEditProfile />
          </ProtectedRoute>} />

        </Route>
        {/* consumer  */}
        <Route path='/' element={<ConsumerLayout />}>
          <Route path='/consumer/profile' element={<ProtectedRoute>
            <ConsumerProfile />
          </ProtectedRoute>} />
          <Route path='/consumer/listing' element={<ProtectedRoute>
            <Listing />
          </ProtectedRoute>} />
          <Route path='/consumer/dashboard' element={<ProtectedRoute>
            <ConsumerDashboard />
          </ProtectedRoute>} />
          <Route path='/consumer/bookmark' element={<ProtectedRoute>
            <ConsumerBookmark />
          </ProtectedRoute>} />
          <Route path='/consumer/chat' element={<ProtectedRoute>
            <ConsumerChat />
          </ProtectedRoute>} />
          <Route path='/consumer/posting-history' element={<ProtectedRoute>
            <ConsumerPostingHistory />
          </ProtectedRoute>} />
          <Route path='/consumer/edit-profile' element={<ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>} />
          <Route path='/consumer/rating' element={<ProtectedRoute>
            <ConsumerRating />
          </ProtectedRoute>} />
          <Route path='/consumer/feedback' element={<ProtectedRoute>
            <ConsumerFeedback/>
          </ProtectedRoute>} />
           <Route path='/consumer/service' element={<ProtectedRoute>
            <ConsumerService/>
          </ProtectedRoute>} />
          <Route path='/consumer/purchase' element={<ProtectedRoute>
            <ConsumerPurchase/>
          </ProtectedRoute>} />
          <Route path='/consumer/notification' element={<ProtectedRoute>
            <ConsumerNotification/>
          </ProtectedRoute>} />
          <Route path='/consumer/reference' element={<ProtectedRoute>
            <ConsumerReferencesRequest/>
          </ProtectedRoute>} />
        </Route>


      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
