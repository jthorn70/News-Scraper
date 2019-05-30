

// Dependencies
var express = require("express");
// var mongojs = require("mongojs");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var exphbs = require('express-handlebars');



var db = require("./models");

var PORT = process.env.PORT || 8080;

// Initialize Express
var app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static("public"));

// Database configuration

// var databaseUrl = "musighdb";
// var collections = ["Songs"];

// Hook mongojs configuration to the db variable

// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

var MONGODB_URI = process.env.MONGODB_URI || "I N S E R T  Y O U R  I N F O" ;

mongoose.connect(MONGODB_URI), { useNewUrlParser: true };

// mongoose.connect("mongodb://localhost:27017/musighdb", { useNewUrlParser: true });

// Main route (simple Hello World Message)
app.get("/", function(req, res) {
  res.render("index");
});

// TODO: make two more routes

// Route 1
// =======
// This route will retrieve all of the data
// from the scrapedData collection as a json (this will be populated
// by the data you scrape using the next route)


// Route 2
// =======
// When you visit this route, the server will
// scrape data from the site of your choice, and save it to
// MongoDB.
// TIP: Think back to how you pushed website data
// into an empty array in the last class. How do you
// push it into a MongoDB collection instead?

app.get("/delete", function(req, res) {
  db.Songs.find({},function(error, found) {
    res.send("DB DELETED | GO BACK TO HOME PAGE")
    console.log( "D E L E T I N G")
  })

});




app.get("/scrape", function(req, res) {
  console.log("S C R A P I N G");
  res.send("SITE SCRAPED | GO BACK TO HOME PAGE")

  for (var i = 0; i < 15; i++) {
    axios.get("http://musigh.com/page/" + i)
      .then(function(response) {
        // console.log("S C R A P I N G")
        var $ = cheerio.load(response.data);
        var results = [];
        var bad = [];

        $("strong").each(function(i, element) {
          var title = $(element).text();
          var link = $(element)
            .parent()
            .attr("href");
          // console.log("This is the link: " + link)

          link = "<a href='" + link + "'>" + link + "</a>";

          if (link != "<a href='undefined'>undefined</a>") {
            results.push({
              title: title,
              link: link
            });
          } else
            bad.push({
              title: title,
              link: link
            });
        });

        console.log(results);
        for (var i = 0; i < results.length; i++) {
          db.Songs.create({
            title: results[i].title,
            link: results[i].link
          });

          if ((link = "<a href='undefined'>undefined</a>")) {
            db.Songs.remove({ link: "<a href='undefined'>undefined</a>" });
          }

          // if (link.startsWith("<a href='http://dl.soundowl.com/")) {
          //   db.Songs.remove({"link": link.startsWith("<a href='http://dl.soundowl.com/")})
          // }

          //   if (link.startsWith("<a href='http://dl.soundowl.com")) {
          //     console.log("IT WORKS =============== IT WORKS")
          // }
        }
      })
      .then(function() {
        console.log("F I N I S H E D   S C R A P I N G   P A G E   ");
      })
      .catch(function(error) {
        console.error(error);
      })

  }

});

app.get("/Songs", function(req, res) {
  db.Songs.find({}, function(error, found) {
    if (error) {
      console.log(error);
    } else {
      res.json(found);
    }
  });
});



app.get("/Songs/:id", function(req, res) {
  db.Songs.findOne({_id: req.params.id})
    .populate("note")
      .then(function(found) {
        res.json(found)
      })
        .catch(function() {
          res.json(err)
        })
});

app.post("/Songs/:id/note", function(req, res) {
  db.Note.create(req.body)
    .then(function(found) {
      res.json(found)
    })
      .catch(function(err) {
        res.json(err)
      })
})

/* -/-/-/-/-/-/-/-/-/-/-/-/- */

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port: " + PORT + " !");
});
