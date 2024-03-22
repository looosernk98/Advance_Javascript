/*
 Throttling is a technique in which, no matter how many times the user fires
 the event, the attached function will be executed only once in a given 
 time interval.

The main difference between throttling and debouncing is that throttling 
executes the function at a regular interval, while debouncing executes the 
function only after some cooling period.

Used Cases:
-> scrolling web pages to load further content like twitter feeds
-> clicking multiple times a button
*/



var  timerId;
var  divBodyDom  =  document.getElementById('div-body');

// This represents a very heavy method which takes a lot of time to execute
function  makeAPICall() {
	var  debounceDom  =  document.getElementById('debounc-count');
	var  debounceCount  =  debounceDom.innerHTML  ||  0;

	debounceDom.innerHTML  =  parseInt(debounceCount) +  1
}

// Throttle function: Input as function which needs to be throttled and delay is the time interval in milliseconds
var  throttleFunction  =  function (func, delay) {
	// If setTimeout is already scheduled, no need to do anything
	console.log('timerId: ', timerId);
	if (timerId) return
	// Schedule a setTimeout after delay seconds
	timerId  =  setTimeout(function () {
		func()
		// Once setTimeout function execution is finished, timerId = undefined so that in <br>
		// the next scroll event function execution can be scheduled by the setTimeout
		timerId  =  undefined;
	}, delay)
}

// Event listener on the input box
divBodyDom.addEventListener('scroll', function () {
	var  apiCallCountDom  =  document.getElementById('show-api-call-count');
	var  apiCallCount  =  apiCallCountDom.innerHTML  ||  0;
	apiCallCount  =  parseInt(apiCallCount) +  1;

	// Updates the number of times makeAPICall method is called
	apiCallCountDom.innerHTML  =  apiCallCount;

	// Throttles makeAPICall method such that it is called once in every 1000 milliseconds
	throttleFunction(makeAPICall, 1000)
})


// let timerId;
// function throttle(cb, delay){
//     if(timerId) return;
//     return () => {
//        timerId = setTimeout(() => {
//          cb()
//          timerId = undefined;
//        }, delay)
//     }
// }

