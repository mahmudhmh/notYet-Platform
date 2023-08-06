import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import ForgetPwd from "./ForgetPwd";

function LoginForm(props) {
  const [enteredEmail, setEnteredEmail] = useState(""); //enteredTitle is the state variable = ' ', setEnteredTitle is the function that updates the state variable '****'
  const [enteredPassword, setEnteredPassword] = useState("");
  const navigate = useNavigate();

  function EmailChangeHandler(event) {
    setEnteredEmail(event.target.value);
    localStorage.setItem("email", enteredEmail);
  }
  function PasswordChangeHandler(event) {
    setEnteredPassword(event.target.value);
  }
  function SubmitHandler(event) {
    event.preventDefault();

    const enteredEmailValue = enteredEmail.trim();
    const enteredPasswordValue = enteredPassword.trim();

    // Check if email and password fields are empty
    if (enteredEmailValue === "" || enteredPasswordValue === "") {
      toast.error("Please fill in all the required fields");
      return;
    }

    const userData = {
      email: enteredEmailValue,
      password: enteredPasswordValue,
    };

    console.log(userData); // Print the entered information in the console

    // Check if password matches the confirm password
    const storedEmail = localStorage.getItem("email");
    if (enteredEmailValue === storedEmail) {
      toast.success("Email matches stored email");
    } else {
      toast.warning("Email does not match stored email");
    }

    props.onSubmitedd(userData);
    setEnteredEmail("");
    setEnteredPassword("");
    navigate("/assessment");
  }
  return (
    <form onSubmit={SubmitHandler}>
      <div className="Loginform">
        <p className="head">Welcome Back</p>
        <p className="head-2">Welcome Back ! Please Enter your Details</p>
        <div className="login-form-data-form">
          <label>Email</label>
          <input
            type="email"
            min="1"
            max="10"
            value={enteredEmail}
            required
            placeholder="Enter your Email"
            onChange={EmailChangeHandler}
          />
        </div>{" "}
        <div className="login-form-data-form-pwd">
          <label>Password</label>
          <input
            type="password"
            value={enteredPassword}
            required
            placeholder="**********************"
            onChange={PasswordChangeHandler}
          />
        </div>
        <div className="container2">
          <input type="checkbox" id="rememberme" />
          <label for="rememberme" className="test">
            Remember me!
          </label>{" "}
          <br />
          <Link to="/login/forgetPwd">
            <a href="#">Forget Password?</a>
          </Link>
        </div>
        <div className="buttonsign-in">
          {/* <Link to="/assessment"> */}
          <button className="btn-sign-in" type="submit" onClick={SubmitHandler}>
            Sign In
          </button>
          {/* </Link> */}
        </div>
        <div className="sign-in-with-google">
          <h4 type="">Sign In with Google</h4>
        </div>
      </div>
      <div className="container2">
        <label for="rememberme" className="test2">
          Dont have an account?
        </label>{" "}
        <br />
        <Link to="/signup">
          <a>Signup</a>
        </Link>
      </div>
    </form>
  );
}
export default LoginForm;
