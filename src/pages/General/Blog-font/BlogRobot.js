import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../../Style/BlogRoboto.css";

// Dummy blog data
const blogData = {
  result: [
    {
      id: 522,
      title: "Tanya -2023 SA club venues",
      short_bcomment:
        "A wedding is a celebration or ceremony of marriage. Besides being a formal way to mark the union of two people, weddings can be a lot of fun too. The earliest meaning of wedding was simpl",
      main_url: "2023-sa-club-venues",
      pagephoto_val:
        "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600",
      url: "wedding-blog/2023-sa-club-venues",
      sub_bsid: 9,
      sub_title: "Ideas, News & Top Lists",
      sub_url: "wedding-planning-blog",
      parent_bcid: 3,
      parent_title: "BLOG",
      parent_url: "wedding-blog",
    },
    {
      id: 510,
      title: "A Night at the 26th NSW ABIA Wedding Awards",
      short_bcomment:
        "A dreamy beach wedding or a boisterous college reunion, C’Roque is the perfect backdrop for your intimate celebrations. ",
      main_url: "a-night-at-the-abia-wedding-awards",
      pagephoto_val:
        "https://images.pexels.com/photos/948185/pexels-photo-948185.jpeg?auto=compress&cs=tinysrgb&w=600",
      url: "wedding-blog/a-night-at-the-abia-wedding-awards",
      sub_bsid: 9,
      sub_title: "Ideas, News & Top Lists",
      sub_url: "wedding-planning-blog",
      parent_bcid: 3,
      parent_title: "BLOG",
      parent_url: "wedding-blog",
    },
    {
      id: 510,
      title: "A Night at the 26th NSW ABIA Wedding Awards",
      short_bcomment:
        "Drop us a whatsapp message on +91 9823 456 288 or email us at croqueresort@gmail.com and we’ll help you plan your special day.",
      main_url: "a-night-at-the-abia-wedding-awards",
      pagephoto_val:
        "https://images.pexels.com/photos/157757/wedding-dresses-fashion-character-bride-157757.jpeg?auto=compress&cs=tinysrgb&w=600",
      url: "wedding-blog/a-night-at-the-abia-wedding-awards",
      sub_bsid: 9,
      sub_title: "Ideas, News & Top Lists",
      sub_url: "wedding-planning-blog",
      parent_bcid: 3,
      parent_title: "BLOG",
      parent_url: "wedding-blog",
    },
    {
      id: 510,
      title: "A Night at the 26th NSW ABIA Wedding Awards",
      short_bcomment:
        "An invitation to the prestigious ABIA Wedding Awards is, I’ve learned, the hottest ticket in the Australian wedding industry, and",
      main_url: "a-night-at-the-abia-wedding-awards",
      pagephoto_val:
        "https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=600",
      url: "wedding-blog/a-night-at-the-abia-wedding-awards",
      sub_bsid: 9,
      sub_title: "Ideas, News & Top Lists",
      sub_url: "wedding-planning-blog",
      parent_bcid: 3,
      parent_title: "BLOG",
      parent_url: "wedding-blog",
    },
    {
      id: 510,
      title: "A Night at the 26th NSW ABIA Wedding Awards",
      short_bcomment:
        "Want to see what makes our Fort Lauderdale wedding venues so special? Explore the Dalmar's wedding photo gallery and see for yourself.",
      main_url: "a-night-at-the-abia-wedding-awards",
      pagephoto_val:
        "https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=600",
      url: "wedding-blog/a-night-at-the-abia-wedding-awards",
      sub_bsid: 9,
      sub_title: "Ideas, News & Top Lists",
      sub_url: "wedding-planning-blog",
      parent_bcid: 3,
      parent_title: "BLOG",
      parent_url: "wedding-blog",
    },
    {
      id: 510,
      title: "A Night at the 26th NSW ABIA Wedding Awards",
      short_bcomment:
        "Want to see what makes our Fort Lauderdale wedding venues so special?",
      main_url: "a-night-at-the-abia-wedding-awards",
      pagephoto_val:
        "https://images.unsplash.com/photo-1630526720753-aa4e71acf67d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aW5kaWFuJTIwd2VkZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
      url: "wedding-blog/a-night-at-the-abia-wedding-awards",
      sub_bsid: 9,
      sub_title: "Ideas, News & Top Lists",
      sub_url: "wedding-planning-blog",
      parent_bcid: 3,
      parent_title: "BLOG",
      parent_url: "wedding-blog",
    },
    {
      id: 510,
      title: "A Night at the 26th NSW ABIA Wedding Awards",
      short_bcomment:
        "Want to see what makes our Fort Lauderdale wedding venues so special?",
      main_url: "a-night-at-the-abia-wedding-awards",
      pagephoto_val:
        "https://images.unsplash.com/flagged/photo-1551854716-8b811be39e7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGluZGlhbiUyMHdlZGRpbmd8ZW58MHx8MHx8fDA%3D",
      url: "wedding-blog/a-night-at-the-abia-wedding-awards",
      sub_bsid: 9,
      sub_title: "Ideas, News & Top Lists",
      sub_url: "wedding-planning-blog",
      parent_bcid: 3,
      parent_title: "BLOG",
      parent_url: "wedding-blog",
    },
    {
      id: 510,
      title: "A Night at the 26th NSW ABIA Wedding Awards",
      short_bcomment:
        "Whether you’re planning an intimate event or a grand gala, allow The Dalmar Fort Lauderdale ",
      main_url: "a-night-at-the-abia-wedding-awards",
      pagephoto_val:
        "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=600",
      url: "wedding-blog/a-night-at-the-abia-wedding-awards",
      sub_bsid: 9,
      sub_title: "Ideas, News & Top Lists",
      sub_url: "wedding-planning-blog",
      parent_bcid: 3,
      parent_title: "BLOG",
      parent_url: "wedding-blog",
    },
    {
      id: 510,
      title: "A Night at the 26th NSW ABIA Wedding Awards",
      short_bcomment:
        "Whether you’re planning an intimate event or a grand gala, allow The Dalmar Fort Lauderdale ",
      main_url: "a-night-at-the-abia-wedding-awards",
      pagephoto_val:
        "https://images.pexels.com/photos/1244627/pexels-photo-1244627.jpeg?auto=compress&cs=tinysrgb&w=600",
      url: "wedding-blog/a-night-at-the-abia-wedding-awards",
      sub_bsid: 9,
      sub_title: "Ideas, News & Top Lists",
      sub_url: "wedding-planning-blog",
      parent_bcid: 3,
      parent_title: "BLOG",
      parent_url: "wedding-blog",
    },
    {
      id: 510,
      title: "A Night at the 26th NSW ABIA Wedding Awards",
      short_bcomment: "A",
      main_url: "a-night-at-the-abia-wedding-awards",
      pagephoto_val:
        "https://images.pexels.com/photos/1244627/pexels-photo-1244627.jpeg?auto=compress&cs=tinysrgb&w=600",
      url: "wedding-blog/a-night-at-the-abia-wedding-awards",
      sub_bsid: 9,
      sub_title: "Ideas, News & Top Lists",
      sub_url: "wedding-planning-blog",
      parent_bcid: 3,
      parent_title: "BLOG",
      parent_url: "wedding-blog",
    },
    // Add more blog entries as needed
  ],
};

