import React from "react";
import LayoutGeneral from "../../../layouts/Layout/LayoutGeneral";
import "../../Style/PublicProfile.css";
import MainImage from "./MainImage";
import { ReactComponent as LeftFeather } from "../../../icons/feather2-left.svg";
import { ReactComponent as RightFeather } from "../../../icons/feather-right.svg";
import Rating from "@mui/material/Rating";
// import LeftFeather from "../../../icons/feather-right.jpg";
// import RightFeather from "../../../icons/feather-left.jpg";

const PublicProfile = () => {
  const vendorData = {
    vendor: {
      id: 1,
      name: "Zonzo Estate",
      partner_type: "Gold Partner",
      ratings: {
        average: 4.9,
        total: 100,
      },
      reviews_count: "998",
      awards_count: "60",
      "profile-image":
        "https://abia.com.au/uploads/vcoverimage/thumb_zonzo-estate-yarra-glen_2203020113541.jpeg",
      imagesa_videos: [
        {
          id: 1,
          type: "image",
          url: "https://abia.com.au/uploads/vportfolio/thumb/zonzo-estate-yarra-glen_2203021146265.jpeg",
        },

        {
          id: 2,
          type: "image",
          url: "https://abia.com.au/uploads/vportfolio/thumb/zonzo-estate-yarra-glen_2203021206165.jpeg",
        },
        {
          id: 3,
          type: "image",
          url: "https://abia.com.au/uploads/vportfolio/thumb/zonzo-estate-yarra-glen_2203021157381.jpeg",
        },
        {
          id: 4,
          type: "video",
          url: "https://www.youtube.com/embed/tEHNeM3DCm0?si=q52_crluKLbv7uw0",
          thumbUrl: "https://img.youtube.com/vi/tEHNeM3DCm0/maxresdefault.jpg",
        },
      ],
    },
  };

  return (
    <div>
      <LayoutGeneral>
        <div className="pp-content">
          <MainImage vendorData={vendorData} />
          {/* BUSINESS DETAILS */}
          <div className="pp-business-wrapper">
            <div className="pp-business-details">
              <div>
                <h1>{vendorData.vendor.name}</h1>
                <div className="pp-business-snippet">
                  {/* PArtner type */}
                  <div className="flex justify-between items-center">
                    <LeftFeather />
                    <h5
                      style={{
                        whiteSpace: "break-spaces",
                        textAlign: "center",
                        color: "black",
                        fontWeight: "600",
                      }}
                    >
                      {vendorData.vendor.partner_type}
                    </h5>
                    <RightFeather />
                  </div>
                  <div className="h-[40px] w-[1px] bg-[#d7d7d7]"></div>
                  {/* Ratings avg */}
                  <div className="flex flex-col justify-center items-center gap-[5px]">
                    <h5
                      style={{
                        color: "black",
                        fontWeight: "600",
                        fontSize: "22px",
                      }}
                    >
                      {vendorData.vendor.ratings.average}
                    </h5>
                    <Rating
                      name="half-rating-read"
                      size="small"
                      precision={0.25}
                      value={vendorData.vendor.ratings.average}
                      style={{ color: "black", fontSize: "14px" }}
                      readOnly
                    />
                  </div>
                  <div className="h-[40px] w-[1px] bg-[#d7d7d7]"></div>
                  {/* Review count */}
                  <div className="flex flex-col justify-center items-center gap-[5px]">
                    <h5
                      style={{
                        color: "black",
                        fontWeight: "600",
                        fontSize: "22px",
                      }}
                    >
                      {vendorData.vendor.reviews_count}
                    </h5>
                    <h5
                      style={{
                        color: "black",
                        fontWeight: "600",
                        borderBottom: "2px solid black",
                        paddingBottom: "1px",
                      }}
                    >
                      Reviews
                    </h5>
                  </div>
                  <div className="h-[40px] w-[1px] bg-[#d7d7d7]"></div>
                  {/* Awards Count */}
                  <div className="flex flex-col justify-center items-center gap-[5px]">
                    <h5
                      style={{
                        color: "black",
                        fontWeight: "600",
                        fontSize: "22px",
                      }}
                    >
                      {vendorData.vendor.awards_count}
                    </h5>
                    <h5
                      style={{
                        color: "black",
                        fontWeight: "600",
                        borderBottom: "2px solid black",
                        paddingBottom: "1px",
                      }}
                    >
                     Awards
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="pp-message-enq">Enquiry</div>
          </div>
        </div>
      </LayoutGeneral>
    </div>
  );
};

export default PublicProfile;
