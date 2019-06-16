class WebSocketHelper {
	constructor(url = `ws://localhost:3075/ws`) {
        this.ws = new WebSocket(url);
        
		this.ws.onopen = (e) => this.OnOpen(e);
		this.ws.onmessage = (e) => this.OnMessage(e);
        this.ws.onclose = (e) => this.OnClose(e);
	}

	GetWebSocket() {
		return this.ws;
	}

	Send(message) {
        if(this.ws && this.ws.readyState === 1) {
            this.ws.send(JSON.stringify(message));
        }
	}

	OnOpen(e) {
		console.log("[Opened] WebSocket Connection");
	}

	OnMessage(e) {
		if(e.isTrusted) {
            try {
                return JSON.parse(e.data);
            } catch(e) {
                console.log(e);
            }
        }
        
        return false;
	}

	OnClose(e) {
		// console.log(e);
	}
}

export default WebSocketHelper;