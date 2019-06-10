class WebSocketHelper {
	constructor(url = `ws://localhost:3087/ws`) {
        this.ws = new WebSocket(url);
        
		this.ws.onopen = (e) => this.OnOpen(e);
		this.ws.onmessage = (e) => this.OnMessage(e);
		this.ws.onclose = (e) => this.OnClose(e);
	}

	GetWebSocket() {
		return this.ws;
	}

	Send(message) {
        if(this.ws.readyState === 1) {
            this.ws.send(JSON.stringify(message));
        }
	}

	OnOpen(e) {
		console.log("[Opened] WebSocket Connection");
	}

	OnMessage(e) {
		if(e.isTrusted) {
            console.log(e.data);
		}
	}

	OnClose(e) {
		// console.log(e);
	}
}

export default WebSocketHelper;