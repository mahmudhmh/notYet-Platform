import "./BackgroundColor.css";
function BackgroundColor(props) {
  return <div className="backdrop" onClick={props.onClick} />;
}

export default BackgroundColor;
