import classes from "./TeamItem.module.css";
import Card from "./Card";

function TeamItem(props) {
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.images}>
          <img src={props.image} alt={props.id} />
        </div>
        <div className={classes.titles}>
          <h2>{props.title}</h2>
          <p>_________________</p>
        </div>
        <div className={classes.contents}>
          <h3>{props.description}</h3>
        </div>
        <div className={classes.link}>
          <a href={props.github}>Github Profile</a>
        </div>
      </Card>
    </li>
  );
}
export default TeamItem;
