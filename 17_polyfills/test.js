Array.prototype.myMap = function (callback) {
    if (!callback || typeof callback !== "function") {
      throw Error("Callback provided is not a function");
    }
    console.log("this: ", this)
  
    let newArr = [];
    for (let i = 0; i < this.length; i++) {
      newArr.push(callback(this[i], i, this));
    }
  
    return newArr;
};
  
  const arr = [8,1, 9];

  let sqArr = arr.myMap((ele, i, arr) => {
    return ele * ele;
  });
  
console.log(sqArr);

Array.prototype.myReduce = function(cb, initial){
  if(!cb || typeof cb != 'function') throw new Error('cb is fn')

  let result = initial || this[0]

  for(let i = 0; i<this.length; i++){
    if(i == 0 && !initial) continue;
      result = cb(result,this[i], this);
  }
  return result
}

const arr2 = [1,2,3];
const sum = arr2.myReduce((agg, curr, arr) => {
  return agg + curr
})
console.log('sum: ', sum);

