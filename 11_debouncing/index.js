/*
Debouncing is a technique used to control how many times we allow a function 
to be executed over time.

Debouncing is used for performance optimization by limiting the rate of excecution
of particular function or api

Used cases:
-> Search box suggestions
-> text-field auto-saves
-> eliminating double-button clicks

*/

let counter = 0;
function getData(){
    console.log("getting data",++counter)
    document.getElementById('debounce-count').innerHTML = `debounce fn called ${counter} times`
}

let keyPressCount = 0;

const debounce = (callback,delay)=>{

  let timerId; //every time timer or func ka closure bnta , every time timer has separate scope so clearTimeOut se wo particular timer ko end kr deta h or usko callback quque me nhi jaane deta
  return function(){
      document.getElementById('key-pressed-count').innerHTML = `user key pressed ${++keyPressCount} times`
      // let context = this
      // console.log("context", context)
      // let args = arguments;
      // console.log('arguments: ', arguments);
      clearTimeout(timerId) // clearing the previous timer

      // assigning a new timer if user tak a pause of delay time then this timer will not clear and will execute the cb of setTimeout
      timerId = setTimeout(()=>{ 
        callback()
      },delay)
  }
}

const getSearchResults = debounce(getData,1000)


