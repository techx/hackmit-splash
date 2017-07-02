////////////////////
// VIDEO THINGS
////////////////////

// https://stackoverflow.com/questions/21159301/quotaexceedederror-dom-exception-22-an-attempt-was-made-to-add-something-to-st
// Safari, in Private Browsing Mode, looks like it supports localStorage but all calls to setItem
// throw QuotaExceededError.
if (typeof localStorage === 'object') {
    try {
        localStorage.setItem('localStorageEnabled', 1);
        localStorage.removeItem('localStorageEnabled');
    } catch (e) {
        Storage.prototype._setItem = Storage.prototype.setItem;
        Storage.prototype.setItem = function() {};
    }
}

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
