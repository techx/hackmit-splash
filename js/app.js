
(function() {

	'use strict';

	////////////////////
	// FAQ TOGGLES
	////////////////////

	Array
		.from(document.getElementsByClassName('question'))
		.forEach(function (question) {
			question.addEventListener('click', (function() {

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
		document.querySelectorAll('.controls li.expanded').forEach(function(element) {
			element.classList.remove('expanded');
		});
	}

	function router() {
		// The bit after the # (e.g. url == #faq --> section == faq)
		var currentSection = location.hash.slice(1);
		
		document.body.classList.remove('section-expanded');

		if (sections.indexOf(currentSection) >= 0) {
			hideAllSections();

			// Reveal current section
			document.getElementById(currentSection).classList.add('expanded');
			document.body.classList.add('section-expanded');

		} else if (!currentSection.length) {
			// Navigated to /# or /, hide all sections
			hideAllSections();
		}
	}

	// Call the router on page start, and whenever the URL hash changes
	window.addEventListener('hashchange', router);
	router();

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
            console.log(spinnerDoc); 
            console.log(timer);
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
