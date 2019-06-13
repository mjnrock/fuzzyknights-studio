import Manager from "./Manager";
import StateManager from "./StateManager";
import SubscriptionManager from "./SubscriptionManager";

export function Init() {
	try {
		new StateManager();
		new SubscriptionManager();
	
		return true;
	} catch(e) {
		return false;
	}
}

export default {
	Init,
	
	Manager,
	StateManager,
	SubscriptionManager
};