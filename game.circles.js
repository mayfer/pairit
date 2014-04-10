
window.circles_game = function() {
    $('<div>').addClass('separator').appendTo('#circles .wrapper');
    $('<div>').attr('id', 'ordered-circles').appendTo('#circles .wrapper');
    $('<div>').attr('id', 'unordered-circles').appendTo('#circles .wrapper');

    $('#circles').show();

    var num_circles = 5;
    var circle_sizes = [];

    function number_different_enough(num, num_array, range) {
        for(var i=3; i<num_array.length; i++) {
            if(Math.abs(num - num_array[i]) < range) {
                return false;
            }
        }
        return true;
    }

    for(var i = 0; i < num_circles; i++) {
        var size;
        do {
            size = parseInt(Math.random() * 80 + 50);
        } while(!number_different_enough(size, circle_sizes, 10))

        circle_sizes.push(size);

        var circle_container = $('<div>').addClass('circle-container');
        var circle = $('<div>')
            .addClass('circle')
            .addClass('size-'+size)
            .width(size)
            .height(size)
            .appendTo(circle_container);

        $('#unordered-circles').append(circle_container);


    }

    circle_sizes = circle_sizes.sort(function(a,b) { return a - b;});
    console.log(circle_sizes);
    for(var i = 0; i < num_circles; i++) {
        var size = circle_sizes[i];
        var circle_container = $('<div>').addClass('circle-container');
        var circle = $('<div>')
            .addClass('circle').addClass('dashed')
            .width(size)
            .height(size)
            .data('size', size)
            .appendTo(circle_container);

        $('#ordered-circles').append(circle_container);
    }

    $('#unordered-circles .circle').draggable({
        revert : function(event, ui) {
            $(this).data("uiDraggable").originalPosition = {
                top : 0,
                left : 0
            };
            return !event;
        }
    });

    $('#ordered-circles .circle').each(function() {
        var delay = 150;
        $(this).droppable({
            drop: function( event, ui ) {
                $( this )
                    .addClass("dropped");
                var drop_p = $(this).offset();
                var drag_p = ui.draggable.offset();
                var left_end = drop_p.left - drag_p.left + 1;
                var top_end = drop_p.top - drag_p.top + 1;
                ui.draggable.animate({
                    top: '+=' + top_end,
                    left: '+=' + left_end
                }, delay);

                if($('.circle.dropped').length == $('#unordered-circles .circle').length) {
                    setTimeout(function() {
                        window.games.next("Correct!", "circles");
                    }, delay);
                }
            },
            accept: '.size-'+$(this).data('size'),
        });
    });



    $('#circles h1').addClass('animated bounceInDown ');





}
