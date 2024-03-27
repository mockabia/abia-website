import React, { useRef, useState } from "react";
import LayoutGeneral from "../../../layouts/Layout/LayoutGeneral";
import { Modal } from "@mui/material";
import "../../Style/PublicProfile.css";
import MainImage from "./MainImage";
import { ReactComponent as LeftFeather } from "../../../icons/feather2-left.svg";
import { ReactComponent as RightFeather } from "../../../icons/feather-right.svg";
import Rating from "@mui/material/Rating";
import { SiInstagram } from "react-icons/si";
import { FaTiktok } from "react-icons/fa";
import AwardSlide from "./AwardSlide";
import PublicEnquiry from "./PublicEnquiry";
import BlogSlide from "./BlogSlide";
import ReviewsReply from "./ReviewsReply";
import OffersSlide from "./OffersSlide";
import FaqSection from "./FaqSection";
// import MobEnquiry from "./MobEnquiry";
import { PublicProfileDate } from "../../../components/DatepickerPublic";
import { IoClose } from "react-icons/io5";
import { VendorLoginButton } from "../../../components/FormStyle";
// import MeetTeam from "./MeetTeam";
// import LeftFeather from "../../../icons/feather-right.jpg";
// import RightFeather from "../../../icons/feather-left.jpg";


