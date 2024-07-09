function* generator(i) {
    yield i;
    // return 50;
    yield i + 10;
  }
  
  const gen = generator(10); // returns generator object
  console.log(gen.next())
  
  // console.log(gen.next().value);
  // Expected output: 10
  console.log(gen.next())
  
  // console.log(gen.next().value);
  // Expected output: 20
  console.log(gen.next())
  