import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LayoutGeneral from "../../layouts/Layout/LayoutGeneral";
import "../Style/MainContent.css";

const Public = () => {
  const location                      = useLocation();
  const [pageContent, setPageContent] = useState({});
  const url                           = location.pathname.split("/").pop();

  useEffect(() => {
    
  }, [url]);


  return (
    <div>
        <div className="main-content">
        <h1 className="main-header">404 Error</h1>
        <div className="content">Page Not Found</div>
        </div>
    </div>
  );
};

export default Public;
