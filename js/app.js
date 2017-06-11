
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

		// The primary button should no longer go back now that sections are hidden
		document.querySelectorAll('.primary-button').forEach(function(element) {
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

	////////////////////
	// COUNTDOWN
	////////////////////

	var launchDate = new Date('Sep 16 2017');
	var remainingMessage = " DAYS REMAINING";
	var launchMessage = "";

	/* Handles timezone conversions */
	function updateCountdown(countdownElement) {
		var localDate = new Date();
		var utc = localDate.getTime() + (localDate.getTimezoneOffset() * 60000);
		var edtNow = new Date(utc + (3600000*(-4)));

		var millisecondsPerDay = 24 * 60 * 60 * 1000;
		var numberDays = Math.round((launchDate - edtNow) / millisecondsPerDay);

		if (numberDays > 0) {
			countdownElement.innerHTML = numberDays + remainingMessage;
		}
		else {
			countdownElement.innerHTML = launchMessage;
		}
	}

	Array
		.from(document.getElementsByClassName('days'))
		.forEach(updateCountdown);

})();
