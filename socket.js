
export default function setupSocket(io) {
    io.on("connection", (socket) => {
      console.log('A user is connected');
      
      socket.on("disconnect", () => {
        console.log('User disconnected');
      });
    });
  }