const PublicProfile = () => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [truncatedDescription, setTruncatedDescription] = useState("");
  // const [vendorData, setVendorData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    // console.log("Opening modal...");
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    // console.log("Closing modal...");
    setOpenModal(!openModal);
  };
  console.log("openModal after closing:", openModal);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  // Function to truncate the description to the first 50 words
  const truncateDescription = (description) => {
    const words = description.split(" ");
    const truncatedWords = words.slice(0, 50);
    return truncatedWords.join(" ");
  };

  const renderDescription = () => {
    if (showFullDescription) {
      return (
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: vendorData.vendor.full_desc,
            }}
          />
          <button className="text-[14px] font-bold" onClick={toggleDescription}>
            Show less
          </button>
        </div>
      );
    } else {
      // Show truncated description with "see more" link
      return (
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: vendorData.vendor.full_desc.substring(0, 300) + "...",
            }}
          />
          <button className="text-[14px] font-bold" onClick={toggleDescription}>
            See more
          </button>
        </div>
      );
    }
  };

  const vendorData = {
    vendor: {
      id: 1,
      name: "Zonzo Estate",
      partner_type: "Gold Partner",
      logo: "https://pbs.twimg.com/profile_images/671119938271088640/jHLUjWWl_400x400.jpg",
      team_desc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      ratings: {
        average: 4.9,
        total: 100,
      },
      reviews_count: "998",
      awards_count: "60",
      full_desc:
        "<div><h2 style=`marginBottom:1rem;`>Text Header</h2><br/><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer semper sapien libero, a posuere erat bibendum sodales. Etiam rutrum dui a sem dapibus, elementum maximus mi ultricies. Vivamus id interdum dui. Nulla vel ornare massa. Aliquam venenatis nisl nisl, eu feugiat elit viverra a. Proin viverra aliquet diam at lobortis. Fusce dapibus semper viverra. Ut nec varius magna. Suspendisse a sapien maximus, dictum augue in, accumsan mauris. Aliquam vehicula viverra magna, eu elementum ante convallis ut. Nulla velit mi, iaculis in est eget, varius sollicitudin nunc. Sed in risus iaculis mi finibus volutpat id in mauris. Nam dictum erat et.</p></div>",
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
        {
          id: 5,
          type: "video",
          url: "https://www.youtube.com/embed/tEHNeM3DCm0?si=q52_crluKLbv7uw0",
          thumbUrl: "https://img.youtube.com/vi/tEHNeM3DCm0/maxresdefault.jpg",
        },
        {
          id: 6,
          type: "image",
          url: "https://abia.com.au/uploads/vportfolio/thumb/zonzo-estate-yarra-glen_2203021146265.jpeg",
        },
        {
          id: 7,
          type: "image",
          url: "https://abia.com.au/uploads/vcoverimage/thumb_zonzo-estate-yarra-glen_2203020113541.jpeg",
        },
      ],
      awards: [
        {
          id: 1,
          awardurl: "https://abia.com.au/images/abia-award-badge_FINALIST.svg",
          award_name: "2023 Finalist (VIC)",
          award_category: "Function Coordinator",
          award_voting: "99.52%",
        },
        {
          id: 1,
          awardurl: "https://abia.com.au/images/abia-award-badge_FINALIST.svg",
          award_name: "2023 Finalist (VIC)",
          award_category: "Function Coordinator",
          award_voting: "99.52%",
        },
        {
          id: 2,
          awardurl: "https://abia.com.au/images/abia-award-badge_WINNER.svg",
          award_name: "2023 Winner (VIC)",
          award_category: "Restaurant Reception",
          award_voting: "99.85%",
        },
        {
          id: 3,
          awardurl: "https://abia.com.au/images/abia-award-badge_NATIONAL.svg",
          award_name: "2023 Top 10 (NATIONAL)",
          award_category: "Function Coordinato",
          award_voting: "",
        },
        {
          id: 4,
          awardurl: "https://abia.com.au/images/abia-award-badge_NATIONAL.svg",
          award_name: "2023 Top 10 (NATIONAL)",
          award_category: "Function Coordinato",
          award_voting: "",
        },
      ],
      blogs: [
        {
          id: 1,
          title: "Best 26 Celebrants of Queensland",
          pagephoto_val:
            "https://abia.abia-test.com//blog/thumb/newimagecheck1383.webp",
          main_url: "newimagecheck",
          url: "wedding-blog/newimagecheck",
        },
        {
          id: 2,
          title: "Best Rustic & Country Wedding Venues in Australia",
          pagephoto_val:
            "https://abia.abia-test.com//blog/thumb/best-rustic-country-weddings-venues-in-australia3250.webp",
          main_url: "best-rustic-country-weddings-venues-in-australia",
          url: "wedding-blog/best-rustic-country-weddings-venues-in-australia",
        },
        {
          id: 3,
          title: "Best 14 Wedding Ceremony Venues in Victoria",
          pagephoto_val:
            "https://abia.abia-test.com//blog/thumb/best-wedding-ceremony-venues-in-melbourne-geelong-mornington-peninsula-victoria4031.webp",
          main_url:
            "best-wedding-ceremony-venues-in-melbourne-geelong-mornington-peninsula-victoria",
          url: "wedding-blog/best-wedding-ceremony-venues-in-melbourne-geelong-mornington-peninsula-victoria",
        },
        {
          id: 4,
          title: "Best 14 Wedding Ceremony Venues in Victoria",
          pagephoto_val:
            "https://abia.abia-test.com//blog/thumb/best-wedding-ceremony-venues-in-melbourne-geelong-mornington-peninsula-victoria4031.webp",
          main_url:
            "best-wedding-ceremony-venues-in-melbourne-geelong-mornington-peninsula-victoria",
          url: "wedding-blog/best-wedding-ceremony-venues-in-melbourne-geelong-mornington-peninsula-victoria",
        },
      ],
      reviews: [
        {
          id: 1,
          couples_name: "Kaila & Joeff",
          couple_img_val:
            "https://abia.abia-test.com//blog/thumb/newimagecheck1383.webp",
          submitted_date: "01/01/2024",
          category: "Wedding Styling",
          review_content:
            "Testing if Cloudland Weddings will receive verification email.",
          reply:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
          id: 2,
          couples_name: "Emily & Nicole",
          couple_img_val: "",
          submitted_date: "01/01/2024",
          category: "Wedding Styling",
          review_content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          reply: "Reply 2",
        },
      ],
      offers: [
        {
          id: 1,
          offer_name: "Title-1",
          offer_detail:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
          id: 2,
          offer_name: "Title-2",
          offer_detail:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
          id: 3,
          offer_name: "Title-3",
          offer_detail:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
      ],
      faq: [
        {
          id: 1,
          question: "Question 1",
          answer: "Answer 1",
        },
        {
          id: 2,
          question: "Question 2",
          answer: "Answer 2",
        },
        {
          id: 3,
          question: "Question 3",
          answer: "Answer 3",
        },
        {
          id: 4,
          question: "Question 4",
          answer: "Answer 4",
        },
        {
          id: 5,
          question: "Question 5",
          answer: "Answer 5",
        },
      ],
    },
  };

  // Refs for scrolling to sections
  const aboutRef = useRef(null);
  const awardsRef = useRef(null);
  const reviewsRef = useRef(null);
  const faqRef = useRef(null);
  const specialRef = useRef(null);

  // Function to scroll to a specific section
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <LayoutGeneral>
        <div className="pp-content">
          <MainImage vendorData={vendorData} />
          {/* BUSINESS DETAILS */}
         
        </div>
      </LayoutGeneral>
    </div>
  );
};

export default PublicProfile;
