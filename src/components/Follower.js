export default class Follower {
    constructor() {
        this.type = "follower";
        this.leaderEntityId = null;
        this.maxSpeed = 2;
        this.distance = {
            x: 0,
            y: 0
        }
        this.lastDirection = {
            x: 1,
            y: 1
        };
    }
}