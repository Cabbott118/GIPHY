//Array for chosen GIPHY topics *STRING*
var topics = [
    "dog",
    "snake",
    "alligator",
    "bat"
];

// var userInput = "";

function displayAnimal() {
    var animalChoice = $(this).attr("data-name");
    //Given API Key
    var key = "NIt8I84MFyG4VY8syrnwRRGpqfftMg2T"
    //Given API Key directly added
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalChoice + "&api_key=" + key + "&limit=10&rating=R";
    //URL for Animals w/ my key included (testing purposes)
    // var queryURL = "http://api.giphy.com/v1/gifs/search?q=animals&api_key=NIt8I84MFyG4VY8syrnwRRGpqfftMg2T&limit=10&rating=PG-13";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var animalData = response.data;
        console.log(animalData);

        for (var i = 0; i < animalData.length; i++) {
            var animalDiv = $("<div class='col-sm'>");

            var rating = animalData[i].rating;
            var defaultAnimatedSrc = animalData[i].images.fixed_height.url;
            var staticSrc = animalData[i].images.fixed_height_still.url;
            var animalImage = $("<img>");
            var text = $("<h5>").text("Rating: " + rating);

            animalImage.attr("src", staticSrc);
            animalImage.addClass("animalGif");
            animalImage.attr("data-state", "still");
            animalImage.attr("data-still", staticSrc);
            animalImage.attr("data-animate", defaultAnimatedSrc);
            animalDiv.append(text);
            animalDiv.append(animalImage);

            $("#gifArea").prepend(animalDiv);


        }
    });
}

$("#addAnimal").on("click", function (addToArray) {
    addToArray.preventDefault();
    var animal = $("#userInput").val().trim();
    topics.push(animal);
    addButtons();
});

function addButtons() {
    $("#buttonArea").empty();
    for (var i = 0; i < topics.length; i++) {
        var btn = $('<button class="btn btn-info">');
        btn.addClass("animalBtn");
        btn.attr("id", "animal");
        btn.attr("data-name", topics[i]);
        btn.text(topics[i]);

        $("#buttonArea").append(btn);
    }
}
//Have to include addButtons function here to auto gen starting array btns
addButtons();
$(document).on("click", ".animalBtn", displayAnimal);