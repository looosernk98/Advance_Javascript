/*

*************************** Real-World Use Cases / Advantages ************************

The Singleton Pattern is useful in various scenarios, including:

1. Managing Configuration Settings: You can use a Singleton to manage configuration 
      settings for your application, ensuring that there's a single source of truth for 
      configuration values.

2. Logger and Error Handling: A Singleton can be employed to maintain a centralized logging
       or error handling mechanism, allowing you to consolidate log entries or error messages.

3. Database Connections: When dealing with databases, you might want to use a Singleton 
       to ensure that there's only one database connection shared across the application
       to minimize resource consumption.

4. Caching: Implementing a Singleton for caching frequently used data can help optimize 
         performance by maintaining a single cache instance.


*************************** Considerations/ Disadvantages ************************************

While the Singleton Pattern can be beneficial, it's essential to use it judiciously. 
Overusing the Singleton pattern can lead to tightly coupled code and global state, 
which may make your application harder to maintain and test. Therefore, it's crucial 
to weigh the pros and cons and apply the pattern where it genuinely adds value to your
codebase.


***************************** Testing ***********************************************

Testing code that relies on a Singleton can get tricky. Since we can’t create new 
instances each time, all tests rely on the modification to the global instance of the 
previous test.The order of the tests matter in this case, and one small modification 
can lead to an entire test suite failing. After testing, we need to reset the entire 
instance in order to reset the modifications made by the tests.

*/