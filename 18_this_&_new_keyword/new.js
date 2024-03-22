
// https://www.tutorialsteacher.com/javascript/new-keyword-in-javascript

// The new keyword ignores return statement that returns primitive value.
function MyFunc() {
    this.x = 100;
    
    return 200;
}

var obj = new MyFunc();
alert(obj.x); // 100