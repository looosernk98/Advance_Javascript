// Attach a listener to an array which gets triggered
// when an item is pushed into the array

//****************************** Using Proxy ************************/

let array = [];

const arrayHandler = {
  set(target, property, value) {
    // console.log('target, property, value: ', target, property, value);
    // Only log when a numeric index is set (element added), not when length changes, otherwise it prints two times one for item added and second for length increment
    if (!isNaN(property) && property !== 'length') {
      console.log(`Element added: ${value}`);
    }
    target[property] = value;
    return true;
  }
};

const observedArray = new Proxy(array, arrayHandler);

// Example usage
observedArray.push(1); // Logs: "Element added: 1"
observedArray.push(2); // Logs: "Element added: 2"
console.log(observedArray); // [1, 2]


//***************************** Overriding push Method ***************/

let arr = [];

// // Overrides the push method directly on the array instance
// arr.push = function (...items) {
//   for (let item of items) {
//     console.log(`Element added: ${item}`);
//   }
//   console.log("this: ", this)
//   // this will refer array instance
//   return Array.prototype.push.apply(this, items); // Call the original push
// };


// Overrides the push method directly on the array instance using Object.defineProperty
// to make it non-enumerable so it won't show up in console.log
Object.defineProperty(arr, 'push', {
  value: function (...items) {
    for (let item of items) {
      console.log(`Element added: ${item}`);
    }
    // this will refer array instance
    return Array.prototype.push.apply(this, items); // Call the original push
  },
  writable: true,
  enumerable: false, // This prevents the method from showing up in console.log
  configurable: true
});

// Example usage
arr.push(1); // Logs: "Element added: 1"
arr.push(2, 3); // Logs: "Element added: 2", "Element added: 3"
console.log(arr); // [1, 2, 3]
