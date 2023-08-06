import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../UI/Header";
import Footer from "../../../UI/Footer";
import Backgroundgif from "../../../UI/Backgroundgif";
import { Link } from "react-router-dom";
import noDataImage from "../../../assets/folder.png";
import "./Exercise.css";
import Card from "./Card";

function ExerciseOne() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/problems`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const responseData = response.data;
        const filteredData = responseData.data.filter(
          (problem) =>
            (problem.difficulty === "Easy" && problem.category === "Arrays") ||
            (problem.category === "String" && problem.difficulty === "Easy") ||
            (problem.category === "Mathematical Operations" &&
              problem.difficulty === "Easy")
        );

        if (filteredData.length > 0) {
          setData(filteredData);
        } else {
          setData([]);
        }

        const totalPages = Math.ceil(filteredData.length / 10);
        setTotalPages(totalPages);
        console.log(responseData.results);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
    <div>
      <Header />
      <div>
        <Backgroundgif />
        <h1 className="Text">!YET 15 Days - LEVEL 1</h1>
        <Card className="problems-table">
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
        </Card>
      </div>
      <Footer />
    </div>
  );
}

export default ExerciseOne;
