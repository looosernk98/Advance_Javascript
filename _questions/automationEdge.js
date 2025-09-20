

// == and ===
// console.log(typeof NaN)
// ()()

const map = new Map();

map.set("a", "1")
map.set("b", "2")

const obj = {
  name:"abc",
  description: "xyxhsxs",
  map: JSON.stringify(map)
}

console.log(JSON.parse(JSON.stringify(obj)))

// {
//   "name": "abc",
//   "description": "xyxhsxs",
//   "map": "Map { a:1, b:2}"
// }





