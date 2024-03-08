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

  console.log("Blog results:", blogResults);

  const firstBlog = blogResults.slice(0, 1);
  const threeColumnBlog = blogResults.slice(1);
  // const fourColumnblogs = blogResults.slice(5);
  return (
    <div className="blog-background">
      <div className="mobile-content">
        <div className="flex flex-col gap-[10px] pb-[1rem] ">
          <h2 className="blog-main-header">{pageTitle}</h2>
          <div
            className="sub-description"
            dangerouslySetInnerHTML={{ __html: parentDesc }}
          />
        </div>

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
        <div className="flex flex-col gap-[10px] mb-[1rem]">
          <h1 className="blog-main-header">{pageTitle}</h1>
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
                    <div>
                      <h1>{blog.title}</h1>
                      <p>{blog.short_bcomment}</p>
                    </div>
                    <div className="blog-read-more">
                      <bbuton>read more</bbuton>
                    </div>
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
                  <div className="p-[1rem] flex flex-col gap-[12px]">
                    <h3>{blog.title}</h3>
                    <p>{blog.short_bcomment}</p>
                  </div>
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
