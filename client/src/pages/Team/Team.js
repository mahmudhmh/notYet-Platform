import Header from "../../UI/Header";
import Button from "../../UI/Button";
import classes from "./Team.module.css";
import { Link } from "react-router-dom";
import Members from "../../Components/Team/Members";
import Footer from "../../UI/Footer";
import Backgroundgif from "../../UI/Backgroundgif";

function Team() {
  return (
    <div>
      <Header />
      <div>
        <Backgroundgif />
      </div>
      <div>
        <div className={classes.TeamM1}>
          <h1>We Love Problem Solving</h1>
          <div className={classes.text}>
            <p>
              As we saw that the problem solving is a mandatory thing to learn
              in a computer Science field.
            </p>
            <p>
              We tried our best to provide what is really will help students in
              the field
            </p>
          </div>
          <Link to="/login">
            <Button>Join !YET</Button>
          </Link>
        </div>

        <div className={classes.TeamM2}>
          <h1>Our Team</h1>
          <p>Software Industry and Multimedia Students</p>
          <Members />
        </div>
        <Footer />
      </div>
    </div>
  );
}
export default Team;
