// ✅ debounce implementation
function debounce(func, wait) {
    let timerId;
  
    return function (...args) {
      clearTimeout(timerId);
  
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  }

  function incrementFunc(delta) {
    this.val += delta;
    console.log("Updated value:", this.val);
  }
  
  // ✅ Example usage demonstrating `this` binding
  const increment = debounce(incrementFunc, 500);
  
  const obj = {
    val: 2,
    increment,
  };
  
  console.log("Before call:", obj.val);
  obj.increment(3);
  console.log("After immediate call:", obj.val);
  
  // Wait > 500ms to see the debounced result
  setTimeout(() => {
    console.log("After debounce delay:", obj.val);
  }, 1000);
  