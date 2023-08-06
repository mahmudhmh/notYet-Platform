import React from "react";
import SignUpForm from "./SignUpForm";
import LogoWhiteText from "../assets/LogoWhiteText.png";
import code from "../assets/code.png";
import "./SignUp.css";
import Footer from "../UI/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp(props) {
  function saveSignUp(enteredInformation) {
    fetch("http://127.0.0.1:5000/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://127.0.0.1:5000/*",
      },
      body: JSON.stringify(enteredInformation),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        if (data.status === "success") {
          // Signup was successful
          //alert("Signup successful!");
          toast.success("Signup successful!");
          // Additional logic or redirect if needed
        } else {
          // Signup failed
          //alert("Signup failed. Please try again.");
          // Additional error handling or display error message to the user
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle any network or server errors
      });
  }

  return (
    <div>
      <img className="logo" src={LogoWhiteText}></img>
      <div className="signup">
        <img src={code}></img>
        <SignUpForm onSubmitedd={saveSignUp} />
      </div>
      <Footer />
      {/* <ToastContainer /> */}
    </div>
  );
}

export default SignUp;
