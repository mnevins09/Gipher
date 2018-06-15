//Start with document ready
$(document).ready(function() {
    
    //Make an object to hold start up team buttons 
    var gifObject = {
        sportsTeams: ["NY Yankees", "NY Mets", "Buffalo Bills Sports", "NY Giants", "NY Jets NFL", "NY Red Bulls", "NY Rangers", "NY Knicks", "NY Islanders", "NJ Devils"],
        defaultTeams: "",
        userInput: "",
        giphyApiUrl: "https://api.giphy.com/v1/gifs/search?",
        giphyApiKey: "9g7fZ4s5CHBKjx6HAQR3ToMrloeO7e8R",
        
        renderButtons: function() {
            $("#teamButtons").empty();
            for (var i = 0; i < this.sportsTeams.length; i++) {
                var a = $("<button>");
                a.addClass("buttons btn btn-danger");
                a.attr("data-name", this.sportsTeams[i]);
                a.text(this.sportsTeams[i]);
                $("#teamButtons").append(a);
            }

            //on click for buttons to display giphy output
            $(".buttons").on("click", function() {
                gifObject.defaultTeams = $(this).attr("data-name");
                gifObject.displayGifs();
            });
        },
        displayGifs: function() {
            console.log(this.defaultTeams);
            var teamToDisplay = this.defaultTeams;
            var queryURL = this.giphyApiUrl + "&q=" + teamToDisplay + "&limit=12&api_key=" + this.giphyApiKey;
            
            //Make ajax query and store it
            $.ajax({url: queryURL, method: "GET"}).done(function(response) {
                console.log(response);
                $("#gifsDisplay").empty();
                for (var i = 0; i < response.data.length; i++) {
                    var displayObject = response.data[i];
                    var notMoving = response.data[i].images.fixed_height_small_still.url;
                    var moving = response.data[i].images.fixed_height_small.url;
                    var displayRating = response.data[i].rating;
                    console.log("Object: " + displayObject);
                    console.log("Still: " + notMoving);
                    console.log("Moving: " + moving);
                    console.log("Rating: " + displayRating);
    
                    //Build the div that shows the images.  Add rating    
                    var displayDiv = $("<div class='show col-md-3'>");
                    var paragraph = $("<p>").text("Rating: " + displayRating);
                    displayDiv.append(paragraph);
                    var image = $("<img>").attr("src", notMoving);
                    image.addClass("isImageMoving");
                    image.attr("data-still", notMoving);
                    image.attr("data-animate", moving);
                    displayDiv.append(image);
                    $("#gifsDisplay").append(displayDiv);
                }
                
                //On click to start and stop the gifs
                $(".isImageMoving").on("click", function() {
                    if ($(this).attr("src") === $(this).attr("data-still")) {
                        $(this).attr("src", $(this).attr("data-animate"));
                    } 
                    else if ($(this).attr("src") === $(this).attr("data-animate")) {
                        $(this).attr("src", $(this).attr("data-still"));
                    }
    
                });
    
            });
        }
    };
    
    //Add on click to add additional teams to the output
    $("#addTeam").on("click", function() {
        gifObject.userInput = $("#teamInput").val().trim();
        if (gifObject.userInput != "") {
            gifObject.sportsTeams.unshift(gifObject.userInput);
            gifObject.renderButtons();
        }
        $("input#teamInput").val("");
        return false;
    });
    
    
    gifObject.renderButtons();
    
    });