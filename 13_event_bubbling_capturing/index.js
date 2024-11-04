
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

*/

// capturing flow :  window object -> document -> html -> body -> element


// document.querySelector('body')
// .addEventListener('click',()=>{
//     console.log("body")
// })



// bubbling phase

document.querySelector('#grandparent')
.addEventListener('click',()=>{
   console.log('grandparent')
})

document.querySelector('#parent')
.addEventListener('click',()=>{
   console.log('parent')

})

document.querySelector('#child')
.addEventListener('click',(e)=>{
   console.log('child')
})

// capturing or trickling  phase

// document.querySelector('#grandparent')
// .addEventListener('click',(e)=>{

//    console.log('grandparent')
// },true)

// document.querySelector('#parent')
// .addEventListener('click',(e)=>{
//    //  e.stopPropagation()
//     e.stopImmediatePropagation()
//    //  e.stopPropagation()
//    console.log('parent1')
// },true)

// document.querySelector('#child')
// .addEventListener('click',(e)=>{
//    console.log('child')
// },true)

// document.querySelector('#parent')
// .addEventListener('click',()=>{
//    // it will be stopped by stopImmediate propagation fn
//     console.log('onload event')
// },true)




