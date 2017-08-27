var topic;
var queryURL;
var results;
var rating;
var imgDiv;
var topicImg;
var state = "still";
var searchTerms = ["Cat", "Kittens", "Puppies", "Ramen", "Running", "Marathon",
                    "Triathlon"];
var newBtn;
var newSearchTerm;

function addButtons() {

    for(var i = 0; i < searchTerms.length; i++) {
        newBtn = $("<button>");
        newBtn.addClass("btn btn-primary btn-sm topic-btn");
        newBtn.text(searchTerms[i]);
        $("#btn-div").append(newBtn);
    }
}

$(document).ready(function() {

    addButtons();

});

$(document).on("click", ".topic-btn", function() {

    topic = $(this).text();

    console.log(topic);

    // replace spaces with +
    if(topic.includes(" ")) {

        topic = topic.replace(/ /g, "+");
    }

    console.log(topic);
      
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    topic + "&api_key=cae50eb25c8f468c83e3875b6fa5d3a4&limit=10";

    console.log(queryURL);

    $.ajax( { url: queryURL, method: "GET" } ).done(function(response) {

        console.log(response);

        results = response.data;

        $("#img-container").html("<h2>Click on an image to toggle animation</h2>");

        for (var i = 0; i < results.length; i++) {

            rating = $("<p>");
            rating.attr("class", "rating")
            rating.text("Rating: " + results[i].rating);
            
            topicImg = $("<img>");
            topicImg.attr("class", "topic-img");
            topicImg.attr("state", "still");
            topicImg.attr("src", results[i].images.fixed_height_still.url);
            topicImg.attr("still-url", results[i].images.fixed_height_still.url);
            topicImg.attr("animate-url", results[i].images.fixed_height.url);

            imgDiv = $("<div>");
            imgDiv.append(topicImg);
            imgDiv.append(rating);

            $("#img-container").append(imgDiv);
        }
    });
});

// on-click event handler to toggle animation
$(document).on("click", ".topic-img", function() {

    state = $(this).attr("state");

    if(state === "still") {

        $(this).attr("src", $(this).attr("animate-url"));
        $(this).attr("state", "animate");
    }

    if(state === "animate") {

        $(this).attr("src", $(this).attr("still-url"));
        $(this).attr("state", "still");
    }
});

// on-click event handler to submit added search term
$(document).on("click", "#submit", function(event) {

    event.preventDefault();

    newSearchTerm = $("#search-term").val();

    if(newSearchTerm !== "") {

        searchTerms.push(newSearchTerm);

        $("#btn-div").html("");
        addButtons();

        $("#search-term").val("");
    }

});