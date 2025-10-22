/*
=== PROXY AND REFLECT IN JAVASCRIPT ===

PROXY:
A Proxy object wraps another object and intercepts operations (called "traps"), 
like reading/writing properties and others, optionally handling them on its own, 
or transparently allowing the object to handle them.

Syntax: new Proxy(target, handler)
- target: the original object you want to wrap
- handler: defines which operations will be intercepted and how to redefine them

REFLECT:
Reflect is a built-in object that provides methods for interceptable JavaScript operations.
These methods are the same as those of proxy handlers.
Reflect makes it easier to call the original operation from within a proxy trap.



Real-World Use Cases:

1. API Wrappers: Log all API calls automatically
2. Data Validation: Validate object properties on assignment
3. Observable Objects: React to property changes
4. Virtual Properties: Computed properties that don't exist on the object
5. Security: Control access to sensitive properties
6. Debugging: Log all object interactions
7. Migration: Deprecate old property names while maintaining compatibility
*/

// ==================== BASIC PROXY EXAMPLE ====================

const target = {
    name: "John",
    age: 30
};

const handler = {
    // Intercept property access (get trap)
    get(target, property, receiver) {
        console.log(`Getting property: ${property}`);
        return target[property];
    },
    
    // Intercept property assignment (set trap)
    set(target, property, value, receiver) {
        console.log(`Setting property: ${property} = ${value}`);
        target[property] = value;
        return true; // indicates success
    }
};

const proxy = new Proxy(target, handler);

console.log("=== Basic Proxy Example ===");
console.log(proxy.name); // Logs: "Getting property: name" then "John"
proxy.age = 31; // Logs: "Setting property: age = 31"
console.log(proxy.age); // Logs: "Getting property: age" then 31

// ==================== USING REFLECT ====================

const betterHandler = {
    get(target, property, receiver) {
        console.log(`Accessing: ${property}`);
        // Use Reflect instead of direct access
        return Reflect.get(target, property, receiver);
    },
    
    set(target, property, value, receiver) {
        console.log(`Setting: ${property} = ${value}`);
        // Use Reflect to perform the actual assignment
        return Reflect.set(target, property, value, receiver);
    },
    
    has(target, property) {
        console.log(`Checking if property '${property}' exists`);
        return Reflect.has(target, property);
    },
    
    deleteProperty(target, property) {
        console.log(`Deleting property: ${property}`);
        return Reflect.deleteProperty(target, property);
    }
};

const reflectProxy = new Proxy(target, betterHandler);

console.log("\n=== Reflect Example ===");
console.log('name' in reflectProxy); // Logs: "Checking if property 'name' exists" then true
delete reflectProxy.age; // Logs: "Deleting property: age"

// ==================== ADVANCED PROXY EXAMPLES ====================

// 1. Validation Proxy
const createValidatedUser = () => {
    return new Proxy({}, {
        set(target, property, value) {
            if (property === 'age' && (typeof value !== 'number' || value < 0)) {
                throw new Error('Age must be a positive number');
            }
            if (property === 'email' && !value.includes('@')) {
                throw new Error('Email must contain @');
            }
            return Reflect.set(target, property, value);
        }
    });
};

console.log("\n=== Validation Proxy ===");
const user = createValidatedUser();
user.name = "Alice";
user.age = 25;
user.email = "alice@example.com";
console.log(user);

try {
    user.age = -5; // Will throw error
} catch (e) {
    console.log("Error:", e.message);
}

// 2. Default Values Proxy
const withDefaults = (target, defaults) => {
    return new Proxy(target, {
        get(target, property) {
            return property in target ? target[property] : defaults[property];
        }
    });
};

console.log("\n=== Default Values Proxy ===");
const config = withDefaults({}, {
    host: 'localhost',
    port: 3000,
    debug: false
});

console.log(config.host); // "localhost" (from defaults)
console.log(config.port); // 3000 (from defaults)
config.host = 'example.com';
console.log(config.host); // "example.com" (overridden)

// 3. Array Negative Indexing
const createNegativeArray = (arr) => {
    return new Proxy(arr, {
        get(target, property) {
            if (typeof property === 'string' && !isNaN(property)) {
                const index = parseInt(property);
                if (index < 0) {
                    return target[target.length + index];
                }
            }
            return Reflect.get(target, property);
        }
    });
};

console.log("\n=== Negative Array Indexing ===");
const arr = createNegativeArray([1, 2, 3, 4, 5]);
console.log(arr[-1]); // 5 (last element)
console.log(arr[-2]); // 4 (second to last)

