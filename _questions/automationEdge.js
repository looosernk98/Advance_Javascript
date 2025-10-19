

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

// How would you send and manage the JSON payload. 
// payload can be anything array , objects, inside object key value pair. value can be anything like object , number , array, Map, functions .

// How would you send the valid json in backend so that they can use it properly

/*

🔹JSON is not the same as JavaScript object

JSON (JavaScript Object Notation) is a text format for exchanging data.

It only supports a limited set of types:

string, number, boolean, null, array, object (with string keys)



-> JSON cannot directly represent:

Map, Set, Function, Date (gets serialized to string), Infinity, NaN, undefined (will be lost or converted to null)

🔹 Step 4: Handling unsupported values
Since JSON has limits, you must convert unsupported JS types before sending.

*/

// 🔹 Custom Replacer

function safeStringify(obj) {
  return JSON.stringify(obj, (key, value) => {
    // Handle functions
    if (typeof value === "function") {
      return `[Function: ${value.name || "anonymous"}]`;
    }

    // Handle Map
    if (value instanceof Map) {
      return {
        __type: "Map",
        value: Array.from(value.entries())
      };
    }

    // Handle Set
    if (value instanceof Set) {
      return {
        __type: "Set",
        value: Array.from(value)
      };
    }

    // Handle Date
    if (value instanceof Date) {
      return {
        __type: "Date",
        value: value.toISOString()
      };
    }

    // Handle NaN, Infinity, -Infinity
    if (typeof value === "number" && !isFinite(value)) {
      return String(value); // "NaN", "Infinity", "-Infinity"
    }

    // Handle undefined
    if (value === undefined) {
      return null; // JSON doesn’t allow undefined
    }

    return value; // keep everything else as is
  });
}


const payload = {
  id: 1,
  name: "Niru",
  createdAt: new Date(),
  scores: [100, NaN, Infinity],
  meta: new Map([["key1", "value1"], ["key2", 42]]),
  tags: new Set(["js", "node"]),
  greet: function sayHello() { return "hi"; }
};

const jsonString = safeStringify(payload);
console.log(jsonString);

// {
//   "id": 1,
//   "name": "Niru",
//   "createdAt": { "__type": "Date", "value": "2025-09-23T08:40:00.000Z" },
//   "scores": [100, "NaN", "Infinity"],
//   "meta": { "__type": "Map", "value": [["key1","value1"],["key2",42]] },
//   "tags": { "__type": "Set", "value": ["js","node"] },
//   "greet": "[Function: sayHello]"
// }

// 🔹 Backend Handling
// On backend, you can deserialize and, if needed, restore Maps, Sets, Dates.

// For example, in Node.js:
function safeParse(json) {
  return JSON.parse(json, (key, value) => {
    if (value && value.__type === "Map") {
      return new Map(value.value);
    }
    if (value && value.__type === "Set") {
      return new Set(value.value);
    }
    if (value && value.__type === "Date") {
      return new Date(value.value);
    }
    return value;
  });
}







