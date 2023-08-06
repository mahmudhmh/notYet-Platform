import React, { useEffect, useState } from "react";
import "./AcceptReject.css";

function AcceptTeams() {
  const urlParams = new URLSearchParams(window.location.search);
  const teamId = urlParams.get("teamId");
  const userName = urlParams.get("userName");
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(15);

  console.log(teamId, userName);

  useEffect(() => {
    const acceptTeamRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/teams/accept-team-request/${teamId}/${userName}`,
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
          console.log("Team request accepted successfully");
          console.log(data.message); // Handle the returned team data as needed
          setSuccess(true);
          setTimeout(() => {
            window.location.href = "http://localhost:3000/login";
          }, 15000);
        } else {
          const errorData = await response.json();
          console.log("Failed to accept team request");
          console.log(errorData.message); // Handle the error message as needed
        }
      } catch (error) {
        console.error("Error accepting team request:", error);
      }
    };

    acceptTeamRequest();
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
      <div className="Accept-team-container">
        <h1>Accept Team Invitation</h1>
        {success && (
          <div className="Accept-Success-msg">
            <h1>
              {" "}
              Accept successful! Redirecting to login page in {countdown}{" "}
              seconds...
            </h1>
          </div>
        )}
      </div>
    </>
  );
}

export default AcceptTeams;
