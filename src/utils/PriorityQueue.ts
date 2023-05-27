export default class PriorityQueue<T> {
    private queue: { element: T; priority: number }[];

    constructor() {
        this.queue = [];
    }

    enqueue(element: T, priority: number) {
        this.queue.push({ element, priority });
        this.sort();
    }

    dequeue(): T | null {
        if (this.isEmpty()) return null;
        return this.queue.shift()?.element || null;
    }

    sort() {
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    isEmpty(): boolean {
        return this.queue.length === 0;
    }
}