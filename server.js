const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let viewerCount = 0;

io.on("connection", (socket) => {
    viewerCount++;
    io.emit("updateViewerCount", viewerCount);

    socket.on("disconnect", () => {
        viewerCount--;
        io.emit("updateViewerCount", viewerCount);
    });
});

app.use(express.static("public")); // Serve frontend files

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
