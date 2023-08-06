import React from "react";
import Select from "react-select";
import "./NavBarrr.css";
import Chatbot from "./Chatbot";
import { useState } from "react";
import LogoWhiteText from "../../assets/LogoWhiteText.png";
import { Link } from "react-router-dom";
import Tabs from "./Tabs";

const NavBarrr = ({
  userLang,
  setUserLang,
  userTheme,
  setUserTheme,
  fontSize,
  setFontSize,
}) => {
  const languages = [
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
  ];
  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
    { value: "GitHub", label: "GitHub" },
    { value: "solarized-dark", label: "Solarized-dark" },
  ];

  // const [isOpen, setIsOpen] = useState(false);

  // const toggleWindow = () => {
  //   setIsOpen(!isOpen);
  // };
  // const [isOpen2, setIsOpen2] = useState(false);

  // const toggleWindow2 = () => {
  //   setIsOpen2(!isOpen2);
  // };
  // const [isOpen3, setIsOpen3] = useState(false);

  // const toggleWindow3 = () => {
  //   setIsOpen3(!isOpen3);
  // };
  // const [isOpen4, setIsOpen4] = useState(false);

  // const toggleWindow4 = () => {
  //   setIsOpen4(!isOpen4);
  // };

  return (
    <div className="navbar">
      <div className="leftSide">
        <Link to="/">
          <img src={LogoWhiteText} alt="logo"></img>
        </Link>
      </div>
      <Select
        className="select-lang-comp"
        options={languages}
        value={userLang}
        onChange={(e) => setUserLang(e.value)}
        placeholder={userLang}
      />
      <Select
        options={themes}
        value={userTheme}
        onChange={(e) => setUserTheme(e.value)}
        placeholder={userTheme}
      />

      <Chatbot />
      <Tabs />
    </div>
  );
};

export default NavBarrr;
