const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const { Server } = require("socket.io");
const { createServer } = require("node:http");

require("dotenv").config();

const app = express();
const httpserver = createServer(app);
const io = new Server(httpserver);

const port = process.env.PORT || 3000;
const database = mongoose.connect(process.env.MONGO_DB_URL);

const authroute = require("./app/routes/auth.route");
const { usersocket } = require("./app/middlewares/middleware");

database
  .then(() => {
    console.log("database-connected");
  })
  .catch((error) => {
    console.log("database-not-connected");
  });

app.use(
  cors({
    origin: "*",
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/v1/auth", authroute);
io.use(usersocket);

app.get("/", (req, res) => {
  res.send("Logistic API");
});

httpserver.listen(port, () => {
  console.log(`Logistic API url =>> http://localhost:${port}`);
});
