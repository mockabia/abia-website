import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as servicesPage from "../../services/contentServices";
import LayoutGeneral from "../../layouts/Layout/LayoutGeneral";
import "../Style/MainContent.css";

const Public = () => {
  const location                      = useLocation();
  const [pageContent, setPageContent] = useState({});
  const url                           = location.pathname.split("/").pop();

  useEffect(() => {
    fetchPageContent();
  }, [url]);
  
  const fetchPageContent = async () => {
    await servicesPage.fetchContentDetails(url).then(function (response) {
        if (response.statuscode == 200) {
          setPageContent(response.result)
        }else{
          setPageContent({title:`Sorry, No data Found for ${url}`})
        }
    });
  };

  return (
    <>
      <LayoutGeneral>
        <div>
          <div className="main-content">
          <h1 className="main-header">{pageContent.title}</h1>
          <div className="content" dangerouslySetInnerHTML={{__html: pageContent.detail}}></div>
          </div>
        </div>
      </LayoutGeneral>
    </>
  );
};

export default Public;
