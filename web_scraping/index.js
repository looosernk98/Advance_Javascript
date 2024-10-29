const request = require('request');
const cheerio = require('cheerio')

request('https://www.worldometers.info/coronavirus/#google_vignette', function (error, response, body) {
//   console.error('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.

  handleHtml(body)
});

function handleHtml(html){
    const $ = cheerio.load(html)
    const jobLinks = [];

    $('a').each((i, link) => {
      const href = $(link).attr('href');
    //   if (href && href.includes('/company/careers/')) {
        jobLinks.push(href);
    //   }
    });

    console.log(jobLinks);
}