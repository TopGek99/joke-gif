// var searchTerm = $("#search-text");
var searchButton = $("#searchButton");

// Joke api
var category = $("#input_text");

searchButton.on("click", function (event) {
    event.preventDefault();
    var queryURL = "https://v2.jokeapi.dev/joke/Any?contains=" + category.val(); 
    // console.log(queryURL);
    console.log(category);
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);

        // Will need to have the user chose one of these, cannot figure out at this stage how to do both
        // if type = single
        console.log(response.joke);

        // if type = twopart
        console.log(response.setup);
        console.log(response.delivery);

        // search string 
        // need to append "&contains=" + searchterm to end of queryURL 

        // amount of jokes 
        // need to append "&amount=" + number to end of queryURL 
    })
});
