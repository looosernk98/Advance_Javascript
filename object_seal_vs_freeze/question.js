// Write a function to deep freeze an object

function deepFreeze(obj){

    const propNames = Reflect.ownKeys(obj) // gives all properties hidden, public, symbol, array length
    for(let key of propNames){
        const value = obj[key]
        if((value && typeof value === 'object') || typeof value === 'function'){
            deepFreeze(value)
        }
    }

    return Object.freeze(obj)
}

const obj2 = {
    internal: {
      a: null,
    },
};

deepFreeze(obj2)

obj2.internal.a = "anotherValue"; // fails silently in non-strict mode
console.log(obj2.internal.a) // null

