const protoObject = {
  name:"rahul",
  age:23
}

const propertiesObject = {
  state:{
    writable: true,
    configurable: true,
    // enumerable: true,
    value: "Delhi",
  },
}

const newObj = Object.create(protoObject, propertiesObject)
newObj.male = true
console.log('newObj: ', newObj);
console.log('newObj prototype: ', newObj.__proto__);
console.log(newObj.state);