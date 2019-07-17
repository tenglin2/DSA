/**
 * Need a weighted graph with valued edges to implement Dijkstra's algorithm for shortest path.
 */
// const WeightedGraph = class {
// 	constructor() {
// 		this.adjacencyList = {};
// 	}

// 	addVertex(vertex) {
// 		if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
// 	}

// 	addEdge(vertex1, vertex2, weight) {
// 		this.adjacencyList[vertex1].push({
// 			node: vertex2,
// 			weight: weight
// 		});
// 		this.adjacencyList[vertex2].push({
// 			node: vertex1,
// 			weight: weight
// 		});
// 	}

// 	// Removing an edge also uses the filter method, but the argument is an object and you need to access the node value to check. Still very similar though.

// 	dijkstra(start, end) {
// 		let nodes = new PriorityQueue();
// 		let distances = {};
// 		let previous = {};
// 		let path = [];
// 		let smallest;

// 		for (let vertex in this.adjacencyList) {
// 			// Shouldn't it be vertex.node? No because it's not the edges.
// 			if (vertex === start) {
// 				distances[vertex] = 0;
// 				nodes.enqueue(vertex, 0);
// 			} else {
// 				distances[vertex] = Infinity;
// 				nodes.enqueue(vertex, Infinity);
// 			}
// 			previous[vertex] = null;
// 		}

// 		while (nodes.values.length) {
// 			smallest = nodes.dequeue();
// 			if (smallest === end) {
// 				// Done
// 				while (previous[smallest]) {
// 					path.push(smallest);
// 					smallest = previous[smallest];
// 				}
// 				break;
// 			}
// 			if (smallest || distances[smallest] !== Infinity) {
// 				for (let neighbor in this.adjacencyList[smallest]) {
// 					let nextNode = this.adjacencyList[smallest][neighbor];

// 					let candidate = distances[smallest] + nextNode.weight;
// 					let nextNeighbor = nextNode.node;
// 					if (candidate < distances[nextNeighbor]) {
// 						distances[nextNeighbor] = candidate;
// 						previous[nextNeighbor] = smallest;
// 						nodes.enqueue(nextNeighbor, candidate);
// 					}
// 				}
// 			}
// 		}
// 		console.log(path.concat(smallest).reverse());
// 		return path.concat(smallest).reverse();
// 	}
// };

// const PriorityQueue = class {
// 	constructor() {
// 		this.values = [];
// 	}

// 	enqueue(value, priority) {
// 		this.values.push({
// 			value: value,
// 			priority: priority
// 		});
// 		this.sort();
// 	}

// 	dequeue() {
// 		return this.values.shift();
// 	}

// 	sort() {
// 		this.values.sort((a, b) => a.priority - b.priority);
// 	}
// };
const WeightedGraph = class {
	constructor() {
		this.adjacencyList = {};
	}

	// Adding a vertex is just making a new key value entry with empty array.
	addVertex(vertex) {
		if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
	}

	// Adding a weighted edge means that the values you push in are objects that contain the node connection and the weight.
	addEdge(vertex1, vertex2, weight) {
		this.adjacencyList[vertex1].push({
			node: vertex2,
			weight: weight
		});
		this.adjacencyList[vertex2].push({
			node: vertex1,
			weight: weight
		});
	}

	dijkstra(start, end) {
		// Are these the edges?
		let nodes = new PriorityQueue();
		let distances = {}; // Distance from start.
		let previous = {};
		let path = [];
		let smallest; // What is this?

		// Initialize everything first...
		// Nevermind, using for in iterates through the keys. You can easily access the properties using the keys.
		for (let vertex in this.adjacencyList) {
			if (vertex === start) {
				distances[start] = 0;
				nodes.enqueue(vertex, 0);
			} else {
				distances[vertex] = Infinity;
				nodes.enqueue(vertex, Infinity);
			}
			previous[vertex] = null;
		}

		// As long as there is something to visit...
		while (nodes.values.length) {
			smallest = nodes.dequeue().val; // Taking the smallest distance from the priority queue as a min heap.
			// We finally found the destination
			if (smallest === end) {
				// Build the path it took to get here.
				while (previous[smallest]) {
					path.push(smallest);
					smallest = previous[smallest];
				}
				break; // Breaks out of the closest loop or switch statement. In this case it is the while loop.
			}

			// If smallest exists...
			if (smallest || distances[smallest] !== Infinity) {
				for (let neighbor in this.adjacencyList[smallest]) {
					let nextNode = this.adjacencyList[smallest][neighbor];
					let candidate = distances[smallest] + nextNode.weight;
					let nextNeighbor = nextNode.node;
					if (candidate < distances[nextNeighbor]) {
						distances[nextNeighbor] = candidate;
						previous[nextNeighbor] = smallest;
						nodes.enqueue(nextNeighbor, candidate);
					}
				}
			}
		}

		return path.concat(smallest).reverse();
	}
};

const Node = class {
	constructor(value, priority) {
		this.value = value;
		this.priority = priority;
	}
};

const PriorityQueue = class {
	constructor() {
		this.values = [];
	}

	enqueue(value, priority) {
		let newNode = new Node(value, priority);
		this.values.push(newNode);
		this.bubbleUp();
	}

	bubbleUp() {
		let index = this.values.length - 1;

		// value is the last element that we just added as a node.
		let value = this.values[index];

		// Continue to iterate until break or root element of heap.
		while (index > 0) {
			let parentIndex = Math.floor((index - 1) / 2);
			let parent = this.values[parentIndex];

			// We implement this priority queue by prioritizing lower numbers.
			if (value.priority >= parent.priority) break;

			this.values[parentIndex] = value;
			this.values[index] = parent;
			index = parentIndex;
		}
	}

	// We are removing the greatest importantce/priority element. In this case it is the lowest number priority.
	dequeue() {
		// The root element will have the min priority
		let min = this.values[0];

		// Removing the end node from the array and setting to a variable.
		let end = this.values.pop();

		if (this.values.length > 0) {
			this.values[0] = end;

			// Sink down is to correct the position of the new root node.
			this.sinkDown();
		}

		return min;
	}

	sinkDown() {
		let index = 0;
		let length = this.values.length;
		let value = this.values[0];

		while (true) {
			// Formulas for children.
			let leftChildIndex = 2 * index + 1;
			let rightChildIndex = 2 * index + 2;

			let leftChild;
			let rightChild;

			// Used to find the index of the child to swap the current node with.
			let swap = null;

			// If the index of the child is valid and inside the values array.
			if (leftChildIndex < length) {
				leftChild = this.values[leftChildIndex];

				// If the child has a smaller priority number then we need to swap.
				if (leftChild.priority < value.priority) {
					swap = leftChildIndex;
				}
			}
			if (rightChildIndex < length) {
				rightChild = this.values[rightChildIndex];

				if (
					(swap === null && rightChild.priority < value.priority) ||
					(swap !== null && rightChild.priority < leftChild.priority)
				) {
					swap = rightChildIndex;
				}
			}

			// Break case if children fail.
			if (swap === null) break;
			this.values[index] = this.values[swap];
			this.values[swap] = value;

			// Updating the new index.
			index = swap;
		}
	}
};

let graph = new WeightedGraph();

graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'E', 3);
graph.addEdge('C', 'D', 2);
graph.addEdge('C', 'F', 4);
graph.addEdge('D', 'E', 3);
graph.addEdge('D', 'F', 1);
graph.addEdge('E', 'F', 1);

console.log(graph.dijkstra('A', 'E'));
console.log(graph.adjacencyList);
