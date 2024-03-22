
/*

 References : https://javascript.info/bubbling-and-capturing

 Note : while all events flow down to the event target with the capture phase, focus, blur, load and some others, 
        don’t bubble up. That is, their travel stops after the target phase.

*/

// capturing flow :  window object -> document -> html -> body -> element


// document.querySelector('body')
// .addEventListener('click',()=>{
//     console.log("body")
// })



// // bubbling phase

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

document.querySelector('#grandparent')
.addEventListener('click',(e)=>{

   console.log('grandparent')
},true)

document.querySelector('#parent')
.addEventListener('click',(e)=>{
   //  e.stopPropagation()
   //  e.stopPropagation()
   console.log('parent1')
},true)

// document.querySelector('#parent')
// .addEventListener('onmouseover',()=>{
//     console.log('onload event')
// },true)


document.querySelector('#child')
.addEventListener('click',(e)=>{
    
   console.log('child')
},true)



