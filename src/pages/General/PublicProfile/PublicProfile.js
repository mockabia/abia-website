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
      logo: "https://scontent.fccj6-1.fna.fbcdn.net/v/t39.30808-6/327265908_913673846733991_4430403031133714382_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=kOVGirOe2LwAX8iPBvA&_nc_ht=scontent.fccj6-1.fna&oh=00_AfDYBmkcudcRfPNPbQxrV0S-rvGB7u_GDOoPxVf4w4MnvA&oe=6601DC68",
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
          <div className="pp-business-wrapper">
            <div className="pp-business-details">
              {/* BUSINESS NAME */}
              <h1>{vendorData.vendor.name}</h1>

              {/* BUSINESS SNIPPET */}
              <div>
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
              {/* BUSINESS CONTACT */}
              <div className="flex justify-start items-center gap-[1rem]">
                {/* phone */}
                <div className="pp-phone">phone</div>
                <div className="pp-website">website</div>
                <div className="pp-instagram">
                  <SiInstagram size={20} color="#fff" />
                </div>
                <div className="pp-instagram">
                  <FaTiktok size={20} color="#fff" />
                </div>
              </div>
              {/* NAVIGATION MENU */}
              <div className="pp-nav-border flex justify-between">
                <ul className="pp-nav-list ">
                  <li onClick={() => scrollToSection(aboutRef)}>About</li>
                  <li onClick={() => scrollToSection(awardsRef)}>Awards</li>
                  <li onClick={() => scrollToSection(reviewsRef)}>Reviews</li>
                  <li>Photos + Videos</li>
                  <li onClick={() => scrollToSection(specialRef)}>Special</li>
                  <li onClick={() => scrollToSection(faqRef)}>FAQs</li>
                  {/* <li>FAQs</li> */}
                </ul>
                <div></div>
              </div>
              {/* ABOUT US */}
              <div ref={aboutRef} className="w-[92vw] md:w-[75vw] lg:w-[80%] ">
                {/* w-[80%] */} {renderDescription()}
              </div>
              <div className="pp-sperator"></div>
              {/* AWARDS */}
              <div>
                <div ref={awardsRef} className="pp-award-screen-adj">
                  <AwardSlide awards={vendorData.vendor.awards} />
                </div>
              </div>
              {/* <br /> */}
              <div className="pp-sperator"></div>
              {/* BLOGS */}
              <div>
                <div>
                  <BlogSlide blogs={vendorData.vendor.blogs} />
                </div>
              </div>
              {/* <br /> */}
              <div className="pp-sperator"></div>
              {/* REVIEWS */}
              <div>
                <div
                  ref={reviewsRef}
                  className="w-[92vw]  md:w-[75vw] lg:w-[87%]"
                >
                  <ReviewsReply
                    reviews={vendorData.vendor.reviews}
                    vendorData={vendorData}
                  />
                </div>
              </div>
              {/* <br /> */}
              <div className="pp-sperator"></div>
              {/* OFFERS */}
              <div>
                <div ref={specialRef}>
                  <OffersSlide offers={vendorData.vendor.offers} />
                </div>
              </div>
              {/* <br /> */}
              <div className="pp-sperator"></div>
              {/* FAQ */}
              <div>
                <div ref={faqRef}>
                  <FaqSection faqs={vendorData.vendor.faq} />
                </div>
              </div>
              {/* <br /> */}
              {/* MEET THE tEAM */}
              <div className="w-[92vw] md:w-[75vw] lg:w-[87%]">
                <div className="pp-meet-team">
                  <img
                    src={vendorData.vendor.logo}
                    alt={vendorData.vendor.name}
                    className="pp-meet-vendor-logo"
                  />
                  <div className="flex flex-col gap-[1rem]">
                    <h2>Meet the Team</h2>
                    <p>{vendorData.vendor.team_desc}</p>
                  </div>
                </div>
              </div>
              <br />
              <div className="pp-sperator"></div>
            </div>

            {/* MESSAGE ENQUIRY */}
            <div className="pp-message-enq ">
              <PublicEnquiry />
            </div>
            {/* in mobile  */}
            <div className="mob-message-enq" onClick={handleOpenModal}>
              <h4 style={{ color: "#fff", fontWeight: "600" }}>Send Enquiry</h4>
              {openModal && (
                <Modal
                  open={openModal}
                  onClose={handleCloseModal}
                  aria-labelledby="modal-title"
                  aria-describedby="modal-description"
                >
                  <div className="mob-pp-enquiry-box">
                    <div
                      className="flex justify-end cursor-pointer"
                      onClick={() => {
                        console.log("Close button clicked");
                        handleCloseModal();
                      }}
                    >
                      <IoClose size={26} />
                    </div>
                    <h2 id="modal-title" style={{ textAlign: "center" }}>
                      Message Vendor
                    </h2>
                    <input placeholder="Name" className="pp-input-message" />
                    <input placeholder="Email" className="pp-input-message" />
                    <input placeholder="Phone" className="pp-input-message" />
                    <PublicProfileDate />
                    <textarea
                      placeholder="wrtie your message"
                      className="pp-textarea"
                    />
                    <VendorLoginButton>Send</VendorLoginButton>
                  </div>
                </Modal>
              )}
            </div>
          </div>
        </div>
      </LayoutGeneral>
    </div>
  );
};

export default PublicProfile;
