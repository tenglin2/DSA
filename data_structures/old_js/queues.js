
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