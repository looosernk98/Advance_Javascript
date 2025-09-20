/*
====================================================================
              Object.seal() vs Object.freeze() in JavaScript
====================================================================

Both Object.seal() and Object.freeze() are methods that restrict 
modifications to objects, but they have different levels of restrictions.

Key Differences:
┌─────────────────┬─────────────────┬──────────────────┐
│    Operation    │  Object.seal()  │  Object.freeze() │
├─────────────────┼─────────────────┼──────────────────┤
│ Add Properties  │       ❌        │        ❌        │
│Delete Properties│       ❌        │        ❌        │
│Modify Values    │       ✅        │        ❌        │
│ Configure Props │       ❌        │        ❌        │
└─────────────────┴─────────────────┴──────────────────┘

*/

console.log("=== Object.seal() Examples ===\n");

// Object.seal() - Prevents adding/deleting properties but allows modification of existing values
const sealedObj = { name: "John", age: 30, city: "NYC" };
Object.seal(sealedObj);

console.log("Original sealed object:", sealedObj);
console.log("Is sealed?", Object.isSealed(sealedObj)); // true

// ✅ CAN modify existing property values
sealedObj.name = "Jane";
sealedObj.age = 25;
console.log("After modifying values:", sealedObj);

// ❌ CANNOT add new properties (fails silently in non-strict mode)
sealedObj.email = "jane@example.com";
console.log("After trying to add email:", sealedObj); // email not added

// ❌ CANNOT delete properties
delete sealedObj.city;
console.log("After trying to delete city:", sealedObj); // city still exists

// ❌ CANNOT reconfigure property descriptors
try {
    Object.defineProperty(sealedObj, 'name', {
        enumerable: false
    });
} catch (error) {
    console.log("Cannot reconfigure property:", error.message);
}

console.log("\n" + "=".repeat(50) + "\n");

console.log("=== Object.freeze() Examples ===\n");

// Object.freeze() - Prevents ALL modifications (immutable object)
const frozenObj = { name: "Alice", age: 28, hobbies: ["reading", "swimming"] };
Object.freeze(frozenObj);

console.log("Original frozen object:", frozenObj);
console.log("Is frozen?", Object.isFrozen(frozenObj)); // true

// ❌ CANNOT modify existing property values
frozenObj.name = "Bob";
frozenObj.age = 30;
console.log("After trying to modify values:", frozenObj); // unchanged

// ❌ CANNOT add new properties
frozenObj.email = "alice@example.com";
console.log("After trying to add email:", frozenObj); // email not added

// ❌ CANNOT delete properties
delete frozenObj.name;
console.log("After trying to delete name:", frozenObj); // name still exists

// ⚠️ IMPORTANT: Shallow freeze only! Nested objects can still be modified
frozenObj.hobbies.push("cooking");
console.log("After modifying nested array:", frozenObj); // array is modified!

console.log("\n" + "=".repeat(50) + "\n");

console.log("=== Comparison Examples ===\n");

// Creating identical objects for comparison
const obj1 = { x: 10, y: 20, nested: { a: 1 } };
const obj2 = { x: 10, y: 20, nested: { a: 1 } };

Object.seal(obj1);
Object.freeze(obj2);

console.log("Sealed object before modification:", obj1);
console.log("Frozen object before modification:", obj2);

// Modifying existing properties
obj1.x = 100; // ✅ Works with sealed
obj2.x = 100; // ❌ Doesn't work with frozen

console.log("After modifying x property:");
console.log("Sealed object:", obj1); // x changed to 100
console.log("Frozen object:", obj2); // x remains 10

// Both can have nested objects modified (shallow protection)
obj1.nested.a = 999;
obj2.nested.a = 888;

console.log("After modifying nested properties:");
console.log("Sealed object nested:", obj1.nested); // a changed to 999
console.log("Frozen object nested:", obj2.nested); // a changed to 888

console.log("\n" + "=".repeat(50) + "\n");

console.log("=== Deep Freeze Implementation ===\n");

// Deep freeze function to freeze nested objects too
function deepFreeze(obj) {
    // Retrieve property names
    const propNames = Object.getOwnPropertyNames(obj);
    
    // Freeze properties before freezing self
    for (const name of propNames) {
        const value = obj[name];
        
        if (value && typeof value === "object") {
            deepFreeze(value);
        }
    }
    
    return Object.freeze(obj);
}

const deepObj = {
    name: "Test",
    details: {
        age: 25,
        address: {
            city: "Delhi",
            country: "India"
        }
    },
    hobbies: ["reading", "coding"]
};

deepFreeze(deepObj);

// Now even nested objects are frozen
deepObj.details.age = 30; // Won't work
deepObj.details.address.city = "Mumbai"; // Won't work
deepObj.hobbies.push("gaming"); // Won't work

console.log("Deep frozen object:", deepObj);

console.log("\n" + "=".repeat(50) + "\n");

console.log("=== Checking Methods ===\n");

const testObj = { a: 1, b: 2 };

console.log("Before any operation:");
console.log("isSealed:", Object.isSealed(testObj)); // false
console.log("isFrozen:", Object.isFrozen(testObj)); // false

Object.seal(testObj);
console.log("After Object.seal():");
console.log("isSealed:", Object.isSealed(testObj)); // true
console.log("isFrozen:", Object.isFrozen(testObj)); // false

const testObj2 = { a: 1, b: 2 };
Object.freeze(testObj2);
console.log("After Object.freeze():");
console.log("isSealed:", Object.isSealed(testObj2)); // true (frozen objects are also sealed)
console.log("isFrozen:", Object.isFrozen(testObj2)); // true

console.log("\n" + "=".repeat(50) + "\n");

console.log("=== Use Cases ===\n");

console.log(`
USE CASES for Object.seal():
• Configuration objects where values need updates but structure is fixed
• Form data objects where you want to prevent accidental property addition
• API response objects where you want to allow value updates but prevent structure changes

USE CASES for Object.freeze():
• Constants and enums that should never change
• Immutable data structures in functional programming
• Configuration that should be completely readonly
• Default settings that should never be modified

PERFORMANCE CONSIDERATION:
• Both methods have performance implications in strict mode
• Frozen objects can be optimized better by JavaScript engines
• Use sparingly in performance-critical code

STRICT MODE BEHAVIOR:
• In strict mode, violations throw TypeError
• In non-strict mode, violations fail silently
`);