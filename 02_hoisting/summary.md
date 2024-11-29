### Summary
Before code execution starts, in the creation phase JS creates memory and declare 'variables' and 'functions' within that scope. This process is called **Hoisting**

- Hoisting happens for both **variables** and **functions**

- `var`, `let` and `const` are hoisted. `var` is kept undefined while `let` and `const` are kept in TDZ (Temporal Dead Zone)

- `function` and `async function` are hoisted, but **function expressions** and **arrow functions** are not.

### Precedence

- `function` hoisting take more precedence over `variable` hoisting. So in case there is two declaration with same name, one is `var` and other is `function`, it will be hoisted as `function`.

- With `function` and an `async function` with the same name in the same scope, the last declared one takes precedence, and this behavior applies both during hoisting and at runtime.

- `let` and `const` does not allow redeclaration in the same scope, if you try it will show an error.