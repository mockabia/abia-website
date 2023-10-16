import React, { useState, useRef, useEffect, useContext } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import ForgetPassword from "../../components/ForgetPassword";
import * as apiurls from "../../api/apiUrls";
import axios from "axios";

const USER_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const PWD_REGEX = /^.{6,}$/;

const LoginPage = () => {
  const userRef = useRef();
  const errRef = useRef(); //
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [userPwd, setUserPwd] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const auth = useAuth();

  //to set the focus when the component loads
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(userEmail);
    setValidEmail(result);
  }, [userEmail]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(userPwd));
  }, [userPwd]);

  useEffect(() => {
    setEmailError("");
    setPasswordError("");
  }, [userEmail, userPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation Logic
    if (validEmail && validPwd) {
      try {
        const response = await axios.post(apiurls.BUSINESS_LOGIN, {
          email: userEmail,
          password: userPwd,
        });
        if (response.status === 200) {
          auth.login(userEmail);
          setUserEmail("");
          setUserPwd("");
          navigate("/home");
        } else {
        }
      } catch (error) {
        console.error("API error:", error);
      }
    } else {
      setEmailError(validEmail ? "" : "Invalid email");
      setPasswordError(validPwd ? "" : "Invalid password");
    }
  };

  const togglePassword = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  return (
    <>
      {/* <TopBar /> */}
      {/* h-[100vh] overflow-y-auto */}
      <main className="h-[100%] flex flex-col overflow-y-auto">
        <NavBar className="" />
        <section className="login-main-container">
          <div className="login-vendorlogin-content relative">
            <div className="login-vendorlogin-box">
              <div className="flex flex-col justify-center items-center p-[20px] relative">
                {/* error message */}
                <h1 className="login-loginbox-header">Vendor Login</h1>
                <form
                  noValidate
                  onSubmit={handleSubmit}
                  className="lg:mt-[20px] "
                >
                  <div className="mb-[15px]">
                    <label htmlFor="email" className=" text-[14px] font-bold">
                      Email
                    </label>
                    <br />
                    <input
                      type="text"
                      id="email"
                      name="email"
                      ref={userRef}
                      onChange={(e) => setUserEmail(e.target.value)}
                      value={userEmail}
                      required
                      className={`login-input-style ${
                        validEmail ? "" : "error-input"
                      }`}
                    />
                    {emailError && (
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: "bold",
                          color: "red",
                        }}
                      >
                        {emailError}
                      </span>
                    )}
                    <br />

                    <label
                      htmlFor="password"
                      className=" text-[14px] font-bold"
                    >
                      Password
                    </label>
                    <br />
                    <input
                      type={passwordShown ? "text" : "password"}
                      id="password"
                      name="password"
                      onChange={(e) => setUserPwd(e.target.value)}
                      required
                      value={userPwd}
                      className={`login-input-style ${
                        validPwd ? "" : "error-input"
                      }`}
                    />
                    <span
                      onClick={togglePassword}
                      className="text-[11px] font-[800] underline cursor-pointer"
                    >
                      {passwordShown ? "Hide Password" : "Show Password"}
                    </span>
                    <br />
                    {passwordError && (
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: "bold",
                          color: "red",
                        }}
                      >
                        {passwordError}
                      </span>
                    )}
                  </div>

                  <button className="login-login-button">Login</button>
                </form>
                <div className="cursor-pointer text-[#6cc2bc] text-[14px] font-semibold flex justify-center items-center mb-[10px]">
                  <ForgetPassword />
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="login-community-content">
            <h1 className="login-community-header">Join the ABIA Community </h1>
            <span className="login-community-subcontent">
              Elevate & promote your wedding brand by joining Australia's{" "}
              <br className="login-content-adjust" />
              Largest Wedding Review Platform & Industry Awards.{" "}
            </span>
            <div className="lg:block mt-[15px]"></div>
            <div className="space-y-[35px]">
              <p className="font-[700] text-[#222222] text-[14px]">
                Don't have an ABIA's Vendor Account?
              </p>
              <div className="flex justify-center items-center">
                <span></span>
                <Link className="login-apply-button ">apply here</Link>
                <span></span>
              </div>
            </div>
            <br />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
