// import React, { useState } from "react";
// import { RxTriangleUp } from "react-icons/rx";
// import {
//   AccordionItem,
//   AccordionItemButton,
//   AccordionItemHeading,
//   AccordionItemPanel,
// } from "react-accessible-accordion";
// import "../../Style/BusinessProfile.css";
// import DraftEditor from "../../../third-party-packs/Editor-Draft/DraftEditor";
// import DOMPurify from "dompurify";
// import ShowMoreText from "react-show-more-text";

// const BusinessFullDesc = ({ handleFullAccordionChange }) => {
//   const [myprofileFulltDescription, setMyProfileFullDescription] = useState("");

//   const handlefullDescSubmit = (content) => {
//     setMyProfileFullDescription(content);
//     console.log("Full Description Content:", content);
//   };

//   const handlePanelClick = (e) => {
//     e.stopPropagation();
//   };

//   const wordLimit = 100;

//   function createMarkup(html) {
//     const element = document.createElement("div");
//     element.innerHTML = DOMPurify.sanitize(html);

//     // Convert list items to proper HTML format
//     const listItems = element.querySelectorAll("li");
//     listItems.forEach((item) => {
//       if (item.parentNode.tagName === "UL") {
//         item.outerHTML = `<li style="list-style-type: disc;">${item.innerHTML}</li>`;
//       } else if (item.parentNode.tagName === "OL") {
//         const index = Array.prototype.indexOf.call(
//           item.parentNode.children,
//           item
//         );
//         item.outerHTML = `<li style="list-style-type: decimal;">${index + 1}. ${
//           item.innerHTML
//         }</li>`;
//       }
//     });

//     return {
//       __html: element.innerHTML,
//     };
//   }

//   return (
//     <>
//       <div>
//         <AccordionItemButton className="myprofile-accordion-button">
//           <div className="myprofile-accordion-item-header">
//             <h4 className="myprofile-heading-expand">Full Description</h4>
//             <span className="myprofile-edit-button">Edit</span>
//             <RxTriangleUp size={30} className="myprofile-up-aroww" />
//           </div>
//           <div
//             id="quickdesc-subheading"
//             className="myprofile-accordion-subheading"
//           >
//             <ShowMoreText
//               lines={5}
//               more="Show more"
//               less="Show less"
//               anchorClass="display-showmore"
//               expanded={false}
//               width={0}
//             >
//               {myprofileFulltDescription ? (
//                 <div
//                   dangerouslySetInnerHTML={createMarkup(
//                     myprofileFulltDescription
//                   )}
//                 />
//               ) : (
//                 <p className="leading-[24px]">
//                   Give couples a sense of what is included when they book
//                   [insert business name]. Include information such as locations,
//                   inclusions, starting prices etc.
//                 </p>
//               )}
//             </ShowMoreText>
//           </div>
//         </AccordionItemButton>
//       </div>
//       <div onClick={handlePanelClick}>
//         <div>
//           <div className="flex flex-col -mt-[20px]">
//             <DraftEditor
//               value={myprofileFulltDescription}
//               onConvertedContent={handlefullDescSubmit}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BusinessFullDesc;
