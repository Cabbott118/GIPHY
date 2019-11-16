//Array for chosen GIPHY topics *STRING*
var topics = [
    "dog",
    "dragonfly",
    "alligator",
    "bat"
];
// var userInput = "";

function displayAnimal() {
    var animalChoice = $(this).attr("data-name");
    //Given API Key
    var key = "NIt8I84MFyG4VY8syrnwRRGpqfftMg2T"
    // var rating = ["g", "pg", "pg-13", "r"];

    //Given API Key directly added
    //For future, always change to HTTPS (issues occured when not)
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalChoice + "&api_key=" + key + "&limit=10&rating=r";
    //URL for Animals w/ my key included (testing purposes)
    // var queryURL = "https://api.giphy.com/v1/gifs/search?q=animals&api_key=NIt8I84MFyG4VY8syrnwRRGpqfftMg2T&limit=10&rating=PG-13";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        //Loading response.data into animalData var
        var animalData = response.data;
        //Log animalData for ease of use
        console.log(animalData);

        //Limit (length) is hard set to 10 in URL
        for (var i = 0; i < animalData.length; i++) {

            var animalDiv = $("<div class='col-sm'>");

            //Storing GIF rating in rating var
            var rating = animalData[i].rating;
            //Storing GIF title in title var
            var title = animalData[i].title;
            //Storing animated source in animate var
            var animate = animalData[i].images.fixed_height.url;
            //Storing still source in static var
            var static = animalData[i].images.fixed_height_still.url;
            //Giving animalImage var an img tag
            var animalImage = $("<img>");
            //Giving text var the proper text to display rating nicely
            var text = $("<h5>").text("Rating: " + rating);
            //Giving title var an h4 tag
            var title = $("<h4>").text(title);

            //Initializing the src attribute as the static source
            animalImage.attr("src", static);
            //Adding classes to all generated GIFs
            animalImage.addClass("animalGif");
            //Setting stock state to still
            animalImage.attr("data-state", "still");
            //Giving attr of static location
            animalImage.attr("data-still", static);
            //Same as above but for animated
            animalImage.attr("data-animate", animate);

            //Slap on still (line 51) image
            animalDiv.append(animalImage);
            //Slap on title
            animalDiv.append(title);
            //Slap on rating and text
            animalDiv.append(text);
            

            //Prepend image and rating text to HTML
            $("#gifArea").prepend(animalDiv);
        }

        $(".animalGif").on("click", function () {
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    });
}

$("#addAnimal").on("click", function (addToArray) {
    addToArray.preventDefault();
    //Store user input from HTML and trim
    var animal = $("#userInput").val().trim();

    //Need to practice else and else ifs. 
    //Felt comfortable writing multiple ifs, so..
    if (topics.includes(animal)) {
        //Checks if userInput is already in array
        //If yes, alert sent
        alert("This animal is already available!");
    }
    if (animal.length == 0) {
        //Checks if userInput = nothing
        //If yes, alert sent
        alert("Please enter an animal!");
    }
    if (!topics.includes(animal) && animal.length != 0) {
        //Push input within animal into topics array
        //if paramaters are met
        topics.push(animal);
    }
    //run addButtons function
    addButtons();
});

function addButtons() {
    //empty the area before adding buttons to prevent 
    //multiples of statically added buttons
    $("#buttonArea").empty();
    //Run a for loop to add button classes and attributes, 
    //then append to the page
    for (var i = 0; i < topics.length; i++) {
        var btn = $('<button class="btn btn-outline-info">');
        btn.addClass("animalBtn");
        btn.attr("id", "animal");
        btn.attr("data-name", topics[i]);
        btn.text(topics[i]);

        $("#buttonArea").append(btn);
    }
}
//Have to include addButtons function here to auto gen starting array btns
//Ran into issues when not including this and clearing buttonArea
addButtons();
$(document).on("click", ".animalBtn", displayAnimal);