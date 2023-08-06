import React, { useEffect, useState } from "react";
import "./Overview.css";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import noDataImage from "../../../assets/folder.png";

function AccountsOverview() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState("");
  const [key, setKey] = useState("");
  const [fullName, setFullName] = useState("");
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userInformation, setUserInformation] = useState(null);
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedFullName, setUpdatedFullName] = useState("");
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://127.0.0.1:5000/users/all-users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setTotalUsers(responseData.results);
        const totalPages = Math.ceil(responseData.results / 10);
        setTotalPages(totalPages);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetch(`http://127.0.0.1:5000/users/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setUsername(responseData.data.user.username);
        setFullName(responseData.data.user.fullName);
        const photoKey = responseData.data.user.photo;
        setKey(photoKey);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetch(
      `http://127.0.0.1:5000/users/all-users?page=${currentPage}&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.data.length > 0) {
          setData(responseData.data);
        } else {
          setData([]);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [currentPage]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (key) {
      fetch(`http://127.0.0.1:5000/users/image/${key}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "http://127.0.0.1:5000",
        },
      })
        .then((response) => response.blob())
        .then((blob) => {
          const photoURL = URL.createObjectURL(blob);
          setPhoto(photoURL);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [key]);

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setUpdatedUsername(user.username);
    setUpdatedFullName(user.fullName);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

  const handleEditSubmit = () => {
    if (selectedUser) {
      const { _id } = selectedUser;
      const token = localStorage.getItem("token");

      const updatedUserData = {
        username: updatedUsername,
        fullName: updatedFullName,
      };

      fetch(`http://127.0.0.1:5000/users/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUserData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response or perform any necessary actions

          // Update the state variables with the updated user data
          setData((prevData) =>
            prevData.map((user) =>
              user._id === selectedUser._id
                ? { ...user, ...updatedUserData }
                : user
            )
          );

          setEditModalIsOpen(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  const handleDeleteSubmit = () => {
    if (selectedUser) {
      const { _id } = selectedUser;
      const token = localStorage.getItem("token");

      fetch(`http://127.0.0.1:5000/users/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response or perform any necessary actions
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      setData((prevData) =>
        prevData.filter((user) => user._id !== selectedUser._id)
      );
      setDeleteModalIsOpen(false);
      //window.location.reload();
    }
  };
  const openUserModal = (user) => {
    setUserInformation(user); // Set the user information to be displayed in the modal
  };

  const closeUserModal = () => {
    setUserInformation(null);
  };
  const renderPagination = () => {
    if (data.length > 0) {
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

      return <ul className="pagination">{pages}</ul>;
    }
  };

  return (
    <div>
      <div className="container-admin-profile">
        <div className="row">
          <div className="personal-data">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <label htmlFor="photoInput" className="card-avatar">
                    {photo ? (
                      <img className="imgg" src={photo} alt="avatar" />
                    ) : (
                      <i className="fas fa-user"></i>
                    )}
                  </label>
                  <input
                    id="photoInput"
                    type="file"
                    accept="image/"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                  <>
                    <a className="profile-redirection" href="#">
                      <p className="card-text">{fullName}</p>
                    </a>
                    <p className="card-text2">@{username}</p>
                  </>
                </div>
              </div>
            </div>
          </div>
          <div className="account-ov">
            <h2>Total number of users</h2>
            <div className="row">
              <div className="col-md-4">
                <div className="solvedproblems-card">
                  <div className="solvedproblems-card-body">
                    <div className="account-ov-counter">
                      <p>{totalUsers}</p>
                      <h2>Members</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="accounts-data-container">
            {data.length > 0 ? (
              <table className="account-overview-table">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <Link
                          className="user-data"
                          to="/Admin"
                          onClick={() => openUserModal(user)}
                        >
                          {user.fullName}
                        </Link>
                      </td>
                      <td className="user-data">{user.username}</td>
                      <td className="user-data">
                        <FontAwesomeIcon
                          icon={faEdit}
                          onClick={() => openEditModal(user)}
                        />
                      </td>
                      <td className="user-data">
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          onClick={() => openDeleteModal(user)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-data-container">
                <img
                  src={noDataImage}
                  alt="No Data Found"
                  className="no-data-image"
                />
                <h1 className="no-data-placeholder">No Problems Found</h1>
                <p className="no-data-placeholder-paragraph">
                  Try to reload the page again if there are no problems.
                </p>
              </div>
            )}
            {renderPagination()}
          </div>
        </div>
      </div>
      {/* Edit Modal */}

      <Modal
        isOpen={!!userInformation}
        onRequestClose={closeUserModal}
        contentLabel="User Information"
        className="modall-data-accountOv"
      >
        <h3>User Information</h3>
        {userInformation && (
          <table className="table dark-mode">
            <tbody>
              <tr>
                <th>Full Name</th>
                <td>{userInformation.fullName}</td>
              </tr>
              <tr>
                <th>Username</th>
                <td>{userInformation.username}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{userInformation.email}</td>
              </tr>
              <tr>
                <th>Role</th>
                <td>{userInformation.role}</td>
              </tr>
              <tr>
                <th>Email Verified</th>
                <td>{userInformation.emailVerified.toString()}</td>
              </tr>
              <tr>
                <th>Quiz Evaluation</th>
                <td>{userInformation.quizEvaluation}</td>
              </tr>
              <tr>
                <th>Contest</th>
                <td>{userInformation.contest}</td>
              </tr>
              <tr>
                <th>Joined Teams</th>
                <td>{userInformation.joinedTeams.length}</td>
              </tr>
              <tr>
                <th>Pending Teams</th>
                <td>{userInformation.pendingTeams.length}</td>
              </tr>
              <tr>
                <th>Submitted Problems</th>
                <td>{userInformation.submittedProblems.length}</td>
              </tr>
            </tbody>
          </table>
        )}
        <button className="btn btn-primary" onClick={closeUserModal}>
          Close
        </button>
      </Modal>

      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit User"
        className="modall-user-data-ov"
      >
        <h2>Edit User</h2>
        <form className="modal-form" onSubmit={handleEditSubmit}>
          <div className="form-group">
            <label htmlFor="edit-username">Username:</label>
            <input
              type="text"
              id="edit-username"
              value={updatedUsername}
              onChange={(e) => setUpdatedUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-fullname">Full Name:</label>
            <input
              type="text"
              id="edit-fullname"
              value={updatedFullName}
              onChange={(e) => setUpdatedFullName(e.target.value)}
            />
          </div>
          <div className="action-account-ov-btn">
            <button type="submit" className="update-user-data-btn">
              Update
            </button>
            <button className="cancel-user-data-btn" onClick={closeEditModal}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete User"
        className="modall-delete-user-ov"
      >
        <h2>Delete User</h2>
        <p>Are you sure you want to delete this user?</p>
        <div className="delete-modal-acc-btn">
          <button className="deletebtn-acc" onClick={handleDeleteSubmit}>
            Delete
          </button>
          <button className="cancelbtn-acc" onClick={closeDeleteModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default AccountsOverview;
