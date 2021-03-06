
window.numbers_game = function() {
    $('<div>').addClass('separator').appendTo('#numbers .wrapper');
    $('<div>').attr('id', 'ordered-letters').appendTo('#numbers .wrapper');
    $('<div>').attr('id', 'unordered-letters').appendTo('#numbers .wrapper');

    $('#numbers').show();


    function shuffle(array) {
        var currentIndex = array.length
            , temporaryValue
            , randomIndex
            ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    var word = "③⑥②⑱"
    var letters = word.split('');
    letters = shuffle(letters).splice(0, 5);
    word = letters.join('');

    for(var i = 0; i < letters.length; i++) {

        var letter_container = $('<div>').addClass('letter-container');
        var letter = $('<div>')
            .addClass('letter').addClass('dashed')
            .addClass('letter-'+letters[i])
            .html(letters[i])
            .data('letter', letters[i])
            .appendTo(letter_container);

        $('#ordered-letters').append(letter_container);


    }

    while(letters.join('') == word) {
        letters = shuffle(letters);
    }

    for(var i = 0; i < letters.length; i++) {
        var size = letters[i];
        var circle_container = $('<div>').addClass('letter-container');
        var circle = $('<div>')
            .addClass('letter')
            .addClass('letter-'+letters[i])
            .data('letter', letters[i])
            .html(letters[i])
            .appendTo(circle_container);

        $('#unordered-letters').append(circle_container);
    }

    $('#unordered-letters .letter').draggable({
        revert : function(event, ui) {
            $(this).data("uiDraggable").originalPosition = {
                top : 0,
                left : 0
            };
            return !event;
        }
    });

    $('#ordered-letters .letter').each(function() {
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

                if($('.letter.dropped').length == $('#unordered-letters .letter').length) {
                    setTimeout(function() {
                        window.games.next("Correct!", "numbers");
                    }, delay);
                }
            },
            accept: '.letter-'+$(this).data('letter'),
        });
    });



    $('#numbers h1').addClass('animated bounceInDown ');





}

