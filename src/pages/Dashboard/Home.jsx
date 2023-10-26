import React, { useContext } from "react";
import TopBar from "../../layouts/sidebar/TopBar";
import AuthContext from "../../context/AuthProvider";

const Home = () => {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <TopBar title={`Welcome ${auth.email}`} />

      <div>Vendor Home Page </div>
    </>
  );
};

export default Home;
