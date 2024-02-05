import React from "react";
import LayoutGeneral from "../../../layouts/Layout/LayoutGeneral";
import "../../Style/PublicProfile.css";
import MainImage from "./MainImage";

const PublicProfile = () => {
  const vendorData = {
    vendor: {
      id: 1,
      name: "Vendor Name",
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
    ratings: {
      average: 4.5,
      total: 100,
    },
  };

  return (
    <div>
      <LayoutGeneral>
        <div className="pp-content">
          <MainImage vendorData={vendorData} />
          <div className="flex justify-start items-start w-[100%] py-0 px-[10%] h-screen">
            <div className="w-[65%] bg-[#6cc2bc]">
              BusinessSnippet
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
              <div>Sample</div>
            </div>
            <div className="w-[35%] bg-[#b7b7b7] h-[10%] sticky top-0">
              Enquiry
            </div>
          </div>
        </div>
      </LayoutGeneral>
    </div>
  );
};

export default PublicProfile;
