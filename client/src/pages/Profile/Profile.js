import React, { useState, useEffect } from "react";
import "./Profile.css";
import Navbar from "./ComponentX/Navbar";
import Modal from "react-modal";
import Tags from "./Tags";

const aboutData = [
  {
    about:
      "You can also use the text-shadow property to create a plain border around some text (without shadows)You can also use the text-shadow property to create a plain border around some text (without shadows)You can also use the text-shadow property to create a plain border around some text (without shadows)You can also use the text-shadow property to create a plain border around some text (without shadows)",
  },
];

function Profile() {
  const [sfullName, setFullName] = useState("");
  const [susername, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [totalSubmitted, setTotalSubmitted] = useState([]);
  const [solvedPercentage, setSolvedPercentage] = useState([]);
  const [photo, setPhoto] = useState("");
  const [key, setKey] = useState("");
  const [assessmentResult, setAssessmentResult] = useState("");
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  // GET user's profile data
  useEffect(() => {
    fetch("http://127.0.0.1:5000/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "http://127.0.0.1:5000",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const user = data.data.user;
        setFullName(user.fullName);
        setUsername(user.username);
        const photoKey = user.photo;
        setKey(photoKey);
        setAbout(
          user.about || "Share your passions, interests, and achievements..."
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // GET user's profile picture
  useEffect(() => {
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
  // GET USER'S PROBLEMS STATISTICS
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/users/problems-stats/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((stats) => {
        setSolvedProblems(stats.totalAccepted);
        setTotalSubmitted(stats.totalSubmitted);
        setSolvedPercentage(stats.solvedPercentage);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  useEffect(() => {
    const result = localStorage.getItem("assessmentResult");
    setAssessmentResult(result);
  }, []);
  const handleSaveClick = () => {
    setEditMode(false);
    const updatedUserData = {
      fullName: sfullName,
      username: susername,
      about: about,
    };
    const formData = new FormData();
    formData.append("photo", photo);

    // Update profile information
    fetch(`http://127.0.0.1:5000/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUserData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Profile information updated successfully!");
        // Handle the response or perform any necessary actions
        // ...

        // Update profile picture
        const requestOptions = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        };

        fetch("http://127.0.0.1:5000/users/update-me", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log("Profile picture updated successfully!");
            // Handle the response or perform any necessary actions
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container-profile">
      <Navbar />
      <div className="container-user-profile">
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

                  <div className="modal-edit-user-data-user">
                    {editMode ? (
                      <Modal
                        isOpen={true}
                        onRequestClose={() => setEditMode(false)}
                        contentLabel="Edit Form"
                        overlayClassName="overlay"
                        className="back-modal-user"
                      >
                        <div className="popup-form-user-edit">
                          <h1>Edit Information</h1>
                          <h3>Full Name</h3>
                          <input
                            type="text"
                            value={sfullName}
                            onChange={(e) => setFullName(e.target.value)}
                          />
                          <h3>User Name</h3>
                          <input
                            type="text"
                            value={susername}
                            onChange={(e) => setUsername(e.target.value)}
                          />

                          {/* <div className="assessment-result">
                            <h2>Assessment Result</h2>
                            <p>{assessmentResult}</p>
                          </div> */}
                          <h3>About</h3>

                          <input
                            type="text"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                          />
                          <h3>Profile Picture</h3>
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
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleImageUpload}
                          />
                          <button
                            className="save-buttonn"
                            onClick={handleSaveClick}
                          >
                            Save
                          </button>
                        </div>
                      </Modal>
                    ) : (
                      <>
                        <a className="profile-redirection" href="#">
                          <p className="card-text">{sfullName}</p>
                        </a>
                        <p className="card-text2">@{susername}</p>

                        <p className="card-text3">{assessmentResult}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="solved-problems">
            <h2>Solved Problems</h2>
            <div className="row">
              <div className="col-md-4">
                <div className="solvedproblems-card">
                  <div className="solvedproblems-card-body">
                    <div className="solvedproblems-numsolved">
                      <p>{solvedProblems}</p>
                      <h2>Solved</h2>
                    </div>
                    {/* <p className="solvedproblems-level">{level}</p> */}
                    <p className="solvedproblems-number">
                      {solvedProblems} out of {totalSubmitted}
                    </p>
                    <div className="solvedproblems-progress-bar">
                      {solvedPercentage}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="About-user">
            <h2>About</h2>
            {/* <a href="#">
              <div className="edit-bio">Edit</div>
            </a> */}
            <div className="row">
              {aboutData.map((val, key) => {
                return (
                  <div className="col-md-4">
                    <div className="About-card">
                      <div className="About-card-body">
                        <p className="About-bio">{about}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="Edit-user">
            <h2>Edit User Information</h2>
            {editMode ? (
              <button className="save-button" onClick={handleSaveClick}>
                Save
              </button>
            ) : (
              <button className="edit-data" onClick={handleEditClick}>
                Edit
              </button>
            )}
            <div className="row">
              <div className="col-md-4">
                <div className="edit-card">
                  <div className="edit-card-body">
                    <p className="static-msg">
                      Your username will be visible to other Not Yet users if
                      you share solutions to questions or comment on shared
                      solutions.
                    </p>
                    {/* <div className="username-edit">
                      <h3>Username</h3>
                      {editMode ? (
                        <input
                          type="text"
                          value={susername}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      ) : (
                        <p className="edit-data-user">{susername}</p>
                      )}
                    </div>
                    <div className="username-edit">
                      <h3>Full Name</h3>
                      {editMode ? (
                        <input
                          type="text"
                          value={sfullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      ) : (
                        <p className="edit-data-name">{sfullName}</p>
                      )}
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tags></Tags>
    </div>
  );
}

export default Profile;
