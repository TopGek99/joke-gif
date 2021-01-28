var searchButton = $("#searchButton");
var resetButton = $("#reset");
var jokeSearched = $(".jokeSearched");
var searchTerm = $("#input_text");
var gifDiv = $(".gipHy");
var historyDiv = $("#history");
var searchList;
var isJoke;

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

searchButton.on("click", function (event) {
    event.preventDefault();
    searchList.push(searchTerm.val());
    localStorage.setItem("searches",JSON.stringify(searchList));
    showJoke(searchTerm.val(),false);
});

resetButton.on("click", function(event) {
    event.preventDefault();
    gifDiv.empty();
    $(".jokeSearched").empty();
    searchTerm.val("");
});

function showJoke(keyword, isButton) {
    var queryURL = "https://v2.jokeapi.dev/joke/Any?contains=%20" + keyword + "%20&blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (jokeResponse) {
        jokeSearched.empty();

        isJoke = !jokeResponse.error;
        if (isJoke) {
            if (jokeResponse.type == "twopart") {
                jokeSearched.append(jokeResponse.setup);
                jokeSearched.append("\n"+jokeResponse.delivery);
            } else {
                jokeSearched.append(jokeResponse.joke);
            }
            if (!isButton) {
                var hButton = createHistoryButton(keyword);
                historyDiv.append(hButton);
            }
            showGIF(keyword);
        } else {
            var errorMessage = $("<p>").text("No joke found! Please try again");
            $("form").append(errorMessage);
            setTimeout(function(){
                errorMessage.remove();
            },1000);
        }
    });
}

function showGIF(searchword) {
    var gifURL = "https://api.giphy.com/v1/gifs/random?tag=" + searchword + "&api_key=OZnHKN9d6fdfIOqVaero2nouKah6hqfX";
    $.ajax({
        url: gifURL,
        method: "GET"
    }).then(function (giphyResponse) {
        gifDiv.empty();
        var imageUrl = giphyResponse.data.images.fixed_height.url;
        console.log(giphyResponse.data.images.fixed_height.url);

        var gif = $("<img>");

        gif.attr("src", imageUrl);
        gifDiv.append(gif);
    });
}

function createHistoryButton(btnText) {
    newHistoryButton = $("<button>");
    newHistoryButton.text(btnText);
    newHistoryButton.addClass("btn");
    newHistoryButton.on("click",function(){
        showJoke(btnText,true);
    });
    return newHistoryButton;
}