const Public = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState(
    "Ideas, News & Top Lists - Roboto"
  );
  const [blogResults, setBlogResults] = useState([]);
  const [parentDesc, setParentDesc] = useState(
    "Planning Your Wedding is an exciting and important journey, however can also be an overwhelming experience. To assist in designing your ultimate wedding, it is important to book trustworthy Wedding Vendors from Wedding Venues, Wedding Dresses, Celebrants to Photographers and many more who understand the importance of your special day. When planning your wedding day, be sure to research before you book. Ensure you look for credibility, industry awards, verified customer reviews and experience. Meet some of our featured vendors in your wedding state below!"
  );
  const url = location.pathname.split("/").pop();

  useEffect(() => {
    // Set the blog data here
    setBlogResults(blogData.result);
  }, [url]);

  const firstBlog = blogResults.slice(0, 1);
  const threeColumnBlog = blogResults.slice(1, 4);
  const fourColumnblogs = blogResults.slice(5);

  return (
    <div>
      {/* Mobile View */}
      <div className="mobile-content">
        <h2 className="main-header">{pageTitle}</h2>
        <div
          style={{
            fontFamily: "'Roboto'",
            fontSize: "14px",
            color: "#8e8e8e",
          }}
          className="sub-description-R"
        >
          {parentDesc}
        </div>
        <div className="blog-mobile">
          {blogResults.map((blog, j) => (
            <Link to={`/${blog.url}`} key={blog.id}>
              <div className="mob-blog-box">
                <img src={blog.pagephoto_val} alt={blog.pagephoto_val} />
                <h3 style={{ fontFamily: "'Roboto'" }}>{blog.title}</h3>
                <p style={{ fontFamily: "'Roboto'" }}>{blog.short_bcomment}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="blog-content">
        <h2 className="main-header">{pageTitle}</h2>
        <div
          style={{
            fontFamily: "'Roboto',sans-serif",
            fontSize: "14px",
            color: "#8e8e8e",
          }}
          className="sub-description-R"
        >
          {parentDesc}
        </div>

        {/* 1 column */}
        <div className="first-blog">
          {firstBlog.map((blog, j) => (
            <Link to={`/${blog.url}`} key={blog.id}>
              <div className="first-image-desktop">
                <div>
                  <img
                    src={blog.pagephoto_val}
                    alt={blog.pagephoto_val}
                    className="first-image"
                  />
                </div>
                <div className="first-blog-content">
                  <h2 style={{ fontFamily: "'Roboto'" }}>{blog.title}</h2>
                  <p style={{ fontFamily: "'Roboto'" }}>
                    {blog.short_bcomment}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 3 column */}
        <div className="three-blogs mb-[2rem]">
          {threeColumnBlog.map((blog, j) => (
            <Link to={`/${blog.url}`} className="single-blog" key={blog.id}>
              <div className="three-blog-image">
                <img
                  src={blog.pagephoto_val}
                  alt={blog.pagephoto_val}
                  style={{ width: "100%" }}
                />
              </div>
              <h3
                style={{
                  fontFamily: "'Roboto'",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              >
                {blog.title}
              </h3>
              <p style={{ fontFamily: "'Roboto'" }}>{blog.short_bcomment}</p>
            </Link>
          ))}
        </div>

        {/* 4 column */}
        <div className="four-column-blogs">
          {fourColumnblogs.map((blog, j) => (
            <Link
              className="fourblog-link-class"
              to={`/${blog.url}`}
              key={blog.id}
            >
              <div className="four-blog-image">
                <img src={blog.pagephoto_val} alt={blog.pagephoto_val} />
              </div>
              <h4
                style={{ fontFamily: "'Roboto'" }}
                className="mt-[0.5rem] mb-[0.5rem] font-[00]"
              >
                {blog.title}
              </h4>
              <p style={{ fontFamily: "'Roboto'" }}>{blog.short_bcomment}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Public;
