import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import "./EnrolledTeamsList.css";
import nodataImage from "../../../assets/folder.png";

Modal.setAppElement("#root");

function EnrolledTeamsList(props) {
  const [teams, setTeams] = useState([]);
  const [pendingTeams, setPendingTeams] = useState([]);
  const token = localStorage.getItem("token");

  const [editingTeam, setEditingTeam] = useState(null);
  const [editedTeamName, setEditedTeamName] = useState("");
  const [editedTeamMembers, setEditedTeamMembers] = useState("");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [pendingMembersOpen, setPendingMembersOpen] = useState(false);
  const [acceptedMember, setAcceptedMember] = useState(null);
  const [teamsData, setTeamsData] = useState([]);
  const [newMemberUsername, setNewMemberUsername] = useState("");
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/users", {
          headers: {
            method: "GET",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const teamsData = data.data.user.joinedTeams;
        setTeams(teamsData);
        setPendingTeams(data.data.user.pendingTeams);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  // Get all enrolled teams and pending teams
  useEffect(() => {
    teams.forEach((team) => {
      fetch(`http://localhost:5000/teams/${team}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const teamData = data.data.team;
          const updatedTeamData = { ...teamData, status: "Enrolled" };
          setTeamsData((prevTeamsData) => [...prevTeamsData, updatedTeamData]);
          console.log("Enrolled Teams: ", [...teamsData, updatedTeamData]);
        })
        .catch((error) => {
          console.error("Error fetching team data:", error);
        });
    });
  }, [teams]);

  useEffect(() => {
    pendingTeams.forEach((team) => {
      fetch(`http://localhost:5000/teams/${team}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const teamData = data.data.team;
          const updatedTeamData = { ...teamData, status: "Pending" };
          setTeamsData((prevTeamsData) => [...prevTeamsData, updatedTeamData]);
          console.log("Pending Teams: ", [...teamsData, updatedTeamData]);
        })
        .catch((error) => {
          console.error("Error fetching pending team data:", error);
        });
    });
  }, [pendingTeams]);

  const handleOpenEditModal = async (team) => {
    try {
      const response = await fetch(`http://localhost:5000/teams/${team._id}`, {
        headers: {
          method: "GET",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const teamData = data.data.team;
      setEditingTeam(teamData);
      setEditedTeamName(teamData.teamName);
      setEditedTeamMembers(teamData.teamMembers.join(", "));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCloseEditModal = () => {
    setEditingTeam(null);
    setEditedTeamName("");
    setEditedTeamMembers("");
  };

  const handleEditTeam = (e) => {
    e.preventDefault();

    // Perform API call to update the team
    const editedTeamData = {
      teamName: editedTeamName,
      teamMembers: editedTeamMembers.split(",").map((member) => member.trim()),
    };

    //const token = localStorage.getItem("token");

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
        refreshPage();
        console.log("Team updated successfully:", responseData);
        // Optionally, you can perform additional actions here
        // Refresh the teams data or perform any other necessary updates
      })
      .catch((error) => {
        console.error("Error updating team:", error);
      });

    handleCloseEditModal();
  };

  const handleAddTeamMember = async (e) => {
    e.preventDefault();

    // Perform API call to add the new team member
    const newMemberData = {
      teamName: selectedTeam.teamName,
      username: newMemberUsername,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/teams/add-member/${selectedTeam._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newMemberData),
        }
      );
      const data = await response.json();
      console.log("New member added successfully:", data);
      // Optionally, you can perform additional actions here
      // Refresh the teams data or perform any other necessary updates
      setNewMemberUsername(""); // Reset the new member username input field
      setAddMemberModalOpen(false); // Close the add member modal
    } catch (error) {
      console.error("Error adding new member:", error);
    }
  };

  const handleOpenDeleteConfirmationModal = (team) => {
    setTeamToDelete(team);
    setDeleteConfirmationOpen(true);
  };

  const handleCloseDeleteConfirmationModal = () => {
    setTeamToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteTeam = () => {
    const teamId = teamToDelete._id;

    fetch(`http://localhost:5000/teams/${teamId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        refreshPage();
        console.log("Team deleted successfully:", responseData);
        // Optionally, you can perform additional actions here
        // Refresh the teams data or perform any other necessary updates
      })
      .catch((error) => {
        console.error("Error deleting team:", error);
      });

    handleCloseDeleteConfirmationModal();
  };

  const handleOpenPendingMembersModal = (team) => {
    setSelectedTeam(team);
    setPendingMembersOpen(true);
  };

  const handleClosePendingMembersModal = () => {
    setSelectedTeam(null);
    setPendingMembersOpen(false);
  };

  const handleAcceptMember = async (team, member) => {
    try {
      const response = await fetch(
        `http://localhost:5000/teams/accept-request/${team._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ pendingMember: member.user.username }), // Include the username in the body
        }
      );
      const data = await response.json();
      console.log("Accepted member:", data);
      setAcceptedMember(member);
    } catch (error) {
      console.error("Error accepting member:", error);
    }
  };

  const handleRejectMember = async (team, member) => {
    try {
      const response = await fetch(
        `http://localhost:5000/teams/reject-request/${team._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ pendingMember: member.user.username }), // Include the username in the body
        }
      );
      const data = await response.json();
      console.log("Rejected member:", data);
    } catch (error) {
      console.error("Error rejecting member:", error);
    }
  };
  const noDataFound = teams.length === 0 && pendingTeams.length === 0;

  // Render the "No Data" image if no data is found
  if (noDataFound) {
    return (
      <div className="no-data-container">
        <img src={nodataImage} alt="No Data Found" />
        <p>No data found.</p>
      </div>
    );
  }
  return (
    <div className="user-teams-container">
      <div className="teams-container">
        <table className="teams-table-user">
          <thead>
            <tr className="user-team-tr">
              <th className="user-team">Team Name</th>
              <th className="user-team">Status</th>
              <th className="user-team">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teamsData.map((team) => (
              <tr key={team._id}>
                <td>{team.teamName}</td>
                <td>{team.status}</td>
                <td>
                  <button
                    onClick={() => handleOpenEditModal(team)}
                    className="edit-button"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="add-button"
                    onClick={() => setAddMemberModalOpen(true)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <button
                    onClick={() => handleOpenDeleteConfirmationModal(team)}
                    className="delete-button"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  <button
                    onClick={() => handleOpenPendingMembersModal(team)}
                    className="pending-members"
                  >
                    Pending Members
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal
          isOpen={!!editingTeam}
          onRequestClose={handleCloseEditModal}
          contentLabel="Edit Team Modal"
          className="modal-edit-team-form-user"
        >
          <h2>Edit Team Name</h2>
          <form onSubmit={handleEditTeam}>
            <label>
              <input
                type="text"
                value={editedTeamName}
                onChange={(e) => setEditedTeamName(e.target.value)}
              />
            </label>
            {/* <label>
            Team Members:
            <input
              type="text"
              value={editedTeamMembers}
              onChange={(e) => setEditedTeamMembers(e.target.value)}
            />
          </label> */}
            <button type="submit" className="edit-team-name-btn">
              Save
            </button>
            <button
              type="button"
              onClick={handleCloseEditModal}
              className="cancel-team-name-btn"
            >
              Cancel
            </button>
          </form>
        </Modal>

        <Modal
          isOpen={addMemberModalOpen}
          onRequestClose={() => setAddMemberModalOpen(false)}
          contentLabel="Add Member Modal"
          className="modal-add-member-user"
        >
          <h2>Add Team Member</h2>
          <form onSubmit={handleAddTeamMember}>
            <label>
              Member Username:
              <input
                type="text"
                value={newMemberUsername}
                onChange={(e) => setNewMemberUsername(e.target.value)}
              />
            </label>
            <button type="submit" className="add-member-add-btn">
              Add
            </button>
            <button
              type="button"
              className="cancel-member-add-btn"
              onClick={() => setAddMemberModalOpen(false)}
            >
              Cancel
            </button>
          </form>
        </Modal>

        <Modal
          isOpen={deleteConfirmationOpen}
          onRequestClose={handleCloseDeleteConfirmationModal}
          contentLabel="Delete Confirmation Modal"
          className="modal-delete-team-user"
        >
          <h2>Delete Team</h2>
          <p>Are you sure you want to delete the team?</p>
          <div className="confirmation-buttons">
            <button onClick={handleDeleteTeam} className="delete-team-user-btn">
              Delete
            </button>
            <button
              onClick={handleCloseDeleteConfirmationModal}
              className="cancel-delete-team-user-btn"
            >
              Cancel
            </button>
          </div>
        </Modal>

        <Modal
          isOpen={pendingMembersOpen}
          onRequestClose={handleClosePendingMembersModal}
          contentLabel="Pending Members Modal"
          className="modal-pending-members-team"
        >
          <h2>Pending Members</h2>
          {selectedTeam && (
            <div>
              <h3>Team Name: {selectedTeam.teamName}</h3>
              {/* <ul>
                {selectedTeam.pendingMembers.map((member) => (
                  <li key={member._id}>
                    {member.user}
                    <button
                      onClick={() => handleAcceptMember(selectedTeam, member)}
                      className="modal-pending-members-team-accept"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRejectMember(selectedTeam, member)}
                      className="modal-pending-members-team-reject"
                    >
                      Reject
                    </button>
                  </li>
                ))}
              </ul> */}
            </div>
          )}
          <button
            onClick={handleClosePendingMembersModal}
            className="modal-pending-members-team-close"
          >
            Close
          </button>
        </Modal>
      </div>
    </div>
  );
}

export default EnrolledTeamsList;
