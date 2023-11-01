import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

import RoutePath from "./Routes/RoutePath";
import Login from "./pages/Login/LoginPage";
import LoginUserState from "./pages/Login/LoginUserState";

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
              <Route path="/login" element={<Login/>} />
              <Route path="/user-state" element={<LoginUserState />} />
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
