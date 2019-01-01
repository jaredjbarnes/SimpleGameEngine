import Image from "../../../../../../src/components/Image";

const url = "assets/Player.png"

const sprite1 = new Image();
sprite1.id = "running-down-1";
sprite1.url = url;
sprite1.position.x = 32;
sprite1.position.y = 0;
sprite1.size.width = 32;
sprite1.size.height = 54;

const sprite2 = new Image();
sprite2.id = "running-down-2";
sprite2.url = url;
sprite2.position.x = 64;
sprite2.position.y = 0;
sprite2.size.width = 32;
sprite2.size.height = 54;

const sprite3 = new Image();
sprite3.id = "running-down-3";
sprite3.url = url;
sprite3.position.x = 96;
sprite3.position.y = 0;
sprite3.size.width = 32;
sprite3.size.height = 54;

const sprite4 = new Image();
sprite4.id = "running-down-4";
sprite4.url = url;
sprite4.position.x = 128;
sprite4.position.y = 0;
sprite4.size.width = 32;
sprite4.size.height = 54;

export default [
    sprite1,
    sprite2,
    sprite3,
    sprite4
];