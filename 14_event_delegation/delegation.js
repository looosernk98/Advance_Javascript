/*
  References : 1.https://dmitripavlutin.com/javascript-event-delegation/
            2. https://javascript.info/event-delegation
            3. https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events
            4. https://www.javascripttutorial.net/javascript-dom/javascript-event-delegation/
            5. https://www.geeksforgeeks.org/event-delegation-in-javascript/
 */


  // defintion -> 
/*
  Event Delegation is basically a pattern to handle events efficiently. Instead 
  of adding an event listener to each and every similar element, 
  we can add an event listener to a parent element and call an event on a 
  particular target using the . target property of the event object.

🔥 Why Use Event Delegation?

✅ Better performance (fewer event listeners)
✅ Automatically works for dynamically added elements
✅ Cleaner code

✅ Real-World Use Cases

-> Handling clicks on lists, tables, cards, etc.
-> Form validation
-> Dropdowns or tab switching
-> Delegating hover or input events

*/


document.querySelector('.parent').addEventListener('click', (e) => {
  console.log(e.target);
})

