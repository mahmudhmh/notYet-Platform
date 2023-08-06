import React, { useEffect, useState } from "react";
import "./Contest.css";
import Header from "../../UI/Header";
import { Link } from "react-router-dom";
import noDataImageHere from "../../assets/folder.png";
function ContestProblems() {
  const [problems, setProblems] = useState([]);
  const [contestStandings, setContestStandings] = useState([]);
  const [userStanding, setUserStanding] = useState([]);
  const [problemTitles, setProblemTitles] = useState("");
  const [teamNames, setTeamNames] = useState("");
  const [userNames, setUserNames] = useState("");
  const [contestName, setContestName] = useState("");
  const [timer, setTimer] = useState(4900);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const contestID = localStorage.getItem("currentContestId");

    // Get contest's teamStanding, individualStanding and problems

    fetch(`http://localhost:5000/contests/${contestID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProblems(data.data.contest.problems);
        console.log("Problems: ", data.data.contest.problems);
        setContestName(data.data.contest.name);
        console.log("Contest Name: ", contestName);
        setContestStandings(data.data.contest.teamStanding);
        setUserStanding(data.data.contest.individualStanding);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Get all problems titles____________________________
  useEffect(() => {
    const token = localStorage.getItem("token");

    problems.forEach((problem) => {
      fetch(`http://localhost:5000/problems/${problem}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const problemTitle = data.data.problem.title;
          setProblemTitles((prevTitles) => [...prevTitles, problemTitle]);
          console.log("Problem Titles: ", problemTitles);
        })
        .catch((error) => {
          console.error("Error fetching problem data:", error);
        });
    });
  }, [problems]);
  const saveProblemId = (problemId) => {
    localStorage.setItem("ContestProblemId", problemId);
  };
  //_______________________________________________________

  // Get all teamStanding titles____________________________
  useEffect(() => {
    const token = localStorage.getItem("token");

    contestStandings.forEach((teamId) => {
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
          setTeamNames((prevNames) => [...prevNames, teamName]);
        })
        .catch((error) => {
          console.error("Error fetching problem data:", error);
        });
    });
  }, [contestStandings]);
  //_______________________________________________________

  // Get all UserStanding titles____________________________
  useEffect(() => {
    const token = localStorage.getItem("token");

    userStanding.forEach((userId) => {
      fetch(`http://localhost:5000/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const username = data.data.user.username;
          setUserNames((prevUserNames) => [...prevUserNames, username]);
        })
        .catch((error) => {
          console.error("Error fetching problem data:", error);
        });
    });
  }, [userStanding]);
  //_______________________________________________________

  return (
    <>
      <Header />
      <div className="contest-header">
        <h1>{contestName} Contest</h1>
        <h2>
          Timer: {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </h2>
      </div>

      <div className="contest-wrapper">
        <div className="contest-problems">
          <h1>Contest Problems</h1>
          {problems.length > 0 ? (
            <table className="problem-contest-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Problems</th>
                </tr>
              </thead>
              <tbody>
                {problems.map((problem, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Link
                        className="title-problem"
                        to="/contest/compiler"
                        onClick={() => saveProblemId(problem)}
                      >
                        {problemTitles[index]}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="Placeholder-Img-Contest">
              <img src={noDataImageHere} alt="no-Data found"></img>
              <p>No problems available</p>
            </div>
          )}
        </div>

        <div className="contest-standings">
          <h1>Contest Individual Standings</h1>
          {userStanding.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User Standing</th>
                </tr>
              </thead>
              <tbody>
                {userStanding.map((userStand, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <div>
                        <span className="user-team-name">{userNames[i]}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="Placeholder-Img-Contest3">
              <img src={noDataImageHere} alt="no-Data found"></img>
              <p>No Individual Standing Available</p>
            </div>
          )}
        </div>

        <div className="contest-standings2">
          <h1>Contest Team Standings</h1>
          {contestStandings.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team Standing</th>
                </tr>
              </thead>
              <tbody>
                {contestStandings.map((standing, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div>
                        <span className="user-team-name">
                          {teamNames[index]}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="Placeholder-Img-Contest2">
              <img src={noDataImageHere} alt="no-Data found"></img>
              <p>No Team Standing Available</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ContestProblems;
