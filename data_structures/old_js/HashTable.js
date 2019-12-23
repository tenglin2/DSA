/**
 * Hash tables have constant time complexity which makes it really fast compared to every other data structure.
 * The most interesting part is the hash function because you are basically making a unique way of mapping a key to an index. Usually you do some math with prime numbers and modulus by the fixed size of the array. That's important to note. Hash tables should declare a size or else it would take up an immense amount of space. For learning purposes you don't really need that much for size, but understand that there is usually more.
 * Insertion, Deletion, and Access of a Hash Table are O(1). However it depends a lot on how well your hash function is for mapping a key to an index.
 */
const HashTable = class {
	constructor(size = 53) {
		// Creating a fixed size array to store our hash table. This is necessary. Choose a prime number for the array size.
		this.keyMap = new Array(size);
	}

	// The hashing function is a protected method that takes a key string and maps it to an index for the keyMap position. There are many different ways to do this, but a simple implementation would be to use the character code of each character and do some math with it. Take the modulus of the keyMap length to ensure that indices are valid.
	_hash(key) {
		let total = 0;
		let WEIRD_PRIME = 31;

		for (let i = 0; i < Math.min(key.length, 100); i++) {
			let char = key[i];
			// CHANGE THIS TO LOWERCASE STRING KEY, CANNOT HANDLE UPPERCASE.
			let value = char.charCodeAt(0) - 96;
			total = (total * WEIRD_PRIME + value) % this.keyMap.length;
		}

		return total;
	}

	set(key, value) {
		let index = this._hash(key);

		// If there is nothing already in the keymap, initialize that position with an empty array which we will push into.
		if (!this.keyMap[index]) {
			this.keyMap[index] = [];
		}

		// Push both the key and value into the hash table to reference with get later.
		this.keyMap[index].push([ key, value ]);
	}

	get(key) {
		let index = this._hash(key);
		if (this.keyMap[index]) {
			// Looping through the values inside of a specific index because there can be collisions.
			for (let i = 0; i < this.keyMap[index].length; i++) {
				if (this.keyMap[index][i][0] === key) {
					return this.keyMap[index][i][1];
				}
			}
		}

		// Undefined is better return than null because not finding the entry is not intentional.
		return undefined;
	}

	// These key and value methods seem to be terrible time complexity because it has a double for loop and an includes() method which at worst will be n^3. However this would never realistically happen unless the hash table was absolutely terrible and had multiple key collisions. Without key collisions it would just be O(n) which is not terrible.
	keys() {
		let keysArray = [];

		// Looping through each keyMap space.
		for (let i = 0; i < this.keyMap.length; i++) {
			// Checking if that spot is filled.
			if (this.keyMap[i]) {
				// Looping through to handle cases of key collision, ie same index, multiple key, value pairs.
				for (let j = 0; j < this.keyMap[i].length; j++) {
					// Do not include duplicates.
					if (!keysArray.includes(this.keyMap[i][j][0])) {
						keysArray.push(this.keyMap[i][j][0]);
					}
				}
			}
		}

		console.log(keysArray);

		return keysArray;
	}

	values() {
		let valuesArray = [];

		for (let i = 0; i < this.keyMap.length; i++) {
			if (this.keyMap[i]) {
				for (let j = 0; j < this.keyMap[i].length; j++) {
					// Need to check for duplicates...
					if (!valuesArray.includes(this.keyMap[i][j][1])) {
						valuesArray.push(this.keyMap[i][j][1]);
					}
				}
			}
		}

		console.log(valuesArray);

		return valuesArray;
	}

	print() {
		console.log(this.keyMap);

		return this;
	}
};

let hash = new HashTable(6);
console.log('hello');
hash.print();
hash.set('key1', 'val1');
hash.set('key2', 'val2');
hash.set('key3', 'val3');
hash.set('key4', 'val4');
hash.set('key5', 'val5');
hash.set('key6', 'val6');
hash.set('key7', 'val7');

console.log(hash.keyMap);
console.log(hash.get('key6'));
console.log(hash.keyMap);
hash.values();
hash.keys();
hash.print();
console.log(hash.get('key1'));
