import React, { useState } from "react";
import TagsInput from "react-tagsinput";
import { toast } from "react-toastify";
import axios from "axios";
import "react-tagsinput/react-tagsinput.css";
import "./form.css";

const QuestionForm = ({ closeModal, questionCreate }) => {
  const [questionForm, setQuestion] = useState({
    incorrect_answers: [],
    question: "",
    image: null,
    correct_answer: "",
  });
  const inputProps = {
    placeholder: "Add an option and press enter",
    className: "question-input",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Need to submit to the database
    const response = await axios.post(
      "https://shrouded-brushlands-72921.herokuapp.com/createquestion",
      questionForm
    );
    console.log(questionForm);
    console.log(response);
    closeModal();
    toast("Your question has been created successfully");
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const {
      target: { name, value },
    } = event;

    setQuestion({
      ...questionForm,
      [name]: value,
    });
  };

  const handleTagsChange = (options) => {
    setQuestion({
      ...questionForm,
      incorrect_answers: options,
    });
  };

  return (
    <form action="" id="question-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="question"
        placeholder="Enter your question...."
        onChange={handleInputChange}
        value={questionForm.question}
        className="question-input"
      />
      <TagsInput
        value={questionForm.incorrect_answers}
        onChange={handleTagsChange}
        maxTags={4}
        inputProps={inputProps}
      />
      <input
        type="text"
        placeholder="Add the answer to the question..."
        value={questionForm.correct_answer}
        onChange={handleInputChange}
        className="question-input"
        name="correct_answer"
      />
      {/* 
      <input
        type="file"
        placeholder="Add the image..."
        id={questionForm.image}
        onChange={handleImageChange}
        multiple
        className="image-upload"
        name="image"
        accept="image/*"
      />*/}

      <div className="submit-area">
        <button className="submit-button" type="submit">
          Create Question
        </button>
      </div>
    </form>
  );
};

export default QuestionForm;