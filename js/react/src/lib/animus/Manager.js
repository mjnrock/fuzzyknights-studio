import uuidv4 from "uuid/v4";

class Manager {
	constructor(endpoint, getter, setter) {
		this._uuid = uuidv4();
		
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
	static _scope() {
		if(!window._animus) {
			window._animus = {};
		}

		return window._animus;
	}
	static processEndpoint(endpoint) {
		//	TODO Allow for endpoint to be dot-notation
		return endpoint;
	}
}

export default Manager;