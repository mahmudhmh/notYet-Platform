import React, { useState, useEffect } from "react";
import Navbar from "../ComponentX/Navbar";
import "./EnrolledTeams.css";
import Modal from "react-modal";
import EnrolledTeamsList from "./EnrolledTeamsList";
import Card from "./Card";
Modal.setAppElement("#root");

function EnrolledTeams() {
  const [joinTeamMsgIsOpen, setJoinTeamMsgIsOpen] = useState(false);
  const [createTeamMsgIsOpen, setCreateTeamMsgIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [teamName, setTeamName] = useState("");
  const [usernames, setUsernames] = useState([""]);

  const token = localStorage.getItem("token");

  const handleAddUsername = () => {
    if (usernames.length < 2) {
      setUsernames([...usernames, username]);
      setUsername("");
    }
  };

  const handleUsernameChange = (index, value) => {
    const updatedUsernames = [...usernames];
    updatedUsernames[index] = value;
    setUsernames(updatedUsernames);
  };

  const handleDeleteUsername = (index) => {
    const updatedUsernames = [...usernames];
    updatedUsernames.splice(index, 1);
    setUsernames(updatedUsernames);
  };

  function handleTeamNameChange(event) {
    const value = event.target.value;
    setTeamName(value);
  }

  useEffect(() => {
    // console.log("Request to Join Team:", teamName);
  }, [teamName]);

  function refreshPage() {
    window.location.reload(false);
  }

  function handleJoinTeamFormSubmit(event) {
    event.preventDefault();
    // send data to backend
    fetch("http://localhost:5000/teams/join-team", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teamName,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    setJoinTeamMsgIsOpen(false);
    refreshPage();
  }

  function handleCreateTeamFormSubmit(event) {
    event.preventDefault();
    // send data to backend
    fetch(`http://localhost:5000/teams`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teamName,
        teamMembers: usernames,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(usernames));
    setCreateTeamMsgIsOpen(false);
    refreshPage();
  }

  function handleJoinTeamClick() {
    setJoinTeamMsgIsOpen(true);
  }

  function handleCreateTeamClick() {
    setCreateTeamMsgIsOpen(true);
  }

  function handleCloseJoinTeamMsg() {
    setJoinTeamMsgIsOpen(false);
  }

  function handleCloseCreateTeamMsg() {
    setCreateTeamMsgIsOpen(false);
  }

  return (
    <div>
      <Navbar />
      <h1 className="title">Teams List</h1>
      <button className="button1" onClick={handleJoinTeamClick}>
        Join Team
      </button>
      <Modal
        isOpen={joinTeamMsgIsOpen}
        onRequestClose={handleCloseJoinTeamMsg}
        className="modal-join-team-user"
        overlayClassName="modal-overlay"
      >
        <h2 className="team-msg-header">Join a Team</h2>
        <button className="close-modal-btn" onClick={handleCloseJoinTeamMsg}>
          X
        </button>
        <form className="formContainer" onSubmit={handleJoinTeamFormSubmit}>
          <label className="team-input-label">
            <span className="team-input-label-text">Team Name:</span>
            <input
              type="text"
              value={teamName}
              onChange={handleTeamNameChange}
              className="team-input"
              placeholder="Enter the team name"
            />
          </label>
          <div className="buttonContainer">
            <button type="submit" className="create-team-btn-user">
              Join Team
            </button>
            <button
              type="button"
              className="cancel-team-btn-user"
              onClick={handleCloseJoinTeamMsg}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <button className="button2" onClick={handleCreateTeamClick}>
        Create Team
      </button>

      <Modal
        isOpen={createTeamMsgIsOpen}
        onRequestClose={handleCloseCreateTeamMsg}
        className="modal-create-team-user"
        overlayClassName="modal-overlay"
      >
        <h2 className="team-msg-header">Create a Team</h2>
        <button
          className="close-modal-btn-create"
          onClick={handleCloseCreateTeamMsg}
        >
          {" "}
          X
        </button>
        <form className="formContainer" onSubmit={handleCreateTeamFormSubmit}>
          <label className="team-input-label">
            <span className="team-input-label-text">Team Name:</span>
            <input
              type="text"
              value={teamName}
              onChange={handleTeamNameChange}
              className="team-input"
              placeholder="Enter the team name"
            />
          </label>
          {usernames.map((username, index) => (
            <div key={index} className="username-container">
              <label className="team-input-label">
                <span className="team-input-label-text">Username:</span>
                <input
                  type="text"
                  value={username}
                  onChange={(event) =>
                    handleUsernameChange(index, event.target.value)
                  }
                  className="team-input"
                  placeholder="Enter a username"
                />
              </label>
              <button
                type="button"
                onClick={() => handleDeleteUsername(index)}
                className="delete-username-button"
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            className="add-username-button"
            onClick={handleAddUsername}
          >
            Add Username
          </button>

          <div className="buttonContainer">
            <button type="submit" className="create-team-btn">
              Create Team
            </button>
            <button
              type="button"
              className="cancel-team-btn"
              onClick={handleCloseCreateTeamMsg}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <Card className="problems-table">
        <EnrolledTeamsList />
      </Card>
    </div>
  );
}

export default EnrolledTeams;
