// Attach a listener to an array which gets triggered
// when an item is pushed into the array


// variables declared with var becomes property of global object

var a = "abc"
function test1(name) {
   let a = name;

   function test2() {
     console.log('Output:', this.a);
   }
    // console.log("this::", this)
   test2()
}
test1 ("paytm")

