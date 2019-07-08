/**
 * Singly linked list are an alternative to the common array structure if you really care about insertion and deletion. If you only really care adding or deleting stuff to the front and end, it will be better than the array because you avoid having to shift multiple elements.
 */
// class Node {
//   constructor(value) {
//     this.value = value;
//     this.next = null;
//   }
// }

// class SinglyLinkedList {
//   constructor() {
//     this.head = null;
//     this.tail = null;
//     this.length = null;
//   }

//   push(value) {
//     let node = new Node(value);

//     if (!this.head) {
//       this.head = node;
//       this.tail = this.head;
//     } else {
//       this.tail.next = node;
//       this.tail = node;
//     }

//     length += 1;
//     return this;
//   }

//   pop() {
//     if (!this.head) return undefined;
    
//     let currentNode = this.head;
//     let newTail = currentNode;

//     while(currentNode.next) {
//       newTail = currentNode;
//       currentNode = currentNode.next;
//     }

//     this.tail = newTail;
//     this.tail.next = null;
//     this.length -= 1;

//     if (this.length === 0) {
//       // Shouldn't head be null as well? Is that automatically done?
//       this.tail = null;
//     }

//     return currentNode;
//   }

//   shift() {
//     if (!this.head) return undefined;

//     let currentHead = this.head;
//     this.head = currentHead.next;
//     this.length -= 1;

//     if (this.length === 0) {
//       this.tail = null;
//     }

//     return currentHead;
//   }

//   unshift(value) {
//     let currentNode = new Node(value);
    
//     if (!this.head && !this.tail) {
//       this.head = currentNode;
//       this.tail = currentNode;
//     } else {
//       currentNode.next = this.head;
//       this.head = currentNode;
//     }

//     return this;

//   }

//   get(index) {
    
//     if (index > this.length - 1 || index < 0) return null;
    
//     let currentNode = this.head;
//     let i = 0;
//     while (i < index) {
//       currentNode = currentNode.next;
//       i += 1;
//     }

//     return currentNode;
//   }

//   update(value, index) {
//     let foundNode = this.get(index);
//     if (foundNode) {
//       foundNode.value = value;
//       return true;
//     }
//     return false;
//   }

//   insert(value, index) {
//     if (index < 0 || index > this.length) return false;
    
//     if (index === this.length) {
//       this.push(value);
//       return true;
//     }
//     if (index === 0) {
//       this.unshift(value);
//       return true;
//     }

//     let newNode = new Node(value);
//     let prev = this.get(index - 1);
    
//     newNode.next = prev.next;
//     prev.next = newNode;

//     this.length += 1;
//     return true;
//   }

//   remove(index) {
//     if (index < 0 || index > this.length - 1) return undefined;
//     if (index === 0) return this.shift();
//     if (index === this.length - 1) return this.pop();

//     let previousNode = this.get(index - 1);
//     let removed = previousNode.next;
//     previousNode.next = removed.next;
//     this.length -= 1;

//     return removed;
//   }

//   reverse() {
//     let node = this.head;
//     this.head = this.tail;
//     this.tail = node;

//     let next;
//     let prev = null;

//     for (let i = 0; i < this.length; i++) {
//       next = node.next;
//       node.next = prev;

//       prev = node;
//       node = next;
//     }

//     return this;
//   }
// }

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class singlyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    let node = new Node(value);

    if (this.length === 0) {
      this.head = node;
      this.tail = this.head;
      this.length += 1;
    } else {
      this.tail.next = node;
      this.tail = node;
      this.length += 1;
    }

    return this;
  }

  pop() {
    if (this.length === 0) return undefined;
    
    let currentNode = this.head;
    let newTail = currentNode;

    while (currentNode.next) {
      newTail = currentNode;
      currentNode = currentNode.next;
    }

    this.tail = newTail;
    this.tail.next = null;
    this.length -= 1;
    
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return currentNode;
  }

  unshift(value) {
    let node = newNode(value);

    node.next = this.head;
    this.head = node;
    this.length += 1;

    return this;
  }

  shift() {
    if (this.length === 0) return undefined;

    let shiftHead = this.head;
    this.head = shiftHead.next;
    this.length -= 1;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return shiftHead;
  }

  getNode(index) {
    if (index < 0 || index > this.length - 1) return undefined;
    
    let i = 0;
    let currentNode = this.head;
    while (i < index) {
      currentNode = currentNode.next;
      i += 1;
    }

    return currentNode;
  }

  updateValue(newValue, index) {
    if (index < 0 || index > this.length - 1) return undefined;

    let i = 0;
    let currentNode = this.head;
    while (i < index) {
      currentNode = currentNode.next;
      i += 1;
    }
    
    currentNode.value = newValue;

    return this;
  }

  insertNode(value, index) {
    if (index < 0 || index > this.length) return false;
    
    if (index === this.length) {
      this.push(value);
      return true;
    }
    if (index === 0) {
      this.unshift(value);
      return true;
    }

    let node = new Node(value);
    let currentNode = this.head;
    
    let i = 0;
    // We want to stop at the index before since we only have a next pointer available.
    while (i < index - 1) {
      currentNode = currentNode.next;
      i += 1;
    }

    node.next = currentNode.next;
    currentNode.next = node;
    this.length += 1;

    return true;
  }

  removeNode(index) {
    if (index < 0 || index > this.length - 1) return false;

    if (index === 0) {
      this.shift();
      return true;
    }
    if (index === this.length - 1) {
      this.pop();
      return true;
    }

    let currentNode = this.head;
    let i = 0;
    // Continue until the index is right before it since we only have the next pointer reference.

    while (i < index - 1) {
      currentNode = currentNode.next;
      i += 1;
    }

    currentNode.next = currentNode.next.next;
    this.length -= 1;

    return true;
  }

  reverseList() {
    let node = this.head;
    [this.head, this.tail] = [this.tail, this.head];

    let next;
    let prev = null;

    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;

      prev = node;
      node = node.next;
    }

    return this;
  }
}