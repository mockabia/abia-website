import React, { useRef, useState } from "react";
import "../../Style/PublicProfile.css";
import { FaAngleDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa";

const FaqSection = ({ faqs }) => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const Accordion = ({ id, title, content }) => {
    const isActive = id === activeAccordion;

    const toggleAccordion = () => {
      setActiveAccordion(isActive ? null : id);
    };

    return (
      <div className="pp-accordion-item">
        <div className="pp-accordion-title" onClick={toggleAccordion}>
          {isActive ? <FaChevronUp /> : <FaAngleDown />}
          <div>{title}</div>
        </div>
        {isActive && <div className="pp-accordion-content">{content}</div>}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-[1rem]">
      {/* Header Section */}
      <div className="pp-header-section w-[90%]">
        <h2>Frequently Asked Question</h2>
      </div>
      <div>
        {faqs.map((faq) => (
          <Accordion
            key={faq.id}
            id={faq.id}
            title={faq.question}
            content={faq.answer}
          />
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
