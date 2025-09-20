

// Q1. Guess the output
const obj = {};
obj[1] = 'one';
obj[true] = 'boolean';
console.log(Object.keys(obj)); // keys automatically converted to a string: 


// Q2. Guess the output
const obj = { a: 1, b: 2 };
const newObj = Object.freeze(obj);
newObj.a = 42;
console.log(newObj.a);


// Q3. Guess the output
const obj = { a: 1 };
const proxy = new Proxy(obj, {
    get(target, prop) {
        return prop in target ? target[prop] : 'default';
    },
});
console.log(proxy.b);


// Q4. Guess the output
const obj = {};
Object.defineProperty(obj, 'key', {
    value: 'value',
    writable: false,
});
obj.key = 'new value';
console.log(obj.key);


// Q5. Guess the output
const obj1 = { a: 1 };
const obj2 = { b: 2 };
console.log({ ...obj1, ...obj2, a: 42 });


