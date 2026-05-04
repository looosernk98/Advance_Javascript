/*

The Builder Pattern is beneficial in various scenarios, including:

1. Complex Object Creation: When you need to create objects with many optional or 
          configurable properties, the Builder Pattern simplifies the construction
          process.

2. Immutable Objects: Builders can be used to create immutable objects, as you
         can set properties during construction but prevent modification afterward.

3. Parameterized Constructors: Instead of using long parameter lists in constructors, 
         the Builder Pattern provides a cleaner and more organized approach to 
         constructing objects.

4. Configuration Objects: When configuring libraries or components, builders can 
         help create and customize configuration objects.



Considerations / disadvantage:

While the Builder Pattern offers many advantages, it's important to note that it 
adds complexity to your codebase, especially if the objects being constructed are 
relatively simple. Therefore, it's essential to evaluate whether the complexity 
introduced by the Builder is justified for your specific use case.

*/