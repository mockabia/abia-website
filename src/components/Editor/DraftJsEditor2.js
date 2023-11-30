import React, { useEffect, useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./DraftEditor.css";

const DraftJsEditor2 = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const [fullText, setFullText] = useState(null);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
    setFullText(
      <div dangerouslySetInnerHTML={createMarkup(convertedContent)} />
    );
  }, [editorState, convertedContent]);

  //   console.log("Draft Editor content:", convertedContent)

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }
  const toolbarOptions = {
    options: ["inline", "list"],
    inline: {
      options: ["bold", "italic"],
    },
    list: {
      options: ["unordered", "ordered"],
    },
  };

  console.log("Fulltext:", fullText);
  return (
    <div>
      <div className="editor-container">
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          toolbar={toolbarOptions}
        />
      </div>
      <div
        className="preview"
        dangerouslySetInnerHTML={createMarkup(convertedContent)}
      />
    </div>
  );
};

export default DraftJsEditor2;
