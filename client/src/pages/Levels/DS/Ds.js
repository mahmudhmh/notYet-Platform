// import React, { useState, useEffect } from "react";
// import axios from "axios";
import Header from "../../../UI/Header";
import Footer from "../../../UI/Footer";
import Card from "../../../UI/Card";
import Two from "../../../assets/Icons/Two.png";
import classes from "./Ds.module.css";
import Backgroundgif from "../../../UI/Backgroundgif";
import { Link } from "react-router-dom";

function Ds() {
  return (
    <div>
      <Header />
      <div>
        <Backgroundgif />
      </div>
      <div>
        <div className={classes.header1}>
          <h1>!YET DataStructure</h1>
          <p className={classes.line}>______________________</p>
          <div className={classes.card1}>
            <img src={Two} alt="one" />
          </div>
          <div className={classes.text}>
            <p>
              We aspire to help all who seek improvement in problem solving and
              develop an ability to think outside the box and think
              strategically by providing them with an organized environment
              guided by professionals. Through our platform they will be able to
              endorse their team working skills while working collaboratively
              with their team, learn how to code , debug and optimize code ,
              mastering programming techniques through our organized topics and
              roadmaps.
            </p>
          </div>
        </div>
        <Link to="/content/ds/one" style={{ textDecoration: "none" }}>
          <Card>
            <img src={Two} alt="one" />
            <div clasName={classes.content}>
              <h1>Level 1 </h1>
              <h1>Avg. 2 Problems/ day | 5 days</h1>
            </div>
          </Card>
        </Link>
        <Link to="/content/ds/two" style={{ textDecoration: "none" }}>
          <Card>
            <img src={Two} alt="one" />
            <div clasName={classes.content}>
              <h1>Level 2 </h1>
              <h1>Avg. 2 -3 Problems/ day | 5 days</h1>
            </div>
          </Card>
        </Link>
        <Link to="/content/ds/three" style={{ textDecoration: "none" }}>
          <Card>
            <img src={Two} alt="one" style={{ textDecoration: "none" }} />
            <div clasName={classes.content}>
              <h1>Level 3 </h1>
              <h1>Avg. 2 -3 Problems/ day | 5 days</h1>
            </div>
          </Card>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
export default Ds;
