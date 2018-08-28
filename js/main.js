window.onload = function() {
    setTimeout(function(){
		// Hide the address bar!
		window.scrollTo(0, 1);
	}, 0);
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

///////////////
// Slideshow
///////////////
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

/* LIT PUZZLE ENTRY */

$('.bottom').click(function (e) {

  // Remove any old one
  $(".ripple").remove();

  // Setup
  var posX = $(this).offset().left,
      posY = $(this).offset().top,
      buttonWidth = $(this).width(),
      buttonHeight =  $(this).height();

  // Add the element
  $(this).prepend("<span class='ripple'></span>");


 // Make it round!
  if(buttonWidth >= buttonHeight) {
    buttonHeight = buttonWidth;
  } else {
    buttonWidth = buttonHeight;
  }

  // Get the center of the element
  var x = e.pageX - posX - buttonWidth / 2;
  var y = e.pageY - posY - buttonHeight / 2;


  // Add the ripples CSS and start the animation
  $(".ripple").css({
    width: buttonWidth,
    height: buttonHeight,
    top: y + 'px',
    left: x + 'px'
  }).addClass("rippleEffect");
});

// click 21 times to enter puzzle
// check console log for hint
function puzzle() {
    var bottom = document.getElementById("bottom");
    var counter = 0;

    bottom.onmouseover = function() {
        this.style.backgroundColor = "blue";
        this.style.opacity = "0.2";
    }
    bottom.onmouseout = function() {
        this.style.backgroundColor = "transparent";
    }
    bottom.onclick = function() {
        counter += 1;
        console.log(`You're ${counter}!`);
        if (counter === 21) {
            window.location.href = "https://hackmirror.icu";
        }
    }
}

puzzle()
