/*
Purpose: stopPropagation() stops the event from propagating further through the 
         DOM in both the bubbling and capturing phases.

Effect:
The event will not trigger any additional event listeners attached to ancestor 
elements (higher up in the DOM hierarchy).However, stopPropagation() does not 
prevent other event listeners on the same element from being called.


<div id="parent">
  <button id="child">Click Me</button>
</div>

<script>
  document.getElementById("parent").addEventListener("click", function() {
    console.log("Parent clicked");
  });

  document.getElementById("child").addEventListener("click", function(event) {
    event.stopPropagation(); // Stops the event from propagating to the parent
    console.log("Child clicked");
  });

  document.getElementById("child").addEventListener("click", function() {
    console.log("Another listener on the child");
  });
</script>

*/

// Output (if you click on the button):
// Child clicked
// Another listener on the child

/*
The Parent clicked message does not appear because stopPropagation() prevented 
the event from bubbling up to the parent element.
Both listeners on the child element are called because stopPropagation() only 
affects event propagation to ancestors, not other listeners on the same element.
*/


