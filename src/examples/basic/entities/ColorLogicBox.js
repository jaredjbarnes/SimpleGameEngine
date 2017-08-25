import Entity from "./../../../Entity";
import { LogicBox, Condition, Action } from "./../../../components/LogicBox";

export default class ColorLogicBox extends Entity {
    constructor(entityIdA, entityIdB, targetEntityId) {
        super();

        var logicBox = new LogicBox();
        var entityACondition = new Condition();
        var entityBCondition = new Condition();
        var action = new Action();

        entityACondition.entityId = entityIdA;
        entityACondition.stateNames.push("blue-state");

        entityBCondition.entityId = entityIdB;
        entityBCondition.stateNames.push("blue-state");

        action.entityId = targetEntityId;
        action.stateName = "blue-state";

        logicBox.conditions.push(entityACondition, entityBCondition);
        logicBox.actions.push(action);

        this.addComponent(logicBox);
    }
}