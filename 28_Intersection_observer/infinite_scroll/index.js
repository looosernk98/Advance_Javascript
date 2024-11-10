
const options = {
    root: null, // Use the viewport as the root
    rootMargin: '100px', // it will load content in advance when last child of list is visible to basically hide the loader
    threshold: 1.0
}
const observer = new IntersectionObserver(callback, options)

// Create the intersection observer callback function
function callback(entries){
   entries.forEach((entry) => {
     if(entry.isIntersecting){
         loadMoreContent()
     }
   })
}

let currPage = 1; // Track the current page or batch of data
const LIMIT = 10;
// Function to simulate loading content
function loadMoreContent(){
   for(let i =0; i<LIMIT; i++){
      const divEle = document.createElement('div');
      divEle.classList.add('item')
      divEle.textContent = 'item '+ ((currPage-1)*LIMIT + i + 1);
      const container = document.getElementById('container')
      container.appendChild(divEle)
   }
   currPage++;
}

// Start observing the loading indicator
const loaderEle = document.getElementById('loader')

observer.observe(loaderEle)

// Initial content load
loadMoreContent()
