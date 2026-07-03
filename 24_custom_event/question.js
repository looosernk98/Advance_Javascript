/*
 Create a custom event that sends product information.
*/

document.addEventListener("productAdded", (e) => {
    console.log(e.detail);
});

document.dispatchEvent(
    new CustomEvent("productAdded", {
        detail: {
            id: 1,
            name: "iPhone",
            price: 1000
        }
    })
);

/*
 Why isn't React's event system typically used for cross-component communication?

React uses Synthetic Events, which are wrappers around native browser events for 
handling UI interactions (like clicks and form inputs).

For communication between components, React typically relies on:

Props (parent → child)
Context
State management libraries (Redux, Zustand, etc.)

Using DOM CustomEvents inside a React app is possible, but it's generally reserved for integration scenarios such as:

Communication with non-React code
Micro-frontends
Web Components
Third-party widgets


Can CustomEvent cross Shadow DOM?
Yes, CustomEvent can cross Shadow DOM boundaries if the event is dispatched 
with the composed property set to true. 
By default, events do not cross Shadow DOM boundaries, but setting composed: true allows 
the event to propagate outside of the shadow root.
*/



/*

 Limitations of CustomEvent:
 1. No state storage : Redux stores state, Whereas In CustomEvent  If a component starts listening later, it misses the event.
 2. Difficult debugging
 3. No replay
 4. No time travel
*/