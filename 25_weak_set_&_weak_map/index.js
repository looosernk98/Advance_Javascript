/*
 In JavaScript, WeakMap and WeakSet are collections similar to Map and Set but 
 with some key differences, particularly in terms of memory management and 
 garbage collection.

 These collections are ideal for cases where you want to attach data to objects 
 without worrying about memory leaks, as the data will automatically be removed 
 when the object is no longer needed.
*/

// ************************** Weak Map *******************************
/*
 A WeakMap is a collection of key-value pairs where:

-> Keys must be objects, not primitive data types (like strings or numbers).
-> Values can be of any type.
-> The references to keys in a WeakMap are “weak,” meaning that if there is no 
   other reference to a key object, it can be garbage-collected. This helps 
   prevent memory leaks.

Key Features:
1. No Enumeration: WeakMaps cannot be iterated or looped through, and they don’t 
   have methods to retrieve all keys or values.
2. Automatic Garbage Collection: When there are no other references to the key, 
   the entry is removed from the WeakMap.
*/
let weakMap = new WeakMap();
let obj = { name: "Niranjan" };

weakMap.set(obj, "Frontend Developer");
console.log(weakMap.get(obj)); // "Frontend Developer"

// If we set obj to null, it will be garbage-collected
obj = null;
// Now `weakMap` no longer holds this entry.
console.log('weakMap: ', weakMap.get(obj)); // undefined



//*************************** WeakSet *******************************/
/*
A WeakSet is a collection of unique values where:

-> Each item must be an object (just like WeakMap, no primitives allowed).
-> Objects in a WeakSet are held “weakly,” meaning if there’s no other reference 
   to an object, it can be garbage-collected.

Key Features:
1. No Enumeration: WeakSets cannot be iterated over, and there’s no way to get 
                   all items.
2. Automatic Garbage Collection: Entries are automatically removed once there are 
                  no other references to the objects.
*/
let weakSet = new WeakSet();
let entry = { name: "Frontend Skills" };

weakSet.add(entry);
console.log(weakSet.has(entry)); // true

// If we set obj to null, it can be garbage-collected
entry = null;
// Now the entry is gone from `weakSet`.
console.log(weakSet.has(entry)); // false



