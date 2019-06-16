import Manager from "./Manager";
import StateManager from "./StateManager";
import RegistryManager from "./RegistryManager";
import EventManager from "./EventManager";

export function Init() {
	try {
		new StateManager();
		new RegistryManager();
		new EventManager();

		StateManager.AddHook("Animus:StateManager:SetState", () => {
			RegistryManager.GetInstance().UpdateEach();
		});
		RegistryManager.AddHook("Animus:RegistryManager:UpdateEach", (entity) => {
			if(entity.forceUpdate) {
				entity.forceUpdate();
			}
		});

		EventManager.AddHook("Animus:EventManager:Dispatch::reducer", (state, doSync) => {
			StateManager.GetInstance().AddState(state, false);
		});
		EventManager.AddHook("Animus:EventManager:Dispatch", () => {
			StateManager.GetInstance().Sync();
		});
	
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