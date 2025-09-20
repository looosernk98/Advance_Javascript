// element.addEventListener(type, listener, options);

/*
The 3rd parameter options can be:

A boolean → legacy style
An object → modern, flexible style


1. Boolean (legacy)

element.addEventListener("click", handler, true);  // useCapture = true

true → handler runs during the capture phase
false → handler runs during the bubble phase (default)

2. Object (recommended)

element.addEventListener("click", handler, {
  capture: false,     // Run in bubbling phase
  once: true,         // Remove listener after first call
  passive: true       // Don’t call event.preventDefault()
});

| Option    | Type    | Default | Description                                              |
| --------- | ------- | ------- | -------------------------------------------------------- |
| `capture` | Boolean | `false` | Run during **capture phase** instead of bubble           |
| `once`    | Boolean | `false` | Remove listener automatically after first call           |
| `passive` | Boolean | `false` | Improve scroll performance; disallows `preventDefault()` |


*/