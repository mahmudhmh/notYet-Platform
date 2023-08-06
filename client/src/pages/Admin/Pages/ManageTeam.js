import React, { useEffect, useState } from "react";
import NavBar from "../ComponentX/Navbar";
import "../Pages/ManageTeam.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import noData from "../../../assets/folder.png";

const ManageTeam = () => {
  const [teams, setTeams] = useState([]);
  const [editingTeam, setEditingTeam] = useState(null);
  const [editedTeamName, setEditedTeamName] = useState("");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deletingTeamId, setDeletingTeamId] = useState(null);

  const openDeleteConfirmationModal = (teamId) => {
    setDeleteConfirmationOpen(true);
    setDeletingTeamId(teamId);
  };

  const closeDeleteConfirmationModal = () => {
    setDeleteConfirmationOpen(false);
    setDeletingTeamId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/teams", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const teamsData = data.data.teams;
        setTeams(teamsData);
        console.log(teamsData[36].teamMembers);
        console.log(teamsData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenEditModal = (team) => {
    setEditingTeam(team);
    setEditedTeamName(team.teamName);
  };

  const handleCloseEditModal = () => {
    setEditingTeam(null);
    setEditedTeamName("");
  };

  const handleEditTeam = (e) => {
    e.preventDefault();

    // Perform API call to update the team
    const editedTeamData = {
      teamName: editedTeamName,
    };
    function refreshPage() {
      window.location.reload(false);
    }

    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/teams/edit-team-name/${editingTeam._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedTeamData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Team updated successfully:", responseData);
      })
      .catch((error) => {
        console.error("Error updating team:", error);
      });

    handleCloseEditModal();
    refreshPage();
  };

  const handleDeleteTeam = (teamId) => {
    openDeleteConfirmationModal(teamId);
  };

  function refreshPage() {
    window.location.reload(false);
  }
  const token = localStorage.getItem("token");

  const confirmDeleteTeam = () => {
    // Perform API call to delete the team

    fetch(`http://localhost:5000/teams/${deletingTeamId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Team deleted successfully:", responseData);
        closeDeleteConfirmationModal();
        // refreshPage();
      })
      .catch((error) => {
        console.error("Error deleting team:", error);
      });
  };

  return (
    <div>
      <NavBar />
      <h1 className="manage-teams-ad">Manage Teams</h1>
      <div className="card-admin-teams-cont">
        <div className="adminteams-data-container">
          <table className="manage-teams-admin">
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="body-ff">
              {teams.length === 0 ? (
                <tr>
                  <td colSpan="3" className="placeholder-teams">
                    <img
                      className="no-data-imgggg"
                      src={noData}
                      alt="no data"
                    />
                    No data found
                  </td>
                </tr>
              ) : (
                teams.map((team) => (
                  <tr className="ppf" key={team._id}>
                    <td className="team-name-table">{team.teamName}</td>
                    <td className="team-icon">
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() => handleOpenEditModal(team)}
                      />
                    </td>
                    <td className="team-icon">
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        onClick={() => handleDeleteTeam(team._id)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <Modal
            isOpen={deleteConfirmationOpen}
            onRequestClose={closeDeleteConfirmationModal}
            contentLabel="Delete Confirmation"
            className="modal-delete"
            overlayClassName="overlay"
          >
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this team?</p>
            <div className="modal-buttons">
              <button
                className="delete-btn-team-conf"
                onClick={confirmDeleteTeam}
              >
                Delete
              </button>
              <button
                className="delete-btn-team-cncl"
                onClick={closeDeleteConfirmationModal}
              >
                Cancel
              </button>
            </div>
          </Modal>

          {editingTeam && (
            <div className="edit-modal">
              <div className="edit-form-container">
                <h3>Edit Team</h3>
                <form onSubmit={handleEditTeam}>
                  <div>
                    <label>Team Name:</label>
                    <input
                      type="text"
                      value={editedTeamName}
                      onChange={(e) => setEditedTeamName(e.target.value)}
                    />
                  </div>
                  <div className="buttons-container">
                    <button type="submit" className="save-team">
                      Save
                    </button>
                    <button
                      type="button"
                      className="cancel-team"
                      onClick={handleCloseEditModal}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageTeam;
