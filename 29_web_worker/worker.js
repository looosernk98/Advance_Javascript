self.onmessage = function(event){
    console.log('event: ', event);
     let sum = 0;
    for(let i =0; i<1000_000_000_0; i++){
       sum += i
    }
    self.postMessage(sum)
}