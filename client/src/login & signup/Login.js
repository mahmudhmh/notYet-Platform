import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import LoginForm from "./LoginForm";
import LogoWhiteText from "../assets/LogoWhiteText.png";
import code from "../assets/code.png";
import Footer from "../UI/Footer";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  // const history = useHistory();

  function saveLogin(enteredInformation) {
    // Perform login request here
    fetch("http://127.0.0.1:5000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://127.0.0.1:5000/*",
      },
      body: JSON.stringify(enteredInformation),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle the response from the backend
        if (data.status === "success") {
          // Login was successful
          toast.success("Login successful!"); // Display success toast
          setToken(data.token);
          console.log("id", data.data.user._id);
          localStorage.setItem("token", data.token); // Store the token in localStorage
          localStorage.setItem("id", data.data.user._id); // Store user's _id in localStorage
          setUser(data.user);

          if (data.data.user.role === "admin") {
            // Redirect to "/admin" for admin user
            window.location.href = "http://localhost:3000/";
          } else if (data.data.user.quizEvaluation === 0) {
            // Redirect to "/" for non-admin users
            window.location.href = "http://localhost:3000/assessment";
          } else {
            window.location.href = "http://localhost:3000/";
          }
        } else {
          // Login failed
          window.location.href = "http://localhost:3000/login";
          //toast.error("Please  SignUp first ");
          alert("SIGN UP FIRST");
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
      <img className="logo-login" src={LogoWhiteText} alt="Logo" />
      <div className="login">
        <img src={code} alt="Code" />
        <LoginForm onSubmitedd={saveLogin} />
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
}

export default Login;
