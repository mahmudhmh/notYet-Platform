import classes from "./Questions.module.css";
import QuestionsList from "./QuestionsList";

function Questions(props) {
  const Questions_Data1 = [
    {
      id: "1",
      title: "What is a Frontend Developer?",
    },
    {
      id: "2",
      title: "What is a Backend Developer?",
    },
    {
      id: "3",
      title: "What is a Full Stack Developer?",
    },
    {
      id: "4",
      title: "What is a DevOps Engineer?",
    },
  ];
  const Questions_Data2 = [
    {
      id: "5",
      title: "What is a Frontend Developer?",
    },
    {
      id: "6",
      title: "What is a Backend Developer?",
    },
    {
      id: "7",
      title: "What is a Full Stack Developer?",
    },
    {
      id: "8",
      title: "What is a DevOps Engineer?",
    },
  ];
  const Questions_Data3 = [
    {
      id: "9",
      title: "What is a Frontend Developer?",
    },
    {
      id: "10",
      title: "What is a Backend Developer?",
    },
    {
      id: "11",
      title: "What is a Full Stack Developer?",
    },
    {
      id: "12",
      title: "What is a DevOps Engineer?",
    },
  ];

  return (
    <section>
      <div className={classes.left}>
        <QuestionsList questions={Questions_Data1} />
      </div>
      <div className={classes.center}>
        <QuestionsList questions={Questions_Data2} />
      </div>
      <div className={classes.right}>
        <QuestionsList questions={Questions_Data3} />
      </div>
    </section>
  );
}
export default Questions;
