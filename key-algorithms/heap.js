class Heap {
  constructor(comparator) {
    this.heap = [];
    this.comparator = comparator; // Custom comparator determines heap behavior
  }

  insert(value) {
    this.heap.push(value);
    this.#bubbleUp();
  }

  #bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.comparator(this.heap[parentIndex], this.heap[index])) break;
      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      index = parentIndex;
    }
  }

  top() {
    return this.heap[0]
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.#bubbleDown(0);
    return root;
  }

  #bubbleDown(index) {
    const lastIndex = this.heap.length - 1;
    while (true) {
      let leftChild = index * 2 + 1;
      let rightChild = index * 2 + 2;
      let target = index;

      if (leftChild <= lastIndex && !this.comparator(this.heap[target], this.heap[leftChild])) {
        target = leftChild;
      }

      if (rightChild <= lastIndex && !this.comparator(this.heap[target], this.heap[rightChild])) {
        target = rightChild;
      }

      if (target === index) break;

      [this.heap[target], this.heap[index]] = [this.heap[index], this.heap[target]];
      index = target;
    }
  }

  size () {
    return this.heap.length
  }
}

// Example comparator functions:
const minHeapComparator = (parent, child) => parent <= child;
const maxHeapComparator = (parent, child) => parent >= child;

// Example usage:
const minHeap = new Heap(minHeapComparator);
minHeap.insert(10);
minHeap.insert(20);
minHeap.insert(5);
console.log(minHeap.pop()); // 5 (smallest element)

const maxHeap = new Heap(maxHeapComparator);
maxHeap.insert(10);
maxHeap.insert(20);
maxHeap.insert(5);
console.log(maxHeap.pop()); // 20 (largest element)
