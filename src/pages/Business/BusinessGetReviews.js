import React from "react";
import "../Style/BusinessGetReviews.css";
import { useNavigate } from "react-router-dom";
import ContentHeader from "../../layouts/sidebar/ContentHeader";

const GetReviews = () => {
  const navigate = useNavigate();
  const [vendorInput, setVendorInputs] = useState();
  const [dataSet, setDataSet] = useState(false);

  useEffect(() => {
    BusinessJS.fetchbusiness(setVendorInputs, setDataSet);
  }, []);

  console.log("Vendor :", vendorInput);

  const cardData = [
    {
      title: "Register Past Weddings",
      description:
        "The tried and tested. Simply log in to your ABIA Business Portal and register any wedding client serviced in the past 12 months. ABIA automatically sends a personalised voting form and reminders to increase your conversion rate.",
      bestFor: "Automating reminders to increase conversion rates!",
      bgColor: "#6cc2bc",
      hoverColor: "#339890",
      linkFunction: () =>
        navigate("/business/get-reviews/past-wedding", {
          state: { vendorInput },
        }),
    },
    {
      title: "Register Future Couples",
      description:
        "Future couples will be sent a personalised voting form 3 days after the wedding date. ABIA also sends reminders to increase your conversion rate.",
      bestFor: "Staying organized + automatic reminders!",
      bgColor: "#e8cf82",
      hoverColor: "#efc649",
      linkFunction: () =>
        navigate("/business/get-reviews/future-wedding", {
          state: { vendorInput },
        }),
    },
    {
      title: "Send Personalised Review Link",
      description:
        "Simply copy & send your personalised voting link to any wedding client serviced in the past 12 months. Your link can be sent via text, email, or DM.",
      bestFor: "Direct communication with your couples and follow-ups",
      bgColor: "#555555",
      hoverColor: "#454444",
      linkFunction: () => navigate("/get-reviews/copy-link"),
    },
  ];

  const handleLinkClick = (linkFunction) => {
    linkFunction();
  };

  return (
    <>
      <div className="md:hidden">
        <ContentHeader title="Get Reviews" />
      </div>
      <main>
        <div className="reviews">
          <div className="main-header">
            <h2>3 options to get reviews & grow trust in your brand</h2>
            <p className="mt-[10px] max-w-[800px] whitespace-adjust ">
              Build trust, book more weddings and feature in the prestigious
              ABIA Wedding Awards by collecting authentic ratings and reviews.
              Businesses that regularly send automatic review-requests tend to
              have a higher trust-factor.
            </p>
          </div>

          {cardData.map((card, index) => (
            <div key={index} className={`card card-${index + 1} space-y-3`}>
              <h4 className="font-[600]">{card.title}</h4>
              <div className="card-sub-heading">
                <p className="bodyContent font-semibold mb-[10px] lg:mb-[0px] whitespace-adjust">
                  Best For:{" "}
                  <span className="text-[#6cc2bc]">{card.bestFor}</span>
                </p>
                <div
                  className="card-content-and-button"
                  style={{
                    marginTop: window.innerWidth >= 1190 ? "-6px" : "initial",
                  }}
                >
                  <p className="card-content break-words whitespace-adjust">
                    {card.description}
                  </p>
                  <div className="lg:w-[20px] "></div>
                  <div className="button-postion">
                    <button
                      onClick={() => handleLinkClick(card.linkFunction)}
                      style={{
                        backgroundColor: card.bgColor,
                        hoverColor: card.hoverColor,
                      }}
                      className="button-wedding text-white"
                    >
                      <span className="text-[14px] font-[500]">
                        {card.title === "Send Personalised Review Link"
                          ? "copy review link"
                          : card.title.toLowerCase()}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default GetReviews;
