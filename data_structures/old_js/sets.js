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