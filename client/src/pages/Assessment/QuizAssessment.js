import React, { useState, useEffect } from "react";
import "./QuizAssessment.css";
import { Link } from "react-router-dom";
import LogoWhiteTextt from "../../assets/LogoWhiteText.png";

const QuizAssessment = () => {
  const token = localStorage.getItem("token");

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [redirectToVideoWelcome, setRedirectToVideoWelcome] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:5000/questions", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const allQuestions = data.data.questions;

        // Shuffle the questions array
        const shuffledQuestions = shuffleArray(allQuestions);

        // Take the first 10 questions
        const selectedQuestions = shuffledQuestions.slice(0, 10);

        const fetchedQuestions = selectedQuestions.map((question) => {
          const { _id, question: questionText, choices, answer } = question;
          return {
            id: _id,
            question: questionText,
            choices: choices,
            answer: answer,
          };
        });
        setQuestions(fetchedQuestions);
        setUserAnswers(Array(fetchedQuestions.length).fill(null));
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuestions();
  }, [token]);

  const handleAnswerSelection = (answerIndex) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(updatedAnswers);
  };

  const handleNextQuestion = async () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      const score = calculateScore();
      setScore(score);
      setShowResults(true);
  
      let assessmentResult;
      if (score < questions.length * 0.4) {
        assessmentResult = "Beginner";
      } else if (score >= questions.length * 0.4 && score <= questions.length * 0.7) {
        assessmentResult = "Intermediate";
      } else {
        assessmentResult = "Advanced";
      }
  
      // Update quiz evaluation with the user's score
      const evaluationData = {
        quizEvaluation: score.toString(),
      };
  
      try {
        const response = await fetch("http://localhost:5000/quizes/quizEvaluation", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(evaluationData),
        });
        // Handle the response as per your requirements
        console.log(response);
      } catch (error) {
        console.log(error);
      }
  
      localStorage.setItem("assessmentResult", assessmentResult);
      setTimeout(() => {
        setRedirectToVideoWelcome(true);
      }, 15000); // Delay of 15 seconds (15000 milliseconds)
    }
  };
  

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      const selectedAnswer = userAnswers[index];
      const correctAnswer = question.answer;
      if (selectedAnswer === correctAnswer) {
        score += 1;
      }
    });
    return score;
  };
  if (redirectToVideoWelcome) {
    window.location.href = "/VideoWelcome";
  }
  if (showResults) {
    let message = "";
    if (score < questions.length * 0.4) {
      message = "You are a Beginner";
    } else if (
      score >= questions.length * 0.4 &&
      score <= questions.length * 0.7
    ) {
      message = "You are Intermediate";
    } else {
      message = "You are Advanced";
    }

    return (
      <>
        <h2 className="results">Quiz Results</h2>
        <div className="quiz-container">
          <p className="results-msg">
            You scored {score} out of {questions.length}!
          </p>
          <p className="score-msg">{message}</p>
          <Link className="link-redirection" to="/">
            <button className="next-btn22">Go Home</button>
          </Link>{" "}
          <Link className="link-redirection" to="/assessment/roadmap">
            <button className="next-btn222">Show Roadmap</button>
          </Link>
        </div>
      </>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      // <div className="loading-message loading-data-animation">
      //   Loading quiz data...
      // </div>
      <div class="lds-hourglass"></div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const handlePreviousQuestion = () => {
    const previousIndex = currentQuestionIndex - 1;
    if (previousIndex >= 0) {
      setCurrentQuestionIndex(previousIndex);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="loading-message loading-data-animation">
        Loading question...
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="card-left">
        <img className="logoo" src={LogoWhiteTextt} alt="Logo" />
      </div>
      <div className="card-right">
        <h2 className="question">{currentQuestion.question}</h2>
        <div className="answers">
          {currentQuestion.choices.map((choice, index) => (
            <button
              key={index}
              className={`answer ${
                userAnswers[currentQuestionIndex] === index ? "selected" : ""
              }`}
              onClick={() => handleAnswerSelection(index)}
            >
              {choice}
            </button>
          ))}
          <div className="slider-counter">
            {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>
        <div className="slider">
          <button
            className="slider-button"
            disabled={currentQuestionIndex === 0}
            onClick={handlePreviousQuestion}
          >
            Previous
          </button>
        </div>
        <button
          className="next-btn"
          disabled={userAnswers[currentQuestionIndex] === null}
          onClick={handleNextQuestion}
        >
          {currentQuestionIndex === questions.length - 1
            ? "Finish"
            : "Next Question"}
        </button>
        <Link to="/">
          <button className="next-btn2">Go Home</button>
        </Link>
      </div>
    </div>
  );
};

export default QuizAssessment;

// Function to shuffle an array using Fisher-Yates algorithm
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
