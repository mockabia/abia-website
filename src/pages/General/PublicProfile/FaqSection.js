import React, { useRef, useState } from "react";
import "../../Style/PublicProfile.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { ReactComponent as AbiaWhiteLogo } from "../../../icons/ABIA-White-Logo.svg";
import { Link } from "react-router-dom";

const FaqSection = ({ offers }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef();
  const [showOfferDetail, setShowOfferDetail] = useState({});

  // Function to toggle showing offer details
  const toggleOfferDetail = (id) => {
    setShowOfferDetail((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

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
        <h2>Frequently Asked Question</h2>
      </div>
    </div>
  );
};

export default FaqSection;
