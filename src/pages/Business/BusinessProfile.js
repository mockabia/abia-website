import React, { useState, useEffect } from "react";
import "../Style/BusinessProfile.css";
// Accordion
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { RxTriangleUp } from "react-icons/rx";
import { BorderBottom } from "@mui/icons-material";
import DraftJsEditor2 from "../../components/Editor/DraftJsEditor2";
// import DraftEditor from "../../third-party-packs/Editor-Draft/DraftEditor";
// import PreviewListing2 from "../../pages - Copy/MyProfile2/PreviewLisitng2";
// Editor
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const toolbarOptions = {
  options: ["inline", "list"],
  inline: {
    options: ["bold", "italic"],
  },
  list: {
    options: ["unordered", "ordered"],
  },
};

const Profile = () => {
  const [expanded, setExpanded] = useState(false);
  const [draftText, setDraftText] = useState("");
  const [quickText, setQuickText] = useState("");
  const [saveClicked, setSaveClicked] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  // Editor
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const [fullText, setFullText] = useState(null);
  const [fullDescContent, setFullDescContent] = useState(false);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
    setFullText(
      <div dangerouslySetInnerHTML={createMarkup(convertedContent)} />
    );
  }, [editorState, convertedContent]);

  /********************************************************8****** */

  const handleChange = (isExpanded: boolean, panel: string) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleQuickTexChange = (e) => {
    const inputText = e.target.value;
    const currentWordCount = inputText.split(/\s+/).filter(Boolean).length;

    if (currentWordCount <= 100) {
      setDraftText(inputText);
      setWordCount(currentWordCount);
    }
  };

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  const handleSubmit = () => {
    setExpanded(false);
    setSaveClicked(true);
    setQuickText(draftText);
    const htmlContent = convertToHTML(editorState.getCurrentContent());
    const plainTextContent = stripHtmlTags(htmlContent);
    setFullText(plainTextContent);
    // setDraftText(""); // Reset the textarea
    // setWordCount(0);
    console.log("formValues:", {
      "quick-desc": quickText,
      "full-desc": plainTextContent,
    });
  };

  const handleFullDescSubmit = () => {
    setExpanded(false);
    setSaveClicked(true);
    const htmlContent = convertToHTML(editorState.getCurrentContent());
    const plainTextContent = stripHtmlTags(htmlContent);
    setFullText(plainTextContent);
    // setDraftText(""); // Reset the textarea
    // setWordCount(0);
    console.log("formValues:", {
      "quick-desc": quickText,
      "full-desc": plainTextContent,
    });
  };

  const handleCancel = () => {
    setExpanded(false);
    // setDraftText("");
    setWordCount(0);
  };

  /**************Editor *******/
  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  console.log("Draft Editor content:", fullText);

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }
  /**************************************** ***********************************/
  return (
    <div className="preview-listing-container">
      {/* PROFILE BASICS */}
      <div>
        <div>
          <h2 className="profile-listing-header">Profile Basics</h2>
        </div>
        <div className="mt-[0px] md:mt-[10px]">
          {/* QUICK DESCRPTION */}
          {/* <PreviewListing2 /> */}
          <Accordion
            expanded={expanded === "panel1"}
            onChange={(e, isExpanded) => handleChange(isExpanded, "panel1")}
            style={{
              padding: "2rem",
              paddingLeft: "0rem",
              border: expanded ? "1px solid #D6D6D6" : "none",
              borderRadius: expanded ? "1rem 1rem 0 0" : "0",
              borderBottom: expanded ? "1px solid #D6D6D6" : "none",
            }}
          >
            <AccordionSummary
              id="panel1-header"
              aria-controls="panel1-content"
              expandIcon={<ExpandMoreIcon />}
            >
              <div>
                <h4 className="myprofile-heading-expand">Quick Description</h4>
                {saveClicked && quickText.length > 0 && !expanded ? (
                  <p className="myprofile-accordion-subheading">{quickText}</p>
                ) : (
                  <p className="myprofile-accordion-subheading">
                    Display a quick summary of your business. Tip include what
                    your service is and your location.
                  </p>
                )}
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <div className="myprofile-accordion-item-header">
                  {/* <span className="myprofile-edit-button">Edit</span> */}
                </div>
                <div className="mt-[0px]">
                  <div className="profile-editor-position">
                    <textarea
                      name="quick-desc"
                      id="text-area"
                      value={draftText}
                      onChange={handleQuickTexChange}
                      className="myprofile-textarea-style"
                    />

                    <span className="text-[12px] mt-[5px]">
                      {wordCount >= 100 ? (
                        <p className="text-red-500 text-[12px] mt-2">
                          Limit exceeded (100 words maximum)
                        </p>
                      ) : (
                        `${wordCount}/100`
                      )}
                    </span>
                    <div className="myprofile-button-group">
                      <button
                        className="myprofile-cancel-button"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                      <button
                        className="myprofile-save-button"
                        onClick={handleSubmit}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          {/* Full DESCRPTION */}
          <Accordion
            expanded={expanded === "panel2"}
            onChange={(e, isExpanded) => handleChange(isExpanded, "panel2")}
            style={{
              padding: "2rem",
              paddingLeft: "0rem",
              border: expanded ? "1px solid #D6D6D6" : "none",
              borderRadius: expanded ? "1rem 1rem 0 0" : "0",
              borderBottom: expanded ? "1px solid #D6D6D6" : "none",
            }}
          >
            <AccordionSummary
              id="panel2-header"
              aria-controls="panel2-content"
              expandIcon={<ExpandMoreIcon />}
            >
              <div>
                <h4 className="myprofile-heading-expand">Full Description</h4>
                {saveClicked && fullText.length > 0 && !expanded ? (
                  <p className="myprofile-accordion-subheading">{fullText}</p>
                ) : (
                  <p className="myprofile-accordion-subheading">
                    Give couples a sense of what is included when they book
                    [insert business name]. Include information such as
                    locations, inclusions, starting prices etc.
                  </p>
                )}
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <div className="myprofile-accordion-item-header">
                  {/* <span className="myprofile-edit-button">Edit</span> */}
                  {/* <RxTriangleUp size={30} className="myprofile-up-aroww" /> */}
                </div>
                {/* Editor */}
                {/* <DraftJsEditor2 /> */}
                <div>
                  <div className="editor-container">
                    <Editor
                      editorState={editorState}
                      onEditorStateChange={setEditorState}
                      toolbar={toolbarOptions}
                    />
                    {/* {convertedContent}
                    {fullText} */}
                  </div>
                  <div
                    className="hidden"
                    dangerouslySetInnerHTML={createMarkup(convertedContent)}
                  />
                </div>
                <div className="mt-[0px]">
                  <div className="profile-editor-position">
                    <div className="myprofile-button-group">
                      <button
                        className="myprofile-cancel-button"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                      <button
                        className="myprofile-save-button"
                        onClick={handleFullDescSubmit}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="mb-[100px]"></div>
    </div>
  );
};

export default Profile;
