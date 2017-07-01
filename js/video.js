////////////////////
// VIDEO THINGS
////////////////////

$(document).ready(function() {

	var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    $splash = $("#splash");
    $video = $("#fs-video");
    $spinner = $("#spinner");

	// first visit and not mobile
	if (!localStorage.noFirstVisit && width >= 768) {
        localStorage.noFirstVisit = "1";

        $video.css("display", "block");

        document.getElementById('fs-video').play();

		$video.on("ended", function() {
			$splash.css("visibility", "visible");
            $splash.animate({"opacity": 1}, 1000, "ease-in");

            $video.animate({"opacity": 0}, 500, "ease-out", function () {
                $("#fs-container").remove();
            });
		});
	} else {
        $("#fs-container").remove();
        $splash.css("visibility", "visible");
        $splash.css("opacity", 1)
	}

});
