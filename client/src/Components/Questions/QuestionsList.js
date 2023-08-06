import QuestionsItem from "./QuestionsItem";
import classes from "./QuestionsList.module.css";

function QuestionsList(props) {
  return (
    <div className={classes.list}>
      {props.questions.map((question) => (
        <QuestionsItem id={question.id} title={question.title} />
      ))}
    </div>
  );
}
export default QuestionsList;
