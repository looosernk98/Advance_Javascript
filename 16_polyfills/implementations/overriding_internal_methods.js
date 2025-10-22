
Function.prototype.call = function(thisObj, ...args){
    // console.log("INTERNAL"); // 👈 this line causes trouble
     
     const fn = this
  
     thisObj._tempFn = fn
  
     const result = thisObj._tempFn(...args)
  
     delete thisObj._tempFn;
     return  result;
     
  }
  
  const person = {
     name: "niru",
     age: 23
  }
  
  function printName(...args) {
     console.log(args)
     console.log(this.name);
  }
  
  printName.call(person, "delhi" , 110086)

  /*

Why does console.log break it?

When you write console.log("INTERNAL"), you are calling the built-in console.log 
function.

But now, every function’s call method has been overridden with your version 
(including console.log).

So when JS tries to execute console.log(...), internally it needs to use .call — but 
it finds your version, which again calls console.log, which again uses .call, 
and so on.

→ Infinite recursion → Maximum call stack size exceeded.

  */

// ✅ How to fix it

// You should save the original call before overriding, or avoid touching the global Function.prototype.call at all 
// (just write your own helper).

const originalCall = Function.prototype.call;

Function.prototype.call = function(thisObj, ...args){
    // Use original console.log without recursion
    originalCall.call(console.log, console, "INTERNAL");
     
    const fn = this;
    thisObj._tempFn = fn;
    const result = thisObj._tempFn(...args);
    delete thisObj._tempFn;
    return result;
};
