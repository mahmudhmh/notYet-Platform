import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import LogoWhiteText from "../assets/LogoWhiteText.png";
import Profile from "../assets/profilefoto.png";
import downarrow from "../assets/downward-arrow.png";

function Header(props) {
  const [susername, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [photo, setPhoto] = useState("");
  const [key, setKey] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    if (token) {
      fetch("http://127.0.0.1:5000/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "http://127.0.0.1:5000",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const user = data.data.user;
          setUsername(user.username);
          setLoggedIn(true);
          setIsAdmin(user.role === "admin");
          if (user.photo) {
            const photoKey = user.photo;
            setKey(photoKey);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (key) {
      fetch(`http://127.0.0.1:5000/users/image/${key}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "http://127.0.0.1:5000",
        },
      })
        .then((response) => response.blob())
        .then((blob) => {
          const photoURL = URL.createObjectURL(blob);
          setPhoto(photoURL);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [key]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("username");

    setLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <header>
      <div className="Header">
        <div className="leftSide">
          <Link to="/">
            <img src={LogoWhiteText} alt="logo" />
          </Link>
        </div>
        <div className="center">
          <ul>
            <Link className="text" to="/problems">
              Problems
            </Link>
          </ul>
          <ul>
            <Link className="text" to="/contests">
              Contests
            </Link>
          </ul>
          <ul>
            <Link className="text" to="/content">
              Content
            </Link>
          </ul>
          <ul>
            <Link className="text" to="/team">
              Team
            </Link>
          </ul>
          <ul>
            <Link className="text" to="/about">
              About
            </Link>
          </ul>
        </div>
        <div className="rightSide">
          {loggedIn && (
            <>
              <img
                src={photo || Profile}
                alt="profile"
                className="profile-image-header"
              />
              <Link to={isAdmin ? "/admin" : "/profile"} className="test-text">
                <div className="profile-page-link-a">
                  <p className="profile-page-link">{susername}</p>
                </div>
              </Link>
              <div className="dropdown">
                <img src={downarrow} alt="downarrow" className="arrow-down" />
                <div className="dropdown-content">
                  <div className="dropdown-item">
                    <Link to={isAdmin ? "/admin" : "/profile"}>
                      {isAdmin ? "Admin Overview" : "Account Overview"}
                    </Link>
                  </div>
                  <div className="dropdown-item">
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                </div>
              </div>
            </>
          )}
          {!loggedIn && (
            <Link to="/login" className="test-text">
              <div className="profile-page-link-a-2">
                <p className="profile-page-link-2">Login</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
