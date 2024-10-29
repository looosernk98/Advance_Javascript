// https://www.youtube.com/watch?v=QCQVttjblRs

/*
 
 Q1. Diff bw semantic and non-semantic tags
 Ans . Semantic HTML tags are tags that define the meaning of 
       the content they contain.
 Q2. Diff bw flexbox and grid pattern
 Ans. flexbox was designed for layout in one dimension - either a row or a column. 
      Grid was designed for two-dimensional layout - rows, and columns at the same 
      time
 Q3. Reson behind when a css, html running on one browser and not on other
 Ans CSS behaves differently on different browsers because each browser has its 
     implementation of the CSS specifications.This can result in variations in 
     how the browser interprets the CSS code and renders the web page

 Q4. Tell us about the use of the CSS Box Model
 Ans. The CSS box model is essentially a box that wraps around every HTML element.
      It consists of: content, padding, borders and margins. The image below illustrates
      the box model:
       -> Important: When you set the width and height properties of an element 
          with CSS, you just set the width and height of the content area. To 
          calculate the total width and height of an element, you must also include
           the padding and borders.
 
*/

// Q1. Tell me some ways to check if a key exist in object or not ??
// Ans : 1. using hasOwnProperty
//       2. using for..in loop
//       3. using undefined

const input = [
    {
        key: 'Sample1',
        data: 'Data1'
    },
    {
        key: 'Sample2',
        data: 'Data2'
    },
    {
        key: 'Sample1',
        data: 'Data1'
    },
    {
        key: 'Sample2',
        data: 'Data2'
    },
    {
        key: 'Sample3',
        data: 'Data3'
    },
    {
        key: 'Sample2',
        data: 'Data2'
    },
    {
        key: 'Sample2',
        data: 'Data2'
    },
    {
        key: 'Sample3',
        data: 'Data3'
    },
    {
        key: 'Sample4',
        data: 'Data4'
    },
]


/*
EXPECTED OUTPUT

output:  {
  Sample1: [
    { key: 'Sample1', data: 'Data1' },
    { key: 'Sample1', data: 'Data1' }
  ],
  Sample2: [
    { key: 'Sample2', data: 'Data2' },
    { key: 'Sample2', data: 'Data2' },
    { key: 'Sample2', data: 'Data2' },
    { key: 'Sample2', data: 'Data2' }
  ],
  Sample3: [
    { key: 'Sample3', data: 'Data3' },
    { key: 'Sample3', data: 'Data3' }
  ],
  Sample4: [ { key: 'Sample4', data: 'Data4' } ]
}
*/

const output = {

}

input.forEach((item, index) => {
    if(output.hasOwnProperty(item.key)){
       output[item.key].push(item)
    }else{
      output[item.key] = [item];
    }
})
console.log('output: ', output);

/******************************************************************************/
/*
 Q. Does setTimeout always runs after delay time provided ?
    No, setTimeout() will not always run after the delay time, and it can take 
    more time than the delay time
    The delay parameter in setTimeout() only guarantees that the callback 
    function will not execute before the specified time. Other tasks or 
    operations in the queue could delay the execution further.

Q. Does setInterval always runs after delay time provided ?
   Yes, the setInterval() function in JavaScript will always run after the 
   delay time, but the function it executes can take longer than the delay time
*/


