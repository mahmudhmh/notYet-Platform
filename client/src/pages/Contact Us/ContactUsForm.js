import React from "react";
import "./ContactUsForm.css";
import { useState } from "react";

function ContactUsForm(props) {
  const [enteredName, setEnteredName] = useState(""); //enteredTitle is the state variable = ' ', setEnteredTitle is the function that updates the state variable '****'
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");

  // This is a function component
  function EmailChangeHandler(event) {
    setEnteredEmail(event.target.value); // event.target.value is the value of the input field == setEnteredTitle khod el input field w 7otot fyl eneterfield
  }
  function NameChangeHandler(event) {
    setEnteredName(event.target.value);
  }
  function MessageChangeHandler(event) {
    setEnteredMessage(event.target.value);
  }

  function SubmitHandler(event) {
    event.preventDefault(); // prevent the page from reloading

    const UserData = {
      name: enteredName,
      email: enteredEmail,
      message: enteredMessage,
    };

    props.onSubmitedd(UserData);

    setEnteredName("");
    setEnteredEmail("");
    setEnteredMessage("");
  }
  return (
    <form onSubmit={SubmitHandler}>
      <div className="ContactUs-form-container">
        <p className="head">Contact US</p>
        <div className="Contact-form">
          <label>Full Name</label>
          <input
            type="text"
            min="1"
            max="10"
            value={enteredName}
            required
            className="form-contact-input"
            placeholder="Enter your Full Name"
            onChange={NameChangeHandler}
          />
        </div>
        <div className="Contact-form">
          <label>Email</label>
          <input
            type="email"
            value={enteredEmail}
            required
            className="form-contact-input3"
            placeholder="Enter your Email"
            onChange={EmailChangeHandler}
          />
        </div>
        <div className="Contact-form">
          <label>Message</label>
          <textarea
            rows="8"
            cols="50"
            type="Message"
            value={enteredMessage}
            required
            className="form-contact-input2"
            placeholder="Entered your Message"
            onChange={MessageChangeHandler}
          />
        </div>
        <div className="button-submit-contactus">
          <button className="btn-submit-contact" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
export default ContactUsForm;
