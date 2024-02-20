import React, { useRef, useState } from "react";
import "../../Style/PublicProfile.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const BlogSlide = ({ awards }) => {
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
          <div className="pp-scroll-button" onClick={() => handleScroll(-200)}>
            <MdKeyboardArrowLeft size={20} />
          </div>
          <div className="pp-scroll-button" onClick={() => handleScroll(200)}>
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
          {awards.map((award) => (
            <div key={award.id} className="pp-award-box">
              <img
                src={award.awardurl}
                alt={award.award_name}
                className="w-[5rem]"
              />
              <div className="flex flex-col gap-[5px]">
                <h7 style={{ fontWeight: 600 }}>{award.award_category}</h7>
                <h7 style={{ fontWeight: 600 }}>{award.award_name}</h7>
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
