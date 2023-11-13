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
const { servicecollection } = require("./app/schemas/service.schema");
const {
  serviceval,
  shippingval,
} = require("./app/schemas/joischema/auth.schema.val");

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
  const userdetails = socket.request.userdetails;

  connecteduser(socket);
  sendmessage(socket);
  socket.on("requestshipping", async (message, callback) => {
    try {
      const {
        address,
        destaddress,
        itemweight,
        shippingcost,
        shippingrequest,
      } = message;

      await serviceval.validateAsync({
        address,
        destaddress,
        itemweight,
        shippingcost,
        shippingrequest,
      });

      await servicecollection.create({
        customerId: userdetails.userid,
        address,
        destaddress,
        itemweight,
        shippingcost,
        shippingrequest,
      });
      callback("sent");
    } catch (error) {
      console.log("shipping request internal server error.");
    }
  });

  socket.on("shippingupdate", async (message, callback) => {
    try {
      const { shippingrequest, shippingId } = message;

      await shippingval.validateAsync({ shippingrequest });
      const riderId = userdetails.userid;

      const usersshippings = await servicecollection.find({
        _id: shippingId,
      });

      const allusersockets = await connectedusercollection.find({
        userId: usersshippings[0].customerId,
      });

      await servicecollection.findByIdAndUpdate(
        { _id: shippingId },
        {
          shippingrequest,
          riderId,
        }
      );
      const allsocketsemit = allusersockets.map((socketId) => {
        return socketId.socketId;
      });

      socket.to(allsocketsemit).emit("status", {
        message: "ordered updated or delivered",
      });

      callback("updated");
    } catch (error) {
      console.log("shipping update internal server error.");
    }
  });

  socket.on("customer-shippings", async ({}, callback) => {
    try {
      const data = await servicecollection.find({
        customerId: userdetails.userid,
      });
      callback(data);
    } catch (error) {
      console.log("customer shippings internal server error.");
    }
  });

  socket.on("rider-notification", async ({}, callback) => {
    try {
      const data = await servicecollection.find({
        customerId: riderId.userid,
      });
      callback(data);
    } catch (error) {
      console.log("rider notification internal server error.");
    }
  });

  socket.on("disconnect", async () => {
    const data = await connectedusercollection.findOneAndDelete({
      socketId: id,
    });
  });
});

httpserver.listen(port, () => {
  console.log(`Logistic API url =>> http://localhost:${port}`);
});
