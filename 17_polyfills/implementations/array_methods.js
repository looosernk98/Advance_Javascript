// if (typeof Array.prototype.filter !== "function") {
//   Array.prototype.filter = function () {
//     // implementation goes here
//   };
// }

Array.prototype.filter = function (fn, thisp) {
    // if (this === null) throw new TypeError();
    if (typeof fn !== "function") throw new TypeError();
    var result = [];
    for (var i = 0; i < this.length; i++) {
      if (i in this) {
        var val = this[i];
        if (fn.call(thisp, val, i, this)) {
          result.push(val);
        }
      }
    }
    return result;
  };
  
  //******************************************************* MAP ********************************************************************/
  
  // custom
  
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  function MapPolyfill(arr, cb) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push(cb(arr[i]));
    }
  
    return newArr;
  }
  
  function squared(x) {
    return x * x;
  }
  
  let result = MapPolyfill(arr, squared);
  //  console.log(result)
  
  //using prototype
  
  Array.prototype.myMap = function (callback) {
    if (!callback || typeof callback !== "function") {
      throw Error("Callback provided is not a function");
    }
    console.log("this: ", this)
    // if (!this) {
    //   throw Error("can'\t call map on null or undefined ");
    // }
  
    let newArr = [];
  
    for (let i = 0; i < this.length; i++) {
      newArr.push(callback(this[i], i, this));
    }
  
    return newArr;
  };
  
  let sqArr = arr.myMap((ele, i, arr) => {
    return ele * ele;
  });
  
  console.log(sqArr);
  
  //************************************************************** Filter ************************************************************/
  
  let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  function FilterPolyfill(arr, cb) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (cb(arr[i])) {
        newArr.push(arr[i]);
      }
    }
  
    return newArr;
  }
  
  function isEven(x) {
    if (x % 2 === 0) {
      return x;
    }
  }
  
  let res = FilterPolyfill(array, isEven);
  //  console.log(res)
  
  //using prototype method
  
  Array.prototype.myFilter = function (callback) {
    if (!callback || typeof callback !== "function") {
      throw Error("Callback provided is not a function");
    }
  
    // if (!this) {
    //   throw Error("can'\t call filter on null or undefined ");
    // }
  
    let newArr = [];
  
    for (let i = 0; i < this.length; i++) {
      let flag = callback(this[i], i, this);
      if (flag) {
        // if true
        newArr.push(this[i]);
      }
    }
  
    return newArr;
  };
  
  let filteredArr = array.myFilter((ele, i, arr) => {
    return ele % 2 == 0;
  });
  
  // console.log(filteredArr)
  
  // ********************************************************* Reduce ***********************************************************************
  
  let marks = [10, 20, 30];
  
  Array.prototype.myReduce =  function(callback, initial) {
    if (!callback || typeof callback !== "function") {
      throw Error("Callback provided is not a function");
    }
  console.log(this);
    // if (!this) {
    //   throw Error("can'\t call reduce on null or undefined ");
    // }
  
    let accumulator = initial || this[0];
  
    for (let i = 0; i < this.length; i++) {
      if (i == 0 && !initial) {
        continue;
      }
  
      let newValue = callback(accumulator, this[i]);
      accumulator = newValue;
    }
  
    return accumulator;
  };
  
  let totalmarks = marks.myReduce((acc, curr) => {
    return acc + curr;
  }, 10);
  console.log(totalmarks); 
  
  //**************************************************** forEach ***************************************************************************/
  
  let list = [2, 4, 6];
  
  Array.prototype.customForEach = function (callback) {
    if (!callback || typeof callback !== "function") {
      throw Error("Callback provided is not a function");
    }
  
    if (!this) {
      throw Error("can'\t call forEach on null or undefined ");
    }
  
    for (let i = 0; i < this.length; i++) {
      callback(this[i], i, this);
    }
  };
  
  // let cb = (ele,i,arr)=>console.log(ele,i,arr)
  // list.customForEach(cb)
  
  // list.customForEach((ele,i,arr)=>console.log(ele,i,arr))
  
  //****************************************************** bind method  *********************************************************************************/
  