import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import * as servicesPage from "../../services/contentServices";
import "../Style/Blog.css";

const Public = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");
  const [blogResults, setBlogResults] = useState([]);
  const url = location.pathname.split("/").pop();

  useEffect(() => {
    fetchBlogs();
  }, [url]);

  const fetchBlogs = async () => {
    await servicesPage.fetchBlogs(url).then(function (response) {
      if (response.statuscode == 200) {
        setPageTitle(response.parentTitle);
        setBlogResults(response.result);
      }
    });
  };

  console.log("Blogs:", blogResults);

  const firstBlog = blogResults.slice(0, 1);
  const threeColumnBlog = blogResults.slice(1, 4);
  const fourColumnblogs = blogResults.slice(5);
  return (
    <div>
      <div className="mobile-content">
        <h2 className="main-header">{pageTitle}</h2>
        <div className="blog-mobile">
          {blogResults.map((blog, j) => {
            return (
              <Link to={`/${blog.url}`}>
                <div className="mob-blog-box">
                  <img src={blog.pagephoto_val} alt={blog.pagephoto_val} />
                  <h3>{blog.title}</h3>
                  <p>{blog.short_bcomment}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {/* Desktop */}
      <div className="blog-content">
        <h1 className="main-header">{pageTitle}</h1>
        {/* 1 column */}
        <div className="first-blog">
          {firstBlog.map((blog, j) => {
            return (
              <Link to={`/${blog.url}`}>
                <div className="flex">
                  <img
                    src={blog.pagephoto_val}
                    alt={blog.pagephoto_val}
                    className="first-image"
                  />
                  <div className="first-blog-content">
                    <h2>{blog.title}</h2>
                    <p>{blog.short_bcomment}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        {/* 3 column */}
        <div className="three-blogs mb-[2rem]">
          {threeColumnBlog.map((blog, j) => {
            return (
              <Link to={`/${blog.url}`} className="single-blog">
                <div className="three-blog-content">
                  <img src={blog.pagephoto_val} alt={blog.pagephoto_val} />
                  <h3>{blog.title}</h3>
                  <p>{blog.short_bcomment}</p>
                </div>
              </Link>
            );
          })}
        </div>
        {/* 4 column */}
        <div className="four-column-blogs">
          {fourColumnblogs.map((blog, j) => {
            return (
              <Link to={`/${blog.url}`}>
                <div>
                  <img src={blog.pagephoto_val} alt={blog.pagephoto_val} />
                  <h3>{blog.title}</h3>
                  <p>{blog.short_bcomment}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Public;
