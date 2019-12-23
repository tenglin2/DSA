// Stacks
const Stack = function() {
  this.count = 0;
  // We implement it as an object because an array is already a stack implementation.
  this.storage = {};
  
  this.push = function(element) {
    this.storage[this.count] = element;
    count += 1;
  };

  this.pop = function() {
    // In case pop is run on empty stack...
    if (this.count === 0) {
      return undefined;
    }

    let result = this.storage[this.count];
    delete this.storage[this.count - 1]; // Removes the last element.
    count -= 1;

    return result;
  };

  this.size = function() {
    return this.count;
  };

  this.peek = function() {
    return this.storage[this.count - 1];
  };
};