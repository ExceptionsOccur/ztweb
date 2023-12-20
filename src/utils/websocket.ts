export default class WebSocketConnection {
  private messages: string[] = []; // 存储接收到的消息
  private socket: WebSocket;
  private pingInterval: number;
  private pingMessage: string;
  private pingTimer: number | undefined;
  private reconnectInterval: number;
  private reconnectTimer: number | undefined;
  private url: string;

  constructor(url: string) {
    this.url = url;
    this.socket = new WebSocket(url);
    this.pingInterval = 15000; // 15秒
    this.pingMessage = "ping";
    this.reconnectInterval = 15000; // 15秒
    this.initWebsocket();
  }
  initWebsocket() {
    this.socket.addEventListener("open", () => {
      console.log("WebSocket连接已建立");
      this.clearReconnectTimer();
      // 设置心跳检测的定时器
      this.pingTimer = setInterval(() => {
        // 发送心跳消息给服务器
        if (this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(this.pingMessage);
          console.log("sended message:", this.pingMessage);
        }
      }, this.pingInterval);
    });

    this.socket.addEventListener("message", (event) => {
      const message = event.data;
      console.log("Received message:", message);

      // 在这里处理收到的消息
    });

    this.socket.addEventListener("close", () => {
      console.log("WebSocket连接已关闭");

      // 清除心跳检测的定时器
      clearInterval(this.pingTimer);
      this.startReconnectTimer();
    });

    this.socket.addEventListener("error", (error) => {
      console.log("WebSocket连接发生错误:", error);
      // 清除心跳检测的定时器
      clearInterval(this.pingTimer);
      this.startReconnectTimer();
    });
  }

  private startReconnectTimer() {
    // 避免重复启动定时器
    if (!this.reconnectTimer) {
      this.reconnectTimer = setInterval(() => {
        console.log("尝试重新连接 WebSocket...");
        this.socket = new WebSocket(this.url);
        this.initWebsocket();
      }, this.reconnectInterval);
    }
  }

  private clearReconnectTimer() {
    if (this.reconnectTimer) {
      clearInterval(this.reconnectTimer);
      this.reconnectTimer = undefined;
    }
  }

  public sendMessage(message: string): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.log("无法发送消息，连接未建立或已关闭");
    }
  }

  public getMessages(): string[] {
    return this.messages;
  }

  public closeConnection(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
