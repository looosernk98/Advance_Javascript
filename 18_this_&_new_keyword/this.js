// https://www.tutorialsteacher.com/javascript/this-keyword-in-javascript

// "use strict"
function print(){
    debugger
    console.log('this',this);
    console.log("print");
}

print.prototype.hey = "hey"

print()
