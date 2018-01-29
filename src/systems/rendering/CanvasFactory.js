export default class ClassFactory {
    constructor({ document: doc = document, shouldStoreInstances = false }) {
        this.document = doc;
        this.canvases = [];
        this.shouldStoreInstances = shouldStoreInstances;
    }

    create() {
        const canvas = this.document.createElement("canvas");
        if (this.shouldStoreInstances) {
            this.canvases.push(canvas);
        }
        return canvas;
    }

}