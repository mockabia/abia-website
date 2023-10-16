import React from "react";
import TopBar from "../../layouts/sidebar/TopBar";
import { useAuth } from "../../context/AuthProvider";

const Home = () => {
  const auth = useAuth();
  return (
    <>
      <TopBar title={`Welcome ${auth.userEmail}`} />

      <div>Vendor Home Page</div>
    </>
  );
};

export default Home;
