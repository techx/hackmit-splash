
(function() {

	'use strict';

	var break_med = 768; // px

	////////////////////
	// FAQ TOGGLES
	////////////////////

	Array
		.from(document.getElementsByClassName('question'))
		.forEach(function (question) {
			question.addEventListener('click', (function() {

				// Hide all expanded FAQ sections
                Array
                    .from(document.querySelectorAll('#faq-section .expanded'))
                    .forEach(function (element) {
                        element.classList.remove('expanded');
                    });

				var parentClasses = question.parentElement.classList;

				if (parentClasses.contains('expanded'))
					parentClasses.remove('expanded');
				else
					parentClasses.add('expanded');

			}).bind(this));
		});

	////////////////////
	// SECTION TOGGLES
	////////////////////

	var sections = ['register', 'faq', 'speakers', 'sponsors'];

	function hideAllSections() {
		// Reset buttons to default view and hide main content sections
		Array.from(document.querySelectorAll('.controls li.expanded')).forEach(function(element) {
			element.classList.remove('expanded');
		});

		// The primary button should no longer go back now that sections are hidden
		Array.from(document.getElementsByClassName('primary-button')).forEach(function(element) {
            var nextSection = element.parentElement.getAttribute('id').replace('-section', '');
            element.setAttribute('href', '#'+nextSection);
        });
	}

	function router(event) {
		// The bit after the # (e.g. url == #faq --> section == faq)
		var nextSection = location.hash.slice(1);
		var li = document.getElementById(nextSection + '-section');

		document.body.classList.remove('section-expanded');

		if (sections.indexOf(nextSection) >= 0) {
            // The URL hash is one of our sections --? reveal it
			hideAllSections();

			// Reveal current section
			li.classList.add('expanded');
			document.body.classList.add('section-expanded');

			// Edit the section title's href, so when clicked, we go back
            li.querySelector('.primary-button').setAttribute('href', '#!');
            return false;
		} else if (!nextSection.length || nextSection === "!") {
			// Navigated to /#!, /#, or / --> hide all sections
			hideAllSections();
		}
	}

	// Call the router on page start, and whenever the URL hash changes
	// Array.from(document.getElementsByTagName('a')).forEach(function (a) {
    //    a.addEventListener('click', router);
    // });
    window.addEventListener('hashchange', router);
	router();

    /////////////////////////////////////
    // SPEAKERS RIGHT PANE ALIGNMENT
    /////////////////////////////////////
    function resize() {
        // For desktop only, position and squish the speakers pane
        if (window.innerWidth > break_med) {
            var top = 300 - window.innerHeight/2 - 250;
            var speakers_element = document.querySelector('#speakers-section .right');
            var speakers_content = speakers_element.querySelector('#speakers-section .content');
            speakers_element.style.top = top + "px";
            speakers_content.style.maxHeight = (window.innerHeight - 130) + "px";
        }
    }

    window.addEventListener('resize', resize);
    resize();

	////////////////////
	// COUNTDOWN
	////////////////////

	/* Handle timezone conversions */
    function daysToHack() {
	    var launchDate = new Date('Sep 16 2017');
        var localDate = new Date();
		var utc = localDate.getTime() + (localDate.getTimezoneOffset() * 60000);
		var edtNow = new Date(utc + (3600000*(-4)));

		var millisecondsPerDay = 24 * 60 * 60 * 1000;
		var numberDays = Math.round((launchDate - edtNow) / millisecondsPerDay);

        return numberDays;
    }

    /* Update DOM */ 	
	function updateCountdown(countdownElement) {
        var remainingMessage = " DAYS REMAINING";
        var launchMessage = "";
        
        var numberDays = daysToHack(); 

		if (numberDays > 0) {
			countdownElement.innerHTML = numberDays + remainingMessage;
		}
		else {
			countdownElement.innerHTML = launchMessage;
		}
	}

    function updateSpinner(spinnerElement) {
        var MAX_DAYS = 100; 

        // must wait for svg to load before modifying
        spinnerElement.addEventListener("load", function() {
            // inspired by https://codepen.io/JMChristensen/pen/Ablch?editors=1111
            var spinnerDoc = spinnerElement.contentDocument;
            var timer = spinnerDoc.getElementById("timer");
            var r = timer.getAttribute("r");
            var c = Math.PI * (r * 2); 
            
            var days = daysToHack(); 

            // clamp # days remaining 
            if (days < 0) { days = 0;}
            if (days > MAX_DAYS) { days = MAX_DAYS;}
            
            var dashOffset = ((MAX_DAYS-days)/MAX_DAYS)*c;
            timer.style.strokeDashoffset = dashOffset;  
        }); 
    }   

	Array
		.from(document.getElementsByClassName('days'))
		.forEach(updateCountdown);

    updateSpinner(document.getElementById("spinner"));
})();
