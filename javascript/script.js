// var searchTerm = $("#search-text");
var searchButton = $("#searchButton");
var resetButton = $("#reset");
var searchList;
var isJoke;

// Joke api
var category = $("#input_text");

$(document).ready(function() {
    if (localStorage.getItem("searches") == null) {
        searchList = [];
        localStorage.setItem("searches",JSON.stringify(searchList));
    } else {
        searchList = JSON.parse(localStorage.getItem("searches"));
        for (var i=0;i<searchList.length;i++) {

        }
    }
})

searchButton.on("click", function (event) {
    event.preventDefault();
    searchList.push(category.val());
    localStorage.setItem("searches",JSON.stringify(searchList));
    var queryURL = "https://v2.jokeapi.dev/joke/Any?contains=%20" + category.val() + "%20";
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        $(".jokeSearched").empty();

        isJoke = !response.error;
        if (isJoke) {
            if (response.type == "twopart") {
                $(".jokeSearched").append(response.setup);
                $(".jokeSearched").append("\n"+response.delivery);
            } else {
                $(".jokeSearched").append(response.joke);
            }
        } else {
            var errorMessage = $("<p>").text("No joke found! Please try again");
            $("form").append(errorMessage);
            setTimeout(function(){
                errorMessage.remove();
            },1000);
        }

        var gifURL = "https://api.giphy.com/v1/gifs/search?q=" + category.val() + "&api_key=dc6zaTOxFJmzC";
        $.ajax({
            url: gifURL,
            method: "GET"
        }).then(function (response) {
            $(".gipHy").empty();
            if (isJoke) {
                var imageUrl = response.data[0].images.fixed_height.url;

                var gif = $("<img>");

                gif.attr("src", imageUrl);
                $(".gipHy").append(gif);
            }
            
        });
    });
});

resetButton.on("click", function(event) {
    event.preventDefault();
    $(".gipHy").empty();
    $(".jokeSearched").empty();
    category.val("");
})