export default class Transform {
  constructor() {
    this.type = "transform";
    this.isDirty = true;

    // Radians
    this.rotation = 0;

    this.position = {
      x: 0,
      y: 0,
    };

    this.scale = {
      x: 0,
      y: 0,
    };

    this.size = {
      width: 0,
      height: 0,
    };

    this.origin = {
      x: 0,
      y: 0,
    };

    this.boundingRect = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
  }
}
