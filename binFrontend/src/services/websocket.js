<<<<<<< HEAD
import { io } from 'socket.io-client';

let socket_client = null;

export const connect = (token, onConnect, onError) => {
  const ws_url = import.meta.env.VITE_WS_URL || 'http://localhost:5000';

  if (socket_client) {
    socket_client.disconnect();
  }

  socket_client = io(ws_url, {
    auth: token ? { token: `Bearer ${token}` } : {},
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000
  });

  socket_client.on('connect', () => {
    if (onConnect) onConnect();
  });

  socket_client.on('connect_error', (error) => {
    if (onError) onError(error);
  });

  return socket_client;
};

export const subscribe = (event_name, callback) => {
  if (!socket_client) {
    return () => {};
  }

  socket_client.on(event_name, callback);

  return () => {
    if (socket_client) {
      socket_client.off(event_name, callback);
    }
  };
};

export const disconnect = () => {
  if (socket_client) {
    socket_client.disconnect();
    socket_client = null;
  }
};

export const getClient = () => socket_client;
=======
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

export const connect = (token, onConnect, onError) => {
  const wsUrl = import.meta.env.VITE_WS_URL || 'http://localhost:8080/ws';
  
  stompClient = new Client({
    webSocketFactory: () => new SockJS(wsUrl),
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    debug: (str) => {
      console.log('STOMP: ' + str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: () => {
      console.log('WebSocket Connected');
      if (onConnect) onConnect();
    },
    onStompError: (frame) => {
      console.error('STOMP error:', frame);
      if (onError) onError(frame);
    },
  });

  stompClient.activate();
  return stompClient;
};

export const subscribe = (topic, callback) => {
  if (stompClient && stompClient.connected) {
    return stompClient.subscribe(topic, (message) => {
      const data = JSON.parse(message.body);
      callback(data);
    });
  }
  return null;
};

export const disconnect = () => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
  }
};

export const getClient = () => stompClient;
>>>>>>> a370dd646ee6c7c0d95edc771f031057615feaf6
