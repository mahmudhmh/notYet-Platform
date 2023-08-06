import classes from "./Assessment.module.css";
import React, { useState } from "react";
import Backgroundgif from "../../UI/Backgroundgif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import QuizAssessment from "./QuizAssessment";

function Assessment() {
  toast.success("Login successful!"); // Display success toast
  const questions = [];

  return (
    <div className={classes}>
      {/* <Backgroundgif /> */}
      <div>
        <QuizAssessment questions={questions} />
      </div>
    </div>
  );
}
export default Assessment;
