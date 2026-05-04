/*
 The Flyweight Pattern is a structural design pattern used to reduce memory usage 
 by sharing common (intrinsic) state between many objects instead of storing it 
 repeatedly.

 Flyweight minimizes memory usage by sharing immutable state across multiple objects.

🔹 When to use Flyweight

Use it when:
- You need to create a very large number of similar objects
- Objects share common data
- Memory or performance is a concern
- State can be split into intrinsic (shared) and extrinsic (per-object)

Real examples
- Text editors (characters)
- Game particles / bullets
- Map markers
- Caching icons / images
- DOM style objects

🔹 Core Idea

Object State = Intrinsic (shared) + Extrinsic (unique)

# Intrinsic state → stored in flyweight (shared)
# Extrinsic state → passed by client


*/

// 1️⃣ Flyweight (Shared Object)

/*************************************************
 * FLYWEIGHT
 * -----------------------------------------------
 * Stores intrinsic (shared) state
 *************************************************/

 class CharacterStyle {
  constructor(font, size, color) {
    this.font = font;
    this.size = size;
    this.color = color;
  }

  draw(char, position) {
    console.log(
      `Draw '${char}' at ${position} with ${this.font}, ${this.size}, ${this.color}`
    );
  }
}

// 2️⃣ Flyweight Factory (Cache & Reuse)
/*************************************************
 * FLYWEIGHT FACTORY
 *************************************************/

 class StyleFactory {
  constructor() {
    this.cache = {};
  }

  getStyle(font, size, color) {
    const key = `${font}-${size}-${color}`;

    if (!this.cache[key]) {
      this.cache[key] = new CharacterStyle(font, size, color);
    }

    return this.cache[key];
  }
}

// 3️⃣ Client Code (Extrinsic State)

/*************************************************
 * CLIENT CODE
 *************************************************/

 const factory = new StyleFactory();

 const text = "HELLO";
 let position = 0;
 
 for (const char of text) {
   const style = factory.getStyle("Arial", 12, "black");
   style.draw(char, position++);
 }
 
 /*

  🧪 Memory comparison:

  ❌ Without Flyweight
  10000 characters → 10000 style objects

  ✅ With Flyweight
  10000 characters → 1 style object


  🎯 Real-world JavaScript examples
-> DOM internals:
  - Shared style objects
  - Shared event listeners

-> Map icons:
  - getIcon(type) → reused

-> React internals:
  - Element type objects are reused
  - Props are extrinsic



 */



