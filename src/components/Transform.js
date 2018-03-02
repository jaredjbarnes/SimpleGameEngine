export default class Transform {
    constructor(){
        this.type = "transform";
        this.rotate = 0; // Degrees
        this.scale = {
            x: 1,
            y: 1 
        }
        this.translate= {
            x: 0,
            y: 0
        }
        this.opacity = 1;
    }
}