import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";

function Navbar() {
  const [activeTab, setActiveTab] = useState(SidebarData[1].title);

  const handleTabClick = (title) => {
    setActiveTab(title);
  };

  return (
    <div className="navbar">
      <IconContext.Provider value={{ color: "#fff" }}>
        <ul className="vertical-tabs">
          {SidebarData.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => handleTabClick(item.title)}
                className={`tab ${activeTab === item.title ? "active" : ""}`}
              >
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </IconContext.Provider>
      {/* <div>
        <LogoWhiteText />
      </div> */}
    </div>
  );
}

export default Navbar;
