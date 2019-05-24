$.getJSON("/allSongs", function(data) {
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
        // console.log("test")
        window.location.location = "http://localhost:3000/scrape";
        return false;
    });

    $("#deleteDB").click(function() {
        window.location.location = "http://localhost:3000/delete";
    })


});



