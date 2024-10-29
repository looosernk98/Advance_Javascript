const puppeteer = require("puppeteer")

let page ;

let url = "https://www.atlassian.com/company/careers/all-jobs" ;

(async function(){
    try{
        let browser = await puppeteer.launch({
            headless : false,
            defaultViewport : null,
            args :["--start-maximized"],
        });
    
        let pages = await browser.pages();
    
        page = pages[0];
        await page.goto(url);

        let links = await getAllJobsLink(page);
        console.log('links: ', links);

    }
    catch(err){
      console.log(err);
    }
    
})();

  async function getAllJobsLink(page){
    return await page.evaluate(()=>{
        let links = [];
        var elements = document.querySelectorAll("a");

        for(let i=0; i<elements.length; i++){
           links.push(elements[i].href)
        } 
        return links;
    })
  }
