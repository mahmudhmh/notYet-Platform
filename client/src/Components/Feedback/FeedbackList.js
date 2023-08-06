import classes from "./FeedbackList.module.css";
import FeedbackItem from "./FeedbackItem";

function FeedbackList(props) {
  return (
    <div className={classes.list}>
      {props.features.map((feature) => (
        <FeedbackItem
          key={feature.id}
          id={feature.id}
          name={feature.name}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
}
export default FeedbackList;
