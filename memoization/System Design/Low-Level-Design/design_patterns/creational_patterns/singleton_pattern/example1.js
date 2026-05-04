

let instance;
let counter = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
    console.log('instance: ', instance);
  }

  getInstance() {
    return this;
  }

  getCount() {
    console.log("this:", this);
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const singletonCounter = Object.freeze(new Counter());
console.log('singletonCounter: ', singletonCounter.getCount());
export default singletonCounter;