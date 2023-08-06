import classes from "./FeatureList.module.css";
import FeaturesItem from "./FeatureItem";

function FeatureList(props) {
  return (
    <div className={classes.list}>
      {props.features.map((feature) => (
        <FeaturesItem
          key={feature.id}
          id={feature.id}
          image={feature.image}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
}
export default FeatureList;
