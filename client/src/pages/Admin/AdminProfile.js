import React from "react";
import "./adminProfile.css";
import NavBar from "./ComponentX/Navbar";
import Overview from "./Pages/AccountsOverview";

function AdminProfile() {
  return (
    <div>
      <NavBar />
      <Overview />
    </div>
  );
}

export default AdminProfile;
