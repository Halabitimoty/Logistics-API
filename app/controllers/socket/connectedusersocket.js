const {
  connectedusercollection,
} = require("../../schemas/connecteduserschema");

const { usercollection } = require("../../schemas/user.schema");

const connecteduser = async (socket) => {
  const socketId = socket.id;
  const userdetails = socket.request.userdetails;

  const user = await connectedusercollection.create({
    userId: userdetails.userid,
    socketId,
  });
};

const onlineuser = async (socket) => {
  const userdetails = socket.request.userdetails;
  const onlineUser = await usercollection.findById(userdetails.userid);

  socket.broadcast.emit("user-online", `${onlineUser.fullname} is online`);
};

const sendmessage = (socket) => {
  socket.on("send-message", (payload, callback) => {
    console.log(payload);
    socket.to(payload.sendTo).emit("new-message", {
      message: payload.message,
    });
    callback({
      successful: true,
      message: "Sent Successfully",
    });
  });
};

const disconnecteduser = async (socket) => {
  const socketId = socket.id;

  await connectedusercollection.findOneAndDelete({
    socketId,
  });
};
module.exports = { connecteduser, onlineuser, sendmessage, disconnecteduser };
