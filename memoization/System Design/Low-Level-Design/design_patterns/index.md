## what are design patterns ?
   When it comes to writing clean, maintainable, and efficient code, design patterns play a crucial role in the world of software development. Design patterns are reusable solutions to common problems that developers face while designing and building software systems. They provide a structured approach to solving specific challenges, making it easier to create code that is not only robust but also easier to understand and maintain.
   design patterns serve as guidelines for structuring your code in a way that promotes flexibility, reusability, and scalability.

## Categories of Design Patterns ?

# 1. Creational Patterns: 
  These patterns focus on object creation mechanisms, trying to create objects in a manner suitable for the situation. They abstract the instantiation process, making it more flexible and independent of the system.

# 2. Structural Patterns: 
   Structural patterns deal with object composition, forming relationships between objects to create larger, more complex structures. They help to define how objects and classes can be combined to form new structures and provide new functionality.

# 3. Behavioral Patterns: 
   Behavioral patterns are concerned with communication between objects, defining how they interact and distribute responsibilities. These patterns help you design systems where objects collaborate in a more flexible and efficient manner.



## Creational Patterns

1. Singleton Pattern: Ensures that a class has only one instance and provides a global point of access to that instance.

2. Factory Method Pattern: Defines an interface for creating an object but lets subclasses alter the type of objects that will be created.

3. Abstract Factory Pattern: Provides an interface for creating families of related or dependent objects without specifying their concrete classes.

4. Builder Pattern: Separates the construction of a complex object from its representation, allowing the same construction process to create different representations.

5. Prototype Pattern: Creates new objects by copying an existing object, known as the prototype.

6. Object Pool Pattern: Manages a pool of reusable objects to minimize the overhead of object creation and destruction.


## Structural Patterns

1. Adapter Pattern: Allows the interface of an existing class to be used as another interface.

2. Decorator Pattern: Attaches additional responsibilities to an object dynamically, providing a flexible alternative to subclassing.

3. Proxy Pattern: Provides a surrogate or placeholder for another object to control access to it.

4. Composite Pattern: Composes objects into tree structures to represent part-whole hierarchies.

5. Bridge Pattern: Separates an object's abstraction from its implementation, allowing both to vary independently.

6. Flyweight Pattern: Minimizes memory usage or computational expenses by sharing as much as possible with related objects.


# Behavioral Patterns

1. Observer Pattern: Defines a one-to-many dependency between objects, so when one object changes state, all its dependents are notified and updated automatically.

2. Strategy Pattern: Defines a family of algorithms, encapsulates each one, and makes them interchangeable.

3. Command Pattern: Encapsulates a request as an object, thereby allowing for parameterization of clients with queues, requests, and operations.

4. State Pattern: Allows an object to alter its behavior when its internal state changes, wrapping the behavior in separate classes.

5. Chain of Responsibility Pattern: Passes the request along a chain of handlers, allowing each handler to decide either to process the request or to pass it to the next handler in the chain.

6. Visitor Pattern: Represents an operation to be performed on the elements of an object structure, enabling you to define new operations without changing the classes of the elements.

