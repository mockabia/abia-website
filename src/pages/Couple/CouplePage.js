import React, { useEffect, useState } from "react";
import "../Style/CoupleSignUp.css";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import * as servicesPage from "../../services/coupleService";


import { useLocation, Link } from "react-router-dom";


export default function CouplePage(props) {

  const location = useLocation();
  const [pageContent, setPageContent] = useState({});
  const url = location.pathname.split("/").pop();

  useEffect(() => {
    fetchPageContent();
  }, [url]);

  const handleClosePage = () => {
    window.history.back();
  };
  const fetchPageContent = async () => {
    await servicesPage.fetchBridePage(url).then(function (response) {
      if (response.statuscode == 200) {
        setPageContent(response.result)
      }
    });
  };



  return (
    <div>
      <form>
        {/* Page One */}

        <section className="couples-singup-container">
          <div className="couples-signup-image">
            <div className="cs-image-container-1 cs-image-container"></div>
          </div>

          <div className="cs-close-icon" onClick={handleClosePage}>
            <CloseIcon />
          </div>
          <Box
            component="form"
            sx={{ width: "100%" }}
            className="cs-signup-form"
          >
            {/* <pre>{JSON.stringify(formValues, null, 2)}</pre> */}
            <React.Fragment>
              <div className="main-content">
                <h1 className="main-header">{pageContent.title}</h1>
                <div className="grid grid-cols-1 gap-5">
                  <div className="content" dangerouslySetInnerHTML={{ __html: pageContent.detail }}></div>
                </div>
              </div>
              <br />
              <div className="flex justify-center">
                <h5 className="text-[12px]">
                  Already have an account?{" "}
                  <Link to={window.CLOGIN}>
                    <span className="font-bold text-[#6cc2bc]">Log in</span>
                  </Link>
                </h5>
              </div>

              <div className="privacy-section ">
                <h5 className="text-[12px]">
                  By creating your ABIA's account you agree to our{" "}
                  <Link>
                    <span className="cs-text-highlight">Terms of use</span>
                  </Link>{" "}
                  and{" "}
                  <Link>
                    <span className="cs-text-highlight">Privacy policy</span>
                  </Link>
                  .
                </h5>
              </div>
            </React.Fragment>
          </Box>
        </section>

      </form>
    </div>
  );
}
