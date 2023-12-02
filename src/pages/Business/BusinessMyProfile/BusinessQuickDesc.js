// import React, { useState, useEffect } from "react";
// import "../../Style/BusinessProfile.css";
// // Accordion
// import Accordion from "@mui/material/Accordion";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import { Typography } from "@mui/material";

// const BusinessQuickDesc = () => {
//   const [expanded, setExpanded] = useState(false);
//   const [draftText, setDraftText] = useState("");
//   const [quickText, setQuickText] = useState("");
//   const [saveClicked, setSaveClicked] = useState(false);
//   const [wordCount, setWordCount] = useState(0);

//    const handleChange = (isExpanded: boolean, panel: string) => {
//      setExpanded(isExpanded ? panel : false);
//    };

//    const handleQuickTexChange = (e) => {
//      const inputText = e.target.value;
//      const currentWordCount = inputText.split(/\s+/).filter(Boolean).length;

//      if (currentWordCount <= 100) {
//        setDraftText(inputText);
//        setWordCount(currentWordCount);
//      }
//    };
//    const handleSubmit = () => {
//      setExpanded(false);
//      setSaveClicked(true);
//      setQuickText(draftText);
//      // setDraftText(""); // Reset the textarea
//      // setWordCount(0);
//      console.log("formValues:", {
//        "quick-desc": quickText,
//      });
//    };
//      const handleCancel = () => {
//        setExpanded(false);
//        // setDraftText("");
//        setWordCount(0);
//      };

//   return (
//     <div>
//       <Accordion
//         expanded={expanded === "panel1"}
//         onChange={(e, isExpanded) => handleChange(isExpanded, "panel1")}
//         style={{
//           padding: "2rem",
//           paddingLeft: "0rem",
//           border: expanded ? "1px solid #D6D6D6" : "none",
//           borderRadius: expanded ? "1rem 1rem 0 0" : "0",
//           borderBottom: expanded ? "1px solid #D6D6D6" : "none",
//         }}
//       >
//         <AccordionSummary
//           id="panel1-header"
//           aria-controls="panel1-content"
//           expandIcon={
//             <Typography
//               sx={{
//                 color: "black",
//                 fontFamily: "inherit",
//                 fontSize: "14px",
//                 fontWeight: "600",
//               }}
//             >
//               Edit
//             </Typography>
//           }
//           sx={{
//             "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
//               transform: "rotate(0deg)",
//               color: "black",
//             },
//           }}
//         >
//           <div>
//             <h4 className="myprofile-heading-expand">Quick Description</h4>
//             {saveClicked && quickText.length > 0 && !expanded ? (
//               <p className="myprofile-accordion-subheading">{quickText}</p>
//             ) : (
//               <p className="myprofile-accordion-subheading">
//                 Display a quick summary of your business. Tip include what your
//                 service is and your location.
//               </p>
//             )}
//           </div>
//         </AccordionSummary>
//         <AccordionDetails>
//           <div>
//             <div className="myprofile-accordion-item-header">
//               {/* <span className="myprofile-edit-button">Edit</span> */}
//             </div>
//             <div className="mt-[0px]">
//               <div className="profile-editor-position">
//                 <textarea
//                   name="quick-desc"
//                   id="text-area"
//                   value={draftText}
//                   onChange={handleQuickTexChange}
//                   className="myprofile-textarea-style"
//                 />

//                 <span className="text-[12px] mt-[5px]">
//                   {wordCount >= 100 ? (
//                     <p className="text-red-500 text-[12px] mt-2">
//                       Limit exceeded (100 words maximum)
//                     </p>
//                   ) : (
//                     `${wordCount}/100`
//                   )}
//                 </span>
//                 <div className="myprofile-button-group">
//                   <button
//                     className="myprofile-cancel-button"
//                     onClick={handleCancel}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="myprofile-save-button"
//                     onClick={handleSubmit}
//                   >
//                     Save
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </AccordionDetails>
//       </Accordion>
//     </div>
//   );
// };

// export default BusinessQuickDesc;
