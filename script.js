/**
 * Data Structures and Algorithms Collection
 * This is a collection of useful DSnA in a JavaScript implementation.
 * I want to use this as a reference whenever I need to recall how one of these works.
 * Also, I may be using ES6 syntax which may not be acceptable at all interviews.
 */

// START



// Sets --> Can only have distinct elements, no repeats.
const mySet = function() {
  let collection = [];
  
  this.has = function(element) {
    return (collection.indexOf(element) !== -1);
  };

  this.values = function() {
    return collection;
  };

  this.add = function(element) {
    // No duplicates and returns based on if add was successful.
    if (!this.has(element)) {
      collection.push(element);
      return true;
    }
    return false;
  };

  this.remove = function(element) {
    // If the element exists, we find the index and remove from collection.
    if (this.has(element)) {
      index = collection.indexOf(element);
      collection.splice(index, 1);
      return true;
    }
    return false;
  };

  this.size = function() {
    return collection.length;
  };

  // Union means everything between the sets.
  this.union = function(otherSet) {
    let unionSet = new mySet();
    let firstArray = this.values(); // Now we can use array functions...
    let secondArray = otherSet.values();

    // Duplicates are not counted because we use add method.
    firstArray.forEach(element => {
      unionSet.add(element);
    });

    secondArray.forEach(element => {
      unionSet.add(element);
    });

    return unionSet;
  };

  // Both of the sets have these elements.
  this.intersection = function(otherSet) {
    let intersectionSet = new mySet();
    let firstArray = this.values();

    firstArray.forEach(element => {
      if (otherSet.has(element)) intersectionSet.add(element);
    });

    return intersectionSet;
  };

  this.difference = function(otherSet) {
    let differenceSet = new mySet();
    let firstArray = this.values();
    let secondArray = this.values();

    firstArray.forEach(element => {
      if (!otherSet.has(element)) {
        differenceSet.add(element);
      }
    });

    secondArray.forEach(element => {
      if (!otherSet.has(element)) {
        differenceSet.add(element);
      }
    });

    return differenceSet;
  };

  // To check if this set is a subset of argument.
  this.subset = function(otherSet) {
    let firstArray = this.values();

    return (firstArray.every(element => {
      otherSet.has(element);
    }));
  }
}

// Queues
const Queue = function() {
  collection = [];

  this.print = function() {
    console.log(collection);
  };

  this.enqueue = function(element) {
    collection.push(element);
  };

  this.dequeue = function() {
    return collection.shift();
  };

  this.front = function(){
    return collection[0];
  };

  this.size = function() {
    return collection.length;
  };

  this.isEmpty = function() {
    return (collection.length === 0);
  };
}

// Priority Queue --> Assumes format of [element, priority] where 1 has greater priority than 3.
const PriorityQueue = function() {
  let collection = [];

  this.print = function() {
    console.log(collection);
  };

  this.enqueue = function(element) {
    // Nothing else in queue, just push, priority irrelevant.
    if (this.isEmpty()) {
      collection.push(element);
    } else {
      let added = false;

      for (let i = 0; i < collection.length; i += 1) {
        if (element[1] < collection[i][1]) {
          collection.splice(i, 0, element);
          added = true;
          break;
        }
      }

      // Lowest priority so just add to the back.
      if (!added) {
        collection.push(element);
      }
    }
  };

  this.dequeue = function() {
    return collection.shift()[0]; // Just giving back the element and not priority.
  };

  this.front = function(){
    return collection[0];
  };

  this.size = function() {
    return collection.length;
  };

  this.isEmpty = function() {
    return (collection.length === 0);
  };
}

// Binary Search Trees

// Class implementation...
// class Node {
//   constructor(data, left = null, right = null) {
//     this.data = data;
//     this.left = left;
//     this.right = right;
//   }
// }

const Node = function(data, left = null, right = null) {
  this.data = data;
  this.left = left;
  this.right = right;
}

const BST = function() {
  this.root = null; // Plan on making multiple BST instances? Why 'this' keyword?

  this.add = function(data) {
    let currentNode = this.root;

    if (currentNode === null) {
      this.root = new Node(data);
      return;
    } else {
      // Traverse through the array and find the appropriate spot with recursive function.
      const searchTree = function(currentNode) {
        // I put <= to handle the case where equal value elements are left children.
        if (data <= currentNode.data) {
          if (currentNode.left === null) {
            currentNode.left = new Node(data);
            return;
          } else if (currentNode.left !== null) {
            return searchTree(currentNode.left);
          }
        } else if (data > currentNode.data) {
          if (currentNode.right === null) {
            currentNode.right = new Node(data);
            return;
          } else if (currentNode.right !== null) {
            return searchTree(currentNode.right);
          }
        } else return null;
      };
      return searchTree(currentNode);
    }
  };

  this.findMin = function() {
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  };

  this.findMax = function() {
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  };

  this.isPresent = function(data) {
    let current = this.root;
    while (current) {
      if (data === current.data) {
        return true;
      } else if (data < current.data) {
        current = current.left;
      } else current = current.right;
    }
    return false;
  };

  // This one is really confusing.
  this.remove = function(data) {
    const removeNode = function(node, data) {
      if (node === null) {
        return null;
      }
      
      // We found the removal element, but we have to fix order afterwards.
      if (data === node.data) {
        if (node.left === null && node.right === null) {
          return null;
        }
        if (node.left === null) {
          return node.right;
        }
        if (node.right === null) {
          return node.left;
        }

        // If removed node has two children... Replaced with smallest of right branch or largest of left branch.
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    }
    this.root = removeNode(this.root, data);
  };
};



// BFS
let exBFSGraph = [
  [0,1,1,1,0],
  [0,0,1,0,0],
  [1,1,0,0,0],
  [0,0,0,1,0],
  [0,1,0,0,0]
];

let BFS = function(graph, root) {
  let nodesLen = {};

  // Initially set all lengths from root to infinity.
  for (let i = 0; i < graph.length; i += 1) {
    nodesLen[i] = Infinity;
  }
  
  n   = 0;

  let queue = [root];
  let current;

  while (queue.length != 0) {
    current = queue.shift();

    let curConnected = graph[current]; // First pass is [0,0,1,0,0]
    let neighborIdx = [];
    let idx = curConnected.indexOf(1); // Finds first connected edge.

    while (idx != -1) {
      neighborIdx.push(idx); // Saves connected edge as neighbor.
      // Loop through rest of neighbors but start at next index. Wait but what if they aren't connected? Wouldn't it just stop pushing and skip? Bad.
      idx = curConnected.indexOf(1, idx + 1); 
    }

    // Loop through neighbors array to find the lengths from root.
    for (let j = 0; j < neighborIdx.length; j += 1) {
      if (nodesLen[neighborIdx[j]] === Infinity) {
        nodesLen[neighborIdx[j]] = nodesLen[current] + 1;
        queue.push(neighborIdx[j]);
      }
    }
  }
  return nodesLen;
};


// console.log(BFS(exBFSGraph, 1));