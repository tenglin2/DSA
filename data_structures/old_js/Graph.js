/**
 * Graphs are a collection of vertices that are connected by edges that may or may not be weighted and have values attached to these edges. This data structures is really useful for finding the relationship between different subsets of data. It is especially relevant for services that find recommendations. For this graph implementation we will be using an adjacency list instead of a adjacency matrix. There are pros and cons to this, mainly adjacency is great at accessing a certain value, but poor in every other case.
 * This implementation is an undirected graph so the edges go both ways.
 */
const Graph = class {
	constructor() {
		// We are representing the adjacency list as an object because the key value pair easily represents the connections to a specific vertex.
		this.adjacencyList = {};
	}

	// Adding a vertex to the adjacency list is just creating a new key entry and initializing the value pair as an empty array.
	addVertex(vertex) {
		// If the key for the vertex is not found, set its value to an empty array.
		if (!this.adjacencyList[vertex]) {
			this.adjacencyList[vertex] = [];
		}

		// If the vertex already exists, doesn't matter.

		// Return a reference to the Graph class.
		return this;
	}

	// Adding an edge to the adjacency list.
	addEdge(vertex1, vertex2) {
		// Error handling... If either vertice does not exist, return null.
		if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) {
			return null;
		}

		// The vertices need to be predefined for it to work.
		this.adjacencyList[vertex1].push(vertex2);
		this.adjacencyList[vertex2].push(vertex1);

		return this;
	}

	// Removing an edge from the adjacency list.
	removeEdge(vertex1, vertex2) {
		// Check if the vertices actually exist...
		if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) {
			return null;
		}

		// Filtering out the specific vertex...
		this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter((vertex) => {
			return vertex !== vertex2;
		});

		this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter((vertex) => {
			return vertex !== vertex1;
		});
	}

	removeVertex(vertex) {
		// Check if the vertex actually exists.
		if (!this.adjacencyList[vertex]) {
			return null;
		}
		// Loop through the list and empty it, removing every edge relationship.
		while (this.adjacencyList[vertex].length) {
			let adjacencyVertex = this.adjacencyList[vertex].pop();

			// Reusing our previous method to remove each edge.
			this.removeEdge(vertex, adjacencyVertex);
		}
		// Actually remove the object key from the adjacency list...
		delete this.adjacencyList[vertex];
	}

	// Recursive depth first search of the graph.
	depthFirstSearchRecursive(start) {
		// Result holds the correct order.
		let result = [];
		// Visited will store all the vertices that we traverse so that we don't visit again.
		let visited = {};
		// To avoid an undefined error because the dfs function does not have a reference to this.
		let adjacencyList = this.adjacencyList;

		// Helper methods that actual does the traversal through the graph.
		const dfs = function(vertex) {
			// Checking if the vertex is valid.
			if (!vertex) return null;
			// When we visit, we save it to the visited object so that we don't traverse twice.
			visited[vertex] = true;
			// Pushing the actual data to the return array.
			result.push(vertex);

			// Loop through the adjacency list to recursively search if not visited. Wary about this because forEach cannot be interrupted by a return. The iteration will complete regardless of any returns. In this case, I don't think it matters but still bad to use return inside of a forEach loop.
			adjacencyList[vertex].forEach((neighbor) => {
				if (!visited[neighbor]) {
					return dfs(neighbor);
				}
			});
		};
		dfs(start);

		// Outputing the result.
		console.log(result);

		// Returning the result in case you need for data manipulation.
		return result;
	}

	// Traverse iteratively.
	depthFirstSearchIterative(start) {
		// Looks like priority queue with heap.
		let stack = [ start ];
		let result = [];
		let visited = {};
		let currentVertex;

		visited[start] = true;

		// Look incredibly familiar to the graph stuff from class.
		while (stack.length) {
			// Note that the order is different because we pop instead of shift.
			currentVertex = stack.pop();
			result.push(currentVertex);

			// Traverse through each edge and visit if not already visited.
			this.adjacencyList[currentVertex].forEach((neighbor) => {
				if (!visited[neighbor]) {
					visited[neighbor] = true;
					stack.push(neighbor);
				}
			});
		}

		console.log(result);

		return result;
	}

	// Breadth first search should be eerily similar to the BST breadth first search.
	breadthFirstSearch(start) {
		let queue = [ start ];
		let result = [];
		let visited = {};
		visited[start] = true;
		let currentVertex;

		while (queue.length) {
			currentVertex = queue.shift();
			result.push(currentVertex);

			this.adjacencyList[currentVertex].forEach((neighbor) => {
				if (!visited[neighbor]) {
					visited[neighbor] = true;
					queue.push(neighbor);
				}
			});
		}

		// Outputting the traversal order in array format.
		console.log(result);

		// Returning the breadth first search
		return result;
	}
};

let graph = new Graph();
graph.addVertex('Dallas');
graph.addVertex('Tokyo');
graph.addVertex('New York');
graph.addVertex('Hong Kong');
graph.addVertex('Los Angeles');
graph.addEdge('Dallas', 'Tokyo');
graph.addEdge('Dallas', 'New York');
graph.addEdge('Hong Kong', 'Tokyo');
graph.addEdge('Hong Kong', 'Dallas');
graph.addEdge('Los Angeles', 'New York');
graph.addEdge('Los Angeles', 'Hong Kong');
console.log(graph.adjacencyList);
graph.depthFirstSearchIterative('Dallas');
graph.breadthFirstSearch('Dallas');
