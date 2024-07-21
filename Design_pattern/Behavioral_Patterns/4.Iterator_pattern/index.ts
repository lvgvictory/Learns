interface Iterator<T> {
    next(): IteratorResult<T>;
    hasNext(): boolean;
}

interface Aggregator<T> {
    createIterator(): Iterator<T>;
}

class ConcreteIterator<T> implements Iterator<T> {
    private collection: T[];
    private position: number = 0;

    constructor(collection: T[]) {
        this.collection = collection;
    }

    public next(): IteratorResult<T> {
        if (this.hasNext()) {
            return {
                done: false,
                value: this.collection[this.position++]
            };
        }
        return { done: true, value: null };
    }

    public hasNext(): boolean {
        return this.position < this.collection.length;
    }
}

class ConcreteAggregator<T> implements Aggregator<T> {
    private items: T[] = [];

    public createIterator(): Iterator<T> {
        return new ConcreteIterator(this.items);
    }

    public addItem(item: T): void {
        this.items.push(item);
    }
}

// Sử dụng
const aggregator = new ConcreteAggregator<string>();
aggregator.addItem("Item 1");
aggregator.addItem("Item 2");
aggregator.addItem("Item 3");

const iterator = aggregator.createIterator();

while (iterator.hasNext()) {
    console.log(iterator.next().value);
}
