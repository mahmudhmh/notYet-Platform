import React, { useState, useEffect } from "react";
import "./AdminProblemList.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

function AdminProblemList(props) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState("");
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedRank, setEditedRank] = useState(props.rank);
  const [editedDifficulty, setEditedDifficulty] = useState(props.difficulty);
  const [editedDescription, setEditedDescription] = useState(props.description);
  const [editedCategory, setEditedCategory] = useState(props.category);
  const [editedExampleInput, setEditedExampleInput] = useState(
    props.exampleInput
  );
  const [selectedProblemDetails, setSelectedProblemDetails] = useState(null);

  const [editedExampleOutput, setEditedExampleOutput] = useState(
    props.exampleOutput
  );
  const [editedhiddenInputs, setEditedExampleHiddenInput] = useState(
    props.exampleHiddenInput
  );
  const [editedhiddenOutputs, setEditedExampleHiddenOutput] = useState(
    props.exampleHiddenInput
  );
  const openProblemDetailsModal = (problem) => {
    setSelectedProblemDetails(problem);
  };

  const openDeleteConfirmationModal = (problemId) => {
    setSelectedProblemId(problemId);
    setDeleteConfirmationOpen(true);
  };
  function refreshPage() {
    window.location.reload(false);
  }

  // Function to close the delete confirmation modal
  const closeDeleteConfirmationModal = () => {
    setSelectedProblemId("");
    setDeleteConfirmationOpen(false);
  };
  const handleDeleteProblem = () => {
    // Perform delete operation here...
    console.log("Deleting problem with ID:", selectedProblemId);
    const token = localStorage.getItem("token");

    fetch(`http://127.0.0.1:5000/problems/${selectedProblemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Problem deleted successfully:", responseData);
        toast.success("Problem deleted successfully");
        setData((prevData) =>
          prevData.filter((problem) => problem._id !== selectedProblemId)
        );
      })
      .catch((error) => {
        console.error("Error deleting problem:", error);
        toast.error("Error deleting problem");
      });

    // Close the delete confirmation modal
    closeDeleteConfirmationModal();
    //refreshPage();
  };
  const openEditModal = (problem) => {
    setSelectedProblemId(problem._id);
    setEditedTitle(problem.title);
    setEditedRank(problem.rank);
    setEditedDifficulty(problem.difficulty);
    setEditedDescription(problem.description);
    setEditedCategory(problem.category);
    setEditedExampleInput(problem.inputs);
    setEditedExampleOutput(problem.outputs);
    setEditedExampleHiddenInput(problem.hiddenInputs);
    setEditedExampleHiddenOutput(problem.hiddenOutputs);

    // Set other fields you want to edit

    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedProblemId("");
    setEditedTitle("");
    setEditedRank("");
    setEditedDifficulty("");
    setEditedDescription("");
    setEditedCategory("");
    setEditedExampleInput("");
    setEditedExampleOutput("");
    setEditedExampleHiddenInput("");
    setEditedExampleHiddenOutput("");

    // Reset other edited fields

    setEditModalOpen(false);
  };

  const handleEditProblem = (e) => {
    e.preventDefault();

    const editedProblemData = {
      title: editedTitle,
      rank: editedRank,
      difficulty: editedDifficulty,
      description: editedDescription,
      category: editedCategory,
      inputs: editedExampleInput,
      outputs: editedExampleOutput,
      hiddenInputs: editedhiddenInputs,
      hiddenOutputs: editedhiddenOutputs,
    };

    // Perform API call to update the problem
    const token = localStorage.getItem("token");

    fetch(`http://127.0.0.1:5000/problems/${selectedProblemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedProblemData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        //alert("Problem updated successfully:", responseData);
        toast.success("Problem updated successfully!");
        // Optionally, you can perform additional actions here
        setData((prevData) =>
          prevData.map((problem) =>
            problem._id === selectedProblemId
              ? { ...problem, ...editedProblemData }
              : problem
          )
        );
      })

      .catch((error) => {
        console.error("Error updating problem:", error);
        toast.error("Error updating problem!");
      });

    closeEditModal();
    //refreshPage();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://127.0.0.1:5000/problems`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setTotalPages(Math.ceil(responseData.results / 10));
        console.log(responseData.results);
      });

    fetch(`http://127.0.0.1:5000/problems?page=${currentPage}&limit=5`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData.data);
        console.log("problems", responseData); // Calculate totalPages based on the response data
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [currentPage]);

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const renderPagination = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={i === currentPage ? "active" : ""}
          onClick={() => handlePageChange(i)}
        >
          <a>{i}</a>
        </li>
      );
    }

    return <ul className="pagination-problems">{pages}</ul>;
  };

  return (
    <div className="problems-data-container">
      <table className="problems-table-admin">
        <thead className="prob-heading">
          <tr className="prob-row">
            <th className="prob-hd">Title</th>
            <th className="prob-hd">Rank</th>
            <th className="prob-hd">Status</th>
            <th className="prob-hd">Difficulty</th>
            <th className="prob-hd">Edit</th>
            <th className="prob-hd">Delete</th>
          </tr>
        </thead>
        <tbody className="prob-body">
          {data.map((problem) => {
            return (
              <tr className="body-row" key={problem._id}>
                <td className="body-data">
                  <Link
                    className="title-problem-view"
                    //to="/problems/compiler"
                    onClick={() => openProblemDetailsModal(problem)}
                  >
                    {problem.title}
                  </Link>
                </td>

                <td className="body-data">{problem.rank}</td>
                <td className="body-data">{problem.category}</td>
                <td className="body-data">{problem.difficulty}</td>

                <td className="body-data">
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => openEditModal(problem)}
                  />
                </td>
                <td className="body-data">
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    onClick={() => openDeleteConfirmationModal(problem._id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        isOpen={deleteConfirmationOpen}
        onRequestClose={closeDeleteConfirmationModal}
        contentLabel="Delete Confirmation"
        className="modal-problem-desc"
        overlayClassName="overlay"
      >
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this problem?</p>
        <div className="modal-buttons">
          <button className="class-delete-btn-ff" onClick={handleDeleteProblem}>
            Delete
          </button>
          <button
            className="class-deletebtn-cancl"
            onClick={closeDeleteConfirmationModal}
          >
            Cancel
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={editModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Problem"
        className="modal-problem-desc"
        overlayClassName="overlay"
      >
        <h2>Edit Problem</h2>
        <form>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Rank</label>
            <input
              type="number"
              value={editedRank}
              onChange={(e) => setEditedRank(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="3"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Example Input</label>
            <input
              type="text"
              value={editedExampleInput}
              onChange={(e) => setEditedExampleInput(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Example Output</label>
            <input
              type="text"
              value={editedExampleOutput}
              onChange={(e) => setEditedExampleOutput(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={closeEditModal}>
              Cancel
            </button>
            <button type="submit" onClick={handleEditProblem}>
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={selectedProblemDetails !== null}
        onRequestClose={() => setSelectedProblemDetails(null)}
        contentLabel="Problem Details"
        className="modal-problem-desc"
        overlayClassName="overlay"
      >
        {selectedProblemDetails && (
          <>
            <h2 className="problem-name-view">
              {selectedProblemDetails.title}
            </h2>
            <table className="problem-details-table">
              <tbody>
                <tr>
                  <td>Description:</td>
                  <td>{selectedProblemDetails.description}</td>
                </tr>
                <tr>
                  <td>Rank:</td>
                  <td>{selectedProblemDetails.rank}</td>
                </tr>
                <tr>
                  <td>Category:</td>
                  <td>{selectedProblemDetails.category}</td>
                </tr>
                <tr>
                  <td>Difficulty:</td>
                  <td>{selectedProblemDetails.difficulty}</td>
                </tr>

                {selectedProblemDetails.inputs.map((input, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td>Input:</td>
                      <td>{input}</td>
                    </tr>
                    <tr>
                      <td>Output:</td>
                      <td>{selectedProblemDetails.outputs[index]}</td>
                    </tr>
                  </React.Fragment>
                ))}

                {selectedProblemDetails.hiddenInputs.map((input, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td>Hidden Input:</td>
                      <td>{input}</td>
                    </tr>
                    <tr>
                      <td>Hidden Output:</td>
                      <td>{selectedProblemDetails.hiddenOutputs[index]}</td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            <button
              className="exit-button"
              onClick={() => setSelectedProblemDetails(null)}
            >
              X
            </button>
          </>
        )}
      </Modal>

      {renderPagination()}
      <ToastContainer />
    </div>
  );
}

export default AdminProblemList;
