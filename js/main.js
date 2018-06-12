// window.addEventListener('scroll', function(event) {
//     var top = this.pageYOffset;
//     var layers = document.getElementsByClassName('layer');
//     for(var i = 0; i<layers.length; i++) {
//         var speed = layers[i].getAttribute('data-speed');
//         var offset = parseInt(layers[i].getAttribute('data-offset'));
//         var yPos = -(top*speed)+offset;
//         layers[i].setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');
//     }
// });

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
        // var sign = signs[i].getSVGDocument();
        // sign.addEventListener('mouseover', function() {
        //     var glow = this.querySelectorAll('.glow');
        //     console.log(glow);
        //     for (var j = 0; j < glow.length; j++) {
        //         glow[j].classList.add('flash-animation');
        //     }
        // });

        // sign.addEventListener('mouseleave', function() {
        //     var glow = this.querySelectorAll('.glow');
        //     for (var j = 0; j < glow.length; j++) {
        //         glow[j].classList.remove('flash-animation');
        //         glow[j].style.opacity = 1;
        //     }
        // });
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
                        // console.log("Click", this);
                        console.log('#' + name + '-expanded');
                        var expandedSign = document.getElementById('#' + name + '-expanded');
                        if(expandedSign.classList.contains('show2')) { // hide
                            // console.log("HIDE");
                            // show the signs
                            var smallSigns = document.getElementsByClassName('sign-link');
                            for(var j=0; j<smallSigns.length; j++) {
                                smallSigns[j].classList.remove('hide');
                            }
                            var blurb = document.getElementsByClassName('blurb')[0];
                            blurb.classList.remove('hide');
                            expandedSign.classList.remove('show2');
                            setTimeout(function() {expandedSign.classList.remove('show1');}, 250);
                        } else { // show
                            // console.log("SHOW");
                            // hide the signs
                            var smallSigns = document.getElementsByClassName('sign-link');
                            for(var j=0; j<smallSigns.length; j++) {
                                smallSigns[j].classList.add('hide');
                            }
                            var blurb = document.getElementsByClassName('blurb')[0];
                            blurb.classList.add('hide');
                            expandedSign.classList.add('show1');
                            setTimeout(function() {expandedSign.classList.add('show2')}, 1);
                        }
                    });
                }());
            }
        }());
    }
}