export default class Size  {
    type: string;
    width: number;
    height: number;
    isDirty: boolean;

    constructor() {
        this.type = "size";
        this.width = 0;
        this.height = 0;
        this.isDirty = false;
    }
}