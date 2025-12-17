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

  if (!token) {
    console.error("No authentication token available");
    return;
  }

  // Close existing connection if any
  if (socket) {
    socket.close();
  }

  // IMPORTANT: Two valid ways to send token:
  // Option 1: As query parameter (simpler, most common)
  const WS_URL = `wss://nnhkp72zd1.execute-api.us-east-2.amazonaws.com/staging?Authorization=${encodeURIComponent(token)}`;
  
  // Option 2: Using Sec-WebSocket-Protocol header (alternative)
  // const WS_URL = `wss://nnhkp72zd1.execute-api.us-east-2.amazonaws.com/staging`;
  
  socket = new WebSocket(WS_URL);

  // If using Sec-WebSocket-Protocol header (uncomment if using Option 2)
  // socket = new WebSocket(WS_URL, ["my-protocol", token]);

  socket.onopen = () => {
    console.log("✅ WebSocket connected to:", WS_URL);
    
    // Send authentication message after connection opens (optional)
    // socket.send(JSON.stringify({ 
    //   action: "auth", 
    //   token: token 
    // }));
  };

  socket.onmessage = (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      console.log("📩 Message received:", data);
      if (onMessage) onMessage(data);
    } catch (err) {
      console.warn("⚠️ Failed to parse WebSocket message:", event.data, err);
    }
  };

  socket.onerror = (error: Event) => {
    console.error("❌ WebSocket error", error);
    reconnect();
  };

  socket.onclose = (event: CloseEvent) => {
    console.warn("⚠️ WebSocket closed. Code:", event.code, "Reason:", event.reason);
    
    // Don't reconnect on auth failures (401, 403)
    if (event.code === 1008 || event.code === 4003) {
      console.error("Authentication failed, not reconnecting");
      return;
    }
    
    reconnect();
  };

  return socket;
};

const reconnect = () => {
  if (reconnectTimeout) return;

  reconnectTimeout = setTimeout(() => {
    console.log("🔄 Attempting to reconnect WebSocket...");
    reconnectTimeout = null;
    connectWebSocket();
  }, 3000);
};

export const sendWebSocketMessage = (data: any) => {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
    return true;
  } else {
    console.warn("⚠️ WebSocket not connected. Current state:", socket?.readyState);
    return false;
  }
};

export const closeWebSocket = () => {
  if (socket) {
    socket.close(1000, "Client closing connection");
    socket = null;
  }
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }
};

// Helper to check connection state
export const getWebSocketState = () => {
  if (!socket) return "CLOSED";
  const states = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
  return states[socket.readyState] || "UNKNOWN";
};