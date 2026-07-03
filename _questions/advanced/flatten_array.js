
// Flatten an array

const arr = [1, [2, 3, [4,5, [6]]], 7, [9, [10, 11]]]
// Output: [1,2,3,4,5,6,7,9,10,11]
function flatArray(arr){
  let ans = [];
  for(let v of arr){
    if(Array.isArray(v)){
        const flattenedArr = flatArray(v)
        ans.push(...flattenedArr)
    }else{
      ans.push(v)
    }
  }
  return ans;
}

console.log(flatArray(arr))

//******************** Flat an array by level wise (custom order) ******************/

const arr = [1, [2, 3, [4,5, [6]]], 7, [9, [10, 11]]]

// elements at same level should be added first, then elements at next level should be added, and so on
// output: [1, 7,  2,  3, 9, 4, 5, 10, 11, 6]

// DFS technique (Recursive)
function flatWithCustomOrder(arr){
  let ans = []
  let immediateNestedArr = []
  for(let v of arr){
    if(Array.isArray(v)){
      immediateNestedArr.push(...v)
    }else{
      ans.push(v)
    }
  }
  if(immediateNestedArr.length){
    const flattenedArr = flatWithCustomOrder(immediateNestedArr)
    ans.push(...flattenedArr)
  }
  
  return ans;
}


console.log(flatWithCustomOrder(arr))

// BFS technique (Iterative)
function flatWithCustomOrderBFS(arr){
  const res = [];
  const queue = [...arr];
  while(queue.length){
    const curr = queue.shift()
    if(Array.isArray(curr)){
      queue.push(...curr)
    }else{
      res.push(curr)
    }
  }
  return res;
}

console.log(flatWithCustomOrderBFS(arr))
/*
How it works:

- Queue initially contains all top-level elements
- If element is:
    - primitive → add to result
    - array → push its children at end of queue
- This ensures:
    - current level processed first
    - nested levels processed later

This is essentially BFS flattening.
*/



// Flat an array with custom depth
function flatWithDepth(arr, depth) {
  if (depth === 0) {
    return arr;
  }
  let ans = [];
  for (let v of arr) {
    if (Array.isArray(v)) {
      const flattenedArr = flatWithDepth(v, depth - 1);
      ans.push(...flattenedArr);
    } else {
      ans.push(v);
    }
  }
  return ans;
}

console.log(flatWithDepth(arr, 2));