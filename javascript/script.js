// var searchTerm = $("#search-text");
var searchButton = $("#searchButton");
var isJoke;

// Joke api
var category = $("#input_text");

searchButton.on("click", function (event) {
    event.preventDefault();
    var queryURL = "https://v2.jokeapi.dev/joke/Any?contains=%20" + category.val() + "%20";
    // console.log(queryURL);
    // console.log(category);
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);

        isJoke = !response.error;
        if (isJoke) {
            $(".jokeSearched").append(response.joke);
            
        } else {
            $("form").append($("<p>").text("No joke found! Please try again"));
        }
        



        // Will need to have the user chose one of these, cannot figure out at this stage how to do both
        // if type = single
        // console.log(response.joke);

        // // if type = twopart
        // console.log(response.setup);
        // console.log(response.delivery);

        // search string 
        // need to append "&contains=" + searchterm to end of queryURL 

        // amount of jokes 
        // need to append "&amount=" + number to end of queryURL 

        var gifURL = "https://api.giphy.com/v1/gifs/search?q=" + category.val() + "&api_key=dc6zaTOxFJmzC";
        $.ajax({
            url: gifURL,
            method: "GET"
        }).then(function (response) {
            console.log(isJoke);
            if (isJoke) {
                var imageUrl = response.data[0].images.fixed_height.url;

                var gif = $("<img>");

                gif.attr("src", imageUrl);
                $(".gipHy").append(gif);
            }
            
        });
    });
});
