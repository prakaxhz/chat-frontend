/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL 
  ? import.meta.env.VITE_API_BASE_URL.replace('/api/v1', '') 
  : 'http://localhost:3000';

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { isAuthenticated, isInitialized } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      const newSocket = io(SOCKET_URL, {
        withCredentials: true,
        transports: ['websocket', 'polling']
      });

      newSocket.on('connect', () => {
        console.log('🟢 Socket connected successfully:', newSocket.id);
      });

      newSocket.on('disconnect', (reason) => {
        console.log('🔴 Socket disconnected:', reason);
      });

      newSocket.on('connect_error', (error) => {
        console.error('❌ Socket connection error:', error.message);
      });

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    } else if (!isAuthenticated && socket) {
      socket.disconnect();
      setSocket(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isInitialized]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

