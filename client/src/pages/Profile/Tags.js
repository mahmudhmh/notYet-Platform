import React, { useEffect, useState } from "react";
import ReactDOM from "react";

import { Tagslist } from "./Tagslist";
import Problem_list from "./Problem_list";

const Tags = () => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const [tags, setTags] = React.useState([]);
  const [prodata, setprodata] = React.useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/users/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((stats) => {
        console.log(stats.data.user);
        // setprodata(stats.data.user);
        let x = [];
        for (let i = 0; i < stats.data.user.submittedProblems.length; i++) {
          if (stats.data.user.submittedProblems[i].status === "Accepted") {
            x.push(stats.data.user.submittedProblems[i]);
          }
        }

        setprodata(x);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="tags-input">
      <h1>Your criteria </h1>
      {/* <Problem_list id={"6474d1a4f13b52519067889f"}></Problem_list>
      <Problem_list id={"6474d1a4f13b52519067889f"}></Problem_list>
      <Problem_list id={"6474d1a4f13b52519067889f"}></Problem_list> */}

      {
        <ul id="tags">
          {prodata && prodata.length > 0 && (
            <Problem_list problem={prodata}></Problem_list>
          )}
        </ul>
      }
    </div>
  );
};

export default Tags;
