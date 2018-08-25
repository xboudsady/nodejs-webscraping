const request = require('request');
const cheerio = require('cheerio');

request("http://codedemos.com/sampleblog/", (error, response, html) => {    // Takes two parameter, the source to be scrape, and a call back function
    if (!error && response.statusCode == 200) {                             // If no error, and response is good, 
        const $ = cheerio.load(html);                                       // Store in a $ variable so we can use it like jQuery
    
        const siteHeading = $('.site-heading');                             // Targets the .site-heading class on the page
        
        // console.log(siteHeading.html());                                 // Logs the html elements
        // console.log(siteHeading.text());                                 // Strips the <html> element, and just text
        // const output = siteHeading.find('h1').text();                    // find the all <h1> element and the text in it
        // const output = siteHeading.children('h1').text();                // Does the same thing
        // const output = siteHeading.children('h1').next().text();         // Gets the next element
        // const output = siteHeading.children('h1').parent().text();       // Gets parent also

        $('.nav-item a').each((i, el) => {
            const item = $(el).text();                                      // Get text from the nav menu link
            const link = $(el).attr('href');                                // Output the links

            console.log(link);
        });
    }
})