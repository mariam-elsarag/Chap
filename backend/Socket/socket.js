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

const activeUsersInRooms = {};
const onlineUsers = {};

function setUserActiveRoom(userId, roomId, socket) {
  const previousRoomId = activeUsersInRooms[userId];

  if (previousRoomId && previousRoomId !== roomId) {
    socket.leave(previousRoomId);
  }
  socket.join(roomId);
  activeUsersInRooms[userId] = roomId;
}

function clearUserActiveRoom(userId) {
  const roomId = activeUsersInRooms[userId];
  if (roomId) {
    const sockets = io.sockets.adapter.rooms.get(roomId);
    if (!sockets || sockets.size === 0) {
      delete activeUsersInRooms[userId];
    }
  }
}

export function isUserActiveInRoom(userId, roomId) {
  return activeUsersInRooms[userId] === roomId;
}

export const getReciverActiveId = (receiverId) =>
  activeUsersInRooms[receiverId];

function setOnlineUsers(userId, socket) {
  onlineUsers[userId] = socket.id;
}
function clearUserOnline(userId) {
  delete onlineUsers[userId];
}

export const getReciverSocketId = (receiverId) => onlineUsers[receiverId];

// handle connection
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    setOnlineUsers(userId, socket);
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  }

  socket.on("openRoom", (roomId) => {
    if (userId) {
      setUserActiveRoom(userId, roomId, socket);
    }
  });

  //  disconnect
  socket.on("disconnect", () => {
    clearUserOnline(userId);
    clearUserActiveRoom(userId);
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  });
});

export { app, io, server };
