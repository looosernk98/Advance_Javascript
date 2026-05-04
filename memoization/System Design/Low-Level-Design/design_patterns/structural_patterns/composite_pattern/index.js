/*
 The Composite pattern allows treating individual objects and compositions of 
 objects uniformly.

 Use case: When working with hierarchical structures like trees (e.g., a 
       file system).

🔹 When to use Composite Pattern

Use it when:
- You have a tree-like structure
- Objects can be simple or composed
- Client code should not care if it’s dealing with one object or many

Examples:
- File system (file / folder)
- UI components (button / panel)
- Organization hierarchy
- Comment threads
*/

class Employee {
    constructor(name, position) {
      this.name = name;
      this.position = position;
    }
  
    showDetails() {
      console.log(`${this.name} - ${this.position}`);
    }
  }
  
  class Department {
    constructor() {
      this.employees = [];
    }
  
    addEmployee(employee) {
      this.employees.push(employee);
    }
  
    showDetails() {
      this.employees.forEach(emp => emp.showDetails());
    }
  }
  
  // Usage
  const emp1 = new Employee("Alice", "Developer");
  const emp2 = new Employee("Bob", "Designer");
  
  const dept = new Department();
  dept.addEmployee(emp1);
  dept.addEmployee(emp2);
  
  dept.showDetails();
  // "Alice - Developer"
  // "Bob - Designer"
  