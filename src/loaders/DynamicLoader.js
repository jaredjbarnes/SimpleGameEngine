export default class DynamicLoader {
    constructor(mapping = {}) {
        this.singletons = {};
        this.mapping = mapping;
    }

    getSingletonAsync(moduleAlias) {
        const loadedModule = this.singletons[moduleAlias];

        if (loadedModule != null) {
            return Promise.resolve(loadedModule);
        } else {
            return this.singletons[moduleAlias] = this.loadAsync(moduleAlias);
        }
    }

    getModuleNames() {
        return Object.keys(this.mapping);
    }

    createAsync(moduleAlias) {
        const path = this.mapping[moduleAlias];

        if (path != null) {
            return import(path).then((module) => {
                return new module.default();
            });
        } else {
            return Promise.reject(new Error("Unknown Alias."));
        }
    }
}

