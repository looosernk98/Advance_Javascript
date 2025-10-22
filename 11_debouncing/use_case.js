// ✅ debounce implementation with cancel and flush
function debounce(func, wait) {
    let timerId;
    let lastArgs;
    let lastThis;
  
    function debounced(...args) {
      console.log("delayed debounced fn was called...")
      lastArgs = args;
      lastThis = this;
  
      clearTimeout(timerId);
  
      timerId = setTimeout(() => {
        func.apply(lastThis, lastArgs);
        timerId = null;
        lastArgs = lastThis = null;
      }, wait);
    }
  
    // Cancel any pending invocation
    debounced.cancel = function () {
      clearTimeout(timerId);
      timerId = null;
      lastArgs = lastThis = null;
    };
  
    // Immediately invoke pending call if any
    debounced.flush = function () {
      if (timerId) {
        clearTimeout(timerId);
        func.apply(lastThis, lastArgs);
        timerId = null;
        lastArgs = lastThis = null;
      }
    };
  
    return debounced;
  }
  

  function incrementFunc(delta) {
    this.val += delta;
    console.log("Updated value:", this.val);
  }
  
  // ✅ Example usage demonstrating `this` binding
  const increment = debounce(incrementFunc, 3000);
  
  const obj = {
    val: 2,
    increment,
  };
  
  //=================================================================

  console.log("Before call:", obj.val);
  obj.increment(3);
  console.log("After immediate call:", obj.val);


// Force execute immediately
setTimeout(() => increment.flush(), 1000); // Executes "World" immediately


//=================================================================

// // Schedule new call but cancel it before execution
setTimeout(() => obj.increment('Cancelled message'), 1200);
setTimeout(() => increment.cancel(), 1500);
  