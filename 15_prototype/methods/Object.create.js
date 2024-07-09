const obj1 = {
  name:"rahul",
  ag:23
}

const obj2 = {
  state:{
    writable: true,
    configurable: true,
    value: "Delhi",
  },
}

const newObj = Object.create(obj1, obj2)
newObj.male = true
console.log('newObj: ', newObj);
console.log('newObj prototype: ', newObj.__proto__);
console.log(newObj.state);