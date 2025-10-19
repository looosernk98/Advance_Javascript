/*
Purpose: stopImmediatePropagation() not only stops the event from propagating 
         further through the DOM but also prevents any other event listeners on 
         the same element from being called.

Effect:
The event will not trigger any additional event listeners on the same element 
or any ancestor elements.
It completely halts the event's propagation and execution of any remaining 
listeners.

✅ Listeners before the one with stopImmediatePropagation still execute.
❌ Listeners after it on the same element are blocked.

*/

/*
<div id="parent">
  <button id="child">Click Me</button>
</div>

<script>
  document.getElementById("parent").addEventListener("click", function() {
    console.log("Parent clicked");
  });

   document.getElementById("child").addEventListener("click", function() {
    console.log("Another listener on the child");
  });

  document.getElementById("child").addEventListener("click", function(event) {
    event.stopImmediatePropagation(); // Stops the event immediately
    console.log("Child clicked");
  });

 
</script>

===============================================

Output (if you click on the button):
Child clicked

===============================================

The Parent clicked message does not appear, just like with stopPropagation().
The Another listener on the child message does not appear either, because 
stopImmediatePropagation() prevents any further event listeners on the same 
element from being executed.

*/