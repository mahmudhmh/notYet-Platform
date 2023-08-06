import React, { useState } from "react";

import Card from "./Card";
import "./Problemx.css";
import ProblemsListy from "./ProblemsListy";

const Problemx = (props) => {
  return (
    <div>
      <Card className="problems-table">
        <ProblemsListy />
      </Card>
    </div>
  );
};

export default Problemx;
