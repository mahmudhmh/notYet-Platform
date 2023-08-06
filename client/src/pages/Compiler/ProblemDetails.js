import React, { useState, useEffect } from "react";
import Tabs from "./Tabs";

function ProblemDetails() {
  const [problemData, setProblemData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://127.0.0.1:5000/problem/${problemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setProblemData(responseData);
        console.log(responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      {problemData ? (
        <Tabs problemData={problemData} />
      ) : (
        <p>Loading problem data...</p>
      )}
    </div>
  );
}

export default ProblemDetails;
