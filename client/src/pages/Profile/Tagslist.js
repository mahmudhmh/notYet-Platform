import React, { useEffect, useState } from "react";
import "./Tags.css";

export const Tagslist = ({ description }) => {
  const [tag, settag] = useState();
  console.log(description);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("http://127.0.0.1:9000/predict", {
          method: "POST",
          // mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ x: description }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);

        if (data.length > 0) {
          settag(data);
          // console.log(data.prediction);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    // console.log(typeof parseInt(prodata[0].rank));

    fetchTags();
  }, [description]);
  //   console.log(tag.prediction);
  return (
    <div>
      {tag?.map((t, index) => {
        return (
          <span className="tag" key={index}>
            {t}
          </span>
        );
      })}
    </div>
  );
};
