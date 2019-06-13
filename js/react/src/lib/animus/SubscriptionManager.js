import Manager from "./Manager";

const ENDPOINT = "subscriptions";

class SubscriptionManager extends Manager {
	constructor() {
		super(ENDPOINT, "GetSubscriptions", "SetSubscriptions");

		this._subscriptions = Object.freeze({});
		this.LocalToGlobal(this._subscriptions);
	}

	GetSubscriptions() {
		return this._subscriptions;
	}
	SetSubscriptions(subscribers) {
		this._subscriptions = Object.freeze(subscribers);

		return this;
	}

	Subscribe(subscriber) {
		let subscriptions = this.GetSubscriptions();

		if(subscriber._uuid) {
			subscriptions[ subscriber._uuid ] = subscriber;
		}

		this.SetSubscriptions(subscriptions);

		return this;
	}
	Unsubscribe(unsubscriber) {
		let subscriptions = this.GetSubscriptions();

		if(unsubscriber._uuid) {
			delete subscriptions[ unsubscriber._uuid ];
		} else if(typeof unsubscriber === "string" || unsubscriber instanceof String) {
			delete subscriptions[ unsubscriber ];
		}

		this.SetSubscriptions(subscriptions);

		return this;
	}

	static GetInstance() {
		return Manager._scope().managers[ Manager._processEndpoint(ENDPOINT) ];
	}
}

export default SubscriptionManager;