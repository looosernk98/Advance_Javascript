/*
  The Intersection Observer API provides a way to asynchronously observe changes 
  in the intersection of a target element with an ancestor element or with a 
  top-level document's viewport.

  OR

  The Intersection Observer API allows you to efficiently detect when elements 
  enter or leave the viewport (or any defined container)

 Practical use cases:
 Lazy-loading of images or other content as a page is scrolled.
 Implementing "infinite scrolling" websites, where more and more content is loaded and rendered as you scroll, so that the user doesn't have to flip through pages.
 Reporting of visibility of advertisements in order to calculate ad revenues.
 Deciding whether or not to perform tasks or animation processes based on whether or not the user will see the result.

 Note: Be aware that your callback is executed on the main thread. It should 
       operate as quickly as possible; if anything time-consuming needs to be 
       done, use Window.requestIdleCallback().
*/

const observer = new IntersectionObserver(callback)

function callback(entries, observer){
  entries.forEach(entry=>{
    if(entry.isIntersecting){
        console.log(`item ${entry.target.innerText} is in view`);
        entry.target.classList.add('in-view'); // Add a class when in view
    }else{
        entry.target.classList.remove('in-view'); // Remove the class when out of view
    }
  })
}
const items = document.querySelectorAll('.item')

const options = {
    root: document.querySelector('.scroll-container'),
    rootMargin: 0,
    threshold: 1 // Trigger when 50% of the item is visible within the root
}

items.forEach(item => observer.observe(item,options))



