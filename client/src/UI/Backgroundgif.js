import Giphy from "../assets/giphy.gif";

function Backgroundgif() {
  return (
    <img
      style={{
        width: "65%",
        height: "120%",
        position: "absolute",
        zIndex: "-1",
        float: "right",
        marginLeft: "34%",
      }}
      src={Giphy}
      alt=""
    />
  );
}
export default Backgroundgif;
