$.getJSON("/Songs", function(data) {
    // Call our function to generate a table body
    displayResults(data);
  });

function displayResults(songs) {
    $("tbody").empty();

    songs.forEach(function(song) {
        var LINK = song.link;

        if (LINK == "<a href='undefined'>undefined</a>") {
            LINK = "No Link Available"
          };
        
    
        
        console.log(LINK)
        var tr = $("<tr>").append(
            $("<td>").text(song.title),
            $("<td id= 'link'>").innherHTML = LINK
        );
        $("tbody").append(tr)


    });
}



$(document).ready(function(){

    $('#song-sort').click(function () {
        console.log("SCRAPED")
        window.location.href = "/scrape";
        // return false;
    });

    $("#deleteDB").click(function() {
        window.location.href = "/delete";
        console.log("DB DELETED")
    })


});



