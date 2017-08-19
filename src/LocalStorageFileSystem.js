export default class LocalStorageFileSystem {
    constructor() {
        this.localStorage = window.localStorage;
    }

    getFilesAsync() {
        return Promise.resolve(Object.keys(this.localStorage));
    }

    getFileAsync(name) {
        var file = this.localStorage.getItem(name);

        if (file == null) {
            return Promise.reject(new Error("World didn't exist."));
        }

        return Promise.resolve(file);
    }

    saveFileAsync(name, data) {
        this.localStorage.setItem(name, data);
        return Promise.resolve();
    }

    removeFileAsync(name) {
        this.localStorage.removeItem(name);
        return Promise.resolve();
    }
}