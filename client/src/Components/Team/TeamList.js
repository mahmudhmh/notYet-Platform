import classes from "./TeamList.module.css";
import TeamItem from "./TeamItem";

function TeamList(props) {
  return (
    <div className={classes.list}>
      {props.features.map((feature) => (
        <TeamItem
          key={feature.id}
          id={feature.id}
          image={feature.image}
          title={feature.title}
          description={feature.description}
          github={feature.github}
        />
      ))}
    </div>
  );
}
export default TeamList;
