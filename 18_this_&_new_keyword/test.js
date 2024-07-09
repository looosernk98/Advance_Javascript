"use strict";

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