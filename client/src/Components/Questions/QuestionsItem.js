import classes from "./QuestionsItem.module.css";
import Card from "./Card";

function QuestionsItem(props) {
  return (
    // {{props.id='GREEN'}?(
    <Card>
      <div className={classes.titles}>
        <h2>{props.title}</h2>
      </div>
    </Card>
    //    ):null}
  );
}
export default QuestionsItem;
