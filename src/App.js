import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

import RoutePath from "./Routes/RoutePath";
import Login from "./pages/Login/LoginPage";
import LoginUserState from "./pages/Login/LoginUserState";
import TermsConditions from "./pages/General/Termsconditions";
import Directory from "./pages/Directory/index";
import Privacy from "./pages/General/Privacy";
import Awards from "./pages/General/Awards";
import Reviews from "./pages/General/Reviews";
import AboutUs from "./pages/General/AboutUs";
import ContactUs from "./pages/General/ContactUs";
import WeddingBlogs from "./pages/General/WeddingBlogs";
import Registry from "./pages/General/Registry";
import Sepcials from "./pages/General/Sepcials";

const App = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Public />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user-state" element={<LoginUserState />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/directory" element={<Directory />} />
      <Route path="/wedding-signup" element={<CoupleSignUp />} />
      <Route path="/wedding-login" element={<CouplesLogin />} /> */}

      {/* Protected */}
      {/* The links of the Dashboard which has common Rootlayout */}
      {/* {token && ( */}
      <Route
        path="/*"
        element={
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/user-state" element={<LoginUserState />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/wedding-blogs" element={<WeddingBlogs />} />
            <Route path="/registry" element={<Registry />} />
            <Route path="/specials" element={<Sepcials />} />

            <Route path="/directory" element={<Directory />} />
            <Route
              path="/*"
              element={
                <RootLayout>
                  <RoutePath />
                </RootLayout>
              }
            />
          </Routes>
        }
      />
      {/* )} */}
    </Routes>
  );
};

export default App;
