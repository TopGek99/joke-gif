var searchTerm = $("#search-text");
var searchButton = $("#searchButton");

// initilizing materialize css 
$(document).ready(function () {
    M.AutoInit();
});

// searching for breweries 
searchButton.on("click", function () {
    // event.preventDefault();
    var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + searchTerm.val().trim()
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
    })
});

console.log("hello");