import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

import RoutePath from "./Routes/RoutePath";
import BusinessLogin from "./pages/General/BusinessLogin";
import BusinessLoginState from "./pages/General/BusinessLoginState";

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

      {/* Protected */}
      {/* The links of the Dashboard which has common Rootlayout */}
      {/* {token && ( */}
      <Route
        path="/*"
        element={
            <Routes>
              <Route path="/login" element={<BusinessLogin/>} />
              {/* <Route path="/user-state" element={<BusinessLoginState />} /> */}
              <Route path="/*" element={
                <RootLayout><RoutePath /></RootLayout>
              }/>
            </Routes>
        }
      />
      {/* )} */}
    </Routes>
  );
};

export default App;
