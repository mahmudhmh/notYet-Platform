import React, { useEffect, useState } from "react";
import "./AcceptReject.css";

function RejectTeams() {
  const urlParams = new URLSearchParams(window.location.search);
  const teamId = urlParams.get("teamId");
  const userName = urlParams.get("userName");
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(15);

  console.log(teamId, userName);

  useEffect(() => {
    const rejectTeamRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/teams/reject-team-request/${teamId}/${userName}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              // Add the following line if your server requires CORS
              "Access-Control-Allow-Origin": "http://localhost:3000/*", // Replace with your client-side URL
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Team request rejected successfully");
          console.log(data.message); // Handle the returned team data as needed
          setSuccess(true);
          setTimeout(() => {
            window.location.href = "http://localhost:3000/login";
          }, 15000);
        } else {
          const errorData = await response.json();
          console.log("Failed to reject team request");
          console.log(errorData.message); // Handle the error message as needed
        }
      } catch (error) {
        console.error("Error rejecting team request:", error);
      }
    };

    rejectTeamRequest();
  }, [teamId, userName]);

  useEffect(() => {
    if (success && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [success, countdown]);

  return (
    <>
      <div className="Reject-team-container">
        <h1>Reject Team Invitaion</h1>
        {success && (
          <div className="Reject-Success-msg">
            <h1>
              {" "}
              Reject successful! Redirecting to login page in {countdown}{" "}
              seconds...
            </h1>
          </div>
        )}
      </div>
    </>
  );
}

export default RejectTeams;
