class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    insert(value) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }

    bubbleUp(index) {
        while (index > 0) {
            let parent = Math.floor((index - 1) / 2);
            if (this.heap[parent] <= this.heap[index]) break;
            [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
            index = parent;
        }
    }

    extractMin() {
        if (this.isEmpty()) return null;
        if (this.size() === 1) return this.heap.pop();

        let min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return min;
    }

    bubbleDown(index) {
        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let smallest = index;

            if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }
            if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }

            if (smallest !== index) {
                [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
                index = smallest;
            } else {
                break;
            }
        }
    }
}

function mincost(arr) {
    if (arr.length === 0) return 0;
    
    // Initialize min-heap priority queue
    let pq = new PriorityQueue();
    for (let length of arr) {
        pq.insert(length);
    }

    let minCost = 0;

    // While there are more than one rope in the queue
    while (pq.size() > 1) {
        let first = pq.extractMin();
        let second = pq.extractMin();
        let cost = first + second;
        minCost += cost;
        pq.insert(cost);
    }

    return minCost;
}

module.exports = mincost;