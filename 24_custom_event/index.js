
/*
const myEvent = new Event('myCustomEvent'); // 1. creation of custom event

// 2. attaching custom event to document
document.addEventListener('myCustomEvent', function(e){ 
  console.log('document', e);
})

// 3. dispatching custom event
document.dispatchEvent(myEvent)

*/


/****************************** Bubbling of custom event************************************/

const myEvent = new Event('myCustomEvent', { bubbles:true, cancelable:true, composed:false}); // 1. creation of custom event

document.addEventListener('myCustomEvent', function(e){ 
    console.log('document', e.defaultPrevented);
})

const button = document.querySelector('button')
button.addEventListener('myCustomEvent', (e) => {
    /* this work only work if cancelable property in event is true, if this is false, 
       e.defaultPrevented will always be false
     */
    e.preventDefault() 
    console.log('button',e.defaultPrevented); // by default , it is false
    // e.preventDefault()

})

// button.dispatchEvent(myEvent)


/****************************** Passing Data to Custom Event *********************************/

// for passing data to custom event , we need to use CustomEvent Constructor
const myEvent3 = new CustomEvent('myCustomEvent3', { 
    bubbles:true, 
    cancelable:true, 
    composed:false,
    detail: {
        hello: "world"
    }
});

document.addEventListener('myCustomEvent3', (e) => {
  console.log('document:', e.detail.hello);

})

// 3. dispatching custom event
document.dispatchEvent(myEvent3)



/******************* old way of creating custom event ********************/
// Create the event.
const event = document.createEvent("Event");

// Define that the event name is 'build'.
event.initEvent("build");

// Listen for the event.
elem.addEventListener('build', (e) => {
    console.log('old way: ', e);
});

// target can be any Element or other EventTarget.
elem.dispatchEvent(event);
