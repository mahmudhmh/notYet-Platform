import React from "react";

import NavBar from "../../ComponentX/Navbar";
import ProblemForm from "./ProblemForm";
import "./AddProblems.css";
import { useState } from "react";
import AdminProblems from "./AdminProblems";

function AddProblems(props) {
  const [isEditing, setIsEditing] = useState(false);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
    setIsEditing(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <NavBar />
      <div className={`new-expense-s ${isEditing ? "overlay" : ""}`}>
        {!isEditing && (
          <div className="head-prob-page">
            <h1 className="problems-list-h1">Problems List</h1>
            <button className="button-add-prob" onClick={startEditingHandler}>
              Add New Problem
            </button>
          </div>
        )}

        {isEditing && (
          <div className="popup-container-prob">
            <div className="popup-prob">
              <ProblemForm
                onSaveExpenseData={saveExpenseDataHandler}
                onCancel={stopEditingHandler}
              />
            </div>
          </div>
        )}
      </div>
      <AdminProblems />
    </div>
  );
}
export default AddProblems;
