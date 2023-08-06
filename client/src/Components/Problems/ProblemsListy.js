import React, { useState, useEffect } from "react";
import "./ProblemsListy.css";
import { Link } from "react-router-dom";
import noDataImage from "../../assets/folder.png";

function ProblemsListy() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); //Intialize totalPages

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://127.0.0.1:5000/problems`, {
      headers: {},
    })
      .then((response) => response.json())
      .then((responseData) => {
        const totalPages = Math.ceil(responseData.results / 10);
        setTotalPages(totalPages);
        console.log(responseData.results);
      });

    fetch(`http://127.0.0.1:5000/problems?page=${currentPage}&limit=10`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.data.length > 0) {
          setData(responseData.data); // Calculate totalPages based on the response data
        } else {
          setData([]);
        }
        console.log(responseData.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [currentPage]);

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };
  const saveProblemId = (problemId) => {
    localStorage.setItem("problemId", problemId);
  };
  const renderPagination = () => {
    if (data.length > 0) {
      const pages = [];

      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <li
            key={i}
            className={
              i === currentPage
                ? "page-navigation-item active"
                : "page-navigation-item"
            }
            onClick={() => handlePageChange(i)}
          >
            <a>{i}</a>
          </li>
        );
      }

      return <ul className="page-navigation">{pages}</ul>;
    }
  };

  return (
    <div className="problems-data-container">
      {data.length > 0 ? (
        <table className="problems-data-web">
          <thead>
            <tr>
              <th>Title</th>
              <th>Rank</th>
              <th>Status</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {data.map((problem) => {
              return (
                <tr key={problem._id}>
                  <td>
                    <Link
                      className="title-problem"
                      to="/problems/compiler"
                      onClick={() => saveProblemId(problem._id)}
                    >
                      {problem.title}
                    </Link>
                  </td>
                  <td className="counter-problem">{problem.rank}</td>
                  <td className="status-problem">{problem.category}</td>
                  <td className="diff-problem">{problem.difficulty}</td>
                </tr>
              );
            })}
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
            Try to reload the page again if there's no problems.
          </p>
        </div>
      )}
      {renderPagination()}
    </div>
  );
}

export default ProblemsListy;
