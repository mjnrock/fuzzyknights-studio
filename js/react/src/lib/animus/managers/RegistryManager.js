import Manager from "./Manager";

const ENDPOINT = "registry";

class RegistryManager extends Manager {
	constructor() {
		super(ENDPOINT, "GetRegistry", "SetRegistry");

		this._registry = Object.freeze({});
        this.LocalToGlobal(this._registry);
	}

	GetRegistry() {
		return this._registry;
	}
	SetRegistry(registry) {
		this._registry = Object.freeze(registry);

		return this;
    }
    
    Find(uuid) {
        return this._registry[ uuid ];
    }

	Register(entity) {
		let registry = {
            ...this.GetRegistry()
        };

		if(entity._uuid) {
			registry[ entity._uuid ] = entity;
		}

		this.SetRegistry(registry);

		return this;
	}
	Unregister(entity) {
		let registry = {
            ...this.GetRegistry()
        };

		if(entity._uuid) {
			delete registry[ entity._uuid ];
		} else if(typeof entity === "string" || entity instanceof String) {
			delete registry[ entity ];
		}

		this.SetRegistry(registry);

		return this;
    }

	static GetInstance() {
		return Manager._scope().managers[ Manager._processEndpoint(ENDPOINT) ];
	}
}

export default RegistryManager;