import { Server } from "socket.io";
import http from "http";
import express from "express";
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const onlineUsers = {};
export const getReciverSocketId = (reciverId) => {
  return onlineUsers[reciverId];
};
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    onlineUsers[userId] = socket.id;
  }
  //emit use to send event to all connected clients
  io.emit("getOnlineUsers", Object.keys(onlineUsers));

  // to delete
  socket.on("disconnect", (socket) => {
    delete onlineUsers[userId];

    io.emit("getOnlineUsers", Object.keys(onlineUsers));
    console.log("user connect", socket);
  });
});
export { app, io, server };
