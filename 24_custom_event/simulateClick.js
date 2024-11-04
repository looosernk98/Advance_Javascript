/* 
 dispatchEvent return false if event is cancelable, and at least one of the event handlers which 
 received event called Event.preventDefault(). Otherwise true.
*/

function simulateClick() {
    const event = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    const cb = document.getElementById("checkbox");
    const cancelled = !cb.dispatchEvent(event);
  
    if (cancelled) {
      // A handler called preventDefault.
      alert("cancelled");
    } else {
      // None of the handlers called preventDefault.
      alert("not cancelled");
    }
}