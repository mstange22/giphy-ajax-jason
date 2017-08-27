var topic;
var queryURL;
var results;
var rating;
var imgDiv;
var topicImg;
var state = "still";
var btnArray = [];

$(".topic-btn").on("click", function() {

    topic = $(this).text();
      
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    topic + "&api_key=cae50eb25c8f468c83e3875b6fa5d3a4&limit=10";

    $.ajax( { url: queryURL, method: "GET" } ).done(function(response) {

        console.log(response);

        results = response.data;

        $("#img-container").html("");

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

            $("#img-container").prepend(imgDiv);
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