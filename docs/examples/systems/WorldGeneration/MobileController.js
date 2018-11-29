const MAX_JOYSTICK_RANGE = 30;

export default class MobileController {
  constructor({ aButton, bButton, joystick, controllerInputService }) {
    this.controllerInputService = controllerInputService;
    this.joystick = joystick;
    this.aButton = aButton;
    this.bButton = bButton;

    this.joystickTouchStart = this.joystickTouchStart.bind(this);
    this.joystickTouchMove = this.joystickTouchMove.bind(this);
    this.joystickTouchEnd = this.joystickTouchEnd.bind(this);

    this.aButtonTouchStart = this.aButtonTouchStart.bind(this);
    this.aButtonTouchEnd = this.aButtonTouchEnd.bind(this);

    this.bButtonTouchStart = this.bButtonTouchStart.bind(this);
    this.bButtonTouchEnd = this.bButtonTouchEnd.bind(this);

    this.joystickTouchStart = this.joystickTouchStart.bind(this);
    this.joystickTouchEnd = this.joystickTouchEnd.bind(this);


    this.joystick.addEventListener("touchstart", this.joystickTouchStart, false);
    this.joystick.addEventListener("mousedown", this.joystickTouchStart);

    this.joyStickPosition = {
      x: 0,
      y: 0
    };

    this.joyStickStylePosition = {
      top: 0,
      left: 0
    };

    this.aButton.addEventListener("touchstart", this.aButtonTouchStart, false);
    this.aButton.addEventListener("touchend", this.aButtonTouchEnd, false);
    this.aButton.addEventListener("touchcancel", this.aButtonTouchEnd, false);

    this.bButton.addEventListener("touchstart", this.aButtonTouchStart, false);
    this.bButton.addEventListener("touchend", this.bButtonTouchEnd, false);
    this.bButton.addEventListener("touchcancel", this.bButtonTouchEnd, false);


  }

  aButtonTouchStart() {
    this.controllerInputService.a = 1;
  }

  aButtonTouchEnd() {
    this.controllerInputService.a = 0;
  }

  bButtonTouchStart() {
    this.controllerInputService.b = 1;
  }

  bButtonTouchEnd() {
    this.controllerInputService.b = 0;
  }

  joystickTouchStart(event) {
    document.addEventListener("touchmove", this.joystickTouchMove, false);
    document.addEventListener("touchend", this.joystickTouchEnd, false);
    document.addEventListener("touchcancel", this.joystickTouchEnd, false);
    document.addEventListener("mousemove", this.joystickTouchMove);
    document.addEventListener("mouseup", this.joystickTouchEnd);

    const touches = event.changedTouches || {};
    const touch = touches[0] || event;

    if (touch != null) {
      this.joyStickPosition.x = touch.pageX;
      this.joyStickPosition.y = touch.pageY;
    }

    this.joyStickStylePosition.left = parseInt(this.joystick.style.left, 10);
    this.joyStickStylePosition.bottom = parseInt(this.joystick.style.bottom, 10);


    //event.preventDefault();
  };

  joystickTouchMove(event) {
    const touches = event.changedTouches || {};
    const touch = touches[0] || event;

    if (touch != null) {
      let deltaX = touch.pageX - this.joyStickPosition.x;
      let deltaY = touch.pageY - this.joyStickPosition.y;

      deltaX = deltaX <= MAX_JOYSTICK_RANGE ? deltaX : MAX_JOYSTICK_RANGE;
      deltaY = deltaY <= MAX_JOYSTICK_RANGE ? deltaY : MAX_JOYSTICK_RANGE;

      deltaX = deltaX >= -MAX_JOYSTICK_RANGE ? deltaX : -MAX_JOYSTICK_RANGE;
      deltaY = deltaY >= -MAX_JOYSTICK_RANGE ? deltaY : -MAX_JOYSTICK_RANGE;

      this.controllerInputService.x = deltaX / MAX_JOYSTICK_RANGE;
      this.controllerInputService.y = deltaY / MAX_JOYSTICK_RANGE;

      this.joystick.style.bottom = `${this.joyStickStylePosition.bottom - deltaY}px`;
      this.joystick.style.left = `${this.joyStickStylePosition.left + deltaX}px`;

      //event.preventDefault();
    }
  };

  joystickTouchEnd() {
    this.controllerInputService.x = 0;
    this.controllerInputService.y = 0;

    document.removeEventListener("touchmove", this.joystickTouchMove);
    document.removeEventListener("touchend", this.joystickTouchEnd);
    document.removeEventListener("touchcancel", this.joystickTouchEnd);
    document.removeEventListener("mousemove", this.joystickTouchMove);
    document.removeEventListener("mouseup", this.joystickTouchEnd);

    this.joystick.style.left = `${this.joyStickStylePosition.left}px`;
    this.joystick.style.bottom = `${this.joyStickStylePosition.bottom}px`;

    //event.preventDefault();
  };
}
