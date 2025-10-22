// ============================================
// CONVERTING OBJECTS TO BLOBS
// ============================================

/*
YES, we can convert objects to Blobs!
Objects need to be serialized (converted to string) first using JSON.stringify()
*/

const person = {
    name: "niranjan",
    age: 27,
    skills: ['react', 'javascript'],
    education:{
      degree: 'B.Tech',
      cgpa: 8.4
    }
}

// ❌ WRONG: This won't work properly - object is converted to [object Object]
// const blobObj = new Blob([person], { type: "text/plain"})

// ✅ CORRECT: Convert object to JSON string first
const blobObj = new Blob([JSON.stringify(person)], { type: "application/json"})

console.log("Blob created:", blobObj);
console.log("Blob size:", blobObj.size, "bytes");
console.log("Blob type:", blobObj.type);


// ============================================
// WHY IS IT USEFUL?
// ============================================

/*
1. File-like handling of data without actual files
2. Works with File API and download functionality
3. Can be sent via network requests
4. Memory efficient for large data
5. Can create object URLs for browser manipulation
*/


// ============================================
// USE CASE 1: DOWNLOAD JSON DATA AS FILE
// ============================================
const person = {
    name: "niranjan",
    age: 27,
    skills: ['react', 'javascript'],
    education:{
      degree: 'B.Tech',
      cgpa: 8.4
    }
}
function downloadObjectAsJSON(obj, filename) {
    // Convert object to Blob
    const blob = new Blob([JSON.stringify(obj, null, 2)], { 
        type: "application/json" 
    });
    
    // Create URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create temporary download link
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url);
}

// Usage:
downloadObjectAsJSON(person, 'person.json');


// ============================================
// USE CASE 2: EXPORT DATA TO CSV
// ============================================

function downloadArrayAsCSV(dataArray, filename) {
    const users = [
        { name: 'John', age: 30, city: 'New York' },
        { name: 'Jane', age: 25, city: 'London' },
        { name: 'Bob', age: 35, city: 'Paris' }
    ];
    
    // Convert to CSV
    const headers = Object.keys(users[0]).join(',');
    const rows = users.map(user => Object.values(user).join(',')).join('\n');
    const csv = `${headers}\n${rows}`;
    
    // Create Blob
    const blob = new Blob([csv], { type: 'text/csv' });
    
    // Download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

// Usage:
// downloadArrayAsCSV(users, 'users.csv');


// ============================================
// USE CASE 3: SENDING OBJECT DATA VIA API
// ============================================

async function uploadObjectData(obj) {
    const blob = new Blob([JSON.stringify(obj)], { 
        type: "application/json" 
    });
    
    const formData = new FormData();
    formData.append('data', blob, 'data.json');
    
    // Send to server
    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
    });
    
    return response.json();
}

// Usage:
// uploadObjectData(person).then(console.log);


// ============================================
// USE CASE 4: CREATE PREVIEW/DISPLAY URL
// ============================================

function displayObjectInIframe(obj) {
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: monospace; padding: 20px; }
                pre { background: #f4f4f4; padding: 15px; }
            </style>
        </head>
        <body>
            <h2>Object Data</h2>
            <pre>${JSON.stringify(obj, null, 2)}</pre>
        </body>
        </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Can be used in iframe
    // document.getElementById('preview').src = url;
    
    return url;
}

// Usage:
// const previewUrl = displayObjectInIframe(person);
// console.log("Preview URL:", previewUrl);


// ============================================
// USE CASE 5: LOCAL STORAGE ALTERNATIVE (for large data)
// ============================================

class BlobStorage {
    constructor() {
        this.store = new Map();
    }
    
    // Store object as blob
    set(key, obj) {
        const blob = new Blob([JSON.stringify(obj)], { 
            type: "application/json" 
        });
        const url = URL.createObjectURL(blob);
        this.store.set(key, url);
    }
    
    // Retrieve object from blob
    async get(key) {
        const url = this.store.get(key);
        if (!url) return null;
        
        const response = await fetch(url);
        const text = await response.text();
        return JSON.parse(text);
    }
    
    // Remove from storage
    delete(key) {
        const url = this.store.get(key);
        if (url) {
            URL.revokeObjectURL(url);
            this.store.delete(key);
        }
    }
}

