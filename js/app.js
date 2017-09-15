/* 

    ( ͡° ͜ʖ ͡°)━☆ﾟ.*･｡ﾟ

*/

(function() {

	'use strict';

	var break_med = 768; // px

	////////////////////
	// FAQ TOGGLES
	////////////////////

	Array
		.from(document.querySelectorAll('#faq-section .content > div'))
		.forEach(function (question_answer) {
            question_answer.addEventListener('click', (function(event) {
				// Hide all expanded FAQ sections
                // Array
                 //    .from(document.querySelectorAll('#faq-section .expanded'))
                 //    .forEach(function (element) {
                 //        element.classList.remove('expanded');
                 //    });


                // var classes = event.target.classList;

                if (question_answer.classList.contains('expanded'))
                    question_answer.classList.remove('expanded');
                else
                    question_answer.classList.add('expanded');

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

    // document.querySelector('.spinner').addEventListener('click', function () {
	 //    console.log('click');
    //     location.hash = "#!";
    // });

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
	function updateCountdown(countdownElement, days) {
        var remainingMessage = " DAYS REMAINING";
        var launchMessage = "HackMIT is here!";
        
		if (days == 100) {
            countdownElement.innerHTML = "<a id='innerSpinnerAnchorText' href='http://delorean.codes'>delorean.codes</a>";

            var stuff = document.getElementById("stuff");
            stuff.style.display = "inherit";
            fadeIn(stuff, 100);

            setTimeout(function() {
                document.getElementById("innerSpinnerAnchorText").click()
            }, 2000);

		}
        else if(days > 0) {
			countdownElement.innerHTML = days + remainingMessage;
        }
		else {
			countdownElement.innerHTML = launchMessage;

            // var stuff = document.getElementById("stuff");
            // stuff.style.display = "inherit";
            // fadeIn(stuff, 100);

            // setTimeout(function() {
            //     document.getElementById("innerSpinnerAnchorText").click()
            // }, 2000);
		}
	}

    function fadeIn(elem, speed){
        if(elem.style){
            elem.style.opacity= '0';
        }
        window.fadetimer= setInterval(function(){
            elem.style.opacity= +(elem.style.opacity)+.02;
            if(elem.style.opacity> 1){
                clearInterval(fadetimer);
            }
        },
        speed);
    }

    function updateDial(spinner, days, shouldAnimate) {
        if(typeof(shouldAnimate) == "undefined")
            shouldAnimate = true;

        var MAX_DAYS = 100; 

       // inspired by https://codepen.io/JMChristensen/pen/Ablch?editors=1111
       var spinnerDoc = spinner.contentDocument;
       var timer = spinnerDoc.getElementById("timer");
       if(!shouldAnimate)
           timer.style.transition = "none";
       else
           timer.style.transition = "";

       var r = timer.getAttribute("r");
       var c = Math.PI * (r * 2); 

       // clamp # days remaining 
       if (days < 0) { days = 0;}
       if (days > MAX_DAYS) { days = MAX_DAYS;}
            
       var dashOffset = ((MAX_DAYS-days)/MAX_DAYS)*c;
       timer.style.strokeDashoffset = dashOffset;  
       Array
            .from(document.getElementsByClassName('days'))
            .forEach(function(element) {
                updateCountdown(element, parseInt(days));
            });
    }

	Array
		.from(document.getElementsByClassName('days'))
		.forEach(function(element) {
            updateCountdown(element, daysToHack());
        });

    //document.getElementById("spinner").addEventListener("load", function() {
    //        updateDial(this, daysToHack());
    //        console.log("load");
    //});
    window.onload = function() {
        updateDial(document.getElementById("spinner"), daysToHack());
    };

    /* DON'T LOOK PUZZLE */
    // anonymous function called to contain scope of puzzle related code
    (function() {
        var spinnerContainer = document.getElementsByClassName("spinner-container")[0]; 
        var dial = document.getElementById("spinner");
        var dialClicked = false;
        var cummulativeAngle = 0; 
        var prevAngle = -1; 
        
        function distFromCenter(e, spinner) {
            var offsets = element_offsets(spinner.parentNode);
            
            var centerX = spinner.offsetWidth/2;
            var centerY = spinner.offsetHeight/2;
            var x = e.clientX - offsets.left;
            var y = e.clientY - offsets.top;
        
            return {
                x: centerX - x,
                y: centerY - y 
            };
        }

        function isMouseInDial(e, spinner) {
            var innerRadiusScale = 127.0/479;
            var outerRadiusScale = 159.0/479; 
            var ep = 10;
            
            var d = distFromCenter(e, spinner);
            var dx2 = Math.pow(d.x, 2);
            var dy2 = Math.pow(d.y, 2);

            var r = Math.pow(dx2 + dy2, 0.5);

            var innerRadius = innerRadiusScale * spinner.offsetWidth;
            var outerRadius = outerRadiusScale * spinner.offsetWidth;

            return (innerRadius - ep < r && r < outerRadius + ep)
        }

        function mouseAngle(e, spinner) {
            var d = distFromCenter(e, spinner);
            var angle = Math.atan2(d.y, d.x) * 50.0/Math.PI - 25;
            if(angle < 0)
                angle += 100;

            // angle valued from 0-100, corresponding to # of days remaining
            return angle;
        }


        function mouseMoveHandler(e) {
            if(dialClicked) {
                var angle = mouseAngle(e, spinnerContainer);
                var dAngle = angle - prevAngle;
                if(Math.abs(dAngle) < 90) {
                    cummulativeAngle += dAngle;
                    prevAngle = angle;
                }

                if(!isMouseInDial(e, spinnerContainer)) {
                    dialClicked = false;
                    updateDial(dial, daysToHack());
                }
                else {
                    // new win condition 
                    if(cummulativeAngle > 99) { 
                        updateDial(dial, 100, false); 
                        spinnerContainer.removeEventListener('mousedown', mouseDownHandler, false);
                        spinnerContainer.removeEventListener('mousemove', mouseMoveHandler, false);
                        spinnerContainer.removeEventListener('mouseup', mouseUpHandler, false);
                        spinnerContainer.removeEventListener("touchstart", touchStartHandler, false);
                        spinnerContainer.removeEventListener("touchend", touchEndHandler, false);
                        spinnerContainer.removeEventListener("touchcancel", touchEndHandler, false);
                        spinnerContainer.removeEventListener("touchmove", touchMoveHandler, false);
                    }
                    else if(cummulativeAngle < 1) {
                        updateDial(dial, 0, false);
                    }
                    else
                        updateDial(dial, cummulativeAngle, false); 
                }
            }
        }
        function mouseDownHandler(e) {
            var days = daysToHack();
            var angle = mouseAngle(e, spinnerContainer);
            var ep = 2;
            if(isMouseInDial(e, spinnerContainer) && angle > days - ep && angle < days + ep) {
                dialClicked = true;
                cummulativeAngle = angle;
                prevAngle = angle;
            }
        }
        function mouseUpHandler(e) {
            dialClicked = false;
            updateDial(dial, daysToHack());
        }
        
        function touchStartHandler(e) {
            mouseDownHandler(e.touches[0]);
        }
        function touchEndHandler(e) {
            mouseUpHandler(e.touches[0]);
        }
        function touchMoveHandler(e) {
            mouseMoveHandler(e.touches[0]);
            // don't scroll when you're turning the dial
            if(dialClicked)
                e.preventDefault();
        }

        spinnerContainer.addEventListener('mousedown', mouseDownHandler, false);
        spinnerContainer.addEventListener('mousemove', mouseMoveHandler, false);
        spinnerContainer.addEventListener('mouseup', mouseUpHandler, false);
        spinnerContainer.addEventListener("touchstart", touchStartHandler, false);
        spinnerContainer.addEventListener("touchend", touchEndHandler, false);
        spinnerContainer.addEventListener("touchcancel", touchEndHandler, false);
        spinnerContainer.addEventListener("touchmove", touchMoveHandler, false);

        function element_offsets(e) {
            var left = 0, top = 0;
            do {
                left += e.offsetLeft;
                top += e.offsetTop;
            } while (e = e.offsetParent);
            return { left: left, top: top };
        }
    })();
})();
