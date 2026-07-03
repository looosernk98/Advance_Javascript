
const person = {
    name: "John Doe",
    age: 30,
    address: {
      street: {
        streetName: "Main St",
        number: 123,
        zip: 12345
      },
      city: "Anytown",
      state: "CA"
    }
}

function deepClone(obj){
  const copy = {};
  
  for(let key in obj){
    const val = obj[key];
    
    if(Array.isArray(val)){
      copy[key] = [...val];
    }else if(typeof val === 'object'){
      copy[key] = deepClone(val)
    }else{
      copy[key] = val;
    }
  }
  
  return copy;
  
}

const cloned = deepClone(person);
console.log(cloned);

cloned.address.street = "bacd"

console.log(person);
console.log(cloned);