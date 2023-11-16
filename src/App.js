import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

import RoutePath from "./Routes/RoutePath";
import Login from "./pages/Login/LoginPage";
import LoginUserState from "./pages/Login/LoginUserState";

<<<<<<< Updated upstream
=======
import ContentRoutes from "./Routes/ContentRoutes";
import BusinessRoutes from "./Routes/BusinessRoutes";
import Loader from "./plugins/Loader/Loader";

>>>>>>> Stashed changes
const App = () => {
  const [showLoader, setShowLoader]           = useState(true);
  return (
<<<<<<< Updated upstream
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
=======
    <>
    <Loader active={showLoader}/>
      <Routes>
        <Route path="/*" element={<ContentRoutes  showLoader={showLoader} setShowLoader={setShowLoader} />} />
        <Route path="/business/*" element={<BusinessRoutes  showLoader={showLoader} setShowLoader={setShowLoader} />} />
      </Routes>
    </>
>>>>>>> Stashed changes
  );
};

export default App;
