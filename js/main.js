window.onload = function() {
    var signs = document.getElementsByClassName('sign-link');
    console.log(signs);

    for (var i = 0; i < signs.length; i++) {
        (function() {
            var signobj = signs[i].childNodes[0];
            var sign = signobj.getSVGDocument();
            signs[i].addEventListener('mouseover', function() {
                console.log("MOUSEOVER " + i);
                var glow = sign.querySelectorAll('.glow');
                for(var j=0; j<glow.length; j++) {
                    glow[j].classList.add('flash-animation');
                }
            });
            signs[i].addEventListener('mouseleave', function() {
                console.log("MOUSELEAVE " + i)
                var glow = sign.querySelectorAll('.glow');
                for(var j=0; j<glow.length; j++) {
                    glow[j].classList.remove('flash-animation');
                    glow[j].style.opacity = 1;
                }
            });
        }());
    }

    var signNames = ['speakers', 'faq', 'sponsors', 'register'];
    for(var i = 0; i<signNames.length; i++) {
        (function() {
            var name = signNames[i];
            var signLinks = document.getElementsByClassName(name+'-link');
            console.log(name + ': ' + signLinks.length);
            for(var k=0; k<signLinks.length; k++) {
                (function() {
                    var signLink = signLinks[k];
                    signLink.addEventListener('click', function() {
                        var expandedSign = document.getElementById(name + '-expanded');
                        console.log("SHOW");
                        expandedSign.classList.add('show1');
                        setTimeout(function() {expandedSign.classList.add('show2')}, 1);
                    });
                }());
            }
        }());
    }
    for(var i=0; i<signNames.length; i++) {
        (function() {
            var expandedDiv = document.getElementById(signNames[i] + '-expanded');
            expandedDiv.addEventListener('click', function(e) {
                if(e.target.closest(".expanded-bubble-left") || e.target.closest(".expanded-bubble-right")) return;
                expandedDiv.classList.remove('show2');
                setTimeout(function() {expandedDiv.classList.remove('show1');}, 500);
            });
        }());
    }
    var attribution_link = document.getElementById('attribution-link');
    attribution_link.addEventListener('click', function() {
        var attribution = document.getElementById('attribution');
        if (attribution.style.display != 'none')
            attribution.style.display = 'none';
        else if (attribution.style.display == 'none')
            attribution.style.display = 'inline';
    });
}