import Header from "../../UI/Header";
import Footer from "../../UI/Footer";
import Backgroundgif from "../../UI/Backgroundgif";
import classes from "./Content.module.css";
import One from "../../assets/Icons/One.png";
import Two from "../../assets/Icons/Two.png";
import Three from "../../assets/Icons/Three.png";
import { Link } from "react-router-dom";
function Content() {
  return (
    <div>
      <Header />
      <div>
        <Backgroundgif />
      </div>
      <div className={classes.first}>
        <div className={classes.content1}>
          <h1>Roadmaps</h1>
          <p className={classes.line1}>_________________________</p>
        </div>
      </div>
      <div className={classes.displaycards}>
        <div className={classes.roadmap1}>
          <h3>Comperhensive Roadmaps</h3>
        </div>
        <div className={classes.card1f}>
          <Link to="/content/15 days">
            <div className={classes.card1}>
              <img src={One} alt="one" />
            </div>
            <h1 className="text">!YET 15 Days</h1>
          </Link>
        </div>

        <div className={classes.card2f}>
          <Link to="/content/ds">
            <div className={classes.card2}>
              <img src={Two} alt="two" />
            </div>
            <h1 className="text">!YET Data Structure</h1>
          </Link>
        </div>

        <div className={classes.card3f}>
          <Link to="/content/iq">
            <div className={classes.card3}>
              <img src={Three} alt="one" />
            </div>
            <h1 className="text">!YET Interview Questions</h1>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Content;
