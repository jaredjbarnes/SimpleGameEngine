export default class DynamicLoader {
    constructor(mapping = {}) {
        this.singletons = {};
        this.mapping = mapping;
    }

    loadSingletonAsync(systemAlias) {
        const loadedSystem = this.singletons[systemAlias];

        if (loadedSystem != null) {
            return Promise.resolve(loadedSystem);
        } else {
            return this.loadAsync(systemAlias);
        }
    }

    loadAsync(systemAlias) {
        const alias = this.mapping[systemAlias];

        if (alias != null) {
            return import(alias).then((module) => {
                const system = new module.default();
                this.singletons[systemAlias] = system;

                return system;
            });
        } else {
            return Promise.reject(new Error("Unknown Alias."));
        }
    }
}

