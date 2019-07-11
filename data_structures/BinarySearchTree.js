/**
 * Binary Search Trees are a very common and useful data structures that organizes data such that each node has a possible left and right child. Every BST is composed of a root and the relationship between parent and child nodes is leftChild.value < parent.value < rightChild.value. It is recursive by nature and is O(logn) for insertions, deletions, etc.
 * 
 * I am letting duplicates and putting them on the left side of the binary search tree. Another solution to duplicates would be to attach a frequency property onto the node instance.
 * 
 * 
 * Need to add methods for remove, min, max, and present/exists. Removal seems difficult since you have to handle multiple cases for order messing up.
 */
const Node = class {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const BinarySearchTree = class {
  constructor() {
    this.root = null;
  }

  // What am I returning after adding? True? The Node? Guessing empty return since the information was already available and implicit. Outputting the BST structure would not be helpful.
  add(value) {
    let newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    // We traverse through the tree until we find an endpoint.
    let currentNode = this.root;
    while (true) {
      if (newNode.value <= currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      } else if (newNode.value > currentNode.value) {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      }
    }

    // An alternative that uses a recursive traversal function until add.
    const traverseTree = function(currentNode) {
      if (node.value <= currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = node;
          return;
        }
        traverseTree(currentNode.left);
      } else if (node.value > currentNode.value) {
        if (!currentNode.right) {
          currentNode.right = node;
          return;
        }
        traverseTree(currentNode.right);
      } else return null;
    }
    traverseTree(this.root);
  }

  // I do not understand the deletion step. I understand that you have a helper function that does the removal, but I'm not sure what the exact step is done to remove the value. I guess it is the assignment step at the bottom, but why specifically the root?
  // I guess the first part is just finding the value until you get to the else clause. It works recursively so the left and right children are changed from the assignment. Need to look at other resources for clarity.
  remove(value) {
    const removeNode = function(node, value) {
      // Empty tree, return false.
      if (node === null) return false;

      //
      if (value < node.value) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (value > node.value) {
        node.right = removeNode(node.right, value);
        return node;
      } else {
        if (node.left === null && node.right === null) return null;
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;

        let tempNode = node.right;
        while(tempNode.left !== null) {
          tempNode = tempNode.left;
        }

        node.value = tempNode.value;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      }
    }

    this.root = removeNode(this.root, value);
  }

  findMin() {
    let currentNode = this.root;
    while (currentNode.left !== null) currentNode = currentNode.left;
    return currentNode.value;
  }

  findMax() {
    let currentNode = this.root;
    while (currentNode.right !== null) currentNode = currentNode.right;
    return currentNode.value;
  }

  isPresent(value) {
    let currentNode = this.root;

    while (currentNode) {
      if (currentNode.value < value) currentNode = currentNode.left;
      else if (currentNode.value > value) currentNode = currentNode.right;
      else return true;
    }

    return false;
  }

  // Logic behind this is to populate a queue and add the left and right children of each element into queue as the parent element is shifted into the data array.
  breadthFirstSearch() {
    let currentNode = this.root;
    let queue = [];
    let data = [];

    queue.push(currentNode); // What if I push a root node that doesn't exist? Will array length stay 0?
    while (queue.length) {
      currentNode = queue.shift();
      data.push(currentNode.value);

      // Same logic as if statement with null else statement.
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    return data;
  }

  // Middle, Left, Right
  depthFirstSearchPreOrder() {
    let data = [];

    let traverseTree = function(currentNode) {
      data.push(currentNode.value);
      // Same as if statement with null else statement.
      node.left && traverseTree(node.left);
      node.right && traverseTree(node.right);
    };
    traverseTree(this.root);

    return data;
  }

  // Left, Middle, Right
  depthFirstSearchInOrder() {
    let data = [];

    let traverseTree = function(currentNode) {
      node.left && traverseTree(node.left);
      data.push(currentNode.value);
      node.right && traverseTree(node.right);
    };
    traverseTree(this.root);

    return data;
  }

  // Left, Right, Middle
  depthFirstSearchPostOrder() {
    let data = [];

    let traverseTree = function(currentNode) {
      node.left && traverseTree(node.left);
      node.right && traverseTree(node.right);
      data.push(currentNode.value);
    };
    traverseTree(this.root);

    return data;
  }

};