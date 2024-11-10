/*
 In JavaScript, a generator function is a special type of function that can pause 
 execution and resume later. It allows you to yield multiple values one by one, 
 rather than returning them all at once. 

 Generators are often used for working with sequences of values, asynchronous 
 operations, or creating custom iterators.


How It Works:

1. When you call a generator function, it doesn’t immediately execute the code. 
Instead, it returns a special object called an iterator.

2. You can then use the iterator’s .next() method to execute the generator’s code 
up to the next yield statement.

3. Each .next() call resumes execution from where it left off and returns an 
   object with two properties:
    -> value: The yielded value.
    -> done: A boolean indicating if the generator has completed (true) or still 
             has more values to yield (false).

*/

// Generator functions are defined with the function* syntax and use the yield 
// keyword to return values one at a time.
function* generator(i) {
    yield i;
    // return 50;
    yield i + 10;
  }
  
  const gen = generator(10); // returns generator object
  console.log(gen.next()) // { value : 10, done:false}
  // console.log(gen.next().value); // Expected output: 10
  console.log(gen.next()) // { value : 20, done:done}
  // console.log(gen.next().value); // Expected output: 20
  console.log(gen.next()) // { value : undefined, done:true}

//*********************** Difeerence b/w yield and return *****************/
/*
 return: Terminates the function immediately and returns the specified value. 
         If no value is provided, it returns undefined.
 yield: Pauses the generator function and returns the value passed to yield. 
        The function can later resume from this point when .next() is called on 
        the generator.
*/

function* numbers() {
  yield 1;
  return 2; // Ends the generator
  yield 3;   // This line will not be reached
}

const genObj = numbers();
console.log(genObj.next().value); // Outputs: 1
console.log(genObj.next().value); // Outputs: 2
console.log(genObj.next().done);  // Outputs: true (generator is finished)


//*********************** Using for...of Loop with Generators ***************/
  function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
  }
  
  for (let number of numberGenerator()) {
    console.log(number); // 1, then 2, then 3
  }

//*************************** Practical Use Cases for Generators **************/

// 1. Infinite Sequences: Generators are great for creating sequences of values 
//    that don’t have a defined end, such as an infinite sequence of numbers.
function* infiniteNumbers() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const numbers = infiniteNumbers();
console.log(numbers.next().value); // 0
console.log(numbers.next().value); // 1
console.log(numbers.next().value); // 2

// 2. Iterating Over Large Datasets: They allow you to handle large datasets more 
//    efficiently by yielding one item at a time instead of loading everything 
//    into memory.

// 3. Asynchronous Operations: When combined with async and await, generators 
//    enable you to manage asynchronous code in a more sequential, readable way.

