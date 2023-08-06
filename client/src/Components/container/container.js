import React from "react";
import Board from "../board/Board";
import "./container.css";
class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="board-container">
          <Board></Board>
        </div>
      </div>
    );
  }
}
export default Container;
