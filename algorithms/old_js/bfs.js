
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