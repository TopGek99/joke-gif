var searchTerm = $("#search-text");
var searchButton = $("#searchButton");
var cityName = $("#city-name");
var language = $("#language");

var beerURL = "https://api.openbrewerydb.org/breweries?by_city="+cityName;
var languageURL = "https://api.cloudmersive.com/nlp-v2/translate/language/deu/to/eng";
$.post(languageURL, {
    TextToTranslate: "string"
  }).done(function(response) {
      alert(response);
  });

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

        for (let i = 0; i < 5; i++) {
            var breweryName = $("<h2>");
            breweryName.text(response[i].name);
            $(".breweryList").append(breweryName);

            var breweryType = $("<p>");
            breweryType.text("Brewery Type: " + response[i].brewery_type);
            $(".breweryList").append(breweryType);

            var street = $("<p>");
            street.text("Address: " + response[i].street);
            $(".breweryList").append(street);

            var website = $("<p>");
            website.text(response[i].website_url);
            $(".breweryList").append(website);
        }
    })
});
