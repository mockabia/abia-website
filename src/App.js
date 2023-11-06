import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

import RoutePath from "./Routes/RoutePath";
import BusinessLogin from "./pages/General/BusinessLogin";
import BusinessSignup from "./pages/General/BusinessSignup";
import BusinessLoginState from "./pages/General/BusinessLoginState";
import Public from "./pages/General/Public";
import Directory from "./pages/General/GeneralDirectory/Directory.js";
import Registry from "./pages/Common/NavBar/Registry.js";
import CoupleSignUp from "./pages - Copy/Couples/Signup/index.js";
import CSideBar from "./components/Couple-Layout/CSideBar.js";
const App = () => {
  // const { token } = useAuth();
  return (
    <Routes>
      {/* <Route path="/" element={<Public />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user-state" element={<LoginUserState />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/directory" element={<Directory />} />
      <Route path="/wedding-signup" element={<CoupleSignUp />} />
      <Route path="/wedding-login" element={<CouplesLogin />} /> */}
      {/* import CoupleSignUp from "./pages/Couples/Signup/index"; */}

      <Route path="/" element={<Public />} />
      <Route path="/directory" element={<Directory />} />
      <Route path="/registry" element={<Registry />} />
      <Route path="/wedding-signup" element={<CoupleSignUp />} />

      {/* BUSINESS */}
      <Route
        path="/business*"
        element={
          <Routes>
            <Route path="/login" element={<BusinessLogin />} />
            <Route path="/signup" element={<BusinessSignup />} />
            <Route path="/user-state" element={<BusinessLoginState />} />
            <Route path="/wedding-profile" element={<CSideBar />} />
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
    </Routes>
  );
};

export default App;
