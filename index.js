const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const { join } = require("node:path");

require("dotenv").config();

const app = express();
const httpserver = createServer(app);
const io = new Server(httpserver);

const port = process.env.PORT || 3000;
const database = mongoose.connect(process.env.MONGO_DB_URL);

const authroute = require("./app/routes/auth.route");
const { usersocket } = require("./app/middlewares/usersocket");
const {
  connecteduser,
  sendmessage,
} = require("./app/controllers/socket/connectedusersocket");
const {
  connectedusercollection,
} = require("./app/schemas/connecteduserschema");

database
  .then(() => {
    console.log("database-connected");
  })
  .catch((error) => {
    console.log("database-not-connected");
  });

app.use(
  cors({
    origin: "http://localhost:3002",
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/v1/auth", authroute);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "frontend/index.html"));
});

io.use(usersocket);
io.on("connection", async (socket) => {
  const id = socket.id;
  connecteduser(socket);
  sendmessage(socket);

  socket.on("disconnect", async () => {
    await connectedusercollection.findOneAndDelete({
      socketId: id,
    });
  });
});

httpserver.listen(port, () => {
  console.log(`Logistic API url =>> http://localhost:${port}`);
});
