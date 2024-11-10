/*
  The Intersection Observer API provides a way to asynchronously observe changes 
  in the intersection of a target element with an ancestor element or with a 
  top-level document's viewport.

  OR

  The Intersection Observer API allows you to efficiently detect when elements 
  enter or leave the viewport (or any defined container)


OPTIONS IN INTERSECTION OBSERVER CONSTRUCTOR:

root: The element that is used as the viewport for checking visibility of the 
      target. Must be the ancestor of the target. Defaults to the browser 
      viewport if not specified or if null.

rootMargin: Margin around the root. A string of one to four values similar to 
            the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, 
            bottom, left). The values can only be absolute lengths or percentages. 
            This set of values serves to grow or shrink each side of the root 
            element's bounding box before computing intersections. Negative values 
            will shrink the bounding box of the root element and positive values 
            will expand it. The default value, if not specified, is "0px 0px 0px 0px".

threshold: Either a single number or an array of numbers which indicate at what 
           percentage of the target's visibility the observer's callback should 
           be executed. If you only want to detect when visibility passes the 
           50% mark, you can use a value of 0.5. If you want the callback to run 
           every time visibility passes another 25%, you would specify the array 
           [0, 0.25, 0.5, 0.75, 1]. The default is 0 (meaning as soon as even one 
           pixel is visible, the callback will be run). A value of 1.0 means that 
           the threshold isn't considered passed until every pixel is visible.


 Practical use cases:

 1. Lazy-loading of images or other content as a page is scrolled.
 2. Implementing "infinite scrolling" websites, where more and more content is 
    loaded and rendered as you scroll, so that the user doesn't have to flip 
    through pages.
 3. Reporting of visibility of advertisements in order to calculate ad revenues.
 4. Deciding whether or not to perform tasks or animation processes based on 
    whether or not the user will see the result.

 Note: Be aware that your callback is executed on the main thread. It should 
       operate as quickly as possible; if anything time-consuming needs to be 
       done, use Window.requestIdleCallback().
*/
const options = {
    // root: null,
    root: document.getElementById('scroll-container'),
    rootMargin: '0px',
    threshold: 1 // Trigger when 100% of the item is visible within the root
}
const observer = new IntersectionObserver(callback, options)

function callback(entries, observer){
    // console.log('entries: ', entries);
  entries.forEach(entry=>{
    console.log('entry: ', entry);
    if(entry.isIntersecting && entry.intersectionRatio === 1){
        console.log(`item ${entry.target.innerText} is in view`);
        entry.target.classList.add('in-view'); // Add a class when in view
        // entry.target.unobserve()
    }else{
        entry.target.classList.remove('in-view'); // Remove the class when out of view
    }
  })
}
const items = document.querySelectorAll('.item')

items.forEach(item => observer.observe(item))



