
// 1️⃣ Component (Common Interface – Conceptual)

/*************************************************
 * COMPONENT (Conceptual)
 * -----------------------------------------------
 * Common interface for both Leaf and Composite
 *************************************************/

class FileSystem{
    constructor(){
        if(new.target === FileSystem){
            throw new Error("Abstract class cant be instantiated")
        }
    }

    getSize(){
        throw new Error("getSize must be implemented")
    }

    showDetails(){
        throw new Error("showDetails msut be implemented")
    }
}

// 2️⃣ Leaf (Single Object) - individual objects

/*************************************************
 * LEAF
 * -----------------------------------------------
 * Represents individual objects.
 *************************************************/

class File extends FileSystem{
    constructor(name, size = 10){
        // “In JavaScript, when a child class defines a constructor, super() must be 
        // called before accessing this, because super() initializes the instance and 
        // sets up inheritance.”
        super()
        this.name = name;
        this.size = size;
    }

    getSize(){
        return this.size
    }

    showDetails(indent = ""){
      console.log(`${indent}📄 ${this.name} (${this.size}kb)`);
    }
}

// 3️⃣ Composite (Group of Objects)

/*************************************************
 * COMPOSITE
 * -----------------------------------------------
 * Can contain leaf or other composites.
 *************************************************/

class Folder extends FileSystem{
    constructor(name){
        super()
        this.name = name;
        this.children = [] // this will consist File object or Folder object
    }

    addComponent(comp){
        this.children.push(comp)
    }

    getSize(){
        return this.children.reduce((prevSize, currComp) => prevSize + currComp.getSize(), 0)
    }

    showDetails(indent = ""){
        console.log(`${indent}📁 ${this.name}`);

        this.children.forEach(child =>
          child.showDetails(indent + "  ")
        );
    }

}


/*************************************************
 * CLIENT CODE
 * -----------------------------------------------
 * Treats File and Folder uniformly.
 *************************************************/

const File1 = new File("file1.txt", 20);
const File2 = new File("file2.txt", 30);

const Folder1 = new Folder("docs")

Folder1.addComponent(File1)
Folder1.addComponent(File2)

const root = new Folder("root")

root.addComponent(Folder1)

root.addComponent(new File("readme.md"))

root.showDetails()
console.log('size: ', root.getSize(), "kb")

/*

root
    docs
        file1.txt
        file2.txt
    readme.md


*/

