////////////////////
// VIDEO THINGS
////////////////////


$(document).ready(function() {

	var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

	// first visit and not mobile
	if (!localStorage.noFirstVisit && width >= 768) {
		localStorage.noFirstVisit = "1";
		$("body").append('<div id="fs-container"><video muted autoplay id="fs-video" style="display:none"><source src="/assets/videos/splash-intro-compressed.mp4" type="video/mp4"></video></div>');
		$("#fs-video").css("display", "block");
		$("#splash").css("display", "none");
		$("#splash").css("opacity", "0");

		$("#fs-video").on("ended", function() {
			$("#fs-video").fadeOut(500);
			$("#splash").css("display", "inline");
			setTimeout(function(){
				$("#splash").animate({"opacity":"+=1"}, 1000);
			}, 500);
		});
	}

})
