// Attach a listener to an array which gets triggered
// when an item is pushed into the array

//****************************** Using Proxy ************************/

let array = [];

const arrayHandler = {
  set(target, property, value) {
    if (property === 'length' || !isNaN(property)) {
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
arr.push = function (...items) {
  for (let item of items) {
    console.log(`Element added: ${item}`);
  }
  return Array.prototype.push.apply(this, items); // Call the original push
};

// Example usage
arr.push(1); // Logs: "Element added: 1"
arr.push(2, 3); // Logs: "Element added: 2", "Element added: 3"
console.log(arr); // [1, 2, 3]
