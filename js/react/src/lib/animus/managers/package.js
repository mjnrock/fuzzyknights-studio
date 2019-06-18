import Manager from "./Manager";
import StateManager from "./StateManager";
import RegistryManager from "./RegistryManager";
import EventManager from "./EventManager";
import WebSocketManager from "./WebSocketManager";

export function Init({ wsURL = null, packages = [] } = {}) {
	try {
		new StateManager();
		new RegistryManager();
		new EventManager();
		new WebSocketManager();

		if(wsURL !== null && wsURL !== void 0) {
			WebSocketManager.GetInstance().Create(wsURL);
		}

		StateManager.AddHook("Animus:StateManager:SetState", () => {
			RegistryManager.GetInstance().UpdateEach();
		});
		RegistryManager.AddHook("Animus:RegistryManager:UpdateEach", (entity, uuid) => {
			// if(entity.setState) {
			// 	entity.setState(StateManager.GetInstance().GetState());
			// }
			if(entity.forceUpdate) {
				entity.forceUpdate();
			}
		});

		EventManager.AddHook("Animus:EventManager:Dispatch::reducer", (state, doSync) => {
			StateManager.GetInstance().AddState(state, doSync);
		});
		EventManager.AddHook("Animus:EventManager:Dispatch", () => {
			StateManager.GetInstance().Sync();
		});

		if(packages && packages.length > 0) {
			packages.forEach(loader => loader());
		}
	
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
	EventManager,
	WebSocketManager
};

Object.equals = function( x, y ) {
	if ( x === y ) return true;
	  // if both x and y are null or undefined and exactly the same
  
	if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
	  // if they are not strictly equal, they both need to be Objects
  
	if ( x.constructor !== y.constructor ) return false;
	  // they must have the exact same prototype chain, the closest we can do is
	  // test there constructor.
  
	for ( var p in x ) {
	  if ( ! x.hasOwnProperty( p ) ) continue;
		// other properties were tested using x.constructor === y.constructor
  
	  if ( ! y.hasOwnProperty( p ) ) return false;
		// allows to compare x[ p ] and y[ p ] when set to undefined
  
	  if ( x[ p ] === y[ p ] ) continue;
		// if they have the same strict value or identity then they are equal
  
	  if ( typeof( x[ p ] ) !== "object" ) return false;
		// Numbers, Strings, Functions, Booleans must be strictly equal
  
	  if ( ! Object.equals( x[ p ],  y[ p ] ) ) return false;
		// Objects and Arrays must be tested recursively
	}
  
	for ( p in y ) {
	  if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
		// allows x[ p ] to be set to undefined
	}
	return true;
  }