import React, { useState } from "react";
import "./ForgetPwdForm.css";

function ForgetPwdForm(props) {
  const [enteredEmail, setEnteredEmail] = useState("");

  function emailChangeHandler(event) {
    setEnteredEmail(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();

    // Send a request to your backend server to initiate the password reset process
    fetch("http://localhost:5000/users/forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: enteredEmail }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // You can handle the response from the server here
        // Show a success message to the user or redirect them to a success page
      })
      .catch((error) => {
        console.error("Error:", error);
        // Show an error message to the user
      });

    setEnteredEmail("");
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="forgetpwd-form">
        <p className="head">Forget Password</p>
        <p className="head-2">Welcome! Please enter your email</p>
        <div className="forget-pwd-data-in">
          <input
            type="email"
            value={enteredEmail}
            required
            placeholder="Enter your email"
            onChange={emailChangeHandler}
          />
        </div>

        <div className="button-forget-pwd">
          <button className="pass-forget-pwd" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default ForgetPwdForm;
