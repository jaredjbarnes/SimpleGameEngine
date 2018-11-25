export default class Grid {
    constructor(buckets = {}) {
        this.buckets = buckets;
    }

    add(cellPositions, entity) {
        for (let x = 0; x < cellPositions.length; x++) {
            const cellPosition = cellPositions[x];
            let bucket = this.getBucket(cellPosition);

            if (bucket == null) {
                this.createBucket(cellPosition);
                bucket = this.getBucket(cellPosition);
            }

            bucket.push(entity);
        }
    }

    createBucket({ column, row }) {
        const key = this.getKey(column, row);

        if (this.buckets[key] == null) {
            this.buckets[key] = [];
        }
    }

    clear() {
        for (let key in this.buckets) {
            delete this.buckets[key];
        }
    }

    getBucket({ column, row }) {
        const key = this.getKey(column, row);
        return this.buckets[key] || null;
    }

    getKey(column, row) {
        return `${column}_${row}`;
    }

    remove(cellPositions, entity) {
        for (let x = 0; x < cellPositions.length; x++) {
            const cellPosition = cellPositions[x];
            const bucket = this.getBucket(cellPosition);

            if (bucket == null){
                return;
            }
            
            const index = bucket.indexOf(entity);

            if (index > -1) {
                bucket.splice(index, 1);
            }

            if (bucket.length === 0) {
                delete this.buckets[this.getKey(cellPosition.column, cellPosition.row)]
            }
        }
    }

}