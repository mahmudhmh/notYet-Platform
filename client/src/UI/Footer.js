import classes from "./Footer.module.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className={classes.footer}>
      <p>
        ___________________________________________________________________________________
      </p>
      <Link to="/Contact US">
        {" "}
        <a> Contact Us </a> |
      </Link>
      <Link to="/FAQ">
        <a> FAQ </a> |
      </Link>
      <Link to="/Feedback">
        <a> Feedback </a> |
      </Link>
      <Link to="/Privacy and Policy">
        <a> Privacy & Policy </a>
      </Link>
    </div>
  );
}
export default Footer;
