export default class HistoryPlayer {
    constructor() {
        this.entity = null;
        this.historyPlayerComponent = null;
        this.offset = 0;
    }

    setEntity(entity){
        this.entity = entity;
        this.historyPlayerComponent = entity.getComponent("history-player");
        this.history = historyPlayerComponent.history;
        this.offset = this.historyPlayerComponent.offset;
    }

    setStateWithRecord(record){
        const entity = this.entity;

        for (let type in record){
            const component = entity.getComponent(type);
            const state = record[type];

            for (let property in state){
                component[property] = state[property];
            }
        }
    }

    play(time){
        const adjustedTime = time - offset;
        const history = this.history;
        const length = history.length;

        for (let x = 0 ; x < length ; x++){
            const state = history[x];

            if (state.timestamp >= adjustedTime){
                this.setStateWithRecord(state);
                break;
            }
        }

    }
}