// https://www.tutorialsteacher.com/javascript/this-keyword-in-javascript

// The this keyword in JavaScript is a fundamental concept used to refer to the 
// object that is executing the current function. The value of this depends on how 
// and where the function is invoked, not where it is defined. Its behavior can vary 
// based on the context (global, object, function, or class) and the invocation 
// style.

/*

    Non Strict Mode                     |         Strict Mode
1. If a function is present in object   | 1. If a function is present in object
    this will refer to <<object>> in    |    this will refer to <<global object>>                                      
    which fuction is defined            |
2. In global scope , this refers to     | 2. *** same behavior ***
    global(window) object               |   
3. we can change the reference of this  | 3. *** same behavior ***
    call and apply                      |     
4. In case of bind fn,this always refers| 4. *** same behavior ***
    to object that binded to function   |    
5. async callback like setTimeout gets  | 5. *** same behavior ***
    executed w.r.t global object        |         
6. arrow fn in a object always refers to| 6. *** same behavior ***
   object in which it is defined and    |    
   reference established at the time of |   
   creation of arrow fn                 |          
                                        | 


*/


/* 
    this in NodeJS global scope is the current module.exports object, not the global 
    object. This is different from a browser where the global scope is the global 
    window object.

    console.log('globalThis: ',globalThis)
    console.log('Before this: ', this);
    module.exports.foo = 5
    console.log('after this: ',this);
    console.log('module: ', module.exports);
*/
// global
console.log(this); // window

// called from function
function print(){
    console.log(this); // refer to global object
}

print() // fn was called w.r.t global scope

window.print() // fn was called w.r.t window object so this will refer to window

"strict mode"
// function in object
let object = {
   name: "Alex",
   age: 21,
   printName: function(){
    console.log(this); // will refer to own object in which fn is defined
   }
}
object.printName() // fn was called w.r.t to object that's why this will refer to object on which it is called


// Called w.r.t window by passing reference to
const printNameOutside = object.printName;
printNameOutside() //window ->  at this point fn was not called wrt to any object so by default this will refer to global


// ****************************** Strict Mode ****************************
// "use strict"
function print2(){
    console.log(this); // undefined
}
print2() // was not called wrt to any object, in strict mode , it this will be undefined.

//****************************************************************************/

// Call , Apply
const obj1 = {
    name: 'peter',
    age: 24,
    car: "Audi",
    add: function(a,b){
        console.log(a, b,this);
    }
}
const obj2 = {
    name: 'sam',
    age: 25,
    car: "Mercedes",
    add: function(a,b){
        console.log(a, b,this);
    }
}

obj1.add(1,2); // this will point to obj1

obj1.add.call(obj2, 1,2); // this will refer to obj2
obj1.add.apply(obj2, [1,2]); // this will refer to obj2

const obj1Add = obj1.add.bind(obj1, 3,4); // this will always refer to obj1 
obj1Add(); // this will refer obj1 always


//******************************* This in Async fn or Callback ******************************************/

"use strict"
const user1 = {
    age: 24,
    regularMethod: function(){
        console.log("Inside regular method: ", this); // this -> user1
       setTimeout(function(){
           // 'this' refers to global object or -----X---X--X--Not sure-------- undefined in case of strict mode
          console.log("Regular method's this, Inside setTimeout: ", this);
       }, 1000)
    }
}

user1.regularMethod()

"use strict"
const user2 = {
    age: 27,
    arrowMethod:function(){
        console.log("Inside arrow method: ", this); // this -> user2
        this.age = 28
        this.name = "evi"
       setTimeout(() => {
          console.log("Arrow method's this, Inside setTimeout: ", this);
          console.log("user2:", user2);
       }, 1000)
    }
}

user2.arrowMethod()
// console.log('user2: ', user2);
setTimeout(() => {
    console.log("user2:", user2);

},2000)

//*******************************************************************************/
 "use strict"
const obj3 = {
    a: 4,
    print: function(){
        function innerPrint(){
            console.log("inner print: ", this);
        }
        innerPrint() // no object is associated with this function call, so inside this function 'this' will refer to global
    }
 }
 obj3.print()

 "use strict"

//  using arrow
 const obj4 = {
    a: 4,
    print: function(){
        const innerPrint =()=>{
            console.log("inner print: ", this);
        }
        innerPrint() // now at the time of creation of arrow fn, obj3 was bind to this inside arrow fn
    }
 }
 obj4.print()

"use strict"
 const obj5 = {
    a:7,
    print: () => {
        console.log("this:", this); // this -> window
    }
 }
 obj5.print()
 
"use strict"
 const obj6 = {
    a:7,
    print: function(){
        console.log("this:", this); // this -> obj6
    }
 }

 obj6.print()