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
const userSockeMap = {};
export const getReciverSocketId = (reciverId) => {
  return userSockeMap[reciverId];
};
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSockeMap[userId] = socket.id;
  }
  //emit use to send event to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSockeMap));
  // to delete
  socket.on("disconnect", (socket) => {
    delete userSockeMap[userId];
    console.log(userSockeMap, "disconne roma");
    io.emit("getOnlineUsers", Object.keys(userSockeMap));
    console.log("user connect", socket);
  });
});
io.on("disconnect", (socket) => {
  delete userSockeMap[userId];
  console.log(userSockeMap, "disconne roma");
  io.emit("getOnlineUsers", Object.keys(userSockeMap));
  console.log("user connect", socket);
});
export { app, io, server };
