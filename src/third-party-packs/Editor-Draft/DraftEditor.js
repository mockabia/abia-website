import React, { useEffect, useRef, useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import Toolbar from "./Toolbar/Toolbar";
import "./DraftEditor.css";

const MAX_WORD_LIMIT = 500;

const DraftEditor = ({ value, onChange, onDraftEditorSubmit }) => {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      convertFromRaw({
        blocks: [
          {
            key: "3eesq",
            text: "",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 19,
                length: 6,
                style: "BOLD",
              },
              {
                offset: 25,
                length: 5,
                style: "ITALIC",
              },
              {
                offset: 30,
                length: 8,
                style: "UNDERLINE",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "9adb5",
            text: "",
            type: "header-one",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      })
    )
  );
  const editor = useRef(null);
  const [wordCount, setWordCount] = useState(0);
  const [isWordLimitExceeded, setIsWordLimitExceeded] = useState(false);
  const [submittedText, setSubmittedText] = useState("");

  const handleDraftEditorSubmit = () => {
    const contentState = editorState.getCurrentContent();
    const plainText = contentState.getPlainText();
    setEditorState(EditorState.createEmpty());
    onDraftEditorSubmit(plainText);
  };

  const handleCancel = () => {
    const emptyEditorState = EditorState.createEmpty();
    setEditorState(emptyEditorState);
    setWordCount(0);
  };

  // useEffect(() => {
  //   focusEditor();
  // }, []);

  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    const words = text.trim().split(/\s+/);
    const count = words.length;
    setWordCount(count);
    setIsWordLimitExceeded(count > MAX_WORD_LIMIT);
  }, [editorState]);

  const focusEditor = () => {
    editor.current.focus();
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (!newState) {
      const newEditorState = RichUtils.handleKeyCommand(editorState, command);
      if (newEditorState) {
        setEditorState(newEditorState);
        return true;
      }
    }
    return false;
  };

  // FOR INLINE STYLES
  const styleMap = {
    CODE: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
    HIGHLIGHT: {
      backgroundColor: "#F7A5F7",
    },
    UPPERCASE: {
      textTransform: "uppercase",
    },
    LOWERCASE: {
      textTransform: "lowercase",
    },
    CODEBLOCK: {
      fontFamily: '"fira-code", "monospace"',
      fontSize: "inherit",
      background: "#ffeff0",
      fontStyle: "italic",
      lineHeight: 1.5,
      padding: "0.3rem 0.5rem",
      borderRadius: " 0.2rem",
    },
    SUPERSCRIPT: {
      verticalAlign: "super",
      fontSize: "80%",
    },
    SUBSCRIPT: {
      verticalAlign: "sub",
      fontSize: "80%",
    },
  };

  // FOR BLOCK LEVEL STYLES(Returns CSS Class From DraftEditor.css)
  const myBlockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    switch (type) {
      case "blockQuote":
        return "superFancyBlockquote";
      case "leftAlign":
        return "leftAlign";
      case "rightAlign":
        return "rightAlign";
      case "centerAlign":
        return "centerAlign";
      case "justifyAlign":
        return "justifyAlign";
      default:
        break;
    }
  };

  const handleEditorChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    const words = text.trim().split(/\s+/);
    const count = words.length;

    if (count <= MAX_WORD_LIMIT) {
      setEditorState(editorState);
      setWordCount(count);
      setIsWordLimitExceeded(false);
    }
  };

  const handledraftSubmit = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const blocks = rawContentState.blocks;

    let formattedText = blocks
      .map((block) => {
        const { text, inlineStyleRanges } = block;
        let formattedBlock = text;

        inlineStyleRanges.forEach((range) => {
          const { style, offset, length } = range;
          const startTag = `<span style="${getStyleProperty(style)}">`;
          const endTag = "</span>";
          formattedBlock =
            formattedBlock.slice(0, offset) +
            startTag +
            formattedBlock.slice(offset, offset + length) +
            endTag +
            formattedBlock.slice(offset + length);
        });

        return formattedBlock;
      })
      .join("\n");

    setSubmittedText(formattedText);
  };

  const getStyleProperty = (style) => {
    switch (style) {
      case "BOLD":
        return "font-weight: bold";
      case "ITALIC":
        return "font-style: italic";
      case "UNDERLINE":
        return "text-decoration: underline";
      default:
        return "";
    }
  };

  return (
    <div>
      <div className="draft-editor-wrapper" onClick={focusEditor}>
        <Toolbar editorState={editorState} setEditorState={setEditorState} />
        <div className="editor-container">
          <Editor
            ref={editor}
            placeholder="Write Here"
            handleKeyCommand={handleKeyCommand}
            editorState={editorState}
            customStyleMap={styleMap}
            blockStyleFn={myBlockStyleFn}
            onChange={handleEditorChange}
          />
        </div>
      </div>
      <div>
        {wordCount}/{MAX_WORD_LIMIT}
      </div>
      <div>
        <div className="draft-button-group">
          <button className="draft-editor-cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <div
            className="draft-editor-save-button"
            onClick={handleDraftEditorSubmit}
          >
            <button>Save</button>
            {isWordLimitExceeded && (
              <span className="word-limit-exceeded-message">
                Word limit exceeded
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftEditor;
