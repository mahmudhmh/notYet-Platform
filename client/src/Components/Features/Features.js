import FeatureList from "./FeatureList";
import classes from "./Features.module.css";
import coworking from "../../assets/coworking.png";
import monitor from "../../assets/monitor.png";
import questionmark from "../../assets/question-mark.png";
import videocall from "../../assets/video-call.png";
import roadmap from "../../assets/roadmap.png";
import languages from "../../assets/coding-language.png";
import check from "../../assets/check-list.png";
import conversation from "../../assets/conversation.png";
import platform from "../../assets/platform.png";

function Features(props) {
  const Features_Data1 = [
    {
      id: "1",
      title: "question-mark",
      image: questionmark,
      description:
        "Coding Interview Preparation with Teamwork that many candidates can lose jobs because they can't solve the Technical Assessment. So we picked +100 Questions of the best coding Interviews Questions to Prepare you for every interview you could encounter.",
    },
    {
      id: "2",
      title: "languages",
      image: languages,
      description:
        "Not Yet Help other people that can't Speak the Same programming language. All of the Solutions in 5 Different language : JavaScript, C, C++, Python, Java and more which will allow all people to Solve and contribute in our Platform.",
    },
    {
      id: "3",
      title: "check",
      image: check,
      description:
        "Real Coding Interviews are Times and have more than a question. we provide the coding assessment to reflect the real coding interview  environment and evaluate them to carry out a suggested roadmap for each user.",
    },
  ];
  const Features_Data2 = [
    {
      id: "4",
      title: "videocall",
      image: videocall,
      description:
        "Algorithms are tough to Understand and learn so for each question we provides a Explanation Video that can help the users to understand more about the Algorithms. That's over than 125 hours of Content. all yours and in your hand to help  you more in understanding.",
    },
    {
      id: "5",
      title: "coworking",
      image: coworking,
      description:
        "By Coding out the solution of the algorithm problems is the best way to practice. Our Coding workspace allows you to type out the answers and run them with the help of whiteboard you can draw and illustrate the analysis of the algorithmand run them against the test cases. all in one.",
    },
    {
      id: "6",
      title: "conversation",
      image: conversation,
      description:
        "Nothing is compared to deal with a real coding interview questions. we let you to have access to previous interviews questions provided by the big companies on shared Workspace to discuss your answer.",
    },
  ];
  const Features_Data3 = [
    {
      id: "7",
      title: "roadmap",
      image: roadmap,
      description:
        "We Provide more than a Roadmap for every candidates that suites his level of Experience Provided with the help of one of the best Problem solvers and coaches in Middle East Coach Mohamed Abd Elwahab The Co-Founder of Coach Academy",
    },
    {
      id: "8",
      title: "monitor",
      image: monitor,
      description:
        "Understanding how much memory an Algorithm uses and how fast it run under any circumstances to pass the coding interview. all our solutions provide Runtime Complexity and Space Complexity for algorithms.",
    },
    {
      id: "9",
      title: "platform",
      image: platform,
      description:
        "All In One Platform helps you to have the ability to see, read, run, discuss all the algorithms problems that may face you in your career as Software Engineer.",
    },
  ];
  return (
    <section>
      <div className={classes.left}>
        <FeatureList features={Features_Data1} />
      </div>{" "}
      <div className={classes.center}>
        <FeatureList features={Features_Data2} />
      </div>{" "}
      <div className={classes.right}>
        <FeatureList features={Features_Data3} />
      </div>
    </section>
  );
}
export default Features;