// 4. Property Access Logging
const createLogger = (target, name) => {
    return new Proxy(target, {
        get(target, property) {
            console.log(`[${name}] Reading property: ${property}`);
            return Reflect.get(target, property);
        },
        set(target, property, value) {
            console.log(`[${name}] Writing property: ${property} = ${value}`);
            return Reflect.set(target, property, value);
        }
    });
};

console.log("\n=== Property Access Logging ===");
const loggedObj = createLogger({ x: 1, y: 2 }, "MyObject");
console.log(loggedObj.x);
loggedObj.z = 3;

// ==================== REFLECT METHODS OVERVIEW ====================

console.log("\n=== Reflect Methods Overview ===");

const obj = { a: 1, b: 2 };

// Reflect.get() - Get property value
console.log("Reflect.get:", Reflect.get(obj, 'a')); // 1

// Reflect.set() - Set property value
Reflect.set(obj, 'c', 3);
console.log("After Reflect.set:", obj); // { a: 1, b: 2, c: 3 }

// Reflect.has() - Check if property exists
console.log("Reflect.has:", Reflect.has(obj, 'a')); // true

// Reflect.deleteProperty() - Delete property
Reflect.deleteProperty(obj, 'b');
console.log("After delete:", obj); // { a: 1, c: 3 }

// Reflect.ownKeys() - Get all property keys
console.log("Reflect.ownKeys:", Reflect.ownKeys(obj)); // ['a', 'c']

// Reflect.getOwnPropertyDescriptor() - Get property descriptor
console.log("Property descriptor:", Reflect.getOwnPropertyDescriptor(obj, 'a'));

// ==================== PROXY TRAPS OVERVIEW ====================

/*
Available Proxy Traps:

1. get(target, property, receiver) - Property access
2. set(target, property, value, receiver) - Property assignment
3. has(target, property) - 'in' operator
4. deleteProperty(target, property) - delete operator
5. ownKeys(target) - Object.keys(), Object.getOwnPropertyNames()
6. getOwnPropertyDescriptor(target, property) - Object.getOwnPropertyDescriptor()
7. defineProperty(target, property, descriptor) - Object.defineProperty()
8. preventExtensions(target) - Object.preventExtensions()
9. getPrototypeOf(target) - Object.getPrototypeOf()
10. isExtensible(target) - Object.isExtensible()
11. setPrototypeOf(target, prototype) - Object.setPrototypeOf()
12. apply(target, thisArg, argumentsList) - Function calls
13. construct(target, argumentsList, newTarget) - new operator
*/

// ==================== FUNCTION PROXY EXAMPLE ====================

const createTimedFunction = (fn) => {
    return new Proxy(fn, {
        apply(target, thisArg, argumentsList) {
            console.log(`Calling function with args: ${argumentsList}`);
            const start = Date.now();
            const result = Reflect.apply(target, thisArg, argumentsList);
            const end = Date.now();
            console.log(`Function executed in ${end - start}ms`);
            return result;
        }
    });
};

console.log("\n=== Function Proxy Example ===");
const slowFunction = createTimedFunction((x, y) => {
    // Simulate slow operation
    for (let i = 0; i < 1000000; i++) {}
    return x + y;
});

const result = slowFunction(5, 3);
console.log("Result:", result);

// ==================== CLASS PROXY EXAMPLE ====================

class Calculator {
    add(a, b) { return a + b; }
    multiply(a, b) { return a * b; }
}

const createCalculatorProxy = () => {
    return new Proxy(new Calculator(), {
        get(target, property) {
            if (typeof target[property] === 'function') {
                return new Proxy(target[property], {
                    apply(fn, thisArg, args) {
                        console.log(`Calling ${property} with arguments:`, args);
                        const result = Reflect.apply(fn, thisArg, args);
                        console.log(`Result: ${result}`);
                        return result;
                    }
                });
            }
            return Reflect.get(target, property);
        }
    });
};

console.log("\n=== Class Proxy Example ===");
const calc = createCalculatorProxy();
calc.add(2, 3); // Logs method call and result
calc.multiply(4, 5); // Logs method call and result

// ==================== REVOCABLE PROXY ====================

console.log("\n=== Revocable Proxy ===");
const { proxy: revocableProxy, revoke } = Proxy.revocable(
    { name: "Test" },
    {
        get(target, property) {
            console.log(`Accessing: ${property}`);
            return Reflect.get(target, property);
        }
    }
);

console.log(revocableProxy.name); // Works: "Test"
revoke(); // Revoke the proxy

try {
    console.log(revocableProxy.name); // Will throw error
} catch (e) {
    console.log("Error after revocation:", e.message);
}
