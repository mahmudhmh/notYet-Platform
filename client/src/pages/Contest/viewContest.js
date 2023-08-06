import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ContestDetails.css";
import Header from "../../UI/Header";
import Footer from "../../UI/Footer";
import Problem from "./Problem"; // Assuming you have a Problem component

function ContestDetails() {
  const { contestId } = useParams();
  const [contestData, setContestData] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/contests/${contestId}`)
      .then((response) => response.json())
      .then((responseData) => {
        setContestData(responseData.data.contest);
        console.log(responseData.data.contest);
      })
      .catch((error) => console.error(error));
  }, [contestId]);

  return (
    <>
      <Header />
      <div className="contest-details-page">
        {contestData ? (
          <>
            <h1 className="contest-name">{contestData.name}</h1>
            <div className="problem-list">
              {contestData.problems.map((problem) => (
                <Problem key={problem.id} problem={problem} />
              ))}
            </div>
          </>
        ) : (
          <p>Loading contest details...</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ContestDetails;
