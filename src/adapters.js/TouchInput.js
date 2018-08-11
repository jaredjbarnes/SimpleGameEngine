export default class TouchInput {
    constructor({
        controllerInputService,
        joyStickElement,
        aElement,
        bElement,
        maxJoyStickDistance = 100
    }) {

        this.joyStickElement = joyStickElement;
        this.aElement = aElement;
        this.bElement = bElement;
        this.controllerInputService = controllerInputService;
        this.maxJoyStickDistance = maxJoyStickDistance;

        this.joyStickStartPosition = {
            x: 0,
            y: 0
        };

        this.joyStickElement.addEventListener("touchstart", this.joyStickElementOnStartTouch);
        this.joyStickElement.addEventListener("touchmove", this.joyStickElementOnMoveTouch);
        this.joyStickElement.addEventListener("touchend", this.joyStickElementOnEndTouch);
        this.joyStickElement.addEventListener("touchcancel", this.joyStickElementOnEndTouch);
    
        this.aElement.addEventListener("touchstart", this.aOnStart);
        this.aElement.addEventListener("touchend", this.aOnEnd);
        this.aElement.addEventListener("touchcancel", this.aOnCancel);

        this.bElement.addEventListener("touchstart", this.bOnStart);
        this.bElement.addEventListener("touchend", this.bOnEnd);
        this.bElement.addEventListener("touchcancel", this.bOnCancel);
    }

    joyStickElementOnStartTouch(event) {
        const touchEvent = event.changedTouches[0];
        this.joyStickStartPosition.x = touchEvent.pageX;
        this.joyStickStartPosition.y = touchEvent.pageY;
    }

    joyStickElementOnMoveTouch(event) {
        const touchEvent = event.changedTouches[0];
        let percentageX = touchEvent.pageX - this.joyStickStartPosition.x / this.maxJoyStickDistance;
        let percentageY = touchEvent.pageY - this.joyStickStartPosition.y / this.maxJoyStickDistance;
        
        this.controllerInputService.x = percentageX < 1 ? percentageX : 1;
        this.controllerInputService.y = percentageY < 1 ? percentageY : 1;
    }

    joyStickElementOnEndTouch() {
        this.controllerInputService.x = 0;
        this.controllerInputService.y = 0;
    }

    aOnStart() {
        this.controllerInputService.a = 1;
    }

    aOnEnd() { 
        this.controllerInputService.a = 0;
    }

    bOnStart() { 
        this.controllerInputService.b = 1;
    }

    bOnEnd() { 
        this.controllerInputService.b = 0;
    }

}