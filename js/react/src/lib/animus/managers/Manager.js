import uuidv4 from "uuid/v4";

/**
 * This class is designed to be a single-purpose manager
 * thus having one fundamental "getter" and "setter"
 */
class Manager {
	constructor(endpoint, getter, setter) {
		this._uuid = uuidv4();
		
		/**
		 * @endpoint Where in the scope stack the Manager will pump its @getter data
		 * @getter Used by the syncing mechanisms for "get" data (e.g. Pushing to global)
		 * @setter Used by the syncing mechanism for "set" data (e.g. Pulling from global)
		 */
		this._sync = {
			endpoint,
			getter,
			setter
        };
        this._hooks = {};

		Manager._scope().managers = Manager._scope().managers || {};
		Manager._scope().managers[ this._sync.endpoint ] = this;
		Manager._scope()[ this._sync.endpoint ] = {};
	}

	LocalToGlobal(value = null) {
		if(value === null || value === void 0) {
			Manager._scope()[ this._sync.endpoint ] = this[ this._sync.getter ]();
		} else {
			Manager._scope()[ this._sync.endpoint ] = value;
        }

		return this;
	}
	GlobalToLocal() {
		this[ this._sync.setter ](Manager._scope()[ this._sync.endpoint ], false);

		return this;
    }
    
    // _hook(key, ...args) {        
    //     if(this._hooks[ key ] && typeof this._hooks[ key ] === "function") {
    //         return this._hooks[ key ](...args);
    //     }

    //     return false;
    // }

    // static AddHook(endpoint, key, fn) {
    //     try {
    //         let manager = Manager._scope().managers[ Manager._processEndpoint(endpoint) ];

    //         if(manager && typeof fn === "function") {
    //             manager._hooks[ key ] = fn;
    //         }
    //     } catch(e) {
    //         console.warn("[Failure]: Could not add hook");
    //     }
    // }
    // static RemoveHook(endpoint, key) {
    //     try {
    //         let manager = Manager._scope().managers[ Manager._processEndpoint(endpoint) ];

    //         if(manager) {
    //             delete manager._hooks[ key ];
    //         }
    //     } catch(e) {
    //         console.warn("[Failure]: Could not remove hook");
    //     }
    // }

	//! All scope is derived from the use of this function for a one-location update
	//? Overwrite this function "{Root}.Manager._scope = () => ..." to change
	static _scope() {
		if(!window._animus) {
			window._animus = {};
		}

		return window._animus;
	}
	static _processEndpoint(endpoint) {
		//	TODO Allow for endpoint to be dot-notation
		return endpoint;
    }
}

export default Manager;