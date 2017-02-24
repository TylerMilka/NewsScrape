// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

// Routes
// =============================================================
module.exports = function(app) {

  // Main route (simple Hello World Message)
  app.get("/", function(req, res) {
    var scrapings = [];
    request("https://www.ultimate-guitar.com/news/", function(error, response, html) {

      // Load the HTML into cheerio and save it to a variable
      // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
      var $ = cheerio.load(html);

      // With cheerio, find each p-tag with the "title" class
      // (i: iterator. element: the current element)
      $("div.section").each(function(i, element) {

        // Save the text of the element (this) in a "title" variable
        var title = $(this).text();

        // In the currently selected element, look at its child elements (i.e., its a-tags),
        // then save the values for any "href" attributes that the child elements may have
        var link = $(element).children().attr("href");

          // If this title element had both a title and a link
        if (title && link) {
          console.log("Working");
          // Save the data in the scrapedData db
          scrapings.push({
            title: title,
            link: link
          },
          function(error, saved) {
            // If there's an error during this query
            if (error) {
              // Log the error
              console.log(error);
            }
            // Otherwise,
            else {
              // Log the saved data
              console.log(saved);
            }
          });
        }
      });
    });
    console.log(scrapings);
    res.render('index', { articles: scrapings });
  });

  app.get("/scrape", function(req, res){
    // Making a request call for reddit's "webdev" board. The page's HTML is saved as the callback's third argument
  });
}