
/*

 References : https://javascript.info/bubbling-and-capturing

 In JavaScript, event bubbling and event capturing are two different ways that 
 events propagate through the DOM tree when an event is triggered on a target 
 element

 ======================= Event Bubbling (default) ==================== 

 The event starts from the target element where it was triggered and bubbles up 
 through the ancestors of the target, going from the innermost element to the 
 outermost element (all the way up to document).

 ========================= Event Capturing (or Event Tricking) ===============

 The event starts from the outermost element (document) and travels down the DOM 
 tree to the target element. This is the opposite of event bubbling.


 Note : while all events flow down to the event target with the capture phase, 
        focus, blur, load and some others, don’t bubble up. That is, their 
        travel stops after the target phase.

-> Only listeners for the same event type (e.g., 'click') will be triggered 
   during bubbling.

🔁 What actually happens:

-> The event starts at the target element (the actual element clicked).
-> It then bubbles up through all ancestors (parentNode, parentElement, etc.) up to document, and finally window.
-> At each step, the browser checks:
👉 “Does this element have an event listener for this event type?”
   If yes, it executes the listener. If not, it continues bubbling.

*/

// capturing flow :  window object -> document -> html -> body -> element


// document.querySelector('body')
// .addEventListener('click',()=>{
//     console.log("body")
// })



// bubbling phase

document.querySelector('#grandparent')
.addEventListener('click',()=>{
   console.log('bubble phase: grandparent')
})

document.querySelector('#parent')
.addEventListener('click',()=>{
   console.log('bubble phase: parent')

})

document.querySelector('#child')
.addEventListener('click',(e)=>{
   console.log('bubble phase: child')
})

// capturing or trickling  phase

document.querySelector('#grandparent')
.addEventListener('click',(e)=>{

   console.log('capture phase: grandparent')
},true)

document.querySelector('#parent')
.addEventListener('click',(e)=>{
    e.stopPropagation()
   //  e.stopImmediatePropagation()
   //  e.stopPropagation()
   console.log('capture phase: parent1')
},true)

document.querySelector('#child')
.addEventListener('click',(e)=>{
   console.log('capture phase: child')
},true)

// document.querySelector('#parent')
// .addEventListener('click',()=>{
//    // it will be stopped by stopImmediate propagation fn
//     console.log('capture: onload event')
// },true)




