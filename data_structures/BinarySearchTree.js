/**
 * Binary Search Trees are a very common and useful data structures that organizes data such that each node has a possible left and right child. 
 * Every BST is composed of a root and the relationship between parent and child nodes is leftChild.value < parent.value < rightChild.value. 
 * It is recursive by nature and is O(logn) for insertions, deletions, etc.
 * The logic behind the remove method makes sense, but the code is difficult to understand.
 */
const Node = class {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
};

const BinarySearchTree = class {
	constructor() {
		this.root = null;
	}

	add(value) {
		// Creating a node instance to add to the tree.
		let newNode = new Node(value);

		// If the tree is empty we assign the root to the new node.
		if (!this.root) {
			this.root = newNode;
			return this;
		}

		// We traverse through the tree until we find an endpoint.
		let currentNode = this.root;

		// Since we know there must be a position in the position, we use a while loop that ends when we find a spot and break. Note that we handle duplicates by adding to the left subtree. This can be handled in other ways.
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
			} else return null; // Should never happen, stylistic choice.
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
		};
		traverseTree(this.root);
	}

	// Note that they give us a value that we have to check if it exists in the tree. If so then we go ahead and remove it.
	remove(value) {
		// Describing the helper function that removes the node from the tree.
		const removeNode = function(node, value) {
			// Empty tree, return false.
			if (node === null) return false;

			// If the value is less than the current node, make a recursive step with the left node.
			if (value < node.value) {
				node.left = removeNode(node.left, value);
				return node;
			} else if (value > node.value) {
				// The other case where value is greater than current node.
				node.right = removeNode(node.right, value);
				return node;
			} else {
				// This case means the current node value is equal to the given value.

				// The current node is a leaf node, so we assign that node to null, effectively deleting it.
				if (node.left === null && node.right === null) return null;

				// Only one child, connect the parent and child of the current node.
				if (node.left === null) return node.right;
				if (node.right === null) return node.left;

				// Has two children so we need to find the minimum value in the right subtree (or the maximum value in the left subtree) then replace with the current node. The ensure that the order is still valid.
				let tempNode = node.right;
				while (tempNode.left !== null) {
					tempNode = tempNode.left;
				}

				// Switching the values.
				node.value = tempNode.value;

				// Recursive step that removes the temp node given the right subtree.
				node.right = removeNode(node.right, tempNode.data);

				// Returns the new node assignment which updates the tree.
				return node;
			}
		};

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
			currentNode.left && queue.push(currentNode.left);
			currentNode.right && queue.push(currentNode.right);
		}

		console.log(data);

		return this;
	}

	// Middle, Left, Right
	depthFirstSearchPreOrder() {
		let data = [];

		let traverseTree = function(currentNode) {
			data.push(currentNode.value);
			// Same as if statement with null else statement.
			currentNode.left && traverseTree(currentNode.left);
			currentNode.right && traverseTree(currentNode.right);
		};
		traverseTree(this.root);

		console.log(data);

		return this;
	}

	// Left, Middle, Right
	depthFirstSearchInOrder() {
		let data = [];

		let traverseTree = function(currentNode) {
			currentNode.left && traverseTree(currentNode.left);
			data.push(currentNode.value);
			currentNode.right && traverseTree(currentNode.right);
		};
		traverseTree(this.root);

		console.log(data);

		return this;
	}

	// Left, Right, Middle
	depthFirstSearchPostOrder() {
		let data = [];

		let traverseTree = function(currentNode) {
			currentNode.left && traverseTree(currentNode.left);
			currentNode.right && traverseTree(currentNode.right);
			data.push(currentNode.value);
		};
		traverseTree(this.root);

		console.log(data);

		return this;
	}
};

//     5
//   2   9
//  1  3  6  7

let bst = new BinarySearchTree();
bst.add(5);
bst.add(2);
bst.add(9);
bst.add(6);
bst.add(3);
bst.add(7);
bst.add(1);
bst.breadthFirstSearch();
bst.depthFirstSearchPreOrder();
bst.depthFirstSearchInOrder();
bst.depthFirstSearchPostOrder();

bst.remove(7);
bst.breadthFirstSearch();
