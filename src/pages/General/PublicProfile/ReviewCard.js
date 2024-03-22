// ReviewCard.jsx
import React, { useState } from "react";

const ReviewCard = ({
  review,
  showReview,
  toggleDescription,
  formatDaysDifference,
  getDaysDifference,
  truncateContent,
  maxReviewsToShow,
  vendor,
  isModal,
}) => {
  const [showVendorReply, setShowVendorReply] = useState(false);

  const toggleVendorReply = () => {
    setShowVendorReply((prevState) => !prevState);
  };

  return (
    <div key={review.id} className="flex flex-col gap-[1rem] mb-[1rem]">
      {/* image section with name and date */}
      <div className="flex gap-[1rem]">
        {review.couple_img_val ? (
          <img
            src={review.couple_img_val}
            className="pp-review-profile-image"
            alt={review.couples_name}
          />
        ) : (
          <div className="pp-review-profile-initial">
            {review.couples_name.charAt(0)}
          </div>
        )}
        <div className="flex flex-col gap-[5px]">
          <h4 style={{ fontWeight: "600" }}>{review.couples_name}</h4>
          <p>
            {formatDaysDifference(
              getDaysDifference(new Date(), new Date(review.submitted_date))
            )}
          </p>
        </div>
      </div>
      {/* Category and Review section */}
      <div className="flex flex-col justify-start items-start gap-[5px]">
        <h5 style={{ fontWeight: "600" }}>Review for {review.category}</h5>
        <h5>
          {showReview[review.id]
            ? review.review_content
            : truncateContent(review.review_content, 50)}
        </h5>
        {truncateContent(review.review_content, 50) !==
          review.review_content && (
          <button
            className="text-[14px] font-bold"
            onClick={() => toggleDescription(review.id)}
          >
            {showReview[review.id] ? "See less" : "See more"}
          </button>
        )}
      </div>
      {/* Vendor Reply - Conditionally render only if inside the modal  */}
      {isModal && (
        <div className="vendor-reply-container ">
          <img
            src={vendor.logo}
            alt={vendor.name}
            className="pp-review-vendor-logo"
          />
          <div className="flex flex-col justify-start items-start gap-[8px]">
            <h5>{vendor.name}</h5>
            {/* Apply similar truncation logic for the vendor reply */}
            <div className="vendor-replies">
              {showVendorReply ? (
                <p>{review.reply}</p>
              ) : (
                <p>{truncateContent(review.reply, 30)}</p>
              )}
            </div>
            {/* Toggle button for Vendor Reply */}
            {truncateContent(review.reply, 30) !== review.reply && (
              <button
                className="text-[14px] font-bold"
                onClick={toggleVendorReply}
              >
                {showVendorReply ? "See less" : "See more"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;

// // ReviewCard.jsx
// import React from "react";

// const ReviewCard = ({
//   review,
//   showReview,
//   toggleDescription,
//   formatDaysDifference,
//   getDaysDifference,
//   truncateContent,
//   maxReviewsToShow,
//   vendor,
//   isModal,
// }) => (
//   <div key={review.id} className="flex flex-col gap-[1rem] mb-[1rem]">
//     {/* image section with name and date */}
//     <div className="flex gap-[1rem]">
//       {review.couple_img_val ? (
//         <img
//           src={review.couple_img_val}
//           className="pp-review-profile-image"
//           alt={review.couples_name}
//         />
//       ) : (
//         <div className="pp-review-profile-initial">
//           {review.couples_name.charAt(0)}
//         </div>
//       )}
//       <div className="flex flex-col gap-[5px]">
//         <h4 style={{ fontWeight: "600" }}>{review.couples_name}</h4>
//         <p>
//           {formatDaysDifference(
//             getDaysDifference(new Date(), new Date(review.submitted_date))
//           )}
//         </p>
//       </div>
//     </div>
//     {/* Category and Review section */}
//     <div className="flex flex-col justify-start items-start gap-[5px]">
//       <h5 style={{ fontWeight: "600" }}>Review for {review.category}</h5>
//       <h5>
//         {showReview[review.id]
//           ? review.review_content
//           : truncateContent(review.review_content, 50)}
//       </h5>
//       {truncateContent(review.review_content, 50) !== review.review_content && (
//         <button
//           className="text-[14px] font-bold"
//           onClick={() => toggleDescription(review.id)}
//         >
//           {showReview[review.id] ? "See less" : "See more"}
//         </button>
//       )}
//     </div>
//     {/* Vendor Reply - Conditionally render only if inside the modal  */}
//     {isModal && (
//       <div className="vendor-reply-container ">
//         <img
//           src={vendor.logo}
//           alt={vendor.name}
//           className="pp-review-vendor-logo"
//         />
//         <div className="flex flex-col gap-[8px]">
//           <h5>{vendor.name}</h5>
//           {/* Apply similar truncation logic for the vendor reply */}
//           <div className="vendor-replies">
//             {showVendorReply ? (
//               <p>{review.reply}</p>
//             ) : (
//               <p>{truncateContent(review.reply, 50)}</p>
//             )}
//           </div>
//           {/* Toggle button for Vendor Reply */}
//           {truncateContent(review.reply, 50) !== review.reply && (
//             <button
//               className="text-[14px] font-bold"
//               onClick={toggleVendorReply}
//             >
//               {showVendorReply ? "See less" : "See more"}
//             </button>
//           )}
//         </div>
//       </div>
//     )}
//   </div>
// );

// export default ReviewCard;
