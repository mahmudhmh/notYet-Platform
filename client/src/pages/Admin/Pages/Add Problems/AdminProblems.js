import React, { useState } from "react";

import Card from "./Card";
import "./AdminProblems.css";

import AdminProblemList from "./AdminProblemList";

const AdminProblems = (props) => {
  return (
    <div>
      <Card className="problems-table">
        <AdminProblemList />
      </Card>
    </div>
  );
};

export default AdminProblems;
