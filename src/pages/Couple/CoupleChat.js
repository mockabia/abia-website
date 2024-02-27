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
            </React.Fragment>
          </Box>
        </section>

      </form>
    </div>
  );
}
