import React, { useEffect, useState } from "react";
import LayoutGeneral from "../../../../layouts/Layout/LayoutGeneral";
import "../../../Style/testing.css";
import QuickDesc from "./QuickDesc";
import * as BusinessJS from "../../../Business/Business";

// const { heading, content, title } = accordionData;
const accordionData = [
  {
    heading: "Quick Description",
    title:
      " Display a quick summary of your business. Tip includes what your service is and your location.",
    content: <QuickDesc />,
  },
  {
    heading: "Full Description",
    title:
      " Display a quick summary of your business. Tip includes what your service is and your location.",
    content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
        laborum cupiditate possimus labore, hic temporibus velit dicta earum
        suscipit commodi eum enim atque at? Et perspiciatis dolore iure
        voluptatem.`,
  },
];

const BusinessProfile1 = () => {
  const [activeItems, setActiveItems] = useState(
    Array(accordionData.length).fill(false)
  );

  const toggleAccordion = (index) => {
    const newActiveItems = [...activeItems];
    newActiveItems[index] = !newActiveItems[index];
    setActiveItems(newActiveItems);
  };

  return (
    <div>
      <LayoutGeneral>
        <main className="flex flex-col justify-center items-center w-[50%] m-[auto]">
          <h1>React Accordion Demo</h1>
          {accordionData.map(({ heading, title, content }, index) => (
            <div className="accordion">
              <div className="accordion-item">
                <div>
                  <div className="accordion-title">
                    <div>{heading}</div>
                    <div onClick={() => toggleAccordion(index)}>
                      {activeItems[index] ? "+" : "Edit"}
                    </div>
                  </div>
                  <div>{title}</div>
                </div>
                {activeItems[index] && (
                  <div className="accordion-content">{content}</div>
                )}
              </div>
            </div>
          ))}
        </main>
      </LayoutGeneral>
    </div>
  );
};

export default BusinessProfile1;