// Usage:
const storage = new BlobStorage();
storage.set('user', person);
// storage.get('user').then(console.log);


// ============================================
// USE CASE 6: IMAGE/CANVAS TO BLOB
// ============================================

async function canvasToBlob(canvas) {
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob);
        }, 'image/png');
    });
}

// Convert data URL to Blob (useful for images)
function dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    
    while(n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new Blob([u8arr], { type: mime });
}


// ============================================
// USE CASE 7: READING BLOB CONTENT
// ============================================

async function readBlobAsText(blob) {
    return await blob.text();
}

async function readBlobAsJSON(blob) {
    const text = await blob.text();
    return JSON.parse(text);
}

async function readBlobAsDataURL(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

// Usage examples:
async function demonstrateReading() {
    const testBlob = new Blob([JSON.stringify(person)], { 
        type: "application/json" 
    });
    
    // Method 1: Using blob.text()
    const textContent = await readBlobAsText(testBlob);
    console.log("As text:", textContent);
    
    // Method 2: Parse as JSON
    const jsonContent = await readBlobAsJSON(testBlob);
    console.log("As JSON:", jsonContent);
}

// demonstrateReading();


// ============================================
// USE CASE 8: COMBINING MULTIPLE OBJECTS
// ============================================

function combineObjectsToBlob(objects) {
    const combined = objects.map(obj => JSON.stringify(obj)).join('\n');
    return new Blob([combined], { type: 'application/x-ndjson' }); // Newline Delimited JSON
}

// Usage:
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];
const combinedBlob = combineObjectsToBlob(users);


// ============================================
// USE CASE 9: CREATING DOWNLOADABLE REPORTS
// ============================================

function generateReport(data) {
    const report = {
        generatedAt: new Date().toISOString(),
        summary: {
            totalUsers: data.length,
            averageAge: data.reduce((sum, u) => sum + u.age, 0) / data.length
        },
        data: data
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { 
        type: "application/json" 
    });
    
    return blob;
}


// ============================================
// USE CASE 10: CLIPBOARD OPERATIONS
// ============================================

async function copyObjectToClipboard(obj) {
    const blob = new Blob([JSON.stringify(obj, null, 2)], { 
        type: 'text/plain' 
    });
    
    const clipboardItem = new ClipboardItem({
        'text/plain': blob
    });
    
    await navigator.clipboard.write([clipboardItem]);
    console.log('Object copied to clipboard!');
}

// Usage:
// copyObjectToClipboard(person);


// ============================================
// PRACTICAL EXAMPLE: COMPLETE DOWNLOAD SYSTEM
// ============================================

class FileExporter {
    static exportJSON(obj, filename = 'export.json') {
        const blob = new Blob([JSON.stringify(obj, null, 2)], { 
            type: "application/json" 
        });
        this.download(blob, filename);
    }
    
    static exportText(text, filename = 'export.txt') {
        const blob = new Blob([text], { type: 'text/plain' });
        this.download(blob, filename);
    }
    
    static exportCSV(data, filename = 'export.csv') {
        if (!Array.isArray(data) || data.length === 0) return;
        
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(item => 
            Object.values(item).map(val => 
                typeof val === 'string' ? `"${val}"` : val
            ).join(',')
        ).join('\n');
        
        const csv = `${headers}\n${rows}`;
        const blob = new Blob([csv], { type: 'text/csv' });
        this.download(blob, filename);
    }
    
    static download(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Usage examples:
// FileExporter.exportJSON(person, 'person.json');
// FileExporter.exportText('Hello World', 'hello.txt');
// FileExporter.exportCSV(users, 'users.csv');


// ============================================
// KEY ADVANTAGES OF USING BLOBS FOR OBJECTS
// ============================================

/*
1. ✅ Memory Efficiency: Blobs are stored efficiently in memory
2. ✅ Browser Native: Works seamlessly with browser APIs
3. ✅ URL Creation: Can create temporary URLs using URL.createObjectURL()
4. ✅ File Operations: Can be treated like files for download/upload
5. ✅ Stream Support: Can be read as streams for large data
6. ✅ Network Transfer: Easy to send via FormData or fetch
7. ✅ Type Safety: MIME types help with data handling
8. ✅ No File System: Works without requiring file system access
*/

console.log("\n✅ Blob concepts and use cases demonstrated!");

