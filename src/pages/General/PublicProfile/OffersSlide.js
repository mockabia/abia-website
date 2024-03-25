import React, { useRef, useState } from "react";
import "../../Style/PublicProfile.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { ReactComponent as AbiaWhiteLogo } from "../../../icons/ABIA-White-Logo.svg";
import { Link } from "react-router-dom";

const OffersSlide = ({ offers }) => {
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
        <h2>Specials</h2>
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
        <div className="pp-awards-cotnainer w-[1200px] relative ">
          {/* Render awards using the passed data */}
          {offers.map((offer) => (
            <div key={offer.id} className="pp-offer-box">
              <div className="pp-offer-content">
                <h2>{offer.offer_name}</h2>
                {/* offer details */}
                <div>
                  <p style={{ width: "70%" }}>
                    {showOfferDetail[offer.id]
                      ? offer.offer_detail
                      : offer.offer_detail.substring(0, 60) + "..."}
                  </p>
                  {offer.offer_detail.length > 50 && (
                    <Link
                      className="text-[14px] font-bold"
                      // onClick={() => toggleOfferDetail(offer.id)}
                    >
                      see more
                    </Link>
                  )}
                </div>

              </div>
              <div className="pp-offer-icon">
                <AbiaWhiteLogo size={50} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OffersSlide;
