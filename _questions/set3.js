// ************************************** QUESTION 1 *****************************************
// you need to implement computeAmount fn. on the top of that if a run func like 
// crore, lacs, thousand then it these func should do the summation by value 
// passed in paramter
//   Input -> console.log(computeAmount().lacs(15).crore(2).lacs(20).thousand(45).crore(7).valueOf())
//   output -> 143545000

// "use strict"
function computeAmount(){
    this.totalAmount = 0;
    this.crore = (value) => {
        // console.log('this: ', this);
     this.totalAmount += value*10000000
     return this;
    }
    this.lacs = function(value){
        // console.log('this: ', this);
     this.totalAmount += value*100000
     return this;
    }
    this.thousand = (value) => {
        // console.log('this: ', this);
     this.totalAmount += value*1000
     return this;
    }
    this.valueOf = () => {
        return this.totalAmount;
    }
    return this;
}
// console.log('computeAmount(): ', computeAmount().lacs(1).valueOf());


console.log(computeAmount().lacs(15).crore(2).lacs(20).thousand(45).crore(7).valueOf())
// console.log(3+"3");
// console.log("3" + 3);

//  USING PROTOTYPE METHODS


// *************************************** QUESTION 2****************************************
const obj = {
    helloWorld: function(){
        return "hello world, " + this.name
    },
    name: "Hello"
}

const obj2 = {
    helloWorld: obj.helloWorld,
    name: "Bye"
}

console.log(obj2.helloWorld())
// **************************************** QUESTION 3 ***************************************
// **************************************** QUESTION 4 ***************************************

// String is immutable in javascript
// let x = new String("Vi")
// for(let key in x) {
//     console.log(Object.getOwnPropertyDescriptor(x, key))
// }

// var myString = "Hello, world!";
// myString[0] = "J"; // This will not change the value of myString
// console.log(myString); // Outputs "Hello, world!"