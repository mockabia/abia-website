import React, { useState } from "react";
import "./QandA2.css";
import { RxTriangleUp } from "react-icons/rx";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

const QandA2 = () => {
  const [questions, setQuestions] = useState([
    { id: 1, question: "", answer: "" },
  ]);
  const [questionDisplay, setQuestionDisplay] = useState("");

  const addQuestion = () => {
    const newId = questions.length + 1;
    setQuestions([...questions, { id: newId, question: "" }]);
  };

  const handleQuestionChange = (e, questionId) => {
    const updatedQuestions = questions.map((q) =>
      q.id === questionId ? { ...q, question: e.target.value } : q
    );
    setQuestions(updatedQuestions);
    // onQandAType(e.target.value);
  };



  const handleQuestionSave = () => {
    // Build the formatted questionDisplay content
    const formattedQuestions = questions.map((question, index) => {
      return `Q: ${question.question}\nA : ${question.answer}`;
    });

    // Join the formatted questions and answers with line breaks
    const newQuestionDisplay = formattedQuestions.join("\n\n");

    setQuestionDisplay(newQuestionDisplay);

    // Log the questions and answers to the console
    questions.forEach((question) => {
      console.log("Question:", question.question);
      console.log("Answer:", question.answer);
    });
  };

  const handleAnswerChange = (e, questionId) => {
    const updatedQuestions = questions.map((q) =>
      q.id === questionId ? { ...q, answer: e.target.value } : q
    );
    setQuestions(updatedQuestions);
  };

  const handlePanelClick = (e) => {
    e.stopPropagation();
  };
  return (
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton className="myprofile-accordion-button">
          <div className="myprofile-accordion-item-header-2">
            <span className="profile-listing-header mt-[20px]">Q&A</span>
            <span className="myprofile-edit-button">Edit</span>
            <RxTriangleUp size={30} className="myprofile-up-aroww" />
          </div>
          <div
            id="quickdesc-subheading"
            className="myprofile-accordion-subheading-pricing qandA-button-change"
          >
            <p className="whitespace-break-spaces">
              {questionDisplay ||
                "Add the most common Q&A your business is asked, this helps couples get to know you further."}
            </p>
          </div>
          {/* <span className="quickdesc-summary">{quickDesc}</span> */}
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel onClick={handlePanelClick}>
        <div>
          <div className="QandA-panel-container">
            <p className="whitespace-break-spaces">Add up to 5 common questions [businessname] is asked.</p>
            {questions.map((question, index) => (
              <div key={question.id}>
                <div className="mt-[15px]  space-y-1">
                  <span className="font-semibold">Question ({index + 1})</span>
                  <br />
                  <input
                    className="question-input-style"
                    placeholder="Maximum 50 characters"
                    value={question.question}
                    onChange={(e) => handleQuestionChange(e, question.id)}
                  />
                </div>
                <div className="mt-[15px] space-y-1">
                  <span className="font-semibold">Answer ({index + 1})</span>
                  <br />
                  <textarea
                    className="answer-input-style"
                    value={question.answer}
                    onChange={(e) => handleAnswerChange(e, question.id)}
                  />
                </div>
              </div>
            ))}
            <div className="myprofile-button-group relative">
              <button className="question-cancel-button" onClick={addQuestion}>
                Add a question
              </button>
              <div
                className="myprofile-save-button"
                onClick={handleQuestionSave}
              >
                <button>Save</button>
              </div>
            </div>
          </div>
        </div>
      </AccordionItemPanel>
    </AccordionItem>
  );
};

export default QandA2;
