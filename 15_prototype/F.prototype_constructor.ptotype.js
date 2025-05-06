/* 
 If F.prototype is an object, then the new operator uses it to 
 set [[Prototype]] for the new object.

 Please note that F.prototype here means a regular property named "prototype" on
 F. It sounds something similar to the term “prototype”, but here we really mean 
 a regular property with this name.
*/

let animal = {
    eats: true
  };
  
  function Rabbit(name) {
    this.name = name;
  }

/*
   Setting Rabbit.prototype = animal literally states the following: 
  "When a new Rabbit is created, assign its [[Prototype]] to animal".
*/
  Rabbit.prototype = animal;
  
  let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal
  
  alert( rabbit.eats ); // true


/*
  If, after the creation, F.prototype property changes (F.prototype = <another object>), 
  then new objects created by new F will have another object as [[Prototype]], 
  but already existing objects keep the old one.
*/


//************************* Default F.prototype, constructor property *********************************************************/


/*

Every function has the "prototype" property even if we don’t supply it.
The default "prototype" is an object with the only property constructor that 
points back to the function itself.
*/

function Rabbit() {}

/* default prototype
  Rabbit.prototype = { constructor: Rabbit };
*/

console.log(Rabbit.prototype.constructor === Rabbit) // true

//Naturally, if we do nothing, the constructor property is available to all rabbits through [[Prototype]]:

let rabbitt = new Rabbit(); // inherits from {constructor: Rabbit}

console.log(rabbitt.constructor == Rabbit); // true (from prototype)

// We can use constructor property to create a new object using the same constructor as the existing one.
function Rabbit(name) {
    this.name = name;
    alert(name);
  }
  
  let rabbit1 = new Rabbit("White Rabbit");
  
  let rabbit2 = new rabbit1.constructor("Black Rabbit");
  
  /*
  That’s handy when we have an object, don’t know which constructor was used for 
  it (e.g. it comes from a 3rd party library), and we need to create another 
  one of the same kind.
  */


  //**************************************************************************** */

  /* 
  if we replace the default prototype as a whole, then there will be no 
  "constructor" in it.
  */

function User() {}

User.prototype = {
  jumps: true
};

let user = new User();
alert(user.constructor === User); // false

/*
 So, to keep the right "constructor" we can choose to add/remove properties to 
 the default "prototype" instead of overwriting it as a whole:
*/

function User() {}

// Not overwrite Rabbit.prototype totally
// just add to it
User.prototype.jumps = true
// the default Rabbit.prototype.constructor is preserved


//Or, alternatively, recreate the constructor property manually:

User.prototype = {
    jumps: true,
    constructor: User
  };
  
// now constructor is also correct, because we added it
  