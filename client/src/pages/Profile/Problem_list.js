import React from "react";
import { useEffect, useState, useCallback } from "react";
import { Tagslist } from "./Tagslist";

function Problem_list({ problem }) {
  console.log(problem);
  const token = localStorage.getItem("token");
  const [description, setdescription] = React.useState([]);

  const fetchData = useCallback(async () => {
    try {
      const requests = problem.map((p) =>
        fetch(`http://127.0.0.1:5000/problems/${p.problem}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => response.json())
      );

      const responses = await Promise.all(requests);
      const descriptions = responses.map(
        (stats) => stats.data.problem.description
      );

      setdescription((prevDescriptions) => [
        ...prevDescriptions,
        ...descriptions,
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [problem, token, setdescription]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // console.log(prodata.data);
  return (
    <ul id="tags">
      {description && description.length > 0 && (
        <Tagslist description={description} />
      )}
    </ul>
  );
}

export default Problem_list;
