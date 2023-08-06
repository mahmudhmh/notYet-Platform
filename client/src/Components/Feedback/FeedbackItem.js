import classes from "./FeedbackItem.module.css";
import Card from "./Card";

function FeedbackItem(props) {
  return (
    <li className={classes.item}>
      <Card>
        {/* <div className={classes.images}>
          <img src={props.image} alt={props.id} />
        </div> */}
        <div className={classes.titles}>
          <h2>{props.name}</h2>
          <h2>{props.title}</h2>
          <p>_________________</p>
        </div>
        <div className={classes.contents}>
          <h3>{props.description}</h3>
        </div>
      </Card>
    </li>
  );
}

export default FeedbackItem;
