function Rabbit() {}

Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

Rabbit.prototype = {};

console.log( rabbit.eats ); // ?

function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit2 = new Rabbit();

delete rabbit2.eats;

console.log( rabbit2.eats ); // ?