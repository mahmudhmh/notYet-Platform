import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./Quiz.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../ComponentX/Navbar";

function Quiz() {
  const token = localStorage.getItem("token");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    choices: ["", "", "", ""],
    answer: 0,
    difficulty: "",
  });
  const [showFormModal, setShowFormModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          // `http://localhost:5000/questions?page=${currentPage}&limit=10`,
          `http://localhost:5000/questions`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setQuestions(data.data.questions);
        setTotalPages(Math.ceil(data.results / 10));
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuestions();
  }, [token, currentPage]);

  const handleOpenFormModal = () => {
    setShowFormModal(true);
  };

  const handleSaveForm = () => {
    const token = localStorage.getItem("token");
    const dataToSend = {
      question: newQuestion.question,
      choices: newQuestion.choices,
      answer: newQuestion.answer,
      difficulty: newQuestion.difficulty,
    };

    fetch("http://localhost:5000/questions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setShowFormModal(false);
        setNewQuestion({
          question: "",
          choices: ["", "", "", ""],
          answer: 0,
          difficulty: "",
        });
        toast.success("Question created successfully!");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  const parseFile = () => {
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        // Parse the file content and extract the data (assuming the file is in JSON format)
        const parsedData = JSON.parse(fileContent);
        // Update the form fields with the parsed data
        setNewQuestion({
          question: parsedData.question,
          choices: parsedData.choices,
          answer: parsedData.answer,
          difficulty: parsedData.difficulty,
        });
      };
      reader.readAsText(uploadedFile);
    }
  };
  // const handlePageChange = (currentPage) => {
  //   setCurrentPage(currentPage);
  // };
  // const renderPagination = () => {
  //   const pages = [];

  //   for (let i = 1; i <= totalPages; i++) {
  //     pages.push(
  //       <li
  //         key={i}
  //         className={i === currentPage ? "active" : ""}
  //         onClick={() => handlePageChange(i)}
  //       >
  //         <a>{i}</a>
  //       </li>
  //     );
  //   }

  //   return <ul className="pagination-problems">{pages}</ul>;
  // };

  return (
    <>
      <Navbar />
      <div className="Quiz-Container">
        <div className="Quiz-Header">
          <button
            className="CreateQuestion-button"
            onClick={handleOpenFormModal}
          >
            Create Question
          </button>
        </div>
        <div className="Quiz-body">
          <h1 className="yet-quiz">!YET Questions</h1>
          <div className="quiz-page">
            <table className="quiz-table">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Choices</th>
                  <th>Answer</th>
                  <th>Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question) => (
                  <tr key={question._id}>
                    <td>{question.question}</td>
                    <td>{question.choices.join(", ")}</td>
                    <td>{question.answer}</td>
                    <td>{question.difficulty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* {renderPagination()} */}
          </div>
        </div>
      </div>

      <Modal
        isOpen={showFormModal}
        onRequestClose={() => setShowFormModal(false)}
        contentLabel="Create Question Form Modal"
        className="Modal"
        overlayClassName="Modal-overlay"
      >
        <div className="Modal-content">
          <h2 className="Modal-title">Create Question</h2>
          <textarea
            className="Modal-textarea"
            placeholder="Enter your question"
            value={newQuestion.question}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, question: e.target.value })
            }
          ></textarea>
          <div className="Modal-choices">
            {newQuestion.choices.map((choice, index) => (
              <label key={index}>
                Answer
                <input
                  type="text"
                  className="Modal-choice-input"
                  placeholder={`Choice ${index + 1}`}
                  value={choice}
                  onChange={(e) => {
                    const updatedChoices = [...newQuestion.choices];
                    updatedChoices[index] = e.target.value;
                    setNewQuestion({
                      ...newQuestion,
                      choices: updatedChoices,
                    });
                  }}
                />
              </label>
            ))}
          </div>
          <label>
            Choose the Correct Answer
            <select
              className="Modal-select"
              value={newQuestion.answer}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, answer: e.target.value })
              }
            >
              {newQuestion.choices.map((_, index) => (
                <option key={index} value={index}>
                  Choice {index + 1}
                </option>
              ))}
            </select>
          </label>
          <label>
            Choose the difficulty
            <select
              className="Modal-select"
              value={newQuestion.difficulty}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, difficulty: e.target.value })
              }
            >
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>

          <div>
            <button
              className="Modal-save-button-Quiz-f"
              onClick={handleSaveForm}
            >
              Save
            </button>
            <button
              className="Modal-Cancel-button-Quiz-f"
              onClick={() => setShowFormModal(false)}
            >
              Cancel
            </button>
            <div className="parsable-file">
              <input type="file" accept=".json" onChange={handleFileUpload} />
              <button className="ParseFile-button" onClick={parseFile}>
                Parse File
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Quiz;
