import React, { useState } from "react";
import { Modal, Button } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import ReviewCard from "./ReviewCard";

const ReviewsReply = ({ reviews, vendorData }) => {
  const [showReview, setShowReview] = useState({});
  const [openModal, setOpenModal] = useState(false);

  // Review Modal
  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  // Reviews see more section
  const toggleDescription = (id) => {
    setShowReview((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const truncateContent = (content, limit) => {
    const words = content.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return content;
  };

  //Review  days - Function to calculate the difference in days between two dates
  const getDaysDifference = (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
  };
  // Function to format the difference in days into human-readable format
  const formatDaysDifference = (daysDifference) => {
    if (daysDifference < 1) {
      return "Today";
    } else if (daysDifference === 1) {
      return "1 day ago";
    } else if (daysDifference < 30) {
      return `${daysDifference} days ago`;
    } else if (daysDifference < 365) {
      const months = Math.floor(daysDifference / 30);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
      const years = Math.floor(daysDifference / 365);
      return `${years} ${years === 1 ? "year" : "years"} ago`;
    }
  };

  return (
    <div className="flex flex-col gap-[1rem]">
      {/* Header */}
      <div className="pp-header-section w-[90%]">
        <h2>ABIA Wedding Reviews</h2>
      </div>
      <div className="lg:w-[87%]">
        {reviews.slice(0, 3).map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            showReview={showReview}
            toggleDescription={toggleDescription}
            formatDaysDifference={formatDaysDifference}
            getDaysDifference={getDaysDifference}
            truncateContent={truncateContent}
            maxReviewsToShow={3}
            vendor={vendorData.vendor}
            isModal={false}
          />
        ))}
        <button className="pp-view-all-button" onClick={handleModalOpen}>
          View all reviews
        </button>
        {/* Modal */}
        <Modal
          open={openModal}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="pp-review-modal-content">
            {/* close */}
            <div className="flex justify-end items-end p-[1rem]">
              <div className="cursor-pointer" onClick={handleModalClose}>
                <AiOutlineClose size={24} />
              </div>
            </div>
            {/* REviews */}
            <div className="pp-review-modal-section">
              <div className="pp-header-section w-[90%]">
                <h2>ABIA Wedding Reviews</h2>
              </div>
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  showReview={showReview}
                  toggleDescription={toggleDescription}
                  formatDaysDifference={formatDaysDifference}
                  getDaysDifference={getDaysDifference}
                  truncateContent={truncateContent}
                  maxReviewsToShow={reviews.length}
                  vendor={vendorData.vendor}
                  isModal={true}
                />
              ))}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ReviewsReply;
