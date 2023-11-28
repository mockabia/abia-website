import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import * as servicesPage from "../../services/contentServices";
import "../Style/MainContent.css";

const Public = () => {
  const location                      = useLocation();
  const [pageTitle, setPageTitle]     = useState('');
  const [blogResults, setBlogResults] = useState([]);
  const url                           = location.pathname.split("/").pop();

  useEffect(() => {
    fetchBlogs();
  }, [url]);

  const fetchBlogs = async () => {
    await servicesPage.fetchBlogs(url).then(function (response) {
      if (response.statuscode == 200) {
        setPageTitle(response.parentTitle)
        setBlogResults(response.result)
      }
    });
  };

  return (
    <div>
      <div className="main-content">
        <h1 className="main-header">{pageTitle}</h1>
        <div className="grid grid-cols-4 gap-4">
          {blogResults.map((blog, j) => {
            return (
              <Link to={`/${blog.url}`} className="grid grid-rows-1 grid-flow-col" >
              {/* <pre>{JSON.stringify(blog, null, 2)}</pre> */}
              <div>
                <img src={blog.pagephoto_val} alt={blog.pagephoto_val} />
                <h3>{blog.title}</h3>
                <p>{blog.short_bcomment}</p>
              </div>
            </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Public;
