import emiter from "./bus";

export default class WebSocketConnection {
  private messages: string[] = []; // 存储接收到的消息
  private socket: WebSocket;
  private pingInterval: number;
  private pingMessage: string;
  private pingTimer: number | undefined;
  private reconnectInterval: number;
  private reconnectTimer: number | undefined;
  private url: string;
  private isDead: boolean = false;

  constructor(url: string) {
    this.url = url;
    this.socket = new WebSocket(url);
    this.pingInterval = 30000; // 30秒
    this.pingMessage = "ping";
    this.reconnectInterval = 30000; // 30秒
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
          if (this.isDead) {
            this.clearReconnectTimer();
          }
          this.isDead = true;
        }
      }, this.pingInterval);
    });

    this.socket.addEventListener("message", (event) => {
      const message = event.data;
      if (message == "pong") this.isDead = false;
      else {
        let message_json = JSON.parse(message);
        if (message_json["eventcode"] == 2001)
          emiter.emit("member", message_json);
      }
    });

    this.socket.addEventListener("close", () => {
      console.log("WebSocket连接已关闭");

      // 清除心跳检测的定时器
      clearInterval(this.pingTimer);
      this.startReconnectTimer();
    });

    //@ts-ignore
    this.socket.addEventListener("error", (error) => {
      console.log("WebSocket连接发生错误");
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
        this.socket.close();
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
