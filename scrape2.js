const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');                                                   // Node read/write file system

const writeStream = fs.createWriteStream('post.csv');                       // Store in Variable, and pass in the file we want to create

// Write Headers
writeStream.write(`Title,Link,Date \n`);


request("http://codedemos.com/sampleblog/", (error, response, html) => {    // Takes two parameter, the source to be scrape, and a call back function
    if (!error && response.statusCode == 200) {                             // If no error, and response is good, 
        const $ = cheerio.load(html);                                       // Store in a $ variable so we can use it like jQuery

        
        $('.post-preview').each((i, el) => {            // Looping through all the post preview
            const title = $(el)                         // Store in variable 'title' and 
                .find('.post-title')                    // Find the class
                .text()                                 // Returns the text only
                .replace(/\s\s+/g, '');                 // Use regex to remove whitespace,\s\s+ will get rid of white space, and 'g' for global and replace with noth, an empty string


            const link = $(el)                          
                .find('a')                              // <a> element
                .attr('href');                          // link location
                
            const date = $(el)
                .find('.post-date')                     // Get posted date
                .text()                                 // return as text
                .replace(/,/, '');                      // Regex to remove commas in data format e.g. (January 12, 2018)

            // Write Row to CSV
            writeStream.write(`${title}, ${link}, ${date} \n`);
        });

        console.log('Scraping Done...');
    }
})