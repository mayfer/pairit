
var Timer = function() {
    var timer = this;
    timer.time = 10.0;
<<<<<<< HEAD
<<<<<<< HEAD
    timer.duration = 360;
=======
    timer.duration = 10;
>>>>>>> FETCH_HEAD
=======
    timer.duration = 10;
>>>>>>> FETCH_HEAD

    var timerdiv = $('<div>').attr('id', 'timer').appendTo($('body'));
    var inner = $('<div>').addClass('inner').appendTo(timerdiv);
    var gauge = $('<div>').addClass('gauge').appendTo(inner);

    timer.baseHeight = 20;
    timer.totalHeight = $('body').innerHeight() - timer.baseHeight - 40;
    gauge.css('height', timer.baseHeight+'px');


    timer.handler = null;

    timer.start = function() {
        timer.handler = setInterval(function(){
            if(timer.time < timer.duration) {
                timer.time += 1;
                var height = timer.baseHeight + Math.round(timer.totalHeight * timer.time/timer.duration);
                gauge.animate({height: height+"px" }, {queue: false, duration: 1000, easing: 'linear'});
            } else {
                $('#score').html(window.games.current_game);
                $('#total-time').html(timer.duration);
                $('#game-over').show();
            }
        }, 1000);
    }

    return timer;
}
