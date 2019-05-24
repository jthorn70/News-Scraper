var cheerio = require("cheerio");
var axios = require("axios");

console.log("\n******************************************\n" +
"Grabbing every MP3 link\n" +
"from Musigh.com" +
"\n******************************************\n");

axios.get("http://musigh.com/").then(function(response) {
    var $ = cheerio.load(response.data);
    
    var results = [];

    $("strong").each(function(i, element) {
        var title = $(element).text();
        var link = $(element).parent().attr("href");



        results.push({
            title: title,
            link: link
        });

    });

    console.log(results);
});