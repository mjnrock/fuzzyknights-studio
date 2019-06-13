import Manager from "./Manager";

class MessageManager extends Manager {
	constructor() {
		super();

		this._queue = [];
	}

	Receive(message) {
		this._queue.push(message);

		return this;
	}
	
}

export default MessageManager;