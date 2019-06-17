import Manager from "./Manager";

const ENDPOINT = "websocket";

class WebSocketManager extends Manager {
	constructor() {
		super(ENDPOINT, "GetWebSocket", "SetWebSocket");

		this._ws = null;
        this.LocalToGlobal(this._ws);
	}

	GetWebSocket() {
		return this._ws;
	}
	SetWebSocket(ws) {
		this._ws = ws;

		return this;
	}

	HasWebSocket() {
		return this._ws;
	}
	IsReady() {
		return this._ws && this._ws.readyState === 1;
	}

	Create(url) {
		this._ws = new WebSocket(url);
		this._ws.onopen = (e) => this.OnOpen(e);
		this._ws.onmessage = (e) => this.OnMessage(e);
		this._ws.onerror = (e) => this.OnError(e);
		this._ws.onclose = (e) => this.OnClose(e);

		this._Hook("Animus:WebSocketManager:Create", this._ws, url);

		return this;
	}
	Destroy() {
		if(this.HasWebSocket()) {
			this._ws.close();
		}
	}

	OnOpen(e) {
		console.info("[Opened] WebSocket Connection");

		this._Hook("Animus:WebSocketManager:OnOpen", e);
		
		return e;
	}
	OnMessage(e) {
		if(e.isTrusted) {
            try {
				this._Hook("Animus:WebSocketManager:OnMessage::trusted", e.data, e);

				return e;
            } catch(e) {
                console.log(e);
            }
        } else {
			this._Hook("Animus:WebSocketManager:OnMessage::untrusted", e);

			return e;
		}
        
        return false;
	}
	OnError(e) {
		console.error("[Error] WebSocket Error");

		this._Hook("Animus:WebSocketManager:OnError", e);
		
		return e;
	}
	OnClose(e) {
		console.info("[Closed] WebSocket Connection");

		this._Hook("Animus:WebSocketManager:OnClose", e);
		
		return e;
	}

	static GetInstance() {
		return Manager._scope().managers[ Manager._processEndpoint(ENDPOINT) ];
	}

    static AddHook(path, fn) {
		Manager.AddHook(ENDPOINT, path, fn);
    }
    static RemoveHook(path) {
		Manager.RemoveHook(ENDPOINT, path);
    }
}

export default WebSocketManager;