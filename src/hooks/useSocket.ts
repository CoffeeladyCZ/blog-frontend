import useWebSocket, { ReadyState } from 'react-use-websocket';

const socketUrl = import.meta.env.VITE_APP_SOCKET_URL;

export function useSocket() {
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  return {
    sendMessage,
    lastMessage,
    readyState
  };
}