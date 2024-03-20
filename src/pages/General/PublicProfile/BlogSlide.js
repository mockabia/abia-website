import React, { useRef, useState } from "react";
import "../../Style/PublicProfile.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const BlogSlide = ({ blogs }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef();

  // Function to handle scrolling when the button is clicked
  const handleScroll = (scrollAmount) => {
    const newScrollPosition = scrollPosition + scrollAmount;
    setScrollPosition(newScrollPosition);
    // Access the container element and set its scrollLeft property
    containerRef.current.scrollLeft = newScrollPosition;
  };
  return (
    <div className="flex flex-col gap-[1rem]">
      {/* Header Section */}
      <div className="pp-header-section w-[90%]">
        <h2>ABIA Awards</h2>
        <div className="flex gap-[8px]">
          <div className="pp-scroll-button" onClick={() => handleScroll(-400)}>
            <MdKeyboardArrowLeft size={20} />
          </div>
          <div className="pp-scroll-button" onClick={() => handleScroll(400)}>
            <MdKeyboardArrowRight size={20} />
          </div>
        </div>
      </div>
      {/* Award scroll */}
      <div
        ref={containerRef}
        style={{
          width: "87%",
          overflowX: "hidden",
          scrollBehavior: "smooth",
        }}
      >
        <div className="pp-awards-cotnainer w-[1200px] ">
          {/* Render awards using the passed data */}
          {blogs.map((blog) => (
            <div key={blog.id} className="pp-blog-box">
              <img
                src={blog.pagephoto_val}
                alt={blog.award_name}
                className="pp-blog-image"
              />
              <div className="pp-blog-title">{blog.title}</div>

              <div className="flex flex-col gap-[5px]">
                {/* <h7 style={{ fontWeight: 600 }}>{award.award_category}</h7>
                <h7 style={{ fontWeight: 600 }}>{award.award_name}</h7> */}
              </div>

              {/* Add more elements based on your award data */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSlide;

// export default BlogSlide
