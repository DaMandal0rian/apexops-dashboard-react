import { useState, useEffect, useRef } from 'react';
import { WebSocketClient } from '@/lib/websocket-client';

interface WebSocketMessage {
  type: string;
  data?: any;
  message?: string;
}

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const clientRef = useRef<WebSocketClient | null>(null);

  useEffect(() => {
    if (!clientRef.current) {
      clientRef.current = new WebSocketClient();
      
      clientRef.current.onConnect(() => {
        setIsConnected(true);
        console.log('WebSocket connected');
      });

      clientRef.current.onDisconnect(() => {
        setIsConnected(false);
        console.log('WebSocket disconnected');
      });

      clientRef.current.onMessage((message: WebSocketMessage) => {
        setLastMessage(message);
      });

      clientRef.current.connect();
    }

    return () => {
      if (clientRef.current) {
        clientRef.current.disconnect();
        clientRef.current = null;
      }
    };
  }, []);

  const sendMessage = (message: any) => {
    if (clientRef.current && isConnected) {
      clientRef.current.send(message);
    }
  };

  return {
    isConnected,
    lastMessage,
    sendMessage,
  };
}
