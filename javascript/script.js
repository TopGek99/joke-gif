// declaring variables assigned to elements manipulated within HTML
var searchButton = $("#searchButton");
var resetButton = $("#reset");
var jokeSearched = $(".jokeSearched");
var searchTerm = $("#input_text");
var gifDiv = $(".gipHy");
var historyDiv = $("#history");

// an array to store data from the local storage
var searchList;
// isJoke is boolean based on whether or not there is a joke retrieved from the joke api (declared globally as it
// is needed in multiple functions)
var isJoke;

// retrieving data from local storage upon the page loading
$(document).ready(function() {
    if (localStorage.getItem("searches") == null) {
        searchList = [];
        localStorage.setItem("searches",JSON.stringify(searchList));
    } else {
        searchList = JSON.parse(localStorage.getItem("searches"));
        for (var i=0;i<searchList.length;i++) {
            var hButton = createHistoryButton(searchList[i]);
            historyDiv.append(hButton);
        }
    }
})

// handles the clicking of the search button
searchButton.on("click", function (event) {
    event.preventDefault();
    searchList.push(searchTerm.val());
    localStorage.setItem("searches",JSON.stringify(searchList));
    showJoke(searchTerm.val(),false);
});

// handles the clicking of the reset button
resetButton.on("click", function(event) {
    event.preventDefault();
    gifDiv.empty();
    $(".jokeSearched").empty();
    searchTerm.val("");
});

// function to show the joke retrieved from joke api note: isButton variable is boolean stating whether
// or not the element triggering the function is a search history button, if it is not it creates
// a history button for the search term
function showJoke(keyword, isButton) {
    var queryURL = "https://v2.jokeapi.dev/joke/Any?contains=%20" + keyword + "%20&blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (jokeResponse) {
        jokeSearched.empty();
        gifDiv.empty();
        isJoke = !jokeResponse.error;
        // if else statement either displays joke (if there is one) or displays error
        if (isJoke) {
            if (jokeResponse.type == "twopart") {
                jokeSearched.append(jokeResponse.setup);
                jokeSearched.append("\n"+jokeResponse.delivery);
            } else {
                jokeSearched.append(jokeResponse.joke);
            }
            // creates a button if there is not one
            if (!isButton) {
                var hButton = createHistoryButton(keyword);
                historyDiv.append(hButton);
            }
            // calling showGIF within showJoke to ensure we know if there is a joke before showing the gif
            showGIF(keyword);
        } else {
            var errorMessage = $("<p>").text("No joke found! Please try again");
            $("form").append(errorMessage);
            setTimeout(function(){
                errorMessage.remove();
            },3000);
        }
    });
}

// function to show GIF retrieved from giphy api
function showGIF(searchword) {
    var gifURL = "https://api.giphy.com/v1/gifs/random?tag=" + searchword + "&api_key=OZnHKN9d6fdfIOqVaero2nouKah6hqfX";
    $.ajax({
        url: gifURL,
        method: "GET"
    }).then(function (giphyResponse) {
        var imageUrl = giphyResponse.data.images.fixed_height.url;
        var gif = $("<img>");
        gif.attr("src", imageUrl);
        gifDiv.append(gif);
    });
}

// function to create a button from the user's search history.
function createHistoryButton(btnText) {
    newHistoryButton = $("<button>");
    newHistoryButton.text(btnText);
    newHistoryButton.addClass("btn");
    newHistoryButton.on("click",function(){
        showJoke(btnText,true);
    });
    return newHistoryButton;
}