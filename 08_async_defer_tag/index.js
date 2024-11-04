/*

 async and defer are a boolean attribute which are used along with script tag 
 to load external scripts efficiently in our web page

 when we load a page , two major things happen are :
 1. HTML parsing
 2. Script Loading 

 Script Loading contains two parts :
  -> fetching the scripts from network
  -> executing script line by line

  the async and defer attributes both allow the browser to continue parsing the HTML 
  document while JavaScript files are being downloaded, but they differ in when 
  those files are executed.

 Async downloads and executes JavaScript as soon as it’s available, while defer 
 attribute waits until the HTML document has been parsed before downloading and 
 executing any external scripts.

*/


//**************************** Normal Case ( Without async or defer) ************/
/* 

    <p>...content before script...</p>
    
    <!-- here browser will load the script and pause the HTML parsing until script is executed -->

    <script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

    <!-- This isn't visible until the script loads -->
    <p>...content after script...</p>

    NOTE : here JS/browser is blocking the rendering of HTML
*/


// ************************ async attribute ******************************
/*
   Async in script tag in JavaScript is a way to load scripts asynchronously. 
   That means, if a script is async, it will be loaded independently of other 
   scripts on the page, and will not block the page from loading.

   If you have a page with several external scripts, loading them all 
   asynchronously can speed up the page load time, because the browser can 
   download and execute them in parallel.

   <p>...content before scripts...</p>

    <script>
      document.addEventListener('DOMContentLoaded', () => alert("DOM ready!"));
    </script>

    <script async src="https://javascript.info/article/script-async-defer/long.js"></script>
    <script async src="https://javascript.info/article/script-async-defer/small.js"></script>

    <p>...content after scripts...</p>
*/ 






// ************************** defer attribute **************************
/*
   By using the defer attribute in HTML, the browser will load the script only 
   after parsing (loading) the page. This can be helpful if you have a script 
   that is dependent on other scripts, or if you want to improve the loading 
   time of your page by loading scripts after the initial page load.

    <p>...content before script...</p>

    <script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

    <!-- visible immediately -->
    <p>...content after script...</p>

*/




/*



 
	         Order	                                         DOMContentLoaded
                                              
async	 Load-first order. Their document order          Irrelevant. May load and execute while the document has not yet been fully downloaded.
       doesn’t matter – which loads first runs first	 That happens if scripts are small or cached, and the document is long enough.


defer	 Document order (as they go in the document).	   Execute after the document is loaded and parsed (they wait if needed),
                                                       right before DOMContentLoaded.


*/
