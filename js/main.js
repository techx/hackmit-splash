window.onload = function() {
    ///////////////
    // Glowing Signs
    ///////////////
    Array
        .from(document.getElementsByClassName('sign-link'))
        .forEach(function(signObj) {
            var sign = signObj.childNodes[0].getSVGDocument();
            signObj.addEventListener('mouseover', (function() {
                var glow = sign.querySelectorAll('.glow');
                for(var j=0; j<glow.length; j++) {
                    glow[j].classList.add('flash-animation');
                }
                var glow = sign.querySelectorAll('.glow-dull');
                for(var j=0; j<glow.length; j++) {
                    glow[j].classList.add('flash-animation-dull');
                }
            }).bind(this));
            signObj.addEventListener('mouseleave', (function() {
                var glow = sign.querySelectorAll('.glow');
                for(var j=0; j<glow.length; j++) {
                    glow[j].classList.remove('flash-animation');
                    glow[j].style.opacity = 1;
                }
                var glow = sign.querySelectorAll('.glow-dull');
                for(var j=0; j<glow.length; j++) {
                    glow[j].classList.remove('flash-animation-dull');
                    glow[j].style.opacity = 1;
                }
            }).bind(this));
        });

    ///////////////
    // Sign Links
    ///////////////
    var signNames = ['speakers', 'faq', 'sponsors', 'register'];
    signNames
        .forEach(function(name) {
            var expandedDiv = document.getElementById(name + '-expanded');            
            var sign = document.getElementById(name + '-sign-link');
            // SHOW when clicked
            Array
                .from(document.getElementsByClassName(name+'-link'))
                .forEach(function(signLink) {
                    signLink.addEventListener('click', (function() {
                        sign.classList.add('hide');
                        document.body.classList.add('hide');
                        expandedDiv.classList.add('show1');
                        setTimeout(function() {expandedDiv.classList.add('show2')}, 1);
                    }).bind(this));
                });
            // HIDE when clicked
            expandedDiv.addEventListener('click', (function(e) {
                if(e.target.closest(".expanded-bubble") || e.target.closest(".expanded-x")) return;
                sign.classList.remove('hide');
                document.body.classList.remove('hide');
                expandedDiv.classList.remove('show2');
                setTimeout(function() {expandedDiv.classList.remove('show1');}, 500);
            }).bind(this));
        });
    
    ///////////////
    // Footer Toggle
    ///////////////
    var attribution_link = document.getElementById('attribution-link');
    attribution_link.addEventListener('click', function() {
        var attribution = document.getElementById('attribution');
        if (attribution.style.display != 'none')
            attribution.style.display = 'none';
        else if (attribution.style.display == 'none')
            attribution.style.display = 'inline';
    });

    ///////////////
    // FAQ Toggle
    ///////////////
    Array
		.from(document.querySelectorAll('.faq'))
		.forEach(function (question_answer) {
            question_answer.addEventListener('click', (function(event) {
                if (question_answer.classList.contains('expanded'))
                    question_answer.classList.remove('expanded');
                else
                    question_answer.classList.add('expanded');
			}).bind(this));
		});
}