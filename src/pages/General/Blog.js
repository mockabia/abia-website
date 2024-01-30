import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import * as servicesPage from "../../services/contentServices";
import "../Style/Blog.css";
import { PagesRounded } from "@mui/icons-material";

const Public = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");
  const [blogResults, setBlogResults] = useState([]);
  const [parentDesc, setParentDesc] = useState("");
  const url = location.pathname.split("/").pop();

  useEffect(() => {
    fetchBlogs();
  }, [url]);

  const fetchBlogs = async () => {
    await servicesPage.fetchBlogs(url).then(function (response) {
      if (response.statuscode == 200) {
        console.log("Blog Api response:", response);
        setPageTitle(response.parentTitle);
        setParentDesc(response.parentDescription);
        setBlogResults(response.result);
      }
    });
  };

  // console.log("desc:", parentDesc);

  const firstBlog = blogResults.slice(0, 1);
  const threeColumnBlog = blogResults.slice(1, 4);
  const fourColumnblogs = blogResults.slice(5);
  return (
    <div>
      <div className="mobile-content">
        <h2 className="main-header">{pageTitle}</h2>
        <div
          className="sub-description"
          dangerouslySetInnerHTML={{ __html: parentDesc }}
        />
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
      {/******** Desktop *********/}
      <div className="blog-content">
        <h1 className="main-header">{pageTitle}</h1>
        <div
          className="sub-description float-none"
          style={{ textAlign: "left" }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: parentDesc,
            }}
          />
        </div>

        {/* 1 column */}
        <div className="first-blog">
          {firstBlog.map((blog, j) => {
            return (
              <Link to={`/${blog.url}`}>
                <div className="first-image-desktop">
                  <div>
                    <img
                      src={blog.pagephoto_val}
                      alt={blog.pagephoto_val}
                      className="first-image"
                    />
                  </div>

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
              <Link className="fourblog-link-class" to={`/${blog.url}`}>
                <div className="four-blog-image">
                  <img src={blog.pagephoto_val} alt={blog.pagephoto_val} />
                </div>
                <h4 className="mt-[0.5rem] mb-[0.5rem] font-[00]">
                  {blog.title}
                </h4>
                <p>{blog.short_bcomment}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Public;
