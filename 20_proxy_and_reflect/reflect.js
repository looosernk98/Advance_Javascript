
// Difference b/w Object.keys() && Reflect.ownKeys()

const car = {
    name: "Sonet",
    model: "2023",
    owner:{
        name: "niranjan",
        hobbies: ['cricket', 'reading']
    }
}

Object.defineProperty(car, 'engine', {
    value: { cc: '1500cc'},
    enumerable: false
})

console.log(Reflect.ownKeys(car)) // it also list propewrty that is non-enumerable
// Output: [ 'name', 'model', 'owner', 'engine' ]

console.log(Object.keys(car)) // it only show public properties, non-enumrable property is not listed
// Output : [ 'name', 'model', 'owner' ]


/*

| Feature                  | **`Object.keys()`**                       | **`Reflect.ownKeys()`**                  |
| ------------------------ | ----------------------------------------- | ---------------------------------------- |
| Returns                  | Only **enumerable string** keys           | **All keys** (string + symbol)           |
| Includes non-enumerable? | ❌ No                                      | ✅ Yes                                    |
| Includes symbol keys?    | ❌ No                                      | ✅ Yes                                    |
| Order                    | Enumerable string keys in insertion order | All string keys (in order) + symbol keys |
| Used for                 | Iterating visible/public properties       | Full introspection / meta-programming    |

*/

const sym = Symbol('secret');
const obj = {};

Object.defineProperty(obj, 'hidden', {
  value: 123,
  enumerable: false,
});
obj.visible = "Hi";
obj[sym] = "Secret Symbol";

console.log(Object.keys(obj));       // ["visible"]
console.log(Reflect.ownKeys(obj));   // ["hidden", "visible", Symbol(secret)]

/*

✅ Reflect.ownKeys() gives everything:

-> "hidden" → non-enumerable
-> "visible" → enumerable
-> Symbol(secret) → symbol key

While Object.keys() gives only:

-> "visible" → enumerable string keys only


Object.keys() → meant for normal iteration, e.g. in for...of loops, or when you 
just want user-facing properties.

Reflect.ownKeys() → meant for meta-programming (e.g., when writing Proxy traps 
or deep clones), where you need all property keys, even hidden ones.

*/

// ================================ Example with arrays   ===================

const arr = [10, 20];
arr.extra = "Hello";

console.log(Object.keys(arr));     // ["0", "1", "extra"]
console.log(Reflect.ownKeys(arr)); // ["0", "1", "length", "extra"]


/*

| Feature              | `Object.keys(obj)`     | `Reflect.ownKeys(obj)`                                |
| -------------------- | ---------------------- | ----------------------------------------------------- |
| String keys          | ✅ Enumerable only      | ✅ All                                                 |
| Symbol keys          | ❌ No                   | ✅ Yes                                                 |
| Non-enumerable keys  | ❌ No                   | ✅ Yes                                                 |
| Hidden/internal keys | ❌ No                   | ✅ Yes                                                 |
| Array “length” key   | ❌ No                   | ✅ Yes                                                 |
| Use case             | Iterating visible keys | Inspecting all keys (for debugging, proxies, cloning) |


*/

