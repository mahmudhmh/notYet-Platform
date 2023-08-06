import "./Questions.css";

function QuestionsHome() {
  return (
    <div className="container">
      <div className="column">
        <div className="purple">
          <p className="text">STACK</p>
        </div>
        <div className="blue">
          <p className="text">Queue</p>
        </div>
        <div className="green">
          <p className="text">Array</p>
        </div>
        <div className="blue">
          <p className="text">LinkedList</p>
        </div>
      </div>
      <div className="column">
        <div className="blue">
          <p className="text">DLL</p>
        </div>
        <div className="green">
          <p className="text">Dynamic Programming</p>
        </div>
        <div className="purple">
          <p className="text">Binary Search</p>
        </div>
        <div className="green">
          <p className="text">Greedy</p>
        </div>
      </div>
      <div className="column">
        <div className="green">
          <p className="text">Sorting</p>
        </div>
        <div className="purple">
          <p className="text">Tree</p>
        </div>
        <div className="blue">
          <p className="text">Graph</p>
        </div>
        <div className="purple">
          <p className="text">Bit Manipulation</p>
        </div>
      </div>
    </div>
  );
}

export default QuestionsHome;
