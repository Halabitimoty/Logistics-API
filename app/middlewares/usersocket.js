const { iosocketmiddleware } = require("./iosocket");

const usersocket = (socket, next) => {
  const token = socket.request.headers.auth;

  const { error, user } = iosocketmiddleware(token);

  if (error)
    return socket.emit({
      error: error,
      message: "an error occurred while trying to authenticate",
    });

  socket.request.userdetails = user;

  next();
};

module.exports = { usersocket };
