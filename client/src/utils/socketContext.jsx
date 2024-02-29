import { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";
// const prefix = "http://192.168.1.100:8080";
const prefix = "http://localhost:8080";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io(prefix), []);

  socket.on("connect", () => {
    console.log("user connected --->", socket.id);
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
