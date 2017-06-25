$("document").ready(function() {

  $("#random").click(function() {
    location.href = "https://en.wikipedia.org/wiki/Special:Random";
  });

  $("#form").hide();

  //show form input when search clicked
  $("#search").click(function() {
    $("#search").remove();
    $("#form").show();
    $("#req").focus();
  });

  //when form submitted
  $("#form").submit(function(e) {
    e.preventDefault();

    $("#results").empty();

    //restyle page
    $("#buttons").css({"flex-direction": "row", "flex-grow": "0"});
    $("#results").css("flex-grow", "1");

    //percentagarize whitespace
    var request = $("#req").val();
    request = request.replace(/\s/g, "%20");

    var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&generator=search&gsrqiprofile=popular_inclinks_pv&prop=extracts|info&inprop=url&exsentences=2&exlimit=10&exintro=1&explaintext=1&exsectionformat=plain&callback=?&gsrsearch=intitle:" + request;

    //fetch data from wikimedia
    $.getJSON(url, function(json) {
      var result = json;

      var jString = JSON.stringify(result);

      //check that there are results
      if (jString.search("query") == -1) {
        $("#results").html("<div id=\"failure\" class=\"text-center\">HAHA<br>There are no results to your search<br>You fool</div>");
      }

      else {

        //Display wiki data onto the page
        for (i = 0; i < result.query.pages.length; i++) {
          var page = result.query.pages[i];

          //check that there is an extract
          if (page.extract == undefined) {
            var option = "<div onclick=\"location.href='" + page.fullurl + "'\" class=\"answer card\"><div class=\"card-header\">" + page.title + "</div><div class=\"card-block\"></div></div>";

          $("#results").append(option);
          }

          else {
            var option = "<div onclick=\"location.href='" + page.fullurl + "'\" class=\"answer card\"><div class=\"card-header\">" + page.title + "</div><div class=\"card-block\">" + page.extract + "</div></div>";

            $("#results").append(option);
          }

        }

        //hover feature
        $(".answer").hover(function() {
          $(this).addClass("card-info");
        }, function() {
          $(this).removeClass("card-info");
        });

      }

    });

  });

});
