import React, { useState, useEffect } from "react";
import "./Contest.css";
import Header from "../../UI/Header";
//import { useHistory, Link } from "react-router-dom";
import Footer from "../../UI/Footer";
import Backgroundgif from "../../UI/Backgroundgif";
import noDataImg from "../../assets/folder.png";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Contest() {
  const [contestData, setContestData] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [userContest, setUserContest] = useState(null);
  const [, setShowModal] = useState(false);
  const [joinType, setJoinType] = useState("individual");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [userTeams, setUserTeams] = useState([]);
  const [joinedTeams, setJoinedTeams] = useState([]);
  const [currentContestId, setCurrentContestId] = useState(null);
  const [contestProblems, setContestProblems] = useState([]);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showProblemsModal, setShowProblemsModal] = useState(false);
  const [joinedTeamsIds, setJoinedTeamsIds] = useState([]);

  //JOINED TEAMS OF USER
  useEffect(() => {
    //JOINED TEAMS OF USER
    const fetchUserTeams = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:5000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "http://127.0.0.1:5000/*",
          },
        });
        const data = await response.json();
        //const joinedTeams = data.data.user.joinedTeams;
        setJoinedTeamsIds(data.data.user.joinedTeams);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserTeams();
  }, []);

  // Get all joined teams titles____________________________
  useEffect(() => {
    const token = localStorage.getItem("token");

    joinedTeamsIds.forEach((teamId) => {
      fetch(`http://localhost:5000/teams/${teamId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const teamName = data.data.team.teamName;
          setUserTeams((prevNames) => [...prevNames, teamName]);
        })
        .catch((error) => {
          console.error("Error fetching problem data:", error);
        });
    });
  }, [joinedTeamsIds]);
  //_______________________________________________________

  useEffect(() => {
    //FETCH THE CONTESTSS
    const fetchContestData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/contests");
        const responseData = await response.json();
        setContestData(responseData.data.contests);
        console.log("Contests", responseData.data.contests);

        const contestIds = responseData.data.contests.map(
          (contest) => contest._id
        );
        console.log("Contest IDs", contestIds);
      } catch (error) {
        console.error(error);
      }
    };
    //FETCH ENROLLED CONTEST
    const fetchUserContest = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:5000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const responseData = await response.json();
        setUserContest(responseData.data.user.contests);
        console.log(responseData.data.user.contests);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContestData();
    fetchUserContest();
  }, []);

  const formatTime = (timeString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC",
      timeZoneName: "short",
    };
    return new Date(timeString).toLocaleDateString(undefined, options);
  };

  const handleRegisterClick = (contestId) => {
    // Check if the user is already registered for the contest
    const isRegistered = userContest.some(
      (contest) => contest.id === contestId
    );
    if (isRegistered) {
      // Show a message or take the appropriate action
      console.log("User is already registered for this contest.");
      return;
    }
    setShowModal(true);
    setShowRegistrationModal(true); // Add this line to open the registration modal
    setCurrentContestId(contestId);
    console.log("Joining contest with ID:", contestId);
    localStorage.setItem("currentContestId", contestId); // Set the current contest ID in localStorage
  };
  const handleJoinClick = (contestId) => {
    // Check if the user is already registered for the contest

    const isAlreadyRegistered = userContest.some(
      (contest) => contest.id === contestId
    );

    if (!isAlreadyRegistered) {
      // Display a toast message to register first

      toast.error("Please register for the contest first.");
    } else {
      // Set the currentContestId state to the clicked contest ID
      setCurrentContestId(contestId);
      // Store the current contest ID in localStorage
      localStorage.setItem("currentContestId", contestId);
      localStorage.setItem("isRegistered_" + contestId);
    }

    setCurrentContestId(contestId);
    console.log("Joining contest with ID:", contestId);
    localStorage.setItem("currentContestId", contestId); // Set the current contest ID in localStorage
  };

  const handleJoinTypeChange = (event) => {
    setJoinType(event.target.value);
    if (event.target.value === "individual") {
      setShowModal(false); //TRUE
    }
    setSelectedTeam(""); // Reset the selected team to an empty string
  };

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
    console.log("selected team: ", event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const currentContestId = localStorage.getItem("currentContestId");

    // Prepare registration data
    const registrationData = {
      isRegistered: true,
      teamName: selectedTeam,
    };

    try {
      if (joinType === "team") {
        const response = await fetch(
          `http://localhost:5000/contests/register-team-contest/${currentContestId}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "http://localhost:5000/*",
            },
            body: JSON.stringify({ teamName: selectedTeam }),
          }
        );
        if (response.ok) {
          toast.success("Team registered successfully.");
          setIsRegistered(true);
          setCurrentContestId(currentContestId);
        } else {
          // Registration failed for some other reason
          console.log("Registration failed");

          toast.error(
            "Team registration failed you already registered as a team."
          );
        }
      } else {
        const response = await fetch(
          `http://localhost:5000/contests/register-contest/${currentContestId}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "http://localhost:5000/*",
            },
          }
        );

        if (response.ok) {
          toast.success("User registered successfully.");
          setIsRegistered(true);
          setCurrentContestId(currentContestId);
        } else {
          console.log("Registration failed anan by2olak enta dakhlt already");
          console.log("response: ", response);

          toast.error(
            "ANAN Registration failed. You already Registered inside this contest as indiv"
          );
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setShowModal(false);
      setJoinType("individual");
      setSelectedTeam(null);
    }
  };

  return (
    <>
      <Header />
      <div>
        <Backgroundgif />
      </div>
      <h1 className="yet-contest">!YET Contests of the week</h1>
      <div className="contest-page">
        {contestData.length === 0 ? (
          <div className="no-data-contest">
            <p className="no-contests">No contests available</p>
            <img
              className="no-contest-img"
              src={noDataImg}
              alt="No Data to Display"
            ></img>
          </div>
        ) : (
          <div className="contest-list">
            {contestData.map((contest) => {
              const isJoined =
                userContest && userContest.some((c) => c.id === contest._id);
              const isCurrentContest = currentContestId === contest._id;

              return (
                <div className="contest-item" key={contest._id}>
                  <div className="contest-item-header">
                    <h2 className="contest-name">{contest.name}</h2>
                    <div className="contest-details">
                      <p className="contest-time">
                        {formatTime(contest.startTime)}
                      </p>
                      <p className="contest-duration">
                        Duration:{" "}
                        {formatTime(contest.endTime - contest.startTime)}
                      </p>
                    </div>
                  </div>
                  {isRegistered ? (
                    <div className="contest-card-buttons">
                      <button
                        className="contest-register-button"
                        onClick={() => handleRegisterClick(contest._id)}
                      >
                        View Problems
                      </button>
                      <Link to="/contests/problems">
                        <button className="join-button">Join Contest</button>
                      </Link>
                    </div>
                  ) : (
                    <div className="contest-card-buttons">
                      <button
                        className="join-button2"
                        onClick={() => handleRegisterClick(contest._id)}
                      >
                        {userContest && userContest.includes(contest._id)
                          ? "You are already registered in this contest"
                          : ""}
                      </button>
                      {joinType === "individual" ? (
                        <Link to="/contests/problems">
                          <button
                            className="join-button"
                            onClick={() => handleJoinClick(contest._id)}
                          >
                            Join Contestt
                          </button>
                        </Link>
                      ) : (
                        <button
                          className="join-button"
                          onClick={() => handleRegisterClick(contest._id)}
                        >
                          Join as a Team
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />

      <Modal
        isOpen={showRegistrationModal}
        onRequestClose={() => setShowRegistrationModal(false)}
        className="modal-join-contest"
      >
        <div className="modal-content">
          <h2>Choose Join Type</h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label>
                <input
                  type="radio"
                  value="individual"
                  checked={joinType === "individual"}
                  onChange={handleJoinTypeChange}
                />
                Individual
              </label>
            </div>

            <div>
              <label>
                <input
                  type="radio"
                  value="team"
                  checked={joinType === "team"}
                  onChange={handleJoinTypeChange}
                />
                Team
              </label>
            </div>

            {joinType === "team" && (
              <div>
                <label>Select Team:</label>
                {userTeams.length > 0 ? (
                  <select onChange={handleTeamChange}>
                    <option value="">Select a team</option>
                    {userTeams.map((team) => (
                      <option key={team} value={team}>
                        {team}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>No teams joined.</p>
                )}
              </div>
            )}
            <div>
              <button className="join-btn-modal" type="submit">
                Submit
              </button>
              <button onClick={() => setShowRegistrationModal(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={showProblemsModal}
        onRequestClose={() => setShowProblemsModal(false)}
      >
        <div className="modal-content">
          <h2>Contest Problems</h2>
          {contestProblems.length === 0 ? (
            <p>No problems available</p>
          ) : (
            <ul>
              {contestProblems.map((problem) => (
                <li key={problem}>{problem}</li>
              ))}
            </ul>
          )}
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      </Modal>

      <ToastContainer />
    </>
  );
}

export default Contest;
