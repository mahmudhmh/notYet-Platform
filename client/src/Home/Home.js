import React from "react";
import "./Home.css";
import Header from "../UI/Header";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import Features from "../Components/Features/Features";
import matrix from "../assets/matrix.png";
import Questionss from "../Components/Questions/QuestionsHome";
import languages from "../assets/languages.png";
import Footer from "../UI/Footer";
import Backgroundgif from "../UI/Backgroundgif";
import { useState, useEffect } from "react";
import LogoWhiteText from "../assets/LogoWhiteText.png";

function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Simulate a delay for the splash screen
    setTimeout(() => {
      setShowSplash(false);
    }, 1000); // Set the duration for the splash screen to display (in milliseconds)
  }, []);

  return (
    <div>
      {showSplash ? (
        <div className="splash-screen">
          <div className="splash-content">
            {/* Add your splash screen content here */}
            <img className="logo-login" src={LogoWhiteText} alt="Logo" />
          </div>
        </div>
      ) : (
        <>
          <Header />
          <div className="backgroundd">
            <Backgroundgif />
          </div>
          <div className="header1">
            <h1>NOT YET </h1>
            <p className="one">
              We aspire to help all who seek improvement in problem solving
            </p>
            <p className="two">
              and develop an ability to think outside the Box
            </p>

            <Link to="/login">
              <Button className="join-btn-home-hh">Join !YET</Button>
            </Link>
          </div>
          <div className="header2">
            <h1>What is NOT YET? </h1>
            <p>___________________________________</p>
          </div>
          <Features />
          <div className="header3">
            <h1>Our Competitors </h1>
            <p>___________________________________</p>
            <img src={matrix} alt="" />
          </div>
          <div className="header5">
            <h1>Questions Categories</h1>
            <p>___________________________________</p>
            {/* <Questions /> */}
            <Questionss />
          </div>
          <div className="header7">
            <h1>We Speak 5 Languages</h1>
            <p className="line">__________________________</p>
            <div className="container">
              <img src={languages} alt="" />
              <p className="textt">
                There's nothing more commutative than speaking it's the only and
                first communication tool. only to find solutions in programming
                languages that you don't know. That's why all our questions can
                be solved in many languages that are popular. JavaScript,
                Python, C++,C, Java and more.
              </p>
            </div>
          </div>
          <div className="header8">
            <p>How do you want to start your journey in problem solving?</p>
            <Link to="/login">
              <button>Of Course</button>
            </Link>
            <button>Not Now</button>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default Home;
