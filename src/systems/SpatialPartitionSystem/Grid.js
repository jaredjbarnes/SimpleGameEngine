export default class Grid {
    constructor(buckets = {}) {
        this.buckets = buckets;
    }

    add(cellPositions, entity) {
        for (let x = 0; x < cellPositions.length; x++) {
            const cellPosition = cellPositions[x];
            const bucket = this.getBucket(cellPosition);
            bucket.push(entity);
        }
    }

    clear() {
        for (let key in this.buckets) {
            delete this.buckets[key];
        }
    }

    getBucket({ column, row }) {
        const key = this.getKey(column, row);
        let bucket = this.buckets[key];

        if (bucket == null) {
            bucket = this.buckets[key] = [];
        }

        return bucket;
    }

    getKey(column, row) {
        return `${column}_${row}`;
    }

    remove(cellPositions, entity) {
        for (let x = 0; x < cellPositions.length; x++) {
            const cellPosition = cellPositions[x];
            const bucket = this.getBucket(cellPosition);
            const index = bucket.indexOf(entity);

            if (index > -1) {
                bucket.splice(index, 1);
            }
        }
    }

}