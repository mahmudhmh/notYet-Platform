import React, { useState } from "react";
import Navbar from "../ComponentX/Navbar";
import "./AccountSettings.css";
import { Main, FormInput } from "./components";
import { CardContainer, Card, FlexContainer } from "./grid";

function AccountSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      // Make a PATCH request to update the password on the backend
      const response = await fetch(
        "http://127.0.0.1:5000/users/updateMyPassword",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            passwordCurrent: currentPassword,
            password: newPassword,
            passwordConfirm: confirmPassword,
          }),
        }
      );

      if (response.ok) {
        // Password update successful
        console.log("Password updated successfully");
        // Reset the input fields
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        // Password update failed
        console.log("Password update failed");
        const errorData = await response.json();
        console.log(errorData); // Handle the error data accordingly
      }
    } catch (error) {
      console.log("An error occurred", error);
    }
  };

  return (
    <div>
      <Navbar />
      <Main>
        <h1
          style={{ color: "white", fontFamily: "sans-serif", margin: "10px" }}
        >
          Change Password
        </h1>
        <FlexContainer>
          <CardContainer>
            <Card>
              <FormInput
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <FormInput
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <FormInput
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Card>
            <button className="save-button-pw-user" onClick={handleSave}>
              Save
            </button>
          </CardContainer>
        </FlexContainer>
      </Main>
    </div>
  );
}

export default AccountSettings;
