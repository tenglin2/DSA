
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
