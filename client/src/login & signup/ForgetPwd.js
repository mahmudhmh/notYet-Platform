import "./ForgetPwd.css";
import React, { useState } from "react";
import LogoWhiteText from "../assets/LogoWhiteText.png";
import code from "../assets/code.png";
import Footer from "../UI/Footer";
import { Link } from "react-router-dom";
import ForgetPwdForm from "./ForgetPwdForm";

function ForgetPwd(props) {
  return (
    <div>
      <img className="logo" src={LogoWhiteText} alt="Logo" />
      <div className="login">
        <img src={code} alt="Code" />
        {/* <ForgetPwdForm onSubmitedd={saveLogin} />{" "} */}
        <ForgetPwdForm />
      </div>
      <Footer />
    </div>
  );
}
export default ForgetPwd;
