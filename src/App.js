import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

import Login from "./pages/Login/LoginPage";
import Public from "./pages/Public";
//get review
import GetReviews from "./pages/Get Review/GetReviews";
import PastWedding from "./pages/Get Review/pastWedding";
import FutureWedding from "./pages/Get Review/futureWedding";
import CopyLink from "./pages/Get Review/reviewLink";

import ManageReview from "./pages/ManageReview";
import ReviewWidget from "./pages/Showcase/reviewWidget";
import AwardBadges from "./pages/Showcase/awardBadges";
import Promotions from "./pages/Promotions";
import Shop from "./pages/Shop";
import Enquiries from "./pages/Enquiries";
import BusinessSetting from "./pages/Settings/businessSettings";
import UpdateListing from "./pages/Settings/updateListing";
import upgradeNow from "./pages/upgradeNow";
import SignUp from "./pages/SignUp/SignUp";
import { AuthProvider } from "./context/AuthProvider";
import Home from "./pages/Dashboard/Home";
import RequireAuth from "./components/RequireAuth";
import Profile from "./pages/MyProfile2/profile";
import Directory from "./pages/Directory/index";
import CoupleSignUp from "./pages/Couples/Signup/index";
import CouplesLogin from "./pages/Couples/Login/index";
const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Public />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/wedding-signup" element={<CoupleSignUp />} />
        <Route path="/wedding-login" element={<CouplesLogin />} />

        <Route
          path="/*"
          element={
            <RootLayout>
              <Routes>
                <Route
                  path="/home"
                  element={
                    <RequireAuth>
                      <Home />
                    </RequireAuth>
                  }
                />
                {/* Get review */}
                <Route path="/get-reviews" element={<GetReviews />} />
                <Route
                  path="/get-reviews/past-wedding"
                  element={<PastWedding />}
                />
                <Route
                  path="/get-reviews/future-wedding"
                  element={<FutureWedding />}
                />
                <Route path="/get-reviews/copy-link" element={<CopyLink />} />
                <Route path="/manage-review" element={<ManageReview />} />
                <Route
                  path="/showcase/review-widget"
                  element={<ReviewWidget />}
                />
                <Route
                  path="/showcase/award-badges"
                  element={<AwardBadges />}
                />
                <Route path="/settings" element={<BusinessSetting />} />
                <Route
                  path="/settings/update-listing"
                  element={<UpdateListing />}
                />
                <Route path="/promotions" element={<Promotions />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/enquiries" element={<Enquiries />} />
                <Route path="/my-profile" element={<Profile />} />
                <Route path="/upgrade" element={<upgradeNow />} />
                {/* <Route path="/test" element={<Profile />} /> */}
              </Routes>
            </RootLayout>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
