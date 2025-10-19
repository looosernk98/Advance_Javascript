// const person = {
//   name: "alex",
//   age: 23,
// }

// person.age = 26;

// person = {
//   name: "abc"
// }

// let a = 10;
function outer(){
  let a = 10;
  
  function inner(){
    console.log(a);
    a++;
  }
  
  inner()
}

outer()

outer()

outer()

// // // for()



// const input = "hi i am test"
// // output -> tset ma i ih

// // ih i ma tset

// const arr = input.split(" ");

// let output = "";

// for(let i =0; i<arr.length; i++){
//   output += reverseStr(arr[i]) + " ";
// }

// console.log(output);

// function reverseStr(str){
//   let ans = "";
//   for(let i = str.length-1; i>=0; i--){
//     ans += str.charAt(i);
//   }
//   return ans;
// }


// {
//     "user.id": 1,
//     "user.name": "John Doe",
//     "user.address.street": "123 Main St",
//     "user.address.city": "New York",
//     "user.address.zip": "10001",
//     "user.preferences.notifications": true,
//     "user.preferences.theme": "dark",
//     "user.hobbies": ["Reading", "Gaming", "Traveling"],  // Array left intact
//     "friends": [
//         { id: 2, name: 'Jane Smith' },
//         { id: 3, name: 'Michael Johnson' }
//     ],  // Array left intact
//     "active": true
// }

const userProfile = {
    user: {
        id: 1,
        name: 'John Doe',
        address: {
            street: '123 Main St',
            city: 'New York',
            zip: '10001'
        },
        preferences: {
            notifications: true,
            theme: 'dark'
        },
        hobbies: ['Reading', 'Gaming', 'Traveling']  // This will be skipped in flattening
    },
    friends: [
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Michael Johnson'}
    ], 
    active: true,
}


// Method 1: Using a result object and prefix parameter
function flattenObject(obj, prefix = '', result = {}) {
    console.log('obj: ', obj);
    console.log('prefix: ', prefix);
    console.log('result: ', result);
    
    for (let key in obj) {
        // if (obj.hasOwnProperty(key)) {
            const val = obj[key];
            const newKey = prefix ? `${prefix}.${key}` : key;
            
            if (Array.isArray(val)) {
                // Keep arrays intact
                result[newKey] = val;
            } else if (val !== null && typeof val === 'object') {
                // Recursively flatten nested objects
                flattenObject(val, newKey, result);
            } else {
                // Assign primitive values
                result[newKey] = val;
            }
        // }
    }
    return result;
}

// Method 2: 
function flatten(obj){
    const res = {};
     
    for(let [key, value] of Object.entries(obj)){
        if(Array.isArray(value)){
          res[key] = value;
        }else if(typeof value === 'object'){
          const flattenObj = flatten(value)
          for(let [ckey, cvalue] of Object.entries(flattenObj)){
            const newKey = key + "." + ckey
            res[newKey] = cvalue;
          }
          
        }else{
          res[key] = value;
        }
    }
    return res;
  }
  
  
  const res = flatten(userProfile);
  console.log(res);

// // Method 2: More functional approach
// function flattenObjectFunctional(obj, prefix = '') {
//     return Object.keys(obj).reduce((acc, key) => {
//         const val = obj[key];
//         const newKey = prefix ? `${prefix}.${key}` : key;
        
//         if (Array.isArray(val)) {
//             acc[newKey] = val;
//         } else if (val !== null && typeof val === 'object') {
//             Object.assign(acc, flattenObjectFunctional(val, newKey));
//         } else {
//             acc[newKey] = val;
//         }
        
//         return acc;
//     }, {});
// }

// // Method 3: With custom options (separator, array handling, etc.)
// function flattenObjectAdvanced(obj, options = {}) {
//     const {
//         separator = '.',
//         keepArrays = true,
//         maxDepth = Infinity,
//         currentDepth = 0
//     } = options;
    
//     const result = {};
    
//     for (let key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             const val = obj[key];
            
//             if (Array.isArray(val)) {
//                 if (keepArrays) {
//                     result[key] = val;
//                 } else {
//                     // Flatten arrays if keepArrays is false
//                     val.forEach((item, index) => {
//                         const arrayKey = `${key}[${index}]`;
//                         if (item !== null && typeof item === 'object') {
//                             Object.assign(result, flattenObjectAdvanced(
//                                 { [arrayKey]: item }, 
//                                 { ...options, currentDepth: currentDepth + 1 }
//                             ));
//                         } else {
//                             result[arrayKey] = item;
//                         }
//                     });
//                 }
//             } else if (val !== null && typeof val === 'object' && currentDepth < maxDepth) {
//                 // Recursively flatten nested objects
//                 const nestedFlattened = flattenObjectAdvanced(val, {
//                     ...options,
//                     currentDepth: currentDepth + 1
//                 });
                
//                 for (let nestedKey in nestedFlattened) {
//                     result[`${key}${separator}${nestedKey}`] = nestedFlattened[nestedKey];
//                 }
//             } else {
//                 // Assign primitive values or objects at max depth
//                 result[key] = val;
//             }
//         }
//     }
    
//     return result;
// }

// Test all methods
console.log('=== Method 1: Basic Flattening ===');
const flattened1 = flattenObject(userProfile);
console.log(flattened1);

// console.log('\n=== Method 2: Functional Approach ===');
// const flattened2 = flattenObjectFunctional(userProfile);
// console.log(flattened2);

// console.log('\n=== Method 3: Advanced with Options ===');
// const flattened3 = flattenObjectAdvanced(userProfile, {
//     separator: '_',
//     keepArrays: true
// });
// console.log(flattened3);

// console.log('\n=== Method 3: Flatten Arrays Too ===');
// const flattened4 = flattenObjectAdvanced(userProfile, {
//     keepArrays: false
// });
// console.log(flattened4);







  



























