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
			getter: this[ getter ],
			setter: this[ setter ]
		};

		Manager._scope().managers = Manager._scope().managers || {};
		Manager._scope().managers[ this._sync.endpoint ] = this;
	}

	LocalToGlobal(value = null) {
		if(value === null || value === void 0) {
			Manager._scope()[ this._sync.endpoint ] = this._sync.getter();
		} else {
			Manager._scope()[ this._sync.endpoint ] = value;
		}

		return this;
	}
	GlobalToLocal() {
		this._sync.setter(Manager._scope()[ this._sync.endpoint ]);

		return this;
	}

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