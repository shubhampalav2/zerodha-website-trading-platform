const { Server } = require("socket.io");
const { getPriceSnapshot, startPriceSimulator } = require("../services/priceSimulator");

function initializeSocket(httpServer) {
    const io = new Server(httpServer, { cors: { origin: true, credentials: true } });
    io.on("connection", (socket) => {
        socket.emit("prices:initial", getPriceSnapshot());
        socket.on("disconnect", () => console.log(`Price client disconnected: ${socket.id}`));
    });
    startPriceSimulator((snapshot) => io.emit("prices:update", snapshot));
    return io;
}

module.exports = { initializeSocket };
