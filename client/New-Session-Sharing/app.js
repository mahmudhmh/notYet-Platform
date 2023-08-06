const express = require("express");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const { Schema } = mongoose;
const app = express();
const port = 9000;

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB is connected successfully");
  });

const whiteboardSchema = new Schema({
  sessionId: String,
  data: String,
});

const Whiteboard = mongoose.model("whiteboard", whiteboardSchema);

app.get("/createSession", (req, res) => {
  const sessionId = uuidv4();
  console.log(`New session created with ID: ${sessionId}`);
  res.send(sessionId);
});

app.get("/", (req, res) => {
  const sessionKey = req.query.sessionKey;
  if (!sessionKey) {
    res.sendFile(path.join(__dirname, "index.html"));
  } else {
    res.redirect(`http://localhost:8000?sessionKey=${sessionKey}`);
  }
});

const server = require("http").createServer(app);
const io = require("socket.io")(server);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const MAX_USERS_PER_SESSION = 3;
let connectedUsers = {};

io.on("connection", (socket) => {
  const { sessionId } = socket.handshake.query;

  if (!sessionId || !isValidSession(sessionId)) {
    socket.emit("authentication_error", "Invalid session ID");
    socket.disconnect(true);
    return;
  }

  if (!connectedUsers[sessionId]) {
    connectedUsers[sessionId] = 0;
  }

  if (connectedUsers[sessionId] >= MAX_USERS_PER_SESSION) {
    socket.emit("authentication_error", "Session is full");
    socket.disconnect(true);
    return;
  }

  connectedUsers[sessionId]++;
  socket.join(sessionId);

  loadDrawingData(sessionId, (err, drawingData) => {
    if (err) {
      console.error(err);
    } else {
      socket.emit("canvas-data", drawingData);
    }
  });

  socket.on("disconnect", () => {
    connectedUsers[sessionId]--;
    socket.leave(sessionId);
  });

  socket.on("canvas-data", (data) => {
    io.to(sessionId).emit("canvas-data", data);

    saveDrawingData(sessionId, data, (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
});

function isValidSession(sessionId) {
  console.log("Validating session ID:", sessionId);

  const isValid = typeof sessionId === "string" && sessionId.trim().length > 0;

  console.log("Session ID validation result:", isValid);

  return isValid;
}

function loadDrawingData(sessionId, callback) {
  Whiteboard.findOne({ sessionId }, (err, drawing) => {
    if (err) {
      callback(err);
    } else if (drawing) {
      callback(null, drawing.data);
    } else {
      callback(null, null);
    }
  });
}

function saveDrawingData(sessionId, data, callback) {
  Whiteboard.findOneAndUpdate(
    { sessionId },
    { sessionId, data },
    { upsert: true },
    (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    }
  );
}
