export default class KeyboardInput {
    constructor({
        controllerInputService,
        doc,
        left = [37],
        up = [38],
        right = [39],
        down = [40],
        a = [32],
        b = [91, 93, 224, 17]
    }) {
        doc = doc || document;

        doc.addEventListener("keydown", function (event) {
            if (up.indexOf(event.keyCode) > -1) {
                controllerInputService.y -= 1;
            }

            if (down.indexOf(event.keyCode) > -1) {
                controllerInputService.y += 1;
            }

            if (left.indexOf(event.keyCode) > -1) {
                controllerInputService.x -= 1;
            }

            if (right.indexOf(event.keyCode) > -1) {
                controllerInputService.x += 1;
            }

            if (a.indexOf(event.keyCode) > -1) {
                controllerInputService.a = 1;
            }

            if (b.indexOf(event.keyCode) > -1) {
                controllerInputService.b = 1;
            }

        });

        doc.addEventListener("keyup", function (event) {

            if (up.indexOf(event.keyCode) > -1) {
                controllerInputService.y += 1;
            }

            if (down.indexOf(event.keyCode) > -1) {
                controllerInputService.y -= 1;
            }

            if (left.indexOf(event.keyCode) > -1) {
                controllerInputService.x += 1;
            }

            if (right.indexOf(event.keyCode) > -1) {
                controllerInputService.x -= 1;
            }

            if (a.indexOf(event.keyCode) > -1) {
                controllerInputService.a = 0;
            }

            if (b.indexOf(event.keyCode) > -1) {
                controllerInputService.b = 0;
            }

        });
    }
}