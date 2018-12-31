(function() {
    var moreVal = 0;

    $("#button").on("click", function() {
        $.ajax({
            url: "https://elegant-croissant.glitch.me/spotify",
            data: {
                q: $("#input").val(),
                type: $("#select").val()
            },
            success: function(data) {
                data = data.artists || data.albums;

                if (data.next) {
                    moreVal = 20;
                    $("#more").show();
                } else {
                    $("#more").hide();
                }

                var resultHtml = "";

                resultHtml +=
                    "<h2> Results for " + $("input").val() + "</h2> <br/>";

                //nextUrl = data.next;

                if (data.items.length == 0) {
                    resultHtml +=
                        "<div class='error'> No results found! </div>";
                    $("#more").hide();
                }

                for (var i = 0; i < data.items.length; i++) {
                    if (data.items[i].images[0]) {
                        var resImg = data.items[i].images[0].url;
                    } else {
                        resImg = "no-results.jpg";
                    }

                    if (data.items[i].name[0]) {
                        var name = data.items[i].name;
                    } else {
                        name = "no-results.jpg";
                    }

                    resultHtml += "<div class='result'>";
                    resultHtml +=
                        "<div><a href='" +
                        data.items[i].external_urls.spotify +
                        "'target='_blank'><img src='" +
                        resImg +
                        "'/></a></div>";
                    resultHtml +=
                        "<div><p><a href='" +
                        data.items[i].external_urls.spotify +
                        "'target='_blank'>" +
                        name +
                        "</p></div>";
                    resultHtml += "</div>";
                }
                $(".results").html(resultHtml);
            }
        });
    });

    $("#more").on("click", function() {
        $.ajax({
            url: "https://elegant-croissant.glitch.me/spotify",
            data: {
                q: $("#input").val(),
                type: $("#select").val(),
                offset: moreVal
            },
            success: function(data) {
                data = data.artists || data.albums;

                if (data.next) {
                    moreVal += 20;
                    $("#more").show();
                    console.log("data.next");
                } else {
                    $("#more").hide();
                }

                var resultHtml = "";

                for (var i = 0; i < data.items.length; i++) {
                    if (data.items[i].images[0]) {
                        var resImg = data.items[i].images[0].url;
                    } else {
                        resImg = "no-results.jpg";
                    }

                    if (data.items[i].name[0]) {
                        var name = data.items[i].name;
                    } else {
                        name = "no-results.jpg";
                    }

                    resultHtml += "<div class='result'>";
                    resultHtml +=
                        "<div><a href='" +
                        data.items[i].external_urls.spotify +
                        "'target='_blank'><img src='" +
                        resImg +
                        "'/></a></div>";
                    resultHtml +=
                        "<div><p><a href='" +
                        data.items[i].external_urls.spotify +
                        "'target='_blank'>" +
                        name +
                        "</p></div>";
                    resultHtml += "</div>";
                }
                $(".results").append(resultHtml);
            }
        });
    });
})();
