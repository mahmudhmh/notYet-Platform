import React from "react";
import Backgroundgif from "../../UI/Backgroundgif";
import "./ContactUs.css";
import LogoWhiteText from "../../assets/LogoWhiteText.png";
import LogoBlackText from "../../assets/LogoBlackText.png";
import ContactUsForm from "./ContactUsForm";
import Footer from "../../UI/Footer";
import Header from "../../UI/Header";
function ContactUs(props) {
  function saveDataa(enteredInformation) {
    const SubmitedDate = {
      ...enteredInformation, //el data el gya mn ExpensesForm
      id: Math.random().toString(), //zawdetlha ID
    };
    props.OnSubmitTest(SubmitedDate);
  }
  return (
    <div>
      <Header />
      <Backgroundgif />

      <img className="logo" src={LogoWhiteText}></img>
      <div className="signup">
        <img className="logo" src={LogoBlackText}></img>
        <ContactUsForm onSubmitedd={saveDataa} />
      </div>
      <Footer />
    </div>
  );
}
export default ContactUs;
