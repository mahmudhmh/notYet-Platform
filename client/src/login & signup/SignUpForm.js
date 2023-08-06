import React, { useState, useRef } from "react";
import "./SignUpForm.css";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUpForm(props) {
  let cpass = useRef();
  let pass = useRef();
  const [enteredFullname, setEnteredFullname] = useState({
    value: "",
    isValid: true,
  });
  const [enteredUsername, setEnteredUsername] = useState({
    value: "",
    isValid: true,
  });
  const [enteredEmail, setEnteredEmail] = useState({
    value: "",
    isValid: true,
  });
  const [enteredPassword, setEnteredPassword] = useState({
    value: "",
    isValid: true,
  });
  const [enteredConfirmPassword, setConfirmPassword] = useState({
    value: "",
    isValid: true,
  });
  const [userType, setUserType] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function FullnameChangeHandler(event) {
    setEnteredFullname({
      value: event.target.value,
      isValid: event.target.value.trim() !== "",
    });
  }

  function EmailChangeHandler(event) {
    setEnteredEmail({
      value: event.target.value,
      isValid: event.target.value.trim() !== "",
    });
  }

  function UsernameChangeHandler(event) {
    setEnteredUsername({
      value: event.target.value,
      isValid: event.target.value.trim() !== "",
    });
  }

  function PasswordChangeHandler(event) {
    setEnteredPassword({
      value: event.target.value,
      isValid: event.target.value.trim() !== "",
    });
  }

  function PasswordCheckHandler(event) {
    setConfirmPassword({
      value: event.target.value,
      isValid: event.target.value.trim() !== "",
    });
  }



  function SubmitHandler(event) {
    event.preventDefault();

    const password = pass.current.value;
    const confirmPass = cpass.current.value;

    const userData = {
      fullName: enteredFullname.value,
      username: enteredUsername.value,
      email: enteredEmail.value,
      password: enteredPassword.value,
      passwordConfirm: enteredConfirmPassword.value,
    };

    let isFormValid = true;

    // Check if any form field is empty
    if (enteredFullname.value.trim() === "") {
      setEnteredFullname((prevState) => ({ ...prevState, isValid: false }));
      isFormValid = false;
    }
    if (enteredUsername.value.trim() === "") {
      setEnteredUsername((prevState) => ({ ...prevState, isValid: false }));
      isFormValid = false;
    }
    if (enteredEmail.value.trim() === "") {
      setEnteredEmail((prevState) => ({ ...prevState, isValid: false }));
      isFormValid = false;
    }
    if (enteredPassword.value.trim() === "") {
      setEnteredPassword((prevState) => ({ ...prevState, isValid: false }));
      isFormValid = false;
    }
    if (enteredConfirmPassword.value.trim() === "") {
      setConfirmPassword((prevState) => ({ ...prevState, isValid: false }));
      isFormValid = false;
    }

    if (!isFormValid) {
      // Display error message if any field is empty
      toast.error("Please fill in all the required fields");
      return;
    }

    if (password === confirmPass) {
      toast.success("The passwords match");
    } else {
      toast.warning("The passwords do not match");
    }

    console.log(userData); // Print the entered information in the console

    props.onSubmitedd(userData);
    setEnteredFullname({ value: "", isValid: true });
    setEnteredUsername({ value: "", isValid: true });
    setEnteredEmail({ value: "", isValid: true });
    setEnteredPassword({ value: "", isValid: true });
    setConfirmPassword({ value: "", isValid: true });
  }

  function togglePasswordVisibility() {
    setShowPassword((prevState) => !prevState);
  }

  return (
    <form>
      <div className="Signupform">
        <p className="head">Welcome to NOT YET</p>
        <p className="head-2">Welcome to your website, Create an Account</p>
        <div className="signup-form-data-form">
          <label>Full Name</label>
          <input
            type="text"
            min="1"
            max="10"
            value={enteredFullname.value}
            required
            className={`input-full-name-signup ${
              !enteredFullname.isValid ? "input-invalid" : ""
            }`}
            placeholder="Enter your Full Name"
            onChange={FullnameChangeHandler}
          />
          {!enteredFullname.isValid && (
            <span className="error-message">Please enter your full name</span>
          )}
        </div>
        <div className="signup-form-data-form">
          <label>Username</label>
          <input
            type="text"
            min="1"
            max="10"
            value={enteredUsername.value}
            required
            className={`input-user-name-signup ${
              !enteredUsername.isValid ? "input-invalid" : ""
            }`}
            placeholder="Enter your Username"
            onChange={UsernameChangeHandler}
          />
          {!enteredUsername.isValid && (
            <span className="error-message">Please enter your username</span>
          )}
        </div>
        <div className="signup-form-data-form">
          <label>Email</label>
          <input
            type="email"
            value={enteredEmail.value}
            required
            className={`input-email-name-signup ${
              !enteredEmail.isValid ? "input-invalid" : ""
            }`}
            placeholder="Enter your Email"
            onChange={EmailChangeHandler}
          />
          {!enteredEmail.isValid && (
            <span className="error-message">Please enter your email</span>
          )}
        </div>
        <div className="signup-form-data-form">
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={enteredPassword.value}
            required
            className={`input-pwd-name-signup ${
              !enteredPassword.isValid ? "input-invalid" : ""
            }`}
            placeholder="Enter your password"
            onChange={PasswordChangeHandler}
            ref={pass}
          />
          {!enteredPassword.isValid && (
            <span className="error-message">Please enter your password</span>
          )}
        </div>
        <div className="signup-form-data-form">
          <label>Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={enteredConfirmPassword.value}
            required
            className={`input-pwd2-name-signup ${
              !enteredConfirmPassword.isValid ? "input-invalid" : ""
            }`}
            placeholder="Confirm your password"
            onChange={PasswordCheckHandler}
            ref={cpass}
          />
          {!enteredConfirmPassword.isValid && (
            <span className="error-message">Please confirm your password</span>
          )}
        </div>
        <Link to="/">
          <div className="button-singup">
            <button
              className="butn-data-signup"
              type="submit"
              onClick={SubmitHandler}
            >
              SignUp
            </button>
          </div>
        </Link>
        <div className="container-signup">
          <label htmlFor="rememberme" className="test-2f">
            Already have an account?
          </label>{" "}
          <br />
          <Link className="login-btn-route" to="/login">
            Login
          </Link>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </form>
  );
}

export default SignUpForm;
