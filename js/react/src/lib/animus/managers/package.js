import Manager from "./Manager";
import StateManager from "./StateManager";
import RegistryManager from "./RegistryManager";

export function Init() {
	try {
		new StateManager();
		new RegistryManager();
	
		return true;
	} catch(e) {
		return false;
	}
}

export default {
	Init,
	
	Manager,
	StateManager,
	RegistryManager
};