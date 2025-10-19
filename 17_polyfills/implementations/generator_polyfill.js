// Generator Polyfill
// Note: This is a simplified implementation that demonstrates generator concepts
// A true polyfill would require transpilation at the syntax level

// Generator states
const GENERATOR_STATES = {
  SUSPENDED_START: 'suspendedStart',
  SUSPENDED_YIELD: 'suspendedYield', 
  COMPLETED: 'completed'
};

// Custom Generator Constructor
function MyGenerator(generatorFunction) {
  this.generatorFunction = generatorFunction;
  this.state = GENERATOR_STATES.SUSPENDED_START;
  this.value = undefined;
  this.done = false;
  this.context = {};
  this.stepIndex = 0;
}

// Generator iterator methods
MyGenerator.prototype.next = function(value) {
  if (this.state === GENERATOR_STATES.COMPLETED) {
    return { value: undefined, done: true };
  }

  try {
    // Execute the generator function step by step
    const result = this.generatorFunction.call(this.context, value, this.stepIndex);
    
    if (result && result.isYield) {
      this.state = GENERATOR_STATES.SUSPENDED_YIELD;
      this.value = result.value;
      this.stepIndex++;
      return { value: result.value, done: false };
    } else {
      this.state = GENERATOR_STATES.COMPLETED;
      this.done = true;
      return { value: result, done: true };
    }
  } catch (error) {
    this.state = GENERATOR_STATES.COMPLETED;
    this.done = true;
    throw error;
  }
};

MyGenerator.prototype.return = function(value) {
  this.state = GENERATOR_STATES.COMPLETED;
  this.done = true;
  return { value: value, done: true };
};

MyGenerator.prototype.throw = function(error) {
  if (this.state === GENERATOR_STATES.COMPLETED) {
    throw error;
  }
  
  this.state = GENERATOR_STATES.COMPLETED;
  this.done = true;
  throw error;
};

// Make generator iterable
MyGenerator.prototype[Symbol.iterator] = function() {
  return this;
};

// Helper function to create yield-like behavior
function createYield(value) {
  return { isYield: true, value: value };
}

// Factory function to create generators
function createGenerator(generatorFunc) {
  return function(...args) {
    const boundFunction = generatorFunc.bind(null, ...args);
    return new MyGenerator(boundFunction);
  };
}



// ============================= Example usage and testing ==========================


// Example 1: Simple number generator
const numberGenerator = createGenerator(function(max, passedValue, step) {
  const numbers = [];
  
  switch(step) {
    case 0:
      numbers.push(1);
      return createYield(1);
    case 1:
      numbers.push(2);
      return createYield(2);
    case 2:
      numbers.push(3);
      return createYield(3);
    case 3:
      if (max && max > 3) {
        return createYield(4);
      }
      return 'done';
    default:
      return 'done';
  }
});

// Example 2: Fibonacci generator
const fibonacciGenerator = createGenerator(function(n = 10, passedValue, step) {
  const fib = [0, 1];
  
  if (step === 0) {
    return createYield(0);
  } else if (step === 1) {
    return createYield(1);
  } else if (step < n) {
    const nextFib = fib[0] + fib[1];
    fib[0] = fib[1];
    fib[1] = nextFib;
    
    // Store state in context for next iteration
    this.fib = fib;
    return createYield(nextFib);
  } else {
    return 'sequence complete';
  }
});

// Example 3: Custom range generator
const rangeGenerator = createGenerator(function(start, end, passedValue, step) {
  const current = start + step;
  
  if (current <= end) {
    return createYield(current);
  } else {
    return 'range complete';
  }
});

// Test the generators
console.log('=== Number Generator Test ===');
const numGen = numberGenerator(5);
console.log(numGen.next()); // { value: 1, done: false }
console.log(numGen.next()); // { value: 2, done: false }
console.log(numGen.next()); // { value: 3, done: false }
console.log(numGen.next()); // { value: 4, done: false }
console.log(numGen.next()); // { value: 'done', done: true }

console.log('\n=== Fibonacci Generator Test ===');
const fibGen = fibonacciGenerator(7);
let fibResult = fibGen.next();
while (!fibResult.done) {
  console.log(fibResult.value);
  fibResult = fibGen.next();
}

console.log('\n=== Range Generator Test ===');
const rangeGen = rangeGenerator(5, 10);
for (let value of rangeGen) {
  console.log('Range value:', value);
}

console.log('\n=== Generator Methods Test ===');
const testGen = numberGenerator();
console.log('First next:', testGen.next());
console.log('Return early:', testGen.return('early exit'));
console.log('Next after return:', testGen.next()); // Should be done

// Advanced Generator with state management
const advancedGenerator = createGenerator(function(initialValue, passedValue, step) {
  // Initialize state on first call
  if (!this.state) {
    this.state = { count: initialValue || 0, values: [] };
  }
  
  switch(step) {
    case 0:
      this.state.count += 1;
      this.state.values.push(this.state.count);
      return createYield(`Step ${step}: ${this.state.count}`);
    case 1:
      // Use passed value from previous next() call
      if (passedValue) {
        this.state.count += passedValue;
      }
      this.state.values.push(this.state.count);
      return createYield(`Step ${step}: ${this.state.count} (added ${passedValue || 0})`);
    case 2:
      this.state.count *= 2;
      this.state.values.push(this.state.count);
      return createYield(`Step ${step}: ${this.state.count} (doubled)`);
    default:
      return { final: this.state.count, history: this.state.values };
  }
});

console.log('\n=== Advanced Generator with State ===');
const advGen = advancedGenerator(10);
console.log(advGen.next());       // Step 0: 11
console.log(advGen.next(5));      // Step 1: 16 (added 5)
console.log(advGen.next());       // Step 2: 32 (doubled)
console.log(advGen.next());       // { final: 32, history: [11, 16, 32] }

// Utility function to convert any iterable to array using our generator
function generatorToArray(generator) {
  const result = [];
  let iteration = generator.next();
  
  while (!iteration.done) {
    result.push(iteration.value);
    iteration = generator.next();
  }
  
  return result;
}

console.log('\n=== Generator to Array ===');
const arrayGen = numberGenerator();
const array = generatorToArray(arrayGen);
console.log('Generator as array:', array);
