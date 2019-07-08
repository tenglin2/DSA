// It would make more sense to use front and back instead of first and last. 

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(value) {
    let node = new Node(value);

    if (!this.first) {
      this.first = node;
      this.last = node;
      this.size += 1;
    } else {
      this.last.next = node;
      this.last = node;
      this.size += 1;
    }

    return this;
  }

  dequeue() {
    if (this.size === 0) return null;
    let dequeuedNode = this.first;

    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size -= 1;
    
    return dequeuedNode.value;
  }
}