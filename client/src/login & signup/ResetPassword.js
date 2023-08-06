import "./ResetPassword.css";
import React, { useState } from "react";
import LogoWhiteText from "../assets/LogoWhiteText.png";
import code from "../assets/code.png";
import Footer from "../UI/Footer";
import ResetPasswordForm from "./ResetPasswordForm";

function ResetPassword(props) {
  return (
    <div>
      <img className="logo" src={LogoWhiteText} alt="Logo" />
      <div className="login">
        <img src={code} alt="Code" />
        {/* <ForgetPwdForm onSubmitedd={saveLogin} />{" "} */}
        <ResetPasswordForm />
      </div>
      <Footer />
    </div>
  );
}
export default ResetPassword;
