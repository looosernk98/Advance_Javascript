const protoObject = {
  name:"rahul",
  ag:23
}

const propertiesObject = {
  state:{
    writable: true,
    configurable: true,
    value: "Delhi",
  },
}

const newObj = Object.create(protoObject, propertiesObject)
newObj.male = true
console.log('newObj: ', newObj);
console.log('newObj prototype: ', newObj.__proto__);
console.log(newObj.state);