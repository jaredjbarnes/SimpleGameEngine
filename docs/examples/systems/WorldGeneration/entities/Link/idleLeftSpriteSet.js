import Image from "../../../../../../src/components/Image";

const url = "assets/link.gif"

const sprite1 = new Image();
sprite1.id = "idle-left-1";
sprite1.flipHorizontally = true;
sprite1.url = url;
sprite1.position.x = 4;
sprite1.position.y = 55;
sprite1.size.width = 17;
sprite1.size.height = 34;

export default [
    sprite1
];