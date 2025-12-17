// lib/socket/webSocket.ts
let socket: WebSocket | null = null;
let reconnectTimeout: NodeJS.Timeout | null = null;

export const connectWebSocket = (onMessage?: (data: any) => void) => {
  if (typeof window === "undefined") return;

  let token: string | null = null;
  try {
    const userData = localStorage.getItem("userData");
    token = userData ? JSON.parse(userData).idToken : null;
  } catch (err) {
    console.error("Failed to parse userData from localStorage", err);
    return;
  }

  if (!token) return;
  if (socket && socket.readyState === WebSocket.OPEN) return socket;

  // const WS_URL = `wss://nnhkp72zd1.execute-api.us-east-2.amazonaws.com/staging/`;
  // socket = new WebSocket(WS_URL, token ? [`Bearer ${token}`] : []);
  const WS_URL = `wss://nnhkp72zd1.execute-api.us-east-2.amazonaws.com/staging?Authorization=${token}`;
  socket = new WebSocket(WS_URL);

  // socket.onopen = () => {
  //   console.log("✅ WebSocket connected");
  // };
  socket.onopen = () => socket?.send(JSON.stringify({ type: "auth", token }));

  socket.onmessage = (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      console.log("📩 Message received:", data);
      if (onMessage) onMessage(data); // ← call callback
    } catch (err) {
      console.warn("⚠️ Failed to parse WebSocket message:", event.data, err);
    }
  };

  socket.onerror = (error: Event) => {
    console.error("❌ WebSocket error", error);
    reconnect();
  };

  socket.onclose = (event: CloseEvent) => {
    console.warn("⚠️ WebSocket closed:", event.code, event.reason);
    reconnect();
  };

  return socket;
};

const reconnect = () => {
  if (reconnectTimeout) return;

  reconnectTimeout = setTimeout(() => {
    reconnectTimeout = null;
    if (socket) {
      socket.onclose = null;
      socket.onerror = null;
      socket = null;
    }
    connectWebSocket();
  }, 3000);
};

export const sendWebSocketMessage = (data: any) => {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
  } else {
    console.warn("⚠️ WebSocket not connected");
  }
};

export const closeWebSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};
