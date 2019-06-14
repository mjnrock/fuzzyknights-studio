import Manager from "./Manager";
import StateManager from "./StateManager";
import RegistryManager from "./RegistryManager";
import EventManager from "./EventManager";

export function Init() {
	try {
		new StateManager();
		new RegistryManager();
        new EventManager();
	
		return true;
	} catch(e) {
		return false;
	}
}

export default {
	Init,
	
	Manager,
	StateManager,
    RegistryManager,
    EventManager
};