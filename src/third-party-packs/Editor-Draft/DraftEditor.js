import React, { useState } from "react";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./DraftEditor.css";
import { useEffect } from "react";

const MAX_WORD_LIMIT = 500;

const DraftEditor = ({ onConvertedContent, onSave }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const _contentState = ContentState.createFromText("Sample content state");
  const raw = convertToRaw(_contentState); // RawDraftContentState JSON
  const [contentState, setContentState] = useState(raw); // ContentState JSON
  const [convertedContent, setConvertedContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [showConvertedContent, setShowConvertedContent] = useState(false);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
    //calculate word count
    const plainText = editorState.getCurrentContent().getPlainText();
    const words = plainText.trim().split(/\s+/);
    const count = words.length;
    setWordCount(count);
  }, [editorState]);

  console.log(convertedContent);

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }

  // function createMarkup(html) {
  //   const element = document.createElement("div");
  //   element.innerHTML = DOMPurify.sanitize(html);

  //   // Convert list items to proper HTML format
  //   const listItems = element.querySelectorAll("li");
  //   listItems.forEach((item) => {
  //     if (item.parentNode.tagName === "UL") {
  //       item.outerHTML = `<li style="list-style-type: disc;">${item.innerHTML}</li>`;
  //     } else if (item.parentNode.tagName === "OL") {
  //       const index = Array.prototype.indexOf.call(
  //         item.parentNode.children,
  //         item
  //       );
  //       item.outerHTML = `<li style="list-style-type: decimal;">${index + 1}. ${
  //         item.innerHTML
  //       }</li>`;
  //     }
  //   });

  //   return {
  //     __html: element.innerHTML,
  //   };
  // }

  const handleSaveButtonClick = () => {
    // Toggle the state to show/hide the converted content
    setShowConvertedContent(!showConvertedContent);
    setWordCount(0);
    onConvertedContent(convertedContent);
    setEditorState(EditorState.createEmpty());
    onSave();
  };

  const handleCancel = () => {
    setWordCount(0);
    setEditorState(EditorState.createEmpty());
  };

  return (
    <div className="draftEditor-container">
      <div className="draft-editor-wrapper">
        <div className="editor-container">
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            toolbar={{
              options: ["inline", "list"],
              inline: {
                options: ["bold", "italic", "underline"],
              },
            }}
          />
        </div>
      </div>
      <div className="text-[12px] mt-[5px]">
        {wordCount}/{MAX_WORD_LIMIT}
      </div>
      {/* {showConvertedContent ? (
          <div
            className="preview"
            dangerouslySetInnerHTML={createMarkup(convertedContent)}
          ></div>
        ) : null} */}
      <div className="myprofile-button-group relative">
        <button className="myprofile-cancel-button" onClick={handleCancel}>
          Cancel
        </button>
        <div className="myprofile-save-button" onClick={handleSaveButtonClick}>
          <button>Save</button>
        </div>
      </div>
    </div>
  );
};

export default DraftEditor;
