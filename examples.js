require('./');

let arr = [1, 2, 3, 4, 5];
console.log(arr.removeFilter(v => v > 2)); // [ 3, 4, 5 ]
console.log(arr); // [ 1, 2 ]

arr = [1, 2, 3, 4, 5];
console.log(arr.removeFind(v => v > 2)); // 3
console.log(arr); // [ 1, 2, 4, 5 ]

arr = [1, 2, 3, 4, 5];
console.log(arr.removeFind(v => v > 7)); // undefined
console.log(arr); // [ 1, 2, 3, 4, 5 ]

let deepArray = [1, [2, [3, [4, [5, [6, [7, [8, [9, [10, [11, [12, [13, [14, [15]]]]]]]]]]]]]]];
console.log(deepArray.depth) // 15
console.log(deepArray.straight) // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ]

console.log(Array.create()); // []
console.log(Array.create(3)); // [ undefined, undefined, undefined ]
console.log(Array.create(4, 'hi')); // [ 'hi', 'hi', 'hi', 'hi' ]

console.log(Array.createMap(5, (v, i, a) => i * 5)); // [ 0, 5, 10, 15, 20 ]

console.log(Array.merge([1, [2, [3]]], [5, 6, 7, 8, 9], [], [1])); // [ 1, [ 2, [ 3 ] ], 5, 6, 7, 8, 9, 1 ]

console.log(Array.withNumbers(5, 10)); // [ 5, 6, 7, 8, 9, 10 ]
console.log(Array.withNumbers(5)); // [ 0, 1, 2, 3, 4 ]

