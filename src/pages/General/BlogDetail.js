import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as servicesPage from "../../services/contentServices";
import "../Style/MainContent.css";

const Public = () => {
  const location = useLocation();
  const [pageContent, setPageContent] = useState({});
  const url = location.pathname.split("/").pop();

  useEffect(() => {
    fetchPageContent();
  }, [url]);

  const fetchPageContent = async () => {
    await servicesPage.fetchBlogDetail(url).then(function (response) {
      if (response.statuscode == 200) {
        setPageContent(response.result)
      }
    });
  };

  return (
    <div>
      <div className="main-content">
        <h1 className="main-header">{pageContent.bpagetitle}</h1>
        <div className="grid grid-cols-1 gap-5">
          <h3>{pageContent.btitle}</h3>
          <div className="content" dangerouslySetInnerHTML={{__html: pageContent.bcomment}}></div>
        </div>
      </div>
    </div>
  );
};

export default Public;
