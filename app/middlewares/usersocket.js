const usersocket = (socket, next) => {
  const token = socket.request.headers.auth;

  const { error, user } = ioAuthController(token);

  if (error)
    return socket.emit(
      "error",
      "an error occurred while trying to authenticate"
    );

  socket.request.userDetails = user;

  next();
};

module.exports = { usersocket };
