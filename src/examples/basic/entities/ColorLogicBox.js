import Entity from "./../../../Entity";
import { LogicBox, Condition, Action } from "./../../../components/LogicBox";

export default class ColorLogicBox extends Entity {
    constructor(colorPlatformId, movingEntityId) {
        super();

        var logicBox = new LogicBox();



        this.addComponent(logicBox);
    }
}