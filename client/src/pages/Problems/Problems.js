import Header from "../../UI/Header";
import Button from "../../UI/Button";
import { Link } from "react-router-dom";
import classes from "./Problems.module.css";
import Backgroundgif from "../../UI/Backgroundgif";
import Problemx from "../../Components/Problems/Problemx";
import { DATA } from "./DATA";
import Footer from "../../UI/Footer";
import ProblemsTopics from "../../Components/Problems/ProblemsTopics";
import { useState, useEffect } from "react";

function Problems() {
  const dummy = DATA;
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [solvedPercentage, setSolvedPercentage] = useState([]);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://127.0.0.1:5000/problems`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        const problems = responseData.results;

        const solvedPercentage = ((solvedProblems / problems) * 100).toFixed(2);

        setSolvedPercentage(solvedPercentage);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [solvedProblems]);

  return (
    <div>
      <Header />
      <div>
        <Backgroundgif />
      </div>
      <div>
        <div className={classes.header1}>
          <h1>+100 Top Picked Problem</h1>
          <p>The Best Practice to grow your problem solving skills</p>

          <Link to="/login">
            <Button>Join !YET</Button>
          </Link>
        </div>
        <div className={classes.header2}>
          <h2>{solvedProblems} Problems Solved</h2>
          <p> {solvedPercentage}%</p>
        </div>
        {/* <ProblemsTopics /> */}
        <Problemx items={dummy} />
        <Footer />
      </div>
    </div>
  );
}
export default Problems;
