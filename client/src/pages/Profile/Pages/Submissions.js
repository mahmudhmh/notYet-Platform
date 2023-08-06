import React, { useEffect, useState } from "react";
import Navbar from "../ComponentX/Navbar";
import "../Pages/Submissions.css";
import noDataImg from "../../../assets/folder.png";

function Submissions() {
  const [submissionsIds, setSubmissionsIds] = useState([]);
  const [problems, setProblems] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [submissionsPerPage] = useState(10); // Number of submissions to display per page

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://127.0.0.1:5000/users/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setSubmissionsIds(responseData.data.user.submittedProblems);
        const problemIds = responseData.data.user.submittedProblems.map(
          (submission) => submission.problem
        );
        fetchProblemDetails(problemIds);
      })
      .catch((error) => {
        console.error("Error fetching user submissions:", error);
      });
  }, []);

  const fetchProblemDetails = (submissionIds) => {
    const token = localStorage.getItem("token");

    submissionIds.forEach((problemId) => {
      fetch(`http://localhost:5000/problems/${problemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          const problem = responseData.data.problem;
          setProblems((prevProblems) => ({
            ...prevProblems,
            [problemId]: problem,
          }));
        })
        .catch((error) => {
          console.error("Error fetching problem data:", error);
        });
    });
  };

  // Pagination logic
  const indexOfLastSubmission = currentPage * submissionsPerPage;
  const indexOfFirstSubmission = indexOfLastSubmission - submissionsPerPage;
  const currentSubmissions = submissionsIds.slice(
    indexOfFirstSubmission,
    indexOfLastSubmission
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Navbar />
      <h1 className="title-sub">Submissions</h1>

      <div className="submissions-table">
        {submissionsIds.length === 0 ? (
          <div className="no-submissions-placeholder">
            <img src={noDataImg} alt="No Submissions" />
            <p>No submissions available.</p>
          </div>
        ) : (
          <table className="table-user-submission">
            <thead>
              <tr>
                <th className="sub-problems-user">Title</th>
                <th className="sub-problems-user">Category</th>
                <th className="sub-problems-user">Status</th>
                <th className="sub-problems-user">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {currentSubmissions.map((submission, index) => {
                const problem = problems[submission.problem];

                if (problem) {
                  return (
                    <tr key={submission._id}>
                      <td className="sub-title-problem">{problem.title}</td>
                      <td className="sub-counter-problem">
                        {problem.category}
                      </td>
                      <td className="sub-status-problem">
                        {submission.status}
                      </td>
                      <td className="sub-diff-problem">{problem.difficulty}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        <div className="pagination">
          {submissionsIds.length > 0 && (
            <ul>
              {Array.from(
                {
                  length: Math.ceil(submissionsIds.length / submissionsPerPage),
                },
                (_, index) => index + 1
              ).map((pageNumber) => (
                <li
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={pageNumber === currentPage ? "active" : ""}
                >
                  {pageNumber}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Submissions;
