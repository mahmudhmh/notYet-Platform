import classes from "./member.module.css";
import TeamList from "./TeamList";
import coworking from "../../assets/coworking.png";
import questionmark from "../../assets/question-mark.png";
import videocall from "../../assets/video-call.png";
import languages from "../../assets/coding-language.png";
import check from "../../assets/check-list.png";
import conversation from "../../assets/conversation.png";
import platform from "../../assets/platform.png";
import roadmap from "../../assets/roadmap.png";
import monitor from "../../assets/monitor.png";
import HIM from "../../assets/HIM.png";
import Huissen from "../../assets/Huissen.png";
import Rabeh from "../../assets/Rabeh.png";

function Members(props) {
  const members1 = [
    {
      id: "1",
      title: "Omar Anan Abou-Romia",
      image: HIM,
      description:
        "A Student Who Seek for having a career and gain a knowledge and experinece as much a possible . Hard Worker and Eager to learn , I would like to take responsibiliity of any task and have a very good Leadership skills",
      github: "https://github.com/omar3anan",
    },
    {
      id: "2",
      title: "Shrkawy",
      image: languages,
      description:
        "A Student Who Seek for having a career and gain a knowledge and experinece as much a possible . Hard Worker and Eager to learn , I would like to take responsibiliity of any task and have a very good Leadership skills",
      github: "Github Profile",
    },
  ];
  const members2 = [
    {
      id: "4",
      title: "Mahmoud Huissen Mahmoud",
      image: Huissen,
      description:
        "A Student Who Seek for having a career and gain a knowledge and experinece as much a possible . Hard Worker and Eager to learn , I would like to take responsibiliity of any task and have a very good Leadership skills",
      github: "https://github.com/mahmudhmh",
    },
    {
      id: "5",
      title: "nayera",
      image: coworking,
      description:
        "A Student Who Seek for having a career and gain a knowledge and experinece as much a possible . Hard Worker and Eager to learn , I would like to take responsibiliity of any task and have a very good Leadership skills",
      github: "Github",
    },
  ];
  const members3 = [
    {
      id: "7",
      title: "Rabeh Mohammed Abdelfattah",
      image: Rabeh,
      description:
        "A Student Who Seek for having a career and gain a knowledge and experinece as much a possible . Hard Worker and Eager to learn , I would like to take responsibiliity of any task and have a very good Leadership skills",
      github: "https://github.com/rabehmohamed",
    },
    {
      id: "8",
      title: "jumana",
      image: monitor,
      description:
        "A Student Who Seek for having a career and gain a knowledge and experinece as much a possible . Hard Worker and Eager to learn , I would like to take responsibiliity of any task and have a very good Leadership skills",
      github: "Github",
    },
  ];

  return (
    <div>
      {" "}
      <section>
        <div className={classes.left}>
          <TeamList features={members1} />
        </div>{" "}
        <div className={classes.center}>
          <TeamList features={members2} />
        </div>{" "}
        <div className={classes.right}>
          <TeamList features={members3} />
        </div>
      </section>
    </div>
  );
}

export default Members;
