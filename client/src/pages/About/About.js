import Header from "../../UI/Header";
import Backgroundgif from "../../UI/Backgroundgif";
import classes from "./About.module.css";
import Button from "../../UI/Button";
import { Link } from "react-router-dom";
import Footer from "../../UI/Footer";
import matrix from "../../assets/matrix.png";
function About() {
  return (
    <div>
      <Header />
      <div>
        <Backgroundgif />
      </div>
      <div>
        <div className={classes.header1}>
          <h1>About Us</h1>
          <p className={classes.line}>______________________</p>
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
          <Link to="/login">
            <Button>Join !YET</Button>
          </Link>
        </div>

        <div className={classes.header2}>
          <h1>Motivation</h1>
          <p className={classes.line}>___________________</p>
          <div className={classes.conatiner}>
            <p className={classes.text}>
              Learning to program isnot an overnight journey, but it can be
              streamlined and made more exciting with the right approach.
              Competitive Programming is the best way to get noticed by top
              product-based companies. With Not Yet, you will learn in an
              interactive environment that provides hands-on programming
              theories and competitive programming. Despite the large number of
              platforms at the present time, there is still a major lacks in
              terms of team working, guidance and generating solutions.
            </p>
          </div>
        </div>
        <div className={classes.header3}>
          <h1>Problem Statment</h1>
          <p className={classes.line}>________________________________</p>
          <div className={classes.conatiner}>
            <p className={classes.text}>
              <ul>
                <li> Finding roadmaps</li>
                <li> Finding organized topics </li>
                <li> Lack of Team working </li>
                <li> Lack of team members evaluation</li>
                <li> Absence of level evaluation</li>
                <li> Struggling with technical interviews preparation</li>
              </ul>
            </p>
          </div>
        </div>
        <div className={classes.header4}>
          <h1>Our Competitors </h1>
          <p className={classes.line}>___________________________________</p>
          <img src={matrix} alt="" />
        </div>
        <Footer />
      </div>
    </div>
  );
}
export default About;
