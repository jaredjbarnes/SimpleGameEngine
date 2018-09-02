import MobileController from "./MobileController";
import ResizeObserver from "resize-observer-polyfill";

export default class MobileStageCreator {
  constructor({ window, document, camera, controllerInputService, maxSize = 300 }) {
    this.document = document;

    this.window = window;
    this.maxSize = maxSize;
    this.body = document.body;
    this.bodyBoundingRect = null;
    this.controllerInputService = controllerInputService;
    this.camera = camera;
    this.cameraRectangle = camera.getComponent("rectangle");
    this.cameraTransform = camera.getComponent("transform");

    this.aButton = null;
    this.bButton = null;
    this.joystick = null;
    this.canvas = null;

    this.createAButton();
    this.createBButton();
    this.createJoystick();
    this.createCanvas();
    this.setupMobileController();

    this.resizeObserver = new ResizeObserver(() => {
      this.adjustCanvasSize();
    });

    this.resizeObserver.observe(document.body);
  }

  adjustCanvasSize() {
    this.bodyBoundingRect = this.body.getBoundingClientRect();

    if (this.bodyBoundingRect.width > this.bodyBoundingRect.height) {
      const ratio = this.bodyBoundingRect.height / this.bodyBoundingRect.width;

      this.cameraRectangle.width = this.canvas.width = this.maxSize;
      this.cameraRectangle.height = this.canvas.height = this.maxSize * ratio;
    } else {
      const ratio = this.bodyBoundingRect.width / this.bodyBoundingRect.height;

      this.cameraRectangle.height = this.canvas.height = this.maxSize;
      this.cameraRectangle.width = this.canvas.width = this.maxSize * ratio;
    }

    this.cameraRectangle.isDirty = true;
  }

  createAButton() {
    this.aButton = document.createElement("div");
    this.aButton.style.backgroundColor = "white";
    this.aButton.style.opacity = 0.4;
    this.aButton.style.borderRadius = "50% 50%";
    this.aButton.style.position = "absolute";
    this.aButton.style.bottom = "50px";
    this.aButton.style.right = "30px";
    this.aButton.style.width = "50px";
    this.aButton.style.height = "50px";
    this.aButton.style.boxShadow = "0px 0px 5px 0px rgba(0,0,0,0.3)";

    this.body.appendChild(this.aButton);
  }

  createBButton() {
    this.bButton = document.createElement("div");
    this.bButton.style.backgroundColor = "white";
    this.bButton.style.opacity = 0.4;
    this.bButton.style.borderRadius = "50% 50%";
    this.bButton.style.position = "absolute";
    this.bButton.style.bottom = "150px";
    this.bButton.style.right = "30px";
    this.bButton.style.width = "50px";
    this.bButton.style.height = "50px";
    this.bButton.style.boxShadow = "0px 0px 5px 0px rgba(0,0,0,0.3)";

    this.body.appendChild(this.bButton);
  }

  createCanvas() {

    this.canvas = document.createElement("canvas");
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";

    this.adjustCanvasSize();
    this.body.appendChild(this.canvas);
  }

  createJoystick() {
    this.joystick = document.createElement("div");
    this.joystick.style.backgroundColor = "white";
    this.joystick.style.opacity = 0.75;
    this.joystick.style.borderRadius = "50% 50%";
    this.joystick.style.position = "absolute";
    this.joystick.style.bottom = "50px";
    this.joystick.style.left = "50px";
    this.joystick.style.width = "100px";
    this.joystick.style.height = "100px";
    this.joystick.style.boxShadow = "0px 0px 5px 0px rgba(0,0,0,0.6)";

    this.body.appendChild(this.joystick);
  }

  setupMobileController() {
    this.mobileController = new MobileController({
      aButton: this.aButton,
      bButton: this.bButton,
      joystick: this.joystick,
      controllerInputService: this.controllerInputService
    });

  }

}
