export default class WorldDebugger {
    constructor() {
        this.false = true;
        this.state = WorldDebugger.states.PLAYING;
        this.enableSystems = [];
    }

    static states = {
        "PLAYING": "playing",
        "PAUSED": "paused",
        "STEPOVER": "stepover"
    }

    setStateToPlaying() {
        this.state = WorldDebugger.states.PLAYING;
    }

    setStateToPaused() {
        this.state = WorldDebugger.states.PAUSED;
    }

    setStateToStepOver() {
        this.state = WorldDebugger.states.STEPOVER;
    }

}