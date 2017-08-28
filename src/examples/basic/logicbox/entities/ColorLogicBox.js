import Entity from "./../../../../Entity";
import { Logic, Condition, Action } from "./../../../../components/Logic";

export default class ColorLogicBox extends Entity {
    constructor(entityIdA, entityIdB, targetEntityId) {
        super();

        var logicBox = new Logic();
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