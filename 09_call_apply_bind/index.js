/*

call: binds the this value to the function and invokes the function, and allows 
      you to pass a list of arguments.

apply: binds the this value to the function,  invokes the function, and allows 
       you to pass arguments as an array.

bind: binds the this value to the function, returns a new function, and allows 
      you to pass in a list of arguments.

*/

const user1 = {
    firstName: 'John',
    lastName: 'doe',
    // printName: function(){
    //   console.log(this.firstName+" "+this.lastName);
    // }
}

const printName = function(state, pin){
    console.log(this.firstName+" "+this.lastName + " from " + state + "-"+pin);
}
printName.call(user1, 'delhi', 110086);

const user2 = {
    firstName: 'virat',
    lastName: 'kohli',
}

printName.apply(user2, ['delhi', 110089])

const printNameReturnedCopy = printName.bind(user1, 'mumbai', 110076)
printNameReturnedCopy()
// console.log('printNameReturned: ', printNameReturnedCopy);