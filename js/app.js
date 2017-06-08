
(function() {

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

	function router() {
		var section = location.hash.slice(1);
		
		document.body.classList.remove('section-expanded');

		if (sections.indexOf(section) >= 0) {
			document.body.classList.add('section-expanded');

			// Hide all sections
			document.querySelectorAll('.main > section').forEach(function(element) {
				// console.log('hiding', element)
				element.classList.remove('expanded');
				// console.log(element);
			});

			// Reveal routed section
			document.getElementById(section)
					.classList.add('expanded');
		}
	}

	window.addEventListener('hashchange', router);
	router();

})();
