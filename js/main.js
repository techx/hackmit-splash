window.addEventListener('scroll', function(event) {
    var top = this.pageYOffset;
    var layers = document.getElementsByClassName('layer');
    for(var i = 0; i<layers.length; i++) {
        var speed = layers[i].getAttribute('data-speed');
        var yPos = -top*speed;
        layers[i].setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');
    }
});