/*
 The Proxy Pattern is a structural design pattern that provides a placeholder 
 / surrogate object to control access to another object.

 Proxy pattern controls access to an object by wrapping it with another object
having the same interface.

 Use case: Used for lazy initialization, security, or logging.

🔹 When to use Proxy:

Use it when you need to:
- Control access (auth / permissions)
- Lazy-load expensive objects
- Add logging, caching, validation
- Protect sensitive resources
- Add behavior without changing the real object

Real-world examples:
- API gateways
- Caching layers
- Access control
- Virtual DOM
- JavaScript Proxy API

🔹 Types of Proxy:

| Type                 | Purpose        |
| -------------------- | -------------- |
| **Virtual Proxy**    | Lazy loading   |
| **Protection Proxy** | Access control |
| **Remote Proxy**     | Network access |
| **Caching Proxy**    | Cache results  |
| **Logging Proxy**    | Monitor calls  |


Client → Proxy → RealSubject
- Proxy & RealSubject share same interface
- Client doesn’t know which one it’s talking to




*/

// 1️⃣ Subject (Common Interface – conceptual)
class Image{
  display(){
    throw new Error("display() must be implemented");
  }
}

// 2️⃣ Real Subject (Actual Object)
class RealImage extends Image {
    constructor(filename) {
      super()
      this.filename = filename;
      this.loadFromDisk();
    }
  
    loadFromDisk() {
      console.log(`Loading image: ${this.filename}`);
    }
  
    display() {
      console.log(`Displaying image: ${this.filename}`);
    }
  }
  
  // 3️⃣ Proxy
  class ImageProxy extends Image {
    constructor(filename) {
      super()
      this.filename = filename;
      this.realImage = null;
    }
  
    display() {
      if (!this.realImage) {
        this.realImage = new RealImage(this.filename);
      }
      this.realImage.display();
    }
  }
  
  // Usage
  const img = new ImageProxy("photo.jpg");
  console.log("Image created");
  img.display(); // Loads and displays the image
  img.display(); // Just displays (no loading)

  /*
   
 🔍 What’s happening?
 - Image is not loaded at creation
 - Loaded only when display() is called
 - Proxy controls access
 

  */
  
//  🔹 JavaScript Native Proxy (Very important!)
// JavaScript has a built-in Proxy API 🔥

// Example: Validation Proxy
const user = {
  name: "Niranjan",
  age: 22
};

const userProxy = new Proxy(user, {
  set(target, prop, value) {
    if (prop === "age" && value < 18) {
      throw new Error("Age must be 18+");
    }
    target[prop] = value;
    return true;
  }
});

userProxy.age = 25; // ✅
userProxy.age = 15; // ❌ Error
