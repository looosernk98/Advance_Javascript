/*
 The MutationObserver interface provides the ability to watch for changes being 
 made to the DOM tree


 Basic Usage of MutationObserver:
1. Create a MutationObserver: Initialize a new MutationObserver and pass it a 
          callback function. This function is called whenever a mutation occurs.
2. Specify what to observe: Use observe to specify the target node and which 
          types of mutations to monitor.
3. Disconnect: Stop observing with disconnect if you no longer need to track 
          changes.


 The MutationObserver callback executes asynchronously in the event loop, meaning 
 it’s scheduled to run after all other synchronous JavaScript code and the current 
 stack of tasks are completed. Changes to the DOM trigger a queue of mutations, 
 but these mutations are only processed after the rest of the script has executed.

 Practical use cases:
 1. Detecting Dynamic Content Changes : 
    Example: Observing changes to a news feed that updates in real-time with 
             new posts.

 2. Watching for Changes in Form Elements:
   Example: Observing the addition of new input fields in a dynamic form builder.

 3. Tracking Attribute Changes (e.g., Class Name Changes):
   Example: Triggering animations or style changes when an element's class 
            is modified.

4. Lazy-Loading Content or Images:
   Example: Monitoring a container for newly appended images and setting up lazy 
          loading on them.

5. Monitoring Ads or Third-Party Widgets:
   Example: Automatically adjusting ad placement or layout when an ad element is 
            dynamically added to the page.

6. Tracking Changes in Contenteditable Elements:
   Example: Detecting and saving changes in a rich text editor built on 
            contenteditable divs.

7. Managing Infinite Scrolling or Pagination:
   Example: Loading additional posts when the last visible item is added to the 
           DOM during infinite scrolling.



Constructor:
MutationObserver() : Creates and returns a new MutationObserver which will invoke 
                     a specified callback function when DOM changes occur.

    
Instance methods:
disconnect(): Stops the MutationObserver instance from receiving further 
              notifications until and unless observe() is called again.

observe(target, options): Configures the MutationObserver to begin receiving 
           notifications through its callback function when DOM changes matching 
           the given options occur.

    Options that we can listen changes for are :
    1. subtree
    2. childList
    3. attributes
    4. attributeFilter
    5. attributeOldValue
    6. characterData
    7. characterDataOldvalue

takeRecords(): Removes all pending notifications from the MutationObserver's 
            notification queue and returns them in a new Array of MutationRecord 
            objects.
*/

const observer = new MutationObserver(callback)

const targetNode = document.querySelector('#par')

function callback(records, observer){
    
    for(let record of records ){
        console.log('records: ', record.type, record);
    }

    // observer.disconnect()
}

observer.observe(targetNode, {
    childList: true,
    subtree: true,
    attributes:true,
    characterData:true // will be fired if we type in div
})

// adding a child with << childList >> observer option
document.getElementById('add-child').addEventListener('click', (e)=> {
    const newChild = document.createElement('div');
    newChild.classList.add('div')
    newChild.textContent = 'div ' + (document.getElementById('par').children.length + 1)
    document.getElementById('par').appendChild(newChild)
})

// removing inner div with << subtree >> observer option
document.getElementById('remove-inner').addEventListener('click', () => {
    document.querySelector('.innerDiv').remove()
})

// changing attributes with << attributes >> observe option
document.getElementById('change-attr').addEventListener('click', () => {
    // document.querySelector('.one').setAttribute('contentEditable', false)
    document.querySelector('.one').classList.replace('one', 'pink')
})




