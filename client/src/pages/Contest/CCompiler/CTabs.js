/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState, useEffect } from "react";
import "./CTabs.css";

const CTabs = () => {
  const [activeTab, setActiveTab] = useState(null);

  const initialTimer = localStorage.getItem("timer") || 30 * 60;
  const [timer, setTimer] = useState(Number(initialTimer));


  useEffect(() => {
    const handleBeforeUnload = (event) => {
      localStorage.setItem("timer", timer.toString());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [timer]);

  useEffect(() => {
    let interval;
    if (activeTab === 1) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setTimer(30 * 60); // Reset timer to 30 minutes
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeTab]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(activeTab === index ? null : index);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <WhiteboardPage />;
      default:
        return null;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="tabs-container">
      <div className="tab-buttons">
        <button
          className={activeTab === 0 ? "active" : ""}
          onClick={() => handleTabClick(0)}
        >
          {activeTab === 0 ? "Close Whiteboarddd" : "Open Whiteboardddd"}
        </button>
        <div className="countdown">
          <h2 style={{ color: timer <= 60 ? "red" : "white" }}>
            Time: {formatTime(timer)}
          </h2>
        </div>
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};
const WhiteboardPage = () => {
  const handleExpand = () => {
    window.open("http://localhost:3000/contest/whiteboard", "_blank");
  };

  return (
    <>
      <iframe
        src="http://localhost:3000/contest/whiteboard-window"
        className={`whiteboard-iframe`}
      ></iframe>
      <button className="expand-btn-wb" onClick={handleExpand}>
        Expand
      </button>
    </>
  );
};
// const WhiteboardPage = () => {
//   return <h2>Whiteboard Page</h2>;
// };

export default CTabs;
