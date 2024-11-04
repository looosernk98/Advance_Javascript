
const buttonEle = document.querySelector('.db-click-btn')


// attaching event
buttonEle.addEventListener('doubleClick', (e) => {
  console.log('timeBetweenClicks:', e.detail.timeBetweenClicks);
})

let lastClick = 0;
const MAX_DOUBLE_CLICK_TIME = 500;

buttonEle.addEventListener('click', (e) => {
   const timeBetweenClicks = e.timeStamp - lastClick
   if(timeBetweenClicks > MAX_DOUBLE_CLICK_TIME){
     lastClick = e.timeStamp;
     return;
   }
   
   // creating doubleClick CustomEvent
   const doubleClickEvent = new CustomEvent('doubleClick', {
     bubbles:true,
     cancelable:true,
     composed:true,
     detail:{
        timeBetweenClicks
     }
   })
   // dispatching double Clikc event
   e.target.dispatchEvent(doubleClickEvent);
   lastClick = 0; // reseting to 0 to catch doubeClick event next time
})
