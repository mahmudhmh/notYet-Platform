import React, { useEffect, useState } from "react";
import "./AdminContest.css";
import Modal from "react-modal";
import Navbar from "../ComponentX/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

function AdminContest() {
  const token = localStorage.getItem("token");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingContestId, setDeletingContestId] = useState("");
  const [contests, setContests] = useState([]);
  const [creatingContest, setCreatingContest] = useState(false);
  const [editingContest, setEditingContest] = useState(false);
  const [editingContestId, setEditingContestId] = useState("");
  const [contestData, setContestData] = useState({
    name: "",
    startTime: "",
    endTime: "",
    problems: [],
  });
  const [problems, setProblems] = useState([]);
  const [selectedProblems, setSelectedProblems] = useState([]);

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    fetchContests();
    fetchProblems();
  }, []);

  const fetchContests = async () => {
    try {
      const response = await fetch("http://localhost:5000/contests");
      const data = await response.json();
      console.log("Fetched contests:", data.data.contests);
      setContests(data.data.contests);
    } catch (error) {
      console.log("Error fetching contests:", error);
    }
  };

  const fetchProblems = async () => {
    try {
      const response = await fetch("http://localhost:5000/problems");
      const data = await response.json();
      console.log("Fetched problems:", data.data);
      setProblems(data.data);
    } catch (error) {
      console.log("Error fetching problems:", error);
    }
  };

  const handleInputChange = (e) => {
    setContestData({ ...contestData, [e.target.name]: e.target.value });
  };

  const handleProblemSelection = (e) => {
    const problemId = e.target.value;
    if (e.target.checked) {
      setSelectedProblems([...selectedProblems, problemId]);
    } else {
      const updatedSelectedProblems = selectedProblems.filter(
        (id) => id !== problemId
      );
      setSelectedProblems(updatedSelectedProblems);
    }
  };

  const handleCreateContest = async () => {
    try {
      const response = await fetch("http://localhost:5000/contests", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...contestData,
          problems: selectedProblems,
        }),
      });

      if (response.ok) {
        // Contest created successfully
        setCreatingContest(false);
        fetchContests(); // Refresh the contests list
        refreshPage();
      } else {
        // Handle error case
        const errorText = await response.text();
        console.log("Error creating contest:", errorText);
      }
    } catch (error) {
      console.log("Error creating contest:", error);
    }
  };

  const handleDeleteContest = (contestId) => {
    setDeletingContestId(contestId);
    setShowDeleteModal(true);
  };

  const handleEditContest = async (contestId) => {
    setEditingContestId(contestId);

    try {
      const response = await fetch(
        `http://localhost:5000/contests/${contestId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const contest = data.data.contest;

        // Populate the contest data for editing
        setContestData({
          name: contest.name,
          startTime: contest.startTime,
          endTime: contest.endTime,
          problems: contest.problems,
        });

        // Set the selected problems based on the contest's problem IDs
        setSelectedProblems(contest.problems);

        setEditingContest(true);
      } else {
        // Handle error case
        const errorText = await response.text();
        console.log("Error fetching contest:", errorText);
      }
    } catch (error) {
      console.log("Error fetching contest:", error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/contests/${editingContestId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...contestData,
            problems: selectedProblems,
          }),
        }
      );

      if (response.ok) {
        // Contest edited successfully
        setEditingContest(false);
        fetchContests(); // Refresh the contests list
        refreshPage();
      } else {
        // Handle error case
        const errorText = await response.text();
        console.log("Error editing contest:", errorText);
      }
    } catch (error) {
      console.log("Error editing contest:", error);
    }
  };

  const handleDeleteSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/contests/${deletingContestId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Contest deleted successfully
        fetchContests(); // Refresh the contests list
        setShowDeleteModal(false);
      } else {
        // Handle error case
        const errorText = await response.text();
        console.log("Error deleting contest:", errorText);
      }
    } catch (error) {
      console.log("Error deleting contest:", error);
    }
  };

  const handleCancel = () => {
    setCreatingContest(false);
    setEditingContest(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="contest-container">
      <Navbar />
      <h1 className="contest-admin">Create Contest</h1>
      <div className="create-contest-button">
        <button onClick={() => setCreatingContest(true)}>Create Contest</button>
      </div>
      <div className="Contest-data-containerr">
        <table className="table-contest">
          <thead>
            <tr>
              <th>Contest Name</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Edit Contest</th>
              <th>Delete Contest</th>
            </tr>
          </thead>
          <tbody className="body-contest-data">
            {contests.map((contest) => (
              <tr key={contest._id}>
                <td className="Contest-name">{contest.name}</td>
                <td className="Contest-St">{contest.startTime}</td>
                <td className="Contest-Et">{contest.endTime}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => handleEditContest(contest._id)}
                  />
                </td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    onClick={() => handleDeleteContest(contest._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {creatingContest || editingContest ? (
          <div className="modal-overlay">
            <div className="create-contest-form">
              <h2>{creatingContest ? "Create Contest" : "Edit Contest"}</h2>
              <form
                onSubmit={
                  creatingContest ? handleCreateContest : handleEditSubmit
                }
              >
                <label htmlFor="name">Contest Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contestData.name}
                  onChange={handleInputChange}
                />

                <label htmlFor="startTime">Start Time:</label>
                <input
                  type="datetime-local"
                  id="startTime"
                  name="startTime"
                  value={contestData.startTime}
                  onChange={handleInputChange}
                />

                <label htmlFor="endTime">End Time:</label>
                <input
                  type="datetime-local"
                  id="endTime"
                  name="endTime"
                  value={contestData.endTime}
                  onChange={handleInputChange}
                />

                <div className="problem-checkboxes">
                  <label htmlFor="problems">Select Problems:</label>
                  {problems.map((problem) => (
                    <div key={problem._id}>
                      <input
                        type="checkbox"
                        id={problem._id}
                        name={problem._id}
                        value={problem._id}
                        checked={selectedProblems.includes(problem._id)}
                        onChange={handleProblemSelection}
                      />
                      <label htmlFor={problem._id}>{problem.title}</label>
                    </div>
                  ))}
                </div>

                <div className="button-group">
                  <button type="submit">
                    {creatingContest ? "Create" : "Update"}
                  </button>
                  <button type="button" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}

        <Modal
          isOpen={showDeleteModal}
          onRequestClose={handleCloseDeleteModal}
          className="delete-contest-modal"
          overlayClassName="delete-modal-overlay"
        >
          <h2>Delete Contest</h2>
          <p>Are you sure you want to delete this contest?</p>
          <div className="button-group-delete">
            <button className="btn-delete-contest" onClick={handleDeleteSubmit}>
              Delete
            </button>
            <button
              className="btn-cancel-contest"
              onClick={handleCloseDeleteModal}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default AdminContest;
