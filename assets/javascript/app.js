var topic;
var queryURL;
var results;
var rating;
var imgDiv;
var topicImg;

console.log("cats");

$(".topic-btn").on("click", function() {

    topic = $(this).text();
      
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    topic + "&api_key=cae50eb25c8f468c83e3875b6fa5d3a4&limit=10";

    $.ajax( { url: queryURL, method: "GET" } ).done(function(response) {

        console.log(response);

        results = response.data;

        for (var i = 0; i < results.length; i++) {

            rating = $("<p>");
            rating.attr("class", "rating")
            rating.text("Rating: " + results[i].rating);
            
            topicImg = $("<img>");
            topicImg.attr("src", results[i].images.fixed_height.url);

            imgDiv = $("<div>");
            imgDiv.append(topicImg);
            imgDiv.append(rating);

            $("#img-container").prepend(imgDiv);

        }
    });
});