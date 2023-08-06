import React, { useEffect, useState } from "react";
import "./VerifyEmail.css";

const VerifyEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const urlParams = new URLSearchParams(window.location.search);
  const emailVerificationToken = urlParams.get("emailVerificationToken");

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/users/verify-email/${emailVerificationToken}`
        );
        const data = await response.json();
        console.log(data.status);
        console.log(data.message);
        setVerificationStatus(data.message, data.status);
      } catch (error) {
        console.error("Error fetching verification status:", error);
      }
    };

    fetchVerificationStatus();
  }, [emailVerificationToken]);

  const handleVerification = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/users/verify-email/${emailVerificationToken}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: "verified" }), // Set the desired verification status
        }
      );
      const data = await response.json();

      // Update the verification status after patching
      console.log(data.status);
      console.log(data.message);
      setVerificationStatus(data.message, data.status);
    } catch (error) {
      console.error("Error updating verification status:", error);
    }
  };

  return (
    <div className="verification-container">
      {verificationStatus === "verified" ? (
        <p>Your account has been successfully verified!</p>
      ) : verificationStatus === "pending" ? (
        <div className="pending-verification">
          <p>Your account verification is still pending.</p>
          <button className="verify-button" onClick={handleVerification}>
            Verify Account
          </button>
        </div>
      ) : (
        <p>Failed to verify your account. Please try again later.</p>
      )}
    </div>
  );
};

export default VerifyEmail;
