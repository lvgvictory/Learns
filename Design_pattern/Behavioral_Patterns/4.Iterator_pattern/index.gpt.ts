namespace gpt {
  interface Iterator<T> {
    next(): T | null;
    hasNext(): boolean;
  }

  class ArrayIterator<T> implements Iterator<T> {
    private collection: T[];
    private position: number = 0;

    constructor(collection: T[]) {
      this.collection = collection;
    }

    next(): T | null {
      if (this.hasNext()) {
        return this.collection[this.position++];
      }
      return null;
    }

    hasNext(): boolean {
      return this.position < this.collection.length;
    }
  }

  interface IterableCollection<T> {
    createIterator(): Iterator<T>;
  }

  class NumberCollection implements IterableCollection<number> {
    private collection: number[] = [];

    addItem(item: number) {
      this.collection.push(item);
    }

    createIterator(): Iterator<number> {
      return new ArrayIterator(this.collection);
    }
  }

  // Tạo một tập hợp số
  let numberCollection = new NumberCollection();
  numberCollection.addItem(1);
  numberCollection.addItem(2);
  numberCollection.addItem(3);
  numberCollection.addItem(4);

  // Tạo một iterator
  let iterator = numberCollection.createIterator();

  // Sử dụng iterator để duyệt qua các phần tử
  while (iterator.hasNext()) {
    console.log(iterator.next());
  }
}
