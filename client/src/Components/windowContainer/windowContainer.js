import React from "react";
import Board from "../board/Board";
import "./windowContainer.css";
class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="window-container">
        <div className="window-board-container">
          <Board></Board>
        </div>
      </div>
    );
  }
}
export default Container;
