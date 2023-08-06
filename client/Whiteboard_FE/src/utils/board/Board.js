import React from "react";
import "./Board.css";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

class Board extends React.Component {
  timeout;
  socket = io.connect("http://localhost:5000");
  ctx;
  isDrawing = false;

  constructor(props) {
    super(props);
    this.state = {
      sketchData: "",
      penColor: "black", // Default pen color is black
    };

    this.socket.on("canvas-data", (data) => {
      var root = this;
      var interval = setInterval(function () {
        if (root.isDrawing) return;
        root.isDrawing = true;
        clearInterval(interval);
        var image = new Image();
        var canvas = document.querySelector("#board");
        var ctx = canvas.getContext("2d");
        image.onload = function () {
          ctx.drawImage(image, 0, 0);
          root.isDrawing = false;
        };
        image.src = data;
      }, 200);
    });

    this.socket.on("reset-board", () => {
      this.resetBoard();
    });
  }

  componentDidMount() {
    this.drawOnCanvas();
    this.fetchSketchDataFromDB();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  fetchSketchDataFromDB() {
    fetch("http://localhost:5000/drawing/sketchData")
      .then((response) => response.json())
      .then((sketchData) => {
        this.setState({ sketchData });
        const currentSketchId = sketchData._id;
        console.log(currentSketchId);
      })
      .catch((error) => {
        console.log("Error fetching sketch data:", error);
      });
  }

  sendCanvasDataToServer = (data) => {
    this.socket.emit("canvas-data", data);
  };

  resetBoard = () => {
    var canvas = document.querySelector("#board");
    var ctx = canvas.getContext("2d");

    // Clear the canvas by drawing a white rectangle
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Send the blank canvas data to the server
    var blankCanvasData = canvas.toDataURL("image/png");
    this.sendCanvasDataToServer(blankCanvasData);
  };

  drawOnCanvas() {
    var canvas = document.querySelector("#board");
    this.ctx = canvas.getContext("2d");
    var ctx = this.ctx;

    var sketch = document.querySelector("#sketch");
    var sketch_style = getComputedStyle(sketch);

    canvas.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas.height = parseInt(sketch_style.getPropertyValue("height"));

    var mouse = { x: 0, y: 0 };
    var last_mouse = { x: 0, y: 0 };

    /* Mouse Capturing Work */
    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    /* Drawing on Paint App */
    ctx.lineWidth = this.props.size;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    // Update the strokeStyle based on the current penColor state
    ctx.strokeStyle = this.state.penColor;

    const onPaint = () => {
      ctx.beginPath();
      ctx.moveTo(last_mouse.x, last_mouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      // Update the strokeStyle based on the current penColor state
      ctx.strokeStyle = this.state.penColor;
      ctx.stroke();

      if (this.timeout != undefined) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        var base64ImageData = canvas.toDataURL("image/png");
        this.sendCanvasDataToServer(base64ImageData);
      }, 1000);
    };

    canvas.addEventListener(
      "mousedown",
      function (e) {
        canvas.addEventListener("mousemove", onPaint, false);
      },
      false
    );

    canvas.addEventListener(
      "mouseup",
      () => {
        canvas.removeEventListener("mousemove", onPaint, false);
        const base64ImageData = canvas.toDataURL("image/png");
        this.sendCanvasDataToServer(base64ImageData);
      },
      false
    );
  }

  changePenColor = (color) => {
    console.log("Changing pen color:", color);
    this.setState({ penColor: color });
  };

  render() {
    const colorButtons = [
      { color: "red", label: "Red" },
      { color: "violet", label: "Violet" },
      { color: "blue", label: "Blue" },
      { color: "black", label: "Black" },
      { color: "green", label: "Green" },
      { color: "yellow", label: "Yellow" },
      { color: "purple", label: "Purple" },
      { color: "orange", label: "Orange" },
      { color: "pink", label: "Pink" },
      { color: "brown", label: "Brown" },
      { color: "gray", label: "Gray" },
      { color: "magenta", label: "Magenta" },
      { color: "navy", label: "Navy" },
    ];

    return (
      <div className="sketch" id="sketch">
        <canvas className="board" id="board"></canvas>
        <button onClick={this.resetBoard} className="reset-button">
          <FontAwesomeIcon icon={faUndo} />
        </button>
        {colorButtons.map((button) => (
          <button
            key={button.color}
            className={`button ${button.color} ${
              this.state.penColor === button.color ? "selected" : ""
            }`}
            onClick={() => this.changePenColor(button.color)}
            title={button.label}
          ></button>
        ))}
      </div>
    );
  }
}

export default Board;
