import React, { useState } from "react";
import "./ResetPasswordForm.css";

function ResetPasswordForm(props) {
  const [password, setNewPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");
  const urlParams = new URLSearchParams(window.location.search);
  const resetToken = urlParams.get("token");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verify that newPassword and confirmPassword match
    if (password !== passwordConfirm) {
      alert("New password and confirm password do not match");
      return;
    }

    // Create the request body
    const requestBody = {
      password: password,
      passwordConfirm: passwordConfirm,
      resetToken: resetToken,
    };
    console.log(resetToken);
    // Send the PATCH request
    fetch(`http://localhost:5000/users/resetPassword/${resetToken}`, {
      method: "PATCH",
      headers: {
        "Access-Control-Allow-Origin": "http://127.0.0.1:5000/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          // Password reset successful
          alert("Password reset successful!");
          // Perform any additional actions (e.g., redirect to login page)
          // ...
        } else {
          // Password reset failed
          alert("Password reset failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="reset">
        <p className="head">Reset Password</p>
        <p className="head-2">Welcome! Reset Your Password Now!</p>
        <div className="new-pass-reset">
          <input
            type="password"
            required
            placeholder="New Password"
            className="new-pass-reset1"
            value={password}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Confirm New Password"
            className="new-pass-reset2"
            value={passwordConfirm}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="button-reset2">
          <button className="reset-btn-action" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default ResetPasswordForm;
